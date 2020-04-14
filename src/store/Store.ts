import { createStore, combineReducers } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {userReducer} from "../reducer/user.reducer";

export default () => {
    const store : any = createStore(
        combineReducers({
            user: userReducer
            //TODO: Aggiungere reducer
        }),
        composeWithDevTools()
    );

    return store;
}