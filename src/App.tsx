import React from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import LoginPage from "./component/LoginPage";
import RegistrationPage from "./component/RegistrationPage";
import DashboardPage from "./component/DashboardPage";
import {ProtectedRoute} from "./component/ProtectedRoute";
import {useSelector} from "react-redux";
import {getUsername} from "./selector/user.selector";
import GamePage from "./component/GamePage";
import JoinMatchPage from "./component/JoinMatchPage";


const App: React.FC = () => {

    const username = useSelector(getUsername);

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path={"/"} exact>
                        <Redirect to={"/login"}/>
                    </Route>
                    <Route path={"/login"} exact>
                        <LoginPage/>
                    </Route>
                    <Route path={"/register"} exact>
                        <RegistrationPage/>
                    </Route>
                    <ProtectedRoute isAuthenticated={username !== ""} authenticationPath={"/login"} exact={true} path={"/dashboard"} component={DashboardPage} />
                    <ProtectedRoute isAuthenticated={username !== ""} authenticationPath={"/login"} exact={true} path={"/match/:matchId"} component={GamePage} />
                    <ProtectedRoute isAuthenticated={username !== ""} authenticationPath={"/login"} exact={true} path={"/join"} component={JoinMatchPage} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
