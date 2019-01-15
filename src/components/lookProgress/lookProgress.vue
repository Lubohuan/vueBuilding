<template>
<!--进度检视-->
<div class="lookProgress">
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>形象进度管理</el-breadcrumb-item>
    <el-breadcrumb-item>形象进度检视</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
   <el-col :span="10">
      <el-button size="mini" type="success" @click="exportExcel">导出excel</el-button>
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
    <el-table-column type="selection" width="50" align="center"></el-table-column>
    <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
    <el-table-column prop="projectName" label="项目名称" align="center" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="regionName" label="施工区段" align="center" min-width="200"></el-table-column>
    <el-table-column prop="subName" label="分部分项名称" align="center" min-width="200" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="statName" label="形象进度统计项" align="center" min-width="120" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="unitName" label="形象单位" align="center"></el-table-column>
    <el-table-column prop="budgetTotal" label="预算工程量" align="center" min-width="120"></el-table-column>
    <el-table-column prop="finishBudget" label="累计完成" align="center"></el-table-column>
    <el-table-column prop="finishBudgetRate" label="完成比例" align="center">
      <template slot-scope="scope">
        <span v-if="scope.row.finishBudgetRate">{{$common.fomatPrecent(scope.row.finishBudgetRate)}}%</span>
       </template>
    </el-table-column>
    <template v-for="(item,index) in indexArry">
      <el-table-column align="center" :prop="'logMms['+ index +'].planFinish'"  :label=" item + '月计划'"  :key="index  + 0.1">
           <template slot-scope="scope">
             <span v-if="scope.row.logMms[index].planFinish">{{scope.row.logMms[index].planFinish}}</span>
             <span v-else>--</span>
           </template>
      </el-table-column>
      <el-table-column align="center"  :prop="'logMms['+ index +'].finishTotal'" :label=" item + '月完成'"  :key="index  + 0.2">
           <template slot-scope="scope">
             <span v-if="scope.row.logMms[index].finishTotal">{{scope.row.logMms[index].finishTotal}}</span>
             <span v-else>--</span>
           </template>
      </el-table-column>
    </template>
  </el-table>
  <el-pagination background v-if="total>0"
      class="pageStyle"
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="pagesize"
      :current-page.sync="currentPage"
			:total="total"
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
import { getVisualStatMonitorPage,baseinUrl } from "../api/system_interface.js";
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
      projectId: [],
      regionId: [],
      regionIds:null,
      projectIds:null,   
      monthIndex:'',
      indexArry:[],
      title:['项目名称','施工区段','分部分项名称','形象进度统计项','形象单位','预算工程量','累计完成','完成比例'],
      key:['projectName', 'regionName', 'subName', 'statName', 'unitName', 'budgetTotal','finishBudget','finishBudgetRate'],
      excelName:'进度视检表格'
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

   exportExcel(){
     if(this.multipleSelection.length < 1){
          this.$message.success("请选择要导出的类别!");
          return
     }
     this.$common.export2Excel(this.title,this.key,this.multipleSelection,this.excelName)
   },

    //选择项变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },

    //导出excel
    exportExcel(){
      // let object = this.$common.initTree(this.multipleSelection).map(v=>v.id);
      // this.$common.export2Excel(this.title,this.key,this.multipleSelection,this.excelName);
       if(this.multipleSelection.length < 1){
          this.$message.success("请选择要导出的内容!");
          return
       }
        this.$axios({
          method:"post",
          url:baseinUrl() + "/web/export/exportVisualReview",
          data:this.multipleSelection,
          headers:{
              'token':sessionStorage.getItem("userToken")
          },
          responseType: 'arraybuffer'
        }).then(response => {
          //  if(response.code == "200"){
              let blob = new Blob([response.data], {type: "application/vnd.ms-excel"}); 
              let objectUrl = URL.createObjectURL(blob);
              window.location.href = objectUrl; 
          //  }else{
          //    this.$message.error('系统异常');
          //  }
        })
        .catch(error => {
          this.$message.error(error);
        });
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
      this.valueData.value2= this.$common.fomatDate(this.$common.SetMonthDate(endValue)); //结束时间
      this.getMonthAll(this.valueData.value1,this.valueData.value2);              
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
     this.regionIds = null;
     this.projectIds = null;
    },
  
    //获取月份数组
    getMonthAll(begin,end) {
        this.indexArry = this.$common.getMonthAll(begin,end);   
    },

    //根据传入数获取当前时间前后几月
       Month(month) {
        var endDate = this.$common.getThisDays()//当前日期
        this.monthIndex = this.$common.Month(month);
        this.getMonthAll(this.monthIndex,endDate)
    },

    //按钮查询
    resarchInfo(){
       if(this.regionId.length >0){
          this.regionIds = this.regionId[this.regionId.length - 1];
       }
       if(this.projectId.length>0){
         this.projectIds = this.projectId[this.projectId.length - 1];
       } 
       this.refreshList();
    },
  },
  created(){
     let companyTypes = sessionStorage.getItem("companyType");
    if(companyTypes==2||companyTypes==3||companyTypes==4){
      this.refreshList();
    }
    this.getReginList();
    this.Month(-2);
    this.getlistOrgInfoList();
  }
};
</script>
<style lang="scss" scoped>
@import "lookProgress.scss";
</style>
