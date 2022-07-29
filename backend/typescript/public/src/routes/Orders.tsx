import React, {useState, useEffect, Fragment} from 'react'
import { getOrders, filterOrders } from '../actions/order';
import { Link } from 'react-router-dom';
import State from '../types/State';
import {connect, ConnectedProps} from 'react-redux';
import { ListGroup, Card, InputGroup, Button, FormControl } from 'react-bootstrap'
import { Order } from '../types/Order';

const mapStateToProps = (state: State) => ({
    order: state.order,
})

const connector = connect(mapStateToProps, {getOrders, filterOrders});

type Props = ConnectedProps<typeof connector>;

interface AddItemProps extends Props {
    setState: React.Dispatch<React.SetStateAction<FormData>>,
    formData: FormData
};

interface RestsProps {
	order: Order, 
	i: number
}

const Rests: React.FC<RestsProps> = ({order, i}) => (
	<Fragment key={i}>
		<ListGroup.Item as={'div'}>
			<div className='flex-horizontal space-between'>
				<div className="flex-horizontal gap-lg">
					<div>{order.user}</div>
					<div>{order.instructions}</div>
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

const Orders: React.FC<Props> = ({order, getOrders, filterOrders}) => {
    const [search, setSearch] = useState('');
	useEffect(() => {
		getOrders();
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
		filterOrders({name: search, orderState: order});
	}
	return (
		<div className="restaurants">
			<div className="restaurants-container">
				<Card>
					<Card.Header>Orders</Card.Header>
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
								order.filtered ? 
									(
										order.filtered.map((order: Order, i: number) => <Rests order={order} i={i}/>)
									)
									:
									(
										order.orders.map((order: Order, i: number) => <Rests order={order} i={i}/>)
									)}
						</ListGroup>
                        {order.orders.length <= 0 && 
                            <Card.Footer>
                                No Orders Found
                            </Card.Footer>
                        }
					</Card.Body>
				</Card>
			</div>
		</div>
	)
}

export default connector(Orders);