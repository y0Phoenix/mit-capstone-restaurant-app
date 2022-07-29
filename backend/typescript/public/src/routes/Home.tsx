import React, {Fragment} from 'react'
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State';
import { filterOrders, getOrders, deleteOrder } from '../actions/order';
import { filterRestaurants, getRestaurants, deleteRestaurant } from '../actions/restaurant';
import { Button, ListGroup } from 'react-bootstrap';
import { Order } from '../types/Order';
import {v4 as uuid} from 'uuid';
import { setModal } from '../actions/modal';
import { SetModalPayload } from '../types/Modal';
import RecentOrders from '../components/Home/RecentOrders';

const mapStateToProps = (state: State) => ({
	user: state.user,
	restaurant: state.restaurant,
	order: state.order
});

const connector = connect(mapStateToProps, {filterOrders, filterRestaurants, getOrders, getRestaurants, setModal, deleteRestaurant, deleteOrder});

type Props = ConnectedProps<typeof connector>;

const Home: React.FC<Props> = ({user, restaurant, order, filterOrders, filterRestaurants, getOrders, getRestaurants, setModal, deleteOrder, deleteRestaurant}) => {
	return (
		<>
			<div className='home'>
				<Row md={1} lg={2}>
					<Col md={1} lg={8}>
						<Card>
							<Card.Header>
								<Card.Title>Recent Orders</Card.Title>
							</Card.Header>
							<Card.Body>
								<ListGroup>
									{order.filtered &&
										(
											order.filtered.map((order, i) => <RecentOrders order={order} i={i}/>)
										)
									}
								</ListGroup>
							</Card.Body>
						</Card>
					</Col>
					<Col md={1} lg={4}>
						<Card>
							<Card.Header>
								<Card.Title>Top Restaurants</Card.Title>
							</Card.Header>
						</Card>
					</Col>
					<Col md={1} lg={12}>
						<Card>
							<Card.Header>
								<Card.Title>Welcome {user.name} Checkout Your Dashboard</Card.Title>
							</Card.Header>
							<Card.Body>
								<img src={user.avatar}></img>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	)
}

export default connector(Home);