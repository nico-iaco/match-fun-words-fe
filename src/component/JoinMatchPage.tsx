import React, {ChangeEvent, useState} from "react";
import {Container} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {getInitialCard, joinMatch} from "../api/MatchApi";
import {IAnswerCard} from "../model/IAnswerCard";
import {initList} from "../action/answer.action";
import {useDispatch} from "react-redux";
import {changeRole} from "../action/user.action";
import {PlayerRole} from "../model/PlayerRole";

const JoinMatchPage: React.FC = () => {

    const [matchId, setMatchId] = useState("")
    const history = useHistory()
    const dispatch = useDispatch()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setMatchId(event.target.value);
    }

    const join = () => {
        joinMatch(matchId)
            .then(response => {
                if (response.data === true) {
                    dispatch(changeRole(PlayerRole.PLAYER))
                    getInitialCard(matchId)
                        .then(response => {
                            console.log(response);
                            const answers: IAnswerCard[] = response.data
                            dispatch(initList(answers))
                        })
                    history.push("/match/" + matchId);
                } else {
                    console.log("Qualcosa è andato storto")
                }
            })
            .catch(reason => console.log(reason))
    }

    return (
        <Container className={"page"} maxWidth={"md"}>
            <h3>Join match</h3>
            <input type="text" onChange={handleInputChange}/>
            <button onClick={join}>Join</button>
        </Container>
    )
}

export default JoinMatchPage;