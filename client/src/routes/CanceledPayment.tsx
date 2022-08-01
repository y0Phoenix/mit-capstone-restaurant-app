import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { finishOrder } from '../actions/order';

const connector = connect(null, {finishOrder});

type Props = ConnectedProps<typeof connector>;

const CanceledPayment: React.FC<Props> = ({finishOrder}) => {
  useEffect(() => {
    finishOrder('null', false);
}, []);
  return (
	<div className='flex-horizontal center'>
		<h1>Wrapping Up Your Order Please Wait...</h1>
	</div>
  )
}

export default connector(CanceledPayment);