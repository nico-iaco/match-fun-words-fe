import React from "react";
import {Container} from "@material-ui/core";

const GamePage: React.FC = (props: any) => {

    console.log(props);
    const matchId = props.match.params.matchId;

    return (
        <Container className={"page"} maxWidth={"md"}>
            <h3>Pagina in costruzione</h3>
            <p>Match {matchId}</p>
        </Container>
    )
}

export default GamePage;