<template>
  <div class="mainMenu" @click="initFn">
       <div class="header">
        <div class="log">生产进度管控系统</div>
        <div class="log" style="font-size:14px;">所属组织：</div>
        <div class="changeorg">
            <el-cascader change-on-select :options="listOrgInfoList"  :show-all-levels="false" filterable v-model="projectArry" :props="defaultPropss" size="small" placeholder="请选择项目" @change="changeProject"></el-cascader>
        </div>
        <div class="logout" @click="getOut">退出</div>
        <div class="scaleBtn" @click.stop="scaleFn">全屏</div>
      </div>
     <div class="left_menu" v-bind:class="main_menu">
        <div class="left_inner_menu">
          <div class="left_show_menu">
            <!-- <div class="menu_logo">
             
                 <img src="../../assets/smp.png"  style="height:100%;margin-right:30px;"/>
             
            </div> -->
            <!-- <div class="p_menu" @click.stop="main_menuFn">
              <div class="pre_icon">
                <i class="el-icon-menu iconfont"></i>
              </div>
              <div class="menu_text" style="margin-left: -15px;">产品与服务</div>
              <div class="after_icon">
                <i class="icon-gengduo1 iconfont"></i>
              </div>
            </div> -->
            <div class="n_menu_container">
              <div class="n_menu" v-for="(some,index) in menuData" :key="some.id" @click="showChild(some.path,index)" :class="{ checkEdColor:changeList == index}">
                <div class="pre_icon"><img :src="some.icon" alt=""></div>
                <div class="menu_text">{{some.text}}</div>
                <!-- <div class="after_icon">
                  <span class="close_icon">{{some.close}}</span>
                </div> -->
              </div>
            </div>
            
            
          </div>
        </div>
        
      </div>
    <div class="all_menu_container" v-bind:class="main_menu">
      <div class="content_inner" >
        <div class="left_inner">
          <div class="top_search">
            <div id="SpecialSearch" @click.stop="testFn">
              <el-input placeholder="请输入关键字" v-model="input3" >
                <el-button slot="prepend" icon="iconfont icon-sousuo4"></el-button>
              </el-input>
            </div>
          </div>
          <div class="menu_content">
            <div class="menu_card_recent">
              <div class="menu_head">最近使用</div>
              <div class="childen_menu">
                  <div class="child_menu">专有网络</div>
                  <div class="child_menu">专有网络</div>
                  <div class="child_menu">专有网络</div>
              </div>
            </div >
            <div style="width:185px;float:left;">
               <div class="menu_card_recent" >
                <div class="menu_head">BIM应用</div>
                <div class="childen_menu">
                    <div class="child_menu">BIM进度系统</div>
                    <div class="child_menu">BIM可视化</div>
                    <div class="child_menu">BIM多方协同</div>
                </div>
              </div>
              <div class="menu_card_recent" >
                <div class="menu_head">智能硬件应用</div>
                <div class="childen_menu">
                    <div class="child_menu">硬件数据对接</div>
                    <div class="child_menu">对接数据分析</div>
                    <div class="child_menu">AI人工智能</div>
                </div>
              </div>
            </div>
           <div style="width:185px;float:left;">
              <div class="menu_card_recent" >
                <div class="menu_head">协同应用</div>
                <div class="childen_menu">
                    <div class="child_menu">通讯录</div>
                    <div class="child_menu">资料云盘</div>
                    <div class="child_menu">图纸管理</div>
                    <div class="child_menu">会议管理</div>
                    <div class="child_menu">办公审批</div>
                </div>
              </div>
              <div class="menu_card_recent" >
                <div class="menu_head">SPM微服务集成平台</div>
                <div class="childen_menu">
                    <div class="child_menu">容器化技术升级</div>
                    <div class="child_menu">开放APP商城</div>
                </div>
              </div>
            </div>
            <div style="width:185px;float:left;">
              <div class="menu_card_recent" >
                <div class="menu_head">现场指挥中心</div>
                <div class="childen_menu">
                    <div class="child_menu">项目BI看板</div>
                    <div class="child_menu">项目物联检测</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right_inner">
          <div class="icon_close">
            <i class="iconfont icon-shanchu9"></i>
          </div>
          <div class="tabs_container">
            <div class="tabs_all">
              <a href="javascript:;" class="tabs_list">BIM应用</a>
              <a href="javascript:;" class="tabs_list">协同应用</a>
              <a href="javascript:;" class="tabs_list">现场指挥中心</a>
              <a href="javascript:;" class="tabs_list">智能硬件应用</a>
              <a href="javascript:;" class="tabs_list">SPM微服务集成平台</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="right_content">
       <router-view v-if="isRouterAlive"> </router-view>
      </div>
    </div>
    <el-dialog title="请切换租户"  :visible.sync="dialog.checkList" width="500px" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form  :rules="rules" ref="checkList" label-width="90px" style="width:100%;">
        <el-form-item label="请选择组织:" prop="typeName" >
          <el-cascader change-on-select :options="secondTypeList"  :show-all-levels="false" filterable v-model="projectArry" :props="defaultPropss" size="small" placeholder="请选择项目" style="width:100%;"></el-cascader>
        </el-form-item>
      </el-form>
      <div class="clickBtn">
        <el-button @click="commit" size="small" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { changeOrg,listPermissionCode,getSessionInfo,loginUrl} from "../api/system_interface.js";
import home from "../home/home.vue";
import { setTimeout } from 'timers';
export default {
  name: 'mainMenu',
    components:{
    home
  },
  data () {
    return {
      input3:'',
      message:'mainMenu',
      main_menu:'',
      isScale:false,
      menuData:[
        {id:'1',icon:require('../../assets/progressmenu.png'),text:'生产形象进度',path:'/home'},
        {id:'2',icon:require('../../assets/planProgress.png'),text:'生产计划进度',path:'/home1'},
        {id:'3',icon:require('../../assets/planProgress.png'),text:'BIM应用',path:'/bimHome'},
      ],
        defaultPropss:{
        children: "child",
        label: "name",
        value: "id"
      },
      rules: {
        projectArry: [
          { required: true, message: "请选择组织", trigger: "blur" }
        ]
      },
      projectId:null,
      isRouterAlive:true,
      projectArry:[],
      projectToken:'',
      orangeType:'',
      dialog:{
        checkList:false
      },
      firstProject:[],
      secondTypeList:[],
      changeList:0
    }
  },
  computed: {
    ...mapState([
     'listOrgInfoList'
    ]),
  },
  methods:{
       ...mapActions([
      'getlistOrgInfoList'
      ]),
      initFn:function(){
         this.main_menu = '';
      },
      getOut(){
          window.location.href= loginUrl();
      },
      main_menuFn:function(){
        
        if(this.main_menu){
          this.main_menu = ''
        }else{
          this.main_menu = 'active'
        }
      },
      showChild:function(path,index){
          path && this.$router.replace(path);
          this.changeList = index;
      },
      error:function(){

      },
      scaleFn:function(){
        if(this.isScale){
          //open
          document.exitFullscreen && document.exitFullscreen() ;
          document.mozCancelFullScreen && document.mozCancelFullScreen();
          document.webkitCancelFullScreen && document.webkitCancelFullScreen();
          document.msExitFullscreen &&document.msExitFullscreen();
          this.isScale = false;
        }else{
          //close
          let docElm = document.documentElement;
          docElm.requestFullscreen && docElm.requestFullscreen(); //w3c
          docElm.mozRequestFullScreen &&  docElm.mozRequestFullScreen(); //FireFox  
          docElm.webkitRequestFullScreen &&  docElm.webkitRequestFullScreen(); //Chrome 
          docElm.msRequestFullscreen && docElm.msRequestFullscreen();//IE11
          this.isScale = true;
        }
      },
      commit(){
        if(JSON.stringify(this.firstProject) == JSON.stringify(this.projectArry)){
          this.$message.error('请切换层级!');
          return
        }     
        this.dialog.checkList = false;
        this.changeProject();       
      },
      //切换组织
    async changeProject(){
         this.projectId = this.projectArry[this.projectArry.length - 1];
         changeOrg({
           orgId:this.projectId
         })
        .then(response => {
          if (response.code == "200") {     
             this.refreshRouter();
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
      },

    async refreshRouter(){
        await this.getUserInfo();
        // 存储值：将对象转换为Json字符串
        sessionStorage.setItem('selectArry', JSON.stringify(this.projectArry));
        this.isRouterAlive = false;
        this.$nextTick(()=>{
                this.isRouterAlive = true;
        })              
      },

      //获取用户权限码
      // getUserPermission(){
      //    listPermissionCode({})
      //   .then(response => {
      //     if (response.code == "200") {
      //       console.log(response.body,"response.body")            
      //     } else {
      //       this.$message.error(response.msg);
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
      // },

      getSecondTypeLIst(data){
        this.secondTypeList = [];
        var dataArr = data;
        for(var i=0;i<dataArr.length;i++){
          if(dataArr[i].type == 2){
            this.secondTypeList.push(dataArr[i]);
          }
        }
      },

      //获取登陆用户信息
      getUserInfo(){

        return new Promise((resolve, reject) => {
        getSessionInfo({})
          .then(response => {
              if (response.code == "200") {
              //获取父级id
              let objects = this.$common.initTree(this.listOrgInfoList);
              this.getSecondTypeLIst(objects);
              this.projectArry  = this.$common.findParent(objects,response.body.chOrgId);
              // 存储值：将对象转换为Json字符串
              sessionStorage.setItem('selectArry', JSON.stringify(this.projectArry));
              sessionStorage.setItem('companyType', response.body.chOrgType);
              this.orgType =  response.body.chOrgType;
              this.openDialodg();     
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
        // getSessionInfo({})
        // .then(response => {
        //   if (response.code == "200") {

        //     //获取父级id
        //     let objects = this.$common.initTree(this.listOrgInfoList);
        //     this.projectArry  = this.$common.findParent(objects,response.body.chOrgId);

        //     // 存储值：将对象转换为Json字符串
        //     sessionStorage.setItem('selectArry', JSON.stringify(this.projectArry));
        //     sessionStorage.setItem('companyType', response.body.chOrgType);           
        //   } else {
        //     this.$message.error(response.msg);
        //   }
        // })
        // .catch(error => {
        //   console.log(error);
        // });
      },

      // 打开弹框
       openDialodg(){
        if(this.orgType == 1){
          this.dialog.checkList = true;
        }
      },
      

      //获取用户token
      getUrlParam(k) {
      var regExp = new RegExp('([?]|&)' + k + '=([^&]*)(&|$)');
      var result = window.location.href.match(regExp);
      if (result) {
          return decodeURIComponent(result[2]);
      } else {
          return null;
      }
      }
  },
  async created(){
     //有token再更新userToken
    let url = window.location.href;
    if(url.indexOf("?")!=-1){
        this.$store.dispatch('getUserToken',this.getUrlParam('token'));
        sessionStorage.setItem("userToken",this.getUrlParam('token'));
        console.log(this.getUrlParam('token'),"this.getUrlParam('token')");
    };

    await this.getlistOrgInfoList();

    if(sessionStorage.getItem("selectArry")){
      this.projectArry = JSON.parse(sessionStorage.getItem("selectArry"));
    }
    await this.getUserInfo();
    this.firstProject = this.projectArry;
    this.openDialodg();
  }
}
</script>
<style lang="scss" scoped>
  @import "mainMenu.scss";
  .checkEdColor{
    background-color: #191616;
  }
</style>
<style lang="scss">
   .el-cascader-menu{
    height: 250px !important;
  }
</style>

