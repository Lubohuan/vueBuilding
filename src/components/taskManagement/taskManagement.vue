<template>
<!--形象进度任务管理-->
<div class="taskManagement">
 <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>形象进度管理</el-breadcrumb-item>
    <el-breadcrumb-item>形象进度任务管理</el-breadcrumb-item>
  </el-breadcrumb>
 <el-row>
    <el-col :span="24">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部任务" name="first"></el-tab-pane>
      <el-tab-pane label="生产任务" name="second"></el-tab-pane>
      <el-tab-pane label="形象进度" name="third"></el-tab-pane>
      <el-tab-pane label="安全" name="fourth"></el-tab-pane>
      <el-tab-pane label="质量" name="fifth"></el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
  <el-row class="rowOne">
      <el-col :span="8" class="elStyle" style="padding:0px;">
          <el-row class="sortTab">
              <el-col :span="8">
              <el-button type="primary" size="mini">任务</el-button>
              </el-col>
              <el-col :span="16" style="text-align:right;">
                    <span><i class="el-icon-sort iconStyle"></i>排序</span>
                    <span><i class="el-icon-sort iconStyle"></i>分组</span>
                    <span>筛选</span>
              </el-col>
          </el-row>
          <div v-for="(item,index) in tableData" :key="item.id" @click="lookInfo(item)" class="blackOne" tabindex = "0">
              <div class="oneFirst">{{item.desp}}</div>
              <div>
                  <el-row>
                      <el-col :span="15">
                          <el-tag size="small"  type="info">#{{index}}</el-tag >
                          <el-tag size="small"  type="danger">{{item.info}}</el-tag >
                          <el-tag size="small"  type="info">{{item.name}}</el-tag >
                      </el-col>
                      <el-col :span="9" class="rightTag">
                          <el-tag size="small" style="border-radius:20px;">{{item.stage}}</el-tag >                          
                      </el-col>
                  </el-row>
              </div>
          </div>
      </el-col>
      <el-col :span="16" class="elStyle" style="border-right:none;">
          <el-row class="sortTabs">
            <span>#{{personalData.name}}</span>
          </el-row>
          <el-row class="despRowHeight">
          <el-col :span="12" class="elDesp">
          <div class="despSpan">{{personalData.desp}}</div>
          <el-row class="despInfon">
                  <el-col :span="8">
                       <img src="../../assets/default-folder-icon.png" alt="" class="despImage">
                       <div style="display:inline-block;">
                            <div>{{personalData.name}}</div>
                            <div class="desp_look">负责人</div>
                       </div>
                  </el-col>
                   <el-col :span="8">
                       <img src="../../assets/default-folder-icon.png" alt="" class="despImage">
                       <div style="display:inline-block;">
                            <div>{{personalData.name}}</div>
                            <div class="desp_look">当前状态</div>
                       </div>
                  </el-col>
                   <el-col :span="8">
                       <img src="../../assets/default-folder-icon.png" alt="" class="despImage">
                       <div style="display:inline-block;">
                            <div>{{personalData.name}}</div>
                            <div class="desp_look">优先级</div>
                       </div>
                  </el-col>
            </el-row>
            <el-row class="despSpans">
            <el-tabs v-model="activeName1" @tab-click="handleClick">
                  <el-tab-pane label="基础信息" name="first1" class="firstTab">
                      <div>跟踪频率：{{personalData.id}}/次</div>
                      <div style="margin:0px;">任务描述</div>
                      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入任务描述" v-model="textarea"></el-input>
                      <div>分部分项：{{personalData.name}}</div>
                      <div>
                          <span>计划工程量：{{personalData.name}}</span>
                          <span class="rightNumber">9.99%</span>
                      </div>
                       <div>
                          <span>累计完成量：{{personalData.name}}</span>
                          <span class="rightSpan">剩余工程量：{{personalData.name}}</span>
                      </div>
                       <div>计划产值：{{personalData.name}}</div>
                       <div>
                          <span>累计完成产值：{{personalData.name}}</span>
                          <span class="rightSpan">剩余产值：{{personalData.name}}</span>
                      </div>
                  </el-tab-pane>
                  <el-tab-pane label="相关任务" name="second1" class="secondtTab">
                      <div>
                          <el-row>
                              <el-col :span="12">子任务</el-col>
                              <el-col :span="12" class="rightTag">+新增子任务</el-col>
                          </el-row>
                          <div class="taskList" style="">暂无子任务</div>
                          <el-row>
                             <el-col :span="12">子任务</el-col>
                             <el-col :span="12" class="rightTag">+新增关联任务</el-col>
                          </el-row>
                      </div>
                  </el-tab-pane>
                  <el-tab-pane label="文件" name="third1"></el-tab-pane>
            </el-tabs>
            </el-row>
            </el-col>
            <el-col :span="12"  class="rightEL">
            <el-row class="rightElSpan">
                 <el-col :span="12">
                     <span>进展</span>
                 </el-col>
                 <el-col :span="12" style="text-align:right;">
                     <i class="el-icon-sort iconStyle"></i>
                 </el-col>  
            </el-row>
            <el-tabs v-model="activeName11" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first11"></el-tab-pane>
                <el-tab-pane label="评论" name="second12"></el-tab-pane>
                <el-tab-pane label="文件" name="third13"></el-tab-pane>
                <el-tab-pane label="变更记录" name="fourth14"></el-tab-pane>
            </el-tabs>
            <el-row v-for="item in tableData" :key="item.id" style="margin:15px 0;">
                 <el-col>
                     <i class="el-icon-bell"></i>
                     <span>{{item.name}}：</span>
                     <span class="desp_look">{{item.desp}}</span>
                     <span class="desp_look" style="float:right;">2018-10-26</span>
                 </el-col>               
            </el-row>

            </el-col>
          </el-row>          
      </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: "taskManagement",
  data() {
    return {
      activeName: "first",
      activeName1: "first1",
      activeName11: "first11",
      tableData: [
        {
          id: 1,
          desp: "一施工区>外墙施工>2.5m以上防水层施工",
          info: "普通",
          name: "m1",
          stage: "未开始"
        },
        {
          id: 2,
          desp: "一施工区>外墙施工>钢筋绑扎",
          info: "紧急",
          name: "m2",
          stage: "进行中"
        },
        {
          id: 3,
          desp: "一施工区>外墙施工>模板安装",
          info: "紧急",
          name: "m3",
          stage: "逾期3天"
        }
      ],
      personalData: {},
      textarea: ""
    };
  },
  methods: {
    lookInfo(data) {
      this.personalData = data;
    },
    handleClick(tab) {
      var data = new Date();
      console.log(tab.name);
    }
  },
  created() {
    this.personalData = this.tableData[0];
  }
};
</script>
<style lang="scss" scoped>
@import "taskManagement.scss";
</style>
