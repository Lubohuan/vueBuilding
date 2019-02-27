<template>
<!--形象进度月计划-->
<div class="planProgress">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>生产任务管理</el-breadcrumb-item>
    <el-breadcrumb-item>施工记录管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
   <!-- <el-col :span="10">
      <el-button v-if="hasPerm('110602')" size="mini" type="primary" @click="addPlan">+ 编制计划</el-button>
      <el-button size="mini" type="success" @click="exportExcel">导出excel</el-button>
   </el-col> -->
   <!-- <el-col :span="14" class="planProgress_btn1">
     <el-date-picker size="small" v-model="valueData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
   </el-col> -->
  </el-row>
   <el-row class="planProgress_row">
   <el-col :span="24">
      <el-date-picker size="small"
      v-model="timeArr"
      type="daterange"
      :default-time="['00:00:00', '23:59:59']"
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
      </el-date-picker>
     <el-cascader change-on-select :show-all-levels="false"  @change="projectchange" :options="listChildOrgInfoList" v-model="projectId" :props="defaultProps" size="small" placeholder="请选择项目" clearable></el-cascader>
     <el-cascader change-on-select :show-all-levels="false" :options="roginTreeList" v-model="regionId" :props="defaultProp" size="small" placeholder="请选择施工区段" clearable></el-cascader>
     <el-select v-model="respUser" clearable placeholder="请选择负责人" size="small">
        <el-option
          v-for="item in respUserList"
          :key="item.id"
          :label="item.trueName"
          :value="item.id">
        </el-option>
      </el-select>
     <el-button size="mini" type="success" @click="resarchInfo" style="margin-left:30px;" plain>搜索</el-button>
       <el-button size="mini"  @click="resetForm">重置</el-button>
   </el-col>
   
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border :header-cell-style="rowClass">
    <!-- <el-table-column type="selection" width="40" align="center"></el-table-column> -->
    <el-table-column type="index" label="序号" width="45" align="center"></el-table-column>
    <el-table-column   label="日期" align="center"  :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <span>{{scope.row.createTime}}</span>
      </template>
    </el-table-column>
    <el-table-column   label="项目名称" align="center" min-width="100" :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <span>{{scope.row.projectName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column  label="计划任务名称" align="center" min-width="190" :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <span>{{scope.row.planName}}</span>
      </template>
    </el-table-column>
    <el-table-column   label="施工区段" align="center" min-width="100" :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <span>{{scope.row.regionName}}</span>
      </template>
    </el-table-column>
    
    <el-table-column   label="形象单位" align="center">
      <template slot-scope="scope">
        <span>{{scope.row.unitName}}</span>
      </template>
    </el-table-column>
    <el-table-column  label="本次完成工程量" align="center" >
      <template slot-scope="scope">
        <!-- <span> -->
          <span v-if="scope.row.update == 0">{{scope.row.finishAmount}}</span>
          <!-- <el-input  size="mini" v-model="scope.row.finishAmount" v-if="scope.row.update == 0" disabled  class="spacialinput"/> -->
          <el-input  size="mini" v-model="focusvalue" v-if="scope.row.update == 1"  />
        <!-- </span> -->
      </template>
    </el-table-column>
    <el-table-column prop="createUserName"  label="施工责任人" align="center"></el-table-column>
    <el-table-column  label="变更记录" align="center" >
      <template slot-scope="scope">
        <span v-if="!scope.row.changTotal || scope.row.changTotal==0">无变更</span>
        <span @click="addPlan(scope.row)" style="color:#3296fa;cursor:pointer;" v-else>变更{{scope.row.changTotal}}次</span>
      </template>
    </el-table-column>
    
    <el-table-column label="操作" align="center" min-width="150">
      <template slot-scope="scope">
         <el-button v-if="hasPerm('110604') && scope.row.update==0" size="mini" type="primary" @click="editPlan(scope.row)">编辑</el-button>
        
         <el-button v-if="hasPerm('110604') && scope.row.update==1" size="mini" type="success" @click="updatenowdata(scope.row)">确定</el-button>
         <el-button v-if="hasPerm('110604') && scope.row.update==1" size="mini" type="info" @click="cancleeditClick(scope.row)">取消</el-button>
      </template>
    </el-table-column>
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

 <!--新增/修改进度计划-->
    <el-dialog  title="变更记录" :center="true" :visible.sync="dialog.workRecorddetail" width="700px" @open="$nextTick(()=>$refs['workRecorddetail'].update(dataObj))" >
      <workRecorddetail  ref="workRecorddetail"  @refreshData="refreshList"  @close="dialog.workRecorddetail = false" ></workRecorddetail>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {getWorkRecord,getConstructPlanPage,startConstructPlan,stopVisualStatItem,deleteConstructPlanById,baseinUrl,listRegionTree,listUserInfo,updateWorkRecord} from "../api/system_interface.js";
import workRecorddetail from "../workrecord/workRecorddetail.vue";
export default {
  name: "workRecord",
  components:{
      workRecorddetail
  },
  data() {
    return {
      timeArr:'',
      respUser:'',
      multipleSelection: [],
      respUserList:[],
      dataObj: {},
      valueData:"",
      tableData: [],
      dialog: {
        workRecorddetail: false
      },
      pagesize: 10,
      currentPage: 1,
      state:"",
      stateList:[
        {
          name:"进行中",
          state: 0
        },
        {
          name:"已完成",
          state: 1
        },
        {
          name:"已逾期",
          state: 2
        }
      ],
      total:0,
      projectId: [],
      regionId: [],
      regionIds:null,
      projectIds:null,
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
      roginTreeList:[],
      focusvalue:'',
      focusData:{},
    };
  },
  computed: {
    ...mapState([
     'reginList',
     'listOrgInfoList',
     'listChildOrgInfoList',
    ]),
  },
  methods: {
    ...mapActions([
      'getReginList',
      'getlistOrgInfoList'
    ]),
  
    rowClass({ row, rowIndex}) {
        // console.log(rowIndex) //表头行标号为0
        return 'text-align:center'
    },
    //项目变化的时候
    projectchange(val){
      let data = {projectId:''};
      if( this.projectId.length>=1){
         
         data = {projectId:this.projectId[this.projectId.length - 1]};
       }else{
         data = {projectId:this.projectId[0]};
       }
       this.regintreedata(data); //
       this.respUserListData(data.projectId||'');
    },
    async regintreedata(data) {
      listRegionTree(data)
        .then(response => {
          if (response.code == "200") {
             this.roginTreeList = response.body || [];
            //this.refreshList();
          } else {
            this.roginTreeList= [];
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //修改数据
    async updatenowdata(data){
      if(data.finishAmount == this.focusvalue){
        data.update = 0;
        let length = this.tableData.length;
        for(let i=length;i--;){
          if(this.tableData[i]['id'] == data['id']){
            this.$set(this.tableData[i],'update', 0);
            this.tableData.splice(i,1,data);
            break;
          }
        }
        return ;
      }
      if(isNaN(Number(this.focusvalue))){
        this.$message.error('数据非法');
        return ;
      }
        updateWorkRecord({
          "finishAmount": this.focusvalue,
          "id": data.id
        })
          .then(response => {
            if (response.code == "200") {
              
                 
                  this.$message.success('更新成功');
                  this.refreshList();
                } else {
                  this.$message.error(response.msg);
                }
          })
          .catch(error => {
            console.log(error);
        })  
    },
    //选择项变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

   

    
    

    
    

    //新增
    addPlan(data){
       this.dialog.workRecorddetail = true;
       this.dataObj = data;
    },

    //编辑
    editPlan(data){
      
      if(!this.focusData['finishAmount']){
        this.focusData['finishAmount'] = 0;
      }
      this.focusvalue = data.finishAmount;
      if(this.focusData['id'] != data.id && this.focusData['id']){
        this.focusData.update = 0;
      }
      this.focusData = data;
      data.update = 1;
      let length = this.tableData.length;
      for(let i=length;i--;){
        if(this.tableData[i]['id'] == data['id']){
          this.tableData.splice(i,1,data);
          //this.$set(this.tableData[i],'update',1);
          break;
        }
      }
      
    },
    cancleeditClick(data){
      this.focusvalue = data.finishAmount;
      data.update = 0;
      let length = this.tableData.length;
      for(let i=length;i--;){
        if(this.tableData[i]['id'] == data['id']){
          this.tableData.splice(i,1,data);
          //this.$set(this.tableData[i],'update',0);
          break;
        }
      }

      console.log(JSON.stringify(data));
    },

    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.refreshList();
    },

    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

    //分页查询
    refreshList() {
      getWorkRecord({
        current: this.currentPage,
        offset: this.pagesize,
        projectId: this.projectIds,
        regionId: this.regionIds,
        respUser:this.respUser,
        startTime:this.timeArr&&this.timeArr['length']?this.timeArr[0]:'',
        endTime:this.timeArr&&this.timeArr['length']?this.timeArr[1]:'',
      })
        .then(response => {
          this.tableData = response.body.rows;
          let length = this.tableData.length;
          for(let i=length;i--;){
            this.tableData[i]['update'] = 0;
          }
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
      });
    },
    //查人员
    async respUserListData(data) {
      listUserInfo(data)
        .then(response => {
          if (response.code == "200") {
             this.respUserList = response.body || [];
            //this.refreshList();
          } else {
            this.respUserList= [];
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
     //查询按钮
    resarchInfo(){
       if(this.regionId.length>=1){
          this.regionIds = this.regionId[this.regionId.length - 1];
       }else{
         this.regionIds = '';
       }
       if( this.projectId.length>=1){
         this.projectIds = this.projectId[this.projectId.length - 1];
       }else{
         this.projectIds = '';
       }
       this.refreshList();
    },

     //重置
    resetForm(){
      this.regionId = [];
      this.projectId = [];
      this.regionIds = null;
      this.projectIds = null;
      this.state = null;
      this.timeArr = '';
    }
  },
  created(){
    this.refreshList();
    this.getReginList();
    this.getlistOrgInfoList();
  }
};
</script>
<style lang="scss" scoped>
@import "workRecord.scss";
.tr_title{
  text-align: center;
}
</style>
