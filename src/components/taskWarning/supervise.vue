<template>
<!-- 提醒督办 -->
<div class="supervise">
  <el-form :model="superviseModel" :rules="rules" ref="supervise" label-width="125px">
    <el-form-item label="督办内容" prop="desp">
        <el-input  type="textarea" :autosize="{minRows:3}" v-model="superviseModel.desp" size="small" placeholder="请输入督办内容"></el-input>
    </el-form-item>
     <el-form-item label="是否短信通知：" prop="radio">
        <el-radio-group v-model="superviseModel.radio" style="width:110px;">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
        </el-radio-group>
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
  name: "supervise",
  data() {
    return {
      superviseModel: {
        id: "",
        desp:"",
        radio:""
      },
      userList:[
          {
            name:"www",
            id:1
          },
          {
           name:"sss",
           id:2
          }
      ],
      //数据校验
      rules: {
        desp: [{ required: true, message: "请输入编码", trigger: "blur" }]
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
      this.superviseModel.id = data.id;
      console.log(this.superviseModel, "this.superviseModel");
    },
    //重置方法
    reset() {
      const AddStat = this.$refs["supervise"];
      AddStat.resetFields();
      this.superviseModel.id = null;
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
        this.$emit("close");
        this.reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.supervise{
.clickBtn {
  text-align: center;
}
.el-form-item{
  width: 90%;
}
}

</style>
