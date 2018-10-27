<template>
  <div class="hello">
   <button @click="gotest">点击</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'I am HelloWorld.vue page',
      message:'HelloWorld'
    }
  },
  props:{
        message1:String
  },
  methods:{
     gotest:function(){
      this.$router.replace('/Login');
    }
  },
  watch: {
      message: function (val, oldVal) {
          // 这里就可以通过 val 的值变更来确定去向
          switch(val){
              case 'HelloWorld':
                  this.$router.replace('/HelloWorld/');
              break;
              case 'CeShi':
                  this.$router.replace('/HelloWorld/CeShi');
              break;
              case 'MySelf':
                  this.$router.replace('/HelloWorld/MySelf');
              break;
              case 'CeShi1':
                  this.$router.replace('/CeShi1');
              break;
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
