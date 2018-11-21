<template>
<!-- 新增/修改分部分项 -->
<div class="addSubsection">
  <el-form :model="dataModel" :rules="rules" ref="addSubsection" label-width="120px">
        <el-form-item label="分部分项名称：" prop="subName">
          <el-input v-model="dataModel.subName"></el-input>
        </el-form-item>
         <!-- <el-form-item label="备注信息：" prop="remark">
          <el-input v-model="dataModel.remark"></el-input>
        </el-form-item> -->
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
import { addSubsection, updateSubsection } from "../api/upload.js";
export default {
  name: "addSubsection",
  data() {
    return {
      dataModel: {
        projectType: 1,
        remark: "",
        sort: 1,
        subName: ""
      },
      //数据校验
      rules: {
        subName: [
          { required: true, message: "分部分项名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    /**
     * 反显数据
     */
    update(data) {
      this.dataModel.projectType = data.projectType;
      if (!data.id) return;
      this.dataModel = {...data};
    },
    //重置方法
    reset() {
      const addSubsection = this.$refs["addSubsection"];
      addSubsection.resetFields();
      this.dataModel.id = null;
      this.dataModel.parentId = null;
      this.dataModel.projectType = "";
      this.dataModel.remark = "";
      this.dataModel.sort = 1;
      this.dataModel.subName = "";
    },
    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },
    //点击提交
    commit() {
      console.log(this.dataModel, "this.dataModel");
      this.$refs["addSubsection"].validate(valid => {
        if (!valid) {
          return;
        }
        //根据是否有数据传入决定执行新增还是修改
        const result = this.dataModel.id ? this.updateSubsections() : this.addSubsections();
      });
    },
    //添加分部分项
    addSubsections() {
      addSubsection(this.dataModel)
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
          console.log(error);
          return false;
        });
      return true;
    },
    //修改分部分项
    updateSubsections() {
      updateSubsection(this.dataModel)
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
          console.log(error);
          return false;
        });
      return true;
      // this.$axios
      //   .put("http://172.16.7.135/basicData/updateUnitById", this.dataModel)
      //   .then(response => {
      //     if (response.data && response.data.code == "200") {
      //       this.$message.success("修改成功!");
      //       this.close();
      //       this.$emit("refreshData");
      //     } else {
      //       this.$message.error(response.data.msg);
      //     }
      //   })
      //   .catch(error => {
      //     this.$message.error(error);
      //     return false;
      //   });
      // return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.clickBtn {
  text-align: center;
}
</style>
