/*
 * @Description: 通用table组件，封装了小部分初始化参数
 */

import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { TableProps, ColumnsType } from "antd/lib/table";
import { PaginationProps } from "antd/lib/pagination";

export type { ColumnsType };

interface IPaginationProps extends PaginationProps {
    pageNo?: number;
}

const initialPagination: IPaginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `共${total}条`,
    total: 0,
    size: "default",
    current: 1,
    pageSize: 2,
};

const initialProps: TableProps<any> = {
    columns: [],
    dataSource: [],
    rowKey: "id",
    bordered: true,
    size: "small",
};

const ConmonTable: React.FC<TableProps<any>> = (props) => {
    let [tableProps, setTableProps] = useState<TableProps<any>>({ pagination: initialPagination, ...initialProps });

    useEffect(() => {
        let { pagination, ...otherProps } = props;
        (pagination as IPaginationProps).current = (pagination as IPaginationProps).pageNo;
        setTableProps(() => {
            return { pagination: { ...initialPagination, ...pagination }, ...{ ...initialProps, ...otherProps } };
        });
    }, [props]);

    return <Table {...tableProps} />;
};

export default ConmonTable;
