import { Msg } from "./Msg"

export interface UserState {
    name: string,
    email: string,
    _id: string,
    avatar: string,
    date: number,
    isAuthenticated: boolean | null
};

export interface UserRes {
    name: string,
    email: string,
    date: Date,
    avatar: string,
}

export interface LoginForm {
    email: string,
    password: string,
    remember: boolean
};

export interface LoginAction {
    type: string,
    payload: LoginPayload | null
};

export interface LoginPayload {
    token: string,
    data: UserRes,
    isAuthenticated: boolean,
    error: boolean
};

export interface RegisterForm {
    name: string,
    email: string,
    password: string
};

export interface RegisterAction {
    type: string,
    payload: RegisterPayload | null
};

export interface RegisterPayload {
    msgs: Msg[],
    data: UserRes,
    isAuthenticated: boolean,
    error: boolean
};