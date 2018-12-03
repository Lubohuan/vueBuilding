<template>
<!--统计单位库-->
<div class="statistical">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">设置 </el-breadcrumb-item>
    <el-breadcrumb-item>统计单位库</el-breadcrumb-item>
    </el-breadcrumb>
  <el-row>
   <el-col :span="10">
      <el-button size="mini" type="primary" @click="addStat">+ 添加统计单位</el-button>
      <el-button size="mini" type="success" @click="exportExcel">导出excel</el-button>
   </el-col>
   <el-col :span="14" class="statistical_btn1">
      <el-input v-model="unitName" size="small" placeholder="搜索" @change="changeRefs" style="width:200px;" clearable></el-input>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="selection" width="50" align="center"></el-table-column>
    <el-table-column prop="unitName" label="单位名称" align="center"></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editClick(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteClick(scope)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background v-if="total > 0"
      class="pageStyle"
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="pagesize"
      :current-page.sync="currentPage"
			:total="total"
			@current-change="handleCurrentChange"
			@size-change="handleSizeChange"
			></el-pagination>
   <!--新增/修改统计单位-->
    <el-dialog :title="dataObj.id?'修改统计单位':'新增统计单位'" :center="true" :visible.sync="dialog.addStat" width="800px" @open="$nextTick(()=>$refs['addStat'].update(dataObj))" @close="$refs['addStat'].reset()">
      <addStat ref="addStat" @refreshData="refreshList" @close="dialog.addStat = false" ></addStat>
    </el-dialog>
  </div>
</template>

<script>
import { getUnitPage, deleteUnitById,exportUnitByIds } from "../api/upload.js";
import addStat from "../bitem/addStat.vue";
export default {
  name: "statistical",
  components: {
    addStat
  },
  data() {
    return {
      multipleSelection: [],
      dataObj: {},
      tableData: [],
      dialog: {
        addStat: false
      },
      pagesize: 10,
      currentPage: 1,
      unitName: "",
      total: 0
    };
  },
  methods: {
    //选择项变化
    handleSelectionChange(val) {
      // this.multipleSelection = val.map(v=>v.id);
      for(var i=0;i<val.length;i++){
        this.multipleSelection.push(val[i].id)
      }
      console.log(this.multipleSelection);
    },
    exportExcel(){
       exportUnitByIds({
         unitIdList:this.multipleSelection
       })
            .then(response => {
              if (response.code == "200") {
                this.refreshList();
              } else {
                this.$message.error(response.msg);
              }
            })
            .catch(error => {
              console.log(error);
            });
    },
    //删除单位
    deleteClick(scope) {
      this.$confirm("确定要删除此单位吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          if (this.tableData.length === 1) {
            this.currentPage = 1;
          }
          deleteUnitById(scope.row.id)
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
          // this.$axios
          //   .delete("http://172.16.7.135/basicData/deleteUnitById/"+scope.row.id)
          //   .then(response => {
          //     if (response.data.code == "200") {
          //       this.$message.success("删除成功!");
          //       this.refreshList();
          //     } else {
          //       this.$message.error(response.data.msg);
          //     }
          //   })
          //   .catch(error => {
          //     console.log(error);
          //   });
        })
        .catch(() => {
          this.$message.error("已取消删除");
        });
    },
    //增加单位
    addStat() {
      this.dialog.addStat = true;
      this.dataObj = {};
    },
    //修改单位
    editClick(scope) {
      this.dialog.addStat = true;
      this.dataObj = scope.row;
    },
    //切换页码
    handleCurrentChange(value) {
      this.currentPage = value;
      this.refreshList();
    },
    //切换每页显示数量
    handleSizeChange(value) {
      this.pagesize = value;
      this.refreshList();
    },
    //分页查询
    refreshList() {
      getUnitPage({
        current: this.currentPage,
        offset: this.pagesize,
        unitName: this.unitName
      })
        .then(response => {
          this.tableData = response.body.rows;
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //搜索查询
    changeRefs() {
      this.currentPage = 1;
      this.refreshList();
    }
  },
  created() {
    this.refreshList();
  }
};
</script>
<style lang="scss" scoped>
@import "statistical.scss";
</style>
