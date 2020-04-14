import axios from 'axios';
import apiConfig from "./apiConfig";
import {IUserRegister} from "../model/IUserRegister";


const userBaseUrl = apiConfig.USER_BASE;

/**
 * This API try to log in the user
 * @param username the user's username
 * @param password the user's password
 * @return the user object with its info or null if the user doesn't exist
 */
export const loginRequest = async (username: string, password: string) => {
    const body = {
        username,
        pwd: password
    };

    return await axios.post(
        userBaseUrl + apiConfig.LOGIN,
        body);
};

export const registerRequest = async (user: IUserRegister) => {
    return await axios.post(
        userBaseUrl + apiConfig.REGISTER,
        user
    );
}