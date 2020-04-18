import React, {PropsWithChildren, useEffect, useState} from "react";
import {Client} from "stompjs";
import {IAnswerCard} from "../model/IAnswerCard";
import {AnswerCard} from "./AnswerCard";
import {PlayerRole} from "../model/PlayerRole";
import {useDispatch} from "react-redux";
import {changeRole} from "../action/user.action";
import {IQuestionCard} from "../model/IQuestionCard";
import {getJudgeCard} from "../api/MatchApi";
import {Button, Dialog, DialogTitle} from "@material-ui/core";
import "../css/judgeCard.css"

interface JudgeProps extends PropsWithChildren<any> {
    matchId: string,
    client: Client
}

const JudgeView: React.FC<JudgeProps> = ({matchId, client}) => {

    const [judgeCard, setJudgeCard] = useState<IQuestionCard>();
    const [answers, setAnswers] = useState<IAnswerCard[]>([]);
    const [subscriptionId, setSubscriptionId] = useState("")
    const [roundFinished, setRoundFinished] = useState(false);
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

    const finishRound = () => {
        client.disconnect(() => console.log("Websocket disconnected"));
        dispatch(changeRole(PlayerRole.PLAYER));
    }

    const choosePlayerCard = (card: IAnswerCard) => {
        console.log(card);
        client.send(`/app/match/${matchId}/judge/choose`, {}, JSON.stringify(card));
        client.unsubscribe(subscriptionId);
        setRoundFinished(true);
    }

    return (
        <div>
            <div>
                <div className={"judge-card-div"}>
                    {
                        judgeCard ?
                            judgeCard?.text.replace("{}", "___") :
                            <div/>
                    }
                </div>
            </div>
            <div className={"page-content"}>
                {
                    answers ?
                        answers.map((value, index) => (<AnswerCard key={index} text={value.text} role={PlayerRole.JUDGE}
                                                                   buttonFunction={() => choosePlayerCard(value)}/>)) :
                        <div/>
                }
            </div>

            <Dialog onClose={() => {
            }} aria-labelledby="simple-dialog-title" open={roundFinished}>
                <DialogTitle id="simple-dialog-title">Waiting for other player</DialogTitle>
                <div>
                    Vai al prossimo round <br/>
                    <Button
                        size={"small"}
                        variant={"outlined"}
                        onClick={finishRound}
                        color={"primary"}>Next round</Button>
                </div>
            </Dialog>
        </div>
    )
}

export default JudgeView;