import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { finishOrder } from '../actions/order';

const connector = connect(null, {finishOrder});

type Props = ConnectedProps<typeof connector>;

const CanceledPayment: React.FC<Props> = ({finishOrder}) => {
	const {pathname} = useLocation()
	useEffect(() => {
		const token = pathname.replace('/canceledpayment/', '')
		finishOrder(token, true);
	}, []);
  return (
	<div className='landing'>
		<h1>Wrapping Up Your Order Please Wait...</h1>
	</div>
  )
}

export default connector(CanceledPayment);