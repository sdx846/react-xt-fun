import React, { useState, useEffect,  useContext,FC } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Layout, Avatar, Dropdown, Menu, Breadcrumb, Modal } from "antd";
import { FormRulesType, MenuMapItem, RouteComponentProps } from "../assets/typings";
import Store from "./store";
interface CurrentMenu {
    openKeys: string[];
    selectedKeys: string[];
}

const { SubMenu } = Menu;

const MyMenu: FC<{ menuList: MenuMapItem[] }> = ({ menuList }) => {
    const { pathname } = useLocation();
    let [menuChildren, setMenuChildren] = useState<Array<JSX.Element>>([]);
    let [currentMenu, setCurrentMenu] = useState<CurrentMenu>({
        openKeys: [],
        selectedKeys: [],
    });
    let { theme } = useContext(Store);
    const onOpenChange = (openKeys) => {
        setCurrentMenu({
            ...currentMenu,
            openKeys,
        });
    };

    const onSelect = (selectedKeys) => {
        setCurrentMenu({
            ...currentMenu,
            selectedKeys,
        });
    };

    const mapMenuListToJSX = (menuList: MenuMapItem[]): Array<JSX.Element> => {
        return menuList.map((route) => {
            if (route.isSubMenu) {
                return (
                    <SubMenu key={route.key} icon={route.icon} title={route.title}>
                        {mapMenuListToJSX(route.children!)}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item key={route.key} icon={route.icon}>
                    <NavLink to={route.path}>{route.title}</NavLink>
                </Menu.Item>
            );
        });
    };

    useEffect(() => {
        setMenuChildren(mapMenuListToJSX(menuList));
    }, [menuList]);

    useEffect(() => {
        const currentRoutes = pathname.split("/");
        setCurrentMenu({
            openKeys: currentRoutes,
            selectedKeys: currentRoutes,
        });
    }, [pathname]);

    return (
        <Menu
            mode="inline"
            theme={theme}
            onOpenChange={onOpenChange}
            onSelect={({ selectedKeys }) => onSelect(selectedKeys)}
            selectedKeys={currentMenu.selectedKeys}
            openKeys={currentMenu.openKeys}
        >
            {menuChildren}
        </Menu>
    );
};

export default MyMenu;

