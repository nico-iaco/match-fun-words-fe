import {PlayerRole} from "../model/PlayerRole";
import React from "react";

type AnswerProps = {
    text: string,
    role: PlayerRole,
    buttonFunction: () => void
}

export const AnswerCard = ({text, role, buttonFunction}: AnswerProps) => (
    <div>
        {text}
        <button onClick={buttonFunction}>{role === PlayerRole.JUDGE ? "CHOOSE": "SEND"}</button>
    </div>
)