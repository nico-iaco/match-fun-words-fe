import React, {useEffect} from "react";
import {Container} from "@material-ui/core";
import {useSelector} from "react-redux";
import {getUserRole} from "../selector/user.selector";
import {PlayerRole} from "../model/PlayerRole";
import JudgeView from "./JudgeView";
import PlayerView from "./PlayerView";
import Stomp from "stompjs";
import {IAnswerCard} from "../model/IAnswerCard";


const GamePage: React.FC = (props: any) => {

    console.log(props);
    const matchId = props.match.params.matchId;
    const role: PlayerRole = useSelector(getUserRole);

    const sockJs = new WebSocket("ws://localhost:8080/match-fun-words");
    const client = Stomp.over(sockJs);
    client.connect({}, () => {
            console.log("connesso al websocket");
        }
    );


    return (
        <Container className={"page"} maxWidth={"md"}>
            <h3>Match {matchId}</h3>
            {
                role === PlayerRole.JUDGE ?
                    <JudgeView matchId={matchId} client={client}/> :
                    <PlayerView matchId={matchId} client={client}/>
            }
        </Container>
    )
}

export default GamePage;