<template>
<!--形象进度月计划-->
<div class="planProgress">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>形象进度管理</el-breadcrumb-item>
    <el-breadcrumb-item>形象进度月计划</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
   <el-col :span="10">
      <el-button size="mini" type="primary" @click="addPlan">+ 编制计划</el-button>
      <el-button size="mini" type="success">导出excel</el-button>
   </el-col>
   <!-- <el-col :span="14" class="planProgress_btn1">
     <el-date-picker size="small" v-model="valueData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
   </el-col> -->
  </el-row>
   <el-row class="planProgress_row">
   <el-col :span="18">
     <el-cascader :options="listOrgInfoList" v-model="projectId" :props="defaultProps" size="small" placeholder="请选择项目" clearable></el-cascader>
     <el-cascader :options="reginList" v-model="regionId" :props="defaultProp" size="small" placeholder="请选择施工区段" clearable></el-cascader>
     <el-select size="small" v-model="state" placeholder="请选择状态" clearable>
            <el-option v-for="(item,index) in stateList" :label="item.name" :value="item.state" :key="index"></el-option>
     </el-select>
   </el-col>
   <el-col :span="6" class="planProgress_btn1">
       <el-button size="mini" type="success" @click="resarchInfo">搜索</el-button>
       <el-button size="mini"  @click="resetForm">重置</el-button>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
    <el-table-column prop="planName"  label="项目名称" align="center" min-width="150"></el-table-column>
    <el-table-column prop="projectName"  label="计划任务名称" align="center" min-width="200"></el-table-column>
    <el-table-column prop="regionFullName"  label="施工区段" align="center" min-width="200"></el-table-column>
    <el-table-column prop="planEndTime"  label="完成时间" align="center" min-width="120"></el-table-column>
    <el-table-column prop="budgetTotal"  label="总工程量" align="center"></el-table-column>
    <el-table-column prop="finishTotal"  label="剩余工程量" align="center" min-width="90"></el-table-column>
    <el-table-column prop="planFinish"  label="计划工程量" align="center" min-width="90"></el-table-column>
    <el-table-column prop="planFinishRate"  label="完成比例" align="center" min-width="90"></el-table-column>
    <el-table-column prop="isForbid"  label="状态" align="center" min-width="50">
       <template slot-scope="scope">
          <span v-if="scope.row.isForbid == 0">启用</span>
          <span v-if="scope.row.isForbid == 1">禁用</span>
       </template>
    </el-table-column>
    <el-table-column label="操作" align="center" min-width="180">
      <template slot-scope="scope">
         <el-button size="mini" type="primary" @click="editPlan(scope.row)">编辑</el-button>
         <el-button v-if="scope.row.isForbid == 0" size="mini" type="warning" @click="stopClick(scope)">禁用</el-button>
         <el-button v-if="scope.row.isForbid == 1" size="mini" type="success" @click="startClick(scope)">启用</el-button>
         <el-button v-if="scope.row.isForbid == null" size="mini" type="danger" @click="deleteClick(scope)">删除</el-button>
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
    <el-dialog :title="dataObj.id?'修改计划进度':'新增形计划进度'" :center="true" :visible.sync="dialog.addPlan" width="700px" @open="$nextTick(()=>$refs['addPlan'].update(dataObj))" @close="$refs['addPlan'].reset()">
      <addPlan ref="addPlan"  @refreshData="refreshList"  @close="dialog.addPlan = false" ></addPlan>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {getConstructPlanPage,startConstructPlan,stopVisualStatItem,deleteConstructPlanById} from "../api/upload.js";
import addPlan from "../planProgress/addPlan.vue";
export default {
  name: "planProgress",
  components:{
      addPlan
  },
  data() {
    return {
      multipleSelection: [],
      dataObj: {},
      valueData:"",
      tableData: [],
      dialog: {
        addPlan: false
      },
      pagesize: 10,
      currentPage: 1,
      state:"",
      stateList:[
        {
          name:"启用",
          state: 0
        },
        {
          name:"禁用",
          state: 1
        }
      ],
      total:0,
      projectId: null,
      regionId: null,
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
      getConstructPlanPage({
        current: this.currentPage,
        offset: this.pagesize,
        projectId: this.projectIds,
        regionId: this.regionIds,
        state:this.state
      })
        .then(response => {
          this.tableData = response.body.rows;
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
      });
    },

     //查询按钮
    resarchInfo(){
       this.regionIds = this.regionId[this.regionId.length - 1];
       this.projectIds = this.projectId[this.projectId.length - 1];
       this.refreshList();
    },

     //重置
    resetForm(){
      this.regionId = [];
      this.projectId = [];
      this.regionIds = "";
      this.projectIds = "";
      this.state = "";
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
@import "planProgress.scss";
</style>
