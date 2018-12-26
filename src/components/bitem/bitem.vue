<template>
<!-- 分部分项库 -->
<div class="bitem">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">设置 </el-breadcrumb-item>
    <el-breadcrumb-item>分部分项库</el-breadcrumb-item>
    </el-breadcrumb>
   <el-row>
    <el-col :span="24">
      <el-tabs v-model="projectType" type="card" @tab-click="handleClick">
      <el-tab-pane :key="item.id" v-for="item in projectTypeList" :label="item.typeName" :name="item.id"></el-tab-pane>
      </el-tabs>
  </el-col>
  <!-- <el-col :span="4" class="bitem_btn">
      <el-button  type="text" @click="categoryManagement"><i class="el-icon-edit el-icon--right"></i>类别管理</el-button>
  </el-col> -->
  </el-row>
  <el-row>
   <el-col :span="24">
      <el-button size="mini" type="primary" @click="addSub">+ 添加分部</el-button>
      <el-button size="mini" type="success" @click="exportExcel">导出excel</el-button>
   </el-col>
   <!-- <el-col :span="19" class="bitem_btn1">
      <el-input v-model="subName" size="small" placeholder="搜索" clearable @change="resarchBitem" style="width:200px;"></el-input>
   </el-col> -->
  </el-row>
  <el-row class="tableHead">
    <el-col :span="20" class="tableCol">
      <div>分部分项划分名称</div>
    </el-col>
    <el-col :span="4"  class="tableCol" style="border-left:1px solid #e4e7ed;">
      <div>操作</div>
    </el-col>
  </el-row>
  <el-tree ref="tree" :data="tableData" show-checkbox node-key="id" :default-expand-all="false" :expand-on-click-node="false" :props="defaultProps">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span style="margin-left:100px;font-size:12px;">{{ data.subName }}</span>
        <span>
            <el-button size="mini" type="primary"  @click="addSubChild(data)">添加子项</el-button>
            <el-button size="mini" type="primary"  @click="editSub(data)">编辑</el-button>
            <el-button size="mini" type="danger"   @click="deleteClick(data)">删除</el-button>
        </span>
      </span>
   </el-tree>
   <el-pagination background v-if="total>0"
      class="pageStyle"
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="pagesize"
      :current-page="currentPage"
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
import { getSubsectionPage, deleteSubsectionById,listProjectType,exportSubsectionByIds,baseinUrl } from "../api/system_interface.js";
export default {
  name: "bitem",
  components: {
    categoryManagement,
    addSubsection,
    addSubChid
  },
  data() {
    return {
      multipleSelection: [],
      tableData: [],
      defaultProps: {
        children: "child"
      },
      projectTypeList:[],
      projectType: "",
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
    //切换工程标签
    handleClick(tab) {
      console.log(tab.name);
      this.refreshList();
    },

    //导出excel
    exportExcel(){
      // let object = this.$common.initTree(this.multipleSelection).map(v=>v.id);
      // this.multipleSelection = this.$refs.tree.getCheckedKeys();

        let x = this.$refs.tree.getCheckedKeys();
        for(var i=0;i<x.length;i++){
              if(this.$refs.tree.getNode(x[i]).parent.data.id){
                x.push(this.$refs.tree.getNode(x[i]).parent.data.id);
              }
        }
        let y = new Set(x);
        this.multipleSelection = [...y];

       if(this.multipleSelection.length < 1){
          this.$message.success("请选择要导出的类别!");
          return
       }
        this.$axios({
          method:"post",
          url:baseinUrl() + "/web/export/exportSubsection",
          data:this.multipleSelection,
          headers:{
              'token':sessionStorage.getItem("userToken")
          },
          responseType: 'arraybuffer'
        }).then(response => {
          //  if(response.code == "200"){
              let blob = new Blob([response.data], {type: "application/vnd.ms-excel"}); 
              let objectUrl = URL.createObjectURL(blob);
              window.location.href = objectUrl; 
          //  }else{
          //    this.$message.error('系统异常');
          //  }
        })
        .catch(error => {
          this.$message.error(error);
        });

      //  this.$axios
      //   .post( baseinUrl() + "/web/export/exportSubsectionByIds", this.multipleSelection,{responseType: 'arraybuffer'})
      //   .then(response => {
      //      if(response.code == "200"){
      //         let blob = new Blob([response.data], {type: "application/vnd.ms-excel"}); 
      //         let objectUrl = URL.createObjectURL(blob);
      //         window.location.href = objectUrl; 
      //      }else{
      //        this.$message.error('系统异常');
      //      }
          
      //   })
      //   .catch(error => {
      //     this.$message.error(error);
      //   });
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
      this.subObject.projectType = this.projectType;
    },

    //添加子项
    addSubChild(data) {
      this.dialog.addSubChid = true;
      this.subObject = data;
      this.subObject.projectType = this.projectType;
    },
    
    //编辑分部分项
    editSub(data) {
      this.dialog.addSubsection = true;
      this.subObject = data;
    },

    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.refreshList();
    },

    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

    //查询分部分项库
    refreshList() {
        getSubsectionPage({
        projectType: this.projectType,
        subName:this.subName
      })
        .then(response => {
          if (response.code == "200") {
                if(response.body){
                  this.tableData = response.body[0].child;
                }
                else{
                   this.tableData = [];
                }
                
              } else {
                this.$message.error(response.msg);
              }
        })
        .catch(error => {
          console.log(error);
      })  
    },

    //查询工程类别
    refreshLists(){
       return new Promise((resolve, reject) => {
        listProjectType({})
        .then(response => {
          this.projectTypeList = response.body;
          resolve()
        })
        .catch(error => {
          console.log(error);
          reject();
        });
      })
    },

    //等待查询工程类别完成
    async awaitList(){
      await this.refreshLists();
      this.projectType = this.projectTypeList[0].id;
      this.refreshList();
    },

    //搜索框
    resarchBitem(){
      this.refreshList();
    }
  },
  created() {
    this.awaitList();
  }
};
</script>
<style lang="scss">
@import "bitem.scss";
</style>
