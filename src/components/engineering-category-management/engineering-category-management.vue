<template>
<!--统计单位库-->
<div class="engineering-category-management">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">设置 </el-breadcrumb-item>
    <el-breadcrumb-item>工程类别管理</el-breadcrumb-item>
    </el-breadcrumb>
  <el-row>
   <el-col :span="24">
      <el-button size="mini" type="primary" @click="addEng">+ 添加工程类别</el-button>
      <el-button size="mini" type="success">导出excel</el-button>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="selection" width="50" align="center"></el-table-column>
    <el-table-column prop="typeName" label="工程类别" align="center"></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editClick(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteClick(scope)">删除</el-button>
            <!-- <el-button size="mini" type="success" @click="deleteClick(scope)">启用</el-button>
            <el-button size="mini" type="warning" @click="deleteClick(scope)">禁用</el-button> -->
      </template>
    </el-table-column>
  </el-table>
   <!--新增/修改类别-->
    <el-dialog :title="dataObj.id?'修改工程类别':'新增工程类别'" :center="true" :visible.sync="dialog.addEng" width="800px" @open="$nextTick(()=>$refs['addEng'].update(dataObj))" @close="$refs['addEng'].reset()">
      <addEng ref="addEng" @refreshData="refreshList" @close="dialog.addEng = false" ></addEng>
    </el-dialog>
  </div>
</template>

<script>
import { listProjectType,deleteProjectType} from "../api/upload.js";
import addEng from "../engineering-category-management/addEng.vue";
export default {
  name: "engineering-category-management",
  components: {
    addEng
  },
  data() {
    return {
      multipleSelection: [],
      dataObj: {},
      tableData: [],
      dialog: {
        addEng: false
      }
    };
  },
  methods: {

    //选择项变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //删除类别
    deleteClick(scope) {
      this.$confirm("确定要删除此类别吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          deleteProjectType(scope.row.id)
            .then(response => {
              if (response.code == "200") {
                this.$message.success("删除成功!");
                this.refreshList();
              } else {
                this.$message.error(response.msg);
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message.error("已取消删除");
        });
    },

    //增加类别
    addEng() {
      this.dialog.addEng = true;
      this.dataObj = {};
    },

    //修改类别
    editClick(scope) {
      this.dialog.addEng = true;
      this.dataObj = scope.row;
    },

    //查询
    refreshList() {
      listProjectType({})
        .then(response => {
          this.tableData = response.body;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.refreshList();
  }
};
</script>
<style lang="scss" scoped>
@import "engineering-category-management.scss";
</style>
