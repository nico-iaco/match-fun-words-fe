import React from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {EntryComponent} from "./component/EntryComponent";
import Login from "./component/LoginPage";
import RegistrationPage from "./component/RegistrationPage";


const App: React.FC = () => {
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
                    <Route path={"/dashboard"} exact>
                        {/*TODO: Aggiungere pagina principale*/}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
