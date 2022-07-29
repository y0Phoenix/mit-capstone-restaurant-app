import {AlertState} from './Alert';
import { Modal } from './Modal';
import { OrderState } from './Order';
import { RestaurantState } from './Restaurant';
import {UserState} from './User';

export default interface State {
    alert: AlertState,
    user: UserState,
    restaurant: RestaurantState,
    order: OrderState,
    modal: Modal
}