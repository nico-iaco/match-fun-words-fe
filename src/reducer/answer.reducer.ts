import {IAnswerCard} from "../model/IAnswerCard";

const defaultAnswerState: IAnswerCard[] = []

export const answerReducer = (state: IAnswerCard[] = defaultAnswerState, action: any) => {
    switch (action.type) {
        case "INIT":
            return [
                ...action.answers
            ]
        case "ADD":
            return [
                ...state.concat(action.answer)
            ]
        case "DELETE":
            return [
                ...state.filter(value => value !== action.answer)
            ]
        default:
            return [
                ...state
            ]
    }
}