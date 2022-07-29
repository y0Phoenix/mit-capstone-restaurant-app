import React, { Fragment, useEffect, useState } from 'react'
import { ListGroup, Card, InputGroup, Button, FormControl } from 'react-bootstrap'
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State'
import { deleteRestaurant, filterRestaurants, getRestaurants } from '../actions/restaurant';
import { setAlert } from '../actions/alert';
import { Restaurant } from '../types/Restaurant';
import { Link } from 'react-router-dom';

const mapStateToProps = (state: State) => ({
  restaurant: state.restaurant,
  user: state.user
});

const connector = connect(mapStateToProps, {deleteRestaurant, setAlert, getRestaurants, filterRestaurants});

type Props = ConnectedProps<typeof connector>;

interface RestsProps {
	rest: Restaurant, 
	i: number
}

const Rests: React.FC<RestsProps> = ({rest, i}) => (
	<Fragment key={i}>
		<ListGroup.Item as={'div'}>
			<div className='flex-horizontal space-between'>
				<div className="flex-horizontal gap-lg">
					<div>{rest.name}</div>
					<div>{rest.desc}</div>
				</div>
				<div className='flex-horizontal'>
					<Link to={`/restaurant/${rest._id}`} className='link light btn btn-dark'>
						<i className="fa-solid fa-pen-to-square"></i>
					</Link>
					<Button variant='dark'>
						<i className="fa-solid fa-x"></i>
					</Button> 
				</div>
			</div>
		</ListGroup.Item>
	</Fragment>
);

const Restaurants: React.FC<Props> = ({restaurant, deleteRestaurant, getRestaurants, filterRestaurants}) => {
	const [search, setSearch] = useState('');
	useEffect(() => {
		getRestaurants();
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
		console.log(`handle search ${search}`, e);
		filterRestaurants({name: search, restaurantState: restaurant});
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
							{
								restaurant.filtered ? 
									(
										restaurant.filtered.map((restaurant: Restaurant, i: number) => <Rests rest={restaurant} i={i}/>)
									)
									:
									(
										restaurant.restaurants.map((restaurant: Restaurant, i: number) => <Rests rest={restaurant} i={i}/>)
									)}
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