<template>
<!-- 添加任务 -->
<div class="addTasks">
  <el-form :model="dataModel" :rules="rules" ref="addTasks" label-width="135px" label-position="top">
    <el-form-item label="任务名称" prop="projectId">
        <el-input v-model="dataModel.projectId" size="small"></el-input>
    </el-form-item>
    <el-row class="rowLine">
            <el-col :span="12">
            <el-form-item  label="所属项目" prop="visualStatId">
                <el-select  size="small" v-model="dataModel.visualStatId" placeholder="请选择所属项目" clearable style="width:100%;">
                   <el-option v-for="(item,index) in statisList" :label="item.statName" :value="item.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item  label="任务类型" prop="visualStatId">
                <el-select  size="small" v-model="dataModel.visualStatId" placeholder="请选择任务类型" clearable style="width:100%;">
                   <el-option v-for="(item,index) in statisList" :label="item.statName" :value="item.id" :key="index"></el-option>
                </el-select>
                </el-form-item>
            </el-col>
    </el-row>
    <el-row class="rowLine">
            <el-col :span="12">
            <el-form-item  label="任务负责人" prop="visualStatId">
                <el-select  size="small" v-model="dataModel.visualStatId" placeholder="请选择负责人" clearable style="width:100%;">
                   <el-option v-for="(item,index) in statisList" :label="item.statName" :value="item.id" :key="index"></el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item  label="优先级" prop="visualStatId">
                <el-select  size="small" v-model="dataModel.visualStatId" placeholder="请选择优先级" clearable style="width:100%;">
                   <el-option v-for="(item,index) in statisList" :label="item.statName" :value="item.id" :key="index"></el-option>
                </el-select>
                </el-form-item>
            </el-col>
    </el-row>
    <el-form-item label="任务描述" prop="planName">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入任务描述" v-model="dataModel.planName"></el-input>
    </el-form-item>
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
import { getVisualStatItemPage,addConstructPlan } from "../api/upload.js";
import { mapState, mapActions } from 'vuex'
export default {
  name: "addTasks",
  data() {
    return {
      dataModel: {
        projectId: 12,
        planEndTime: "",
        planFinish: null,
        planName: "",
        planStartTime: "",
        respUser: null,
        trackCycle: null,
        visualStatId: null
      },
      userList: [
        {
          name: "www",
          id: 1
        },
        {
          name: "sss",
          id: 2
        }
      ],
      //数据校验
      rules: {
        projectId: [{ required: true, message: "请输入项目名称：", trigger: "blur" }],
        visualStatId: [{ required: true, message: "请选择统计项", trigger: "blur" }],
        planName: [{ required: true, message: "请输入任务名称：", trigger: "blur" }],
        planStartTime: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
        planEndTime: [{ required: true, message: "请选择完成时间", trigger: "blur" }],
        planFinish: [{ required: true, message: "请输入计划完成工程量：", trigger: "blur" }],
        trackCycle: [{ required: true, message: "请输入跟踪频率：", trigger: "blur" }],
        respUser: [{ required: true, message: "请选择负责人", trigger: "blur" }]
      },
      progressList: []
    };
  },
  computed: {
    ...mapState([
     'statisList'
    ]),
  },
  methods: {
    ...mapActions([
        'getStatisList'
    ]),
    //重置方法
    reset() {
      const AddStat = this.$refs["addTasks"];
      AddStat.resetFields();
      this.dataModel = {};
    },
    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },
    //点击提交
    commit() {
      this.$refs["addTasks"].validate(valid => {
        if (!valid) {
          return;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.addTasks {
  .clickBtn {
    text-align: center;
  }
  .el-form-item {
    margin-left: 20px;
    width: 95%;
   }
  .visualSpan {
   line-height: 10px;
   span{
    color:#999999;
    margin-right: 10px;
  }
  }
  .el-form-item__label{
      line-height: 10px !important;
  }
  .rowLine{
  .el-form-item {
    width: 90%;
   }
  }
}
</style>
