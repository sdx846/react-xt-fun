import React from 'react'
// import { BrowserRouter as Routers, Switch, Route, Redirect } from 'react-router-dom';
import { HashRouter as Routers, Switch, Redirect, Route } from "react-router-dom";
import Home from './pages/home/home'
import Login from './pages/login/login'
import PageNotFound from './pages/pageOther/pageNotFound';
import { localStore} from "./utils/storage";

export default class Router extends React.Component {
  render() {
    return (
      <Routers>
        <Switch>
          <Route path="/home" render={(props) => (localStore.getItem("token") ? <Home {...props}/>: <Redirect to="/login"/>)}/>
          <Route path="/login" component={Login} />
          <Redirect exact from="/" to="/home/system/role" />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Routers>
    )
  }
}