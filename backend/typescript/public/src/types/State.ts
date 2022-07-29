import {Alert} from './Alert';
import { Modal } from './Modal';
import { Order } from './Order';
import { Restaurant } from './Restaurant';
import {UserState} from './User';

export default interface State {
    alert: Alert,
    user: UserState,
    restaurant: Restaurant[],
    order: Order[],
    modal: Modal
}