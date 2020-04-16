import React, {PropsWithChildren, useEffect, useState} from "react";
import Stomp, {Subscription} from "stompjs";
import {IAnswerCard} from "../model/IAnswerCard";
import {AnswerCard} from "./AnswerCard";
import {PlayerRole} from "../model/PlayerRole";
import {useDispatch} from "react-redux";
import {changeRole} from "../action/user.action";
import {IQuestionCard} from "../model/IQuestionCard";
import {getJudgeCard} from "../api/MatchApi";

interface JudgeProps extends PropsWithChildren<any> {
    matchId: string
}

const JudgeView: React.FC<JudgeProps> = ({matchId}) => {

    const [judgeCard, setJudgeCard] = useState<IQuestionCard>()
    const [answers, setAnswers] = useState<IAnswerCard[]>([]);
    const dispatch = useDispatch()

    const sockJs = new WebSocket("ws://localhost:8080/match-fun-words")
    const client = Stomp.over(sockJs)

    useEffect(() => {

        getJudgeCard(matchId)
            .then(response => {
                setJudgeCard(() => response.data);
            })
            .catch(reason => console.log(reason))

        let subscription: Subscription | null = null;

        client.connect({}, () => {
            console.log("connesso al websocket");
            subscription = client.subscribe(`/game/judge/${matchId}`, message => {
                const answerReceived: IAnswerCard = JSON.parse(message.body);
                setAnswers(prevState => [...prevState, answerReceived])
            })
        }
        );

        return () => {
            if (subscription !== null) {
                subscription.unsubscribe()
            }
        }

    }, [matchId])


    const choosePlayerCard = (card: IAnswerCard) => {
        console.log(card);
        client.send(`/app/match/${matchId}/judge/choose`, {}, JSON.stringify(card));
        dispatch(changeRole(PlayerRole.PLAYER))
        client.disconnect(() => console.log(client.subscriptions))
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