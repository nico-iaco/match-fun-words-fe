import React, {useState} from "react";
import {Container, Snackbar, TextField} from "@material-ui/core";
import {Header} from "./Header";
import {IUserRegister} from "../model/IUserRegister";
import Button from "@material-ui/core/Button";
import {registerRequest} from "../api/UserApi";
import { useHistory } from "react-router-dom";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const defaultUser: IUserRegister = {
    email: "",
    name: "",
    password: "",
    surname: "",
    username: ""
}

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const RegistrationPage: React.FC = () => {

    const [user, setUser] = useState<IUserRegister>(defaultUser);
    const [snackbarEnabled, setSnackbarEnabled] = useState<boolean>(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const history = useHistory();

    const doRegister = () => {
        registerRequest(user)
            .then(response => {
                const successful: boolean = response.data;
                console.log(successful);
                setSnackbarEnabled(() => true);
                setRegistrationSuccess(successful);


            })
    }

    const handleClose = () => {
        setSnackbarEnabled(() => false);
        if (registrationSuccess) {
            history.push("/");
        }
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
            <Snackbar open={snackbarEnabled} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity={registrationSuccess ? "success" : "error"}>
                {
                    registrationSuccess ?
                        "Registrazione effettuata con successo" :
                        "Registrazione non andata a buon fine"
                }
            </Alert>
        </Snackbar>
        </Container>
    )
}

export default RegistrationPage;