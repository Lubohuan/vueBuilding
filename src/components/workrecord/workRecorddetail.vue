<template>
<!--形象进度月计划-->
<div class="planProgress">
   
  
  <el-table :data="tableData" style="width: 100%;margin-top:20px;"   @selection-change="handleSelectionChange" border :header-cell-style="rowClass">
    <!-- <el-table-column type="selection" width="40" align="center"></el-table-column> -->
    <el-table-column type="index" label="序号" width="45" align="center"></el-table-column>
    <el-table-column   label="变更日期" align="center" min-width="100"  :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <span>{{scope.row.createTime}}</span>
      </template>
    </el-table-column>
    <el-table-column   label="变更内容" align="center" min-width="200" :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <span>工程量由“</span>
        <span>{{scope.row.amountOld}}”变更为“</span>
        <span>{{scope.row.amountNew}}”</span>
      </template>
    </el-table-column>
    
    <el-table-column  label="变更人" align="center" min-width="100" :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <span>{{scope.row.createUserName}}</span>
      </template>
    </el-table-column>
    
    
    
    
  
  </el-table>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {updateWorkRecordLog,baseinUrl,} from "../api/system_interface.js";

export default {
  name: "workRecorddetail",
  data() {
    return {
      respUser:'',
      multipleSelection: [],
      respUserList:[],
      dataObj: {},
      valueData:"",
      tableData: [],
      dialog: {
        workRecorddetail: false
      },
      pagesize: 5,
      currentPage: 1,
      state:"",
      stateList:[
        {
          name:"进行中",
          state: 0
        },
        {
          name:"已完成",
          state: 1
        },
        {
          name:"已逾期",
          state: 2
        }
      ],
      total:0,
      projectId: [],
      regionId: [],
      regionIds:null,
      projectIds:null,
      defaultProp:{
        children: "child",
        label: "regionName",
        value: "id"
      },
       defaultProps:{
        children: "child",
        label: "name",
        value: "id"
      },
      roginTreeList:[],
      focusvalue:'',
      focusData:{},
    };
  },
  computed: {
    ...mapState([
     'reginList',
     'listOrgInfoList',
     'listChildOrgInfoList',
    ]),
  },
  methods: {
    ...mapActions([
      'getReginList',
      'getlistOrgInfoList'
    ]),
  
    rowClass({ row, rowIndex}) {
        // console.log(rowIndex) //表头行标号为0
        return 'text-align:center'
    },
    update(data){
      console.log(data);
      this.focusData = data;
      this.refreshList();
    },
   
   
    handleCurrentChange(cpage) {
      this.currentPage = cpage;
      this.refreshList();
    },

    handleSizeChange(psize) {
      this.pagesize = psize;
      this.refreshList();
    },

    //分页查询
    refreshList() {
      updateWorkRecordLog({
        current: this.currentPage,
        offset: this.pagesize,
        logId: this.focusData.id,
        
      })
        .then(response => {
          this.tableData = response.body.rows;
          let length = this.tableData.length;
          for(let i=length;i--;){
            this.tableData[i]['update'] = 0;
          }
          this.total = Number(response.body.page.rows);
        })
        .catch(error => {
          console.log(error);
      });
    },
    //查人员
    async respUserListData(data) {
      listUserInfo(data)
        .then(response => {
          if (response.code == "200") {
             this.respUserList = response.body || [];
            //this.refreshList();
          } else {
            this.respUserList= [];
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
     //查询按钮
    resarchInfo(){
       if(this.regionId.length>=1){
          this.regionIds = this.regionId[this.regionId.length - 1];
       }else{
         this.regionIds = '';
       }
       if( this.projectId.length>=1){
         this.projectIds = this.projectId[this.projectId.length - 1];
       }else{
         this.projectIds = '';
       }
       this.refreshList();
    },
    //选择项变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },



  },
  created(){
    //this.refreshList();
  }
};
</script>
<style lang="scss" scoped>

</style>
