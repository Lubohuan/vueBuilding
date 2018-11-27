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
      <el-table  border :data="tableData1" style="width: 100%" max-height="500">
       <el-table-column prop="regionName" label="名称" align="center" min-width="200" ></el-table-column>
       <el-table-column prop="currentFinish"  label="今日完成产值" align="center"></el-table-column>
       <el-table-column prop="finishOutput"  label="累计完成产值" align="center"></el-table-column>
       <el-table-column prop="finishBudgetRate"  label="累计完成比例" align="center" min-width="120"></el-table-column>
      </el-table>
    </div>
     <div class="tableDiv">
      <span class="blueBlock"></span>
      <span class="spanBlock">施工区域进展</span>
      <el-table  border :data="tableData2" style="width: 100%" max-height="500">
       <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
       <el-table-column prop="regionFullName" label="施工区段" align="center" min-width="200"></el-table-column>
       <el-table-column prop="subFullName" label="分部分项名称" align="center" min-width="200"></el-table-column>
       <el-table-column prop="budgetTotal" label="预算工程量" align="center" min-width="100"></el-table-column>
       <el-table-column prop="outputTotal" label="今日完成工程量" align="center" min-width="100"></el-table-column>
       <el-table-column prop="finishBudgetTotal" label="累计完成工程量" align="center"></el-table-column>
       <el-table-column prop="finishBudgetTotalRate" label="累计完成比例" align="center" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.finishBudgetTotalRate">{{$common.fomatPrecent(scope.row.finishBudgetTotalRate)}}%</span>
          </template>
       </el-table-column>
       <el-table-column prop="finishAmount" label="今日完成产值" align="center"></el-table-column>
       <el-table-column prop="finishOutputTotal" label="累计完成产值" align="center"></el-table-column>
       <el-table-column prop="finishOutputTotalRate" label="累计完成比例" align="center" >
          <template slot-scope="scope">
            <span v-if="scope.row.finishOutputTotalRate">{{$common.fomatPrecent(scope.row.finishOutputTotalRate)}}%</span>
          </template>
       </el-table-column>
      </el-table>
    </div>
    <div class="tableDiv" style="border-bottom:1px solid #e4e7ed;">
      <span class="blueBlock"></span>
      <span class="spanBlock">分部分项形象进度</span>
      <el-table  border :data="tableData3" style="width: 100%" max-height="500">
       <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
       <el-table-column prop="subFullName" label="分部分项名称" align="center" min-width="150"></el-table-column>
       <el-table-column prop="budgetTotal" label="预算工程量" align="center" min-width="100"></el-table-column>
       <el-table-column prop="finishAmount" label="今日完成工程量" align="center" min-width="100"></el-table-column>
       <el-table-column prop="finishBudgetTotal" label="累计完成工程量" align="center"></el-table-column>
       <el-table-column prop="finishBudgetTotalRate" label="累计完成比例" align="center" min-width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.finishBudgetTotalRate">{{$common.fomatPrecent(scope.row.finishBudgetTotalRate)}}%</span>
          </template>
       </el-table-column>
       <el-table-column prop="finishOutput" label="今日完成产值" align="center"></el-table-column>
       <el-table-column prop="finishOutputTotal" label="累计完成产值" align="center"></el-table-column>
       <el-table-column prop="finishOutputTotalRate" label="累计完成比例" align="center" >
           <template slot-scope="scope">
            <span v-if="scope.row.finishOutputTotalRate">{{$common.fomatPrecent(scope.row.finishOutputTotalRate)}}%</span>
          </template>
       </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getVisualStatReport,getSubsectionReport,getRegionOutputReport } from "../api/upload.js";
export default {
  name: "Imagereport",
  data() {
    return {
      tableData1:[],
      tableData2:[],
      tableData3:[],
      activeName:"first",
      setvalue:"",
      monthData: "",
      dayData: "",
      weekData: "",
      newestData: ""
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
      this.end = this.dayData;
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
      let addMon = this.$common.reduceMonth(this.monthData);
      this.monthData = addMon;
      this.start = addMon + "-" + '01';
      this.end   = this.$common.fomatDate(this.$common.SetMonthDate(addMon));
      this.refreshList();
    },

    //月份加
    addMonth() {
      let addMon = this.$common.addMonth(this.monthData);
      this.monthData = addMon;
      this.start = addMon + "-" + '01';
      this.end   = this.$common.fomatDate(this.$common.SetMonthDate(addMon));
      this.refreshList();
    },

    //天数加
    addDay() {
      var addDate  = this.$common.addDay(this.dayData);
      this.dayData = addDate;
      this.start = addDate;
      this.end = addDate;
      this.refreshList();
    },

    //天数减
    reduceDay() {
      var reduceDate  = this.$common.reduceDay(this.dayData);
      this.dayData = reduceDate;
      this.start = reduceDate;
      this.end = reduceDate;
      this.refreshList();
    },

    //周数减
    reduceWeek() {
      if (this.weekData <= 1) {
        return;
      } else {
        this.weekData = this.weekData - 1;
      }
        this.getWeekTime();
        this.start = this.dataArr[0];
        this.end = this.dataArr[this.dataArr.length - 1];
        this.refreshList();
    },

    //周数加
    addWeek() {
      if (this.weekData >= this.newestData) {
         this.$message.success("已经是最新的了 !");
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
      this.dataArr = this.$common.getWeekTime(year,index);
    },

    //自定义查询
    changeSetDate(){
      this.start = this.setvalue[0];
      this.end = this.setvalue[1];
      this.refreshList();
    },

     //查询
    refreshList() {

      //施工区域进展
      getVisualStatReport({
           startTime: this.start,
           endTime:this.end
      })
        .then(response => {
          this.tableData2 = response.body;
        })
        .catch(error => {
          console.log(error);
      });

      //分部分项形象进度
      getSubsectionReport({
           startTime: this.start,
           endTime:this.end
      })
        .then(response => {
          this.tableData3 = response.body;
        })
        .catch(error => {
          console.log(error);
      });

      //产值进度
      getRegionOutputReport({
           startTime: this.start,
           endTime:this.end
      })
        .then(response => {
          this.tableData1 = response.body;
        })
        .catch(error => {
          console.log(error);
      });
    },

    //获取年月日
    getThisDays(){
    this.start = this.$common.getThisDays();
    this.end   = this.$common.getThisDays();
    this.dayData =  this.$common.getThisDays();
    },

    //获取年月
    getMonths(){
    this.monthData = this.$common.getMonths();
    this.start = this.$common.getMonths() + "-" + '01';
    this.end   = this.$common.fomatDate(this.$common.SetMonthDate(this.$common.getMonths()));
    },

    //获取今天是今年第几周
    getWeek(){  
    this.weekData   = this.$common.getWeek();
    this.newestData = this.$common.getWeek();
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
