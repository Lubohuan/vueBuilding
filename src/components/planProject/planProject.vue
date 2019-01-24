<template>
<!-- 分部分项库 -->
<div class="bitem">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '' }">生产计划管理 </el-breadcrumb-item>
    <el-breadcrumb-item>项目阶段性进度计划</el-breadcrumb-item>
    </el-breadcrumb>
   <!-- <el-row>
    <el-col :span="24">
      <el-tabs v-model="projectType" type="card" @tab-click="handleClick">
      <el-tab-pane :key="item.id" v-for="item in projectTypeList" :label="item.typeName" :name="item.id"></el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row> -->
  <el-row class="planProgress_row">
   <el-col :span="18">
     <el-cascader change-on-select :show-all-levels="false" @change="projectchange" :options="listChildOrgInfoList" @blur="clearmodel()" v-model="projectId" :props="defaultProps1" size="small" placeholder="请选择项目" clearable></el-cascader>
     <el-cascader change-on-select :show-all-levels="false" :options="roginTreeList" @blur="clearmodel()" v-model="regionId" :props="defaultProp" size="small" placeholder="请选择施工区段" clearable></el-cascader>
   </el-col>
   <el-col :span="6" class="planProgress_btn1" style="text-align:right;">
       <el-button size="mini" type="success" @click="resarchInfo">搜索</el-button>
       <el-button size="mini"  @click="resetForm">重置</el-button>
   </el-col>
  </el-row>
  <!-- <div style="height:auto;width:100%;overflow:auto;"> -->

  
 <el-row class="tableHead" style="">
    <el-col :span="2" class="tableCol" style="margin-left:35px;">
      <span>项目名称</span>
    </el-col>
    <el-col :span="2" class="tableCol">
      <span>名称</span>
    </el-col>
      <el-col :span="1" class="tableCol">
      <span>里程碑</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>开始时间</span>
    </el-col>
      <el-col :span="2" class="tableCol" style="margin-left:-10px;">
      <span>结束时间</span>
    </el-col>
     <el-col :span="1" class="tableCol" >
      <span>工期</span>
    </el-col>
    <el-col :span="1" class="tableCol">
      <span>形象单位</span>
    </el-col>
    <el-col :span="1" class="tableCol" style="margin-left:-10px;">
      <span>总工程量</span>
    </el-col>
    <el-col :span="1" class="tableCol" >
      <span>累计完成</span>
    </el-col>
    <el-col :span="2" class="tableCol">
      <span>总产值(万元)</span>
    </el-col>
    <el-col :span="2" class="tableCol">
      <span>累计完成产值(万元)</span>
    </el-col>
      <el-col :span="2" class="tableCol" style="margin-left:10px;">
      <span>完成比例</span>
    </el-col>
    <el-col :span="4"  class="tableCol" style="margin-left:-25px;">
      <span>操作</span>
    </el-col>
  </el-row>
  <el-tree   :data="tableData" ref="tree"  :default-expand-all="true" :expand-on-click-node="false" :props="defaultProps" style="width:100%;box-sizing: border-box;" :indent="5" >
    <span class="custom-tree-node" slot-scope="{ node, data }" :style="'margin-left:'+ node.level*(-8.8) + 'px'">
    <el-row style="width:100%;" :style="'margin-left:'+ (30 + node.level*2.1) + 'px'">
    <el-col :span="2" class="tableCol" style="text-align:left;">
      <img src="../../assets/wbs.png" style="height:20px;" v-if="data.type == 0" />
      <el-tooltip class="item" effect="dark" :content="data.projectName" placement="top">
        <span v-if="data.projectName == null">--</span>
        <span v-else>
          
          {{ data.projectName }}
        </span>
      </el-tooltip>
      
    </el-col>
    <el-col :span="2" class="tableCol">
      <el-tooltip class="item" effect="dark" :content="data.type==0?data.regionName:data.statName" placement="top">
        <span class="tableCol" style="display:inline-block;width:100%;" v-if="data.type == 0">{{ data.regionName }}</span>
        <span class="tableCol" style="display:inline-block;width:100%;" v-if="data.type == 1">{{ data.statName }}</span>
      </el-tooltip>
    </el-col>
    <el-col :span="1" class="tableCol">
       <span v-if="data.isms == 0">否</span>
       <span v-else>是</span> 
    </el-col>
      <el-col :span="2" class="tableCol">
       <span v-if="data.startTime == null">--</span>
       <span v-else>{{ data.startTime.substr(0,10) }}</span>
    </el-col>
    <el-col :span="2" class="tableCol" >
       <span v-if="data.endTime == null">--</span>
       <span v-else>{{ data.endTime.substr(0,10) }}</span>
    </el-col>
    <el-col :span="1" class="tableCol" >
       <span v-if="data.durationTime == null">--</span>
       <span v-else>{{ data.durationTime }}d</span>
    </el-col>
    <el-col :span="1" class="tableCol" >
       <span v-if="!data.unitName">--</span>
       <span v-else>{{ data.unitName }}</span>
    </el-col>
    <el-col :span="1" class="tableCol">
       <span v-if="data.budgetTotal == null">--</span>
       <span v-else>{{ data.budgetTotal }}</span>
    </el-col>
    <el-col :span="1" class="tableCol">
       <span v-if="data.finishBudget == null">--</span>
       <span v-else>{{ data.finishBudget }}</span>
    </el-col>
    <el-col :span="2" class="tableCol">
       <span v-if="data.outputTotal == null">--</span>
       <span v-else>{{ data.outputTotal }}</span>
    </el-col>
    <el-col :span="2" class="tableCol">
       <span v-if="data.finishOutput == null">--</span>
       <span v-else>{{ data.finishOutput }}</span>
    </el-col>
    <el-col :span="3" class="tableCol" style="text-align:left;box-sizing:border-box;padding-left:20px;">
       <!-- <span v-if="data.finishOutputRate == null">--</span>
       <span v-else>{{ data.finishOutputRate }}</span> -->
      
        <el-progress v-if="!data.finishOutputRate" :stroke-width="13"  :percentage="0"></el-progress>
        <el-progress v-else :stroke-width="13" :percentage="$common.fomatPrecent(Number(data.finishOutputRate))"></el-progress>
        
    </el-col>
    <el-col :span="4"  class="tableCol" style="margin-left:-10px;">
     <span>
          <!-- <el-button v-if="hasPerm('110404')" size="mini" type="primary"  @click="addChild(data,node)">添加计划</el-button>
          <el-button v-if="hasPerm('110204')" size="mini" type="primary" @click="editClick(data)">编辑</el-button> -->
          <el-button v-if="data.type == 0 && hasPerm('110402')" size="mini" type="primary"  @click="addChild(data,node)">添加计划</el-button>
          <el-button class="levelbtn" v-if="data.type == 1 && hasPerm('110404')" size="mini" type="primary" @click="editClick(data)" style="margin-left:2px;">编辑</el-button>
          <el-button class="levelbtn" v-if="data.type == 1 && hasPerm('110404') && data.isForbid == 0" size="mini" type="warning" @click="forbidClick(data)" style="margin-left:2px;">禁用</el-button>
          <el-button class="levelbtn" v-if="data.type == 1 && hasPerm('110404') && data.isForbid == 1" size="mini" type="success" @click="openClick(data)" style="margin-left:2px;">启用</el-button>
          <el-button class="levelbtn" v-if="data.type == 1 && hasPerm('110404')" size="mini" type="danger" @click="deleteClick(data)" style="margin-left:2px;">删除</el-button>
        </span>
    </el-col>
  </el-row>       
  </span>
   </el-tree>
   <!-- </div> -->
   <!-- <el-pagination background v-if="total>0"
      class="pageStyle"
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="pagesize"
      :current-page="currentPage"
			:total="total"
			@current-change="handleCurrentChange"
			@size-change="handleSizeChange"
			>
   </el-pagination> -->
  
   <!--类别管理-->
    <el-dialog title="新增计划任务" :center="true" :visible.sync="dialog.addtask" width="800px" @open="$nextTick(()=>$refs['addtask'].update(nowdata))"  @close="$refs['addtask'].reset()">
      <addtask ref="addtask" @close="dialog.addtask = false" @refreshData="refreshList"></addtask>
    </el-dialog>
     <el-dialog title="修改计划任务" :center="true" :visible.sync="dialog.updatetask" width="800px" @open="$nextTick(()=>$refs['updatetask'].update(nowdata))"  @close="$refs['updatetask'].reset()">
      <updatetask ref="updatetask" @close="dialog.updatetask = false" @refreshData="refreshList"></updatetask>
    </el-dialog>
     <!--添加/修改分部分项-->
    <!-- <el-dialog :title="subObject.id?'修改分部分项':'新增分部分项'" :center="true" :visible.sync="dialog.addSubsection" width="800px"  @open="$nextTick(()=>$refs['addSubsection'].update(subObject))" @close="$refs['addSubsection'].reset()">
      <addSubsection ref="addSubsection" @refreshData="refreshList" @close="dialog.addSubsection = false" ></addSubsection>
    </el-dialog> -->
     <!--新增子项-->
    <!-- <el-dialog title="新增子项" :center="true" :visible.sync="dialog.addSubChid" width="800px" @open="$nextTick(()=>$refs['addSubChid'].update(subObject))" @close="$refs['addSubChid'].reset()">
      <addSubChid ref="addSubChid" @refreshData="refreshList" @close="dialog.addSubChid = false" ></addSubChid>
    </el-dialog> -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import addtask from "./addtask.vue";
import updatetask from "./updatetask.vue";
import addSubChid from "../bitem/addSubChid.vue";
import addSubsection from "../bitem/addSubsection.vue";
import {getProjectPlan,listRegionTree,openTaskPlan,forbidTaskPlan,deleteTaskPlan,getTotalPlan, getSubsectionPage, deleteSubsectionById,listProjectType,exportSubsectionByIds,baseinUrl } from "../api/system_interface.js";
export default {
  name: "planProject",
  components: {
    addtask,
    updatetask,
    addSubsection,
    addSubChid
  },
  data() {
    return {
      projectId: [],
      regionId: [],
      multipleSelection: [],
      tableData: [],
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
      projectTypeList:[],
      projectType: null,
      currentPage: 1,
      pagesize: 10,
      subName:null,
      total: 0,
      dialog: {
        addtask: false,
        updatetask:false,
      },
      subObject: {},
      regionIds:'',
      projectIds:'',
      nowdata:'',
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
    //项目变化的时候
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
             this.roginTreeList = response.body;
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
    addChild(data,node){
      
      this.nowdata = JSON.parse(JSON.stringify(data));
      this.nowdata['optype'] = 'add';//regionId
      this.nowdata['regionFullName'] = this.nowdata['regionName'];
      this.nowdata['regionId'] = this.nowdata['id'];
      this.nowdata['startTime'] = '';
      this.nowdata['endTime'] = '';
      this.nowdata['outputTotal'] = '';
      this.dialog.addtask = true;
    },
    editClick(data){
      
      this.nowdata = JSON.parse(JSON.stringify(data));
      this.nowdata['optype'] = 'update';
      this.dialog.updatetask = true;
      //this.dialog.addtask = true;
    },
    //删除
    deleteClick(data){
      this.$confirm('确认删除此数据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.godeleteClick(data);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //删除
    godeleteClick(data){
         deleteTaskPlan(data.id)
        .then(response => {
          if (response.code == "200") {
                this.$message.success('删除成功！');
                this.refreshList();
                
              } else {
                this.$message.error(response.msg);
              }
        })
        .catch(error => {
          console.log(error);
      })  
    },

    //禁用
    forbidClick(data){
        forbidTaskPlan(data.id)
        .then(response => {
          if (response.code == "200") {
                this.$message.success('禁用成功！');
                this.refreshList();
                
              } else {
                this.$message.error(response.msg);
              }
        })
        .catch(error => {
          console.log(error);
      })  
    },
    //启用
     openClick(data){
        openTaskPlan(data.id)
        .then(response => {
          if (response.code == "200") {
                this.$message.success('启用成功！');
                this.refreshList();
                
              } else {
                this.$message.error(response.msg);
              }
        })
        .catch(error => {
          console.log(error);
      })  
    },

     //重置
    resetForm(){
      this.regionId = [];
      this.projectId = [];
    },
    

    


    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.refreshList();
    },

    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

    //查询实施项目计划 
    refreshList() {
      let _this = this;
        getProjectPlan({
        projectId: this.projectIds,
        regionId:this.regionIds
      })
        .then(response => {
          if (response.code == "200") {
            
                if(response.body){
                  //this.tableData = response.body;
                  if(response.body.length>0){
                    this.tableData = this.hanprodata(response.body);
                    
                  }else{
                    this.tableData = [];
                  }
                }
                else{
                  this.tableData = [];
                }
                
              } else {
                this.$message.error(response.msg);
              }
        })
        .catch(error => {
          console.log(error);
      })  
    },

    //查询工程类别
    refreshLists(){
       return new Promise((resolve, reject) => {
        listProjectType({})
        .then(response => {
          this.projectTypeList = response.body;
          resolve()
        })
        .catch(error => {
          console.log(error);
          reject();
        });
      })
    },

    //等待查询工程类别完成
    async awaitList(){
      await this.refreshLists();
      if(this.projectTypeList.length >= 1){
        this.projectType = this.projectTypeList[0].id;
      }
      else{
        this.projectType = null;
      }     
      this.refreshList();
    },

    //搜索框
    resarchBitem(){
      this.refreshList();
    },
    //处理数据
    hanprodata(data){
      let length = data.length;
      let list = JSON.parse(JSON.stringify(data));
      for(let i=0;i<length;i++){
        if(list[i].child){
          list[i].child = this.hanprodata(list[i].child);
          if(list[i].visualStatVOS){
            let lengths = list[i].visualStatVOS.length;
            for(let p=lengths;p--;){
              list[i].visualStatVOS[p]['type'] = '1';
              list[i].child.push(list[i].visualStatVOS[p]);
            }
          }
        }else{
          if(list[i].visualStatVOS){
            let lengthc = list[i].visualStatVOS.length;
            for(let j=lengthc;j--;){
              list[i].visualStatVOS[j]['type'] = '1';//任务
            }
            list[i]['child'] = JSON.parse(JSON.stringify(list[i].visualStatVOS));
            delete list[i].visualStatVOS;
          }
        }
        list[i]['type'] = 0;//项目
      }
      return list;
    },
  },
  created() {
    this.refreshList();
  }
};
</script>
<style lang="scss">
@import "planTotal.scss";

.tableCol{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.tableHead{
  color:#909399;
  font-weight: 600;
}
// .levelbtn{
//   padding:7px 6px;
// }
</style>
