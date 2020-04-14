import {IUser} from "../model/IUser";
import {PlayerRole} from "../model/PlayerRole";

const defaultUserState: IUser = {
    name: "",
    surname: "",
    email: "",
    username: "",
    jwt: "",
    role: PlayerRole.PLAYER
};

export const userReducer = (state: IUser = defaultUserState, action: any) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...action.user
            };
        case "LOGOUT":
            return {
                ...defaultUserState
            };
        case "CHANGE_ROLE":
            return {
                ...state,
                role: action.role
            }
        default:
            return {
                ...state
            };
    }
};