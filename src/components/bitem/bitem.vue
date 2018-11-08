<template>
<!-- 分部分项库 -->
<div class="bitem">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">设置 </el-breadcrumb-item>
    <el-breadcrumb-item>分部分项库</el-breadcrumb-item>
    </el-breadcrumb>
   <el-row>
    <el-col :span="20">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="房建工程" name="first"></el-tab-pane>
      <el-tab-pane label="路桥工程" name="second"></el-tab-pane>
      <el-tab-pane label="地铁工程" name="third"></el-tab-pane>
      <el-tab-pane label="市政工程" name="fourth"></el-tab-pane>
      </el-tabs>
  </el-col>
  <el-col :span="4" class="bitem_btn">
      <el-button  type="text" @click="categoryManagement"><i class="el-icon-edit el-icon--right"></i>类别管理</el-button>
  </el-col>
  </el-row>
  <el-row>
   <el-col :span="5">
      <el-button size="mini" type="primary" @click="addSub">+ 添加分部</el-button>
      <el-button size="mini" type="success">导出excel</el-button>
   </el-col>
   <el-col :span="19" class="bitem_btn1">
      <el-input v-model="subName" size="small" placeholder="搜索" clearable @change="resarchBitem" style="width:200px;"></el-input>
   </el-col>
  </el-row>
  <el-row class="tableHead">
    <el-col :span="20" class="tableCol">
      <div>分部分项划分名称</div>
    </el-col>
    <el-col :span="4"  class="tableCol">
      <div>操作</div>
    </el-col>
  </el-row>
  <el-tree :data="tableData" show-checkbox node-key="id" :default-expand-all="false" draggable :expand-on-click-node="false" :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span style="margin-left:100px;font-size:12px;">{{ data.subName }}</span>
        <span>
            <el-button size="mini" type="primary"  @click="addSubChild(data)">添加子项</el-button>
            <el-button size="mini" type="primary"  @click="editSub(data)">编辑</el-button>
            <el-button size="mini" type="danger"   @click="deleteClick(data)">删除</el-button>
        </span>
      </span>
   </el-tree>
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
   <!--类别管理-->
    <el-dialog title="类别管理" :center="true" :visible.sync="dialog.modify" width="800px">
      <categoryManagement ref="categoryManagement" @close="dialog.modify = false" ></categoryManagement>
    </el-dialog>
     <!--添加/修改分部分项-->
    <el-dialog :title="subObject.id?'修改分部分项':'新增分部分项'" :center="true" :visible.sync="dialog.addSubsection" width="800px"  @open="$nextTick(()=>$refs['addSubsection'].update(subObject))" @close="$refs['addSubsection'].reset()">
      <addSubsection ref="addSubsection" @refreshData="refreshList" @close="dialog.addSubsection = false" ></addSubsection>
    </el-dialog>
     <!--新增子项-->
    <el-dialog title="新增子项" :center="true" :visible.sync="dialog.addSubChid" width="800px" @open="$nextTick(()=>$refs['addSubChid'].update(subObject))" @close="$refs['addSubChid'].reset()">
      <addSubChid ref="addSubChid" @refreshData="refreshList" @close="dialog.addSubChid = false" ></addSubChid>
    </el-dialog>
  </div>
</template>

<script>
import categoryManagement from "../bitem/categoryManagement.vue";
import addSubChid from "../bitem/addSubChid.vue";
import addSubsection from "../bitem/addSubsection.vue";
import { getSubsectionPage, deleteSubsectionById } from "../api/upload.js";
export default {
  name: "bitem",
  components: {
    categoryManagement,
    addSubsection,
    addSubChid
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
      defaultProps: {
        children: "child"
      },
      companyCode: "",
      projectType: 1,
      currentPage: 1,
      pagesize: 10,
      subName:null,
      total: 0,
      dialog: {
        modify: false,
        addSubsection: false,
        addSubChid: false
      },
      subObject: {}
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab.name);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection, "this.multipleSelection");
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
    //删除操作
    deleteClick(data) {
      this.$confirm("确定要删除此区段吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          deleteSubsectionById(data.id)
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
    //打开类别管理弹框
    categoryManagement() {
      this.dialog.modify = true;
    },
    //新增分部分项
    addSub() {
      this.dialog.addSubsection = true;
      this.subObject = {};
    },
    //添加子项
    addSubChild(data) {
      this.dialog.addSubChid = true;
      this.subObject = data;
    },
    //编辑分部分项
    editSub(data) {
      this.dialog.addSubsection = true;
      this.subObject = data;
    },
    //分页查询
    refreshList() {
      getSubsectionPage({
        current: this.currentPage,
        offset: this.pagesize,
        projectType: this.projectType,
        subName:this.subName
      })
        .then(response => {
          this.tableData = response.body;
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
        });
    },
    resarchBitem(){
      this.refreshList();
    }
  },
  created() {
    this.refreshList();
  }
};
</script>
<style lang="scss">
@import "bitem.scss";
</style>
