<template>
<!-- 提醒督办 -->
<div class="earlywarning">
  <el-form :model="relieveReasons" :rules="rules" ref="earlywarning" label-width="125px">
    <div class="infoPlanTitle" style="margin-left: 20px;line-height: 25px;color:#999999;margin-bottom:10px;">
        <!-- <div class="visualSpan">项目名称：{{planlData.projectName}}</div>
        <div class="visualSpan">计划名称：{{planlData.planName}}</div>
        <div class="visualSpan">
            <span>计划工程量：{{planlData.planName}}</span>
            <span style="margin: 0 20px;">已完成工程量：{{planlData.planName}}</span>
            <span style="color:rgb(64, 158, 255)">剩余工程量：</span>
        </div>
        <div class="visualSpan">计划开始时间：</div>
        <div class="visualSpan">计划完成时间：</div> -->
    </div>
    <el-form-item prop="relieveReason" label="解除预警原因：">     
        <el-input v-model="relieveReasons.relieveReason" size="small" placeholder="请输入解除预警原因"></el-input>
    </el-form-item>
    <el-form-item label="修改完成时间：" prop="planEndTime">
        <el-date-picker value-format="yyyy-MM-dd"  format="yyyy 年 MM 月 dd 日" size="small" v-model="relieveReasons.planEndTime " type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
    </el-form-item> 
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary" :disabled="isSuccess">保存</el-button>
  </div>
</div>
</template>

<script>
import { relieveTaskWarning,getConstructPlanById } from "../api/system_interface.js";
export default {
  name: "earlywarning",
  data() {
    return {
      relieveReasons: {
        id: "",
        relieveReason: "",
        planEndTime:""
      },
      planId:null,
      planlData:{},
      //数据校验
      rules: {
        relieveReason: [
          { required: true, message: "请输入解除预警原因", trigger: "blur" }
        ],
        planEndTime: [
          { required: true, message: "请选择解除预警时间", trigger: "blur" }
        ]
      },
      isSuccess:false
    };
  },
  methods: {

    update(data) {
      this.relieveReasons.id = data.id;
      this.planId = data.planId;
      this.getPlanInfo();
    },

    //重置方法
    reset() {
      const earlywarning = this.$refs["earlywarning"];
      earlywarning.resetFields();
      this.relieveReasons.id = "";
      this.relieveReasons.relieveReason = "";
      this.relieveReasons.planEndTime = "";
      this.isSuccess = false;
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },

    //根据id查询详情
    getPlanInfo(){
        getConstructPlanById( this.planId)
        .then(response => {
          this.planlData = response.body;
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    //点击提交
    commit() {
       this.$refs["earlywarning"].validate(valid => {
        if (!valid) {
          return;
        }
        this.isSuccess = true;
        relieveTaskWarning(this.relieveReasons)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("提交成功!");
            this.close();
            this.$emit("refreshData");
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
           this.isSuccess = false;
           console.log(error);
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
  .el-form-item {
    width: 90%;
  }
</style>
