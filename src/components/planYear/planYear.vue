<template>
<!-- 分部分项库 -->
<div class="bitem">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '' }">生产计划管理 </el-breadcrumb-item>
    <el-breadcrumb-item>年进度计划</el-breadcrumb-item>
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
    <el-date-picker
      v-model="nowyear"
      value-format="yyyy"
      type="year"
      size="small"
      placeholder="选择年">
    </el-date-picker>
     <el-cascader change-on-select :show-all-levels="false" @change="projectchange" :options="listChildOrgInfoList" @blur="clearmodel()" v-model="projectId" :props="defaultProps1" size="small" placeholder="请选择项目" clearable></el-cascader>
     <el-cascader change-on-select :show-all-levels="false" :options="roginTreeList" @blur="clearmodel()" v-model="regionId" :props="defaultProp" size="small" placeholder="请选择施工区段" clearable></el-cascader>

     <el-button size="mini" type="success" @click="resarchInfo" style="margin-left:30px;" plain>搜索</el-button>
     <el-button size="mini"  @click="resetForm">重置</el-button>
   </el-col>
   
  </el-row>
  
 
   
  <div style="height:45px;width:100%;border:1px solid #ebeef5;border-bottom:none;line-height:45px;">
    <span style="margin:0 25px;">年计划产值：{{handRate(topTotal)}}万元</span>
    <span style="margin:0 25px;">年完成产值：{{handRate(topfinish)}}万元</span>
    <span style="margin:0 25px;">完成比例：<el-progress style="display:inline-block;width:200px;"  :stroke-width="18"  :percentage="changeRatefn()"></el-progress></span>
    
    <!-- topTotal:0,
      topfinish:0,
      topfinishrate:0, -->
  </div>
  <div style="width:100%;height:calc(100% - 133px);overflow-y:auto;" >
   <div style="height:auto;overflow-y:auto;">
    <el-table 
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
      <el-table-column  width="300"
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
        label="总产值（万元）" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.profilePlanOutput == null">--</span>
          <span v-else>{{ scope.row.profilePlanOutput }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="完成产值（万元）"  align="center">
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
        label="年计划产值(万元)"  align="center">
        <template slot-scope="scope">
          <span class="spci">
         <!-- {{ data.yearPlanBudget}} -->
         <el-input  size="mini" v-model="scope.row.yearPlanOutput" v-if="scope.row.update == 0" disabled  class="spacialinput"/>
         <el-input  size="mini" v-model="focusvalue" v-if="scope.row.update == 1"  />
       </span>
        </template>
      </el-table-column>
      <el-table-column 
        label="年完成产值"  align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.yearFinishOutput == null">--</span>
          <span v-else>{{ scope.row.yearFinishOutput}}</span>
        </template>
      </el-table-column>
      <el-table-column 
        label="年完成比例"  align="left">
        <template slot-scope="scope">
         <el-progress v-if="!scope.row.yearFinishOutputRate" :stroke-width="13"  :percentage="0"></el-progress>
        <el-progress v-else :stroke-width="13" :percentage="$common.fomatPrecent(Number(scope.row.yearFinishOutputRate))"></el-progress>
        </template>
      </el-table-column>
      <el-table-column width="150"
        label="操作"  align="center">
        <template slot-scope="scope">
         <el-button v-if="scope.row.update == 0 && hasPerm('110504')" size="mini" type="primary" @click="editClick(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.update == 1" size="mini" type="primary" @click="ensureeditClick(scope.row)">确认</el-button>
          <el-button v-if="scope.row.update == 1" size="mini" type="info" @click="cancleeditClick(scope.row)">取消</el-button>
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
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
//import addtask from "./addtask.vue";
import {nodeclick,expandNode,closeNode,calculateLength,addchildNode,initHandNode,allExpand,goAllexpand} from '../treefile/treeController.js'
import addSubChid from "../bitem/addSubChid.vue";
import addSubsection from "../bitem/addSubsection.vue";
import {updateYearPlan,listRegionTree,addYearPlan,getYearPlan, getSubsectionPage, deleteSubsectionById,listProjectType,exportSubsectionByIds,baseinUrl } from "../api/system_interface.js";
export default {
  name: "planYear",
  components: {
    //addtask,
    addSubsection,
    addSubChid
  },
  data() {
    return {
      img:require('../../assets/wbs.png'),
      projectId: [],
      regionId: [],
      multipleSelection: [],
      tableData: [],
      loading:true,
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
      },
      subObject: {},
      regionIds:'',
      projectIds:'',
      nowdata:'',
      nowyear:new Date().getFullYear()+'',
      focusData:{},
      focusvalue:'',
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
    //查询区域列表

    addChild(data,node){
      //this.nowdata = data;
      this.dialog.addtask = true;
    },
     //重置
    resetForm(){
      this.regionId = [];
      this.projectId = [];
      this.nowyear = '';
    },
    //修改年计划量
    editClick(data){
      if(!this.focusData['yearPlanOutput']){
        this.focusData['yearPlanOutput'] = 0;
      }
      
      if(this.focusData['id'] != data.id && this.focusData['id']){
        this.focusData.update = 0;
      }
      this.focusData = data;
      data.update = 1;
      this.focusvalue = data.yearPlanOutput;
    },
    async ensureeditClick(data){
      if(data.yearPlanOutput == this.focusvalue){
        data.update = 0;
        return ;
      }
      if(isNaN(Number(this.focusvalue))){
        this.$message.error('数据非法');
        return ;
      }
      if(data['yearPlanOutput'] == 0){
        await this.addnowdata(data);
      }else{
        await this.updatenowdata(data);
      }
      
      //this.focusvalue = data.yearPlanBudget
      //data.update = 0;
    },
    //取消
    cancleeditClick(data){
      data.update = 0;
      this.focusvalue = data.yearPlanOutput
    },
    //修改数据
    async updatenowdata(data){
        updateYearPlan({
          "id":data.yearPlanId,
          "planOutput": this.focusvalue,
          //"regionId": data.id,
          "yearNum": this.nowyear
        })
          .then(response => {
            if (response.code == "200") {
              
                  data.update = 0;
                  data.yearPlanOutput = this.focusvalue;
                  //data.planOutput = this.focusvalue;
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
    //增加数据
    async addnowdata(data){
        addYearPlan({
         "planOutput": this.focusvalue,
          "regionId": data.id,
          "yearNum": this.nowyear
        })
          .then(response => {
            if (response.code == "200") {
                  data.update = 0;
                  data.yearPlanOutput = this.focusvalue;
                  data['yearPlanId'] = response.body;
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


   
     handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.tableData = this.allstorage.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize);
      //goAllexpand(this.treeTableDate);
    },

    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

    //查询总计划 
    refreshList() {
       this.topTotal =0;
      this.topfinish=0;
      let _this = this;
        getYearPlan({
        projectId: this.projectIds,
        regionId:this.regionIds,
        yearNum:this.nowyear,
      })
        .then(response => {
          if (response.code == "200") {
            
                
                if(response.body){
                  //this.tableData = response.body;
                  if(response.body.length>0){
                    // this.tableData = this.hanprodata(response.body);
                    // this.tableData = initHandNode(this.tableData,0);
                    // goAllexpand(this.tableData);//全部展开的话这样做
                    this.hanpagepart(response.body);
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
      if(data.length>20){
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
          if(list[i].visualYearPlans){
            let lengths = list[i].visualYearPlans.length;
            for(let p=lengths;p--;){
              list[i].visualYearPlans[p]['type'] = '1';
              list[i].visualYearPlans[p]['update'] = '0';
              list[i].child.push(list[i].visualYearPlans[p]);
            }
          }
        }else{
          if(list[i].visualYearPlans){
            let lengthc = list[i].visualYearPlans.length;
            for(let j=lengthc;j--;){
              list[i].visualYearPlans[j]['type'] = '1';//任务
              list[i].visualYearPlans[j]['update'] = '0';
            }
            list[i]['child'] = JSON.parse(JSON.stringify(list[i].visualYearPlans));
            delete list[i].visualYearPlans;
          }
        }
        list[i]['type'] = 0;//项目
        list[i]['update'] = '0';
        if(list[i]['level'] == 1){
          this.topTotal += isNaN(parseFloat(list[i]['yearPlanOutput']))?0:parseFloat(list[i]['yearPlanOutput']);
        this.topfinish += isNaN(parseFloat(list[i]['yearFinishOutput']))?0:parseFloat(list[i]['yearFinishOutput']);
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
@import "planYear.scss";

.tableCol{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  .el-input__inner{
    padding:0 5px !important;
  }
}
.tableHead{
  color:#909399;
  font-weight: 600;
}
.spci{
  .el-input__inner{
    text-align: center;
  }
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
.spacialinput > .el-input__inner[disabled]{
  color:#606266 !important;
  border-color:transparent !important;
  background-color: transparent !important;
}
</style>
