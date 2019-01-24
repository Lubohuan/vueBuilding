<template>
<!-- 分部分项库 -->
<div class="bitem">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '' }">生产计划管理 </el-breadcrumb-item>
    <el-breadcrumb-item>总进度计划</el-breadcrumb-item>
    </el-breadcrumb>
   
  <el-row class="planProgress_row" style="margin-bottom:20px;">
   <el-col :span="18">
     <el-cascader change-on-select :show-all-levels="false" @change="projectchange" :options="listChildOrgInfoList" @blur="clearmodel()" v-model="projectId" :props="defaultProps1" size="small" placeholder="请选择项目" clearable></el-cascader>
     <el-cascader change-on-select :show-all-levels="false" :options="roginTreeList" @blur="clearmodel()" v-model="regionId" :props="defaultProp" size="small" placeholder="请选择施工区段" clearable></el-cascader>
   </el-col>
   <el-col :span="6" class="planProgress_btn1" style="text-align:right;">
       <el-button size="mini" type="success" @click="resarchInfo">搜索</el-button>
       <el-button size="mini"  @click="resetForm">重置</el-button>
   </el-col>
  </el-row>
  

  
 <!-- <el-row class="tableHead" style="">
    <el-col :span="3" class="tableCol" style="margin-left:35px;text-align:left;">
      <span>项目名称</span>
    </el-col>
    <el-col :span="3" class="tableCol">
      <span>名称</span>
    </el-col>
      <el-col :span="1" class="tableCol">
      <span>里程碑</span>
    </el-col>
      <el-col :span="2" class="tableCol" style="margin-left:-10px;">
      <span>开始时间</span>
    </el-col>
      <el-col :span="2" class="tableCol" >
      <span>结束时间</span>
    </el-col>
     <el-col :span="2" class="tableCol" style="margin-left:-10px;">
      <span>工期</span>
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
  </el-row> -->
  <!-- <el-tree   :data="tableData" ref="tree" node-key="id" :default-expand-all="true" :expand-on-click-node="false" :props="defaultProps" style="width:100%;box-sizing: border-box;" :indent="5" >
    <span class="custom-tree-node" slot-scope="{ node, data }" :style="'margin-left:'+ node.level*(-8.8) + 'px'">
    <el-row style="width:100%;" :style="'margin-left:'+ (30 + node.level*2.1) + 'px'">
    <el-col :span="3" class="tableCol" style="text-align:left;">
      <img src="../../assets/wbs.png" style="height:20px;" v-if="data.type == 0" />
      <el-tooltip class="item" effect="dark" :content="data.projectName" placement="top">
        <span v-if="data.projectName == null">--</span>
        <span v-else>
          
          {{ data.projectName }}
        </span>
      </el-tooltip>
      
    </el-col>
    <el-col :span="3" class="tableCol">
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
    <el-col :span="2" class="tableCol" >
       <span v-if="data.durationTime == null">--</span>
       <span v-else>{{ data.durationTime }}d</span>
    </el-col>
    
    <el-col :span="2" class="tableCol">
       <span v-if="data.profilePlanOutput == null">--</span>
       <span v-else>{{ data.profilePlanOutput }}</span>
    </el-col>
    <el-col :span="2" class="tableCol">
       <span v-if="data.profileFinishOutput == null">--</span>
       <span v-else>{{ data.profileFinishOutput }}</span>
    </el-col>
    <el-col :span="3" class="tableCol" style="text-align:left;box-sizing:border-box;padding-left:20px;">
        <el-progress v-if="!data.profileFinishOutputRate" :stroke-width="13"  :percentage="0"></el-progress>
        <el-progress v-else :stroke-width="13" :percentage="$common.fomatPrecent(Number(data.profileFinishOutputRate))"></el-progress>
    </el-col>
    <el-col :span="4"  class="tableCol" style="margin-left:-10px;">
     <span>
          <el-button v-if="data.type == 0 && hasPerm('110402')" size="mini" type="primary"  @click="addChild(data,node)">编辑</el-button>
    </span>
    </el-col>
  </el-row>       
  </span>
   </el-tree> -->
   <div style="height:calc(100% - 87px);width:100%;overflow-y:hidden;">
   <el-table height="100%" 
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data="treeTableDate"
    border
    style="width: 100%">
    <el-table-column 
        label="项目名称"  align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.projectName" placement="top">
            <span v-if="scope.row.projectName == null">--</span>
            <span v-else>{{ scope.row.projectName }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column  width="300"
        label="名称"  show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="treetablecon" >
            
              <span class="spacespan" v-for="list in scope.row.nodeLevel" :key="list" ></span>
              <span class="spacespan"  v-if="!scope.row.child"></span>
              <i class="el-icon-caret-bottom  nodeClickIcon" :class="{ 'el-icon-caret-right' : !scope.row.nodeExpand }" v-if="scope.row.child" @click="nodeclick($event,scope.$index,scope.row)"></i>
            
              <!-- <span class="text" v-if="setData.textTrigger"  @click="nodeclick($event,scope.$index,scope.row)">{{scope.row[item.name]}}</span>
              <span class="text" v-else  >{{scope.row[item.name]}}</span> -->
            <!-- <el-tooltip class="item" effect="dark" :content="scope.row.type==0?scope.row.regionName:scope.row.statName" placement="top"> -->
              <span   v-if="scope.row.type == 0"><img :src="img" style="height:20px;margin-right:5px;" />{{ scope.row.regionName }}</span>
              <span  v-if="scope.row.type == 1">{{ scope.row.statName }}</span>
            <!-- </el-tooltip> -->
        </div>
        </template>
      </el-table-column>
      <el-table-column 
        label="里程碑" align="center" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.isms == 0">否</span>
          <span v-else>是</span> 
        </template>
      </el-table-column>
      <el-table-column 
        label="开始时间" align="center" width="100">
        <template slot-scope="scope">
         <span v-if="scope.row.startTime == null">--</span>
         <span v-else>{{ scope.row.startTime.substr(0,10) }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="结束时间" align="center" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.startTime == null">--</span>
          <span v-else>{{ scope.row.startTime.substr(0,10) }}</span> 
        </template>
      </el-table-column>
      <el-table-column 
        label="工期" align="center" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.durationTime == null">--</span>
          <span v-else>{{ scope.row.durationTime }}d</span> 
        </template>
      </el-table-column>
      <el-table-column 
        label="总产值（万元）" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.profilePlanOutput == null">--</span>
          <span v-else>{{ scope.row.profilePlanOutput }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="累计完成产值（万元）"  align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.profileFinishOutput == null">--</span>
          <span v-else>{{ scope.row.profileFinishOutput }}</span>
        </template>
      </el-table-column>

    <el-table-column 
        label="完成比例"  align="center">
        <template slot-scope="scope">
          <el-progress v-if="!scope.row.profileFinishOutputRate" :stroke-width="13"  :percentage="0"></el-progress>
          <el-progress v-else :stroke-width="13" :percentage="$common.fomatPrecent(Number(scope.row.profileFinishOutputRate))"></el-progress>
        </template>
      </el-table-column>
    <el-table-column 
        label="操作"  align="center">
        <template slot-scope="scope">
         <el-button v-if="scope.row.type == 0 && hasPerm('110402')" size="mini" type="primary"  @click="addChild(scope.row,'')">编辑</el-button>
        </template>
      </el-table-column>
      
    </el-table>
  </div>
   <!--类别管理-->
    <el-dialog title="修改计划任务" :center="true" :visible.sync="dialog.updatetotal" width="800px" @open="$nextTick(()=>$refs['updatetotal'].update(nowdata))"  @close="$refs['updatetotal'].reset()">
      <updatetotal ref="updatetotal" @close="dialog.updatetotal = false" @refreshData="refreshList"></updatetotal>
    </el-dialog>
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import updatetotal from "./updatetotal.vue";
import addSubChid from "../bitem/addSubChid.vue";
import addSubsection from "../bitem/addSubsection.vue";
import treeTableLan from '../treeTable/treeTableL.vue'
import {openTaskPlan,listRegionTree,forbidTaskPlan,deleteTaskPlan,getTotalPlan, getSubsectionPage, deleteSubsectionById,listProjectType,exportSubsectionByIds,baseinUrl } from "../api/system_interface.js";
export default {
  name: "planTotal",
  components: {
    updatetotal,
    addSubsection,
    addSubChid,
    treeTableLan
  },
  data() {
    return {
      img:require('../../assets/wbs.png'),
      loading:true,
      projectId: [],
      regionId: [],
      multipleSelection: [],
      treeTableDate: [],
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
        updatetotal: false,
      },
      subObject: {},
      regionIds:'',
      projectIds:'',
      nowdata:'',
      roginTreeList:[],
      setData:{
        showicon:'id',//配置伸缩图标展示列 ，默认cloumns的第一个元素的name
        textTrigger:true,//文字点击触发，只在配置列生效,默认是false
        allDefaultExpand:false,//是否全部展开,默认是false
      },
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
      this.dialog.updatetotal = true;
      
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

    //查询总计划 
    refreshList() {
      let _this = this;
        getTotalPlan({
        projectId: this.projectIds,
        regionId:this.regionIds
      })
        .then(response => {
          if (response.code == "200") {
            
                if(response.body){
                  //this.tableData = response.body;
                  if(response.body.length>0){
                    this.treeTableDate = this.hanprodata(response.body);
                    this.treeTableDate = this.initHandNode(this.treeTableDate,0);
                    this.goAllexpand();//全部展开的话这样做
                  }else{
                    this.treeTableDate = [];
                  }
                }
                else{
                  this.treeTableDate = [];
                }
                this.loading = false;
              } else {
                this.$message.error(response.msg);
                this.loading = false;
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
    //此处以下是树形的
    //nodeclick
    nodeclick(el,index,data){
      if(data.nodeExpand){
        this.closeNode(index,data);
      }else{
        this.expandNode(index,data);
      }
    },
    //展开节点
    expandNode(index,data){
      data.nodeExpand = true;
      let arr = this.addchildNode([],data.child);
      this.treeTableDate.splice(index+1,0,...arr);
    },
    //收缩节点
    closeNode(index,data){
      data.nodeExpand = false;
      let length = this.calculateLength(0,data.child);
      this.treeTableDate.splice(index+1,length);
    },
    //计算展开的子节点数量
    calculateLength(number,data){
      let length = data.length;
      for(let i=length;i--;){
        if(data[i].child){
          if(data[i].nodeExpand){
            number += this.calculateLength(0,data[i].child);
          }
          number += 1;
        }else{
          number += 1;
        }
      }
      return number;
    },
    //增加子节点
    addchildNode(arr,data){
      let length = data.length;
      for(let i=0;i<length;i++){
        if(data[i].child){
          arr.push(data[i]);
          if(data[i].nodeExpand){
            arr.push(...this.addchildNode([],data[i].child));
          }
        }else{
          arr.push(data[i]);
        }
      }
      return arr;
    },
    //增加nodelevel层级
    initHandNode(data,index){
      let length = data.length;
      for(let i=length;i--;){
        data[i]['nodeLevel'] = index;
        if(data[i].child){
          data[i].child = this.initHandNode(data[i].child,index+1);
        }
      }
      return data;
    },
    //全部展开
    allExpand(arr,data){
      let length = data.length;
      for(let i=0;i<length;i++){
        if(data[i].child){
          arr.push(data[i]);
          data[i]['nodeExpand'] = true;
          arr.push(...this.allExpand([],data[i].child));
          
        }else{
          arr.push(data[i]);
        }
      }
      return arr;
    },
    //触发全部展开
    goAllexpand(){
      let length = this.treeTableDate.length;
        let data = JSON.parse(JSON.stringify(this.treeTableDate));
        for(let i=0;i<this.treeTableDate.length;i++){
            if(this.treeTableDate[i].child){
                this.treeTableDate[i]['nodeExpand'] = true;
                let arr1 = this.allExpand([],this.treeTableDate[i].child);
                this.treeTableDate.splice(i+1,0,...arr1);
                i = i+arr1.length;
            }
        }
    }
  },
  created() {
    
    this.refreshList();
  },
  mounted(){
    //this.treeTableDate = this.initHandNode(this.treeTableDate,0);
    //this.goAllexpand();//全部展开的话这样做
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
.treetablecon{
  height:100%;
  width:100%;
  vertical-align: middle;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.spacespan{
  width:18px;
  display: inline-block;
  height:18px;
}
.nodeClickIcon{
  font-size: 18px;
  vertical-align: middle;
  cursor: pointer;
}
.text{
    cursor:pointer;
}
</style>
