import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import  './App.css';

import registerServiceWorker from './registerServiceWorker';
//import { BrowserRouter } from 'react-router-dom';


console.log('SUPERMAN',process.env.REACT_APP_NAME);

const root = ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();

//for newer version of react
//ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//    <BrowserRouter><App /></BrowserRouter>
//   );


    // If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals