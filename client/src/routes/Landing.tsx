import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State'
import { setModal } from '../actions/modal';
import {filterRestaurants, getRestaurants} from '../actions/restaurant'

const mapStateToProps = (state: State) => ({
	user: state.user,
	restaurant: state.restaurant,
});

const connector = connect(mapStateToProps, {setModal, filterRestaurants, getRestaurants});

type Props = ConnectedProps<typeof connector>;

const Landing: React.FC<Props> = ({user, restaurant, setModal, filterRestaurants}) => {
	return (
		<div>Landing</div>
	)
}

export default connector(Landing);