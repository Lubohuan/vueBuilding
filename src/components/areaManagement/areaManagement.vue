<template>
<!-- 施工区域管理 -->
<div class="areaManagement">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度 </el-breadcrumb-item>
    <el-breadcrumb-item>施工区段管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button size="mini" type="primary">+ 添加分部</el-button>
    <el-button size="mini" type="success">导出excel</el-button>
    <el-row class="tableRow">
    <el-col :span="15">
      <el-select size="small" v-model="companyCode" placeholder="请选择项目" clearable>
        <el-option v-for="(item,index) in companyList" :label="item.companyName" :value="item.companyCode" :key="index"></el-option>
      </el-select>
        <el-select size="small" v-model="companyCode" placeholder="请选择施工区段" clearable>
        <el-option v-for="(item,index) in companyList" :label="item.companyName" :value="item.companyCode" :key="index"></el-option>
      </el-select>
   </el-col>
   <el-col :span="9" class="lightCol">
       <el-button size="mini" type="success" >搜索</el-button>
       <el-button size="mini" >重置</el-button>
   </el-col>
  </el-row>
  <el-row class="tableHead">
    <el-col :span="2" class="tableCol" style="margin-left:38px;">
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
      <el-col :span="3" class="tableCol">
      <span>进行中</span>
    </el-col>
      <el-col :span="3" class="tableCol">
      <span>逾期任务数</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>逾期任务占比</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>未开始</span>
    </el-col>
    <el-col :span="3"  class="tableCol">
      <span>操作</span>
    </el-col>
  </el-row>
  <el-tree :data="tableData" show-checkbox node-key="id" :default-expand-all="false" draggable :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
         <el-row style="width:100%;">
    <el-col :span="2" class="tableCol" style="margin-left:20px;">
    <span>{{ data.date }}</span>
    </el-col>
    <el-col :span="3" class="tableCol">
       <span>{{ data.date }}</span>
    </el-col>
      <el-col :span="2" class="tableCol">
       <span>{{ data.date }}</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>{{ data.date }}</span>
    </el-col>
      <el-col :span="3" class="tableCol">
      <span>{{ data.date }}</span>
    </el-col>
      <el-col :span="3" class="tableCol">
       <span>{{ data.date }}</span>
    </el-col>
      <el-col :span="2" class="tableCol">
       <span>{{ data.date }}</span>
    </el-col>
      <el-col :span="2" class="tableCol">
      <span>{{ data.date }}</span>
    </el-col>
    <el-col :span="4"  class="tableCol">
     <span>
            <el-button size="mini" type="primary"  @click="deleteClick(data)">编辑</el-button>
            <el-button size="mini" type="primary" @click="deleteClick(data)">详情</el-button>
            <el-button size="mini" type="danger"  @click="deleteClick(data)">删除</el-button>
        </span>
    </el-col>
  </el-row>
       
      </span>
   </el-tree>
  </div>
</template>

<script>
export default {
  name: "areaManagement",
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
@import "areaManagement.scss";
</style>
