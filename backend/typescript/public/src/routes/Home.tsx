import React, {Fragment} from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State';
import { filterOrders, getOrders } from '../actions/order';
import { filterRestaurants, getRestaurants } from '../actions/restaurant';
import { Button, ListGroup } from 'react-bootstrap';
import { Order } from '../types/Order';
import {v4 as uuid} from 'uuid';
import { setModal } from '../actions/modal';
import { SetModalPayload } from '../types/Modal';

const mapStateToProps = (state: State) => ({
	user: state.user,
	restaurant: state.restaurant,
	order: state.order
});

const connector = connect(mapStateToProps, {filterOrders, filterRestaurants, getOrders, getRestaurants, setModal});

type Props = ConnectedProps<typeof connector>;

interface RestsOrderProps {
	order: Order, 
	i: number,
	setModal: (payload: SetModalPayload) => void
}

const Rests: React.FC<RestsOrderProps> = ({order, i, setModal}) => (
	<Fragment key={i}>
		<ListGroup.Item as={'div'}>
			<div className='flex-horizontal space-between'>
				<div className="flex-horizontal gap-lg">
					<div>{order.user}</div>
					<div>{order.instructions}</div>
					<ListGroup>
						{order.items.map(item => (
							<Fragment key={uuid()}>
								<ListGroup.Item as={'div'} onClick={() => setModal({
									type: 'item',
									item: item
								})}>
									<div className='flex-horizontal space-between'>
										<div>{item.name}</div>
										<div>{item.price}</div>
									</div>
								</ListGroup.Item>
							</Fragment>
						))}
					</ListGroup>
				</div>
				<div className='flex-horizontal'>
					<Link to={`/restaurant/${order._id}`} className='link light btn btn-dark'>
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

const Home: React.FC<Props> = ({user, restaurant, order, filterOrders, filterRestaurants, getOrders, getRestaurants, setModal}) => {
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
									{order.filtered ? 
										(
											order.filtered.map()
										)
										:
										(

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