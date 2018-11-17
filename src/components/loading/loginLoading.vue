<template>
<!--等待页面-->
<div class="loginLoading" style="width:100%;height:100%;"   v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>
</template>

<script>
import { mapActions } from 'vuex';
import { setTimeout } from 'timers';
export default {
  name: "loginLoading",
  data() {
    return {
        loading:true
    };
  },
  methods: {
    ...mapActions([
      'getlistOrgInfoList'
    ]),

    //获取用户token
    getUrlParam(k) {
    var regExp = new RegExp('([?]|&)' + k + '=([^&]*)(&|$)');
    var result = window.location.href.match(regExp);
    if (result) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }
    },
  },
  created() {
      
    //有token再更新userToken
    let url = window.location.href;
    if(url.indexOf("?")!=-1){
        this.$store.dispatch('getUserToken',this.getUrlParam('token'));
    };
    setTimeout(()=>{
        this.getlistOrgInfoList();
        this.loading = false;
        this.$router.push('/home');
    },0)
  }
};
</script>
