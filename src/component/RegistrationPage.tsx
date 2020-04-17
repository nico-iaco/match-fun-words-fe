import React, {useState} from "react";
import {Container, TextField} from "@material-ui/core";
import {Header} from "./Header";
import {IUserRegister} from "../model/IUserRegister";
import Button from "@material-ui/core/Button";
import {registerRequest} from "../api/UserApi";
import { useHistory } from "react-router-dom";

const defaultUser: IUserRegister = {
    email: "",
    name: "",
    password: "",
    surname: "",
    username: ""
}

const RegistrationPage: React.FC = () => {

    const [user, setUser] = useState<IUserRegister>(defaultUser);
    const history = useHistory();

    const doRegister = () => {
        registerRequest(user)
            .then(response => {
                const successful: boolean = response.data;
                console.log(successful);
                //TODO: Far uscire un toast con l'esito della registrazione
                history.push("/")
            })
    }

    return (
        <Container className={"page"}>
            <Header title={"Join"}/>
            <TextField
                id={"username"}
                label={"Username"}
                type={"text"}
                margin={"normal"}
                variant={"outlined"}
                value={user.username}
                onChange={e => {
                    e.persist();
                    setUser(prevState => ({...prevState, username: e.target.value}))
                }}
            />
            <TextField
                id={"email"}
                label={"Email"}
                type={"text"}
                margin={"normal"}
                variant={"outlined"}
                value={user.email}
                onChange={e => {
                    e.persist();
                    setUser(prevState => ({...prevState, email: e.target.value}))
                }}
            />
            <TextField
                id={"name"}
                label={"Name"}
                type={"text"}
                margin={"normal"}
                variant={"outlined"}
                value={user.name}
                onChange={e => {
                    e.persist();
                    setUser(prevState => ({...prevState, name: e.target.value}))
                }}
            />
            <TextField
                id={"surname"}
                label={"Surname"}
                type={"text"}
                margin={"normal"}
                variant={"outlined"}
                value={user.surname}
                onChange={e => {
                    e.persist();
                    setUser(prevState => ({...prevState, surname: e.target.value}))
                }}
            />
            <TextField
                id={"password"}
                label={"Password"}
                type={"password"}
                margin={"normal"}
                variant={"outlined"}
                value={user.password}
                onChange={e => {
                    e.persist();
                    setUser(prevState => ({...prevState, password: e.target.value}))
                }}
            />
            <br/>
            <br/>
            <Button
                size={"large"}
                variant={"outlined"}
                onClick={doRegister}
                color={"primary"}>
                Register
            </Button>
        </Container>
    )
}

export default RegistrationPage;