import React, {Fragment} from "react";
import { ListGroup, Button } from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import State from "../../types/State";
import { setModal } from "../../actions/modal";
import { Order } from "../../types/Order";
import {v4 as uuid} from 'uuid';
import { deleteOrder } from "../../actions/order";

const connector = connect(null, {setModal, deleteOrder});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    order: Order,
    i: number
};

const RecentOrders: React.FC<Props> = ({order, i, setModal, deleteOrder}) => {
	const navigate = useNavigate();
	return (
		<Fragment key={i}>
			<ListGroup.Item as={'div'} onClick={() => navigate(`/order/${order._id}`)}>
				<div className='flex-horizontal space-between'>
					<div className="flex-horizontal gap-lg">
						<div>{order.user}</div>
						<div>{order.instructions}</div>
						<ListGroup>
							{order.items.map((item, i) => (
								<Fragment key={uuid()}>
								{
									i <= 3 && (
											<ListGroup.Item as={'div'}>
												<div className='flex-horizontal space-between'>
													<div>{item.name}</div>
													<div>{item.price}</div>
												</div>
											</ListGroup.Item>
									)
								}
								</Fragment>
							))}
						</ListGroup>
					</div>
					<div className='flex-horizontal'>
						<Link to={`/order/${order._id}`} className='link light btn btn-dark'>
							<i className="fa-solid fa-pen-to-square"></i>
						</Link>
						<Button variant='dark' onClick={() => setModal({
                            type: 'confirm',
                            confirm: {
                                show: true,
                                title: 'Confirm Deletion',
                                text: `Are You Sure You Want To Delete ${order.user} Order`,
                                callbacks: {
									generic: deleteOrder
								},
                                payload: {
                                    id: order._id
                                },
                                type: 'danger'
                            }
                        })}>
							<i className="fa-solid fa-x"></i>
						</Button> 
					</div>
				</div>
			</ListGroup.Item>
		</Fragment>
	);
};

export default connector(RecentOrders);