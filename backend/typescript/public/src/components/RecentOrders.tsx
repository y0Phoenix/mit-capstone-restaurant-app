import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import State from '../types/State';

const mapStateToProps = (state: State) => ({
    orders: state.order
})

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const RecentOrders: React.FC<Props> = ({orders}) => {
    return (
          <></> 
    )
}

export default RecentOrders