'babel-polyfill';
import { createRoot } from 'react-dom/client';
import thunk from 'redux-thunk';
import { legacy_createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers';

import Main from './view/main';

import './index.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const root = createRoot(document.getElementById('app') as Element);

root.render(
  <Provider store={store}>
    <Main />
  </Provider>,
);
