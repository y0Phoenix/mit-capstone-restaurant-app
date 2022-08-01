import { Fragment, useEffect, useState } from 'react'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'
import Landing from './routes/Landing'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Modal from './components/Modal/Modal'
import PaymentSuccess from './routes/PaymentSuccess'
import CanceledPayment from './routes/CanceledPayment'
import AlertComp from './components/AlertComp'
import Register from './routes/Register'
import { loadUser } from './actions/user'
import setAuthToken from './utils/setAuthToken'
import Login from './routes/Login'

if (localStorage.token) setAuthToken(localStorage.token);

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, [])
  	return (
		<Provider store={store}>
			<BrowserRouter>
				<Fragment>
					<Navigation />
					<AlertComp />
					<div className='main'>
						<Modal />
						<Routes>
							<Route path='/' element={<Landing />}/>
							<Route path='/register' element={<Register />}/>
							<Route path='/login' element={<Login />}/>
							<Route path='/paymentsuccess/:token' element={<PaymentSuccess />}/>
							<Route path='/canceledpayment/:token' element={<CanceledPayment />}/>
						</Routes>
					</div>
				</Fragment>
			</BrowserRouter>
		</Provider>
	)
}

export default App
