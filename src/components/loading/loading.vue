<template>
  <!--等待页面-->
  <!-- <div class="loading" style="width:100%;height:100%;"   v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div> -->
  <div>
    <el-table :data="tableData" border @cell-dblclick="celledit" style="width: 671px;height:243px">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="date" label="日期" width="180">
        <template slot-scope="scope">
          <el-date-picker v-if="scope.row.date.edit" v-model="scope.row.date.value" ref="date" style="width: 100%" type="date" value-format="yyyy-MM-dd" @blur="scope.row.date.edit = false"></el-date-picker>
          <span v-else>{{ scope.row.date.value }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" edit="false">
        <template slot-scope="scope">
          <el-input v-if="scope.row.name.edit" ref="name" v-model="scope.row.name.value" style="width: 100%" @blur="scope.row.name.edit = false"></el-input>
          <span v-else>{{ scope.row.name.value }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" width="260" label="地址">
        <template slot-scope="scope">
          <el-input v-if="scope.row.address.edit" ref="address" v-model="scope.row.address.value" style="width: 100%" @blur="scope.row.address.edit = false"></el-input>
          <span v-else>{{ scope.row.address.value }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
export default {
  name: "loading",
  data() {
    return {
      loading: true,
       tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄',
            edit: false
          }]
    };
  },
  methods: {
    // ...mapActions(["getlistOrgInfoList"]),
    formatData(){
					this.tableData.forEach(item => {
          	for( var key in item) {
            	item[key] = {
              	value: item[key],
                edit: false
              }
            }
          })
          console.log(this.tableData)
        },
      	celledit(row, column, cell, event){
        	if(row[column.property]){
          	row[column.property].edit = true
            setTimeout(() => {
            	this.$refs[column.property].focus()
            }, 20)
          }
        	
        }
  },
  created() {
    this.formatData();
    // setTimeout(() => {
    //   this.$store.dispatch("getUserToken", this.$route.params.token);
    //   this.getlistOrgInfoList();
    //   this.loading = false;
    //   this.$router.go(-1);
    // }, 0);
  }
};
</script>
