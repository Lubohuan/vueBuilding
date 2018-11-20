<template>
<!--进度检视-->
<div class="lookProgress">
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>形象进度管理</el-breadcrumb-item>
    <el-breadcrumb-item>进度检视</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
   <el-col :span="10">
      <el-button size="mini" type="success">导出excel</el-button>
   </el-col>
   <el-col :span="14" class="lookProgress_btn1">
     <el-input size="small" placeholder="选择检视时间范围"  v-on:click.native="openData" style="width:200px;"></el-input>
   </el-col>
   </el-row>
   <el-row class="lookProgress_row">
   <el-col :span="15">
      <el-cascader :show-all-levels="false" :options="listOrgInfoList" v-model="projectId" :props="defaultProps" size="small" placeholder="请选择项目" clearable></el-cascader>
      <el-cascader :show-all-levels="false" :options="reginList" v-model="regionId" :props="defaultProp" size="small" placeholder="请选择施工区段" clearable></el-cascader>
   </el-col>
   <el-col :span="9" class="lookProgress_btn1">
       <el-button size="mini" type="success" @click="resarchInfo" >搜索</el-button>
       <el-button size="mini" @click="resetForm">重置</el-button>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
    <el-table-column prop="projectId" label="项目名称" align="center"></el-table-column>
    <el-table-column prop="regionName" label="施工区段" align="center" min-width="200"></el-table-column>
    <el-table-column prop="statName" label="分部分项名称" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name" label="形象进度统计项" align="center" min-width="120"></el-table-column>
    <el-table-column prop="unitName" label="形象单位" align="center"></el-table-column>
    <el-table-column prop="budgetTotal" label="预算工程量" align="center" min-width="120"></el-table-column>
    <el-table-column prop="finishBudget" label="累计完成" align="center"></el-table-column>
    <el-table-column prop="finishBudgetRate" label="完成比例" align="center"></el-table-column>
    <template v-for="(item,index) in indexArry">
            <el-table-column  :prop="'logMms['+ index +'].planFinish'"  :label=" item + '月计划'"  :key="index  + 0.1"></el-table-column>
            <el-table-column  :prop="'logMms['+ index +'].finishTotal'" :label=" item + '月完成'"  :key="index  + 0.2"></el-table-column>
    </template>
  </el-table>
  <el-pagination background v-if="total>0"
      class="pageStyle"
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="pagesize"
      :current-page="currentPage"
			:total="tableData.length"
			@current-change="handleCurrentChange"
			@size-change="handleSizeChange"
			>
 </el-pagination>
 
  <!--选择时间范围-->
    <el-dialog title="选择检视时间范围" :center="true" :visible.sync="dialog.openData" width="600px" @close="$refs['lookTime'].resetFields()">
      <el-form :model="valueData" :rules="rules"  label-width="55px" ref="lookTime">
        <el-form-item prop="value1" class="dataStyle">
           <el-date-picker  value-format="yyyy-MM-dd" v-model="valueData.value1" type="month" placeholder="开始检视时间" class="dataInput1"></el-date-picker>
        </el-form-item>
        <el-form-item prop="value2" class="dataStyle" label="-">
           <el-date-picker  value-format="yyyy-MM-dd" v-model="valueData.value2" type="month" placeholder="结束检视时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="clickBtn">
        <el-button  @click="close"  size="small">取消</el-button>
        <el-button  size="small" type="primary" @click="submitTime">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getVisualStatMonitorPage } from "../api/upload.js";
export default {
  name: "lookProgress",
  data() {
    return {
      multipleSelection: [],
      valueData:{
         value1:null,
         value2:null,
      },
      tableData: [],
      rules: {
        value1 : [{ required: true, message: "请输入开始月份", trigger: "blur" }],
        value2 : [{ required: true, message: "请输入结束月份", trigger: "blur" }]
      },
      dialog: {
        openData: false
      },
      pagesize: 10,
      currentPage: 1,
      total:0,
      defaultProp:{
        children: "child",
        label: "regionName",
        value: "id"
      },
      defaultProps:{
        children: "child",
        label: "name",
        value: "id"
      },
      projectId: null,
      regionId: null,
      regionIds:null,
      projectIds:null,   
      monthIndex:'',
      indexArry:[],
    };
  },
  computed: {
    ...mapState([
     'reginList',
     'listOrgInfoList',
    ]),
  },
  methods: {
    ...mapActions([
        'getReginList',
        'getlistOrgInfoList'
    ]),

    //选择项变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //页码变化
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.refreshList();
    },

    //每页数据改变
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

    //打开选择时间弹框
    openData(){
      this.dialog.openData = true;  
    },

    //分页查询
    refreshList() {    
      getVisualStatMonitorPage({
        current: this.currentPage,
        offset: this.pagesize,
        projectId: this.projectIds,
        regionId: this.regionIds,
        startTime:this.valueData.value1,
        endTime:this.valueData.value2
      })
        .then(response => {
          this.tableData = response.body.rows;
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
      });
    },
  
  //得到传入结束月份的最后一天
  SetMonthDate() {
      var endValue  = this.valueData.value2;
      var arr = endValue.split("-"); //将获取的时间按“-”拆分成字符串数组
      var year = parseInt(arr[0]); //开分字符串数组的第一个地址的内容是年份
      var month = parseInt(arr[1]); //开分字符串数组的第二个地址的内容是月份
      var prevmonthLastday = (new Date(year, month, 1)).getTime() - 86400000;
      this.valueData.value2= this.formatDate(new Date(prevmonthLastday)); //结束时间
      this.getMonthAll(this.valueData.value1,this.valueData.value2);              
  },

  //格式化日期：yyyy-MM-dd
  formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();
    if (mymonth < 10) {
      mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
      myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
  },
 
  //重置弹框form
  reset(){
    const LookTime = this.$refs["lookTime"];
    LookTime.resetFields();
    this.valueData = {};
  },

  //弹框点击提交
  submitTime(){
     this.$refs["lookTime"].validate(valid => {
      if (!valid) {
          return;
      }
      this.SetMonthDate();
      this.refreshList();
      this.dialog.openData = false;
      this.reset();
     });
  },

  //弹框点击取消
  close(){
    this.dialog.openData = false;
    this.reset();
  },

  //重置搜索框
  resetForm(){
     this.regionId = [];
     this.projectId = [];
     this.regionIds = "";
     this.projectIds = "";
    },
  
  //获取月份数组
  getMonthAll(begin,end) {
        var d1 = begin;
        var d2 = end;
        var dateArry = new Array();
        var s1 = d1.split("-");
        var s2 = d2.split("-");
        var mCount = 0;
        if (parseInt(s1[0]) < parseInt(s2[0])) {
            mCount = (parseInt(s2[0]) - parseInt(s1[0])) * 12 + parseInt(s2[1]) - parseInt(s1[1])+1;
        } else {
            mCount = parseInt(s2[1]) - parseInt(s1[1])+1;
        }
        if (mCount > 0) {
            var startM = parseInt(s1[1]);
            var startY = parseInt(s1[0]);
            for (var i = 0; i < mCount; i++) {
                if (startM < 12) {
                    dateArry[i] =  startM>9 ? startM : "0" + startM;
                    startM += 1;
                } else {
                    dateArry[i] =  startM > 9 ? startM : "0" + startM;
                    startM = 1;
                    startY += 1;
                }
            }
        }
        this.indexArry = dateArry;   
    },

    //获取当前时间前后几月
       Month(month) {
        var time = new Date();
        time.setDate(time.getDate());//获取Day天后的日期 
        var y = time.getFullYear();
        var m;
        if (time.getMonth() + month + 1>12){
          y = y+1;
          m = time.getMonth() + month - 11;//获取当前月份的日期 d
        }else{
          m = time.getMonth() + month + 1;//获取当前月份的日期 d
        }
        var d = time.getDate();
        var endY = time.getFullYear();
        var endM = time.getMonth() + 1;
        var endDate = endY + "-" + endM + "-" + d;//当前日期
        this.monthIndex = y + "-" + m + "-" + d;//前几个月日期
        this.getMonthAll(this.monthIndex,endDate)
    },

    //按钮查询
    resarchInfo(){
       this.regionIds = this.regionId[this.regionId.length - 1];
       this.projectIds = this.projectId[this.projectId.length - 1];
       this.refreshList();
    },
  },
  created(){
    this.getReginList();
    this.refreshList();
    this.Month(-2);
    this.getlistOrgInfoList();
  }
};
</script>
<style lang="scss" scoped>
@import "lookProgress.scss";
</style>
