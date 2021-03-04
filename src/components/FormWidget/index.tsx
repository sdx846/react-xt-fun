/*
 * @Description: form表单组件入口文件
 */

import MyInput from "./Input";
import MySelect from "./Select";
import AreaCascader from "./AreaCascader";
import MyDatePicker from "./DatePicker";
import MyDateRangePicker from "./DateRangePicker";
import UploadImage from "@/components/FormWidget/UploadImage";
import formWidget, { FormItemType, FormWidgetTypes, FormWidgetProps } from "./widget";

export type { FormItemType, FormWidgetTypes, FormWidgetProps };

export { MyInput, MySelect, AreaCascader, MyDatePicker, MyDateRangePicker, UploadImage };

export default formWidget;
