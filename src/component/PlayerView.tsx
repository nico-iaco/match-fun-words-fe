import React, {PropsWithChildren, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllAnswer} from "../selector/answer.selector";
import {IAnswerCard} from "../model/IAnswerCard";
import {getUsername} from "../selector/user.selector";
import {AnswerCard} from "./AnswerCard";
import {PlayerRole} from "../model/PlayerRole";
import {Client} from 'stompjs';
import {changeRole} from "../action/user.action";
import {deleteAnswer, newAnswer} from "../action/answer.action";

interface PlayerProps extends PropsWithChildren<any> {
    matchId: string,
    client: Client
}

const PlayerView: React.FC<PlayerProps> = ({matchId, client}) => {
    const playerId = useSelector(getUsername);

    const dispatch =useDispatch();

    useEffect(() => {
        if (client.connected) {
            const cardSubscription = client.subscribe(`/game/player/${matchId}/${playerId}`, message => {
                const card: IAnswerCard = JSON.parse(message.body);
                dispatch(newAnswer(card));
                cardSubscription.unsubscribe();
            });

            const winnerSubscriber = client.subscribe(`/game/player/${matchId}`, message => {
                const winnerCard: IAnswerCard = JSON.parse(message.body);
                //TODO: Far comparire un modale con la scritta ha vinto oppure ritenta
                if (winnerCard.playerId === playerId) {
                    dispatch(changeRole(PlayerRole.JUDGE))
                }
                winnerSubscriber.unsubscribe()
                //TODO: Il disconnect andrà fatto dopo il click sul modale che verrà implementato
                client.disconnect(() => console.log("Websocket disconnected"));
            })
        }
    }, [matchId, client.connected, playerId])


    const answerList: IAnswerCard[] = useSelector(getAllAnswer);

    const sendPlayerCard = (answer: IAnswerCard) => {
        answer.playerId = playerId;
        console.log(answer);
        client.send(`/app/match/${matchId}/player/${playerId}/card`, {}, JSON.stringify(answer));
        dispatch(deleteAnswer(answer));
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