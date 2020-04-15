import React, {FunctionComponent} from 'react';
import {Container} from "@material-ui/core";

export const EntryComponent: FunctionComponent<any> = () => {

    return (
        <Container className={"page"} maxWidth={"md"}>
            <a href={"/login"}><button>Sign in</button></a>
            <br/>
            <a href={"/register"}><button>Join</button></a>
        </Container>
    );
}