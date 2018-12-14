<template>
<!-- 新增/修改分部分项 -->
<div class="addArea">
    <el-button @click="close"  type="primary" size="small">关闭</el-button>
    <div class="importDiv">
        <el-cascader :options="listOrgInfoList" v-model="projectArry" :props="defaultProp" size="small" placeholder="请选择项目" @change="chageType" :show-all-levels="false"></el-cascader>
        <el-upload accept="" style="display:inline-block;vertical-align: top;" action="" :http-request="uploadImg" :show-file-list="false" :disabled="isOver">
          <el-button size="small" type="success" :disabled="isOver">添加文件</el-button>
        </el-upload>
        <el-table :data="tableData" style="width: 100%;margin:20px 0;" border >
            <el-table-column prop="name" label="名称" align="center" min-width="160"></el-table-column>
            <el-table-column prop="size" label="大小" align="center" min-width="160"></el-table-column>
            <el-table-column prop="progress" label="上传状态" align="center" min-width="160">
               <template slot-scope="scope">
                  <span>{{scope.row.progress}}%</span>
               </template>
            </el-table-column>
        </el-table>
        <div class="promptInfo">支持的文件格式： rvt 、 rfa 、 dwg 、 dxf 、 skp 、 ifc 、 dgn 、 obj 、 stl 、 3ds 、 dae 、 ply 、 igms</div>
        <div class="promptInfo">支持的文件大小：1024M</div>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { uploadBIM,uploadfile,uploadDrawing } from "../api/system_interface.js";
export default {
  name: "addArea",
  data() {
    return {
      projectArry:[],
      tableData:[],
      progressNum:"",      
      uploadUpdateBIm:{
        fileUrl:'',
        name:'',
        projectId:''
      },
      isOver:true,
      defaultProp: {
        children: "child",
        label: "name",
        value: "id"
      },
    };
  },
  computed: {
    ...mapState([
     'listOrgInfoList'
    ]),
  },
  methods: {

    ...mapActions([
      'getlistOrgInfoList'
    ]),

    update(){
      this.getlistOrgInfoList();
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.tableData = [];
      this.uploadUpdateBIm = {};
      this.projectArry = [];
      this.isOver = true; 
      this.$emit("refreshData");
    },

     //切换项目查询形象进度统计项
    chageType(){
      if(this.projectArry.length >= 1){
         this.uploadUpdateBIm.projectId = this.projectArry[this.projectArry.length - 1];
         this.isOver = false;
      }
      else{
        this.isOver = true;
      }
    
    },

    uploadImg (f) { 
        this.isOver = true;       
        var importInfo = {};
        importInfo.name = f.file.name;
        console.log(f.file.size);
        importInfo.size = (f.file.size/1024/1024).toFixed(2) + 'M';
        importInfo.progress = 0;
        this.uploadUpdateBIm.name = f.file.name;
        this.tableData.unshift(importInfo);
        uploadfile(f.file,this.ceshicall,this.progressInfo); 
    },

    ceshicall(data){
        this.$message.success("上传成功!");
        this.uploadUpdateBIm.fileUrl = data;
        this.isOver = false;
        uploadDrawing(this.uploadUpdateBIm)
        .then(response => {
          if (response.code == "200") {
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
        });
    },

    progressInfo(data){
        this.tableData[0].progress = data;
        this.progressNum = data;
    }
  },
  created(){
    // if(sessionStorage.getItem("selectArry")){
    //   this.projectArry = JSON.parse(sessionStorage.getItem("selectArry"));
    //   this.uploadUpdateBIm.projectId = this.projectArry[this.projectArry.length - 1];
    // }
    this.getlistOrgInfoList();
  }
};
</script>
<style lang="scss" scoped>
.clickBtn {
  text-align: center;
}
.importDiv{
  padding: 20px;
  border: 1px solid #e4e7ed;
  margin-top: 20px;
}
.promptInfo{
  color: #999;
}
</style>
