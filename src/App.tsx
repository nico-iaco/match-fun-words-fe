import React from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {EntryComponent} from "./component/EntryComponent";
import Login from "./component/LoginPage";
import RegistrationPage from "./component/RegistrationPage";
import DashboardPage from "./component/DashboardPage";
import {ProtectedRoute} from "./component/ProtectedRoute";
import {useSelector} from "react-redux";


const App: React.FC = () => {

    const username = useSelector((state: any) => state.user.username);

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path={"/"} exact>
                        <EntryComponent/>
                    </Route>
                    <Route path={"/login"} exact>
                        <Login/>
                    </Route>
                    <Route path={"/register"} exact>
                        <RegistrationPage/>
                    </Route>
                    <ProtectedRoute isAuthenticated={username !== ""} exact={true} path={"/dashboard"} authenticationPath={"/login"} component={DashboardPage} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
