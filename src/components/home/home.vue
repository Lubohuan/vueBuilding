<template>
<!--布局页面-->
<div class="home">
<el-container style="height:100%;">
  <el-aside width="180px" class="asideList">
     <div class="titleSpan">生产形象进度</div>
     <el-tree class="treeList" :data="data2" :props="defaultProps" default-expand-all @node-click="handleNodeClick"></el-tree>
  </el-aside>
   <!-- <el-tree  :data="data2" :props="defaultProps" default-expand-all @node-click="handleNodeClick">
          <span style="width:100%;height:100%;" class="treeList" slot-scope="{ node, data }">
            <span>{{ data.label }}</span>
          </span>
  </el-tree> -->
    <el-main class="elContent">
      <router-view> </router-view>
    </el-main>
</el-container>
</div>
</template>

<script>
import {getSessionInfo} from "../api/system_interface.js";
export default {
  name: "home",
  data() {
    return {
      companyType:'',
      orangeType:'',
      defaultProps: {
        children: "children",
        label: "label"
      },
      company:{
          id: 1,
          label: "企业级管理看板",
          path:"/enterpriseCommandCenter"
      },
      project: {
          id: 2,
          label: "项目管理看板",
          path:"/commandCentre"
      },
      data2: [
        {
          id: 3,
          label: "施工区段管理",
          path:"/areaManagement"
        },
        {
          id: 4,
          label: "形象进度管理",
          path:"",
          children: [
            {
              id: 41,
              label: "形象进度统计项",
              path:"/graphicProgress"
            },
            {
              id: 42,
              label: "形象进度月计划",
              path:"/planProgress"
            },
             {
              id: 43,
              label: "形象进度任务管理",
              path:"/taskManagement"
            },
             {
              id: 44,
              label: "进度检视",
              path:"/lookProgress"
            },
             {
              id: 45,
              label: "形象进度报表",
              path:"/Imagereport"
            }
          ]
        },
      
        {
          id: 5,
          label: "预警督办",
          path:"",
          children: [
            {
              id: 51,
              label: "计划预警",
              path:"/taskWarning"
            },
            {
              id: 52,
              label: "预警记录",
              path:"/warningRecord"

            }
          ]
        },
        {
          id: 6,
          label: "设置",
          path:"",
          children: [
            {
              id: 61,
              label: "分部分项库",
              path:"/bitem"
            },
             {
              id: 62,
              label: "统计单位库",
              path:"/statistical"
            },
             {
              id: 63,
              label: "工程类别",
              path:"/engineeringcategorymanagement"
            }
          ]
        }       
      ]
    };
  },
  methods: {
      handleNodeClick(data){
        this.$router.push(data.path);
      },
      //获取登陆用户信息
      getUserInfo(){
        return new Promise((resolve, reject) => {
        getSessionInfo({})
          .then(response => {
              if (response.code == "200") {
              // sessionStorage.setItem('orgType', response.body.orgType);            
              this.orangeType = response.body.orgType; 
              this.companyType = response.body.chOrgType;  
              resolve();          
            } else {
              this.$message.error(response.msg);
            }
          })
          .catch(error => {
            console.log(error);
            reject();
          });
        })
    },
  },
  async created(){
    await this.getUserInfo();
    // if(sessionStorage.getItem("orgType")){
    //   this.orangeType = sessionStorage.getItem("orgType");
    // }
    if(this.orangeType == 2||this.orangeType== 3||this.orangeType== 1){
       this.$router.push({path:'/enterpriseCommandCenter'});
    }
    else{
       this.$router.push({path:'/commandCentre'});
    }      
    if(this.companyType == 2||this.companyType == 3){
      this.data2.unshift(this.company);
    }
    else if(this.companyType == 4){
      this.data2.unshift(this.project);
    }
    else if(this.companyType == 1){
      this.data2.unshift(this.project);
       this.data2.unshift(this.company);
    }
  }
};
</script>
<style lang="scss">
@import "home.scss";
</style>
