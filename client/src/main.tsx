import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios';

axios.defaults.headers.post["Content-Type"] = 'application/json';
axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
