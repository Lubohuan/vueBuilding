<template>
<!--任务预警-->
<div class="taskWarning">
   <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">生产形象进度  </el-breadcrumb-item>
    <el-breadcrumb-item>预警督办</el-breadcrumb-item>
    <el-breadcrumb-item>任务预警</el-breadcrumb-item>
  </el-breadcrumb>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border>
    <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
    <el-table-column prop="name"  label="项目名称" align="center"></el-table-column>
    <el-table-column prop="name"  label="任务名称" align="center"></el-table-column>
    <el-table-column prop="name"  label="施工区段" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="预警原因" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="负责人" align="center"></el-table-column>
    <el-table-column prop="name"  label="预约时间" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="责任人" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="预警时间" align="center" min-width="120"></el-table-column>
    <el-table-column prop="name"  label="操作" align="center" min-width="200">
      <template slot-scope="scope">
         <el-button size="mini" type="primary" @click="remindSupervise(scope.row)">督办</el-button>
         <el-button size="mini" type="success" @click="relieveReason(scope.row)">解除预警</el-button>
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

    <!--提醒督办-->
    <el-dialog title="提醒督办" :center="true" :visible.sync="dialog.supervise" width="700px" @open="$nextTick(()=>$refs['supervise'].update(remindData))">
      <supervise ref="supervise" @close="dialog.supervise = false" ></supervise>
    </el-dialog>
   
   <!--解除预警-->
    <el-dialog title="解除预警" :center="true" :visible.sync="dialog.relieveReason" width="600px" >
      <el-form :model="relieveReasons"  label-width="100px">
        <el-form-item prop="reason" label="解除预警原因:">
          <el-input v-model="relieveReasons.reason" size="small" placeholder="请输入解除预警原因"></el-input>
        </el-form-item>
      </el-form>
      <div class="clickBtn">
        <el-button @click="dialog.relieveReason = false;relieveReasons={}"  size="small">取消</el-button>
        <el-button  size="small" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import supervise from "../taskWarning/supervise.vue";
export default {
  name: "taskWarning",
  components:{
      supervise
  },
  data() {
    return {
      multipleSelection: [],
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
      relieveReasons:{
          id:"",
          reason:""
      },
      remindData:{},
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
        supervise:false,
        relieveReason: false
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
    supervise(){
       this.dialog.supervise = true;
       this.dataObj = {}
    },
    //编辑
    editPlan(data){
        this.dialog.supervise = true;
        this.dataObj = data;
    },
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    //解除预警
    relieveReason(data){
      this.relieveReasons.id = data.id;
      this.dialog.relieveReason = true;  
    },
    //提醒督办
    remindSupervise(data){
      this.remindData= data;
      this.dialog.supervise = true;  
    }
  }
};
</script>
<style lang="scss" scoped>
@import "taskWarning.scss";
</style>
