<template>
<!--布局页面-->
<div class="home">
<el-container style="height:100%;">
  <el-aside width="200px" class="asideList">
     <div class="titleSpan">进度可视化管理</div>
     <el-tree class="treeList" :data="data2" :props="defaultProps" default-expand-all @node-click="handleNodeClick"></el-tree>
  </el-aside>
  <el-container style="overflow:auto;height:95%;">
    <el-main class="elContent">
      <router-view> </router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      data2: [
        {
          id: 1,
          label: "指挥中心",
          path:"/commandCentre"
        },
        // {
        //   id: 2,
        //   label: "可视化进度",
        //   path:""
        // },
       
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
              label: "进度计划",
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
          id: 3,
          label: "施工区段管理",
          path:"/areaManagement"
        },
         {
          id: 5,
          label: "预警督办",
          path:"",
          children: [
            {
              id: 51,
              label: "任务预警",
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
            }
          ]
        }
      ]
    };
  },
  methods: {
      handleNodeClick(data){
        console.log(data,"data");
        this.$router.push(data.path);
      }
  }
};
</script>
<style lang="scss">
@import "home.scss";
</style>
