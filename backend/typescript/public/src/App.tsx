import React, {Dispatch, Fragment, useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './routes/Landing';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className='main'>
            <Routes>
              <Route path='/' element={<Landing/>}/>
            </Routes>
          </div>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
