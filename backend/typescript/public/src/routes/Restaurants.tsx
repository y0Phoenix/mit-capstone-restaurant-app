import React, { Fragment, useEffect, useState } from 'react'
import { Tab, Row, Col, ListGroup, Card, InputGroup, Button, FormControl } from 'react-bootstrap'
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State'
import { deleteRestaurant, getRestaurants } from '../actions/restaurant';
import { setAlert } from '../actions/alert';
import { Restaurant } from '../types/Restaurant';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const mapStateToProps = (state: State) => ({
  restaurants: state.restaurant,
  user: state.user
});

const connector = connect(mapStateToProps, {deleteRestaurant, setAlert, getRestaurants});

type Props = ConnectedProps<typeof connector>;

const Restaurants: React.FC<Props> = ({user, restaurants, deleteRestaurant, setAlert, getRestaurants}) => {
	const [search, setSearch] = useState('');
	const [rests, setRests] = useState(restaurants);
	useEffect(() => {
		if (user.isAuthenticated && restaurants.length <= 0) getRestaurants();
		if (rests.length <= 0) setRests(restaurants);
	}, [user, restaurants]);
	useEffect(() => {
		console.log('re-rednder')
	}, [])
	const handleDelete = (id: string, name: string) => {
		// show modal that confirms whether the user really wants to delete
		// clientConfirm({
		// 	title: 'Confirm Delete',
		// 	text: `Are You Sure You Want To Delete ${name}`,
		// 	type: 'warning'
		// }, deleteRestaurant, {id});
	};
	const handleSearch = (e: any = null) => {
		e.preventDefault();
		console.log(`handle search ${search}`, e)
		const regex = new RegExp(search, 'gi');
		const _rests = restaurants.filter(rest => {
			const bool = regex.test(rest.name);
			return bool ? rest : null;
		})
		setRests(_rests);
	}
	return (
		<div className="restaurants">
			<div className="restaurants-container">
				<Card>
					<Card.Header>Restaurants</Card.Header>
					<Card.Body>
						<form onSubmit={(e: any) => handleSearch(e)}>
							<InputGroup>
								<FormControl 
									placeholder='search...'
									value={search}
									onChange={(e:any) => setSearch(e.target.value)}
								/>
								<InputGroup.Text id='basic-addon2' as='button' className='btn btn-secondary' type='button' onClick={handleSearch}>
									<i className='fa-solid fa-magnifying-glass'></i>
								</InputGroup.Text>
							</InputGroup>
						</form>
						<ListGroup>
							{rests.map((restaurant: Restaurant, i: number) => (
								<Fragment key={i}>
									<ListGroup.Item as={'div'}>
										<div className='flex-horizontal space-between'>
											<div className="flex-horizontal gap-lg">
												<div>{restaurant.name}</div>
												<div>{restaurant.desc}</div>
											</div>
											<div className='flex-horizontal'>
												<Link to={`/restaurant/${restaurant._id}`} className='link light btn btn-dark'>
													<i className="fa-solid fa-pen-to-square"></i>
												</Link>
												<Button variant='dark'>
													<i className="fa-solid fa-x"></i>
												</Button> 
											</div>
										</div>
									</ListGroup.Item>
								</Fragment>
							))}
						</ListGroup>
						<Card.Footer>
							<Button variant='dark'>
								<Link to={'/restaurant/new'} className='link light'>
									Add Restaurant <i className="fa-solid fa-utensils"></i>
								</Link>
							</Button>
						</Card.Footer>
					</Card.Body>
				</Card>
			</div>
		</div>
	)
}

export default connector(Restaurants);