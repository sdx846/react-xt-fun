/*
 * @Description: 日期范围选择组件
 */
import { FC } from "react";
import { DatePicker } from "antd";
import { DatePickerLimitProps } from "./DatePicker";
import moment from "moment";

const MyDateRangePicker: FC<DatePickerLimitProps> = ({ limitFuture, limitPast, moreThan, lessThan, ...otherProps }) => {
    return (
        <DatePicker.RangePicker
            ranges={{
                今天: [moment().startOf("day"), moment().endOf("day")],
                本周: [moment().startOf("week"), moment().endOf("week")],
                本月: [moment().startOf("month"), moment().endOf("month")],
                本年: [moment().startOf("year"), moment().endOf("year")],
            }}
            allowClear
            style={{ width: "100%" }}
            disabledDate={(current) => {
                if (limitFuture) {
                    return current && current > moment().endOf("day");
                }
                if (limitPast) {
                    return current && current < moment().startOf("day");
                }
                if (moreThan) {
                    return current && current < moment(moreThan).endOf("day");
                }
                if (lessThan) {
                    return current && current > moment(lessThan).endOf("day");
                }
                return false;
            }}
            {...otherProps}
        />
    );
};

export default MyDateRangePicker;
