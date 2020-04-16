import React from "react";
import {Container} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getUsername} from "../selector/user.selector";
import {createMatch, getInitialCard} from "../api/MatchApi";
import {Link, useHistory} from "react-router-dom";
import {changeRole} from "../action/user.action";
import {PlayerRole} from "../model/PlayerRole";
import {IAnswerCard} from "../model/IAnswerCard";
import {initList} from "../action/answer.action";

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

    return (
        <Container className={"page"} maxWidth={"md"}>
            <h3>Welcome {username}</h3>
            <p>
                <button onClick={create}>Create a new match</button>
                <br/>
                <Link to={"/join"}><button>Join a match</button></Link>
            </p>
        </Container>

    );
}

export default DashboardPage;