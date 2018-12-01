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
              <div>项目名称：华筑科技智慧工地项目</div>
              <div>合同工期：2018年5月4日-2019年9月18日</div>
              <div class="Workproress"><span>工期进度：</span><el-progress style="width:60%;border:none;display: inline-block;" :stroke-width="13" :percentage="80"></el-progress></div>
              <div>项目经理：刘骅德</div>
              <div style="border-bottom:none;">
                  <p>项目概括：</p>
                  <p>商业工程占地面积约78400平方米，总建筑面积53600 m²。主要功能：办公、地下车库及附属商业配套设施。本工程主体结构嵌固在五棵松地下停车库负二层顶板上，停车库基坑南北长287m，东西宽252m。本工程±0.00=59.50m，负二层顶板标高为-9.1m，以此标高进行界面划分。</p>
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
                 <el-button size="mini" type="text">+新增计划</el-button>
                 <el-button size="mini" type="text">+导入计划</el-button>    
            </el-col>
        </el-row>
         <el-row :gutter="20"  class="middleList">
            <el-col :span="12" >
                <div class="blockList">
                    <div class="blockList_title">总进度计划</div>
                    <div class="blockList_title">总工期差异：+9天    延期计划任务：8个</div>
                    <img src="http://tower-img.1357.cn/file/2018-11-29/1219862087247360.jpg?x-oss-process=image/resize,m_lfit,w_640,h_640/watermark,type_ZmFuZ3poZW5na2FpdGk=,color_FFFFFF,type_ZmFuZ3poZW5naGVpdGk,size_22,text_6LW15LqMICAyMDE4LTExLTI5IDE0OjI2" alt="">
                </div>
            </el-col>
            <el-col :span="12">
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
            </el-col>
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
    <el-dialog title="编辑项目" :center="true" :visible.sync="dialog.editPlan" width="1000px" @open="$nextTick(()=>$refs['editPlan'].update(dataObj))" @close="$refs['editPlan'].reset()">
        <editPlan ref="editPlan" @refreshData="refreshList"  @close="dialog.editPlan = false"></editPlan>
    </el-dialog>
  </div>
</template>

<script>
import editPlan from"../planhomePage/editPlan.vue";
import { getPlanTaskPage,getConstructPlanDetailById,getConstructLogPage,updateTaskPriority } from "../api/upload.js";
export default {
  name: "planhomePage",
  components:{
      editPlan
  },
  data() {
    return {
        tableData2:[
            {type:'你',num:'2'},{type:'好',num:'3'}
        ],
        dialog:{
            editPlan:false
        },
        dataObj:{}
    };
  },
  methods:{
      openEditPlan(){
          this.dialog.editPlan = true;
      },
      refreshList(){

      }
  },
 created() {
  }
};
</script>
<style lang="scss" scoped>
@import "planhomePage.scss";
.checkEdColor{
    background-color: rgba(64,158,255,.1);
}
</style>
