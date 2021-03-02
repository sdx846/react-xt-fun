/*
 * @Description: App组件全局状态
 */
import React from "react";

interface ContextProps {
    submitLoading: boolean;
    setSubmitLoading: any;
    theme: "light" | "dark";
    setTheme: any;
}

const store = React.createContext<ContextProps>({ submitLoading: false, setSubmitLoading: null, theme: "dark", setTheme: null });

export default store;