import {PlayerRole} from "../model/PlayerRole";
import React from "react";
import "../css/answerCard.css"
import {Button} from "@material-ui/core";

type AnswerProps = {
    text: string,
    role: PlayerRole,
    buttonFunction: () => void
}

export const AnswerCard = ({text, role, buttonFunction}: AnswerProps) => (
    <div className={"answer-card-div"}>
        {text}
        <Button className={"send-btn"} variant={"text"} color={"primary"} onClick={buttonFunction}>{role === PlayerRole.JUDGE ? "CHOOSE": "SEND"}</Button>
    </div>
)