<template>
<!--指挥中心-->
<div class="commandCentre">    
    <el-row :gutter="20">
        <el-col :span="6" >
        <div class="commandCard">
            <div>
                <img src="../../assets/task.png" alt="" class="despImage">
                <div class="cradContent">
                    <div class="desp_look">今日完成生产任务</div>
                    <div v-if="!panTable.dayTask">0个</div>
                    <div v-else class="desp_personal">{{panTable.dayTask}}个</div>
                </div>
             </div>
             <div class="cardFooter">
               <span >日环比:
                    <span>
                        <img v-if="!panTable.dayTaskRate"  src="" alt="">
                        <img v-else-if="panTable.dayTaskRate>=0" src="../../assets/u489.png" alt="" class="upDownImage" >
                        <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                    </span>
                    <span v-if="!panTable.dayTaskRate">0%</span>
                    <span v-else>{{$common.fomatPrecent(panTable.dayTaskRate)}}%</span> 
                </span>
                <span class="footerRight">周环比：
                   <span>
                        <img v-if="!panTable.weekTaskRate"  src="" alt="">
                        <img v-else-if="panTable.weekTaskRate>=0" src="../../assets/u489.png" alt="" class="upDownImage" >
                        <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                    </span>
                   <span v-if="!panTable.weekTaskRate">0%</span>
                   <span v-else>{{$common.fomatPrecent(panTable.weekTaskRate)}}%</span> 
                </span>
                
             </div>
        </div>
        </el-col>
        <el-col :span="6">
        <div class="commandCard">
            <div>
            <img src="../../assets/todayTask.png" alt="" class="despImage">
                       <div  class="cradContent">
                            <div class="desp_look">今日产值</div>
                            <div v-if="!panTable.dayFinishOutput">¥0万</div>
                            <div v-else class="desp_personal">¥{{panTable.dayFinishOutput}}万</div>
                       </div>
            </div>
            <div class="cardFooter">              
                <span>日环比:
                    <span>
                      <img v-if="!panTable.dayOutputRate"  src="" alt="">
                      <img v-else-if="panTable.dayOutputRate>=0" src="../../assets/u489.png" alt="" class="upDownImage" >
                      <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                    </span>
                    <span v-if="!panTable.dayOutputRate">0%</span>
                    <span v-else>{{$common.fomatPrecent(panTable.dayOutputRate)}}%</span>
                </span>
                 <span class="footerRight">周环比：
                   <span>
                      <img v-if="!panTable.weekOutputRate"  src="" alt="">
                      <img v-else-if="panTable.weekOutputRate>=0" src="../../assets/u489.png" alt="" class="upDownImage" >
                      <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                    </span>
                    <span v-if="!panTable.weekOutputRate">0%</span>
                    <span v-else>{{$common.fomatPrecent(panTable.weekOutputRate)}}%</span>  
                </span>
            </div>
        </div>
    </el-col>
    <el-col :span="6" >
        <div class="commandCards">
            <div class="cradContents">
                <span class="desp_looks">产值完成情况</span>
                <el-progress v-if="!panTable.finishOutputRate" :stroke-width="18" :percentage="0"></el-progress>
                <el-progress v-else :stroke-width="18" :percentage="$common.fomatPrecent(panTable.finishOutputRate)"></el-progress>
                </div>
                <div class="cardFooters">             
                <span >日环比:
                    <span>
                       <img v-if="imageData === 'up'" src="../../assets/u514.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u518.png" alt="" class="upDownImage downImage">
                    </span>
                    <span>23%</span>
                </span>
                 <span class="footerRight">周环比：
                   <span>
                       <img v-if="imageData === 'up'" src="../../assets/u514.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u518.png" alt="" class="upDownImage downImage">
                    </span>
                   <span>2.23%</span> 
                </span>
                </div>
            </div>
    </el-col>
    <el-col :span="6" >
        <div class="commandCards">
           <div class="cradContents">
                <span class="desp_looks">合同工期进度</span>
                <el-progress v-if="!panTable.contractProRate" :stroke-width="18" :percentage="0"></el-progress>
                <el-progress v-else :stroke-width="18" :percentage="$common.fomatPrecent(panTable.contractProRate)"></el-progress>
                </div>
            <div class="cardFooters">
              <span>同周比：
                   <span>
                       <img v-if="imageData === 'up'" src="../../assets/u514.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u518.png" alt="" class="upDownImage downImage">
                    </span>
                   <span>2.23%</span> 
                </span>
                <span class="footerRight">日环比:
                    <span>
                       <img v-if="imageData === 'up'" src="../../assets/u514.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u518.png" alt="" class="upDownImage downImage">
                    </span>
                    <span>23%</span>
                </span>
            </div>
      </div>
    </el-col>
</el-row>
<div class="tableDiv">
    <el-row class="tableTitle">
          <el-col :span="18">
             <span class="blueBlock"></span>
             <span class="spanBlock">形象进度进展</span>
          </el-col>
          <el-col :span="6" style="text-align:right;">
            <el-radio-group v-model="tabPosition" size="small" @change="tabClick">
             <el-radio-button label="最近七天">最近七天</el-radio-button>
             <el-radio-button label="本周">本周</el-radio-button>
             <el-radio-button label="上周">上周</el-radio-button>
            </el-radio-group>
          </el-col>
      </el-row>
      <el-table  border :data="tableData" style="width: 100%" :header-cell-style="rowClass">
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
       <el-table-column prop="regionFullName" label="施工区段" align="center" min-width="200"></el-table-column>
       <el-table-column prop="statName" label="计划任务名称" align="center" min-width="180"></el-table-column>
       <el-table-column prop="budgetTotal" label="设计工程量" align="center" min-width="120"></el-table-column>
       <el-table-column prop="finishBudget" label="累计完成" align="center" min-width="120"></el-table-column>
       <el-table-column prop="finishBudgetRate" label="累计完成百分比" min-width="200">
            <!-- <template slot-scope="scope">
                <span v-if="scope.row.finishBudgetRate">{{$common.fomatPrecent(scope.row.finishBudgetRate)}}%</span>
            </template> -->
            <template slot-scope="scope">
                <el-progress v-if="!scope.row.finishBudgetRate" :stroke-width="13"  :percentage="0"></el-progress>
                <el-progress v-else :stroke-width="13"  :percentage="$common.fomatPrecent(scope.row.finishBudgetRate)"></el-progress>
            </template>
       </el-table-column>
       <el-table-column prop="monthPlan" label="本月计划" align="center"></el-table-column>
       <el-table-column prop="monthFinish" label="本月完成" align="center"></el-table-column>
       <el-table-column  label="完成比例"  prop="monthFinishRate" min-width="200">
            <template slot-scope="scope">
                <el-progress v-if="!scope.row.monthFinishRate" :stroke-width="13"  :percentage="0"></el-progress>
                <el-progress v-else :stroke-width="13"  :percentage="$common.fomatPrecent(scope.row.monthFinishRate)"></el-progress>
            </template>
       </el-table-column>
       <template v-for="(item,index) in dateArr">
            <el-table-column  :prop="'logs['+ index +'].finishTotal'"  :label=" item "  :key="index" align="center"></el-table-column>
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
             <span class="spanBlock">逾期形象进度计划</span>
          </el-col>
          <el-col :span="6" style="text-align:right;">
            <el-radio-group v-model="tabPositions" size="small">
             <el-radio-button label="最近七天"></el-radio-button>
             <el-radio-button label="本周"></el-radio-button>
             <el-radio-button label="上周"></el-radio-button>
            </el-radio-group>
          </el-col>
      </el-row>
     
    <el-table  border :data="tableDatas" style="width: 100%">
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="projectName"  label="项目名称" align="center"></el-table-column>
        <el-table-column prop="planName"  label="任务名称" align="center" min-width="200"></el-table-column>
        <el-table-column prop="regionFullName"  label="施工区段" align="center" min-width="200"></el-table-column>
        <el-table-column prop="warningReason"  label="预警原因" align="center" min-width="100">
            <template slot-scope="scope">
                <span style="color:red;">{{scope.row.warningReason}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="respUserName"  label="责任人" align="center" min-width="120"></el-table-column>
        <el-table-column prop="createTime"  label="预警时间" align="center" min-width="140"></el-table-column>
        <el-table-column label="操作" align="center">
            <template  slot-scope="scope">
                <el-button size="mini" type="text" @click="remindSupervise(scope.row)">督办</el-button>
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

      <!--提醒督办-->
    <el-dialog title="提醒督办" :center="true" :visible.sync="dialog.supervise" width="700px" @open="$nextTick(()=>$refs['supervise'].update(remindData))"  @close="$refs['supervise'].reset()">
      <supervise ref="supervise" @close="dialog.supervise = false" ></supervise>
    </el-dialog>

  </div>
</template>

<script>
import { getVisualStatProgressPage,getTaskWarningLogPage,getDashBoard } from "../api/system_interface.js";
import supervise from "../taskWarning/supervise.vue";
import { mapMutations } from 'vuex';
export default {
  name: "commandCentre",
   components: {
    supervise
  },
  data() {
    return {
      tableData: [],
      tableDatas:[],
      activeName: "first",
      value6: "",
      personalData: {},
      textarea: "",
      imageData:"up",
      tabPosition:"最近七天",
      tabPositions:"最近七天",
    //   projectId:12,
      startTime:"",
      endTime:"",
      dateArr:[],
      dateArrs:[],
      nowWeekDate:"",
      remindData: {},
      dialog: {
        supervise: false,
      },
      panTable:{
        panfinishTask:1
      },
      pagesize: 10,
      currentPage: 1,
      total:0,
      totals:0,
      currentPages: 1,
      pagesizes: 10,
      queryType:0

    };
  },
 
  methods: {
    ...mapMutations({
        updateToken:'updateUserToken'
    }),
    
    rowClass({ row, rowIndex}) {
      console.log(rowIndex) //表头行标号为0
      return 'text-align:center'
    },

    handleClick(tab) {
      this.activeName = tab.name;
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

    //切换最近7天/本周/上周
    tabClick(){ 
        switch(this.tabPosition){
        case "最近七天":
        this.queryType = 0;
        this.endTime   = this.$common.getDay(0);//当天日期
        this.startTime = this.$common.getDay(-6);//7天前日期
        this.getAllDays(6);
        this.refreshList();
        break;
        case "本周":
        this.queryType = 1;
        this.getWeekTime();
        this.refreshList();
        break;
        case "上周":
        this.queryType = 2;
        this.startTime = this.$common.getTimes(7);//上周开始时间
        this.endTime = this.$common.getTimes(1);//上周结束时间
        this.getLastAllDays(7);
        this.refreshList();
        break;
    }
    },
    
     //形象进度任务列表查询
    refreshList() {
      getVisualStatProgressPage({
        current: this.currentPage,
        offset: this.pagesize,
        // projectId: this.projectId,
        startTime:this.startTime,
        endTime:this.endTime,
        queryType:this.queryType
      })
        .then(response => {
          this.tableData = response.body.rows;
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
      });
    },

    //逾期形象进度列表查询
    refreshLists() {
      getTaskWarningLogPage({
        current: this.currentPages,
        offset: this.pagesizes
      })
        .then(response => {
          this.tableDatas = response.body.rows;
           this.totals = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
        });
    },
      
    /*获取本周从周一开始到当天的的日期*/
    getWeekTime() {
        this.nowWeekDate = this.$common.getMonDate();
        this.dateArr = [];
        this.dateArrs = [];
        var arr=[];
        for(var i=0; i<7; i++){
        arr.push(this.nowWeekDate.getFullYear() + '-' + this.$common.doHandleMonth(this.nowWeekDate.getMonth()+1) + '-' + this.$common.doHandleMonth(this.nowWeekDate.getDate()));
        this.nowWeekDate.setDate(this.nowWeekDate.getDate()+1);
        }
        this.dateArrs = arr;
        this.endTime = this.$common.getDay(0);//获取当天日期
        var arrIndex = this.indexVf(this.endTime);//查找当天在本周日期数组中的索引值
        this.dateArrs = arr.slice(0,arrIndex);//取出从周一到当天的日期范围
        this.startTime = this.dateArrs[0];
        this.editDataArr();
    },

    //改编日期
    editDataArr(){
        for(var i=0;i<this.dateArrs.length;i++){
            this.dateArr.push(this.dateArrs[i].substr(8,2));
        }
    },

     //查找当天在本周日期数组中的索引值
    indexVf(data){
          for(var i=0;i<this.dateArrs.length;i++){
              if(this.dateArrs[i] == data){
                 return i+1;
           }     
        }
    },

    
    //获取最近7天内所有的天数
    getAllDays(index){
      this.dateArr = [];
      for(let i = 0;i<=index;i++){
        let dateTime =  this.$common.getDay((-i));
        this.dateArr.unshift(dateTime.substr(8,2));
      }
    },

     //获取上周所有的天数
    getLastAllDays(index){
      this.dateArr = [];
      for(let i = 1;i<=index;i++){
        let dateTime = this.$common.getTimes(i);
        this.dateArr.unshift(dateTime.substr(8,2));
      }
    },

    //提醒督办
    remindSupervise(data){
        this.remindData = data;
        this.dialog.supervise = true;
    },

    //获取表盘数据
    refreshPan(){
     getDashBoard()
        .then(response => {
          this.panTable = response.body;
        //   if(this.panTable.contractProRate.indexOf("%") > -1){
        //      this.panTable.contractProRate = this.panTable.contractProRate.substring(0,this.panTable.contractProRate.length-1);
        //      console.log(this.panTable.contractProRate,"this.panTable.contractProRate")         
        //   }
          
        })
        .catch(error => {
          console.log(error);
      });
    }
    },
    created() {
    this.endTime = this.$common.getDay(0);//当天日期
    this.startTime = this.$common.getDay(-6);//7天前日期
    this.getAllDays(6);
    this.refreshList();//发送请求
    this.refreshLists();
    this.refreshPan();
    console.log(this.$common.getMonDate(),"22222");
    console.log( this.hasPerm(3),11); 
   
   
  }
};
</script>
<style lang="scss">
@import "commandCentre.scss";
</style>
