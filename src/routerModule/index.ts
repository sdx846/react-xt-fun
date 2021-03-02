/*
 * @Description: 菜单项 路由入口文件
 */
import React from "react";
import { MenuMapItem } from "../assets/typings";
import hello from "./hello";
import system from "./systemRoute";


// 手动生成的404路由
const pageNotFound: MenuMapItem = {
    path: "/home/*",
    key: "pageNotFound",
    exact: true,
    isMenu: false,
    noPermission: true,
    component: React.lazy(() => import("../pages/pageOther/pageNotFound")),
};

// 将引入的路由模块统一放进数组
export const routeMenu: MenuMapItem[] = [
    // hello,
    system, //系统管理
    pageNotFound, //404
];

/*
 * @Description: 对路由表进行过滤操作
 */
export class RouteConfig {
  public menuList: MenuMapItem[] = []; //菜单列表（树结构）
  public routeList: MenuMapItem[] = []; //路由列表 (线性结构)

  constructor(routeMenu: MenuMapItem[], routerList: string[], superManager: boolean) {
      this.init(routeMenu, routerList, superManager);
  }

  /**
   * @description: 将线性的路由表转换为树结构
   * @param {MenuMapItem[]} routeList
   * @return {MenuMapItem[]} menuList
   */
  private getAuthMenu = (routeList: MenuMapItem[]): MenuMapItem[] => {
      const tree: MenuMapItem[] = [];
      const record: {
          [key: string]: MenuMapItem[];
      } = {};

      routeList.forEach((item) => {
          const id = item.path;
          if (record[id]) {
              item.children = record[id];
          } else {
              item.children = record[id] = [];
          }
          if (item.parentId) {
              const parentId = item.parentId;
              if (!record[parentId]) {
                  record[parentId] = [];
              }
              record[parentId].push(item);
          } else {
              tree.push(item);
          }
      });

      return tree;
  };

  // 控制没有组件的路由菜单跳转到第一个子路由，由于权限问题，第一个子路由可能会发生变化，所以使用处理后的map集合进行过滤
  private getAuthRoute = (routeList: MenuMapItem[]) => {
      return routeList.map((item, index) => {
          if (!item.component) {
              item.redirect = routeList[index + 1].path;
          }
          return item;
      });
  };

  /**
   * @description: 初始化函数，生成路由map，过滤数据
   * @param {MenuMapItem} routeMenu 静态路由表
   * @param {string} routerList 权限列表
   * @param {boolean} superManager 是否是超级管理员
   * @return {void}
   */
  private init = (routeMenu: MenuMapItem[], routerList: string[], superManager: boolean): void => {
      // 创建map集合
      const routeSourceMap = new Map<string | undefined, MenuMapItem>();
      const recursion = (routes: MenuMapItem[], parentId?: string) => {
          routes.forEach((item) => {
              if (routerList.includes(item.sign!) || item.noPermission || superManager) {
                  // set时剔除children属性
                  routeSourceMap.set(item.path, {
                      title: item.title,
                      path: item.path,
                      key: item.key,
                      icon: item.icon,
                      exact: item.exact,
                      redirect: item.redirect,
                      isMenu: item.isMenu,
                      isSubMenu: item.isSubMenu,
                      sign: item.sign,
                      parentId,
                      component: item.component,
                  });
                  if (item.children) {
                      recursion(item.children, item.path);
                  }
              }
          });
      };
      recursion(routeMenu);
      this.menuList = this.getAuthMenu(Array.from(routeSourceMap.values())).filter((item) => item.key!=='pageNotFound');
      this.routeList = this.getAuthRoute(Array.from(routeSourceMap.values()));
  };
}

