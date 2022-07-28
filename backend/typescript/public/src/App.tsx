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
import Sidebar from './components/Sidebar';
import State from './types/State';
import Restaurants from './routes/Restaurants';
import Order from './routes/Order';
import Account from './routes/Account';

if (localStorage.token) setAuthToken(localStorage.token);

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Sidebar />
          <div className='main'>
            <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route element={<ProtectedRoutes/>}>
                <Route path='/home' element={<Home />}/>
                <Route path='/restaurants' element={<Restaurants />}/>
                <Route path='/orders' element={<Order />}/>
                <Route path='/account' element={<Account />}/>
              </Route>
            </Routes>
          </div>
        </>
      </Router>
    </Provider>
  )
}

export default App;
