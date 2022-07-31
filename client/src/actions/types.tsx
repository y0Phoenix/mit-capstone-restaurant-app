import { OrderState } from "../types/Order";
import { RestaurantState } from "../types/Restaurant";

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL';
export const USER_UPDATED = 'USER_UPDATED';
export const USER_UPDATED_FAIL = 'USER_UPDATED_FAIL';
export const GET_RESTAURANT = 'GET_RESTAURANT';
export const GET_RESTAURANT_FAIL = 'GET_RESTAURANT_FAIL';
export const FILTER_RESTAURANTS = 'FILTER_RESTAURANTS';
export const FILTER_RESTAURANTS_FAIL = 'FILTER_RESTAURANTS_FAIL';
export const GET_ORDER = 'GET_ORDER';
export const GET_ORDER_FAIL = 'GET_ORDER_FAIL';
export const FILTER_ORDERS = 'FILTER_ORDERS';
export const FILTER_ORDERS_FAIL = 'FILTER_ORDERS_FAIL';
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const SET_MODAL = 'SET_MODAL';
export const RESET_MODAL = 'RESET_MODAL';

export interface FilterOptions {
    id?: string,
    name?: string,
    sales?: boolean,
    date?: boolean,
    restaurantState?: RestaurantState,
    orderState?: OrderState
};