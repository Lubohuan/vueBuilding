<template>
<!-- 新增/修改形象进度统计项 -->
<div class="addProgress">
  <el-form :model="dataModel" :rules="rules" ref="addProgress" label-width="125px">
    <el-form-item label="项目名称：" prop="code">
        <el-input v-model="dataModel.code" size="small"></el-input>
    </el-form-item>
    <el-form-item label="施工区域" prop="name">
        <el-input v-model="dataModel.name" size="small"></el-input>
    </el-form-item>
    <el-form-item label="形象进度统计项：" prop="desp">
        <el-input v-model="dataModel.desp" size="small"></el-input>
    </el-form-item>
    <el-form-item label="选择分部分项：" prop="desp">
        <el-input v-model="dataModel.desp" size="small"></el-input>
    </el-form-item>
    <el-form-item label="形象单位：" prop="desp">
        <el-input v-model="dataModel.desp" size="small"></el-input>
    </el-form-item>
    <el-row>
          <el-col :span="17">
            <el-form-item label="预算工程量：" prop="desp" style="width:96%">
              <el-input v-model="dataModel.desp" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="是否自动计算:" prop="radio">
              <el-radio-group v-model="radio" style="width:110px;">
               <el-radio label="0">是</el-radio>
               <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: "addProgress",
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
      radio:""
    };
  },
  methods: {
    /**
     反显数据
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
      const AddStat = this.$refs["addProgress"];
      AddStat.resetFields();
      this.dataModel.name = "";
      this.dataModel.code = "";
      this.dataModel.desp = "";
      this.dataModel.id = null;
    },
    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },
    //点击提交
    commit() {
      this.$refs["addProgress"].validate(valid => {
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
.addProgress{
.clickBtn {
  text-align: center;
}
.el-form-item{
  width: 68%;
}
.el-radio+.el-radio{
  margin-left: 10px;
}
}

</style>
