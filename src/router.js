import React from 'react'
// import { BrowserRouter as Routers, Switch, Route, Redirect } from 'react-router-dom';
import { HashRouter as Routers, Switch, Redirect, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import Home from './pages/home/home'
import Login from './pages/login/login'
import PageNotFound from './pages/pageOther/pageNotFound';
import { localStore} from "./utils/storage";

// moment.locale('en');
export default class Router extends React.Component {
  render() {
    return (
      <ConfigProvider locale={enUS}>
        <Routers>
            <Switch>
              <Route path="/home" render={(props) => (localStore.getItem("token") ? <Home {...props}/>: <Redirect to="/login"/>)}/>
              <Route path="/login" component={Login} />
              <Redirect exact from="/" to="/home/system/role" />
              <Route path="*" component={PageNotFound} />
            </Switch>
        </Routers>
      </ConfigProvider>
    )
  }
}