export default {

  //获取本周一日期
  getMonDate() {
    var d = new Date(),
      day = d.getDay(),
      date = d.getDate();
    if (day == 1)
      return d;
    if (day == 0)
      d.setDate(date - 6);
    else
      d.setDate(date - day + 1);
    return d;
  },

  //小于10天前面拼接0
  doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
      m = "0" + month;
    }
    return m;
  },

  //输入数字查询日期
  getDay(day) {
    var today = new Date();
    var targetday = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday);

    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = this.doHandleMonth(tMonth + 1);
    tDate = this.doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
  },

  //获取上周起始时间结束时间;
  getTimes(n) {
    var now = new Date();
    var year = now.getFullYear();
    //因为月份是从0开始的,所以获取这个月的月份数要加1才行
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var day = now.getDay();
    console.log(date);
    //判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
    if (day !== 0) {
      n = n + (day - 1);
    } else {
      n = n + day;
    }
    if (day) {
      //这个判断是为了解决跨年的问题
      if (month > 1) {
        month = month;
      }
      //这个判断是为了解决跨年的问题,月份是从0开始的
      else {
        year = year - 1;
        month = 12;
      }
    }
    now.setDate(now.getDate() - n);
    year = now.getFullYear();
    month = now.getMonth() + 1;
    date = now.getDate();
    var s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
    return s;
  },

  //获取本月时间范围
  getCurrentMonth() {
    //起止日期数组
    var startStop = new Array();
    //获取当前时间
    var currentDate = new Date;
    //获得当前月份0-11
    var currentMonth = currentDate.getMonth();
    //获得当前年份4位年
    var currentYear = currentDate.getFullYear();
    //求出本月第一天
    var firstDay = new Date(currentYear, currentMonth, 1);
    var firstDate = firstDay.getDate();
    if (firstDate < 10) {
      firstDate = '0' + firstDate;
    }
    var firstDays = firstDay.getFullYear() + '-' + (firstDay.getMonth() + 1) + '-' + firstDate;

    //当为12月的时候年份需要加1
    //月份需要更新为0 也就是下一年的第一个月
    if (currentMonth == 11) {
      currentYear++;
      currentMonth = 0; //就为
    } else {
      //否则只是月份增加,以便求的下一月的第一天
      currentMonth++;
    }
    //一天的毫秒数
    var millisecond = 1000 * 60 * 60 * 24;
    //下月的第一天
    var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
    //求出上月的最后一天
    var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
    var lastDays = lastDay.getFullYear() + '-' + (lastDay.getMonth() + 1) + '-' + lastDay.getDate();
    //添加至数组中返回
    startStop.push(firstDays);
    startStop.push(lastDays);
    //返回
    return startStop;
  },

  //获取月份数组
  getMonthAll(begin, end) {
    var d1 = begin;
    var d2 = end;
    var dateArry = new Array();
    var s1 = d1.split("-");
    var s2 = d2.split("-");
    var mCount = 0;
    if (parseInt(s1[0]) < parseInt(s2[0])) {
      mCount = (parseInt(s2[0]) - parseInt(s1[0])) * 12 + parseInt(s2[1]) - parseInt(s1[1]) + 1;
    } else {
      mCount = parseInt(s2[1]) - parseInt(s1[1]) + 1;
    }
    if (mCount > 0) {
      var startM = parseInt(s1[1]);
      var startY = parseInt(s1[0]);
      for (var i = 0; i < mCount; i++) {
        if (startM < 12) {
          dateArry[i] = startM > 9 ? startM : "0" + startM;
          startM += 1;
        } else {
          dateArry[i] = startM > 9 ? startM : "0" + startM;
          startM = 1;
          startY += 1;
        }
      }
    }
    return dateArry;
  },

  //根据传入数获取当前时间前几月或者后几月
  Month(month) {
    var time = new Date();
    time.setDate(time.getDate()); //获取Day天后的日期
    var y = time.getFullYear();
    var d = time.getDate();
    var m;
    if (time.getMonth() + month + 1 > 12) {
      y = y + 1;
      m = time.getMonth() + month - 11; //获取当前月份的日期 d
    } else {
      m = time.getMonth() + month + 1; //获取当前月份的日期 d
    }
    return y + "-" + m + "-" + d;
  },

  //天数减
  reduceDay(dayData) {
    var arr = dayData.split("-"); //将获取的数组按“-”拆分成字符串数组
    var year = parseInt(arr[0]); //开分字符串数组的第一个地址的内容是年份
    var mouth = parseInt(arr[1]); //开分字符串数组的第二个地址的内容是月份
    var date = parseInt(arr[arr.length - 1]); //开分字符串数组的第三个地址的内容是日期

    if (date == 1) {
      //当日期为1时，再剪就会改变月份，甚至年份
      switch (mouth) {
        case 1:
          date = 31;
          mouth = 12;
          year = year - 1;
          break; //一月一日 再剪一天 年份减一 月份为12 日期为31
        case 2:
        case 4:
        case 6:
        case 8:
        case 9:
        case 11:
          date = 31;
          mouth = mouth - 1;
          break; //这些月一日 再剪一天  月份减一 日期为31
        case 3:
          if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            date = 29;
            mouth = mouth - 1;
          } else {
            date = 28;
            mouth = mouth - 1;
          }
          break; //三月一日 再剪一天  月份减一 日期为根据是否是闰年来判断 日期
        case 5:
        case 7:
        case 10:
          date = 30;
          mouth = mouth - 1;
          break; //这些月一日 再剪一天  月份减一 日期为30
      }
    } else {
      date = date - 1;
    }
    if(date.toString().length == 1) {
      date = "0" + date;
    }
    return year + "-" + mouth + "-" + date; //拼接字符串
  },

  //天数加
  addDay(dayData) {
    var arr = dayData.split("-"); //将获取的数组按“-”拆分成字符串数组
    var year = parseInt(arr[0]); //开分字符串数组的第一个地址的内容是年份
    var mouth = parseInt(arr[1]); //开分字符串数组的第二个地址的内容是月份
    var date = parseInt(arr[arr.length - 1]); //开分字符串数组的第三个地址的内容是日期

    if (date == 28) {
      //当日期为28号时 只判断是否是2月
      switch (mouth) {
        case 2:
          if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            date = date + 1;
            break;
            //如果是闰年2月 日期就加一
          } else {
            date = 1;
            mouth = mouth + 1;
            break;
            //不是闰年2月 日期就变为1 月份加一
          }
        default:
          date = date + 1;
          break;
          //其他月份默认日期加一
      }
    } else if (date == 29) {
      //当日期为29号是 也是判断是否是2月
      switch (mouth) {
        case 2:
          date = 1;
          mouth = mouth + 1;
          break;
        default:
          date = date + 1;
          break;
      } //当29号出现必定是闰年 日期变为1 月份加一 其他月份默认日期加一
    } else if (date == 30) {
      //当日期为30 时
      switch (mouth) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          date = date + 1;
          break; //这些月份的时候一个月有31天 到30的时候再加一
        case 4:
        case 6:
        case 9:
        case 11:
          date = 1;
          mouth = mouth + 1;
          break; //这些月份的时候一个月有30天 到30的时候 日期变为1 月份加一
      }
    } else if (date == 31) {
      switch (mouth) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
          date = 1;
          mouth = mouth + 1;
          break; //这些月份的时候一个月有31天 到31的时候  日期为1月份加一
        case 12:
          date = 1;
          mouth = 1;
          year = year + 1;
          break; //十二月 的 31 号 日期变为一 月份变为一 年份加一
      }
    } else {
      date += 1;
    }
    if (date.toString().length == 1) {
      date = "0" + date;
    }
    return year + "-" + mouth + "-" + date;
  },

  //月份加
  addMonth(monthData) {
    var arr = monthData.split("-");
    var year = parseInt(arr[0]);
    var month = parseInt(arr[1]);
    //判断month
    if (month == 12) {
      year = year + 1;
      month = 1;
    } else {
      month = month + 1;
    }
    if (month.toString().length == 1) {
      month = "0" + month;
    }
    return year + "-" + month;
  },

  //月份减
  reduceMonth(monthData) {
    var arr = monthData.split("-");
    var year = parseInt(arr[0]);
    var month = parseInt(arr[1]);
    //判断month
    if (month == 1) {
      year = year - 1;
      month = 12;
    } else {
      month = month - 1;
    }
    if(month.toString().length == 1) {
      month = "0" + month;
    }
    return year + "-" + month;
  },


  //得到传入月份的最后一天
  SetMonthDate(endValues) {
    var endValue = endValues;
    var arr = endValue.split("-"); //将获取的时间按“-”拆分成字符串数组
    var year = parseInt(arr[0]); //开分字符串数组的第一个地址的内容是年份
    var month = parseInt(arr[1]); //开分字符串数组的第二个地址的内容是月份
    return (new Date(year, month, 1)).getTime() - 86400000;
  },

  //获取当前年月日
  getThisDays() {
    var data = new Date();
    var dayData1 = data.getFullYear();
    var dayData2 = data.getMonth() + 1;
    var dayData3 = data.getDate();
    dayData2 = this.doHandleMonth(dayData2);
    dayData3 = this.doHandleMonth(dayData3);
    return dayData1 + "-" + dayData2 + "-" + dayData3;
  },

  //获取当前年月
  getMonths() {
    var data = new Date();
    var monthData1 = data.getFullYear();
    var monthData2 = data.getMonth() + 1;
    monthData2 = this.doHandleMonth(monthData2);
    return monthData1 + "-" + monthData2;
  },

  //获取今天是今年第几周
  getWeek() {
    var d1 = new Date();
    var d2 = new Date();
    d2.setMonth(0);
    d2.setDate(1);
    var rq = d1 - d2;
    var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
    return Math.ceil(s1 / 7);
  },

  /*传入年，周数，获取周数对应的所有日期*/
  getWeekTime(years, weekData) {
    var year = years;
    var index = weekData;
    var d = new Date(year, 0, 1);
    var arr = [];
    while (d.getDay() != 1) {
      d.setDate(d.getDate() + 1);
    }
    var to = new Date(year + 1, 0, 1);
    var i = 1;
    for (var from = d; from < to;) {
      if (i == index) {
        arr.push(from.getFullYear() + "-" + (from.getMonth() + 1) + "-" + from.getDate());
      }
      var j = 6;
      while (j > 0) {
        from.setDate(from.getDate() + 1);
        if (i == index) {
          arr.push(from.getFullYear() + "-" + (from.getMonth() + 1) + "-" + from.getDate());
        }
        j--;
      }
      if (i == index) {
        return arr;
      }
      from.setDate(from.getDate() + 1);
      i++;
    }
    return arr;
  },

  //日期转化
  fomatDate(data) {
    var date = new Date(data);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
  },

  //转换百分比
  fomatPrecent(data) {
    var data2 = 100;
    var m = 0,
      s1 = data.toString(),
      s2 = data2.toString();
    try {
      m += s1.split(".")[1].length
    } catch (e) {}
    try {
      m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },

  deepClone(data) {
    let obj = JSON.stringify(data);
    return JSON.parse(obj);
  },

  //转化数组
  initTree(data) {
    let arr = [];
    for (let i = data.length; i--;) {
      if (data[i]['child']) {
        arr.push(...this.initTree(data[i]['child']));
        let a = this.deepClone(data[i]);
        delete a.child;
        arr.push(a);
      } else {
        arr.push(data[i]);
      }
    }
    return arr;
  },

  //查找父级
  findParent(data, id) {
    let arr = [];
    for (let i = data.length; i--;) {
      if (id == data[i].id) {
        arr.unshift(id);
        arr.unshift(...this.findParent(data, data[i].pid));
      }
    }
    return arr;
  },

  //查找父级
  findParents(data, id) {
    let arr = [];
    for (let i = data.length; i--;) {
      if (id == data[i].id) {
        arr.unshift(id);
        arr.unshift(...this.findParents(data, data[i].parentId));
      }
    }
    return arr;
  }
}
