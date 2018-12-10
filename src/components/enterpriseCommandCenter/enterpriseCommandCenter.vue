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
                        <div v-if="!panTable"></div>
                        <div v-else-if="!panTable.dayFinishOutput">0万</div>
                        <div v-else class="desp_personal">{{panTable.dayFinishOutput}}万</div>
                    </div>
                </el-col>
                <el-col :span="9" class="cradContent">
                    <div class="contentInfo">
                        <div class="desp_look">本月完成产值</div>
                        <div v-if="!panTable"></div>
                        <div v-else-if="!panTable.weekFinishOutput">0万</div>
                        <div v-else class="desp_personal">{{panTable.weekFinishOutput}}万</div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="15">
                <div class="cardFooter">
                    <span>日环比：
                        <span>
                        <img v-if="!panTable" src="" alt="">
                        <img v-else-if="!panTable.dayOutputRate"  src="" alt="">
                        <img v-else-if="panTable.dayOutputRate>=0" src="../../assets/u489.png" alt="" class="upDownImage" >
                        <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                        </span>
                        <span v-if="!panTable"></span>
                        <span v-else-if="!panTable.dayOutputRate">0%</span>
                        <span v-else>{{$common.fomatPrecent(panTable.dayOutputRate)}}%</span> 
                    </span>
                    <span class="footerRight">周环比:
                        <span>
                            <img v-if="!panTable">
                            <img v-else-if="!panTable.weekOutputRate"  src="" alt="">
                            <img v-else-if="panTable.weekOutputRate>=0" src="../../assets/u489.png" alt="" class="upDownImage" >
                            <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                        </span>
                        <span v-if="!panTable"></span>
                        <span v-else-if="!panTable.weekOutputRate">0%</span>
                        <span v-else>{{$common.fomatPrecent(panTable.weekOutputRate)}}%</span> 
                    </span>
                </div>
                </el-col>
                <el-col :span="9">
                    <div class="cardFooter">
                        <span>月环比：
                        <span>
                            <img v-if="!panTable">
                            <img v-else-if="!panTable.monthOutputRate"  src="" alt="">
                            <img v-else-if="panTable.monthOutputRate>=0" src="../../assets/u489.png" alt="" class="upDownImage" >
                            <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                        </span>
                        <span v-if="!panTable"></span>
                        <span v-else-if="!panTable.monthOutputRate">0%</span>
                        <span v-else>{{$common.fomatPrecent(panTable.monthOutputRate)}}%</span> 
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
                <span class="outTrank">
                    <img v-if="!panTable" src="" alt="">
                    <img v-else-if="panTable.child.length>=1" src="../../assets/分组@2x.png" alt=""  style="margin-top: 5px;">
                    <img v-if="!panTable" src="" alt="">
                    <img v-else-if="panTable.child.length>=2" src="../../assets/分组 2@2x.png" alt="" style="margin-top: 13px;">
                    <img v-if="!panTable" src="" alt="">
                    <img v-else-if="panTable.child.length>=3" src="../../assets/分组 3@2x.png" alt="" style="margin-top: 13px;">
                </span>
                <span v-if="!panTable"></span>
                <span v-else-if="panTable.child" style="vertical-align: top;">
                      <el-tooltip v-for="(item,index) in panTable.child" :key="index"  effect="dark" :content="item.name" placement="top-start">
                               <div>{{item.name}}</div>
                      </el-tooltip>
                </span>
                <span v-if="!panTable"></span>
                <span v-else-if="panTable.child" style="vertical-align: top;" class="monthFinish">
                     <el-tooltip v-for="(item,index) in panTable.child" :key="index"  effect="dark" :content="'本月完成'+ item.monthFinishOutput +'万元'" placement="top-start">
                               <div>本月完成{{item.monthFinishOutput}}万元</div>
                      </el-tooltip>
                </span>
                <!-- <div v-if="panTable.child.length > 0"><img src="../../assets/分组@2x.png" alt=""><span>{{panTable.child[0].name}}</span><span>本月完成{{panTable.child[0].monthFinishOutput}}万</span></div>
                <div v-if="panTable.child[1]"><img src="../../assets/分组 2@2x.png" alt=""><span>{{panTable.child[1].name}}</span><span>本月完成{{panTable.child[1].monthFinishOutput}}万</span></div>
                <div v-if="panTable.child[2]"><img src="../../assets/分组 3@2x.png" alt=""><span>{{panTable.child[2].name}}</span><span>本月完成{{panTable.child[2].monthFinishOutput}}万</span></div> -->
            </div>
        </div>
    </el-col>
    <el-col :span="9" >
        <div v-if="companyType == 2" class="commandCard">
            <span class="blueBlock"></span>
            <span class="spanBlock">月度产值预警</span>
            <el-table  border :data="tableDatas" style="width: 100%"  max-height="129">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="经理部名称" align="center" min-width="180"></el-table-column>
            <el-table-column prop="projectCount" label="项目总数" align="center" ></el-table-column>
            <el-table-column prop="notFinishCount" label="未完成产值项目数" align="center" min-width="150"></el-table-column>
            <el-table-column prop="notFinishRate" label="占比" align="center" >
                <template slot-scope="scope">
                    <span v-if="scope.row.notFinishRate">{{$common.fomatPrecent(scope.row.notFinishRate)}}%</span>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <div v-if="companyType == 3"  class="commandCard">
            <el-row class="tableTitle">
                <el-col :span="16">
                    <span class="blueBlock"></span>
                    <span class="spanBlock">月度产值预警</span>
                </el-col>
                <el-col :span="8" style="text-align:right;">
                    <div  class="reportTab">
                        <i @click="reduceMonthss" class="el-icon-arrow-left"></i>
                        <span>{{monthDatass}}</span>
                        <i @click="addMonthss" class="el-icon-arrow-right"></i>
                    </div>
                </el-col>
            </el-row>
            <el-table  border :data="tableDatas" style="width: 100%" max-height="129">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="经理部名称" align="center" min-width="180"></el-table-column>
            <el-table-column prop="planOutput" label="计划产值" align="center" min-width="80"></el-table-column>
            <el-table-column prop="notFinishOutput" label="未完成产值" align="center" min-width="100"></el-table-column>
            <el-table-column prop="notFinishOutputRate" label="占比" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.notFinishOutputRate">{{$common.fomatPrecent(scope.row.notFinishOutputRate)}}%</span>
                </template>
            </el-table-column>
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
      <el-table  border :data="tableData" style="width: 100%" :header-cell-style="rowClass" max-height="315">
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
       <el-table-column prop="name" :label="companyType == 2 ?'经理部名称':'项目名称'" align="center" min-width="200"></el-table-column>
       <el-table-column prop="monthPlanOutput" label="月计划产值（万元）" align="center" min-width="180"></el-table-column>
       <el-table-column prop="monthFinishOutput" label="月完成产值（万元" align="center" min-width="120"></el-table-column>
       <el-table-column prop="monthOutputRate" label="月环比" align="center" min-width="120">
            <template slot-scope="scope">
                <span>
                    <img v-if="!scope.row.monthOutputRate"  src="" alt="">
                    <img v-else-if="scope.row.monthOutputRate>=0" src="../../assets/u489.png" alt="" class="upDownImage" >
                    <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                </span>
                <span v-if="scope.row.monthOutputRate">{{$common.fomatPrecent(scope.row.monthOutputRate)}}%</span>
                <span v-else>--</span>
            </template>
       </el-table-column>
       <el-table-column  label="完成比例" prop="monthFinishRate" min-width="170">
            <template slot-scope="scope">
                <el-progress v-if="!scope.row.monthFinishRate" :stroke-width="13"  :percentage="0"></el-progress>
                <el-progress v-else :stroke-width="13"  :percentage="$common.fomatPrecent(scope.row.monthFinishRate)"></el-progress>
            </template>
       </el-table-column>
       <template v-for="(item,index) in dateArr">
            <el-table-column  :prop="'logs['+ index +'].finishTotal'"  :label=" '第' + item.weekNum.toString() + '周 '+ item.weekStart + '~' + item.weekEnd "  :key="index" align="center" width="130" :render-header="renderHeader"></el-table-column>
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
     <div class="tableDiv" style="border-top:none;" v-if="companyType==2||companyType==3">
      <el-row class="tableTitle">
          <el-col :span="18">
             <span class="blueBlock"></span>
             <span class="spanBlock">产值未完成情况分析</span>
          </el-col>
          <el-col :span="6" style="text-align:right;">
            <div  class="reportTab">
                <i @click="reduceMonths" class="el-icon-arrow-left"></i>
                <span>{{monthDatas}}</span>
                <i @click="addMonths" class="el-icon-arrow-right"></i>
            </div>
          </el-col>
      </el-row>
    <div  v-if="companyType == 2">
    <el-table  border :data="tableData2" style="width: 100%" max-height="300">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="name"  label="经理部名称" align="center" min-width="150"></el-table-column>
        <el-table-column prop="projectNum"  label="总项目数" align="center"></el-table-column>
        <el-table-column prop="lastMonthUnfinishedProjectNum"  label="上月未完成项目数" align="center" min-width="150"></el-table-column>
        <el-table-column prop="monthUnfinishedProjectNum"  label="本月未完成项目数" align="center" min-width="150"></el-table-column>
        <el-table-column prop="unfinishedProjectRate"  label="占所有项目比例" align="center" min-width="110">
            <template slot-scope="scope">
                <span>{{$common.fomatPrecent(scope.row.unfinishedProjectRate)}}%</span>
            </template>
        </el-table-column>
        <el-table-column prop="unfinishedProjectQoQ"  label="月环比" align="center" min-width="80">
            <template slot-scope="scope">
                <span>
                    <img v-if="!scope.row.unfinishedProjectQoQ"  src="" alt="">
                    <img v-else-if="scope.row.unfinishedProjectQoQ>=0" src="../../assets/u489.png" alt="" class="upDownImage" >
                    <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                </span>
                <span v-if="scope.row.unfinishedProjectQoQ">{{$common.fomatPrecent(scope.row.unfinishedProjectQoQ)}}%</span>
                <span v-else>--</span>
            </template>
        </el-table-column>
        <el-table-column prop="outputTotal"  label="总产值" align="center" min-width="100"></el-table-column>
        <el-table-column prop="lastMonthPlanOutput"  label="上月计划产值" align="center" min-width="100"></el-table-column>
        <el-table-column prop="lastMonthUnfinishedOutput"  label="上月未完成产值" align="center" min-width="110"></el-table-column>
        <el-table-column prop="monthPlanOutput"  label="计划完成产值" align="center" min-width="140"></el-table-column>
        <el-table-column prop="monthUnfinishedOutput"  label="本月未完成产值" align="center" min-width="140"></el-table-column>
        <el-table-column prop="monthUnfinishedOutputRate"  label="占月度产值比例" align="center" min-width="140">
            <template slot-scope="scope">
                <span v-if="scope.row.monthUnfinishedOutputRate">{{$common.fomatPrecent(scope.row.monthUnfinishedOutputRate)}}%</span>
                <span v-else>0%</span>
            </template>
        </el-table-column>
        <el-table-column prop="unfinishedOutputQoQ"  label="月环比" align="center" min-width="80">
            <template slot-scope="scope">
                <span>
                    <img v-if="!scope.row.unfinishedOutputQoQ"  src="" alt="">
                    <img v-else-if="scope.row.unfinishedOutputQoQ>=0" src="../../assets/u489.png" alt="" class="upDownImage" >
                    <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                </span>
                <span v-if="scope.row.unfinishedOutputQoQ">{{$common.fomatPrecent(scope.row.unfinishedOutputQoQ)}}%</span>
                <span v-else>--</span>
            </template>
        </el-table-column>
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
    <div v-if="companyType == 3">
    <el-table  border :data="tableData2" style="width: 100%" max-height="300" :header-cell-style="rowClass">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="name"  label="项目名称" align="center"></el-table-column>
        <el-table-column prop="lastMonthPlanOutput"  label="上月计划产值" align="center" min-width="140"></el-table-column>
        <el-table-column prop="lastMonthUnfinishedOutput"  label="上月未完成产值" align="center" min-width="140"></el-table-column>
        <el-table-column prop="monthPlanOutput"  label="本月计划完成产值" align="center" min-width="140"></el-table-column>
        <el-table-column prop="monthUnfinishedOutput"  label="本月未完成产值" align="center" min-width="140"></el-table-column>
        <el-table-column prop="monthUnfinishedOutputRate"  label="占月度产值比例"  min-width="140">
            <template slot-scope="scope">
                <el-progress v-if="!scope.row.monthUnfinishedOutputRate" :stroke-width="13"  :percentage="0"></el-progress>
                <el-progress v-else :stroke-width="13"  :percentage="$common.fomatPrecent(scope.row.monthUnfinishedOutputRate)"></el-progress>
            </template>
        </el-table-column>
        <el-table-column prop="unfinishedOutputQoQ"  label="月环比" align="center" min-width="140">
            <template slot-scope="scope">
                <span>
                    <img v-if="!scope.row.unfinishedOutputQoQ"  src="" alt="">
                    <img v-else-if="scope.row.unfinishedOutputQoQ>=0" src="../../assets/u489.png" alt="" class="upDownImage" >
                    <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                </span>
                <span v-if="scope.row.unfinishedOutputQoQ">{{$common.fomatPrecent(scope.row.unfinishedOutputQoQ)}}%</span>
                <span v-else>--</span>
            </template>
        </el-table-column>
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
  </div>
</template>

<script>
import { getCompanyOutputBoard,listOutputProgress,getUnfinishedOutputAnalyze,listProjectOutputWarning,getSessionInfo} from "../api/system_interface.js";
import supervise from "../taskWarning/supervise.vue";
import { mapMutations } from 'vuex';
export default {
  name: "enterpriseCommandCenter",
   components: {
    supervise
  },
  data() {
    return {
      tableData2:[],
      tableData: [],
      tableDatas:[],
      value6: "",
      imageData:"up",
      remindData: {},
      panTable:{},
      pagesize: 10,
      currentPage: 1,
      total:0,
      totals:0,
      currentPages: 1,
      pagesizes: 10,
      monthData:'',
      dateArr:[],
      start:'',
      end:'',
      starts:'',
      ends:'',
      startss:'',
      monthDatas:'',
      monthDatass:'',
      companyType:'',
      lastMonth:'',
      todayMonth:'',


    };
  },

  methods: {

    rowClass({ row, rowIndex}) {
    //   console.log(rowIndex) //表头行标号为0
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

    //获取表盘数据
    refreshPan(){
     getCompanyOutputBoard()
        .then(response => {
          this.panTable = response.body;
        })
        .catch(error => {
          console.log(error);
      });
    },

    refreshList(){
         listOutputProgress({
             startTime:this.start
         })
        .then(response => {
          this.tableData = response.body;
        //   this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
      });
    },

    refreshLists(){
         getUnfinishedOutputAnalyze({
             startTime:this.starts,
             endTime:this.ends
         })
        .then(response => {
          this.tableData2 = response.body;
        //   this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
      });
    },

    refreshListss(){
         listProjectOutputWarning({
             startTime:this.startss,
         })
        .then(response => {
          this.tableDatas = response.body;
        //   this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
      });
    },

    //获取年月
    getMonths(){
    this.monthData = this.$common.getMonths();
    this.start = this.$common.getMonths() + "-" + '01';
    this.starts = this.$common.getLastMonth();
    this.startss = this.$common.getLastMonth();
    this.monthDatass = this.startss.substring(0,7);
    this.monthDatas = this.starts.substring(0,7);
    this.todayMonth = this.monthData;
    this.lastMonth = this.monthDatas;
    this.end   = this.$common.getLastDay(this.monthData);
    this.ends   = this.$common.getLastDay(this.monthDatas);
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
      if(weekArr.includes(0)){
          weekArr = [1,2,3,4,5];
      }
      if(weekArr.includes(6)){
          weekArr = [5,6,7,8,9];
      }
      for(var i = 0;i < weekArr.length;i++){
          var weekData = {};
          weekData.weekNum = weekArr[i];
          weekData.weekStart = this.$common.changeDate(this.getWeekTime(weekArr[i])[0]).substring(5,10)  ;
          weekData.weekEnd =   this.$common.changeDate(this.getWeekTime(weekArr[i])[6]).substring(5,10) ;
          this.dateArr.push(weekData);
      }
      this.refreshList();
    },

     //月份减
    reduceMonths() {
      let addMon = this.$common.reduceMonth(this.monthDatas);
      this.monthDatas = addMon;
      this.starts = addMon + "-" + '01';
      this.ends   = this.$common.getLastDay(this.monthDatas);
      this.refreshLists();
    },

      //月份减
    reduceMonthss() {
      let addMon = this.$common.reduceMonth(this.monthDatass);
      this.monthDatass = addMon;
      this.startss = addMon + "-" + '01';
    //   this.ends   = this.$common.getLastDay(this.monthDatas);
      this.refreshListss();
    },

    //月份加
    addMonthss() {
      if(this.monthDatass == this.lastMonth){
          this.$message.success('已经是最新的了!');
          return
      }
      let addMon = this.$common.addMonth(this.monthDatass);
      this.monthDatass = addMon;
      this.startss = addMon + "-" + '01';
    //   this.ends   = this.$common.getLastDay(this.monthDatas);
      this.refreshListss();
    },

    //月份加
    addMonths() {
      if(this.monthDatas == this.lastMonth){
          this.$message.success('已经是最新的了!');
          return
      }
      let addMon = this.$common.addMonth(this.monthDatas);
      this.monthDatas = addMon;
      this.starts = addMon + "-" + '01';
      this.ends   = this.$common.getLastDay(this.monthDatas);
      this.refreshLists();
    },

    //月份加
    addMonth() {
      if(this.monthData == this.todayMonth){
          this.$message.success('已经是最新的了!');
          return
      }
      this.dateArr = [];
      let addMon = this.$common.addMonth(this.monthData);
      this.monthData = addMon;
      this.start = addMon + "-" + '01';
      this.end   = this.$common.getLastDay(this.monthData);
      var weekArr = this.$common.getWeekAll(this.start,this.end);
      if(weekArr.includes(0)){
          weekArr = [1,2,3,4,5];
      }
      if(weekArr.includes(6)){
          weekArr = [5,6,7,8,9];
      }
      for(var i = 0;i < weekArr.length;i++){
          var weekData = {};
          weekData.weekNum = weekArr[i];
          weekData.weekStart = this.$common.changeDate(this.getWeekTime(weekArr[i])[0]).substring(5,10);
          weekData.weekEnd =   this.$common.changeDate(this.getWeekTime(weekArr[i])[6]).substring(5,10);
          this.dateArr.push(weekData);
      }
      this.refreshList();
    },
    //获取登陆用户信息
    getUserInfo(){
        return new Promise((resolve, reject) => {
        getSessionInfo({})
          .then(response => {
              if (response.code == "200") {
              this.companyType = response.body.chOrgType;
              resolve();
            } else {
              this.$message.error(response.msg);
            }
          })
          .catch(error => {
            console.log(error);
            reject();
          });
        })
    },

    },
    async mounted() {
    // this.start = this.$common.getDay(0);//当天日期
    if(!sessionStorage.getItem("companyType")){
        await this.getUserInfo();
    }
    else{
        this.companyType = sessionStorage.getItem("companyType");
    }
    if(this.companyType==2||this.companyType==3){
        this.getMonths();
        this.refreshPan();
        this.refreshList();
        this.refreshLists();
        this.refreshListss();
    }

    // console.log( this.companyType," this.companyType");
  }
};
</script>
<style lang="scss">
@import "enterpriseCommandCenter.scss";
</style>
