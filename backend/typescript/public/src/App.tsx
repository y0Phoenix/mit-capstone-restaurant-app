import React, {Dispatch, Fragment, useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.css'
import Landing from './routes/Landing';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Routes>
            <Route path='/' element={<Landing/>}/>
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
