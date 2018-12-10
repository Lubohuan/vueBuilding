<template>
<!--布局页面-->
<div class="home">
<el-container style="height:100%;">
  <el-aside width="180px" class="asideList">
     <div class="titleSpan">生产计划进度</div>
     <el-tree class="treeList" :data="data2" :props="defaultProps" default-expand-all @node-click="handleNodeClick"></el-tree>
  </el-aside>
    <el-main class="elContent">
      <router-view> </router-view>
    </el-main>
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
          label: "项目进度计划首页",
          path:"/planhomePage"
        },
        // {
        //   id: 2,
        //   label: "进度计划",
        //   path:"/progressPIcture"
        // }
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
