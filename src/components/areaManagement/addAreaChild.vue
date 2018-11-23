<template>
<!-- 新增子项施工区域 -->
<div class="addAreaChild">
  <el-form :model="dataModel" :rules="rules" ref="addAreaChild" label-width="120px">
        <el-form-item label="区域名称：" prop="regionName">
          <el-input v-model="dataModel.regionName" size="small"></el-input>
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
import { addRegion} from "../api/upload.js";
export default {
  name: "addAreaChild",
  data() {
    return {
      dataModel: {
        regionName: null,
        projectId: null,
        parentId:""
      },
      defaultProp:{
        children: "child",
        label: "name",
        value: "id"
      },
      //数据校验
      rules: {
        regionName:  [{ required: true, message: "请输入区域名称", trigger: "blur" }]      
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

    /**
     * 反显数据
     */
    async update(data) {
      await this.getlistOrgInfoList();
      if (!data.id) return;     
      this.dataModel.parentId= data.id;
      this.dataModel.projectId = data.projectId;

    },

    //重置方法
    reset() {
      const addAreaChild = this.$refs["addAreaChild"];
      addAreaChild.resetFields();
      this.dataModel.parentId = null;
      this.dataModel.regionName = "";
      this.dataModel.projectId = null;
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },

    //添加下级
    commit() {
      this.$refs["addAreaChild"].validate(valid => {
        if (!valid) {
          return;
        }
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
</style>
