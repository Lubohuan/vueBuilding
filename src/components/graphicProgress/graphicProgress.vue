<template>
<!--形象进度统计项-->
<div class="graphicProgress">
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>形象进度管理</el-breadcrumb-item>
    <el-breadcrumb-item>形象进度统计项</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
   <el-col :span="10">
      <!-- <el-button v-if="hasPerm('111002')" size="mini" type="primary" @click="addProgress">+新增形象进度统计项</el-button> -->
      <el-button size="mini" type="success" @click="exportExcel">导出excel</el-button>
   </el-col>
   <!-- <el-col :span="14" class="graphicProgress_btn1">
      <el-cascader placeholder="请选择施工区段" :options="reginList" v-model="regionId" :props="defaultProps" size="small" @change="reserchList" clearable></el-cascader>
   </el-col> -->
  </el-row>
   <el-row class="graphicProgress_row">
   <el-col :span="15">
      <!-- <el-cascader change-on-select :show-all-levels="false" :options="listChildOrgInfoList" v-model="projectId" :props="defaultProp" size="small" placeholder="请选择项目" clearable></el-cascader>
      <el-cascader change-on-select placeholder="请选择施工区段" :options="reginList" v-model="regionId" :props="defaultProps" size="small"  clearable></el-cascader> -->
      <el-cascader change-on-select :show-all-levels="false" @change="projectchange" :options="listChildOrgInfoList" @blur="clearmodel()" v-model="projectId" :props="defaultProps1" size="small" placeholder="请选择项目" clearable></el-cascader>
     <el-cascader change-on-select :show-all-levels="false" :options="roginTreeList" @blur="clearmodel()" v-model="regionId" :props="defaultProp" size="small" placeholder="请选择施工区段" clearable></el-cascader>
    <el-button size="mini" type="success" @click="resarchInfo" style="margin-left:30px;" plain>搜索</el-button>
       <el-button size="mini" @click="resetForm">重置</el-button>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border :header-cell-style="rowClass">
    <el-table-column type="selection" width="50" align="center"></el-table-column>
    <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
    <el-table-column prop="projectName" label="项目名称" align="center" ></el-table-column>
    <el-table-column prop="regionFullName" label="施工区段" align="center"  :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="subFullName" label="分部分项名称" align="center" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="statName" label="形象进度统计项" align="center"  :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="unitName" label="形象单位" align="center"></el-table-column>
    <el-table-column prop="budgetTotal" label="预算工程量" align="center" ></el-table-column>
    <el-table-column prop="finishBudget" label="累计完成" align="center"></el-table-column>
    <el-table-column prop="outputTotal" label="总产值（万元）" align="center"  ></el-table-column>
    <el-table-column prop="finishOutput" label="完成产值（万元）" align="center" ></el-table-column>
    <el-table-column prop="finishBudgetRate" label="完成比例" width="150">
        <!-- <template slot-scope="scope">
          <span v-if="scope.row.finishBudgetRate">{{$common.fomatPrecent(scope.row.finishBudgetRate)}}%</span>
       </template> -->
        <template slot-scope="scope">
                <el-progress v-if="!scope.row.finishBudgetRate" :stroke-width="13"  :percentage="0"></el-progress>
                <el-progress v-else :stroke-width="13" :percentage="$common.fomatPrecent(Number(scope.row.finishBudgetRate))"></el-progress>
        </template>
    </el-table-column>
    <el-table-column label="操作" align="center" min-width="150">
      <template slot-scope="scope">
            <el-button v-if="hasPerm('111004')" size="mini" type="primary" @click="editClick(scope)">编辑</el-button>
            <el-button v-if="scope.row.isForbid == 0 && hasPerm('111004')" size="mini" type="warning" @click="stopClick(scope)">禁用</el-button>
            <el-button v-if="scope.row.isForbid == 1 && hasPerm('111004')" size="mini" type="success" @click="startClick(scope)">启用</el-button>
            <el-button v-if="hasPerm('111003')" size="mini" type="danger" @click="deleteClick(scope)">删除</el-button>   
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background v-if="total > 0"
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


   <!--新增/修改形象进度统计项-->
    <el-dialog :title="dataObj.id?'修改形象进度统计项':'新增形象进度统计项'" :center="true" :visible.sync="dialog.addProgress" width="700px" @open="$nextTick(()=>$refs['addProgress'].update(dataObj))" @close="$refs['addProgress'].reset()">
      <addProgress ref="addProgress" @refreshData="refreshList"  @close="dialog.addProgress = false" ></addProgress>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {getVisualStatItemPage,startVisualStatItem,stopVisualStatItems,deleteVisualStatItem,baseinUrl,listRegionTree} from "../api/system_interface.js";
import addProgress from "../graphicProgress/addProgress.vue";
export default {
  name: "graphicProgress",
  components: {
    addProgress
  },
  data() {
    return {
      multipleSelection: [],
      dataObj: {},
      tableData: [],
      dialog: {
        addProgress: false
      },
      defaultProps: {
        children: "child"
      },
      defaultProp:{
        children: "child",
        label: "regionName",
        value: "id"
      },
       defaultProps1:{
        children: "child",
        label: "name",
        value: "id"
      },
      pagesize: 10,
      currentPage: 1,
      projectId: [],
      regionId: [],
      total: 0,
      regionIds:null,
      projectIds:null,
      roginTreeList:[],
    };
  },
  computed: {
    ...mapState([
     'reginList',
     'listOrgInfoList',
     'listChildOrgInfoList'
    ]),
  },
  methods: {
    ...mapActions([
        'getReginList',
        'getlistOrgInfoList'
    ]),
    clearmodel(){
      //alert(2);
      if(this.regionId.length>=1){
          this.regionIds = this.regionId[this.regionId.length - 1];
       }else{
         this.regionIds ='';
       }
       if( this.projectId.length>=1){
         this.projectIds = this.projectId[this.projectId.length - 1];
       }else{
         this.projectIds = '';
       }
    },
     projectchange(val){
      let data = {projectId:''};
      if( this.projectId.length>=1){
         
         data = {projectId:this.projectId[this.projectId.length - 1]};
       }else{
         data = {projectId:this.projectId[0]};
       }
        this.regintreedata(data); //
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
    rowClass({ row, rowIndex}) {
      // console.log(rowIndex) //表头行标号为0
      return 'text-align:center'
    },
    
     //导出表格
    exportExcel(){
       if(this.multipleSelection.length < 1){
          this.$message.success("请选择要导出的类别!");
          return
       }
        this.$axios({
          method:"post",
          url:baseinUrl() + "/web/export/exportVisualStatItem",
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
        deleteVisualStatItem(scope.row.id)
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
      stopVisualStatItems(scope.row.id)
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
      startVisualStatItem(scope.row.id)
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

    //增加方法
    addProgress() {
      this.dialog.addProgress = true;
      this.dataObj = {};
    },
    
    //修改方法
    editClick(scope) {
      this.dialog.addProgress = true;
      this.dataObj = scope.row;
      console.log(this.dataObj);
    },

    //页码改变
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.refreshList();
    },

    //每页显示数量改变
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

    //分页查询
    refreshList() {
      getVisualStatItemPage({
        current: this.currentPage,
        offset: this.pagesize,
        projectId: this.projectIds,
        regionId: this.regionIds
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

    //选择地区查询
    reserchList(){
      this.regionIds = this.regionId[this.regionId.length - 1];
      this.refreshList();
    },

    //重置搜索框
    resetForm(){
      this.projectId = []; 
      this.projectIds = null;
      this.regionIds = null;
      this.regionId = [];   
    }
  },
  created() {
    this.refreshList();
    this.getReginList();
    this.getlistOrgInfoList();
  }
};
</script>
<style lang="scss" scoped>
@import "graphicProgress.scss";
</style>
