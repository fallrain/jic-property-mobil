export default {
  convertCnDay (value) {
    /* 0 1 2 3 转为周一 周二... */
    return '周' + ['一', '二', '三', '四', '五', '六', '天'][value % 7];
  },
  toUpperCase (value) {
    return value.toLocaleUpperCase();
  }
};
