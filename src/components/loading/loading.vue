<template>
<!--等待页面-->
<div class="loading" style="width:100%;height:100%;"   v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "loading",
  data() {
    return {
        loading:true
    };
  },
  methods: {
      ...mapActions([
      'getlistOrgInfoList'
      ]),
  },
  created() {
    setTimeout(() => {
          this.$store.dispatch('getUserToken',this.$route.params.token);
          this.getlistOrgInfoList();
          this.loading = false;
          this.$router.go(-1)
    }, 0);
  }
};
</script>
