<template>
<!-- 施工区域管理 -->
<div class="areaManagement">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '' }">生产形象进度 </el-breadcrumb-item>
    <el-breadcrumb-item>施工区段管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button size="mini" type="primary" @click="addClick" v-if="hasPerm('110202')">+ 添加区段</el-button>
    <el-button size="mini" type="success" @click="exportExcel">导出excel</el-button>
    <el-row class="tableRow">
    <el-col :span="15">
      <el-cascader :show-all-levels="false" change-on-select :options="listChildOrgInfoList" v-model="projectId" :props="defaultPropss" size="small" placeholder="请选择项目" clearable></el-cascader>
      <!-- <el-cascader :show-all-levels="false" :options="reginList" v-model="regionId" :props="defaultProp" size="small" placeholder="请选择施工区段" clearable></el-cascader> -->
    <el-button size="mini" type="success"  @click="resarchInfo" style="margin-left:30px;" plain>搜索</el-button>
       <el-button size="mini" @click="resetForm">重置</el-button>
    </el-col>
  </el-row>
  <el-row class="tableHead" style="display:flex;justify-content: space-between;align-items: center;">
    <div style="width:calc(100% - 240px);">
    <el-col :span="4" class="tableCol" style="margin-left:45px;">
      <span>项目名称</span>
    </el-col>
    <el-col :span="4" class="tableCol">
      <span>区域名称</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>计划总数</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>已完成</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>进行中</span>
    </el-col>
     <el-col :span="3" class="tableCol" style="margin-left: -10px;">
      <span>逾期计划数</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>逾期计划占比</span>
    </el-col>
      <el-col :span="3" class="tableCol">
      <span>未开始</span>
    </el-col>
    </div>
    <div class="tableCol" style="min-width:240px;">
      <span>操作</span>
    </div>
    <!-- <el-col :span="3"  class="tableCol" style="min-width:240px;">
      <span>操作</span>
    </el-col> -->
  </el-row>
  <el-tree :data="tableData" ref="tree" :default-checked-keys="resourceCheckedKey" show-checkbox node-key="id" :default-expand-all="false" :expand-on-click-node="false" :props="defaultProps" style="overflow:auto;" :indent="5" @check-change="handleSelectionChange">
    <div style="display:flex;justify-content: space-between;align-items: center;" class="custom-tree-node" slot-scope="{ node, data }" :style="'margin-left:'+ node.level*(-8.8) + 'px'">
      <div style="width:calc(100% - 240px);">
      
    <!-- <span class="custom-tree-node" slot-scope="{ node, data }" :style="'margin-left:'+ node.level*(-8.8) + 'px'"> -->
    <el-row style="width:100%;" :style="'margin-left:'+ (30 + node.level*2.1) + 'px'">
    <el-col :span="4" class="tableCol">
      <span v-if="data.projectName == null">--</span>
      <span v-else>{{ data.projectName }}</span>
    </el-col>
    <el-col :span="4" class="tableCol">
       <span v-if="data.regionName == null">--</span>
       <span v-else>{{ data.regionName }}</span> 
    </el-col>
    <el-col :span="2" class="tableCol">
       <span v-if="data.taskTotal == null">--</span>
       <span v-else>{{ data.taskTotal }}</span> 
    </el-col>
      <el-col :span="2" class="tableCol">
       <span v-if="data.finishCount == null">--</span>
       <span v-else>{{ data.finishCount }}</span>
    </el-col>
    <el-col :span="3" class="tableCol" style="margin-left:-15px;">
       <span v-if="data.startCount == null">--</span>
       <span v-else>{{ data.startCount }}</span>
    </el-col>
    <el-col :span="3" class="tableCol" style="margin-left:-40px;color:red;">
       <span v-if="data.expiryCount == null">--</span>
       <span v-else>{{ data.expiryCount }}</span>
    </el-col>
    <el-col :span="2" class="tableCol" style="margin-left:10px;">
       <span v-if="data.expiryRate == null">--</span>
       <span v-else>{{ $common.fomatPrecent(data.expiryRate) }}%</span>
    </el-col>
    <el-col :span="3" class="tableCol">
       <span v-if="data.notStartCount == null">--</span>
       <span v-else>{{ data.notStartCount }}</span>
    </el-col>
    
    
    <!-- <el-col :span="4"  class="tableCol" style="min-width:240px;">
     <span>
            <el-button v-if="hasPerm('110202')" size="mini" type="primary"  @click="addChild(data,node)">添加下级</el-button>
            <el-button v-if="hasPerm('110204')" size="mini" type="primary" @click="editClick(data)">编辑</el-button>
            <el-button v-if="hasPerm('110203')" size="mini" type="danger"  @click="deleteClick(data)">删除</el-button>
        </span>
    </el-col> -->
    </el-row>       
    <!-- </span> -->
    
    </div>
    <div class="tableCol" style="min-width:240px;">
      <span>
            <el-button v-if="hasPerm('110202')" size="mini" type="primary"  @click="addChild(data,node)">添加下级</el-button>
            <el-button v-if="hasPerm('110204')" size="mini" type="primary" @click="editClick(data)">编辑</el-button>
            <el-button v-if="hasPerm('110203')" size="mini" type="danger"  @click="deleteClick(data)">删除</el-button>
        </span>
    </div>
  </div>
   </el-tree>

    <!--添加/修改分部分项-->
    <el-dialog :title="regionObject.id?'修改施工区域':'添加施工区域'" :center="true" :visible.sync="dialog.addArea" width="800px"  @open="$nextTick(()=>$refs['addArea'].update(regionObject))" @close="$refs['addArea'].reset()">
      <addArea ref="addArea" @refreshData="refreshList" @close="dialog.addArea = false" ></addArea>
    </el-dialog>

     <!--添加/修改分部分项-->
    <el-dialog title="添加下级" :center="true" :visible.sync="dialog.addAreaChild" width="800px"  @open="$nextTick(()=>$refs['addAreaChild'].update(regionObject))" @close="$refs['addAreaChild'].reset()">
      <addAreaChild ref="addAreaChild" @refreshData="refreshList" @close="dialog.addAreaChild = false" ></addAreaChild>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { listRegion, deleteRegionById,baseinUrl } from "../api/system_interface.js";
import addArea from "../areaManagement/addArea.vue";
import addAreaChild from "../areaManagement/addAreaChild.vue";
export default {
  name: "areaManagement",
  components: {
    addArea,
    addAreaChild
  },
  data() {
    return {
      activeName: "first",
      multipleSelection: [],
      tableData: [],
      projectId: [],
      regionId: [],
      regionIds:null,
      projectIds:null,
      resourceCheckedKey: [],
      regionObject: {},
      dialog: {
        addArea: false,
        addAreaChild:false
      },
      defaultProps: {
        children: "child"
      },
      defaultProp:{
        children: "child",
        label: "regionName",
        value: "id"
      },
      defaultPropss:{
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
     'listChildOrgInfoList'
    ]),
  },
  methods: {

    ...mapActions([
      'getReginList',
      'getlistOrgInfoList'
    ]),

    //选择框
    handleSelectionChange(data, checked, indeterminate) {
    //   if(checked==true){
    //     this.multipleSelection.push(data); 
    //   }
    //   else{
    //      let index = this.multipleSelection.indexOf(data);
    //      if (index > -1) {
    //           this.multipleSelection.splice(index, 1);
    //       }
    //   }
    //   console.log(this.multipleSelection, checked, indeterminate, "this.multipleSelection");
    },

      //导出表格
    exportExcel(){

        let x = this.$refs.tree.getCheckedKeys();
        for(var i=0;i<x.length;i++){
              if(this.$refs.tree.getNode(x[i]).parent.data.id){
                x.push(this.$refs.tree.getNode(x[i]).parent.data.id);
              }
        }
        let y = new Set(x);
        this.multipleSelection = [...y];

        if(this.multipleSelection.length < 1){
          this.$message.success("请选择要导出的类别!");
          return
        }
        this.$axios({
          method:"post",
          url:baseinUrl() + "/web/export/exportRegion",
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

    //删除区段
    deleteClick(data) {
      this.$confirm("确定要删除此区段吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          deleteRegionById(data.id)
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

    //打开新增弹框
    addClick() {
      this.dialog.addArea = true;
      this.regionObject = {};
    },

    //打开修改弹框
    editClick(data) {
      this.dialog.addArea = true;
      this.regionObject = data;
    },

    //打开添加下级弹框
    addChild(data,node){
       this.dialog.addAreaChild = true;
       this.regionObject = {};
       this.regionObject.id = data.id;
       this.regionObject.projectId = data.projectId;
       console.log(node,"addAreaChild");
    },

    //查询
    refreshList() {
      listRegion({
        projectId:this.projectIds,
        regionId: this.regionIds
      })
        .then(response => {
          this.tableData = response.body;
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
        });
    },

     //按钮查询
    resarchInfo(){
       if(this.regionId.length>0){
         this.regionIds = this.regionId[this.regionId.length - 1];
       }
       if(this.projectId.length>0){
         this.projectIds = this.projectId[this.projectId.length - 1];
       }
       this.refreshList();
    },

    //重置
    resetForm(){
       this.regionId = [];
       this.projectId = [];
       this.regionIds = "";
       this.projectIds = "";
       this.$refs.tree.setCheckedKeys(this.tableData);
    }
  },
  created() {
    this.refreshList();
    this.getReginList();
    this.getlistOrgInfoList();
  }
};
</script>
<style lang="scss">
@import "areaManagement.scss";
.el-tree-node__children .el-tree-node__expand-icon{
  padding-left:10px;
}
</style>
