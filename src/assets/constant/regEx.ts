/*
 * @Description: 常用正则表达式
 */

// 正整数校验
export const INT_NUMBER = /^[0-9]\d*$/;
// 正整数校验(大于0)
export const POSITIVE_INT = /^[1-9]\d*$/;
// 折扣，0.0-9.9之间的数字
export const DISCOUNT = /^(?=0\.[0-9]|[0-9]\.\d).{3}$|^([0-9])$/;
// 精确到小数点后两位的正数(大于0)
export const FIEXED_TWO_POSITIVE_NUMBER = /^(?!0+(?:\.0+)?$)(?:[0-9]\d*|0)(?:\.\d{1,2})?$/;
// 精确到小数点后两位数字
export const FIEXED_TWO_NUMBER = /^[0-9]+([.]\d{1,2})?$/;
// 不能包含汉字
export const NOT_CHINESE_CHARACTERS = /^[^\u4e00-\u9fa5]+$/;
// 时间正则匹配 "YYYY-MM-DD HH:mm:ss"
export const DATE_TIME_STRING = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
// 时间正则匹配 "YYYY-MM-DD"
export const DATE_STRING = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
// 手机号正则匹配
export const PHONE_NUMBER = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
//  车牌号校验
// export const PLATE_NUMBER = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$)|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$)))|(WJ[警京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼川贵云渝藏陕甘青宁新0-9]?[0-9a-zA-Z]{5,7}$)/;
export const PLATE_NUMBER = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$)|(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$)))/;
