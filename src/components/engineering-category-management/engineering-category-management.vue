<template>
<!--工程类别-->
<div class="engineering-category-management">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '' }">设置 </el-breadcrumb-item>
    <el-breadcrumb-item>工程类别管理</el-breadcrumb-item>
    </el-breadcrumb>
  <el-row>
   <el-col :span="24">
      <el-button v-if="hasPerm('111902')" size="mini" type="primary" @click="addEng">+ 添加工程类别</el-button>
      <el-button size="mini" type="success" @click="exportExcel">导出excel</el-button>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="selection" width="50" align="center"></el-table-column>
    <el-table-column prop="typeName" label="工程类别" align="center"></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
            <el-button v-if="hasPerm('111904')" size="mini" type="primary" @click="editClick(scope)">编辑</el-button>
            <el-button v-if="hasPerm('111903')" size="mini" type="danger" @click="deleteClick(scope)">删除</el-button>
            <!-- <el-button size="mini" type="success" @click="deleteClick(scope)">启用</el-button>
            <el-button size="mini" type="warning" @click="deleteClick(scope)">禁用</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <!-- <el-pagination background v-if="total > 0"
      class="pageStyle"
			layout="prev, pager, next, sizes, total, jumper"
			:page-sizes="[5, 10, 15, 20]"
			:page-size="pagesize"
      :current-page.sync="currentPage"
			:total="total"
			@current-change="handleCurrentChange"
			@size-change="handleSizeChange"
			>
	</el-pagination> -->
   <!--新增/修改类别-->
    <el-dialog :title="dataObj.id?'修改工程类别':'新增工程类别'" :center="true" :visible.sync="dialog.addEng" width="800px" @open="$nextTick(()=>$refs['addEng'].update(dataObj))" @close="$refs['addEng'].reset()">
      <addEng ref="addEng" @refreshData="refreshList" @close="dialog.addEng = false" ></addEng>
    </el-dialog>
  </div>
</template>

<script>
import { listProjectType,deleteProjectType,exportEngineerSortByIds,baseinUrl} from "../api/system_interface.js";
import addEng from "../engineering-category-management/addEng.vue";
export default {
  name: "engineering-category-management",
  components: {
    addEng
  },
  data() {
    return {
      multipleSelection: [],
      dataObj: {},
      tableData: [],
      dialog: {
        addEng: false
      },
      pagesize: 10,
      currentPage: 1,
      total:0,
    };
  },
  methods: {

     //页码改变
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.refreshList();
    },

    //每页显示数量改变
    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

    //选择项变化
    handleSelectionChange(val) {
       this.multipleSelection = [];
       for(var i=0;i<val.length;i++){
        this.multipleSelection.push(val[i].id)
      }
    },

    exportExcel(){
      if(this.multipleSelection.length < 1){
        this.$message.success("请选择要导出的类别!");
        return
      }
      this.$axios
        .post( baseinUrl() + "/web/export/exportEngineerSortByIds", this.multipleSelection,{responseType: 'arraybuffer'})
        .then(response => {
           let blob = new Blob([response.data], {type: "application/vnd.ms-excel"}); 
           let objectUrl = URL.createObjectURL(blob);
           window.location.href = objectUrl; 
        })
        .catch(error => {
          this.$message.error(error);
        });
    },

    //删除类别
    deleteClick(scope) {
      this.$confirm("确定要删除此类别吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          deleteProjectType(scope.row.id)
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

    //增加类别
    addEng() {
      this.dialog.addEng = true;
      this.dataObj = {};
    },

    //修改类别
    editClick(scope) {
      this.dialog.addEng = true;
      this.dataObj = scope.row;
    },

    //查询
    refreshList() {
      listProjectType({
        // current: this.currentPage,
        // offset: this.pagesize,
      })
        .then(response => {
          this.tableData = response.body;
          // this.total = Number(response.body.page.rows);
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
@import "engineering-category-management.scss";
</style>
