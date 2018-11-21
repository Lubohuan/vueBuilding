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
      <!-- <el-tab-pane label="生产任务" name="second"></el-tab-pane> -->
      <el-tab-pane label="形象进度" name="third"></el-tab-pane>
      <!-- <el-tab-pane label="安全" name="fourth"></el-tab-pane> -->
      <!-- <el-tab-pane label="质量" name="fifth"></el-tab-pane> -->
      </el-tabs>
    </el-col>
  </el-row>
  <el-row class="rowOne">
      <el-col :span="7" class="elStyle" style="padding:0px;">
          <el-row class="sortTab">
              <!-- <el-col :span="8">
              <el-button type="primary" size="mini" @click="addTask">+任务</el-button>
              </el-col> -->
              <el-col :span="24" style="text-align:right;">    
                <span>
                <el-popover placement="bottom" width="200" v-model="visible">
                    <el-select  size="small" v-model="state" filterable  placeholder="请选择状态" clearable  @change="changeSort">
                      <el-option v-for="(item,index) in tableData" :label="item.name" :value="item.id" :key="index">
                      </el-option>
                    </el-select>
                    <i slot="reference" class="el-icon-sort" >排序</i>
                </el-popover>
                </span>
                 <span>
                <el-popover placement="bottom" width="200" v-model="visible2">
                    <el-select  size="small" v-model="state" filterable  placeholder="请选择状态" clearable  @change="changeTeam">
                      <el-option v-for="(item,index) in tableData" :label="item.name" :value="item.id" :key="index">
                      </el-option>
                    </el-select>
                    <i slot="reference" class="el-icon-edit-outline" >分组</i>
                </el-popover>
                </span>
                <span>筛选</span>
              </el-col>
          </el-row>
          <div style="text-align:center;">
              <span style="background:rgba(144, 144, 144, 0.15);padding:2px 5px;">共{{tableData.length}}条任务</span>
          </div>
          <div v-for="item in tableData" :key="item.id" @click="lookInfo(item)" class="blackOne" tabindex = "0">
              <div class="oneFirst">{{item.planName}}</div>
              <div>
                  <el-row>
                      <el-col :span="15">
                          <!-- <el-tooltip class="item" effect="dark"  placement="top" >
                              <span slot="content">任务id：#{{index}}</span>
                              <el-tag size="small"  type="info">#{{index}}</el-tag >
                          </el-tooltip> -->
                          <el-tooltip class="item" effect="dark"  placement="top" v-if="item.level == 0">
                              <span slot="content">优先级：普通</span>
                              <el-tag size="small">普通</el-tag >
                          </el-tooltip>
                           <el-tooltip class="item" effect="dark"  placement="top"  v-if="item.level == 1">
                              <span slot="content">优先级：较急</span>
                              <el-tag size="small"  type="warning">较急</el-tag >
                          </el-tooltip>
                           <el-tooltip class="item" effect="dark"  placement="top"  v-if="item.level == 2">
                              <span slot="content">优先级：紧急</span>
                              <el-tag size="small"  type="danger">紧急</el-tag >
                          </el-tooltip>
                           <el-tooltip class="item" effect="dark"  placement="top">
                              <span slot="content">任务负责人：{{item.respUserName}}</span>
                              <el-tag size="small"  type="info">{{item.respUserName}}</el-tag >
                          </el-tooltip>
                      </el-col>
                      <el-col :span="9" class="rightTag">
                          <el-tag  size="small" style="border-radius:20px;" v-if="item.state == '0'">未完成</el-tag >
                          <el-tag type="success" size="small" style="border-radius:20px;" v-if="item.state == '1'">已完成</el-tag >
                          <el-tag type="danger" size="small" style="border-radius:20px;" v-if="item.state == '2'">已过期</el-tag >                            
                      </el-col>
                  </el-row>
              </div>
          </div>
      </el-col>
      <el-col :span="17" class="elStyle" style="border-right:none;">
          <el-row class="sortTabs">
            <el-col :span="24" class="showTrueStyle" style="text-align:right;">
                <span @click="hideRight">{{showRoFalse}}</span>
            </el-col>
          </el-row>
          <el-row class="despRowHeight">
          <el-col :span="leftNumber" class="elDesp">
          <div class="despSpan">{{personalData.planName}}</div>
          <el-row class="despInfon">
                <el-col :span="8">
                <el-popover placement="bottom" width="200" v-model="visible3">
                    <el-select  size="small" v-model="state" filterable  placeholder="请选择状态" clearable  @change="changePeople">
                      <el-option v-for="(item,index) in tableData" :label="item.name" :value="item.id" :key="index">
                      </el-option>
                    </el-select>
                    <div slot="reference">
                        <img src="../../assets/u1886.png" alt="" class="despImage">
                        <div style="display:inline-block;">
                            <div>{{personalData.respUserName}}</div>
                            <div class="desp_look">负责人</div>
                        </div>
                    </div>
                </el-popover>                    
                </el-col>
                <el-col :span="8" >
                      <div @click="changeStates">                  
                       <img src="../../assets/u164.png" alt="" class="despImage">
                       <div style="display:inline-block;">
                            <div v-if="personalData.state == '0'">未完成</div >
                            <div v-if="personalData.state == '1'">已完成</div >
                            <div v-if="personalData.state == '2'">已过期</div >  
                            <div class="desp_look">当前状态</div>
                       </div>
                       </div>
                  </el-col>
                   <el-col :span="8">
                       <el-dropdown trigger="click"  style="width:100%;">
                       <div>
                            <img src="../../assets/u1899.png" alt="" class="despImage">
                            <div style="display:inline-block;">
                            <div v-if="personalData.level == '0'">普通</div >
                            <div v-if="personalData.level == '1'">较急</div >
                            <div v-if="personalData.level == '2'">紧急</div >  
                            <div class="desp_look">优先级</div>
                            </div>
                       </div>                      
                        <el-dropdown-menu slot="dropdown" style="width:200px;">
                        <span style="margin:15px 0 15px 20px;font-size:16px;">更改优先级</span>
                        <el-dropdown-item>普通</el-dropdown-item>
                        <el-dropdown-item>较急</el-dropdown-item>
                        <el-dropdown-item>最急</el-dropdown-item>
                        </el-dropdown-menu>
                        </el-dropdown>
                      
                  </el-col>
            </el-row>
            <el-row class="despSpans">
            <el-tabs v-model="activeName1" @tab-click="handleClick">
                  <el-tab-pane label="基础信息" name="first1" class="firstTab">
                      <div>起止日期：{{personalData.trackCycle}}</div>
                      <!-- <div style="margin:0px;">任务描述</div>
                      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入任务描述" v-model="textarea" @focus="focusInput"></el-input>
                      <div v-if="showButton" style="text-align:right;">
                          <el-button size="mini" @click="showButton=false">取消</el-button>
                          <el-button size="mini" type="primary" @click="showButton=false">保存</el-button>
                      </div> -->
                      <div>分部分项：{{personalData.subFullName}}</div>
                      <div>
                          <span>计划工程量：{{personalData.planFinish}}m³</span>
                          <span class="rightNumber">{{personalData.finishRate}}</span>
                      </div>
                       <div>
                          <span>累计完成量：{{personalData.finishTotal}}m³</span>
                          <span class="rightSpan">剩余工程量：{{personalData.notFinish}}m³</span>
                      </div>
                       <div>计划产值：{{personalData.planFinish}}</div>
                       <div>
                          <span>累计完成产值：{{personalData.finishTotal}}m³</span>
                          <span class="rightSpan">剩余产值：{{personalData.notFinish}}m³</span>
                      </div>
                  </el-tab-pane>
                  <!-- <el-tab-pane label="相关任务" name="second1" class="secondtTab">
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
                  </el-tab-pane> -->
                  <!-- <el-tab-pane label="文件" name="third1"></el-tab-pane> -->
            </el-tabs>
            </el-row>
            </el-col>
            <el-col v-if="isShowRight" :span="12"  class="rightEL">
            <el-row class="rightElSpan">
                 <el-col :span="12">
                     <span style="font-size: 16px;">施工记录</span>
                 </el-col>
                 <el-col :span="12" style="text-align:right;">
                     <i class="el-icon-sort iconStyle"></i>
                 </el-col>  
            </el-row>
            <el-tabs v-model="activeName11" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first11"></el-tab-pane>
                <!-- <el-tab-pane label="进展" name="second12"></el-tab-pane>
                <el-tab-pane label="文件" name="third13"></el-tab-pane>
                <el-tab-pane label="变更记录" name="fourth14"></el-tab-pane> -->
            </el-tabs>
            <div style="height:90%;overflow:auto;">
            <el-row v-for="item in tableDatas" :key="item.id" style="margin:15px 0;">
                 <el-col>
                    <div class="diaryTitle">
                        <i class="el-icon-bell"></i>
                        <span>{{item.createUserName}}：</span>
                        <span class="desp_look">{{item.remark}}</span>
                        <div class="desp_look lookTime">{{item.createTime}}</div>
                    </div> 
                    <div class="imgVidevoInfo">
                     <viewer style="display:inline-block;cursor: pointer;">
	                    <img src="http://tower-img.1357.cn/file/2018-11-02/716867844360000.jpg?x-oss-process=image/resize,m_lfit,w_640,h_640/watermark,type_ZmFuZ3poZW5na2FpdGk=,color_FFFFFF,type_ZmFuZ3poZW5naGVpdGk,size_22,text_546L5a6PICAyMDE4LTExLTAyIDA5OjEw" width="120" height="70">
	                 </viewer>
                     <div class="videoStyle" @click="dialog.openVideo=true;" :style="{backgroundImage: 'url(' + item.url + ')'}">
                         <img src="http://pic.51yuansu.com/pic2/cover/00/45/31/5814de4d8c6d6_610.jpg" class="openIcon" width="30" height="30">
                     </div>
                    </div>
                    <!-- <aplayer autoplay :music="{title: 'secret base~君がくれたもの~',artist: 'Silent Siren',src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'}"/> -->
                     
                 </el-col>               
            </el-row>
            </div>

            </el-col>
          </el-row>          
      </el-col>
  </el-row>

  <!--新建任务-->
    <el-dialog title="新建任务" :center="true" :visible.sync="dialog.addTasks" width="700px" @close="$refs['addTasks'].reset()">
      <addTasks ref="addTasks"  @close="dialog.addTasks = false" @sendiptVal='showChildMsg'></addTasks>
    </el-dialog>
  <!--选择步骤-->
    <el-dialog title="选择步骤" :center="true" :visible.sync="dialog.changeState" width="700px"  @close="close">
        <div v-for="item in stateData" :key="item.id" @click="clickState(item)" class="stateList" tabindex = "0" >
            <span>{{item.name}}</span>
            <span v-if="showIcon == item.id" class="el-icon-check iconStyles"></span>
        </div>
        <div class="clickBtn">
            <el-button @click="close"  size="small">取消</el-button>
            <el-button :disabled="isChoice" @click="commit" size="small" type="primary">保存</el-button>
        </div>
    </el-dialog>

    <el-dialog title="施工视频" :center="true" :visible.sync="dialog.openVideo" width="800px" class="openVideo" @close="closeRest">
         <video-player  class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
    </el-dialog >
  </div>
</template>

<script>
import addTasks from "../taskManagement/addTasks.vue";
import { getPlanTaskPage,getConstructPlanDetailById,getConstructLogPage } from "../api/upload.js";
import Aplayer from 'vue-aplayer';
import { rejects } from 'assert';
export default {
  name: "taskManagement",
  components:{
     addTasks,
     Aplayer
  },
  data() {
    return {
      activeName: "first",
      activeName1: "first1",
      activeName11: "first11",
      tableData: [],
      tableDatas:[],
      stateData:[
        {
          id: 1,
          name: "进行中",
        },
         {
          id: 2,
          name: "已超期",
        },
         {
          id: 3,
          name: "已完成",
        }
      ],
      state:"",
      personalData: {},
      textarea: "",
      dialog:{
         addTasks:false,
         changeState:false ,
         openVideo:false
      },
      visible:false,
      visible2:false,
      visible3:false,
      showIcon:false,
      isChoice:true,
      showButton:false,
      isShowRight:true,
      leftNumber:12,
      showRoFalse:"隐藏动态",
      current:1,
      offset:10,
      dateId:null,
      playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始播放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: "https://blz-videos.nosdn.127.net/1/OverWatch/OVR-S03_E03_McCree_REUNION_zhCN_1080P_mb78.mp4" //url地址
        }],
        poster: "http://tower-img.1357.cn/file/2018-08-31/1224708298227540.jpg?x-oss-process=image/resize,m_lfit,w_640,h_640/watermark,type_ZmFuZ3poZW5na2FpdGk=,color_FFFFFF,type_ZmFuZ3poZW5naGVpdGk,size_22,text_6ZmI5ZSQ6K-X5p6XICAyMDE4LTA4LTMxIDE3OjU3", //你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
    }
    };
  },
  methods: {

    //点击查看详情
    lookInfo(data) {
      this.dateId = data.planId;
      console.log(this.dateId,"data.id");
      console.log()
      this.refreshLists();

    },

    //切换顶部tab标签
    handleClick(tab) {
      var data = new Date();
      console.log(tab.name);
    },

    //打开添加任务弹框
    addTask(){
        this.dialog.addTasks = true;
    },

    //打开排序
    changeSort(){
        this.visible = false;
    },

    //打开分组
    changeTeam(){
        this.visible2 = false;
    },

    //打开负责人
    changePeople(){
         this.visible3 = false;
    },

    //打开步骤
    changeStates(){
        console.log(111);
       this.dialog.changeState = true;
    },

    //选择步骤
    clickState(item){
      this.showIcon = item.id;
      this.isChoice = false;
    },

    //选择完成点击确定
    commit(){
      this.dialog.changeState = false; 
      this.showIcon = false;
      this.isChoice = true; 
    },

    //关闭选择步骤弹框
    close(){
      this.dialog.changeState = false;
      this.showIcon = false;
      this.isChoice = true;  
    },

    //输入任务描述
    focusInput(){
      this.showButton = true;
    },

    //查询任务列表
    refreshList() {
      return new Promise((resolve,reject)=>{
        getPlanTaskPage({
          current:this.current,
          offset:this.offset,
      })
        .then(response => {
          if(response.body.rows == undefined){
              this.tableData = [];
          }
          else{
              this.tableData = response.body.rows;
          }
          
          resolve();
        })
        .catch(error => {
          console.log(error);
          reject();
        });
      })
      
    },
    
    //根据id查询进度计划详情
    refreshLists() {
      getConstructPlanDetailById(this.dateId )
        .then(response => {
          this.personalData = response.body;
        })
        .catch(error => {
          console.log(error);
        });

       getConstructLogPage({
           current:this.current,
           offset:this.offset,
           planId:this.dateId
       })
        .then(response => {
          this.tableDatas = response.body.rows;
        })
        .catch(error => {
          console.log(error);
        });
    },

    //隐藏/显示动态
    hideRight(){
        if( this.isShowRight == false){
            this.isShowRight = true;
            this.leftNumber = 12;
            this.showRoFalse = "隐藏动态"
        }
        else if(this.isShowRight == true){
            this.isShowRight = false;
            this.leftNumber = 24;
            this.showRoFalse = "显示动态";
        }  
    },

    //子向父传值
    showChildMsg(data){
        console.log(data,"这是传的数据");
    },

    //关闭施工视频弹框
    closeRest(){
        this.$refs.videoPlayer.player.pause()
    }
  },
  async created() {
    
    await this.refreshList();
    if(this.tableData.length >= 1){
        this.dateId = this.tableData[0].planId;
        this.refreshLists();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "taskManagement.scss";
</style>
