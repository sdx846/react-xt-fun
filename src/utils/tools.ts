/*
 * @Description: 工具类库
 */

import moment from "moment";
import { DATE_TIME_STRING, DATE_STRING } from "../assets/constant/regEx";
import { isString } from "lodash";

//将秒数处理为 天 时 分 秒 格式
export const formatSeconds = (seconds: string | number): string => {
    let intSeconds: number | string = Math.floor(Number(seconds));
    let minutes: number | string = 0;
    let hours: number | string = 0;
    let days: number | string = 0;
    if (intSeconds > 60) {
        minutes = Math.floor(intSeconds / 60);
        intSeconds = intSeconds % 60;
        if (minutes > 60) {
            hours = Math.floor(minutes / 60);
            minutes = minutes % 60;
        }
        if (hours > 24) {
            days = Math.floor(hours / 24);
            hours = hours % 24;
        }
    }
    days = days ? `${days}天` : "";
    hours = hours ? `${hours}时` : "";
    minutes = minutes ? `${minutes}分` : "";
    intSeconds = `${intSeconds}秒`;
    return `${days}${hours}${minutes}${intSeconds}`;
};

/**
 * @description: 下载文件
 * @param {string} url 文件路径，window.URL.createObjectURL生成的路径或Blob数据
 * @param {string} downloadName 文件名称
 * @param {string} mime //文件后缀名
 * @return {void}
 */
export const fileSaver = (data: string | Blob, downloadName: string = "下载文件", mime: string): void => {
    if (data instanceof Blob) {
        data = window.URL.createObjectURL(data);
    }
    let downloadFile = document.createElement("a");
    downloadFile.href = data;
    let dateTimeStr = moment().format("YYYY-MM-DD-HH-mm-ss");
    downloadFile.setAttribute("download", `${downloadName}-${dateTimeStr}.${mime}`);
    downloadFile.click();
};

/**
 * @description:  判断是否为时间戳字符串，是则转换为moment返回
 * @param {any} timeString 时间字符串
 * @return {moment.Moment | any} moment格式或原数据
 */
export const timeStringToMoment = (timeString: any): moment.Moment | any => {
    if (isString(timeString)) {
        if (DATE_TIME_STRING.test(timeString) || DATE_STRING.test(timeString)) {
            return moment(timeString);
        }
    }
    return timeString;
};
/**
 * @description: 封装银联自助签约入口拼接时间戳参数
 * @return {void}
 */
// export const navigateToYLZZQYRK = (): void => {
//     let timeString: string = moment().format("YYYYMMDDHHmmss");
//     let url: string = `https://mrs.chinaums.com/nmrs/interface/autoReg?service=merchant_reg&accesser_id=898510175230213&sign_type=SHA-256&request_date=${timeString}&accesser_acct=123&request_seq=${timeString}`;
//     window.open(url);
// };
