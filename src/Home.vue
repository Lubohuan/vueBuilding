<template>
  <div id="hompage">
   
       <router-view/>
       <lg-preview></lg-preview>
  </div>
</template>

<script>
export default {
  name: 'Home',
  provide() {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      msg: 'I am HelloWorld.vue page',
      message:'HelloWorld',

    }
  },
  methods:{
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      })
    },
    gotest:function(){
      this.$router.replace('/mainMenu/text2/text2');
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "Home.scss";
</style>
