<template>
<!--任务预警-->
<div class="progressPicture" style="height:100%;">
     <iframe :src="url" style="width:100%;height:100%;overflow:hidden;"  frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "progressPicture",
  data() {
    return {
     url:'../../../static/guant/gantt.html'
    };
  },
  methods: {
  
  },
  created() {
  }
};
</script>
