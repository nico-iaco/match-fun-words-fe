import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {IUser} from "../model/IUser";
import {login} from "../action/user.action";
import {Link, useHistory} from "react-router-dom";
import {loginRequest} from "../api/UserApi";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import {Container, TextField} from "@material-ui/core";
import {Header} from "./Header";
import {actionButtonStyle} from "../css/actionButtonStyle";
import "../css/login.css"

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const buttonStyle = actionButtonStyle();

    const doLogin = () => {
        loginRequest(username, password)
            .then(response => {
                const body : IUser = response.data;
                if (body != null) {
                    console.log(body);
                    localStorage.setItem("jwt", body.jwt)
                    dispatch(login(body));
                    history.push("/dashboard")
                }
            })
            .catch(reason => console.log(reason));
    };

    return (
        <Container className="page" maxWidth={"md"}>
            <Header title={"Match fun words"}/>
            <div className={"page-content"}>
                <TextField
                    id={"username"}
                    label={"Username"}
                    margin={"normal"}
                    variant={"outlined"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <PersonIcon/>
                        )
                    }}
                />
                <br/>
                <TextField
                    id={"password"}
                    label={"Password"}
                    type={"password"}
                    autoComplete={"current-password"}
                    margin={"normal"}
                    variant={"outlined"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <VpnKeyIcon/>
                        )
                    }}
                />
                <br/>
                <br/>
                <Button
                    classes={{
                        root: buttonStyle.root,
                        label: buttonStyle.label
                    }}
                    size={"large"}
                    variant={"text"}
                    onClick={doLogin}>
                    login
                </Button>
                <br/><br/>
                <div className={"redirect-register-div"}>
                    <p>New user?</p>
                    <b><Link to={"/register"}>Register now!</Link></b>
                </div>
            </div>
        </Container>
    );
};

export default LoginPage;