<template>
<!--进度检视-->
<div class="lookProgress">
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>形象进度管理</el-breadcrumb-item>
    <el-breadcrumb-item>进度检视</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
   <el-col :span="10">
      <el-button size="mini" type="success">导出excel</el-button>
   </el-col>
   <el-col :span="14" class="lookProgress_btn1">
     <el-input size="small" placeholder="选择检视时间范围"  v-on:click.native="openData" style="width:200px;"></el-input>
   </el-col>
  </el-row>
   <el-row class="lookProgress_row">
   <el-col :span="15">
      <el-select size="small" v-model="companyCode" placeholder="请选择项目" clearable>
            <el-option v-for="(item,index) in companyList" :label="item.companyName" :value="item.companyCode" :key="index"></el-option>
      </el-select>
      <el-cascader :options="reginList" v-model="regionId" :props="defaultProp" size="small" placeholder="请选择施工区段" clearable></el-cascader>
   </el-col>
   <el-col :span="9" class="lookProgress_btn1">
       <el-button size="mini" type="success" >搜索</el-button>
       <el-button size="mini" @click="resetForm">重置</el-button>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
    <el-table-column prop="projectId" label="项目名称" align="center"></el-table-column>
    <el-table-column prop="name" label="施工区段" align="center"></el-table-column>
    <el-table-column prop="statName" label="分部分项名称" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name" label="形象进度统计项" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name" label="形象单位" align="center"></el-table-column>
    <el-table-column prop="budgetTotal" label="预算工程量" align="center" min-width="120"></el-table-column>
    <el-table-column prop="finishBudget" label="累计完成" align="center"></el-table-column>
    <el-table-column prop="name" label="完成比例" align="center"></el-table-column>
    <el-table-column prop="name" label="8月计划" align="center" ></el-table-column>
    <el-table-column prop="name" label="8月完成" align="center" ></el-table-column>
    <el-table-column prop="name" label="9月计划" align="center"></el-table-column>
    <el-table-column prop="name" label="9月完成" align="center"></el-table-column>
    <el-table-column prop="name" label="10月完成" align="center"></el-table-column>
    <el-table-column prop="name" label="10月完成" align="center"></el-table-column>
  </el-table>
  <el-pagination background v-if="total>0"
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
 
  <!--选择时间范围-->
    <el-dialog title="选择检视时间范围" :center="true" :visible.sync="dialog.openData" width="600px" >
      <el-form :model="valueData"  label-width="55px">
        <el-form-item prop="valueData" class="dataStyle">
           <el-date-picker v-model="valueData.value1" type="month" placeholder="开始检视时间" class="dataInput1"></el-date-picker>-
           <el-date-picker v-model="valueData.value2" type="month" placeholder="结束检视时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="clickBtn">
        <el-button @click="dataObj.openData = false;valueData={}"  size="small">取消</el-button>
        <el-button  size="small" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getVisualStatMonitorPage } from "../api/upload.js";
export default {
  name: "lookProgress",
  data() {
    return {
      multipleSelection: [],
      dataObj: {},
      valueData:{
         value1:"",
         value2:"",
      },
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
        openData: false
      },
      pagesize: 10,
      currentPage: 1,
      defaultProp:{
        children: "child",
        label: "regionName",
        value: "id"
      },
      regionId:[],
      projectId:null,
      total:0
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

    //页码变化
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.refreshList();
    },

    //每页数据改变
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

    //打开选择时间弹框
    openData(){
      this.dialog.openData = true;  
    },

    //分页查询
    refreshList() {
      getVisualStatMonitorPage({
        current: this.currentPage,
        offset: this.pagesize,
        projectId: this.projectId,
        regionId: this.regionId,
      })
        .then(response => {
          this.tableData = response.body.rows;
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
      });
    },

    //重置
    resetForm(){
      this.regionId = [];
      this.companyCode = "";
    },
  },
  created(){
    this.getReginList();
    this.refreshList();
  }
};
</script>
<style lang="scss" scoped>
@import "lookProgress.scss";
</style>
