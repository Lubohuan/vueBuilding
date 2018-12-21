<template>
<!--计划任务甘特图-->
<div class="progressPicture" style="height:100%;" ref="gantPicture">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
        <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
        <el-breadcrumb-item>形象进度管理</el-breadcrumb-item>
        <el-breadcrumb-item>形象进度月计划</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button  size="small" type="primary" @click="gaBack">返回</el-button>
      <el-button  size="small" type="primary" @click="addPlan">+ 新增计划</el-button>
      <el-upload accept=".mpp" style="display:inline-block;vertical-align: top;" action="" :http-request="uploadImg" :on-success="uploadImgSuccess" :on-remove="handleRemove">
        <el-button size="small" type="success">导入计划</el-button>
      </el-upload>
      <el-button size="small" type="primary" @click="createPicture">生成缩略图</el-button>

      <el-col :span="24" style="margin-top:10px;">
        <el-tabs v-model="projectType" type="card" @tab-click="handleClick">
          <el-tab-pane :key="item.id" v-for="item in projectTypeList" :label="item.name" :name="item.id"></el-tab-pane>
        </el-tabs>
      </el-col>
     <iframe ref="iframe" id="iframe" src="static/guant/gantt.html" frameborder="0" width="100%" height="85%" ></iframe>

     <!--新增计划-->
    <el-dialog  title="新增计划" :center="true" :visible.sync="dialog.addProgress" width="700px" @close="$refs['addProgress'].reset()">
      <addProgress  v-if="dialog.addProgress" ref="addProgress"  @refreshData="refreshLists"  @close="dialog.addProgress = false" ></addProgress>
    </el-dialog>
</div>
</template>

<script>
import addProgress from"../progressPIcture/addProgress.vue";
import { plans,mpp,baseinUrl } from "../api/system_interface.js";
import html2canvas from 'html2canvas';
export default {
  name: "progressPicture",
  components:{
      addProgress
  },
  data() {
    return {
      projectType: "",
      projectTypeList:[],
      dialog:{
        addProgress:false
      },
      iframeWin: {},
      showGantt:true,
      projectArry:[],
      projectId:'',
      trackList:[
         {
          name:'二级进度计划',
          number:2
        },
         {
          name:'三级进度计划',
          number:3
        }
      ],
      trackLists:[
            {
                name:'一级进度计划',
                number:1
            },
            {
                name:'二级进度计划',
                number:2
            },
            {
                name:'三级进度计划',
                number:3
            }
      ]
    };
  },
  methods: {
    //生成缩略图
    createPicture(){
      html2canvas(this.$refs.gantPicture).then(canvas => { 
                //  this.$refs.gantPicture.append(canvas);  
                 let link = document.createElement('a');
                 link.href = canvas.toDataURL();
                 link.setAttribute('download', '缩略图.png');
                 link.style.display = 'none';
                 document.body.appendChild(link);
                 link.click();
            });
    },

    uploadImg (f) {
         let param = new FormData(); //创建form对象
         param.append('file',f.file);//通过append向form对象添加数据
         param.append('planId',this.projectType);//添加form表单中其他数据
         param.append('projectId',this.projectId);//添加form表单中其他数据
         mpp(param)//上传
         .then(response=>{
           if(response.code == "200"){
              this.$message.success("上传成功!");
              this.sendMessage();
              onSuccess(response.data);              
           }               
         })
         .catch(({err}) => {
           f.onError()
         })   
     },
     uploadImgSuccess(response, file, fileList) {
         // 缓存接口调用所需的文件路径
         console.log('文件上传成功')
        //  this.$message.success("上传成功!");
     },
     handleRemove(file, fileList) {
         // 更新缓存文件
         console.log('文件删除')
     },

     sendMessage () {
      this.iframeWin = this.$refs.iframe.contentWindow;
      // 外部vue向iframe内部传数据
      this.iframeWin.postMessage({
        projectId: this.projectType,
      }, '*')
    },

     //切换工程标签
    handleClick(tab) {
      // console.log(tab.name);
      // this.refreshList();
      this.sendMessage();
      this.showGantt = false;
      this.showGantt = true;

    },

    //打开新增计划弹框
    addPlan(){
      this.dialog.addProgress = true;
      // var levelList = this.projectTypeList.map(v=>v.id);
      // if(this.projectTypeList&&this.projectTypeList.length>=1){    
      //   this.$store.dispatch('getplanTypeList',this.trackList);
      // }else{
      //   this.$store.dispatch('getplanTypeList',this.trackLists);
      // }
     
      
    },

    gaBack(){
      this.$router.go(-1);
    },

     //查询所有计划
    refreshLists(){
       return new Promise((resolve, reject) => {
        plans({})
        .then(response => {
          this.projectTypeList = response.body;
          resolve()
        })
        .catch(error => {
          console.log(error);
          reject();
        });
      })
    },

    //等待查询所有计划完成
    async awaitList(){
      await this.refreshLists();
      if(this.projectTypeList.length >= 1){
         this.projectType = this.projectTypeList[0].id;
      }
      else{
        this.projectType = '';
      }     
      sessionStorage.setItem("planID",this.projectType);
    },

  },
  created() {
    // console.log(this.$route.params.planID,"ss");
    baseinUrl();
    this.awaitList();
    if(sessionStorage.getItem("selectArry")){
      this.projectArry = JSON.parse(sessionStorage.getItem("selectArry"));
      this.projectId = this.projectArry[this.projectArry.length - 1];
    }
     // 在外部vue的window上添加postMessage的监听，并且绑定处理函数handleMessage
    // window.addEventListener('message');
    
  }
};
</script>
