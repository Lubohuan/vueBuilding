<template>
<!--布局页面-->
<div class="home">
<el-container style="height:100%;">
  <el-aside width="180px" class="asideList">
     <div class="titleSpan">生产形象进度</div>
     <el-tree class="treeList" :data="data3" :props="defaultProps" node-key="id"
              ref="tree2" default-expand-all @node-click="handleNodeClick"></el-tree>
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
import {getSessionInfo,listPermissionCode} from "../api/system_interface.js";
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
          id: -1,
          label: "企业级管理看板",
          path:"/enterpriseCommandCenter",
          code:"110101"
      },
      project: {
          id: -2,
          label: "项目管理看板",
          path:"/commandCentre",
          code:"110101"
      },
      data2: [
        {
          id: -1,
          label: "企业级管理看板",
          path:"/enterpriseCommandCenter",
          code:"110101"
        },
        {
          id: -2,
          label: "项目管理看板",
          path:"/commandCentre",
          code:"110101"
        },
        {
          id: 3,
          label: "施工区段管理",
          path:"/areaManagement",
          code:"110201"
        },
        {
          id: 4,
          label: "生产计划管理",
          path:"/areaManagement",
          code:"110301",
          children:[
            {
              id: 41,
              label: "总进度计划",
              path:"/planTotal",
              code:"110401"
            },
            {
              id: 42,
              label: "年进度计划",
              path:"/planYear",
              code:"110501"
            },
            {
              id: 44,
              label: "项目阶段性进度计划",
              path:"/planProject",
              code:"110501"
            },
            {
              id: 43,
              label: "月进度计划",
              path:"/planProgress",
              code:"110601"
            },
          ]
        },
        {
          id: 50,
          label: "生产任务管理",
          path:"",
          code:"110701",
          children:[
            {
              id: 53,
              label: "生产任务管理",
              path:"/taskManagement",
              code:"110801"
            },
            {
              id: 56,
              label: "施工记录管理",
              path:"/workRecord",
              code:"112001"
            },
          ]
        },
        {
          id: 5,
          label: "形象进度管理",
          path:"",
          code:"110901",
          children: [
            {
              id: 51,
              label: "形象进度统计项",
              path:"/graphicProgress",
              code:"111001"
            },
            // {
            //   id: 52,
            //   label: "形象进度月计划",
            //   path:"/planProgress",
            //   code:"110501"
            // },
             
             {
              id: 54,
              label: "形象进度检视",
              path:"/lookProgress",
              code:"111101"
            },
             {
              id: 55,
              label: "形象进度报表",
              path:"/Imagereport",
              code:"111201"
            }
          ]
        },
      
        {
          id: 6,
          label: "预警督办",
          path:"",
          code:"111301",
          children: [
            {
              id: 61,
              label: "计划预警",
              path:"/taskWarning",
              code:"111401"
            },
            {
              id: 62,
              label: "预警记录",
              path:"/warningRecord",
              code:"111501"
            }
          ]
        },
        {
          id: 7,
          label: "设置",
          path:"",
          code:"111601",
          children: [
            {
              id: 71,
              label: "分部分项库",
              path:"/bitem",
              code:"111701"
            },
             {
              id: 72,
              label: "统计单位库",
              path:"/statistical",
              code:"111801"
            },
             {
              id: 73,
              label: "工程类别",
              path:"/engineeringcategorymanagement",
              code:"111901"
            }
          ]
        }       
      ],
      data3:[]
    };
  },
  methods: {
      handleNodeClick(data){
        // if(data.path){
        //   this.$router.push(data.path);
        // }else{
        //   this.$message.error('敬请期待！');
        // }
        if(data.path){
          localStorage.setItem('nowRouter', data.path);
          localStorage.setItem('nowRouterIndex', data.id);
          
        }
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
    //获取用户权限码
    getUserPermission(){
        return new Promise((resolve, reject) => {
        listPermissionCode({})
        .then(response => {
              if (response.code == "200") {
                sessionStorage.setItem('companyPressCode', response.body);             
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
    await this.getUserPermission();
    console.log(this.companyType);
   
  //  if(this.companyType == 2||this.companyType == 3){
  //     this.data2.unshift(this.company);
  //   }
  //   else if(this.companyType == 4){
  //     this.data2.unshift(this.project);
  //   }
  //   else if(this.companyType == 1){
  //     this.data2.unshift(this.project);
  //     this.data2.unshift(this.company);
  //   }
   if(this.companyType == 2||this.companyType == 3){
      // this.data2.unshift(this.company);//企业级的
      this.data2.splice(1,1);
    }
    else if(this.companyType == 4){
      // this.data2.unshift(this.project);//项目级的
      this.data2.splice(0,1);
    }
    else if(this.companyType == 1){
      // this.data2.unshift(this.project);
      // this.data2.unshift(this.company);
    }
    console.log(this.data2);
    if(this.companyType == 2||this.companyType== 3){
      let nowRouter = localStorage.getItem('nowRouter');
      let index = localStorage.getItem('nowRouterIndex');
      if(nowRouter && index){
        if(index>0){
          this.$router.push({path:nowRouter});
          setTimeout(()=>{this.$refs.tree2.setCurrentKey(index)},100);
        }else{
          localStorage.setItem('nowRouter', '/enterpriseCommandCenter');
          localStorage.setItem('nowRouterIndex', '-1');
          this.$router.push({path:'/enterpriseCommandCenter'});
          // this.$router.push({path:nowRouter});
          setTimeout(()=>{this.$refs.tree2.setCurrentKey(-1)},100);
        }
        
      }else{
        localStorage.setItem('nowRouter', '/enterpriseCommandCenter');
        localStorage.setItem('nowRouterIndex', '-1');
        this.$router.push({path:'/enterpriseCommandCenter'});
      }
       
    }
    if(this.companyType == 4){

      let nowRouter = localStorage.getItem('nowRouter');
      let index = localStorage.getItem('nowRouterIndex');
      if(nowRouter){
        if(index>0){
          this.$router.push({path:nowRouter});
          setTimeout(()=>{this.$refs.tree2.setCurrentKey(index)},100);
        }else{
          localStorage.setItem('nowRouter', '/commandCentre');
          localStorage.setItem('nowRouterIndex', '-2');
          this.$router.push({path:'/commandCentre'});
          // this.$router.push({path:nowRouter});
          setTimeout(()=>{this.$refs.tree2.setCurrentKey(-2)},100);
        }
        
      }else{
        localStorage.setItem('nowRouter', '/commandCentre');
        localStorage.setItem('nowRouterIndex', '-2');
        this.$router.push({path:'/commandCentre'});
      }
    }  
    
    //this.data3 = JSON.parse(JSON.stringify(this.data2));
    for(var i=0;i<this.data2.length;i++){
      if(this.hasPerm(this.data2[i].code)){
          if(!this.data2[i].children){
            this.data3.push(this.data2[i]);
          }
          else{            
            for (let j = this.data2[i].children.length; j--;) {

              if(!this.hasPerm(this.data2[i].children[j].code)){
                  var index = this.data2[i].children.indexOf(this.data2[i].children[j]);
                  this.data2[i].children.splice(index, 1);
              }
            }
            this.data3.push(this.data2[i]);
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import "home.scss";
</style>
