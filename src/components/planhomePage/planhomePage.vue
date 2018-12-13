<template>
<!--项目进度首页-->
<div class="planhomePage">
 <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>形象进度管理</el-breadcrumb-item>
    <el-breadcrumb-item>形象进度任务管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row class="rowOne">
      <el-col :span="6" class="elStyle" style="padding:0px;">
            <el-row class="sortTab">
            <el-col  :span="8">
                <span class="blueBlock"></span>
                <span class="spanBlock">产值进度</span>
            </el-col>          
            <el-col :span="16" class="middleAdd" style="text-align:right;">    
                <el-button size="mini" type="text" @click="openEditPlan">编辑</el-button>
            </el-col>
          </el-row>
          <el-row class="listPlan">
              <div v-if="!projeInfo">项目名称：</div>
              <div v-else>项目名称：{{projeInfo.projectName}}</div>
              <div v-if="!projeInfo">合同工期：</div>
              <div v-else>合同工期：{{projeInfo.contractStartTime}}-{{projeInfo.contractEndTime}}</div>
              <div class="Workproress"><span>工期进度：</span><el-progress style="width:60%;border:none;display: inline-block;" :stroke-width="13" :percentage="this.projectProgress"></el-progress></div>
              <div v-if="!projeInfo">项目经理：</div>
              <div v-else>项目经理：{{projeInfo.projectManager}}</div>
              <div style="border-bottom:none;">
                  <p>项目概括：</p>
                  <p v-if="!projeInfo"></p>
                  <p v-else>{{projeInfo.projectOverview}}</p>
              </div>
          </el-row>
      </el-col>
      <el-col :span="10" class="elStyle" >
        <el-row class="sortTab">
            <el-col  :span="15">
                <span class="blueBlock"></span>
                <span class="spanBlock">项目进度计划/最近浏览</span>
            </el-col>          
            <el-col :span="9" class="middleAdd" style="text-align:right;">
                 <el-button size="mini" type="text" @click="addPlan">+新增计划</el-button>
                 <el-button size="mini" type="text" @click="linePlan">+导入计划</el-button>    
            </el-col>
        </el-row>
         <el-row :gutter="20"  class="middleList">
            <el-col v-for="item in projectList" :key="item.id" :span="12">
                <div class="blockList" @click="openProgressPicture(item.id)">
                    <div class="blockList_title">{{item.name}}</div>
                    <div class="blockList_title">总工期差异：+9天    延期计划任务：8个</div>
                    <img src="../../assets/planImg.png" alt="">
                </div>
            </el-col>
            <!-- <el-col :span="12">
               <div class="blockList">
                    <div class="blockList_title">总进度计划</div>
                    <div class="blockList_title">总工期差异：+9天    延期计划任务：8个</div>
                    <img src="http://tower-img.1357.cn/file/2018-11-29/1219862087247360.jpg?x-oss-process=image/resize,m_lfit,w_640,h_640/watermark,type_ZmFuZ3poZW5na2FpdGk=,color_FFFFFF,type_ZmFuZ3poZW5naGVpdGk,size_22,text_6LW15LqMICAyMDE4LTExLTI5IDE0OjI2" alt="">
                </div>
            </el-col>
            <el-col :span="12" >
                <div class="blockList">
                    <div class="blockList_title">总进度计划</div>
                    <div class="blockList_title">总工期差异：+9天    延期计划任务：8个</div>
                    <img  src="http://tower-img.1357.cn/file/2018-11-29/1219862087247360.jpg?x-oss-process=image/resize,m_lfit,w_640,h_640/watermark,type_ZmFuZ3poZW5na2FpdGk=,color_FFFFFF,type_ZmFuZ3poZW5naGVpdGk,size_22,text_6LW15LqMICAyMDE4LTExLTI5IDE0OjI2" alt="">
                </div>
            </el-col> -->
        </el-row>       
      </el-col>
     <el-col  :span="8"  class="elStyle" style="border-right:none;">
        <el-row class="sortTab" style="padding: 11px;">
            <el-col  :span="8">
                <span class="blueBlock"></span>
                <span class="spanBlock">施工资源</span>
            </el-col>          
            <!-- <el-col :span="16" style="text-align:right;">    
                <span style="line-height:47px;">筛选</span>
            </el-col> -->
        </el-row>
        <el-row style="padding:10px;">
       <div class="tableDiv">
            <span><i class="el-icon-tickets"></i></span>
            <span>人力资源</span>
            <el-table  border :data="tableData2" style="width: 100%" max-height="500">
            <el-table-column prop="type" label="工种" align="center" min-width="100"></el-table-column>
            <el-table-column prop="num" label="数量" align="center" min-width="50"></el-table-column>
            </el-table>
        </div>
         <div class="tableDiv">
            <span><i class="el-icon-tickets"></i></span>
            <span>工程材料</span>
            <el-table  border :data="tableData2" style="width: 100%" max-height="500">
            <el-table-column prop="type" label="材料" align="center" min-width="100"></el-table-column>
            <el-table-column prop="num" label="数量" align="center" min-width="50"></el-table-column>
            </el-table>
        </div>
         <div class="tableDiv">
            <span><i class="el-icon-tickets"></i></span>
            <span>施工机械</span>
            <el-table  border :data="tableData2" style="width: 100%" max-height="500">
            <el-table-column prop="type" label="机械" align="center" min-width="100"></el-table-column>
            <el-table-column prop="num" label="数量" align="center" min-width="50"></el-table-column>
            </el-table>
        </div>
        </el-row>
    </el-col>
  </el-row>

    <!-- 编辑项目弹框 -->
    <el-dialog title="编辑项目" :center="true" :visible.sync="dialog.editPlan" width="700px" @open="$nextTick(()=>$refs['editPlan'].update(projectInfoObj))" @close="$refs['editPlan'].reset()" >
        <!-- <editPlan ref="editPlan" @refreshData="refreshList"  @close="dialog.editPlan = false" style="height:600px;overflow:auto;"></editPlan> -->
        <editPlan ref="editPlan" @refreshData="refreshList"  @close="dialog.editPlan = false"></editPlan>
    </el-dialog>

    <!-- 导入计划 -->
    <el-dialog title="导入计划" :center="true" :visible.sync="dialog.associationPlan" width="700px" @open="$nextTick(()=>$refs['associationPlan'].update())" @close="$refs['associationPlan'].reset()" >
        <associationPlan ref="associationPlan" @refreshData="refreshList"  @close="dialog.associationPlan = false" ></associationPlan>
    </el-dialog>

    <!-- 新增计划 -->
    <el-dialog title="新增计划" :center="true" :visible.sync="dialog.addImportPlan" @open="$nextTick(()=>$refs['addImportPlan'].update())" width="700px" @close="$refs['addImportPlan'].reset()">
        <addImportPlan ref="addImportPlan" @refreshData="refreshList"  @close="dialog.addImportPlan = false" ></addImportPlan>
    </el-dialog>
  </div>
</template>

<script>
import editPlan from"../planhomePage/editPlan.vue";
import associationPlan from"../planhomePage/associationPlan.vue";
import addImportPlan from"../planhomePage/addImportPlan.vue";
import { plans,projectInfo } from "../api/system_interface.js";
export default {
  name: "planhomePage",
  components:{
      editPlan,
      associationPlan,
      addImportPlan
  },
  data() {
    return {
        tableData2:[
            {type:'你',num:'2'},{type:'好',num:'3'}
        ],
        dialog:{
            editPlan:false,
            associationPlan:false,
            addImportPlan:false

        },
        dataObj:{},
        projectList:[],
        projeInfo:{},
        projectProgress:0,
        projectInfoObj:{}
    };
  },
  methods:{
      openEditPlan(){
        this.dialog.editPlan = true;
        this.projectInfoObj = this.projeInfo;
      },
      linePlan(){
        this.dialog.associationPlan = true;
      },
      addPlan(){
        this.dialog.addImportPlan = true;
      },
      openProgressPicture(data){
          this.$router.push({
            name: 'progressPIcture',
            params: {
            planID: data
            }
        })
      },
      //查询所有计划
      refreshList(){
        var projectArry = JSON.parse(sessionStorage.getItem("selectArry"));
        var lastProject = projectArry[projectArry.length-1];
        plans({})
        .then(response => {
          this.projectList = response.body;
        })
        .catch(error => {});
        
        projectInfo(lastProject)
        .then(response => {
          this.projeInfo = response.body;
          this.projectProgress = this.getProcess(this.projeInfo.contractStartTime,this.projeInfo.contractEndTime);

        })
        .catch(error => {});
        
      },
    //将年月日格式转换为yyyy-mm-dd格式
    chDate2date (str) {
        return str.replace(/[年|月]/g, '-').replace('日', '')
    },
    //计算今天占日期范围的百分比 start为开始日期   end为结束日期
    getProcess (start, end) {
    start = +new Date(start)
    end = +new Date(end)
    let now = +new Date
    let rs = (now - start) / (end - start)
    rs = rs > 1 ? 1 : rs.toFixed(2)
    return rs * 100
    }
  },
 created() {
     this.refreshList();
  }
};
</script>
<style lang="scss" scoped>
@import "planhomePage.scss";
.checkEdColor{
    background-color: rgba(64,158,255,.1);
}
</style>
