import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginForm from './login';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter, Switch } from 'react-router-dom';


sessionStorage.setItem('type', 0);
sessionStorage.setItem('category', 0);
sessionStorage.setItem('sentiment', 0);

const screenRoutes = (
  < BrowserRouter >
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route path="/label-form" component={App} />
    </Switch>
  </BrowserRouter>

)

ReactDOM.render(
  // <React.StrictMode>
  screenRoutes,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
