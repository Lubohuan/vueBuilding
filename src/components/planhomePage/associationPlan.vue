<template>
<!--导入计划 -->
<div class="associationPlan">
  <el-form :model="dataModel" :rules="rules" ref="associationPlan" label-width="100px">
        <el-form-item label="项目名称：" prop="projectArry">
            <el-cascader :options="listOrgInfoList" v-model="dataModel.projectArry" :props="defaultProp" size="small" placeholder="请选择项目" style="width:100%;" clearable></el-cascader>
        </el-form-item>
         <el-form-item label="计划级别：" prop="level">
            <el-select size="small" v-model="dataModel.level" placeholder="请选择：" clearable style="width:100%;">
                <el-option v-for="(item,index) in planTypeList" :label="item.name" :value="item.number" :key="index"></el-option>
            </el-select>
            <span class="warnInfo" v-if="dataModel.level==1">一级进度计划匹配项目总工期，项目下只可建立一个，请确认后再添加！</span>
        </el-form-item>
        <el-form-item label="计划名称：" prop="name">
            <el-input v-model.number="dataModel.name" size="small"></el-input>           
        </el-form-item>      
        <el-form-item label="导入计划：">
          <el-upload accept=".mpp" style="display:inline-block;vertical-align: top;" ref="uploadAdd" action="" :auto-upload="false" :http-request="uploadImg" :on-success="uploadImgSuccess" :on-remove="handleRemove">
            <el-button size="small" type="success">请选择文件</el-button>
          </el-upload> 
        </el-form-item>
               
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { plan,mpp} from "../api/system_interface.js";
export default {
  name: "associationPlan",
  data() {
    return {
      dataModel: {
        projectId: '',
        projectArry:[],
        level:null,
        name:'',
        parentId:'0'
      },
      defaultProp: {
        children: "child",
        label: "name",
        value: "id"
      },
      //数据校验
      rules: {
        projectArry:   [{ required: true, message:  "请选择项目", trigger: "blur" }],
        name:   [{ required: true, message:  "请输入计划名称", trigger: "blur" }],
        level:   [{ required: true, message:  "请选择计划级别", trigger: "change" }]
      
      },
      file:false
    };
  },
  computed: {
    ...mapState([
     'listOrgInfoList',
     'planTypeList'
    ]),
  },
  methods: {
     ...mapActions([
      'getlistOrgInfoList'
    ]),

    update(){
     this.dataModel.projectArry = JSON.parse(sessionStorage.getItem("selectArry"));
    },

    uploadImg (f) {
        //   if(!f){
        //    this.$message.error("请上传文件!");
        //    return
        // }
         this.dataModel.projectId = this.dataModel.projectArry[this.dataModel.projectArry.length - 1];
         let param = new FormData(); //创建form对象
         param.append('file',f.file);//通过append向form对象添加数据
         param.append('level',this.dataModel.level);//添加form表单中其他数据
         param.append('projectId',this.dataModel.projectId);//添加form表单中其他数据
         param.append('planName',this.dataModel.name);//添加form表单中其他数据
         mpp(param)//上传
         .then(response=>{
           if(response.code == "200"){
              this.$message.success("上传成功!");
              this.close();
              this.$emit("refreshData");    
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

    //重置方法
    reset() {
      const associationPlan = this.$refs["associationPlan"];
      associationPlan.resetFields();
      this.dataModel.projectId = null;
      this.dataModel.name = '';
      this.dataModel.level = '';
      this.dataModel.projectArry = [];
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },

    //点击提交
    commit() {
      this.$refs["associationPlan"].validate(valid => {
        if (!valid) {
          return;
        }
        this.$refs.uploadAdd.submit();
        // this.dataModel.projectId = this.dataModel.projectArry[this.dataModel.projectArry.length - 1];
        //  plan(this.dataModel)
        // .then(response => {
        //   if (response.code == "200") {
        //     this.$message.success("添加成功!");
        //     this.close();
        //     this.$emit("refreshData");
        //   } else {
        //     this.$message.error(response.msg);
        //   }
        // })
        // .catch(error => {
        // });
      });
    },

  }
};
</script>
<style lang="scss" scoped>
.clickBtn {
  text-align: center;
}
.warnInfo{
  // color: #feba51;
  color: rgb(64, 158, 255);
}
</style>
