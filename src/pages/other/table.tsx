import React, { useState, useEffect, FC } from "react";
import { Table, Tag, Space,Button } from "antd";
import { TableProps, ColumnsType } from "antd/lib/table";
import { PaginationProps } from "antd/lib/pagination";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import TableSearch from "../../components/tableSearch";
import useSearchParams from '../../hooks/searchParams'
import * as tableApi from '../../api/request/table';
import MyImage from '../../components/image';
import {
  FormRulesType,
  RouteComponentProps,
  IFormType,
} from "../../assets/typings";
import CommonTable from "../../components/table";
import {
  ADVERTISE_AREA_TYPE,
  ADVERTISE_PUSH_STATUS,
  ADVERTISE_PUSH_SHOW_STATUS,
  ADVERTISE_SPACE_TYPE,
  findConstant,
  ConstantTag,
  ConstantIcon,
} from "@/assets/constant";

const MyTable: FC<RouteComponentProps> = ({ history }) => {
  let [loading, setLoading] = useState(false);
  const columns: ColumnsType<any> = [
    {
        title: "序号",
        dataIndex: "id",
        key: "id",
        align: "center",
    },
    {
        title: "图片",
        dataIndex: "logoUrl",
        key: "logoUrl",
        align: "center",
        render: (text) => <MyImage src={text} width={50} />,
    },
    {
        title: "广告标题",
        dataIndex: "title",
        key: "title",
        align: "center",
    },
    {
        title: "广告来源",
        dataIndex: "adSource",
        key: "adSource",
        align: "center",
        render: (text, row) => {
            let { adSourceSmall } = row;
            adSourceSmall = adSourceSmall ? `/${adSourceSmall}` : "";
            return `${text}${adSourceSmall}`;
        },
    },
    {
        title: "使用范围",
        dataIndex: "areaType",
        key: "areaType",
        align: "center",
        render: (text) => <ConstantTag constant={findConstant(ADVERTISE_AREA_TYPE, text)} />,
    },

    {
        title: "广告位",
        dataIndex: "adSpaceTitle",
        key: "adSpaceTitle",
        align: "center",
        render: (text, row) => (
            <Space>
                <ConstantIcon constant={findConstant(ADVERTISE_SPACE_TYPE, row.adSpaceModule)} /> /{text}
            </Space>
        ),
    },
    {
        title: "展示时段",
        dataIndex: "timeType",
        key: "timeType",
        align: "center",
        render: (text, row) => (text == 0 ? <Tag color="green">全天</Tag> : `${row.startTime}~${row.endTime}`),
    },
    {
        title: "展示状态",
        dataIndex: "showStatus",
        key: "showStatus",
        align: "center",
        render: (text) => <ConstantTag constant={findConstant(ADVERTISE_PUSH_SHOW_STATUS, text)} />,
    },
    {
        title: "广告状态",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (text) => <ConstantTag constant={findConstant(ADVERTISE_PUSH_STATUS, text)} />,
    },
    {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        align: "center",
    },
    // {
    //     title: "操作",
    //     dataIndex: "id",
    //     key: "id",
    //     align: "center",
    //     render: (text, row) => (
    //         <>
    //             {row.status === "EXPIRED" && (
    //                 <Button type="link" onClick={() => onRePush(text)}>
    //                     重新发布
    //                 </Button>
    //             )}
    //             {row.status !== "DELETED" && (
    //                 <>
    //                     <Button type="link" onClick={() => onEdit(text)}>
    //                         编辑
    //                     </Button>
    //                     <Button type="link" onClick={() => onRemove(text)}>
    //                         删除
    //                     </Button>
    //                 </>
    //             )}
    //             <Button type="link" onClick={() => onDetail(text)}>
    //                 详情
    //             </Button>
    //         </>
    //     ),
    // },
  ];
  const formSearchItem: IFormType[] = [
    {
        label: "展示状态",
        name: "showStatus",
        type: "select",
        typeParams: {
            options: ADVERTISE_PUSH_SHOW_STATUS,
        },
    },
    {
        label: "广告状态",
        name: "status",
        type: "select",
        typeParams: {
            options: ADVERTISE_PUSH_STATUS,
        },
    },
];
  let [searchParams, setSearchParams, isReady] = useSearchParams("adPush");
  let [data, setData] = useState<any>([]);
  let [total, setTotal] = useState(0);
  let [selectedRows, setSelectedRows] = useState<any[]>([]);

  const getList = async () => {
    setLoading(true);
    let res = await tableApi.pageAdPushList(searchParams);
    setLoading(false);
    if (!res) return;
    setData(res.data.content);
    setTotal(res.data.total);
  };
    useEffect(() => {
      if (!isReady) return;
      getList();
  }, [searchParams, isReady]);
  return (
    <>
      <TableSearch formSearchItem={formSearchItem} search={setSearchParams} values={searchParams}></TableSearch>
      <CommonTable
        columns={columns}
        dataSource={data}
        pagination={{ total, ...searchParams }}
        loading={loading}
        onChange={({ current, pageSize }) => setSearchParams((searchParams) => ({ ...searchParams, pageNo: current, pageSize }))}
        rowSelection={{ onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys) }}
      />
    </>
  );
};
export default MyTable;
