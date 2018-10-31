<template>
<!-- 新增/修改分部分项 -->
<div class="addArea">
  <el-form :model="dataModel" :rules="rules" ref="addArea" label-width="120px">
        <el-form-item label="区域名称：" prop="regionName">
          <el-input v-model="dataModel.regionName"></el-input>
        </el-form-item>
         <el-form-item label="任务总数" prop="taskTotal">
          <el-input v-model.number="dataModel.taskTotal"></el-input>
        </el-form-item>
         <el-form-item label="已完成" prop="finishCount">
          <el-input v-model.number="dataModel.finishCount"></el-input>
        </el-form-item>
         <el-form-item label="进行中" prop="startCount">
          <el-input v-model.number="dataModel.startCount"></el-input>
        </el-form-item>
         <el-form-item label="逾期任务数" prop="expiryCount">
          <el-input v-model.number="dataModel.expiryCount"></el-input>
        </el-form-item>
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
import { addRegion, updateRegion } from "../api/upload.js";
export default {
  name: "addArea",
  data() {
    return {
      dataModel: {
        expiryCount: null,
        finishCount: null,
        id: null,
        parentId: null,
        projectId: null,
        regionName: "",
        sort: 1,
        startCount: null,
        taskTotal: null
      },
      //数据校验
      rules: {
        subName:   [{ required: true, message: "请输入区域名称", trigger: "blur" }],
        taskTotal: [{ required: true, message: "请输入任务总数", trigger: "blur" }],
        subName:   [{ required: true, message: "请输入已完成数", trigger: "blur" }],
        subName:   [{ required: true, message: "请输入进行中数", trigger: "blur" }],
        subName:   [{ required: true, message: "请输入逾期任务数", trigger: "blur" }]
      }
    };
  },
  methods: {
    /**
     * 反显数据
     */
    update(data) {
      if (!data.id) return;
      this.dataModel = { ...data };
    },
    //重置方法
    reset() {
      const addArea = this.$refs["addArea"];
      addArea.resetFields();
      this.dataModel = {}
    },
    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },
    //点击提交
    commit() {
      this.$refs["addArea"].validate(valid => {
        if (!valid) {
          return;
        }
        //根据是否有数据传入决定执行新增还是修改
        const result = this.dataModel.id ? this.updateRegion() : this.addRegion();
      });
    },
    //添加分部分项
    addRegion() {
      addRegion(this.dataModel)
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
          return false;
        });
      return true;
    },
    //修改分部分项
    updateRegion() {
      updateRegion(this.dataModel)
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
          this.$message.error(error);
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
