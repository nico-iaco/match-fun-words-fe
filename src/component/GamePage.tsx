import React from "react";
import {Container} from "@material-ui/core";
import {useSelector} from "react-redux";
import {getUserRole} from "../selector/user.selector";
import {PlayerRole} from "../model/PlayerRole";
import JudgeView from "./JudgeView";
import PlayerView from "./PlayerView";


const GamePage: React.FC = (props: any) => {

    console.log(props);
    const matchId = props.match.params.matchId;
    const role: PlayerRole = useSelector(getUserRole);

    return (
        <Container className={"page"} maxWidth={"md"}>
            <h3>Match {matchId}</h3>
            {
                role === PlayerRole.JUDGE ?
                    <JudgeView matchId={matchId}/> :
                    <PlayerView matchId={matchId}/>
            }
        </Container>
    )
}

export default GamePage;