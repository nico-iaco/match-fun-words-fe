import axios from 'axios';
import apiConfig from "./apiConfig";

const matchBaseUrl = apiConfig.MATCH_BASE;

const getToken = () => localStorage.getItem("jwt")

axios.interceptors.request.use(function (config) {
    config.headers.Authorization = "Bearer " + getToken();
    return config;
});

export const createMatch = async () => {

    return await axios.post(
        matchBaseUrl + apiConfig.CREATE_MATCH
    );
}

export const joinMatch = async (matchId: string) => {
    return await axios.post(
        matchBaseUrl + "/" + matchId + apiConfig.JOIN_MATCH
    );
}

export const getInitialCard = async (matchId: string) => {
    return await axios.post(
        matchBaseUrl + "/" + matchId + apiConfig.GET_INITIAL_CARD
    );
}

export const getJudgeCard = async (matchId: string) => {
    return await axios.post(
        matchBaseUrl + "/" + matchId + apiConfig.GET_JUDGE_CARD
    );
}