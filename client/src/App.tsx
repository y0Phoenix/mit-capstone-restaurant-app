import { Fragment, useState } from 'react'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'
import Landing from './routes/Landing'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'

function App() {
  	return (
		<Provider store={store}>
			<BrowserRouter>
				<Fragment>
					<Navigation />
					<div className='main'>
						<Routes>
							<Route path='/' element={<Landing />}/>
						</Routes>
					</div>
				</Fragment>
			</BrowserRouter>
		</Provider>
	)
}

export default App
