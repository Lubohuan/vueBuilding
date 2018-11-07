<template>
<!--形象进度统计项-->
<div class="graphicProgress">
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>形象进度管理</el-breadcrumb-item>
    <el-breadcrumb-item>形象进度统计项</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
   <el-col :span="10">
      <el-button size="mini" type="primary" @click="addProgress">+新增形象进度统计项</el-button>
      <el-button size="mini" type="success">导出excel</el-button>
   </el-col>
   <el-col :span="14" class="graphicProgress_btn1">
      <el-cascader placeholder="请选择施工区段" :options="reginList" v-model="regionId" :props="defaultProps" size="small" @change="reserchList" clearable></el-cascader>
   </el-col>
  </el-row>
   <el-row class="graphicProgress_row">
   <el-col :span="15">
      <el-select size="small" v-model="companyCode" placeholder="请选择项目" clearable>
            <el-option v-for="(item,index) in companyList" :label="item.companyName" :value="item.companyCode" :key="index"></el-option>
      </el-select>
   </el-col>
   <el-col :span="9" class="graphicProgress_btn1">
       <el-button size="mini" type="success" >搜索</el-button>
       <el-button size="mini" >重置</el-button>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="selection" width="80" align="center"></el-table-column>
    <el-table-column type="index" width="100" label="序号" align="center"></el-table-column>
    <el-table-column prop="projectId" label="项目名称" align="center"></el-table-column>
    <el-table-column prop="regionName" label="施工区段" align="center" min-width="180"></el-table-column>
    <el-table-column prop="statName" label="分部分项名称" align="center" min-width="120"></el-table-column>
    <el-table-column prop="statName" label="形象进度统计项" align="center" min-width="120"></el-table-column>
    <el-table-column prop="unitName" label="形象单位" align="center"></el-table-column>
    <el-table-column prop="budgetTotal" label="预算工程量" align="center" min-width="120"></el-table-column>
    <el-table-column prop="finishBudget" label="累计完成" align="center"></el-table-column>
    <el-table-column prop="outputTotal" label="总产值（万元）" align="center"  min-width="120"></el-table-column>
    <el-table-column prop="finishOutput" label="完成产值（万元）" align="center" min-width="140"></el-table-column>
    <el-table-column prop="finishOutputRate" label="完成比例" align="center"></el-table-column>
    <el-table-column label="操作" align="center" min-width="230">
      <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editClick(scope)">编辑</el-button>
            <el-button v-if="scope.row.isForbid == null" size="mini" type="danger" @click="deleteClick(scope)">删除</el-button>
            <el-button v-if="scope.row.isForbid == 0" size="mini" type="warning" @click="stopClick(scope)">禁用</el-button>
            <el-button v-if="scope.row.isForbid == 1" size="mini" type="success" @click="startClick(scope)">启用</el-button>
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


   <!--新增/修改形象进度统计项-->
    <el-dialog :title="dataObj.id?'修改形象进度统计项':'新增形象进度统计项'" :center="true" :visible.sync="dialog.addProgress" width="700px" @open="$nextTick(()=>$refs['addProgress'].update(dataObj))" @close="$refs['addProgress'].reset()">
      <addProgress  v-if="dialog.addProgress" ref="addProgress" @refreshData="refreshList"  @close="dialog.addProgress = false" ></addProgress>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {getVisualStatItemPage,startVisualStatItem,stopVisualStatItems} from "../api/upload.js";
import addProgress from "../graphicProgress/addProgress.vue";
export default {
  name: "graphicProgress",
  components: {
    addProgress
  },
  data() {
    return {
      multipleSelection: [],
      dataObj: {},
      tableData: [],
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
        addProgress: false
      },
      defaultProps: {
        children: "child",
        label: "regionName",
        value: "id"
      },
      pagesize: 10,
      currentPage: 1,
      projectId: null,
      regionId: null,
      total: 0,
      regionIds:null
    };
  },
  computed: {
    ...mapState([
     'reginList'
    ]),
  },
  methods: {
    ...mapActions([
        'getReginList'
    ]),
    //选择项变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除方法
    deleteClick(scope) {
      this.$confirm("确定要删除此进度吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.error("已取消删除");
        });
    },
    //禁用
    stopClick(scope) {
      stopVisualStatItems(scope.row.id)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("禁用成功!");
            this.refreshList();
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //启用
    startClick(scope) {
      startVisualStatItem(scope.row.id)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("启用成功!");
            this.refreshList();
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //增加方法
    addProgress() {
      this.dialog.addProgress = true;
      this.dataObj = {};
    },
    //修改方法
    editClick(scope) {
      this.dialog.addProgress = true;
      this.dataObj = scope.row;
    },
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.refreshList();
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },
    //分页查询
    refreshList() {
      getVisualStatItemPage({
        current: this.currentPage,
        offset: this.pagesize,
        projectId: this.projectId,
        regionId: this.regionIds
      })
        .then(response => {
          this.tableData = response.body.rows;
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
        });
    },
    reserchList(){
      this.regionIds = this.regionId[this.regionId.length - 1];
      this.refreshList();
    }
  },
  created() {
    this.refreshList();
    this.getReginList();
  }
};
</script>
<style lang="scss" scoped>
@import "graphicProgress.scss";
</style>
