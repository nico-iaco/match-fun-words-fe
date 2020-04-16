import React, {PropsWithChildren, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllAnswer} from "../selector/answer.selector";
import {IAnswerCard} from "../model/IAnswerCard";
import {getUsername} from "../selector/user.selector";
import {AnswerCard} from "./AnswerCard";
import {PlayerRole} from "../model/PlayerRole";
import Stomp from 'stompjs';
import {changeRole} from "../action/user.action";

interface PlayerProps extends PropsWithChildren<any> {
    matchId: string
}

const PlayerView: React.FC<PlayerProps> = ({matchId}) => {
    const playerId = useSelector(getUsername);

    const dispatch =useDispatch();

    const sockJs = new WebSocket("ws://localhost:8080/match-fun-words");
    const client = Stomp.over(sockJs);

    useEffect(() => {
        client.connect({}, () => {
            console.log("connesso al websocket");
            client.subscribe(`/game/player/${matchId}`, message => {
                const winnerCard: IAnswerCard = JSON.parse(message.body);
                //TODO: Far comparire un modale con la scritta ha vinto oppure ritenta
                client.disconnect(() => console.log("WebSocket chiuso"))
                if (winnerCard.playerId === playerId) {
                    dispatch(changeRole(PlayerRole.JUDGE))
                }
            })
        });
    }, [matchId])


    const answerList: IAnswerCard[] = useSelector(getAllAnswer);

    const sendPlayerCard = (answer: IAnswerCard) => {
        answer.playerId = playerId;
        console.log(answer);
        client.send(`/app/match/${matchId}/player/${playerId}/card`, {}, JSON.stringify(answer))
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
        </div>
    );
}

export default PlayerView;