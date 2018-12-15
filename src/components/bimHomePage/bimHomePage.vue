<template>
<!--形象进度统计项-->
<div class="bimHomePage">
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadTitle">
    <el-breadcrumb-item :to="{ path: '/' }">BIM应用  </el-breadcrumb-item>
    <el-breadcrumb-item>图纸管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-row>
   <el-col :span="10">
      <el-button size="mini" type="primary" @click="importBim">+上传图纸</el-button>
   </el-col>
  </el-row>
   <el-row class="graphicProgress_row">
   <el-col :span="15">
      <el-date-picker value-format="yyyy-MM-dd" size="small" v-model="setvalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:225px;padding-top:1px;" :picker-options="pickerOptions"></el-date-picker>
      <el-select size="small" v-model="stateInfo" placeholder="上传状态" clearable>
                <el-option v-for="(item,index) in stateList" :label="item.name" :value="item.state" :key="index"></el-option>
      </el-select>
      <el-select size="small" v-model="flieTypeInfo" placeholder="文件类型" clearable>
                <el-option v-for="(item,index) in filetypeList" :label="item.name" :value="item.name" :key="index"></el-option>
      </el-select>
    </el-col>
   <el-col :span="9" class="graphicProgress_btn1">
       <el-button size="mini" type="success" @click="resarchInfo">搜索</el-button>
       <el-button size="mini" @click="resetForm">重置</el-button>
   </el-col>
  </el-row>
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"    border >
    <el-table-column type="selection" width="50" align="center"></el-table-column>
    <el-table-column prop="projectName"  label="项目名称" align="center"></el-table-column>
    <el-table-column prop="name"  label="图纸名称" align="center"></el-table-column>
    <el-table-column prop="lengthView" label="大小" align="center" min-width="160"></el-table-column>
    <el-table-column prop="createTime" label="上传时间" align="center" min-width="180" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column prop="state" label="转换状态" align="center" min-width="180" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 5" ><span class="finish"></span>转换成功</span>
          <span v-else-if="scope.row.state == 6" ><span class="overTime"></span>转换失败</span>
          <span v-else><span class="starting"></span>转换中</span>
          <!-- <span v-if="scope.row.state == 3" ><span class="notStatr"></span>未开始</span> -->
       </template>
    </el-table-column>
    <el-table-column prop="transTime" label="耗时" align="center" min-width="120" :show-overflow-tooltip="true"></el-table-column>
    <el-table-column label="操作" align="center" min-width="240">
      <template slot-scope="scope">           
            <el-button size="mini" type="primary" @click="lookClick(scope.row)">查看</el-button>
            <el-button size="mini" type="success" @click="DownClick(scope.row)">下载</el-button>
            <el-button size="mini" type="danger" @click="deleteClick(scope.row)">删除</el-button>   
      </template>
    </el-table-column>
  </el-table>
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


   <!--导入bim文件-->
    <el-dialog  :center="true" :visible.sync="dialog.importBim" width="1200px" :show-close="false" :close-on-click-modal="false" @open="$nextTick(()=>$refs['importBim'].update())">
      <importBim  ref="importBim" @refreshData="timeshowImg"  @close="dialog.importBim = false" ></importBim>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import importBim from"../bimHomePage/importBim.vue";
import {getDrawingPage,getViewToken,deleteDrawing,getDownloadUrl} from "../api/system_interface.js";
export default {
  name: "bimHomePage",
  components: {
      importBim
  },
  data() {
    return {
      multipleSelection: [],
      dataObj: {},
      tableData: [],
      dialog: {
        importBim: false
      },
      dataModel:"",
      pagesize: 10,
      currentPage: 1,
      total:0,
      flieTypeInfo:'',
      stateInfo:'',
      setvalue:'',
      startTime:'',
      endTime:'',
      flieTypeInfos:'',
      stateInfos:'',
      stateList:[
        {
        state:1,
        name:"转换中"
      },{
        state:2,
        name:"转换成功"
      },{
        state:0,
        name:"转换失败"
      }],
      filetypeList:[
        {type:1,
        name:"rvt"
        },
        {type:2,
        name:"rfa"
        },
        {type:3,
        name:"dwg"
        },
        {type:4,
        name:"dxf"
        },
        {type:5,
        name:"skp"
        },
        {type:6,
        name:"ifc"
        },
        {type:7,
        name:"dgn"
        },
        {type:8,
        name:"obj"
        },
        {type:9,
        name:"stl"
        },
        {type:10,
        name:"3ds"
        },
        {type:11,
        name:"dae"
        },
        {type:12,
        name:"ply"
        },
        {type:12,
        name:"igms"
        }
      ],
      t1:null,
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
      }, 
     
    };
  },
  methods: {

    //增加方法
    importBim() {
      this.dialog.importBim = true;
      this.dataObj = {};
      window.clearInterval(this.t1);
    },


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

    //分页查询
    refreshList() {
      getDrawingPage({
        current: this.currentPage,
        offset: this.pagesize,
        state:this.stateInfos,
        suffix:this.flieTypeInfos,
        startTime:this.startTime,
        endTime:this.endTime
      })
        .then(response => {
          this.tableData = response.body.rows;
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
        });
    },

    //查看图纸
    lookClick(data){ 
       getViewToken(data.fileId)
        .then(response => {
          var lookurl = encodeURI("static/bimLook.html?ViewToken=" + response.body + "&name="+data.name);   //使用encodeURI编码
          window.open(lookurl);
        })
        .catch(error => {
          console.log(error);
        });
    },

    //下载图纸
    DownClick(data){
       getDownloadUrl(data.fileId)
        .then(response => {
          window.location = response.body;
        })
        .catch(error => {
          console.log(error);
        });
    },


    //删除图纸
    deleteClick(data) {
      this.$confirm("确定要删除此项吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          deleteDrawing(data.id)
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

    //查询按钮
    resarchInfo(){
       this.stateInfos = this.stateInfo;
       this.flieTypeInfos = this.flieTypeInfo;
       if(this.setvalue&&this.setvalue.length>=1){
         this.startTime = this.setvalue[0];
         this.endTime = this.setvalue[1];
       }
       else{
         this.startTime = null;
         this.endTime = null;
       }
       this.refreshList();
    },
    
    timeshowImg(){  
    this.t1 = window.setInterval(this.refreshList,2000);    
      // for(var i=0;i<this.tableData.length;i++){
      //     if(this.tableData[i].state !=5){
      //       var t1 = window.setInterval(this.refreshList,1000);
      //       console.log(111);
      //     }
      //     else{
      //       window.clearInterval(t1);   
      //     }
      // }    
    },

    //重置搜索框
    resetForm(){
      this.setvalue = ''; 
      this.stateInfo = null;
      this.flieTypeInfo = null;
      this.startTime = null;
      this.endTime = null;
    }
  },
  created() {
    this.refreshList();
  }
};
</script>
<style lang="scss">
.bimHomePage{
    .graphicProgress_row{
        margin-top: 20px;
    }
    .graphicProgress_btn1{
        text-align: right;
    }
    .pageStyle{
        margin-top: 20px;
        text-align: right;
    }
    .el-range-editor--small .el-range-separator{
          line-height: 27px !important;
    }
}
</style>
