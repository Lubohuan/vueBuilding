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
    <el-table-column prop="createTime"  label="日期" align="center" min-width="190" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="projectName"  label="项目名称" align="center" min-width="100" :show-overflow-tooltip="true"></el-table-column>
    
    <el-table-column prop="planName"  label="计划任务名称" align="center" min-width="190" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="regionName"  label="施工区段" align="center" min-width="100" :show-overflow-tooltip="true"></el-table-column>
    
    <el-table-column prop="unitName"  label="形象单位" align="center"></el-table-column>
    <el-table-column prop="finishAmount"  label="本次完成工程量" align="center" min-width="100"></el-table-column>
    <el-table-column prop="createUserName"  label="施工责任人" align="center" min-width="110"></el-table-column>
    <el-table-column prop="changTotal"  label="变更记录" align="center" min-width="110"></el-table-column>
    
    <el-table-column label="操作" align="center" min-width="150">
      <template slot-scope="scope">
         <el-button v-if="hasPerm('110604')" size="mini" type="primary" @click="editPlan(scope.row)">编辑</el-button>
         <el-button v-if="scope.row.isForbid == 0 && hasPerm('110604')" size="mini" type="warning" @click="stopClick(scope)">禁用</el-button>
         <el-button v-if="scope.row.isForbid == 1 && hasPerm('110604')" size="mini" type="success" @click="startClick(scope)">启用</el-button>
         <el-button v-if="scope.row.isForbid == 1 && hasPerm('110603')" size="mini" type="danger" @click="deleteClick(scope)">删除</el-button>
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
    <el-dialog  title="变更记录" :center="true" :visible.sync="dialog.workRecorddetail" width="700px" @open="$nextTick(()=>$refs['workRecorddetail'].update(dataObj))" @close="$refs['workRecorddetail'].reset()">
      <workRecorddetail  ref="workRecorddetail"  @refreshData="refreshList"  @close="dialog.workRecorddetail = false" ></workRecorddetail>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {getWorkRecord,getConstructPlanPage,startConstructPlan,stopVisualStatItem,deleteConstructPlanById,baseinUrl,listRegionTree,listUserInfo} from "../api/system_interface.js";
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
    
    //选择项变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

   

    //删除方法
    deleteClick(scope) {
       this.$confirm("确定要删除此进度吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
        deleteConstructPlanById(scope.row.id)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("删除成功!");
            this.refreshList();
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });  
        })
        .catch(() => {
          this.$message.error("已取消删除");
        });
    },

    //禁用
    stopClick(scope) {
      stopVisualStatItem(scope.row.id)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("禁用成功!");
            this.refreshList();
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //启用
    startClick(scope) {
      startConstructPlan(scope.row.id)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("启用成功!");
            this.refreshList();
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //新增
    addPlan(){
       this.dialog.addPlan = true;
       this.dataObj = {}
    },

    //编辑
    editPlan(data){
        this.dialog.addPlan = true;
        this.dataObj = data;
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
