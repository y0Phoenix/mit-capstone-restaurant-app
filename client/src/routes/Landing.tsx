import React, { useEffect, useRef, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State'
import { setModal } from '../actions/modal';
import {filterRestaurants, getRestaurants, resetRestaurantFilter} from '../actions/restaurant'
import { Button, Card, CardGroup, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import { Restaurant } from '../types/Restaurant';
import { updateUser } from '../actions/user';
import { Item, ItemSchema } from '../../../backend/typescript/interfaces/Item';
import { useNavigate } from 'react-router-dom';
import {v4 as uuid} from 'uuid';

const mapStateToProps = (state: State) => ({
	user: state.user,
	restaurant: state.restaurant,
});

const connector = connect(mapStateToProps, {setModal, filterRestaurants, resetRestaurantFilter, getRestaurants, updateUser});

type Props = ConnectedProps<typeof connector>;

const Landing: React.FC<Props> = ({user, restaurant, setModal, filterRestaurants, resetRestaurantFilter, getRestaurants, updateUser}) => {
	const [selectced, setSelected] = useState('');
	const [total, setTotal] = useState(0);
	const navigate = useNavigate();
	const proceedButton = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		getRestaurants();
	}, []);
	useEffect(() => {
		if (restaurant.filtered) {
			if (selectced == restaurant.filtered[0]._id) {
				user.cart.restaurant = selectced;
				updateUser(user);
				return
			}
			user.cart.restaurant = '';
			updateUser(user);
		}
	}, [selectced]);
	useEffect(() => {
		if (proceedButton.current) {
			if (user.cart.items.length <= 0) {
				proceedButton.current.disabled = true;
				setTotal(0);
				return
			}
			if (!restaurant.filtered) {
				filterRestaurants({
					id: user.cart.restaurant,
					restaurantState: restaurant,
					type: 'restaurant'
				});
			}
			let num = 0;
			user.cart.items.forEach(item => num = (item.price * item.quantity) + num);
			setTotal(num);
			proceedButton.current.disabled = false;
		}
	}, [user]);
	const handleSearch = (name: string, type: 'restaurant' | 'item') => {
		console.log('handle search', name);
		filterRestaurants({
			name,
			restaurantState: restaurant,
			type
		});
	};
	const addItem = (item: Item) => {
		const i = user.cart.items.map(item => item.name).indexOf(item.name);
		if (i > -1) {
			user.cart.items[i].quantity = user.cart.items[i].quantity + 1;
			return updateUser(user);
		}
		item.quantity = 1;
		item.id = uuid();
		user.cart.items.push(item);
		updateUser(user);
	};
	const updateItem = (type: 'whole' | 'quantityMinus' | 'quantityAdd', id: string) => {
		if (type == 'whole'){
			user.cart.items = user.cart.items.filter(item => item.id == id ? null : item);
			updateUser(user);
		}
		else if (type == 'quantityMinus'){
			user.cart.items.forEach((item, i, arr) => {
				if (item.id == id) {
					if (item.quantity) {
						arr[i].quantity = item.quantity - 1;
						if (arr[i].quantity == 0) arr.splice(i, 1);
					}
				}
			});
			updateUser(user);
		}
		else if (type == 'quantityAdd'){
			user.cart.items.forEach((item, i, arr) => {
				if (item.id == id) {
					if (item.quantity) {
						arr[i].quantity = item.quantity + 1;
					}
				}
			});
			updateUser(user);
		}
	};
	const handleProceed = () => {
		console.log('proceed')
		setModal({
			type: 'delivery',
			delivery: {
				show: true,
				address: '',
				bool: false
			}
		});
	}

	return (
		<div className='landing'>
			<Card>
				<Card.Header>
					<Card.Text as='div'>{user.cart.restaurant ? 
						(
							<div className='flex-horizontal gap-md'>
								<p>
									Ordering From {restaurant.filtered && restaurant.filtered[0].name}
								</p>
								<Button variant='danger' onClick={() => {
									resetRestaurantFilter();
									user.cart.items = []
									user.cart.restaurant = '';
									updateUser(user);
									setSelected('');
								}}>
									Deselect
								</Button>
							</div>
						) : 
						(
							'Please Select A Restaurant To Order From'
						)}
					</Card.Text>
				</Card.Header>
				<Card.Body>
					<div className='flex-vertical gap-xxlg'>
						<Card className='restaurants-container'>
							<Card.Header>
								<InputGroup>
									<InputGroup.Text id='basic-addon1'>
										<i className='fa-solid fa-magnifying-glass'></i>
									</InputGroup.Text>
									<FormControl 
										placeholder='search...'
										onChange={e => handleSearch(e.target.value, user.cart.restaurant && restaurant.filtered ? 'item' : 'restaurant')}
									/>
								</InputGroup>
							</Card.Header>
							<Card.Body className='flex-vertical gap-lg'>
								{user.cart.restaurant === '' &&	<div className='flex-horizontal gap-md'>
										<small>
											Available Restaurants {restaurant.restaurants.length}
										</small>
										<small>
											Filtered Restaurants {restaurant.filtered ? restaurant.filtered.length : 0}
										</small>
									</div>
								}
								<CardGroup>
									{user.cart.restaurant !== '' ? 
										(
											<>
												{restaurant.filtered &&
													(
														restaurant.filtered[0].items.map((item, i) => (
															<Card key={i}>
																{item.picture !== '' && <Card.Img src={item.picture}></Card.Img>}
																<Card.Body>
																	<Card.Text>{item.name}</Card.Text>
																</Card.Body>
																<Card.Footer className='flex-verticall'>
																	<div>${item.price}</div>
																	<Button variant='primary' onClick={() => addItem(item)}>
																		Add To Cart
																	</Button>
																</Card.Footer>
															</Card>
														))
													)
												}
											</>
										)
										:
										(
											restaurant.filtered ? 
											(
												<>
													{restaurant.filtered.map((rest, i) => (
														<Card key={i}>
															{rest.picture !== '' && <Card.Img src={rest.picture}></Card.Img>}
															<Card.Body>
																<Card.Text>{rest.name}</Card.Text>
															</Card.Body>
															<Card.Footer className='flex-vertical gap-md'>
																<Button variant='primary' onClick={() => {
																	handleSearch(rest.name, 'restaurant');
																	setSelected(rest._id);
																}}>
																	Select
																</Button>
																<small>
																	{rest.desc}
																</small>
															</Card.Footer>
														</Card>
													))}
												</>
											)
											:
											(
												<>
													{restaurant.restaurants.map((rest, i) => (
														<Card key={i}>
															{rest.picture !== '' && <Card.Img src={rest.picture}></Card.Img>}
															<Card.Body>
																<Card.Text>{rest.name}</Card.Text>
															</Card.Body>
															<Card.Footer className='flex-vertical gap-md'>
																<Button variant='primary' onClick={() => {
																	handleSearch(rest.name, 'restaurant');
																	setSelected(rest._id);
																}}>
																	Select
																</Button>
																<small>
																	{rest.desc}
																</small>
															</Card.Footer>
														</Card>
													))}
												</>
											)
										)
									}
								</CardGroup>
							</Card.Body>
						</Card>
						<Card className='cart-container'>
							<Card.Header className='flex-horizontal center gap-lg relative'>
								<div>
									{user.cart.restaurant !== '' && restaurant.filtered ? `From ${restaurant.filtered[0].name}` : 'Select A Restaurant Above'}
								</div>
								<div>Cart</div>
								<div>Price {total}</div>
								<div className='corner top-right' onClick={handleProceed}>
									<Button variant='primary' disabled ref={proceedButton}>
										Proceed To Next Page
									</Button>
								</div>
							</Card.Header>
							<Card.Body>
								<ListGroup>
									{user.cart.items.map((item, i) => (
										<ListGroup.Item as={'div'} key={`${i}item`}>
											<ListGroup horizontal>
												<ListGroup.Item className='center'>
													{item.name}
												</ListGroup.Item>
												<ListGroup.Item>
													qty: {item.quantity}
												</ListGroup.Item>
												<ListGroup.Item>
													${item.quantity ? (item.price * item.quantity).toFixed(2) : item.price.toFixed(2)}
												</ListGroup.Item>
												<ListGroup.Item>
													<Button variant='outine-secondary' onClick={() => updateItem('quantityAdd', item.id)}>
														<i className="fa-solid fa-plus"></i>
													</Button>
												</ListGroup.Item>
												<ListGroup.Item>
													<Button variant='outine-secondary' onClick={() => updateItem('quantityMinus', item.id)}>
														<i className="fa-solid fa-minus"></i>
													</Button>
												</ListGroup.Item>
												<ListGroup.Item>
													<Button variant='outine-secondary' onClick={() => updateItem('whole', item.id)}>
														<i className="fa-solid fa-x"></i>
													</Button>
												</ListGroup.Item>
											</ListGroup>
										</ListGroup.Item>
									))}
								</ListGroup>
							</Card.Body>
						</Card>
					</div>
				</Card.Body>
			</Card>
		</div>
	)
}

export default connector(Landing);