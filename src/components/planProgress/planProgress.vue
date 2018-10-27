<template>
<!--进度计划-->
<div class="planProgress">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>形象进度管理</el-breadcrumb-item>
    <el-breadcrumb-item>进度计划</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
   <el-col :span="10">
      <el-button size="mini" type="primary" @click="addPlan">+ 编制计划</el-button>
      <el-button size="mini" type="success">导出excel</el-button>
   </el-col>
   <el-col :span="14" class="planProgress_btn1">
     <el-date-picker size="small" v-model="valueData" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
    </el-date-picker>
   </el-col>
  </el-row>
   <el-row class="planProgress_row">
   <el-col :span="15">
      <el-select size="small" v-model="companyCode" placeholder="请选择项目" clearable>
            <el-option v-for="(item,index) in companyList" :label="item.companyName" :value="item.companyCode" :key="index"></el-option>
      </el-select>
       <el-select size="small" v-model="companyCode" placeholder="请选择施工区段" clearable>
            <el-option v-for="(item,index) in companyList" :label="item.companyName" :value="item.companyCode" :key="index"></el-option>
      </el-select>
   </el-col>
   <el-col :span="9" class="planProgress_btn1">
       <el-button size="mini" type="success" >搜索</el-button>
       <el-button size="mini" >重置</el-button>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
    <el-table-column prop="name"  label="项目名称" align="center"></el-table-column>
    <el-table-column prop="name"  label="计划任务名称" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="施工区段" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="完成时间" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="总工程量" align="center"></el-table-column>
    <el-table-column prop="name"  label="剩余工程量" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="计划工程量" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="完成比例" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="状态" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="操作" align="center" min-width="200">
      <template slot-scope="scope">
         <el-button size="mini" type="primary" @click="editPlan(scope.row)">编辑</el-button>
         <el-button size="mini" type="danger" @click="deleteClick(scope)">删除</el-button>
         <el-button size="mini" type="warning" @click="deleteClick(scope)">禁用</el-button>
      </template>
    </el-table-column>
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

 <!--新增/修改进度计划-->
    <el-dialog :title="dataObj.id?'修改形象进度统计项':'新增形象进度统计项'" :center="true" :visible.sync="dialog.addPlan" width="700px" @open="$nextTick(()=>$refs['addPlan'].update(dataObj))">
      <addPlan ref="addPlan" @close="dialog.addPlan = false" ></addPlan>
    </el-dialog>

  </div>
</template>

<script>
import addPlan from "../planProgress/addPlan.vue";
export default {
  name: "planProgress",
  components:{
      addPlan
  },
  data() {
    return {
      multipleSelection: [],
      dataObj: {},
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
        addPlan: false
      },
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
    //新增
    addPlan(){
       this.dialog.addPlan = true;
       this.dataObj = {}
    },
    //编辑
    editPlan(data){
        this.dialog.addPlan = true;
        this.dataObj = data;
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    openData(){
      console.log(111);
      this.dialog.openData = true;  
    }
  }
};
</script>
<style lang="scss" scoped>
@import "planProgress.scss";
</style>
