<template>
<!--任务预警-->
<div class="progressPicture" style="height:100%;">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
        <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
        <el-breadcrumb-item>形象进度管理</el-breadcrumb-item>
        <el-breadcrumb-item>形象进度月计划</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button size="small" type="primary" @click="addPlan">+ 新增计划</el-button>
      <el-button size="small" type="success">导入计划</el-button>
      <el-col :span="24" style="margin-top:10px;">
        <el-tabs v-model="projectType" type="card" @tab-click="handleClick">
          <el-tab-pane :key="item.id" v-for="item in projectTypeList" :label="item.name" :name="item.id"></el-tab-pane>
        </el-tabs>
      </el-col>
     <iframe ref="iframe" id="iframe" src="static/guant/gantt.html" frameborder="0" width="100%" height="100%" ></iframe>

     <!--新增计划-->
    <el-dialog  title="新增计划'" :center="true" :visible.sync="dialog.addProgress" width="700px" @close="$refs['addProgress'].reset()">
      <addProgress  v-if="dialog.addProgress" ref="addProgress"  @refreshData="refreshLists"  @close="dialog.addProgress = false" ></addProgress>
    </el-dialog>
</div>
</template>

<script>
import addProgress from"../progressPIcture/addProgress.vue";
import { plans } from "../api/system_interface.js";
export default {
  name: "progressPicture",
  components:{
      addProgress
  },
  data() {
    return {
      projectType: "",
      projectTypeList:[],
      dialog:{
        addProgress:false
      },
      iframeWin: {},
      showGantt:true
    };
  },
  methods: {

     sendMessage () {
      this.iframeWin = this.$refs.iframe.contentWindow;
      // 外部vue向iframe内部传数据
      this.iframeWin.postMessage({
        projectId: this.projectType,
      }, '*')
    },

     //切换工程标签
    handleClick(tab) {
      // console.log(tab.name);
      // this.refreshList();
      this.sendMessage();
      this.showGantt = false;
      this.showGantt = true;

    },

    //打开新增计划弹框
    addPlan(){
      this.dialog.addProgress = true;
    },

     //查询所有计划
    refreshLists(){
       return new Promise((resolve, reject) => {
        plans({})
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

    //等待查询所有计划完成
    async awaitList(){
      await this.refreshLists();
      this.projectType = this.projectTypeList[0].id;
      this.sendMessage();
    },

  },
  created() {
    this.awaitList();
     // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
    // window.addEventListener('message');
    
  }
};
</script>
