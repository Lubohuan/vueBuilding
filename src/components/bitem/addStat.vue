<template>
<!-- 新增/修改单位 -->
<div class="addStat">
  <el-form :model="dataModel" :rules="rules" ref="addStat" label-width="100px">
        <el-form-item label="单位名称：" prop="name">
          <el-input v-model="dataModel.name"></el-input>
        </el-form-item>
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: "addStat",
  data() {
    return {
      dataModel: {
        name: ""
      },
      //数据校验
      rules: {
        name: [{ required: true, message: "请输入单位名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    /**
     * 反显数据
     */
    update(data) {
      if (!data.id) return;
      this.dataModel.name = data.name;
    },
    //重置方法
    reset() {
      const AddStat = this.$refs["addStat"];
      AddStat.resetFields();
      this.dataModel.name = "";
    },
    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },
    //点击提交
    commit() {
      this.$refs["addStat"].validate(valid => {
        if (!valid) {
          return;
        }
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
