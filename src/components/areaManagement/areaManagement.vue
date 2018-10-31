<template>
<!-- 施工区域管理 -->
<div class="areaManagement">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度 </el-breadcrumb-item>
    <el-breadcrumb-item>施工区段管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button size="mini" type="primary" @click="addClick">+ 添加分部</el-button>
    <el-button size="mini" type="success">导出excel</el-button>
    <el-row class="tableRow">
    <el-col :span="15">
      <el-select size="small" v-model="companyCode" placeholder="请选择项目" clearable>
        <el-option v-for="(item,index) in companyList" :label="item.companyName" :value="item.companyCode" :key="index"></el-option>
      </el-select>
      <el-cascader :options="reginList" v-model="regionId" :props="defaultProp" size="small" placeholder="请选择施工区段"></el-cascader>
   </el-col>
   <el-col :span="9" class="lightCol">
       <el-button size="mini" type="success" >搜索</el-button>
       <el-button size="mini" @click="resetForm">重置</el-button>
   </el-col>
  </el-row>
  <el-row class="tableHead">
    <el-col :span="2" class="tableCol" style="margin-left:50px;">
      <span>项目名称</span>
    </el-col>
    <el-col :span="3" class="tableCol">
      <span>区域名称</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>任务总数</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>已完成</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>进行中</span>
    </el-col>
      <el-col :span="3" class="tableCol">
      <span>逾期任务数</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>逾期任务占比</span>
    </el-col>
      <el-col :span="3" class="tableCol">
      <span>未开始</span>
    </el-col>
    <el-col :span="3"  class="tableCol">
      <span>操作</span>
    </el-col>
  </el-row>
  <el-tree :data="tableData" show-checkbox node-key="id" :default-expand-all="false" draggable :expand-on-click-node="false" :props="defaultProps">

      <span class="custom-tree-node" slot-scope="{ node, data }">
         <el-row style="width:100%;">
    <el-col :span="2" class="tableCol" style="margin-left:20px;">
    <span>{{ data.regionName }}</span>
    </el-col>
    <el-col :span="3" class="tableCol">
       <span>{{ data.regionName }}</span>
    </el-col>
      <el-col :span="2" class="tableCol">
       <span>{{ data.taskTotal }}</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>{{ data.finishCount }}</span>
    </el-col>
      <el-col :span="3" class="tableCol" style="margin-left:-15px;">
      <span>{{ data.startCount }}</span>
    </el-col>
      <el-col :span="3" class="tableCol" style="margin-left:-40px;color:red;">
       <span>{{ data.expiryCount }}</span>
    </el-col>
    <el-col :span="2" class="tableCol" style="margin-left:10px;">
       <span>{{ data.expiryRate }}</span>
    </el-col>
      <el-col :span="3" class="tableCol">
      <span>{{ data.notStartCount }}</span>
    </el-col>
    <el-col :span="4"  class="tableCol">
     <span>
            <el-button size="mini" type="primary"  @click="editClick(data)">编辑</el-button>
            <el-button size="mini" type="primary">详情</el-button>
            <el-button size="mini" type="danger"  @click="deleteClick(data)">删除</el-button>
        </span>
    </el-col>
  </el-row>
       
      </span>
   </el-tree>
    <!--添加/修改分部分项-->
    <el-dialog :title="regionObject.id?'修改施工区域':'添加施工区域'" :center="true" :visible.sync="dialog.addArea" width="800px"  @open="$nextTick(()=>$refs['addArea'].update(regionObject))" @close="$refs['addArea'].reset()">
      <addArea ref="addArea" @refreshData="refreshList" @close="dialog.addArea = false" ></addArea>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { listRegion, deleteRegionById } from "../api/upload.js";
import addArea from "../areaManagement/addArea.vue";
export default {
  name: "areaManagement",
  components: {
    addArea
  },
  data() {
    return {
      activeName: "first",
      multipleSelection: [],
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
      projectId: 12,
      currentPage: 1,
      pagesize: 10,
      companyCode: "",
      regionObject: {},
      dialog: {
        addArea: false
      },
      defaultProps: {
        children: "child"
      },
      defaultProp:{
        children: "child",
        label: "regionName",
        value: "id"
      },
      regionId:[]
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
    handleClick(tab) {
      console.log(tab.name);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection, "this.multipleSelection");
    },
    //删除区段
    deleteClick(data) {
      this.$confirm("确定要删除此区段吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          deleteRegionById(data.id)
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
    //打开新增弹框
    addClick() {
      this.dialog.addArea = true;
      this.regionObject = {};
    },
    //打开修改弹框
    editClick(data) {
      this.dialog.addArea = true;
      this.regionObject = data;
    },
    //分页查询
    refreshList() {
      listRegion({
        current: this.currentPage,
        offset: this.pagesize,
        projectId: this.projectId
      })
        .then(response => {
          this.tableData = response.body;
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
    }
  },
  created() {
    this.refreshList();
    this.getReginList();
  }
};
</script>
<style lang="scss">
@import "areaManagement.scss";
</style>
