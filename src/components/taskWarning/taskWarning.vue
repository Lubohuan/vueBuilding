<template>
<!--任务预警-->
<div class="taskWarning">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>预警督办</el-breadcrumb-item>
    <el-breadcrumb-item>任务预警</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
    <el-table-column prop="projectName"  label="项目名称" align="center"></el-table-column>
    <el-table-column prop="planName"  label="任务名称" align="center"></el-table-column>
    <el-table-column prop="regionFullName"  label="施工区段" align="center" min-width="120"></el-table-column>
    <el-table-column prop="warningReason"  label="预警原因" align="center" min-width="120">
        <template slot-scope="scope">
            <span style="color:red;">{{scope.row.warningReason}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="respUserName"  label="责任人" align="center" min-width="120"></el-table-column>
    <el-table-column prop="createTime"  label="预警时间" align="center" min-width="120"></el-table-column>
    <el-table-column  label="操作" align="center" min-width="200">
      <template slot-scope="scope">
         <el-button v-if="hasPerm('111002')" size="mini" type="primary" @click="remindSupervise(scope.row)">督办</el-button>
         <el-button v-if="hasPerm('111003')" size="mini" type="success" @click="relieveReason(scope.row)">解除预警</el-button>
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
    <el-dialog title="提醒督办" :center="true" :visible.sync="dialog.supervise" width="700px" @open="$nextTick(()=>$refs['supervise'].update(remindData))"  @close="$refs['supervise'].reset()">
      <supervise ref="supervise" @close="dialog.supervise = false" ></supervise>
    </el-dialog>
   
   <!--解除预警-->
    <el-dialog title="解除预警" :center="true" :visible.sync="dialog.earlyWarning" width="700px"  @open="$nextTick(()=>$refs['earlywarning'].update(relieveReasons))"  @close="$refs['earlywarning'].reset()">
      <earlywarning ref="earlywarning" @refreshData="refreshList" @close="dialog.earlyWarning = false" ></earlywarning>
    </el-dialog>
  </div>
</template>

<script>
import { getTaskWarningLogPage, relieveTaskWarning } from "../api/system_interface.js";
import supervise from "../taskWarning/supervise.vue";
import earlywarning from "../taskWarning/earlyWarning.vue";
export default {
  name: "taskWarning",
  components: {
    supervise,
    earlywarning
  },
  data() {
    return {
      multipleSelection: [],
      valueData: "",
      tableData: [],
      relieveReasons: {
        id:null,
        planId:null
      },
      remindData: {},
      dialog: {
        supervise: false,
        earlyWarning: false
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
      this.refreshList();
    },

    //每页显示数量变化
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

    //解除预警
    relieveReason(data) {
      this.relieveReasons.id = data.id;
      this.relieveReasons.planId = data.planId;
      this.dialog.earlyWarning = true;
    },

    //提醒督办
    remindSupervise(data) {
      this.remindData = data;
      this.dialog.supervise = true;
      console.log( this.remindData ," this.remindData ");
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
