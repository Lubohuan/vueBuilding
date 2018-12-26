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
      <el-button size="mini" type="success" @click="exportExcel">导出excel</el-button>
   </el-col>
   <!-- <el-col :span="14" class="planProgress_btn1">
     <el-date-picker size="small" v-model="valueData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
   </el-col> -->
  </el-row>
   <el-row class="planProgress_row">
   <el-col :span="18">
     <el-cascader :show-all-levels="false" :options="listOrgInfoList" v-model="projectId" :props="defaultProps" size="small" placeholder="请选择项目" clearable></el-cascader>
     <el-cascader :show-all-levels="false" :options="reginList" v-model="regionId" :props="defaultProp" size="small" placeholder="请选择施工区段" clearable></el-cascader>
     <el-select size="small" v-model="state" placeholder="请选择状态" clearable>
            <el-option v-for="(item,index) in stateList" :label="item.name" :value="item.state" :key="index"></el-option>
     </el-select>
   </el-col>
   <el-col :span="6" class="planProgress_btn1">
       <el-button size="mini" type="success" @click="resarchInfo">搜索</el-button>
       <el-button size="mini"  @click="resetForm">重置</el-button>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border :header-cell-style="rowClass">
    <el-table-column type="selection" width="50" align="center"></el-table-column>
    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
    <el-table-column prop="projectName"  label="项目名称" align="center" min-width="120"></el-table-column>
    <el-table-column prop="state"  label="状态" align="center" min-width="80">
       <template slot-scope="scope">
          <span v-if="scope.row.state == 0"><span class="starting"></span>进行中</span>
          <span v-if="scope.row.state == 1" ><span class="finish"></span>已完成</span>
          <span v-if="scope.row.state == 2" ><span class="overTime"></span>已逾期</span>
          <span v-if="scope.row.state == 3" ><span class="notStatr"></span>未开始</span>
       </template>
    </el-table-column>
    <el-table-column prop="planName"  label="计划任务名称" align="center" min-width="200"></el-table-column>
    <el-table-column prop="regionFullName"  label="施工区段" align="center" min-width="100" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="planEndTime"  label="完成时间" align="center" min-width="90"></el-table-column>
    <el-table-column prop="budgetTotal"  label="总工程量" align="center"></el-table-column>
    <el-table-column prop="notFinishBudget"  label="总剩余工程量" align="center" min-width="100"></el-table-column>
    <el-table-column prop="planFinish"  label="计划工程量" align="center" min-width="90"></el-table-column>
    <el-table-column prop="finishTotal"  label="已完成工程量" align="center" min-width="100"></el-table-column>
    <el-table-column prop="notFinish"  label="计划剩余工程量" align="center" min-width="110"></el-table-column>
    <el-table-column prop="planFinishRate"  label="完成比例"  min-width="200" header-cell-style="tr_title">
        <!-- <template slot-scope="scope">
          <span v-if="scope.row.planFinishRate">{{$common.fomatPrecent(scope.row.planFinishRate)}}%</span>
       </template> -->
       <template slot-scope="scope" style="text-align:left;">
                <el-progress v-if="!scope.row.planFinishRate" :stroke-width="13"  :percentage="0"></el-progress>
                <el-progress v-else-if="scope.row.state == 0" :stroke-width="13"  :percentage="$common.fomatPrecent(scope.row.planFinishRate)" color="#ff943e"></el-progress>
                <el-progress v-else-if="scope.row.state == 1" :stroke-width="13"  :percentage="$common.fomatPrecent(scope.row.planFinishRate)" color="#15bc83"></el-progress>
                <el-progress v-else-if="scope.row.state == 2" :stroke-width="13"  :percentage="$common.fomatPrecent(scope.row.planFinishRate)" color="#f25643"></el-progress>
                <el-progress v-else-if="scope.row.state == 3" :stroke-width="13"  :percentage="$common.fomatPrecent(scope.row.planFinishRate)" color="#3296fa"></el-progress>
        </template>
    </el-table-column>
    <el-table-column label="操作" align="center" min-width="230">
      <template slot-scope="scope">
         <el-button size="mini" type="primary" @click="editPlan(scope.row)">编辑</el-button>
         <el-button v-if="scope.row.isForbid == 0" size="mini" type="warning" @click="stopClick(scope)">禁用</el-button>
         <el-button v-if="scope.row.isForbid == 1" size="mini" type="success" @click="startClick(scope)">启用</el-button>
         <el-button v-if="scope.row.isForbid == 1" size="mini" type="danger" @click="deleteClick(scope)">删除</el-button>
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
    <el-dialog  :title="dataObj.id?'修改形象进度计划':'新增形象进度计划'" :center="true" :visible.sync="dialog.addPlan" width="700px" @open="$nextTick(()=>$refs['addPlan'].update(dataObj))" @close="$refs['addPlan'].reset()">
      <addPlan v-if="dialog.addPlan" ref="addPlan"  @refreshData="refreshList"  @close="dialog.addPlan = false" ></addPlan>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {getConstructPlanPage,startConstructPlan,stopVisualStatItem,deleteConstructPlanById,baseinUrl} from "../api/system_interface.js";
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
      }
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
  
    rowClass({ row, rowIndex}) {
        // console.log(rowIndex) //表头行标号为0
        return 'text-align:center'
    },

    //选择项变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //导出excel
    exportExcel(){
       if(this.multipleSelection.length < 1){
          this.$message.success("请选择要导出的内容!");
          return
       }
        this.$axios({
          method:"post",
          url:baseinUrl() + "/web/export/exportVisualPlan",
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
       if(this.regionId.length>=1){
          this.regionIds = this.regionId[this.regionId.length - 1];
       }
       if( this.projectId.length>=1){
         this.projectIds = this.projectId[this.projectId.length - 1];
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
.tr_title{
  text-align: center;
}
</style>
