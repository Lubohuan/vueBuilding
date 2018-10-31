<template>
<!--任务预警-->
<div class="taskWarning">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>预警督办</el-breadcrumb-item>
    <el-breadcrumb-item>任务预警</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
    <el-table-column prop="name"  label="项目名称" align="center"></el-table-column>
    <el-table-column prop="name"  label="任务名称" align="center"></el-table-column>
    <el-table-column prop="name"  label="施工区段" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="预警原因" align="center" min-width="120">
        <template slot-scope="scope">
            <span style="color:red;">{{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name"  label="负责人" align="center"></el-table-column>
    <el-table-column prop="name"  label="预约时间" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="责任人" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="预警时间" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="操作" align="center" min-width="200">
      <template slot-scope="scope">
         <el-button size="mini" type="primary" @click="remindSupervise(scope.row)">督办</el-button>
         <el-button size="mini" type="success" @click="relieveReason(scope.row)">解除预警</el-button>
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

    <!--提醒督办-->
    <el-dialog title="提醒督办" :center="true" :visible.sync="dialog.supervise" width="700px" @open="$nextTick(()=>$refs['supervise'].update(remindData))">
      <supervise ref="supervise" @close="dialog.supervise = false" ></supervise>
    </el-dialog>
   
   <!--解除预警-->
    <el-dialog title="解除预警" :center="true" :visible.sync="dialog.relieveReason" width="600px" >
      <el-form :model="relieveReasons"  label-width="100px">
        <el-form-item prop="reason" label="解除预警原因:">
          <el-input v-model="relieveReasons.reason" size="small" placeholder="请输入解除预警原因"></el-input>
        </el-form-item>
      </el-form>
      <div class="clickBtn">
        <el-button @click="close"  size="small">取消</el-button>
        <el-button  size="small" type="primary" @click="commit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTaskWarningLogPage, relieveTaskWarning } from "../api/upload.js";
import supervise from "../taskWarning/supervise.vue";
export default {
  name: "taskWarning",
  components: {
    supervise
  },
  data() {
    return {
      multipleSelection: [],
      valueData: "",
      tableData: [],
      relieveReasons: {
        id: "",
        relieveReason: ""
      },
      remindData: {},
      companyList: [
        {
          companyName: 11,
          companyCode: 10
        },
        {
          companyName: 12,
          companyCode: 13
        }
      ],
      companyCode: "",
      dialog: {
        supervise: false,
        relieveReason: false
      },
      pagesize: 10,
      currentPage: 1,
      total: 0
    };
  },
  methods: {
    //选择项变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //页码变化
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
    },
    //每页显示数量变化
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    //解除预警
    relieveReason(data) {
      this.relieveReasons.id = data.id;
      this.dialog.relieveReason = true;
    },
    //提醒督办
    remindSupervise(data) {
      this.remindData = data;
      this.dialog.supervise = true;
    },
    //分页查询
    refreshList() {
      getTaskWarningLogPage({
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
    //关闭解除预警弹框
    close() {
      this.dialog.relieveReason = false;
      this.relieveReasons.id = "";
      this.relieveReasons.relieveReason = "";
    },
    //提交解除预警
    commit() {
      relieveTaskWarning(this.relieveReasons)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("提交成功!");
            this.close();
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          this.$message.error(error);
        });
    }
  },
  created() {
    this.refreshList();
  }
};
</script>
<style lang="scss" scoped>
@import "taskWarning.scss";
</style>
