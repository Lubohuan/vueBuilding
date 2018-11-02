<template>
<!-- 新增/修改进度计划 -->
<div class="addPlan">
  <el-form :model="dataModel" :rules="rules" ref="addPlan" label-width="135px">
    <el-form-item label="项目名称：" prop="projectId">
        <el-input v-model="dataModel.projectId" size="small"></el-input>
    </el-form-item>
    <el-form-item label="选择统计项：" v-if="dataModel.id == null" prop="visualStatId">
         <el-select  size="small" v-model="dataModel.visualStatId" placeholder="请选择形象进度统计项" clearable style="width:100%;"  @change="changeVisu">
            <el-option v-for="(item,index) in statisList" :label="item.statName" :value="item.id" :key="index"></el-option>
        </el-select>
        <span v-if="visualStatObject !== null" style="color:rgb(64, 158, 255);">分部分项：{{visualStatObject.statName}}</span>
        <div  v-if="visualStatObject !== null" class="visualSpan">
        <span>预算工程量：{{visualStatObject.budgetTotal}}m³</span>
        <span>已完成工程量：{{visualStatObject.finishOutput}}m³</span>
        <span>剩余工程量：{{visualStatObject.budgetTotal - visualStatObject.finishOutput}}m³</span>
        </div> 
    </el-form-item>
    <el-form-item label="任务名称：" prop="planName">
        <el-input v-model="dataModel.planName" size="small"></el-input>
    </el-form-item>
    <el-form-item label="开始时间：" prop="planStartTime">
         <el-date-picker value-format="yyyy-MM-dd"  format="yyyy 年 MM 月 dd 日" size="small" v-model="dataModel.planStartTime" type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="完成时间：" prop="planEndTime">
        <el-date-picker value-format="yyyy-MM-dd"  format="yyyy 年 MM 月 dd 日" size="small" v-model="dataModel.planEndTime " type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
    </el-form-item> 
    <el-form-item label="计划完成工程量：" prop="planFinish">
        <el-input v-model.number="dataModel.planFinish " size="small"></el-input>
    </el-form-item>
    <el-form-item label="跟踪频率：" prop="trackCycle">
        <el-input v-model.number="dataModel.trackCycle " size="small"></el-input>
    </el-form-item>
    <el-form-item label="施工负责人：" prop="respUser">
         <el-select size="small" v-model.number="dataModel.respUser" placeholder="请选择负责人" clearable style="width:100%;">
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
import { getVisualStatItemPage,addConstructPlan } from "../api/upload.js";
import { mapState, mapActions } from 'vuex'
export default {
  name: "addPlan",
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
      visualStatObject:null,
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
      radio: "",
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
    changeVisu(){
    this.visualStatObject = this.statisList.find(
      (v) => v.id === this.dataModel.visualStatId,
    );
     this.dataModel.planName = this.visualStatObject.statName;
    },
    /**
     反显数据
     */
    update(data) {
      this.getStatisList();
      if (!data.id) return;
      this.dataModel = {...data};
      // this.visualStatObject = {...data}
    },
    //重置方法
    reset() {
      const AddStat = this.$refs["addPlan"];
      AddStat.resetFields();
      this.dataModel = {};
      this.visualStatObject = null;
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
        //根据是否有数据传入决定执行新增还是修改
        const result = this.dataModel.id ? this.updatePlan() : this.addPlan();
      });
    },
    //添加进度计划
    addPlan() {
      addConstructPlan(this.dataModel)
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
          return false;
        });
      return true;
    },
    //修改进度计划
    updatePlan(){
      updateConstructPlan(this.dataModel)
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
          return false;
        });
      return true;
    }
  }
};
</script>
<style lang="scss" scoped>
.addPlan {
  .clickBtn {
    text-align: center;
  }
  .el-form-item {
    width: 90%;
  }
  .visualSpan {
   line-height: 10px;
   span{
    color:#999999;
    margin-right: 10px;
  }
  }
}
</style>
