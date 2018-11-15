<template>
  <div id="hompage">   
       <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Home',
  provide() {
    return {
    }
  },
  data () {
    return {
      msg: 'I am HelloWorld.vue page',
      message:'HelloWorld',

    }
  },
  methods:{}
}
</script>

<style lang="scss" scoped>
  @import "Home.scss";
</style>
