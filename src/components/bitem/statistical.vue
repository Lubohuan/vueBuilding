<template>
<!--统计单位库-->
<div class="statistical">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">设置 </el-breadcrumb-item>
    <el-breadcrumb-item>统计单位库</el-breadcrumb-item>
    </el-breadcrumb>
  <el-row>
   <el-col :span="10">
      <el-button size="mini" type="primary" @click="addStat">+ 添加统计单位</el-button>
      <el-button size="mini" type="success">导出excel</el-button>
   </el-col>
   <el-col :span="12" class="statistical_btn1">
     <el-select size="small" v-model="companyCode" placeholder="搜索" clearable>
            <el-option v-for="(item,index) in companyList" :label="item.companyName" :value="item.companyCode" :key="index"></el-option>
      </el-select>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="selection" width="80" align="center"></el-table-column>
    <el-table-column prop="name" label="单位名称" align="center"></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editClick(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteClick(scope)">删除</el-button>
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


   <!--新增/修改统计单位-->
    <el-dialog :title="dataObj.id?'修改统计单位':'新增统计单位'" :center="true" :visible.sync="dialog.addStat" width="800px" @open="$nextTick(()=>$refs['addStat'].update(dataObj))">
      <addStat ref="addStat" @close="dialog.addStat = false" ></addStat>
    </el-dialog>
  </div>
</template>

<script>
import addStat from "../bitem/addStat.vue";
export default {
  name: "statistical",
  components: {
    addStat
  },
  data() {
    return {
      multipleSelection: [],
      dataObj: {},
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
        addStat: false
      },
      pagesize: 10,
      currpage: 1,
      currentPage:1
    };
  },
  methods: {
    //选择项变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除单位
    deleteClick(scope) {
       this.$confirm("确定要删除此单位吗", "提示", {
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
    //增加单位
    addStat() {
      this.dialog.addStat = true;
      this.dataObj = {};
    },
    //修改单位
    editClick(scope) {
      this.dialog.addStat = true;
      this.dataObj = scope.row;
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "statistical.scss";
</style>
