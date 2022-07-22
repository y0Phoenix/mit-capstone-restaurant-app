import { combineReducers } from "redux";
import user from "./user";
import order from "./order";
import restaurant from "./restaurant";

export default combineReducers({
    user,
    order,
    restaurant
});