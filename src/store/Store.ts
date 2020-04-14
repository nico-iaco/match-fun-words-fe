import { createStore, combineReducers } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {userReducer} from "../reducer/user.reducer";
import {answerReducer} from "../reducer/answer.reducer";

export default () => {
    const store : any = createStore(
        combineReducers({
            user: userReducer,
            answer: answerReducer
            //TODO: Aggiungere reducer
        }),
        composeWithDevTools()
    );

    return store;
}