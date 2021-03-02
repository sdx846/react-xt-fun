/*
 * @Description: 通用loading页面组件，主要用于路由懒加载
 */
import { Spin } from "antd";

const style = { width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" };

const LoadingPage = () => {
    return (
        <div style={style}>
            <Spin size="large" />
        </div>
    );
};

export default LoadingPage;
