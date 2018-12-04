<template>
<!-- 新增子项 -->
<div class="addSubChid">
  <el-form :model="dataModel" :rules="rules" ref="addSubChid" label-width="120px">
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
import { addSubsection } from "../api/system_interface.js";
export default {
  name: "addSubChid",
  data() {
    return {
      dataModel: {
        // id: null,
        parentId: null,
        projectType: "",
        remark: "",
        sort: 1,
        subName: ""
      },
      //数据校验
      rules: {
        subName: [{ required: true, message: "分部分项名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    /**
     * 反显数据
     */
    update(data) {
      this.dataModel.parentId = data.id;
      this.dataModel.projectType = data.projectType;
    },
    //重置方法
    reset() {
      const addSubChid = this.$refs["addSubChid"];
      addSubChid.resetFields();
    },
    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },
    //点击提交
    commit() {
      this.$refs["addSubChid"].validate(valid => {
        if (!valid) {
          return;
        }
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
            this.$message.error(error);
          });
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
