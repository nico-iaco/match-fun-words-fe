import React from "react";
import {Button, Container} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getUsername} from "../selector/user.selector";
import {createMatch, getInitialCard} from "../api/MatchApi";
import {useHistory} from "react-router-dom";
import {changeRole} from "../action/user.action";
import {PlayerRole} from "../model/PlayerRole";
import {IAnswerCard} from "../model/IAnswerCard";
import {initList} from "../action/answer.action";
import {Header} from "./Header";

const DashboardPage: React.FC = () => {

    const username = useSelector(getUsername);
    const history = useHistory();
    const dispatch = useDispatch();

    const create = () => {
        createMatch()
            .then(response => {
                const matchId = response.data;
                console.log(matchId)
                dispatch(changeRole(PlayerRole.JUDGE))
                getInitialCard(matchId)
                    .then(response => {
                        console.log(response);
                        const answers: IAnswerCard[] = response.data
                        dispatch(initList(answers))
                    })
                history.push("/match/" + matchId);
            })
            .catch(reason => console.log(reason))
    }

    const join = () => {
        history.push("/join");
    }

    return (
        <Container className={"page"} maxWidth={"md"}>
            <Header title={`Welcome ${username}`} />
            <div className={"page-content"}>
                <Button variant={"outlined"} color={"primary"} onClick={create}>Create a new match</Button>
                <br/><br/>
                <Button variant={"outlined"} color={"primary"} onClick={join}>Join a match</Button>
            </div>
        </Container>

    );
}

export default DashboardPage;