<template>
<!-- 编辑项目 -->
<div class="editPlan">
  <el-form :model="dataModel" :rules="rules" ref="editPlan" label-width="150px" style="width:94%;">
        <el-form-item label="所属组织：" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName"></el-input>
        </el-form-item>
         <el-form-item label="项目名称：" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName"></el-input>
        </el-form-item>
        <el-form-item label="项目经理：" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName"></el-input>
        </el-form-item>
        <el-form-item label="项目简称：" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName"></el-input>
        </el-form-item>
        <el-form-item label="项目编码：" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName"></el-input>
        </el-form-item>
        <el-form-item label="是否为重点项目：" prop="radio">
          <el-radio-group v-model="radio" style="width:110px;">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName"></el-input>
        </el-form-item>
         <el-form-item label="项目效果图：" prop="typeName">
          <el-input size="small" v-model="dataModel.typeName"></el-input>
        </el-form-item>
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
import { addProjectType, updateProjectType } from "../api/upload.js";
export default {
  name: "editPlan",
  data() {
    return {
      dataModel: {
        typeName: "",
        id: ""
      },
      radio: "",
      //数据校验
      rules: {
        typeName: [
          { required: true, message: "请输入类别名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {

    update(data){

    },
    //重置方法
    reset() {
      const editPlan = this.$refs["editPlan"];
      editPlan.resetFields();
      this.dataModel.typeName = "";
      this.dataModel.id = "";
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },

    //点击提交
    commit() {
      this.$refs["editPlan"].validate(valid => {
        if (!valid) {
          return;
        }
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
