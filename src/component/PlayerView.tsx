import React, {PropsWithChildren, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllAnswer} from "../selector/answer.selector";
import {IAnswerCard} from "../model/IAnswerCard";
import {getUsername} from "../selector/user.selector";
import {AnswerCard} from "./AnswerCard";
import {PlayerRole} from "../model/PlayerRole";
import {Client} from 'stompjs';
import {deleteAnswer, newAnswer} from "../action/answer.action";
import {Button, CircularProgress, Dialog, DialogTitle} from "@material-ui/core";
import {CheckCircle, Clear} from "@material-ui/icons";
import {green, red} from "@material-ui/core/colors";
import {changeRole} from "../action/user.action";

interface PlayerProps extends PropsWithChildren<any> {
    matchId: string,
    client: Client
}

const PlayerView: React.FC<PlayerProps> = ({matchId, client}) => {
    const playerId = useSelector(getUsername);

    const dispatch = useDispatch();
    const [waiting, setWaiting] = useState(false);
    const [roundFinished, setRoundFinished] = useState(false);
    const [textToShow, setTextToShow] = useState<JSX.Element>(() => (<div/>));
    const [nextRole, setNextRole] = useState<PlayerRole>(PlayerRole.PLAYER);
    const [pingId, setPingId] = useState();

    useEffect(() => {
        if (client.connected) {
            const cardSubscription = client.subscribe(`/game/player/${matchId}/${playerId}`, message => {
                const card: IAnswerCard = JSON.parse(message.body);
                dispatch(newAnswer(card));
                cardSubscription.unsubscribe();
            });

            const winnerSubscriber = client.subscribe(`/game/player/${matchId}`, message => {
                const winnerCard: IAnswerCard = JSON.parse(message.body);
                if (winnerCard.playerId === playerId) {
                    setNextRole(PlayerRole.JUDGE);
                    setTextToShow(() => (
                        <div>
                            <CheckCircle fontSize={"large"} style={{ color: green[500] }}/><br/>
                            Complimenti hai vinto
                        </div>
                    ));
                } else {
                    setTextToShow(() => (
                        <div>
                            <Clear fontSize={"large"} style={{ color: red[500] }}/><br/>
                            Peccato, hai perso
                        </div>
                    ));
                }
                winnerSubscriber.unsubscribe();
                setRoundFinished(() => true);

            });
            setPingId(() => setInterval(() => client.send("/"), 50000));
        } else {
            clearInterval(pingId);
        }
    }, [matchId, client.connected, playerId])


    const answerList: IAnswerCard[] = useSelector(getAllAnswer);

    const sendPlayerCard = (answer: IAnswerCard) => {
        answer.playerId = playerId;
        console.log(answer);
        client.send(`/app/match/${matchId}/player/${playerId}/card`, {}, JSON.stringify(answer));
        dispatch(deleteAnswer(answer));
        setWaiting(() => true);
        setTextToShow(() => (
            <div>
                <CircularProgress />
            </div>
        ));
    }

    const finishRound = () => {
        dispatch(changeRole(nextRole));
        client.disconnect(() => console.log("Websocket disconnected"));
    }

    return (
        <div>
            {
                answerList ?
                    answerList.map((answer, index) => (
                        <AnswerCard key={index} text={answer.text} role={PlayerRole.PLAYER}
                                    buttonFunction={() => sendPlayerCard(answer)}/>)) :
                    <div/>
            }
            <Dialog onClose={() => {
            }} aria-labelledby="simple-dialog-title" open={waiting}>
                <DialogTitle id="simple-dialog-title">Waiting for other player</DialogTitle>
                <div>
                    {textToShow}
                    <Button
                        disabled={!roundFinished}
                        size={"small"}
                        variant={"outlined"}
                        onClick={finishRound}
                        color={"primary"}>Next round</Button>
                </div>
            </Dialog>
        </div>
    );
}

export default PlayerView;