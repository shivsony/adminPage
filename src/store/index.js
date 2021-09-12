import { createStore, applyMiddleware, compose  } from "react-redux";
import { thunkMiddleware } from "redux-thunk";
import rootReducer from './reducers';

const storeEnhencers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (preloadedState) =>
    createStore(
        rootReducer,
        preloadedState,
        storeEnhencers(applyMiddleware(thunkMiddleware)),
    )