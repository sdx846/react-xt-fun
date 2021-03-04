/*
 * @Description: 日期选择组件
 */
import { FC } from "react";
import { DatePicker } from "antd";
import moment from "moment";

export interface DatePickerLimitProps {
    limitFuture?: boolean;
    limitPast?: boolean;
    moreThan?: string;
    lessThan?: string;
    [key: string]: any;
}

const MyDatePicker: FC<DatePickerLimitProps> = ({ limitFuture, limitPast, moreThan, lessThan, ...otherProps }) => {
    return (
        <DatePicker
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

export default MyDatePicker;
