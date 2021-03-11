import React, { useState, useEffect, FC } from "react";
import { POSITIVE_INT } from "@/assets/constant/regEx";
import * as tableApi from '@/api/request/table';
import {
  findConstant,
  ConstantTag,
  STATUS,
  PARTNER_DISCOUNT_UNIT,
  PARK_PAY_TYPE,
  ADVERTISE_SPACE_TYPE,
} from "@/assets/constant";

import {
  FormRulesType,
  RouteComponentProps,
  IFormType,
} from "@/assets/typings";
import hooks from "@/hooks";
import CommonEdit from "@/components/formEdit";
import moment from "moment";

const Role: FC<RouteComponentProps> = ({ history, location: { pathname } }) => {
  // console.log(history)
  // console.log(location)
  //父组件传递的state在history.location.state中可以接收，页面刷新时数据丢失。
  // console.log(history.location.state)
  //父组件传递的state在useLocation中可接收，页面刷新数据丢失。
  // let { state } = useLocation<any>();
  // console.log(state)
  const state = hooks.useRouteQuery();
  let parkList = hooks.useSelectList("park");
  const currentRoutes = pathname.split("/");
  let [title, setTitle] = useState("新增");
  let [mealList, setMealList] = useState([]);

  let [formItems, setFormItems] = useState<IFormType[]>([]);
  let [formData, setFormData] = useState<any>({
    // areaType: "ALL",
    // payType: "SELF_SUPPORT",
    // payChannel: "WX_PAY",
  });
  const formItem: Array<IFormType | boolean> = [
    {
      label: "名称",
      name: "id",
      type: "select",
      typeParams: { options: parkList, allowClear: false, showSearch: false },
      formType: title === "新增" ? "normal" : "read-only",
      value: findConstant(parkList,formData.id)?.label
    },
    {
      label: "关联套餐",
      name: "mealId",
      type: "select",
      typeParams: { options: mealList, placeholder: "请先选择名称" },
    },
    {
      label: "使用门槛",
      name: "threshold",
      type: "input",
      typeParams: { prefix: "订单大于", suffix: "元" },
    },
    {
      label: "状态",
      name: "status",
      type: "select",
      typeParams: { options: STATUS, allowClear: false, showSearch: false },
    },
    formData.status === "ACTIVE" && {
      label: "减免金额",
      name: "remission",
      type: "input",
      typeParams: { prefix: "减免", suffix: "元" },
    },
    formData.status === "INVALID" && {
      formType: "group",
      label: "随机范围",
      required: true,
      children: [
        {
          label: "最小值",
          name: "randomMin",
          type: "input",
          typeParams: {
            placeholder: "请输入最小值",
            prefix: "最小值：",
            suffix: "元",
          },
        },
        {
          label: "最大值",
          name: "randomMax",
          type: "input",
          typeParams: {
            placeholder: "请输入最大值",
            prefix: "最大值：",
            suffix: "元",
          },
        },
      ],
    },
    {
      formType: "group",
      label: "每车限用",
      required: true,
      children: [
        {
          name: "countLimit",
          type: "input",
          typeParams: {
            addonAfter: {
              name: "timeUnit",
              type: "select",
              typeParams: {
                options: PARTNER_DISCOUNT_UNIT,
                allowClear: false,
                showSearch: false,
              },
            },
            suffix: "次/",
          },
        },
        {
          label: "限制金额",
          name: "discountMoneyLimit",
          type: "input",
          typeParams: {
            prefix: "最高限额：",
            suffix: "元/辆",
          },
        },
      ],
    },
    {
      label: "支付渠道",
      name: "payType",
      type: "select",
      typeParams: {
        options: PARK_PAY_TYPE,
        allowClear: false,
        showSearch: false,
      },
    },
    {
      label: "支付方式",
      name: "payChannel",
      type: "radio",
      typeParams: {
        options: ADVERTISE_SPACE_TYPE,
      },
    },
    { label: "活动生效日期", name: "rangeTime", type: "date-range-picker" },
  ];
  //自定义表单验证
  const totalValidate = (rule, value) => {
    let newValue = Number(value);
    if (newValue && (isNaN(newValue) || newValue < 0 || newValue > 1000000)) {
      return Promise.reject("必须为1到1000000的整数");
    }
    return Promise.resolve();
  };

  const thresholdValidate = (rule, value) => {
    let newValue = Number(value);
    if (
      (newValue && isNaN(newValue)) ||
      newValue < 0.01 ||
      newValue > 1000000
    ) {
      return Promise.reject("必须为0.01到1000000的整数");
    }
    return Promise.resolve();
  };
  const remissionValidate = (rule, value) => {
    let newValue = Number(value);
    let threshold = Number(formData.threshold);
    if (
      (newValue && isNaN(newValue)) ||
      newValue < 0.01 ||
      newValue > 1000000
    ) {
      return Promise.reject("必须为0.01至1000000之间的数字");
    }
    if (newValue > threshold) {
      return Promise.reject("减免金额不得大于门槛金额");
    }
    return Promise.resolve();
  };

  const countLimitValidate = (rule, value) => {
    let newValue = Number(value);
    if ((newValue && isNaN(newValue)) || newValue < 0 || newValue > 100) {
      return Promise.reject("必须为1到100的整数");
    }
    return Promise.resolve();
  };
  //表单验证信息
  const formRules: FormRulesType = {
    id: [{ required: true, message: "请选择名称" }],
    threshold: [
      { required: true, message: "请输入使用门槛" },
      { pattern: POSITIVE_INT, message: "请输入正整数" },
      { validator: thresholdValidate },
    ],
    remission: [
      { required: true, message: "请输入减免金额" },
      { validator: remissionValidate },
    ],
    rangeTime: [{ required: true, message: "请选择活动生效时间" }],
    randomMin: [{ required: true, message: "请输入最小值" }],
    randomMax: [{ required: true, message: "请输入最大值" }],
    discountMoneyLimit: [{ required: true, message: "请输入限制金额" }],
  };

  const onValuesChange = (changedValues) => {
    if (changedValues.id) {
      changedValues.mealId = null;
      getSetMealByParkId(changedValues.id);
    }
    if (changedValues.payType) {
      changedValues.payChannel = "H5";
    }
    setFormData((formData) => ({ ...formData, ...changedValues }));
  };

  const onSubmit = async (values) => {
    values = Object.assign(
      { remission: 0, randomMin: 0, randomMax: 0 },
      values
    );
    [
      "remission",
      "threshold",
      "randomMin",
      "randomMax",
      "discountMoneyLimit",
    ].forEach((key) => {
      values[key] *= 100;
    });
    if (values.areaContent && Array.isArray(values.areaContent)) {
      values.areaContent = values.areaContent.join(",");
    }
    values.startTime = values.rangeTime[0]
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    values.endTime = values.rangeTime[1]
      .endOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    // setSubmitLoading(true);
    // let res;
    // if (currentRoutes.includes("add")) {
    //     res = await discountSettingApi.saveDiscount({ ...formData, ...values });
    // } else {
    //     res = await discountSettingApi.editDiscount({ ...formData, ...values });
    // }
    // setSubmitLoading(false);
    // if (!res) return;
    // message.success("操作成功");
    // history.go(-1);
  };
  const getSetMealByParkId = async (parkId: string) => {
    let res = await tableApi.getSetMealByParkId(parkId);
    if (!res) return;
    setMealList(
      res.data.map((item: any) => ({
        label:
          item.name,
        value: item.id,
        carLimit: item.carLimit,
      }))
    );
  };
  useEffect(() => {
    if (currentRoutes.includes("add")) {
      setTitle("新增");
    } else if (currentRoutes.includes("edit")) {
      setTitle("编辑");
      if (state) {
        [
          "remission",
          "threshold",
          "randomMin",
          "randomMax",
          "discountMoneyLimit",
        ].forEach((key) => {
          state[key] = state[key] / 100;
        });
        state["rangeTime"] = [moment(state.startTime), moment(state.endTime)];
        if (state.areaContent && !Array.isArray(state.areaContent)) {
          state["areaContent"] = state.areaContent.split(",");
        }
        setFormData(state);
      }
    }
    setFormItems(formItem.filter((item) => item) as IFormType[]);
  }, [title,parkList]);
  return (
    <CommonEdit
      title={title}
      onValuesChange={onValuesChange}
      formItems={formItems}
      formRules={formRules}
      onSubmit={onSubmit}
      formData={formData}
    />
  );
};
export default Role;
