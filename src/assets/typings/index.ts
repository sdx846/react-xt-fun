/*
 * @Description: 公用类型声明
 */
import { TableProps, ColumnsType } from "antd/lib/table";
import { PaginationProps } from "antd/lib/pagination";
import { Rule } from "rc-field-form/lib/interface";
import { FormInstance } from "antd/lib/form";
// import { IFormType } from "@/components/Conmon/ConmonEdit";
// import { ListItems } from "@/hooks/useSelectList";
import { RouteComponentProps } from "react-router-dom";
import { LazyExoticComponent, FC } from "react";

// formRules类型
interface FormRulesType {
    [key: string]: Rule[] | undefined;
}
interface MenuMapItem {
  title?: string; //名称，用于菜单及面包屑名称
  key: string; //key，唯一标识
  icon?: JSX.Element; //父级菜单需要的图标组件
  path: string; //路由匹配途径
  redirect?: string; //父级菜单重定向路径
  isMenu: boolean; //是否显示在左侧菜单栏
  isSubMenu?: boolean; //是否是父级菜单
  exact: boolean; //是否精确匹配
  noPermission?: boolean; //是否无视权限
  sign?: string; //权限标识，对应后台管理标识
  component?: any;//LazyExoticComponent<FC<RouteComponentProps>>; //对应显示组件
  children?: MenuMapItem[]; //子路由
  parentId?: string;
}
// export { IFormType, ListItems, RouteComponentProps };
export type { MenuMapItem,RouteComponentProps,TableProps, ColumnsType, PaginationProps, FormRulesType,Rule, FormInstance };

