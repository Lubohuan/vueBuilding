<template>
<!-- 新增/修改分部分项 -->
<div class="addArea">
  <el-form :model="dataModel" :rules="rules" ref="addArea" label-width="120px">
        <el-form-item label="项目名称：" prop="projectArry">
           <el-cascader :options="listOrgInfoList" v-model="dataModel.projectArry" :props="defaultProp" size="small" placeholder="请选择项目" style="width:100%;"></el-cascader>
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
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { addRegion, updateRegion } from "../api/upload.js";
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
      
      }
    };
  },
  computed: {
    ...mapState([
     'listOrgInfoList'
    ]),
  },
  methods: {
     ...mapActions([
      'getlistOrgInfoList'
    ]),

    deepClone(data){
    let obj = JSON.stringify(data);
    return JSON.parse(obj);
    },

    initTree(data){
    let arr = [];
    for(let i=data.length;i--;){
      if(data[i]['child']){
        arr.push(...this.initTree(data[i]['child']));
        let a = this.deepClone(data[i]);
        delete a.child;
        arr.push(a);
      }else{
        arr.push(data[i]);
      }
    }
    return arr;
    },

    findParent(data,id){
    let arr = [];
    for(let i=data.length;i--;){
      if(id == data[i].id){
        arr.unshift(id);
        arr.unshift(...this.findParent(data,data[i].pid));
      }
      }
      return arr;
    },

    /**
     * 反显数据
     */
    async update(data) {
      await this.getlistOrgInfoList();
      if (!data.id) return;
      
      this.dataModel.id = data.id;
      this.dataModel.regionName = data.regionName;
      let object = this.initTree(this.listOrgInfoList);
      this.dataModel.projectArry  = this.findParent(object,data.projectId);
     
    },

    //重置方法
    reset() {
      const addArea = this.$refs["addArea"];
      addArea.resetFields();
      this.dataModel.regionName = "",
      this.dataModel.projectId = [];
      this.dataModel.id = null;
      this.dataModel.projectArry = [];
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
        this.dataModel.projectId = this.dataModel.projectArry[this.dataModel.projectArry.length - 1];
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
