import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { postsReducer } from './post';
import thunk from 'redux-thunk';
import session from './session'
import { matchesReducer } from './match';
import { messagesReducer } from './message';


const rootReducer = combineReducers({
  session,
  posts: postsReducer,
  matches: matchesReducer,
  messages: messagesReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
