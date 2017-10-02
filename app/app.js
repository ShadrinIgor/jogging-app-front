'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {BrowserRouter, Route} from "react-router-dom";
import Routes from './routes/routes';

const supportsHistory = 'pushState' in window.history;
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter history={!supportsHistory}>
        <Route component={Routes}/>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

/*
 <Provider store={store}>
 <I18nextProvider i18n={i18n}>
 <BrowserRouter history={!supportsHistory}>
 <Route component={Routes}/>
 </BrowserRouter>
 </I18nextProvider>
 </Provider>,
 */