<template>
<!--指挥中心-->
<div class="enterpriseCommandCenter">    
    <el-row :gutter="20">
        <el-col :span="9" >
        <div class="commandCard">
            <span class="blueBlock"></span>
            <span class="spanBlock">实时完成产值</span>
            <el-row>
                <el-col :span="6">
                    <img src="../../assets/task.png" alt="" class="despImage">
                </el-col>
                <el-col :span="9" class="cradContent">
                    <div class="contentInfo">
                        <div class="desp_look">今日完成产值</div>
                        <div v-if="!panTable.dayTask">0个</div>
                        <div v-else class="desp_personal">{{panTable.dayTask}}个</div>
                    </div> 
                </el-col>
                <el-col :span="9" class="cradContent">
                    <div class="contentInfo">
                        <div class="desp_look">本月完成产值</div>
                        <div v-if="!panTable.dayTask">0个</div>
                        <div v-else class="desp_personal">{{panTable.dayTask}}个</div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="15">
                <div class="cardFooter">
                    <span>同周比：
                        <span>
                        <img v-if="imageData === 'up'" src="../../assets/u489.png" alt="" class="upDownImage" >
                        <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                        </span>
                        <span v-if="!panTable.dayTaskRate">0%</span>
                        <span v-else>{{$common.fomatPrecent(panTable.dayTaskRate)}}%</span> 
                    </span>
                    <span class="footerRight">日环比:
                        <span>
                        <img v-if="imageData === 'up'" src="../../assets/u489.png" alt="" class="upDownImage" >
                        <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                        </span>
                        <span v-if="!panTable.dayTaskRate">0%</span>
                        <span v-else>{{$common.fomatPrecent(panTable.dayTaskRate)}}%</span> 
                    </span>
                </div>
                </el-col>
                <el-col :span="9">
                    <div class="cardFooter">
                        <span>月环比：
                        <span>
                            <img v-if="imageData === 'up'" src="../../assets/u489.png" alt="" class="upDownImage" >
                            <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                            </span>
                        <span v-if="!panTable.dayTaskRate">0%</span>
                        <span v-else>{{$common.fomatPrecent(panTable.dayTaskRate)}}%</span> 
                        </span>
                    </div>
                </el-col>
            </el-row>
        </div>
        </el-col>
        <el-col :span="6">
        <div class="commandCard">
            <span class="blueBlock"></span>
            <span class="spanBlock">产值排行榜</span>
            <div class="outputranking">
                <div><img src="../../assets/分组@2x.png" alt=""><span>深圳经理部</span><span>本月完成56万</span></div>
                <div><img src="../../assets/分组 2@2x.png" alt=""><span>广西经理部</span><span>本月完成56万</span></div>
                <div><img src="../../assets/分组 3@2x.png" alt=""><span>云南经理部</span><span>本月完成56万</span></div>
            </div>
        </div>
    </el-col>
    <el-col :span="9" >
        <div class="commandCard">
            <span class="blueBlock"></span>
            <span class="spanBlock">月度产值预警</span>
            <el-table  border :data="tableData2" style="width: 100%" min-height="125">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="type" label="经理部名称" align="center" min-width="100"></el-table-column>
            <el-table-column prop="num" label="项目总数" align="center" min-width="80"></el-table-column>
            <el-table-column prop="num" label="未完成产值项目数" align="center" min-width="200"></el-table-column>
            <el-table-column prop="num" label="占比" align="center"></el-table-column>
            </el-table>  
        </div>
    </el-col>
</el-row>
<div class="tableDiv">
    <el-row class="tableTitle">
          <el-col :span="18">
             <span class="blueBlock"></span>
             <span class="spanBlock">产值进展总览</span>
          </el-col>
          <el-col :span="6" style="text-align:right;">
            <div  class="reportTab">
                <i @click="reduceMonth" class="el-icon-arrow-left"></i>
                <span>{{monthData}}</span>
                <i @click="addMonth" class="el-icon-arrow-right"></i>
            </div>
          </el-col>
      </el-row>
      <el-table  border :data="tableData2" style="width: 100%" :header-cell-style="rowClass">
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
       <el-table-column prop="type" label="经理部名称" align="center" min-width="200"></el-table-column>
       <el-table-column prop="type" label="月计划产值（万元）" align="center" min-width="180"></el-table-column>
       <el-table-column prop="type" label="月完成产值（万元" align="center" min-width="120"></el-table-column>
       <el-table-column prop="type" label="完成比例" align="center" min-width="120"></el-table-column>
       <el-table-column prop="type" label="月环比" align="center" min-width="120">
            <!-- <template slot-scope="scope">
                <span v-if="scope.row.type">{{$common.fomatPrecent(scope.row.finishBudgetRate)}}%</span>
            </template> -->
       </el-table-column>
       <el-table-column  label="完成比例" prop="num" min-width="150">
            <template slot-scope="scope">
                <el-progress v-if="!scope.row.num" :stroke-width="13"  :percentage="0"></el-progress>
                <el-progress v-else :stroke-width="13"  :percentage="$common.fomatPrecent(scope.row.num)"></el-progress>
            </template>
       </el-table-column>
       <template v-for="(item,index) in dateArr">
            <el-table-column  type="index"  :label=" '第' + item.weekNum.toString() + '周 '+ item.weekStart + '~' + item.weekEnd "  :key="index" align="center" width="130" :render-header="renderHeader"></el-table-column>
       </template>
      </el-table>
       <el-pagination background v-if="total>0"
            class="pageStyle"
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="pagesize"
            :current-page="currentPage"
			:total="total"
			@current-change="handleCurrentChange"
			@size-change="handleSizeChange"
			>
      </el-pagination>
    </div>
     <div class="tableDiv" style="border-top:none;">
      <el-row class="tableTitle">
          <el-col :span="18">
             <span class="blueBlock"></span>
             <span class="spanBlock">产值未完成情况分析</span>
          </el-col>
          <el-col :span="6" style="text-align:right;">
            <div  class="reportTab">
                <i @click="reduceMonth" class="el-icon-arrow-left"></i>
                <span>{{monthData}}</span>
                <i @click="addMonth" class="el-icon-arrow-right"></i>
            </div>
          </el-col>
      </el-row>
     
    <el-table  border :data="tableData2" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="type"  label="经理部名称" align="center"></el-table-column>
        <el-table-column prop="type"  label="上月未完成项目数" align="center" min-width="200"></el-table-column>
        <el-table-column prop="type"  label="本月未完成项目数" align="center" min-width="200"></el-table-column>
        <el-table-column prop="type"  label="占所有项目比例" align="center" min-width="110">
            <!-- <template slot-scope="scope">
                <span style="color:red;">{{scope.row.warningReason}}</span>
            </template> -->
        </el-table-column>
        <el-table-column prop="type"  label="月环比" align="center" min-width="120"></el-table-column>
        <el-table-column prop="type"  label="上月计划产值" align="center" min-width="140"></el-table-column>
        <el-table-column prop="type"  label="上月未完成产值" align="center" min-width="140"></el-table-column>
        <el-table-column prop="type"  label="计划完成产值" align="center" min-width="140"></el-table-column>
        <el-table-column prop="type"  label="本月未完成产值" align="center" min-width="140"></el-table-column>
        <el-table-column prop="type"  label="占月度产值比例" align="center" min-width="140"></el-table-column>
        <el-table-column prop="type"  label="月环比" align="center" min-width="140"></el-table-column>
    </el-table>
    <el-pagination background v-if="totals>0"
            class="pageStyle"
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="pagesizes"
            :current-page="currentPages"
			:total="totals"
			@current-change="handleCurrentChanges"
			@size-change="handleSizeChanges"
			>
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { getVisualStatProgressPage,getTaskWarningLogPage,getDashBoard } from "../api/system_interface.js";
import supervise from "../taskWarning/supervise.vue";
import { mapMutations } from 'vuex';
export default {
  name: "enterpriseCommandCenter",
   components: {
    supervise
  },
  data() {
    return {
      tableData2:[{type:'你',num:'0.3'},{type:'好',num:'0.5'}],
      tableData: [],
      tableDatas:[],
      value6: "",
      imageData:"up",
      startTime:"",
      endTime:"",
      remindData: {},
      panTable:{
        panfinishTask:1
      },
      pagesize: 10,
      currentPage: 1,
      total:0,
      totals:0,
      currentPages: 1,
      pagesizes: 10,
      monthData:'',
      dateArr:[]

    };
  },
 
  methods: {
    
    rowClass({ row, rowIndex}) {
      console.log(rowIndex) //表头行标号为0
      return 'text-align:center'
    },

    renderHeader(createElement, { column, _self }) {
            let label = column.label;
            let labelArr = label.split(' ');
             return createElement(
                'div',
                {
                'class': 'header-center'
                },
                [
                    createElement('div', {
                            attrs: { type: 'text' },
                        }, [labelArr[0]]
                        ),
                    createElement('div', {
                            attrs: { type: 'text' },
                    }, [labelArr[1] || '']
                    )
                ]
            );
    },
    
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.refreshList();
    },

    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

    handleCurrentChanges(cpage) {
      this.currentPages = cpage;
      this.refreshLists();
    },

    handleSizeChanges(psize) {
      this.pagesizes = psize;
      this.refreshLists();
    },

    /*传入年，周数，获取周数对应的所有日期*/
    getWeekTime(index) {
      var data = new Date();
      var year = data.getFullYear();
      var dataArr = this.$common.getWeekTime(year,index);
      return dataArr
    },

    //获取年月
    getMonths(){
    this.monthData = this.$common.getMonths();
    this.start = this.$common.getMonths() + "-" + '01';
    this.end   = this.$common.getLastDay(this.monthData);
    var weekArr = this.$common.getWeekAll(this.start,this.end);
    for(var i = 0;i < weekArr.length;i++){
          var weekData = {};
          weekData.weekNum = weekArr[i];
          weekData.weekStart = this.$common.changeDate(this.getWeekTime(weekArr[i])[0]).substring(5,10)  ;
          weekData.weekEnd =   this.$common.changeDate(this.getWeekTime(weekArr[i])[6]).substring(5,10) ;
          this.dateArr.push(weekData);
    }
    },

     //月份减
    reduceMonth() {
      this.dateArr = [];
      let addMon = this.$common.reduceMonth(this.monthData);
      this.monthData = addMon;
      this.start = addMon + "-" + '01';
      this.end   = this.$common.getLastDay(this.monthData);
      var weekArr = this.$common.getWeekAll(this.start,this.end);
      for(var i = 0;i < weekArr.length;i++){
          var weekData = {};
          weekData.weekNum = weekArr[i];
          weekData.weekStart = this.$common.changeDate(this.getWeekTime(weekArr[i])[0]).substring(5,10)  ;
          weekData.weekEnd =   this.$common.changeDate(this.getWeekTime(weekArr[i])[6]).substring(5,10) ;
          this.dateArr.push(weekData);
      }
    },

    //月份加
    addMonth() {
      this.dateArr = [];
      let addMon = this.$common.addMonth(this.monthData);
      this.monthData = addMon;
      this.start = addMon + "-" + '01';
      this.end   = this.$common.getLastDay(this.monthData);
      var weekArr = this.$common.getWeekAll(this.start,this.end);
      for(var i = 0;i < weekArr.length;i++){
          var weekData = {};
          weekData.weekNum = weekArr[i];
          weekData.weekStart = this.$common.changeDate(this.getWeekTime(weekArr[i])[0]).substring(5,10)  ;
          weekData.weekEnd =   this.$common.changeDate(this.getWeekTime(weekArr[i])[6]).substring(5,10) ;
          this.dateArr.push(weekData);
      }
    }
    },
    created() {
    this.endTime = this.$common.getDay(0);//当天日期
    this.getMonths();
    console.log(this.getWeekTime('48'),"88888")
  }
};
</script>
<style lang="scss">
@import "enterpriseCommandCenter.scss";
</style>
