import React, { useState, Suspense, useEffect } from "react";
import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { Layout, Avatar, Dropdown, Modal } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import MyImage from "../../components/image";
import logoImg from "../../assets/img/logo.jpg";
import style from "./home.module.css";
import { MenuMapItem} from "../../assets/typings";
import { localStore, sessionStore } from "../../utils/storage";
import MyMenu from "../../components/menu";
import Breadcrumb from "../../components/breadcrumb";
import ErrorBoundary from "../pageOther/ErrorBoundary";
import LoadingPage from "../pageOther/LoadingPage";
import Store from "../../components/store";
import { routeMenu, RouteConfig } from "../../routerModule/index";
// import menu from '../../api/request/menu.json'
// import routerList from '../../api/request/userInfo.json'

const { Header, Content, Sider } = Layout;

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { loginName, superManager, routerList } = localStore.getItem(
    "userInfo"
  );
  let [collapsed, setCollapsed] = useState(false);
  let [submitLoading, setSubmitLoading] = useState<boolean>(false);
  let [appRoutes, setAppRoutes] = useState<{
    routeList: MenuMapItem[];
    menuList: MenuMapItem[];
  }>({
      routeList: [],
      menuList: [],
  });
  useEffect(() => {
    const { routeList, menuList } = new RouteConfig(routeMenu, routerList, superManager);
    setAppRoutes({ routeList, menuList });
  }, []);
  const onLogOut = () => {
    Modal.confirm({
      title: "确认退出登录吗？",
      onOk: () => {
        localStore.removeItem("token");
        localStore.removeItem("userInfo");
        history.replace("/login");
      },
    });
  };
    return (
      // <Store.Provider value={}>
        <Layout className={style.layout}>
          <Sider collapsed={collapsed} theme="dark" width="256">
            <div className={style.logo}>
              <MyImage src={logoImg} width={35} height={35} preview={false} />
              {!collapsed && (
                <span className={style.logoText}>后台管理系统</span>
              )}
            </div>
            <MyMenu menuList={appRoutes.menuList}></MyMenu>
          </Sider>
          <Layout>
            <Header className={style.header}>
              <div onClick={() => setCollapsed((collapsed) => !collapsed)}>
                {collapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )}
              </div>
              <div onClick={onLogOut}>{loginName} 退出</div>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb routeList={appRoutes.routeList}/>
              <div>
                <ErrorBoundary>
                  {/*Suspense:路由懒加载渲染时页面会有延迟，Suspense的fallback属性可以接受在组件加载过程中你要展示的任何react元素 */}
                  <Suspense fallback={<LoadingPage />}>
                    <Switch>
                      {appRoutes.routeList.map((route) => {
                        return (
                          <Route
                            path={route.path}
                            key={route.path}
                            exact={route.exact}
                            render={(props) => {
                              let PageComponent = route.component as React.FC<RouteComponentProps>;
                              if (props.match.params.id) {
                                sessionStore.setItem(
                                  "urlId",
                                  props.match.params.id
                                );
                              }
                              return route.redirect ? (
                                <Redirect to={route.redirect} />
                              ) : (
                                <PageComponent {...props} />
                              );
                            }}
                          />
                        );
                      })}
                    </Switch>
                  </Suspense>
                </ErrorBoundary>
              </div>
            </Content>
          </Layout>
        </Layout>
      // </Store.Provider>
    );
}
export default Home;
