<template>
<!-- 新增/修改类别 -->
<div class="addCategory">
  <el-form :model="dataModel" :rules="rules" ref="addCategory" label-width="55px">
        <el-row>
          <el-col :span="12">
             <el-form-item label="编码" prop="code">
               <el-input v-model="dataModel.code" size="small"></el-input>
             </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="名称" prop="name">
               <el-input v-model="dataModel.name" size="small"></el-input>
             </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注" prop="desp">
          <el-input v-model="dataModel.desp" size="small"></el-input>
        </el-form-item>
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary" :disabled="isSuccess">保存</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: "addCategory",
  data() {
    return {
      dataModel: {
        code: "",
        name: "",
        desp: "",
        id: ""
      },
      //数据校验
      rules: {
        code: [{ required: true, message: "请输入编码", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      isSuccess:false
    };
  },
  methods: {
    /**
     * 反显数据
     */
    update(data) {
      if (!data.id) return;
      this.dataModel.name = data.name;
      this.dataModel.code = data.code;
      this.dataModel.desp = data.desp;
      this.dataModel.id = data.id;
      console.log(this.dataModel, "this.dataModel");
    },
    //重置方法
    reset() {
      const AddStat = this.$refs["addCategory"];
      AddStat.resetFields();
      this.dataModel.name = "";
      this.dataModel.code = "";
      this.dataModel.desp = "";
      this.dataModel.id = null;
      this.isSuccess = false;
    },
    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },
    //点击提交
    commit() {
      this.$refs["addCategory"].validate(valid => {
        if (!valid) {
          return;
        }
        this.isSuccess = true;
        this.$emit("close");
        this.reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.clickBtn {
  text-align: center;
}
</style>
