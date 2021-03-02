/*
 * @Description: 404页面
 */
import React, { FC } from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

const PageNotFound: FC = () => {
    const history = useHistory();
    return (
        <Result
            status="404"
            title="404"
            subTitle="您所访问的页面不存在,点击下方按钮返回首页,😅😅😅"
            extra={
                <Button type="primary" onClick={() => history.replace("/home")}>
                    返回首页
                </Button>
            }
        />
    );
};

export default PageNotFound;
