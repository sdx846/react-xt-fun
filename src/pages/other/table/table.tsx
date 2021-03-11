import React, { useState, useEffect, FC } from "react";
import { Tag, Space,Button,Modal,message } from "antd";
import { ColumnsType } from "antd/lib/table";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import TableSearch from "@/components/tableSearch";
import hooks from '@/hooks'
import * as tableApi from '@/api/request/table';
import MyImage from '@/components/image';
import { fileSaver } from "@/utils/tools";
import UploadExcel from "@/components/FormWidget/UploadExcel";

import {
  FormRulesType,
  RouteComponentProps,
  IFormType,
} from "@/assets/typings";
import CommonTable from "@/components/table";
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
        title: "标题",
        dataIndex: "title",
        key: "title",
        align: "center",
    },
    {
        title: "来源",
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
        title: "操作",
        dataIndex: "id",
        key: "id",
        align: "center",
        render: (text, row) => (
            <>
                {row.status !== "DELETED" && (
                    <>
                        <Button type="link" onClick={() => onEdit(text,row)}>
                            编辑
                        </Button>
                        <Button type="link" onClick={() => onRemove(text)}>
                            删除
                        </Button>
                    </>
                )}
                <Button type="link" onClick={() => onDetail(text)}>
                    详情
                </Button>
            </>
        ),
    },
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
  let [searchParams, setSearchParams, isReady] = hooks.useSearchParams("adPush");
  let [data, setData] = useState<any>([]);
  let [total, setTotal] = useState(0);
  let [selectedRows, setSelectedRows] = useState<any[]>([]);//选中项
  let [uploadFile, setUploadFile] = useState<any>();
  let [show, setShow] = useState(false);

  const getList = async () => {
    // setLoading(true);
    // let res = await tableApi.pageAdPushList(searchParams);
    let res = {
      data: {
        "content":[
          {
            "adSource":"内部平台",
            "adSourceSmall":"",
            "adSpaceModule":"H5",
            "adSpaceNo":"H5-TC-002",
            "adSpaceTitle":"底部",
            "areaType":"ALL",
            "areas":[],
            "createTime":"2021-01-12 16:38:51",
            "id":'2c9f80877520b1540175b0bb7b0204cc',
            "logoUrl":"http://easy-parking.oss-cn-shenzhen.aliyuncs.com/picture/2021-01-12/7b5266eb634e40f6ae792e9568828096.png",
            "showStatus":"ON",
            "status":"ACTIVE",
            "timeType":0,
            "title":"标题1",
            "startTime":"2021-01-12 16:17:11",
            endTime: "2021-02-01 15:00:02",
            threshold: 10,
            remission: 1,
            randomMin: 0,
            randomMax: 0,
            countLimit: 1,
            timeUnit: 'DAY',
            discountMoneyLimit: 0,
            payType: 'UNION_PAY',
            payChannel: 'H5',
            mealId: '2c9f8087776c7b990177b2f6345702d1',
            mealName:'临停计费月租车'
          },
          {
            "adSource":"1平台",
            "adSourceSmall":"测试商家",
            "adSpaceModule":"OTHER",
            "adSpaceNo":"001",
            "adSpaceTitle":"测试位置",
            "areaType":"ALL",
            "areas":[],
            "createTime":"2021-01-12 16:17:11",
            "id":'2c92e2f672bae3c10172bbd440dd0018',
            "logoUrl":"",
            "showStatus":"ON",
            "status":"INVALID",
            "timeType":0,
            "title":"标题二",
            "startTime": "2021-01-12 16:17:11",
            endTime: "2021-02-01 15:00:02",
            threshold: 10,
            remission: 1,
            randomMin: 0,
            randomMax: 0,
            countLimit: 1,
            timeUnit: 'DAY',
            discountMoneyLimit: 0,
            payType: 'UNION_PAY',
            payChannel: 'H5',
            mealId: '2c96e36a78017dcf0178017eaccb0000',
            mealName:'月租车'
          }
        ],
        "total":25
      }
    };
    // setLoading(false);
    if (!res) return;
    setData(res.data.content);
    setTotal(res.data.total);
  };
  const onEdit = (text,row) => {
    // console.log(text);//id
    // console.log(row);//整行值
    history.push({pathname:'/home/other/table/edit',state:row});
  }
  const onRemove = (text) => {
    
  }
  const onDetail = (text) => {
    
  }
  const onAdd = () => {
    history.push('/home/other/table/add');
  }
  const onImport = async () => {
    if (!uploadFile) return message.error("请先上传文件");
    let res =await tableApi.importMonthCar({ file: uploadFile, parkId: '', setMealId:''})
    if (!res) return;
    message.success("导入成功");
};

const onDownloadTemplate = async () => {
    let res = await tableApi.downloadTemplate();
    if (!res) return;
    fileSaver(res.data, "导入模板", "xlsx");
};
  useEffect(() => {
      if (!isReady) return;
      getList();
  }, [searchParams, isReady]);
  return (
    <>
      <TableSearch formSearchItem={formSearchItem} search={setSearchParams} values={searchParams}></TableSearch>
      <Space style={{ marginBottom: "10px" }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
              新增
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => onRemove(selectedRows)}>
          删除
          </Button>
        <Button style={{ width: 100 }} type="primary" onClick={()=>setShow(true)}>导入</Button>
        <Button type="primary" onClick={() => history.push('/home/other/table/editTable1')}>可编辑table1</Button>
        <Button type="primary" onClick={()=>history.push('/home/other/table/editTable2')}>可编辑table2</Button>
      </Space>
      <CommonTable
        columns={columns}
        dataSource={data}
        pagination={{ total, ...searchParams }}
        loading={loading}
        onChange={({ current, pageSize }) => setSearchParams((searchParams) => ({ ...searchParams, pageNo: current, pageSize }))}
        rowSelection={{ onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys) }}
      />
       <Modal
        title="编辑"
        visible={show}
        onCancel={() => setShow(false)}
        onOk={onImport}
        forceRender
      >
        <Button style={{ width: 100 }} type="primary" onClick={onDownloadTemplate}>下载导入模板</Button>
         <UploadExcel getFile={(file: any) => setUploadFile(file)} />
      </Modal>
    </>
  );
};
export default MyTable;
