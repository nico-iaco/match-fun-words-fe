import {IUser} from "../model/IUser";

export const login = (user: IUser) => ({
    type: "LOGIN",
    user
});

export const logout = () => ({
    type: "LOGOUT"
});