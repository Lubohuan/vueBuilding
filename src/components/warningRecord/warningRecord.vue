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
    <el-table-column prop="name"  label="项目名称" align="center"></el-table-column>
    <el-table-column prop="name"  label="预警原因" align="center"></el-table-column>
    <el-table-column prop="name"  label="责任人" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="预警时间" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="预警解除原因" align="center"></el-table-column>
    <el-table-column prop="name"  label="预警解除人" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="预警解除时间" align="center" min-width="120"></el-table-column>
  </el-table>
  <el-pagination background 
      class="pageStyle"
	  layout="prev, pager, next, sizes, total, jumper"
	  :page-sizes="[5, 10, 15, 20]"
	  :page-size="pagesize"
      :current-page="currentPage"
	  :total="tableData.length"
	  @current-change="handleCurrentChange"
	  @size-change="handleSizeChange"
  >
   </el-pagination>
  </div>
</template>

<script>
export default {
  name: "warningRecord",
  data() {
    return {
      multipleSelection: [],
      valueData:"",
      tableData: [
        {
          id: 1,
          name: "m1"
        },
        {
          id: 2,
          name: "m2"
        }
      ],
      pagesize: 10,
      currpage: 1,
      currentPage: 1
    };
  },
  methods: {
    //选择项变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    }
  }
};
</script>
<style lang="scss" scoped>
.pageStyle{
    margin-top: 20px;
    text-align: right;
}
</style>
