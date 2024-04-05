import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createWrapper } from "next-redux-wrapper";
import rootReducer from './rootReducers';

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

// (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
export const store = createStore(
    rootReducer, 
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
    // composeWithDevTools(applyMiddleware(thunk.withExtraArgument()))
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
