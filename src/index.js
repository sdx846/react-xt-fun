import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import Router from './router';
import reportWebVitals from "./reportWebVitals";
import {
  HashRouter as Routers,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import PageNotFound from "./pages/pageOther/pageNotFound";
import { localStore } from "./utils/storage";

ReactDOM.render(
  <Routers>
    <Switch>
      <Route
        exact
        path="/home"
        render={(props) =>localStore.getItem("token") ? (<Home {...props} />) : (<Redirect to="/login" />)}
      />
      <Route path="/login" component={Login} />
      <Redirect exact from="/" to="/home/hello" />
      <Route path="*" component={PageNotFound} />
    </Switch>
  </Routers>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
