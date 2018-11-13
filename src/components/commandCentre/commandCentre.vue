<template>
<!--指挥中心-->
<div class="commandCentre">    
    <el-row :gutter="20">
        <el-col :span="6" >
        <div class="commandCard">
            <div>
                <img src="../../assets/u484.png" alt="" class="despImage">
                <div class="cradContent">
                    <div class="desp_look">今日完成生产任务</div>
                    <div class="desp_personal">负责人</div>
                </div>
             </div>
             <div class="cardFooter">
                <span>同周比：
                   <span>
                       <img v-if="imageData === 'up'" src="../../assets/u489.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                    </span>
                   <span>2.23%</span> 
                </span>
                <span class="footerRight">日环比:
                    <span>
                       <img v-if="imageData === 'up'" src="../../assets/u489.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                    </span>
                    <span>23%</span>
                </span>
             </div>
        </div>
        </el-col>
        <el-col :span="6">
        <div class="commandCard">
            <div>
            <img src="../../assets/u484.png" alt="" class="despImage">
                       <div  class="cradContent">
                            <div class="desp_look">今日产值</div>
                            <div class="desp_personal">负责人</div>
                       </div>
            </div>
            <div class="cardFooter">
                <span>同周比：
                   <span>
                       <img v-if="imageData === 'up'" src="../../assets/u489.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                    </span>
                   <span>2.23%</span> 
                </span>
                <span class="footerRight">日环比:
                    <span>
                       <img v-if="imageData === 'up'" src="../../assets/u489.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                    </span>
                    <span>23%</span>
                </span>
            </div>
        </div>
    </el-col>
    <el-col :span="6" >
        <div class="commandCards">
            <div class="cradContents">
                <span class="desp_looks">产值完成情况</span>
                <el-progress :stroke-width="18" :percentage="70"></el-progress>
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
    <el-col :span="6" >
        <div class="commandCards">
           <div class="cradContents">
                <span class="desp_looks">合同工期进度</span>
                <el-progress :stroke-width="18" :percentage="70"></el-progress>
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
      <el-table  border :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
       <el-table-column prop="regionFullName" label="施工区段" align="center" min-width="200"></el-table-column>
       <el-table-column prop="subFullName" label="计划任务名称" align="center" min-width="180"></el-table-column>
       <el-table-column prop="finishBudget" label="设计工程量" align="center" min-width="120"></el-table-column>
       <el-table-column prop="budgetTotal" label="累计完成" align="center" min-width="120"></el-table-column>
       <el-table-column prop="name" label="累计完成百分比" align="center" min-width="120"></el-table-column>
       <el-table-column prop="monthPlan" label="本月计划" align="center"></el-table-column>
       <el-table-column prop="monthFinish" label="本月完成" align="center"></el-table-column>
       <el-table-column prop="name" label="完成比例" align="center"></el-table-column>
       <template v-for="(item,index) in dateArr">
            <el-table-column  :prop="'logMms['+ index +'].finishTotal'"  :label=" item "  :key="index" align="center"></el-table-column>
       </template>
      </el-table>
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
     
      <el-table  border :data="tableData" style="width: 100%">
       <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
       <el-table-column prop="name" label="施工区段" align="center"></el-table-column>
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
import { listVisualStatProgress } from "../api/upload.js";
export default {
  name: "commandCentre",
  data() {
    return {
      tableData: [],
      activeName: "first",
      value6: "",
      personalData: {},
      textarea: "",
      imageData:"up",
      tabPosition:"最近七天",
      tabPositions:"最近七天",
      projectId:12,
      startTime:"",
      endTime:"",
      dateArr:[],
      dateArrs:[],
      nowWeekDate:"",

    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
      console.log(this.activeName, "tab");
    },

    tabClick(){ 
    console.log(this.tabPosition,"tabPosition");
        switch(this.tabPosition){
        case "最近七天":
        this.endTime   = this.getDay(0);//当天日期
        this.startTime = this.getDay(-6);//7天前日期
        this.getAllDays(6);
        this.refreshList();
        break;
        case "本周":
        this.getMonDate();
        this.getWeekTime();
        this.refreshList();
        break;
        case "上周":
        this.startTime = this.getTimes(7);//上周开始时间
        this.endTime = this.getTimes(1);//上周结束时间
        this.getLastAllDays(7);
        this.refreshList();
        break;
    }
    },
    
     //列表查询
    refreshList() {
      listVisualStatProgress({
        projectId: this.projectId,
        startTime:this.startTime,
        endTime:this.endTime
      })
        .then(response => {
          this.tableData = response.body;
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
      });
    },

     //输入数字查询日期
    getDay(day){  
       var today = new Date();  
       var targetday=today.getTime() + 1000*60*60*24*day;          
       today.setTime(targetday); 
         
       var tYear = today.getFullYear();  
       var tMonth = today.getMonth();  
       var tDate = today.getDate();  
       tMonth = this.doHandleMonth(tMonth + 1);  
       tDate  =  this.doHandleMonth(tDate);  
       return tYear+"-"+tMonth+"-"+tDate;  
    }, 
     
    //获取本周一日期
    getMonDate(){
        var d=new Date(),
        day  = d.getDay(),
        date = d.getDate();
        if(day==1)
        this.nowWeekDate = d;
        if(day==0)
        d.setDate(date-6);
        else
        d.setDate(date-day+1);
        this.nowWeekDate = d;
    },

    /*获取本周从周一开始到当天的的日期*/
    getWeekTime() {
        this.dateArr = [];
        this.dateArrs = [];
        var arr=[];
        for(var i=0; i<7; i++){
        arr.push(this.nowWeekDate.getFullYear()+'-'+(this.nowWeekDate.getMonth()+1)+'-'+this.nowWeekDate.getDate());
        this.nowWeekDate.setDate(this.nowWeekDate.getDate()+1);
        }
        this.dateArrs = arr;
        this.endTime = this.getDay(0);//获取当天日期
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
        let dateTime =  this.getDay((-i));
        this.dateArr.unshift(dateTime.substr(8,2));
      }
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

     //获取上周所有的天数
    getLastAllDays(index){
      this.dateArr = [];
      for(let i = 1;i<=index;i++){
        let dateTime =  this.getTimes(i);
        this.dateArr.unshift(dateTime.substr(8,2));
      }
    },

    doHandleMonth(month){  
       var m = month;  
       if(month.toString().length == 1){  
          m = "0" + month;  
       }  
       return m;  
    },

    //获取当天日期
    getThisDays(){
    var data = new Date();
    var dayData1 = data.getFullYear();
    var dayData2 = data.getMonth() + 1;
    var dayData3 = data.getDate();
    this.endTime   = dayData1 + "-" + dayData2 + "-" + dayData3;
    },

  },
  created() {
    this.endTime = this.getDay(0);//当天日期
    this.startTime = this.getDay(-6);//7天前日期
    this.getAllDays(6);
    this.refreshList();
  }
};
</script>
<style lang="scss">
@import "commandCentre.scss";
</style>
