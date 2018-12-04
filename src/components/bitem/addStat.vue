<template>
<!-- 新增/修改单位 -->
<div class="addStat">
  <el-form :model="dataModel" :rules="rules" ref="addStat" label-width="100px">
        <el-form-item label="单位名称：" prop="unitName">
          <el-input v-model="dataModel.unitName"></el-input>
        </el-form-item>
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
import { addUnit, updateUnitById } from "../api/system_interface.js";
export default {
  name: "addStat",
  data() {
    return {
      dataModel: {
        unitName: "",
        id: "",
        remark: ""
      },
      //数据校验
      rules: {
        unitName: [
          { required: true, message: "请输入单位名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    /**
     * 反显数据
     */
    update(data) {
      if (!data.id) return;
      this.dataModel.unitName = data.unitName;
      this.dataModel.id = data.id;
      this.dataModel.remark = data.remark;
      console.log(this.dataModel, "this.dataModel");
    },
    //重置方法
    reset() {
      const AddStat = this.$refs["addStat"];
      AddStat.resetFields();
      this.dataModel.unitName = "";
      this.dataModel.id = "";
      this.dataModel.remark = "";
    },
    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },
    //点击提交
    commit() {
      console.log(this.dataModel, "this.dataModel");
      this.$refs["addStat"].validate(valid => {
        if (!valid) {
          return;
        }
        //根据是否有数据传入决定执行新增还是修改
        const result = this.dataModel.id ? this.updateStat() : this.addStat();
      });
    },
    //新增单位
    addStat() {
      addUnit(this.dataModel)
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
          // this.$message.error(error);
          return false;
        });
      return true;
      // this.$axios
      //   .post("http://172.16.7.135/basicData/addUnit", this.dataModel)
      //   .then(response => {
      //     if (response.data.code == "200") {
      //       this.$message.success("添加成功!");
      //       this.close();
      //       this.$emit("refreshData");
      //     } else {
      //       this.$message.error(response.data.msg);
      //     }
      //   })
      //   .catch(error => {
      //     return false;
      //   });
    },
    //修改单位
    updateStat() {
      updateUnitById(this.dataModel)
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
          // this.$message.error(error);
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
