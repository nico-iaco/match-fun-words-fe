import {IUser} from "../model/IUser";
import {PlayerRole} from "../model/PlayerRole";

export const login = (user: IUser) => ({
    type: "LOGIN",
    user
});

export const logout = () => ({
    type: "LOGOUT"
});

export const changeRole = (role: PlayerRole) => ({
    type: "CHANGE_ROLE",
    role
})