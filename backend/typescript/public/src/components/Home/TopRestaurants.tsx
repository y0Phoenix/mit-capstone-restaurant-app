import React, { Fragment, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import State from '../../types/State';
import { setModal } from '../../actions/modal';
import { filterRestaurants, getRestaurants } from '../../actions/restaurant';
import moment from 'moment';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
 
const mapStateToProps = (state: State) => ({
    restaurant: state.restaurant,
    isAuthenticated: state.user.isAuthenticated
});

const connector = connect(mapStateToProps, {setModal, filterRestaurants, getRestaurants});

type Props = ConnectedProps<typeof connector>;

const TopRestaurants: React.FC<Props> = ({isAuthenticated, restaurant, setModal, filterRestaurants, getRestaurants}) => {
    const {filtered} = restaurant;
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated && restaurant.restaurants.length > 0) {
            return filterRestaurants({restaurantState: restaurant, sales: true});
        }
        getRestaurants()
    }, [restaurant.restaurants]);
    return (
        <ListGroup>
            {filtered && filtered.map((rest, i) => (
                <Fragment key={i}>
                    <ListGroup.Item as={'div'} onClick={() => navigate(`/restaurant/${rest._id}`)} className='pointer'>
                        <div className='flex-vertical gap-sm'>
                            <div className='flex-horizontal space-between'>
                                <div>{rest.name}</div>
                                <div>Item Amount {rest.items.length}</div>
                            </div>
                            <div>Total Sales ${rest.sales}</div>
                        </div>
                    </ListGroup.Item>
                </Fragment>
            ))}
        </ListGroup>
    )
}

export default connector(TopRestaurants);