<template>
<!-- 提醒督办 -->
<div class="supervise">
  <el-form :model="superviseModel" :rules="rules" ref="supervise" label-width="125px">
    <el-form-item label="督办内容" prop="urgeContent">
        <el-input  type="textarea" :autosize="{minRows:3}" v-model="superviseModel.urgeContent" size="small" placeholder="请输入督办内容"></el-input>
    </el-form-item>
     <!-- <el-form-item label="是否短信通知：" prop="radio">
        <el-radio-group v-model="radio" style="width:110px;">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
        </el-radio-group>
    </el-form-item> -->
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
import { urgeTask } from "../api/system_interface.js";
export default {
  name: "supervise",
  data() {
    return {
      superviseModel: {
        id: "",
        urgeContent: "",
      },
      radio: "",
      //数据校验
      rules: {
        urgeContent: [
          { required: true, message: "请输入督办内容", trigger: "blur" }
        ]
      },
      radio: ""
    };
  },
  methods: {

    update(data) {
      this.superviseModel.planId = data.planId;
      console.log(this.superviseModel.id,"this.superviseModel.id");
    },

    //重置方法
    reset() {
      const AddStat = this.$refs["supervise"];
      AddStat.resetFields();
      this.superviseModel= {};
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },
    
    //点击提交
    commit() {
      this.$refs["supervise"].validate(valid => {
        if (!valid) {
          return;
        }
        urgeTask(this.superviseModel)
          .then(response => {
            if (response.code == "200") {
              this.$message.success("督办成功!");
              this.close();
            } else {
              this.$message.error(response.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.supervise {
  .clickBtn {
    text-align: center;
  }
  .el-form-item {
    width: 90%;
  }
}
</style>
