import {IAnswerCard} from "../model/IAnswerCard";

export const initList = (answers: IAnswerCard[]) => ({
    type: "INIT",
    answers
})

export const newAnswer = (answer: IAnswerCard) => ({
    type: "ADD",
    answer
})

export const deleteAnswer = (answer: IAnswerCard) => ({
    type: "DELETE",
    answer
})