import React, {ChangeEvent, useState} from "react";
import {Button, Container, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {getInitialCard, joinMatch} from "../api/MatchApi";
import {IAnswerCard} from "../model/IAnswerCard";
import {initList} from "../action/answer.action";
import {useDispatch} from "react-redux";
import {changeRole} from "../action/user.action";
import {PlayerRole} from "../model/PlayerRole";
import {Header} from "./Header";
import {VideogameAsset} from "@material-ui/icons";

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
            <Header title={"Join match"} />
            <div className={"page-content"}>
                <TextField
                    label="Match Id"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={matchId}
                    InputProps={{
                        startAdornment: (
                            <VideogameAsset/>
                        )
                    }}
                />
                <br/><br/>
                <Button variant={"outlined"} color={"primary"} onClick={join}>Join</Button>
            </div>

        </Container>
    )
}

export default JoinMatchPage;