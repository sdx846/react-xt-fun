/*
 * @Description: 省市区三级联动，内置数据请求,因hooks无法在条件语句中使用，固此组件使用类组件实现
 */
import React from "react";
import { Cascader } from "antd";
import { getallProvince, getAreasById } from "@/api/request/area";

export interface CascaderOptionsType {
    value?: any;
    label?: React.ReactNode;
    disabled?: boolean;
    isLeaf?: boolean;
    loading?: boolean;
    children?: Array<CascaderOptionsType>;
    [key: string]: any;
}

interface IProps {
    level?: number;
    changeOnSelect?: boolean;
    [key: string]: any;
}

interface IState {
    options: Array<CascaderOptionsType>;
    cacheTarget: string | number | null;
    level?: number;
    changeOnSelect?: boolean;
}

class AreaCascader extends React.Component<IProps, IState> {
    public state = {
        options: [],
        cacheTarget: null,
        level: 3,
        changeOnSelect: false,
    };
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        let { level = 3, changeOnSelect = false } = this.props;
        this.setState(
            {
                level,
                changeOnSelect,
            },
            () => {
                this.getProvinceList();
            }
        );
    }

    // 获取所有省份
    getProvinceList = async () => {
        let res = await getallProvince();
        if (!res) return;
        let provinceList = res.data.map((item: any) => ({ value: item.id, label: item.name, isLeaf: false }));
        this.setState({
            options: provinceList,
        });
    };

    // 根据id获取对应市，区（县）
    getAreas: (id: string) => Promise<Array<CascaderOptionsType>> = async (id) => {
        let res = await getAreasById(id);
        if (!res) return;
        return res.data.map((item: any) => ({ value: item.id, label: item.name, isLeaf: false }));
    };

    loadData = async (selectedOptions: Array<CascaderOptionsType> | undefined) => {
        if (!selectedOptions) return;
        let targetOptions = selectedOptions[selectedOptions.length - 1];
        // 当特殊情况只需要两层数据时，根据传入的level进行比较
        if (selectedOptions.length >= this.state.level) {
            targetOptions.isLeaf = true;
            return;
        }
        targetOptions.loading = true;
        let children = await this.getAreas(targetOptions.value);
        targetOptions.loading = false;
        // 当无法查询到children后代表为最后一层，将当前option的isLeaf属性设置为true即不会再触发该函数
        if (!children || !children.length) {
            targetOptions.isLeaf = true;
        } else {
            // 层级固定时，选择的数组长度等与层级减一则代表已经是最后一层
            if (selectedOptions.length >= this.state.level - 1) {
                children.forEach((item) => (item.isLeaf = true));
            }
            targetOptions.children = children;
        }
        this.setState({});
    };

    /**
     * @description: 此函数用于赋值时使用，当赋值后，根据值去查询接口获取子数据，并自定义输入框渲染内容
     * @param {String} 当前赋值的label
     * @return {String | undefined} 当前赋值的label数组生成的字符串,用于显示
     */
    displayRender = (label: string[], selectedOptions: Array<CascaderOptionsType> | undefined): string | undefined => {
        if (!selectedOptions?.length) return;
        let targetOptions = selectedOptions[selectedOptions.length - 1];
        if (targetOptions.value !== this.state.cacheTarget) {
            this.state.cacheTarget = targetOptions.value;
            this.loadData(selectedOptions);
        }
        return label.join("/");
    };

    // render() {
    //     let { loadData, displayRender, props } = this;
    //     let { options, changeOnSelect } = this.state;
    //     return (
    //         <Cascader
    //             {...props}
    //             options={options}
    //             changeOnSelect={changeOnSelect}
    //             loadData={loadData}
    //             displayRender={displayRender}
    //             placeholder="请选择所属区域"
    //         />
    //     );
    // }
}

export default AreaCascader;
