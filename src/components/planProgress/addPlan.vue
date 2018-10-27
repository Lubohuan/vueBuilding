<template>
<!-- 新增/修改进度计划 -->
<div class="addPlan">
  <el-form :model="dataModel" :rules="rules" ref="addPlan" label-width="125px">
    <el-form-item label="项目名称：" prop="name">
        <el-input v-model="dataModel.name" size="small"></el-input>
    </el-form-item>
    <el-form-item label="任务名称：" prop="desp">
        <el-input v-model="dataModel.desp" size="small"></el-input>
    </el-form-item>
    <el-form-item label="开始时间" prop="value">
         <el-date-picker v-model="dataModel.value" type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="完成时间" prop="value">
        <el-date-picker  v-model="dataModel.value" type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
    </el-form-item> 
    <el-form-item label="计划完成工程量：" prop="desp">
        <el-input v-model="dataModel.desp" size="small"></el-input>
    </el-form-item>
    <el-form-item label="跟踪频率：" prop="desp">
        <el-input v-model="dataModel.desp" size="small"></el-input>
    </el-form-item>
    <el-form-item label="施工负责人" prop="desp">
         <el-select size="small" v-model="dataModel.username" placeholder="请选择负责人" clearable style="width:100%;">
            <el-option v-for="(item,index) in userList" :label="item.name" :value="item.id" :key="index"></el-option>
         </el-select> 
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
  name: "addPlan",
  data() {
    return {
      dataModel: {
        code: "",
        name: "",
        desp: "",
        id: "",
        value:"",
        username:""
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
      const AddStat = this.$refs["addPlan"];
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
      this.$refs["addPlan"].validate(valid => {
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
.addPlan{
.clickBtn {
  text-align: center;
}
.el-form-item{
  width: 90%;
}
}

</style>
