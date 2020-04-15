import React, {ChangeEvent, useState} from "react";
import {Container} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {joinMatch} from "../api/MatchApi";

const JoinMatchPage: React.FC = () => {

    const [matchId, setMatchId] = useState("")
    const history = useHistory()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setMatchId(event.target.value);
    }

    const join = () => {
        joinMatch(matchId)
            .then(response => {
                if (response.data === true) {
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