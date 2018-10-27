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
      <el-button size="mini" type="primary">+ 添加分部</el-button>
      <el-button size="mini" type="success">导出excel</el-button>
   </el-col>
   <el-col :span="19" class="bitem_btn1">
     <el-select size="small" v-model="companyCode" placeholder="搜索" clearable>
            <el-option v-for="(item,index) in companyList" :label="item.companyName" :value="item.companyCode" :key="index"></el-option>
      </el-select>
   </el-col>
  </el-row>
  <!-- <el-table :data="tableData" style="width: 100%"   @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="80" align="center"></el-table-column>
    <el-table-column prop="date" label="分部分项划分名称" align="center"></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
            <el-button size="small" type="primary" @click="deleteClick(scope)">添加子项</el-button>
            <el-button size="small" type="primary" @click="deleteClick(scope)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteClick(scope)">删除</el-button>
      </template>
    </el-table-column>
     <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand" v-for="item in props.row.child" :key="item.id">
          <el-form-item label="商品名称">
            <span>{{ item.date}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
  </el-table> -->
  <el-row class="tableHead">
    <el-col :span="20" class="tableCol">
      <div>分部分项划分名称</div>
    </el-col>
    <el-col :span="4"  class="tableCol">
      <div>操作</div>
    </el-col>
  </el-row>
  <el-tree :data="tableData" show-checkbox node-key="id" :default-expand-all="false" draggable :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span style="margin-left:100px;">{{ data.date }}</span>
        <span>
            <el-button size="mini" type="primary"  @click="deleteClick(data)">添加子项</el-button>
            <el-button size="mini" type="primary" @click="deleteClick(data)">编辑</el-button>
            <el-button size="mini" type="danger"  @click="deleteClick(data)">删除</el-button>
        </span>
      </span>
   </el-tree>

   <!--类别管理-->
    <el-dialog title="类别管理" :center="true" :visible.sync="dialog.modify" width="800px">
      <categoryManagement ref="categoryManagement" @close="dialog.modify = false" ></categoryManagement>
    </el-dialog>
  </div>
</template>

<script>
import categoryManagement from "../bitem/categoryManagement.vue";
export default {
  name: "bitem",
  components: {
    categoryManagement
  },
  data() {
    return {
      activeName: "first",
      multipleSelection: [],
      tableData: [
        {
          id: 1,
          date: 11,
          children: [
            {
              id: 11,
              date: 111
            }
          ]
        },
        {
          id: 2,
          date: 22
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
        modify: false
      }
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
    deleteClick(scope) {
      console.log(scope);
    },
    categoryManagement() {
      this.dialog.modify = true;
    }
  }
};
</script>
<style lang="scss">
@import "bitem.scss";
</style>
