import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

const configureStore = () => {
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(thunk)
  );
  const composedEnhancers = compose(middlewareEnhancer);
  const store = createStore(rootReducer, composedEnhancers);

  return store;
};

export default configureStore;