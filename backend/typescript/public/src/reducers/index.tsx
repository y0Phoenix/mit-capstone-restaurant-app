import { combineReducers } from "redux";
import user from "./user";
import order from "./order";
import restaurant from "./restaurant";
import alert from "./alert";

export default combineReducers({
    user,
    order,
    restaurant,
    alert
});