<template>
  <div class="mainMenu" @click="initFn">
     <div class="left_menu" v-bind:class="main_menu">
        <div class="left_inner_menu">
          <div class="left_show_menu">
            <div class="menu_logo">
              <img src="../../assets/smp.png"  style="height:100%;margin-right:30px;"/>
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
import home from "../home/home.vue";
export default {
  name: 'mainMenu',
  components:{
    home
  },
  data () {
    return {
      input3:'',
      msg: 'I am mainMenu.vue page',
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
      testFn(){

      },
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
  //@import './layui/css/layui.css'
</style>
