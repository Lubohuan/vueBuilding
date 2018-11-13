<template>
  <div class="mainMenu" @click="initFn">
     <div class="left_menu" v-bind:class="main_menu">
        <div class="left_inner_menu">
          <div class="left_show_menu">
            <div class="menu_logo">
             
                 <img src="../../assets/smp.png"  style="height:100%;margin-right:30px;"/>
             
            </div>
            <div class="p_menu" @click.stop="main_menuFn">
              <div class="pre_icon">
                <i class="icon-appstore-fill iconfont"></i>
              </div>
              <div class="menu_text">产品与服务</div>
              <div class="after_icon">
                <i class="icon-gengduo1 iconfont"></i>
              </div>
            </div>
            <div class="n_menu_container">
              <div class="n_menu" v-for="some in menuData" :key="some.id" @click="showChild(some.path)">
                 <div class="pre_icon"><i :class="some.icon"></i></div>
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
      <div class="header">
        <div class="log">智慧工地控制台</div>
        <div class="logout" @click="getOut">退出</div>
        <div class="scaleBtn" @click.stop="scaleFn">全屏</div>

      </div>
      <div class="right_content">
       <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import{ mapState }  from "vuex";
import home from "../home/home.vue";
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
        {id:'1',icon:'el-icon-edit-outline',text:'进度管理',path:'/home'},
      ]
    }
  },
   props:{
        message1:String
  },
  methods:{
      initFn:function(){
         this.main_menu = '';
      },
      getOut(){
         this.$router.replace('/');
      },
      main_menuFn:function(){
        
        if(this.main_menu){
          this.main_menu = ''
        }else{
          this.main_menu = 'active'
        }
      },
      showChild:function(path){
          path && this.$router.replace(path);
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
      }
  },
  
  watch: {
      message: function (val, oldVal) {
      }
  }
}
</script>
<style lang="scss" scoped>
  @import "mainMenu.scss";
</style>
