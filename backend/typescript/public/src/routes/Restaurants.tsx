import React, { useEffect } from 'react'
import { Tab, Row, Col, ListGroup, Card } from 'react-bootstrap'
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State'
import { deleteRestaurant, getRestaurants } from '../actions/restaurant';
import { setAlert } from '../actions/alert';

const mapStateToProps = (state: State) => ({
  restaurants: state.restaurant
});

const connector = connect(mapStateToProps, {deleteRestaurant, setAlert, getRestaurants});

type Props = ConnectedProps<typeof connector>;

const Restaurants: React.FC<Props> = ({restaurants, deleteRestaurant, setAlert, getRestaurants}) => {
	useEffect(() => {
		getRestaurants(setAlert)
	}, []);
	const handleDelete = (id: string, name: string) => {
		// show modal that confirms whether the user really wants to delete
		// clientConfirm({
		// 	title: 'Confirm Delete',
		// 	text: `Are You Sure You Want To Delete ${name}`,
		// 	type: 'warning'
		// }, deleteRestaurant, {id});
	};
	const handleSearch = (e: any) => {
		
	}
	return (
		<div className="restaurants">
			<div className="restaurants-container">
				<Card>
					
				</Card>
			</div>
		</div>
	)
}

export default connector(Restaurants);