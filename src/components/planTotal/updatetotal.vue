<template>
<!-- 新增/修改形象进度统计项 -->
<div class="addProgress">
  <el-form :model="dataModel" :rules="rules" ref="updatetotal" label-width="180px">
    
    <el-form-item  label="项目名称：" prop="projectName">
        <el-input v-model="dataModel.projectName" size="small" disabled></el-input>   
    </el-form-item>
    <el-form-item label="施工区域" prop="regionName" >
        <el-input v-model="dataModel.regionName" size="small" disabled></el-input>   
    </el-form-item>
    
    
    <el-form-item label="计划开始时间：" prop="startTime"  style="width:50%;display:inline-block;">
        <el-date-picker
            size="small"
            v-model="dataModel.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
            </el-date-picker>
    </el-form-item>
    <el-form-item label="里程碑" prop="endIsms" style="width:49%;display:inline-block;">
        <el-checkbox v-model="dataModel.endIsms">是</el-checkbox>
    </el-form-item>
    <el-form-item label="计划完成时间" prop="endTime" style="width:50%;display:inline-block;">
        <el-date-picker
            size="small"
            v-model="dataModel.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
            </el-date-picker>
    </el-form-item>
    <el-form-item label="里程碑" prop="startIsms" style="width:49%;display:inline-block;">
        <el-checkbox v-model="dataModel.startIsms">是</el-checkbox>
    </el-form-item>
    <el-form-item label=" 总产值（万元）：" prop="planOutput">
        <el-input v-model="dataModel.planOutput" size="small" maxlength="15"></el-input>     
    </el-form-item>
   
    
    
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary" :disabled="isSuccess">保存</el-button>
  </div>
</div>
</template>

<script>
import {updateTotalPlan,addTotalPlan} from "../api/system_interface.js";
import { mapState, mapActions } from 'vuex'
export default {
  name: "updatetotal",
  data() {
    return {
      dataModel: {
        projectName:'',
        regionName:'',
        planOutput: null,
        startTime:'',
        endTime:'',
        endIsms:0,
        startIsms:0,
      },
      //数据校验
      rules: {
        planOutput: [{ required: true, message: "请输入总产值", trigger: "blur" }],
        startTime: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
        endTime: [{ required: true, message: "请选择完成时间", trigger: "blur" }],
      },
      isSuccess:false,
    };
  },
  computed: {
    // ...mapState([
    //  'bitemList',
    //  'planList',
    //  'projectList',
    //  'listOrgInfoList'
    // ]),
  },
  methods: {
    // ...mapActions([
    //     'getSubsectionList',
    //     'getUnitList',
    //     'changeListChOrgInfo',
    //     'getlistOrgInfoList'
    // ]),

    async update(data) {
        this.dataModel = {
        projectName:data.projectName,
        regionName:data.regionName,
        planOutput: data.profilePlanOutput,
        startTime:data.startTime,
        endTime:data.endTime,
        id:data.id,
        endIsms:data.endIsms?true:false,
        startIsms:data.startIsms?true:false,
        profilePlanId:data.profilePlanId,
      }
    },

    //重置方法
    reset() {
      const AddStat = this.$refs["updatetotal"];
      AddStat.resetFields();
      this.dataModel = {
        projectName:'',
        regionName:'',
        planOutput: null,
        startTime:'',
        endTime:'',
        endIsms:0,
        startIsms:0,
      };
      this.isSuccess = false;
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },

    //点击提交
    commit() {
      this.$refs["updatetotal"].validate(valid => {
        if (!valid) {
          return;
        }
        this.isSuccess = true;
        if(this.dataModel.profilePlanId){
            this.updateVisualStatItem();
        }else{
            this.addVisualStatItem();
        }
        
      });
    },

    //添加形象进度统计项
    addVisualStatItem() {
      let data = JSON.parse(JSON.stringify(this.dataModel));
      data['regionId'] = this.dataModel.id;
      data.endIsms = data.endIsms?1:0;
      data.startIsms = data.startIsms?1:0;
      delete data['id'];
      if(data.endTime.length<=10){
          data.endTime = data.endTime+' 00:00:00';
      }
      if(data.startTime.length<=10){
          data.startTime = data.startTime+' 00:00:00';
      }
      addTotalPlan(data)
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
          this.isSuccess = false;
          return false;
        });
      return true;
    },
    updateVisualStatItem() {
      let data = JSON.parse(JSON.stringify(this.dataModel));
      data['id'] = data.profilePlanId;
      data.endIsms = data.endIsms?1:0;
      data.startIsms = data.startIsms?1:0;
      if(data.endTime.length<=10){
          data.endTime = data.endTime+' 00:00:00';
      }
      if(data.startTime.length<=10){
          data.startTime = data.startTime+' 00:00:00';
      }
      updateTotalPlan(data)
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
          this.isSuccess = false;
          return false;
        });
      return true;
    },
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.addProgress {
  .clickBtn {
    text-align: center;
  }
  .el-form-item {
    width: 90%;
  }
  .el-radio + .el-radio {
    margin-left: 10px;
  }
}
</style>
