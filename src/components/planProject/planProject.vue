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
  <el-row class="planProgress_row" style="margin-bottom:20px;">
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
     <el-cascader change-on-select :show-all-levels="false" @change="projectchange" :options="listChildOrgInfoList" @blur="clearmodel()" v-model="projectId" :props="defaultProps1" size="small" placeholder="请选择项目" clearable></el-cascader>
     <el-cascader change-on-select :show-all-levels="false" :options="roginTreeList" @blur="clearmodel()" v-model="regionId" :props="defaultProp" size="small" placeholder="请选择施工区段" clearable></el-cascader>
    <el-button size="mini" type="success" @click="resarchInfo" style="margin-left:30px;" plain>搜索</el-button>
       <el-button size="mini"  @click="resetForm">重置</el-button>
   </el-col>
   
  </el-row>
  <!-- <div style="height:auto;width:100%;overflow:auto;"> -->

  
    <div style="height:45px;width:100%;border:1px solid #ebeef5;border-bottom:none;line-height:45px;">
    <span style="margin:0 25px;">总计划产值：{{handRate(topTotal)}}万元</span>
    <span style="margin:0 25px;">总完成产值：{{handRate(topfinish)}}万元</span>
    <span style="margin:0 25px;">完成比例：<el-progress style="display:inline-block;width:200px;"  :stroke-width="18"  :percentage="changeRatefn()"></el-progress></span>
    
    <!-- topTotal:0,
      topfinish:0,
      topfinishrate:0, -->
  </div>
   <div style="width:100%;overflow-y:hidden;" :style="{height:pageSet?'calc(100% - 183px)':'calc(100% - 133px)'}">
    <el-table  height="100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column width="70" show-overflow-tooltip
        label="序号"  align="center">
        <template slot-scope="scope">
          
            <span >{{scope.row.nodeSeq.replace('.1','')}}</span>
         
        </template>
      </el-table-column>
      <el-table-column 
        label="项目名称"  align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.projectName" placement="top">
            <span v-if="scope.row.projectName == null">--</span>
            <span v-else>{{ scope.row.projectName }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column  width="150"
        label="名称"  show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="treetablecon" >
            
              <span class="spacespan" v-for="list in scope.row.nodeLevel" :key="list" ></span>
              <span class="spacespan"  v-if="!scope.row.child"></span>
              <i class="el-icon-caret-bottom  nodeClickIcon" :class="{ 'el-icon-caret-right' : !scope.row.nodeExpand }" v-if="scope.row.child" @click="nodeclick($event,scope.$index,scope.row,tableData)"></i>
            
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
        label="开始时间" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.startTime == null">--</span>
          <span v-else>{{ scope.row.startTime.substr(0,10) }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="结束时间" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.endTime == null">--</span>
          <span v-else>{{ scope.row.endTime.substr(0,10) }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="工期" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.durationTime == null">--</span>
          <span v-else>{{ scope.row.durationTime }}d</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="形象单位" align="center" >
        <template slot-scope="scope">
          <span v-if="!scope.row.unitName">--</span>
       <span v-else>{{ scope.row.unitName }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="总工程量" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.budgetTotal == null">--</span>
          <span v-else>{{ scope.row.budgetTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="累计完成" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.finishBudget == null">--</span>
          <span v-else>{{ scope.row.finishBudget }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="总产值（万元）" align="center" >
        <template slot-scope="scope">
           <span v-if="scope.row.type == 0">{{scope.row.profilePlanOutput || '0'}}</span>
          <span v-else>{{ scope.row.outputTotal }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="累计完成产值（万元）" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.type == 0">{{scope.row.finishOutput || '0'}}</span>
          <span v-else>{{ scope.row.finishOutput }}</span>
        </template>
      </el-table-column>
      
      <el-table-column 
        label="完成比例"  align="left">
        <template slot-scope="scope">
          <el-progress v-if="!scope.row.finishOutputRate" :stroke-width="13"  :percentage="0"></el-progress>
          <el-progress v-else :stroke-width="13" :percentage="$common.fomatPrecent(Number(scope.row.finishOutputRate))"></el-progress>
        </template>
      </el-table-column>
       
      <el-table-column width="250"
        label="操作"  align="center">
        <template slot-scope="scope">
         <el-button v-if="scope.row.type == 0 && hasPerm('110402')" size="mini" type="primary"  @click="addChild(scope.row)">添加计划</el-button>
          <el-button class="levelbtn" v-if="scope.row.type == 1 && hasPerm('110404')" size="mini" type="primary" @click="editClick(scope.row)" style="margin-left:2px;">编辑</el-button>
          <el-button class="levelbtn" v-if="scope.row.type == 1 && hasPerm('110404') && scope.row.isForbid == 0" size="mini" type="warning" @click="forbidClick(scope.row)" style="margin-left:2px;">禁用</el-button>
          <el-button class="levelbtn" v-if="scope.row.type == 1 && hasPerm('110404') && scope.row.isForbid == 1" size="mini" type="success" @click="openClick(scope.row)" style="margin-left:2px;">启用</el-button>
          <el-button class="levelbtn" v-if="scope.row.type == 1 && hasPerm('110404')" size="mini" type="danger" @click="deleteClick(scope.row)" style="margin-left:2px;">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
   
    
  </div>
  <el-col style="text-align:right;" v-if="pageSet">
      <el-pagination style="margin:18px 0 0px;"
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size="pagesize"
        :total="total">
      </el-pagination>
    </el-col>



  
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
import {nodeclick,expandNode,closeNode,calculateLength,addchildNode,initHandNode,allExpand,goAllexpand} from '../treefile/treeController.js'
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
      timeArr:'',
      img:require('../../assets/wbs.png'),
      loading:true,
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
      topTotal:0,
      topfinish:0,
      allstorage:[],
      pageSet:false,//控制分页
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
    handRate(val){
      if(val == 0){
        return 0;
      }else{
        return parseFloat(val).toFixed(2);
      }
    },
     changeRatefn(){
      let number = parseFloat(this.topfinish/this.topTotal*100 || 0).toFixed(2);
      if(number == 0){
        return 0;
      }else{
        return number;
      }
     
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
    addChild(data){
      
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
      this.timeArr = '';
    },
    

    


    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.tableData = this.allstorage.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
      //goAllexpand(this.treeTableDate);
    },

    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

    //查询实施项目计划 
    refreshList() {
      this.topTotal =0;
      this.topfinish=0;
      let _this = this;
        getProjectPlan({
        projectId: this.projectIds,
        regionId:this.regionIds,
        endTimeStart:this.timeArr&&this.timeArr['length']?this.timeArr[0]:'',
        endTimeEnd:this.timeArr&&this.timeArr['length']?this.timeArr[1]:'',
      })
        .then(response => {
          if (response.code == "200") {
            
                if(response.body){
                  //this.tableData = response.body;
                  if(response.body.length>0){
                    this.hanpagepart(response.body);
                    // this.tableData = this.hanprodata(response.body);
                    // this.tableData = initHandNode(this.tableData,0);
                    // goAllexpand(this.tableData);//全部展开的话这样做
                  }else{
                    this.tableData = [];
                  }
                }
                else{
                  this.tableData = [];
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
    //切换分页
    hanpagepart(data){
      console.log('测试数据');
      if(data.length>this.pagesize){
        this.pageSet = true;
        // this.total = Math.ceil(data.length/20);
      }else{
        this.pageSet = false;
        // /this.total = 1;
      }
      this.total = data.length;
      this.allstorage = JSON.parse(JSON.stringify(data));
      this.allstorage = this.hanprodata(this.allstorage);
      this.allstorage = initHandNode(this.allstorage,0);
      this.tableData = this.allstorage.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
      //goAllexpand(this.treeTableDate);//全部展开的话这样做
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
        if(list[i]['level'] == 1){
          this.topTotal += isNaN(parseFloat(list[i]['profilePlanOutput']))?0:parseFloat(list[i]['profilePlanOutput']);
          this.topfinish += isNaN(parseFloat(list[i]['finishOutput']))?0:parseFloat(list[i]['finishOutput']);
        }
        
      }
      return list;
    },
  },
  created() {
    this.refreshList();
    this.nodeclick = nodeclick;
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
