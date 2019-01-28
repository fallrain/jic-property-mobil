let util = {
  getUrlVal (name) {
    /* 获取url参数 */
    let urlArgs = location.search;
    if (urlArgs) {
      let reg = new RegExp(name + '=([^&]+)');
      let results = urlArgs.match(reg);
      if (results) {
        return results[1];
      }
    }
  },
  getNextDayDate () {
    let curDate = new Date();
    let curTime = curDate.getTime();
    curTime = curTime + 3600 * 24 * 1000;
    curDate.setTime(curTime);
    curDate.setHours(0);
    curDate.setMinutes(0);
    curDate.setSeconds(0);
    return curDate;
  },
  getCurDate () {
    let curDate = new Date();
    return curDate.getFullYear() + ('0' + (curDate.getMonth() + 1)).slice(-2) + ('0' + (curDate.getDate())).slice(-2);
  },
  isWeixin () {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf('micromessenger') >= 0) {
      return true;
    }
  },
  formatDate: function (date, pattern) {
    if (!date) {
      return '';
    }
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    let numToStr = function (num) {
      if (num < 10) {
        num = '0' + num;
      } else {
        num = '' + num;
      }
      return num;
    };
    let obj = {
      year: date.getFullYear(),
      month: numToStr(date.getMonth() + 1),
      date: numToStr(date.getDate()),
      hours: numToStr(date.getHours()),
      minutes: numToStr(date.getMinutes()),
      seconds: numToStr(date.getSeconds())
    };
    let res = pattern || 'yyyy-MM-dd';
    res = res.replace(/yyyy/g, obj.year);
    res = res.replace(/MM/g, obj.month);
    res = res.replace(/dd/g, obj.date);
    res = res.replace(/HH/g, obj.hours);
    res = res.replace(/mm/g, obj.minutes);
    res = res.replace(/ss/g, obj.seconds);
    return res;
  },
  formatFloat (f, digit) {
    let m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
  },
  formatNoSplitTime (val) {
    if (!val) {
      return '';
    }
    val += '';
    return val.substr(0, 4) + '-' + val.substr(4, 2) + '-' + val.substr(6, 2) + ' ' + val.substr(8, 2) + ':' + val.substr(10, 2);
  },
  shallowCopyObject (obj) {
    /* 浅拷贝 */
    return JSON.parse(JSON.stringify(obj));
  }
};
util.setUserInfToStorage = function () {
  localStorage.setItem('uid', util.getUrlVal('uid'));
  localStorage.setItem('nickname', util.getUrlVal('nickname'));
  localStorage.setItem('headimg', util.getUrlVal('headimg'));
};

util.updateUserCommunity = function (data) {
  sessionStorage.setItem('ownerCode', data.ownerCode);
  sessionStorage.setItem('roomCode', data.roomCode);
  sessionStorage.setItem('simpleCode', data.simpleCode);
  sessionStorage.setItem('communityName', data.communityName);
  sessionStorage.setItem('address', data.communityName + data.buildingName + data.unitName + data.roomName);
};

export default util;
