<template>
<!-- 新增计划 -->
<div class="addProgress">
  <el-form :model="dataModel" :rules="rules" ref="addProgress" label-width="120px">
        <el-form-item label="项目名称：" prop="projectArry">
            <el-cascader :options="listOrgInfoList" v-model="dataModel.projectArry" :props="defaultProp" size="small" placeholder="请选择项目" style="width:100%;" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="计划级别：" prop="level">
            <el-select size="small" v-model="dataModel.level" placeholder="请选择计划级别：" clearable style="width:100%;">
                <el-option v-for="(item,index) in planTypeList" :label="item.name" :value="item.number" :key="index"></el-option>
            </el-select>
            <span class="warnInfo" v-if="dataModel.level==1">一级进度计划匹配项目总工期，项目下只可建立一个，请确认后再添加！</span>
        </el-form-item>
        <el-form-item label="计划名称：" prop="name">
          <el-input v-model.number="dataModel.name" size="small"></el-input>
        </el-form-item>        
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { plan} from "../api/system_interface.js";
export default {
  name: "addProgress",
  data() {
    return {
      dataModel: {
        projectId: '',
        parentId:"0",
        projectArry:[],
        level:null,
        name:''
      },
      defaultProp: {
        children: "child",
        label: "name",
        value: "id"
      },
      //数据校验
      rules: {
        projectArry:   [{ required: true, message:  "请选择项目", trigger: "blur" }],
        name:   [{ required: true, message:  "请输入计划名称", trigger: "blur" }],
        level:   [{ required: true, message:  "请选择计划级别", trigger: "blur" }]
      
      }
    };
  },
  computed: {
    ...mapState([
     'listOrgInfoList',
     'planTypeList'
    ]),
  },
  methods: {
     ...mapActions([
      'getlistOrgInfoList'
    ]),

   

    //重置方法
    reset() {
      const addProgress = this.$refs["addProgress"];
      addProgress.resetFields();
      this.dataModel.projectId = null;
      this.dataModel.name = '';
      this.dataModel.level = '';
      this.dataModel.projectArry = [];
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },

    //点击提交
    commit() {
      this.$refs["addProgress"].validate(valid => {
        if (!valid) {
          return;
        }
        this.dataModel.projectId = this.dataModel.projectArry[this.dataModel.projectArry.length - 1];
         plan(this.dataModel)
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
        });
      });
    },

  }
};
</script>
<style lang="scss" scoped>
.clickBtn {
  text-align: center;
}
.warnInfo{
  // color: #feba51;
  color: rgb(64, 158, 255);
}
</style>
