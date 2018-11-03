<template>
<!--形象进度报表-->
<div class="Imagereport">
 <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>形象进度管理</el-breadcrumb-item>
    <el-breadcrumb-item>形象进度报表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
    <el-col :span="18">
      <el-tabs v-model="activeName" @tab-click="handleClick" >
      <el-tab-pane label="日报" name="first"></el-tab-pane>
      <el-tab-pane label="周报" name="second"></el-tab-pane>
      <el-tab-pane label="月报" name="third"></el-tab-pane>
      <el-tab-pane label="自定义" name="fourth"></el-tab-pane>
      </el-tabs>
    </el-col>
    <el-col :span="6" class="tabCol">     
       <div v-if="activeName === 'first'" class="reportTab">
          <i @click="reduceDay" class="el-icon-arrow-left"></i>
          <span>{{dayData}}</span>
          <i @click="addDay" class="el-icon-arrow-right"></i>
       </div>
        <div v-if="activeName === 'second'" class="reportTab">         
          <i @click="reduceWeek" class="el-icon-arrow-left"></i>
          <span>{{weekData}}周</span>
          <i @click="addWeek" class="el-icon-arrow-right"></i>
       </div>
         <div v-if="activeName === 'third'" class="reportTab">
          <i @click="reduceMonth" class="el-icon-arrow-left"></i>
          <span>{{monthData}}</span>
          <i @click="addMonth" class="el-icon-arrow-right"></i>
       </div>
        <div v-if="activeName === 'fourth'" class="activeTab">         
         <el-date-picker value-format="yyyy-MM-dd" size="small" v-model="setvalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="changeSetDate"></el-date-picker>
       </div>
    </el-col>
 </el-row>
    <div class="tableDiv">
      <span class="blueBlock"></span>
      <span class="spanBlock">产值进度</span>
      <el-table  border :data="tableData1" style="width: 100%">
       <el-table-column prop="name" label="名称" align="center" width="100" ></el-table-column>
       <el-table-column prop="name"  label="今日完成产值" align="center"></el-table-column>
       <el-table-column prop="name"  label="累计完成产值" align="center"></el-table-column>
       <el-table-column prop="name"  label="累计完成比例" align="center" min-width="120"></el-table-column>
      </el-table>
    </div>
     <div class="tableDiv">
      <span class="blueBlock"></span>
      <span class="spanBlock">施工区域进展</span>
      <el-table  border :data="tableData2" style="width: 100%">
       <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
       <el-table-column prop="regionFullName" label="施工区段" align="center"></el-table-column>
       <el-table-column prop="subFullName" label="分部分项名称" align="center"></el-table-column>
       <el-table-column prop="budgetTotal" label="预算工程量" align="center" min-width="120"></el-table-column>
       <el-table-column prop="outputTotal" label="今日完成工程量" align="center" min-width="120"></el-table-column>
       <el-table-column prop="finishBudgetTotal" label="累计完成工程量" align="center"></el-table-column>
       <el-table-column prop="finishBudgetTotalRate" label="累计完成比例" align="center" min-width="120"></el-table-column>
       <el-table-column prop="finishAmount" label="今日完成产值" align="center"></el-table-column>
       <el-table-column prop="finishOutputTotal" label="累计完成产值" align="center"></el-table-column>
       <el-table-column prop="finishOutputTotalRate" label="累计完成比例" align="center" ></el-table-column>
      </el-table>
    </div>
    <div class="tableDiv" style="border-bottom:1px solid #e4e7ed;">
      <span class="blueBlock"></span>
      <span class="spanBlock">分部分项形象进度</span>
      <el-table  border :data="tableData3" style="width: 100%">
       <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
       <el-table-column prop="name" label="分部分项名称" align="center"></el-table-column>
       <el-table-column prop="name" label="预算工程量" align="center" min-width="120"></el-table-column>
       <el-table-column prop="name" label="今日完成工程量" align="center" min-width="120"></el-table-column>
       <el-table-column prop="name" label="累计完成工程量" align="center"></el-table-column>
       <el-table-column prop="name" label="累计完成比例" align="center" min-width="120"></el-table-column>
       <el-table-column prop="name" label="今日完成产值" align="center"></el-table-column>
       <el-table-column prop="name" label="累计完成产值" align="center"></el-table-column>
       <el-table-column prop="name" label="累计完成比例" align="center" ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getVisualStatReport,getSubsectionReport } from "../api/upload.js";
export default {
  name: "Imagereport",
  data() {
    return {
      tableData1:[],
      tableData2:[],
      tableData3:[],
      activeName:"first",
      setvalue:"",
      personalData: {},
      textarea: "",
      monthData1: "",
      monthData2: "",
      monthData: "",

      dayData1: "",
      dayData2: "",
      dayData3: "",
      dayData: "",
      weekData: ""
    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
      switch(this.activeName){
      case "first":
      this.getThisDays();
      this.refreshList();
      break;
      case "second":
      this.getWeek();
      this.getWeekTime();
      this.start = this.dataArr[0];
      this.end = this.dataArr[this.dataArr.length - 1];
      this.refreshList();
      break;
      case "third":
      this.getMonths(); 
      this.refreshList();
      break;
      // case "fourth":
      //   执行代码块 4
      // break;
}
    },

    //月份减
    reduceMonth() {
      var arr = this.monthData.split("-");
      var year = parseInt(arr[0]);
      var month = parseInt(arr[1]);
      //判断month
      if (month == 1) {
        year = year - 1;
        month = 12;
      } else {
        month = month - 1;
      }
      this.monthData = year + "-" + month;
      this.start = year + "-" + month + "-" + '01';
      this.end = year + "-" + month + '-' + '15';
      this.refreshList();
    },

    //月份加
    addMonth() {
      var arr = this.monthData.split("-");
      var year = parseInt(arr[0]);
      var month = parseInt(arr[1]);
      //判断month
      if (month == 12) {
        year = year + 1;
        month = 1;
      } else {
        month = month + 1;
      }
      this.monthData = year + "-" + month;
      this.start = year + "-" + month + "-" + '01';
      this.end = year + "-" + month + '-' + '15';
      this.refreshList();
    },

    //天数加
    addDay() {
      var arr = this.dayData.split("-"); //将获取的数组按“-”拆分成字符串数组

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
      this.dayData = year + "-" + mouth + "-" + date;
      this.start = this.dayData;
      this.end = this.dayData;
      this.refreshList();
      dataArr = []
    },

    //天数减
    reduceDay() {
      var arr = this.dayData.split("-"); //将获取的数组按“-”拆分成字符串数组
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
      this.dayData = year + "-" + mouth + "-" + date; //拼接字符串插入到标签中
      this.start = this.dayData;
      this.end = this.dayData;
      this.refreshList();
    },
    //周数减
    reduceWeek() {
      if (this.weekData <= 1) {
        return;
      } else {
        this.weekData = this.weekData - 1;
        this.getWeekTime();
        this.start = this.dataArr[0];
        this.end = this.dataArr[this.dataArr.length - 1];
      }
        this.getWeekTime();
        this.start = this.dataArr[0];
        this.end = this.dataArr[this.dataArr.length - 1];
        this.refreshList();
    },
    //周数加
    addWeek() {
      if (this.weekData >= 52) {
        return;
      } else {
        this.weekData = this.weekData + 1;
      }
        this.getWeekTime();
        this.start = this.dataArr[0];
        this.end = this.dataArr[this.dataArr.length - 1];
        this.refreshList();
    },

    /*传入年，周数，获取周数对应的所有日期*/
    getWeekTime() {
      var data = new Date();
      var year = data.getFullYear();
      var index = this.weekData;
      var d = new Date(year, 0, 1);
      var arr = [];
      while (d.getDay() != 1) {
        d.setDate(d.getDate() + 1);
      }
      var to = new Date(year + 1, 0, 1);
      var i = 1;
      for (var from = d; from < to; ) {
        if (i == index) {
          arr.push(
            from.getFullYear() +
              "-" +
              (from.getMonth() + 1) +
              "-" +
              from.getDate()
          );
        }
        var j = 6;
        while (j > 0) {
          from.setDate(from.getDate() + 1);
          if (i == index) {
            arr.push(
              from.getFullYear() +
                "-" +
                (from.getMonth() + 1) +
                "-" +
                from.getDate()
            );
          }
          j--;
        }
        if (i == index) {
          return arr;
        }
        from.setDate(from.getDate() + 1);
        i++;
        this.dataArr = arr;
      }
    },
    //自定义查询
    changeSetDate(){
      this.start = this.setvalue[0];
      this.end = this.setvalue[1];
      this.refreshList();
    },
     //查询
    refreshList() {
      getVisualStatReport({
           startTime: this.start,
           endTime:this.end,
           projectId:12
      })
        .then(response => {
          this.tableData2 = response.body;
        })
        .catch(error => {
          console.log(error);
      });
      getSubsectionReport({
           startTime: this.start,
           endTime:this.end,
           projectId:12
      })
        .then(response => {
          this.tableData3 = response.body;
        })
        .catch(error => {
          console.log(error);
      });
    },
    //获取年月日
    getThisDays(){
    var data = new Date();
    this.dayData1 = data.getFullYear();
    this.dayData2 = data.getMonth() + 1;
    this.dayData3 = data.getDate();
    this.dayData = this.dayData1 + "-" + this.dayData2 + "-" + this.dayData3;
    this.start = this.dayData;
    this.end = this.dayData;
    },
    //获取年月
    getMonths(){
    var data = new Date();
    this.monthData1 = data.getFullYear();
    this.monthData2 = data.getMonth() + 1;
    this.monthData = this.monthData1 + "-" + this.monthData2;
    this.start = this.monthData  + "-" + '01';
    this.end =  this.monthData  + '-' + '15';
    },
    //获取今天是今年第几周
    getWeek(){
    var d1 = new Date();
    var d2 = new Date();
    d2.setMonth(0);
    d2.setDate(1);
    var rq = d1 - d2;
    var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
    this.weekData = Math.ceil(s1 / 7);
    }
  },
  created() {
  this.getThisDays();
  this.refreshList(); 
  }
};
</script>
<style lang="scss">
@import "Imagereport.scss";
</style>
