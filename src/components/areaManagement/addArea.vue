<template>
<!-- 新增/修改分部分项 -->
<div class="addArea">
  <el-form :model="dataModel" :rules="rules" ref="addArea" label-width="120px">
        <el-form-item label="项目名称：" prop="projectArry">
           <el-cascader :options="projectList" v-model="dataModel.projectArry" :props="defaultProp" size="small" placeholder="请选择项目" style="width:100%;" :disabled="isCompany"></el-cascader>
        </el-form-item>
        <el-form-item label="区域名称：" prop="regionName">
          <el-input v-model="dataModel.regionName" size="small"></el-input>
        </el-form-item>
         <!-- <el-form-item label="任务总数" prop="taskTotal">
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
        </el-form-item> -->
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary" :disabled="isSuccess">保存</el-button>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { addRegion, updateRegion } from "../api/system_interface.js";
export default {
  name: "addArea",
  data() {
    return {
      dataModel: {
        regionName: null,
        projectId: [],
        id:null,
        projectArry:[]
      },
      defaultProp:{
        children: "child",
        label: "name",
        value: "id"
      },
      //数据校验
      rules: {
        regionName:  [{ required: true, message: "请输入区域名称", trigger: "blur" }],
        projectArry:   [{ required: true, message:  "请选择项目", trigger: "blur" }]
      
      },
      isCompany:false,
      isSuccess:false
    };
  },
  computed: {
    ...mapState([
     'projectList'
    ]),
  },
  methods: {
     ...mapActions([
      'changeListChOrgInfo'
    ]),

    /**
     * 反显数据
     */
    async update(data) {
      await this.changeListChOrgInfo();
      let companyTypes = sessionStorage.getItem("companyType");
      if(!data.id){
        this.dataModel.projectArry = JSON.parse(sessionStorage.getItem("selectArry"));
        this.isCompany = companyTypes == 4?true:false;
      }
      if (!data.id) return;
      this.isCompany = true;
      this.dataModel.id = data.id;
      this.dataModel.regionName = data.regionName;
       //查找项目父级
      let object = this.$common.initTree(this.projectList);
      this.dataModel.projectArry  = this.$common.findParent(object, data.projectId);
    },

    //重置方法
    reset() {
      const addArea = this.$refs["addArea"];
      addArea.resetFields();
      this.dataModel.regionName = "",
      this.dataModel.projectId = [];
      this.dataModel.id = null;
      this.dataModel.projectArry = [];
      this.isUp = false;
      this.isSuccess = false;  
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
        this.isSuccess = true;
        this.dataModel.projectId = this.dataModel.projectArry[this.dataModel.projectArry.length - 1];
        //根据是否有数据传入决定执行新增还是修改
        const result = this.dataModel.id ? this.updateRegion() : this.addRegion();
      });
    },

    //添加区域
    addRegion() {
      addRegion(this.dataModel)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("添加成功!");
            this.close();
            this.$emit("refreshData");
          }
          else{
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          this.isSuccess = false;
          return false;
        });
      return true;
    },

    //修改区域
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
          this.isSuccess = false;
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
