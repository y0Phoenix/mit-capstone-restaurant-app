import React, {Dispatch, Fragment, useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './routes/Landing';
import Register from './routes/Register';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className='main'>
            <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/register' element={<Register/>}/>
            </Routes>
          </div>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
