export interface UserState {
    name: string,
    email: string,
    id: string,
    isAuthenticated: boolean
};

export interface LoginForm {
    email: string,
    password: string,
    remeber: boolean
};