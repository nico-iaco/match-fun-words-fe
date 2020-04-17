import React, {PropsWithChildren, useEffect, useState} from "react";
import {Client} from "stompjs";
import {IAnswerCard} from "../model/IAnswerCard";
import {AnswerCard} from "./AnswerCard";
import {PlayerRole} from "../model/PlayerRole";
import {useDispatch} from "react-redux";
import {changeRole} from "../action/user.action";
import {IQuestionCard} from "../model/IQuestionCard";
import {getJudgeCard} from "../api/MatchApi";

interface JudgeProps extends PropsWithChildren<any> {
    matchId: string,
    client: Client
}

const JudgeView: React.FC<JudgeProps> = ({matchId, client}) => {

    const [judgeCard, setJudgeCard] = useState<IQuestionCard>()
    const [answers, setAnswers] = useState<IAnswerCard[]>([]);
    const [subscriptionId, setSubscriptionId] = useState("")
    const dispatch = useDispatch()


    useEffect(() => {
        getJudgeCard(matchId)
            .then(response => {
                setJudgeCard(() => response.data);
            })
            .catch(reason => console.log(reason))
    }, [matchId])


    useEffect(() => {
        if (client.connected) {
            const {id} = client.subscribe(`/game/judge/${matchId}`, message => {
                const answerReceived: IAnswerCard = JSON.parse(message.body);
                setAnswers(prevState => [...prevState, answerReceived])
            })
            setSubscriptionId(() => id);
        }
    }, [matchId, client.connected])


    const choosePlayerCard = (card: IAnswerCard) => {
        console.log(card);
        client.send(`/app/match/${matchId}/judge/choose`, {}, JSON.stringify(card));
        dispatch(changeRole(PlayerRole.PLAYER));
        client.unsubscribe(subscriptionId);
        client.disconnect(() => console.log("Websocket disconnected"));
    }

    return (
        <div>
            <div>GIUDICE</div>
            <div>
                <div className={"judge-card-div"}>
                    {
                        judgeCard ?
                            judgeCard?.text :
                            <div/>
                    }
                </div>
            </div>
            {
                answers ?
                    answers.map((value, index) => (<AnswerCard key={index} text={value.text} role={PlayerRole.JUDGE}
                                                               buttonFunction={() => choosePlayerCard(value)}/>)) :
                    <div/>
            }
        </div>
    )
}

export default JudgeView;