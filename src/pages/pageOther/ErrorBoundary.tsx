/*
 * @Description: 监控路由懒加载时网络问题导致的错误
 */
import React from "react";
import { Result, Button } from "antd";

interface IState {
    hasError: boolean;
}

const PageLoadError = () => {
    return (
        <Result
            status="500"
            title="未知错误"
            subTitle="页面加载失败了,请刷新重试,😥😥😥"
            extra={
                <Button
                    type="primary"
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    点击刷新
                </Button>
            }
        />
    );
};

// 错误检测组件
class ErrorBoundary extends React.Component {
    constructor(props: {} | Readonly<{}>) {
        super(props);
    }

    public state: IState = { hasError: false };

    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error: any) {
        console.error(error);
    }

    render() {
        return this.state.hasError ? <PageLoadError /> : this.props.children;
    }
}

export default ErrorBoundary;
