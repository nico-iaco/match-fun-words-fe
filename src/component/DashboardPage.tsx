import React from "react";
import {Container} from "@material-ui/core";
import {useSelector} from "react-redux";
import {getUsername} from "../selector/user.selector";
import {createMatch} from "../api/MatchApi";
import { useHistory, Redirect } from "react-router-dom";

const DashboardPage: React.FC = () => {

    const username = useSelector(getUsername)
    const history = useHistory()
    const create = () => {
        createMatch()
            .then(response => {
                const matchId = response.data;
                console.log(matchId)
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
                <Redirect to="/join"><button>Join a match</button></Redirect>
            </p>
        </Container>

    );
}

export default DashboardPage;