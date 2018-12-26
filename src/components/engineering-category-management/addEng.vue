<template>
<!-- 新增/修改工程类别 -->
<div class="addEng">
  <el-form :model="dataModel" :rules="rules" ref="addEng" label-width="100px">
        <el-form-item label="类别名称：" prop="typeName">
          <el-input v-model="dataModel.typeName"></el-input>
        </el-form-item>
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary" :disabled="isSuccess">保存</el-button>
  </div>
</div>
</template>

<script>
import { addProjectType, updateProjectType } from "../api/system_interface.js";
export default {
  name: "addEng",
  data() {
    return {
      dataModel: {
        typeName: "",
        id: ""
      },
      //数据校验
      rules: {
        typeName: [
          { required: true, message: "请输入类别名称", trigger: "blur" }
        ]
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
      this.dataModel.typeName = data.typeName;
      this.dataModel.id = data.id;
    },

    //重置方法
    reset() {
      const addEng = this.$refs["addEng"];
      addEng.resetFields();
      this.dataModel.typeName = "";
      this.dataModel.id = "";
      this.isSuccess = false;
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },

    //点击提交
    commit() {
      this.$refs["addEng"].validate(valid => {
        if (!valid) {
          return;
        }
        this.isSuccess = true;
        //根据是否有数据传入决定执行新增还是修改
        const result = this.dataModel.id ? this.updateEng() : this.addEng();
      });
    },

    //新增类别
    addEng() {
      addProjectType(this.dataModel)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("添加成功!");
            this.close();
            this.$emit("refreshData");
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          this.isSuccess = false;
          return false;
        });
      return true;
    },

    //修改类别
    updateEng() {
      updateProjectType(this.dataModel)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("修改成功!");
            this.close();
            this.$emit("refreshData");
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          this.isSuccess = false;
          return false;
        });
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.clickBtn {
  text-align: center;
}
</style>
