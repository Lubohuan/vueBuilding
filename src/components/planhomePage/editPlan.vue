<template>
<!-- 编辑项目 -->
<div class="editPlan">
  <el-form :model="dataModel" :rules="rules" ref="editPlan" label-width="120px" style="width:94%;">
        <!-- <el-form-item label="所属组织：" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName"></el-input>
        </el-form-item> -->
        <el-form-item label="项目名称：" prop="projectName">
          <el-input size="small" v-model="dataModel.projectName"></el-input>
        </el-form-item>
        <el-form-item label="项目经理：" prop="projectManager">
          <el-input size="small" v-model="dataModel.projectManager"></el-input>
        </el-form-item>
        <el-form-item label="合同工期：" prop="setvalue">
          <el-date-picker value-format="yyyy-MM-dd" size="small" v-model="dataModel.setvalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="项目概括：" prop="projectOverview">
          <el-input type="textarea"  :autosize="{minRows:2}"  v-model="dataModel.projectOverview"></el-input>
        </el-form-item>
        <!-- <el-form-item label="项目简称：" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName"></el-input>
        </el-form-item>
        <el-form-item label="项目编码：" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName"></el-input>
        </el-form-item>
        <el-form-item label="是否为重点项目：" prop="radio" style="margin-bottom:0;">
          <el-radio-group v-model="radio" style="width:110px;">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName"></el-input>
        </el-form-item>
        <el-form-item label="项目效果图：" prop="typeName">
          <el-upload  list-type="picture"  action="" :http-request="uploadImg" :on-remove="handleRemove" :on-change="handleImgChange" :file-list="imgList"><el-button size="small" type="primary">点击上传</el-button></el-upload>
        </el-form-item>
        <el-form-item label="项目地址：" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName"></el-input>
        </el-form-item>
        <el-form-item label="" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="请填写详细地址"></el-input>
        </el-form-item>
         <el-form-item label="工程类别" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="工程类别"></el-input>
        </el-form-item>
        <el-form-item label="工程规模" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="工程规模"></el-input>
        </el-form-item>
        <el-form-item label="工程造价" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="工程造价"></el-input>
        </el-form-item>
        <el-form-item label="工程状态" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="工程状态"></el-input>
        </el-form-item>
        <el-form-item label="合同状态" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="合同状态"></el-input>
        </el-form-item>
        <el-form-item label="开工日期" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="开工日期"></el-input>
        </el-form-item>
        <el-form-item label="进度状态" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="进度状态"></el-input>
        </el-form-item>
        <el-form-item label="中标单位" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="中标单位"></el-input>
        </el-form-item>
         <el-form-item label="建设单位" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="建设单位"></el-input>
        </el-form-item>
         <el-form-item label="设计单位" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="设计单位"></el-input>
        </el-form-item>
         <el-form-item label="监理单位" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="监理单位"></el-input>
        </el-form-item>
         <el-form-item label="工程概括" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName" placeholder="工程概括"></el-input>
        </el-form-item> -->
        
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
import { addProjectType, updateProjectInfo } from "../api/system_interface.js";
export default {
  name: "editPlan",
  data() {
    return {
      dataModel: {
        setvalue:'',
        projectId:'',
        projectName:"",
        projectManager:"",
        projectOverview:"",
        contractStartTime:"",
        contractEndTime:""
      },
      radio: "",
      //数据校验
      rules: {
        projectName: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        projectManager: [{ required: true, message: "请输入项目经理名称", trigger: "blur" }],
        setvalue:[{ required: true, message: "请选择合同工期", trigger: "blur" }]
      }
    };
  },
  methods: {

    update(data){
      // this.dataModel = {...data};
      this.dataModel.projectId = data.projectId;
      var dateArr = [];
      dateArr.push(data.contractStartTime);
      dateArr.push(data.contractEndTime);
      this.dataModel.setvalue = dateArr;
      this.dataModel.projectName = data.projectName;
      this.dataModel.projectManager =data.projectManager;
      this.dataModel.projectOverview =data.projectOverview;
    },
    //重置方法
    reset() {
      const editPlan = this.$refs["editPlan"];
      editPlan.resetFields();
      this.dataModel.setvalue = '';
      this.dataModel.projectId = "";
      this.dataModel.projectName ="";
      this.dataModel.projectManager ="";
      this.dataModel.projectOverview ="";
      this.dataModel.contractStartTime ="";
      this.dataModel.contractEndTime ="";
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },
    handleImgChange(){
      
    },
    //点击提交
    commit() {
      this.$refs["editPlan"].validate(valid => {
        if (!valid) {
          return;
        }
      this.dataModel.contractStartTime = this.dataModel.setvalue[0];
      this.dataModel.contractEndTime = this.dataModel.setvalue[1];
        updateProjectInfo(this.dataModel)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("编辑成功!");
            this.close();
            this.$emit("refreshData");
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
        });
      });
    },

  }
};
</script>
<style lang="scss" scoped>
.clickBtn {
  text-align: center;
}
</style>
