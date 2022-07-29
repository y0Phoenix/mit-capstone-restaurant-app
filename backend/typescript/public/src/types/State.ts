import {AlertState} from './Alert';
import { Modal } from './Modal';
import { Order } from './Order';
import { Restaurant, RestaurantState } from './Restaurant';
import {UserState} from './User';

export default interface State {
    alert: AlertState,
    user: UserState,
    restaurant: RestaurantState,
    order: Order[],
    modal: Modal
}