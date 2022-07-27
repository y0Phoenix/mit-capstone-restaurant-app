import React, {Dispatch, Fragment, useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation, Navigate} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './routes/Landing';
import Register from './routes/Register';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Home from './routes/Home';
import { loadUser } from './actions/user';
import setAuthToken from './utils/setAuthToken';
import { UserState } from './types/User';
import Redirect from './utils/Redirect';

if (localStorage.token) setAuthToken(localStorage.token);

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const {pathname} = window.location;

  return (
    <Provider store={store}>
      <Router>
        <>
            <div className='main'>
              <Routes>
                <Route path='/' element={<Landing/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route element={<ProtectedRoutes/>}>
                  <Route path='/home' element={<Home />}/>
                </Route>
              </Routes>
            </div>
        </>
      </Router>
    </Provider>
  )
}

export default App;
