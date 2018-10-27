<template>
<!-- 类别管理 -->
<div class="categoryManagement">
  <el-button  type="primary" size="small" @click="addcategory">新建根</el-button>
  <el-button  type="primary" size="small" @click="addcategory" style="margin-left:0px;">新建下级</el-button>
  <el-button-group>
    <el-button  size="small" @click="moveUp">上移</el-button>
    <el-button  size="small" @click="moveDown">下移</el-button>
  </el-button-group>
  <el-button-group>
     <el-button  size="small" @click ="fullExpansion">全展开</el-button>
     <el-button  size="small"  @click="noneExpansion">全收起</el-button>
  </el-button-group>
   <el-table :data="tableData" style="width: 100%" highlight-current-row @current-change="handleCurrentChange" row-key="id" :expand-row-keys="expandArr">
    <el-table-column type="expand" class="expendStyle">
      <template slot-scope="props">
        <el-table :data="props.row.children" :show-header="false">
             <el-table-column prop="name" label="名称" align="center" width="223"></el-table-column>
             <el-table-column prop="code" label="编码"></el-table-column>
             <el-table-column prop="desp" label="备注"></el-table-column>
             <el-table-column label="操作" align="center">
              <template slot-scope="scope">
              <el-button-group>
              <el-button size="small"  type="text" icon="el-icon-edit"   circle @click="editcategory(scope.row)"></el-button>
              <el-button size="small"  type="text" icon="el-icon-delete" circle @click="deletecategory(scope.row)"></el-button>
              </el-button-group>
              </template>
             </el-table-column>          
        </el-table>
       </template>
    </el-table-column>
    <el-table-column prop="name" label="名称"></el-table-column>
    <el-table-column prop="code" label="编码"></el-table-column>
    <el-table-column prop="desp" label="备注"></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
             <el-button-group>
             <el-button size="small"  type="text" icon="el-icon-edit"   circle @click="editcategory(scope.row)"></el-button>
             <el-button size="small"  type="text" icon="el-icon-delete" circle @click="deletecategory(scope.row)"></el-button>
             </el-button-group>
      </template>
    </el-table-column>
  </el-table>

   <!--新增/修改类别-->
    <el-dialog :title="dataObj.id?'修改类别':'新增类别'" :center="true" :visible.sync="dialog.addCategory" width="800px" append-to-body @open="$nextTick(()=>$refs['addCategory'].update(dataObj))">
      <addCategory ref="addCategory" @close="dialog.addCategory = false" ></addCategory>
    </el-dialog>
</div>
</template>

<script>
import addCategory from "../bitem/addCategory.vue";
export default {
  name: "categoryManagement",
  components: {
    addCategory
  },
  data() {
    return {
      tableData: [
        {
          name: "test1",
          code: "001",
          desp: "hello",
          id: 2312312312,
          children: [
            {
              id: 231451,
              name: "test11",
              code: "0011",
              desp: "hello1",
              parentId: "001"
            },
            {
              id: 23452,
              name: "test12",
              code: "0012",
              desp: "hello2",
              parentId: "001"
            }
          ]
        },
        {
          name: "test2",
          code: "002",
          desp: "world",
          id: 12312312312,
          children: [
            {
              id: 12311,
              name: "test21",
              code: "0021",
              desp: "world1",
              parentId: "002"
            },
            {
              id: 12312,
              name: "test22",
              code: "0022",
              desp: "world2",
              parentId: "002"
            }
          ]
        }
      ],
      currentRow: {},
      expandArr: [],
      dataObj: {},
      dialog: {
        addCategory: false
      }
    };
  },
  methods: {
    //单选
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    //上移
    moveUp() {
      var dataIndex = this.tableData.findIndex(i => i == this.currentRow);
      if (dataIndex > 0) {
        let upDate = this.tableData[dataIndex - 1];
        this.tableData.splice(dataIndex - 1, 1);
        this.tableData.splice(dataIndex, 0, upDate);
      } else {
        this.$message({
          type: "info",
          message: "已经是第一条，不可上移"
        });
      }
    },
    //下移
    moveDown() {
      var dataIndex = this.tableData.findIndex(i => i == this.currentRow);
      if (dataIndex + 1 === this.tableData.length) {
        this.$message({
          type: "info",
          message: "已经是最后一条，不可下移"
        });
      } else {
        let downDate = this.tableData[dataIndex + 1];
        this.tableData.splice(dataIndex + 1, 1);
        this.tableData.splice(dataIndex, 0, downDate);
      }
    },
    //全展开
    fullExpansion() {
      if (this.expandArr.length <= 0) {
        for (var i = 0; i < this.tableData.length; i++) {
          this.expandArr.push(this.tableData[i].id);
        }
      }
      console.log(this.expandArr);
    },
    //全收起
    noneExpansion() {
      this.expandArr = [];
    },
    //添加类别
    addcategory() {
      this.dialog.addCategory = true;
      this.dataObj = {};
    },
    //修改类别
    editcategory(data) {
      this.dialog.addCategory = true;
      this.dataObj = data;
    },
    //删除类别
    deletecategory(data) {
      this.$confirm("确定要删除此类别吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$message.success("删除成功!");
        })
        .catch(() => {
          this.$message.error("已取消删除");
        });
    }
  },
  created() {
    console.log(this.expandArr, "ss");
  }
};
</script>
<style lang="scss">
@import "categoryManagement.scss";
.categoryManagement {
  .el-table__expanded-cell {
    padding: 0 !important;
  }
}
</style>
