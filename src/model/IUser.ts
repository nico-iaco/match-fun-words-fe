import {PlayerRole} from "./PlayerRole";

export interface IUser {
    email: string,
    username: string,
    name: string,
    surname: string,
    jwt: string,
    role: PlayerRole
}