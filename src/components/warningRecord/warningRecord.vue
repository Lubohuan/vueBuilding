<template>
<!--预警记录-->
<div class="warningRecord">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>预警督办</el-breadcrumb-item>
    <el-breadcrumb-item>预警记录</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
    <el-table-column prop="projectName"  label="项目名称" align="center"></el-table-column>
     <el-table-column prop="planName"  label="计划名称" align="center"></el-table-column>
    <el-table-column prop="warningReason"  label="预警原因" align="center"></el-table-column>
    <el-table-column prop="respUserName"  label="责任人" align="center" min-width="120"></el-table-column>
    <el-table-column prop="createTime"  label="预警时间" align="center" min-width="120"></el-table-column>
    <el-table-column prop="relieveReason"  label="预警解除原因" align="center">
        <template slot-scope="scope">
             <span v-if="scope.row.relieveReason">{{scope.row.relieveReason}}</span>
             <span v-else>--</span>
        </template>
    </el-table-column>
    <el-table-column prop="respUserName"  label="预警解除人" align="center" min-width="120">
        <template slot-scope="scope">
             <span v-if="scope.row.respUserName">{{scope.row.respUserName}}</span>
             <span v-else>--</span>
        </template>
    </el-table-column>
    <el-table-column prop="relieveTime"  label="预警解除时间" align="center" min-width="120">
        <template slot-scope="scope">
             <span v-if="scope.row.relieveTime">{{scope.row.relieveTime}}</span>
             <span v-else>--</span>
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
  >
   </el-pagination>
  </div>
</template>

<script>
import { getTaskWarningPage} from "../api/upload.js";
export default {
  name: "warningRecord",
  data() {
    return {
      multipleSelection: [],
      valueData:"",
      tableData: [],
      pagesize: 10,
      currentPage: 1,
      total:0
    };
  },
  methods: {

    //选择项变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //切换页码
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.refreshList();
    },

    //每页显示数量变化
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

     //分页查询
    refreshList() {
      getTaskWarningPage({
        current: this.currentPage,
        offset: this.pagesize
      })
        .then(response => {
          this.tableData = response.body.rows;
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  created(){
    this.refreshList();
  }
};
</script>
<style lang="scss" scoped>
.pageStyle{
    margin-top: 20px;
    text-align: right;
}
</style>
