<template>
<!-- 新增/修改形象进度统计项 -->
<div class="addProgress">
  <el-form :model="dataModel" :rules="rules" ref="addProgress" label-width="135px">
    <el-form-item label="项目名称：" prop="projectId">
        <el-input v-model="dataModel.projectId" size="small"></el-input>
    </el-form-item>
    <el-form-item label="施工区域" prop="regionId" >
         <el-cascader :options="reginList" v-model="dataModel.regionId" :props="defaultProps" size="small" style="width:100%;"></el-cascader>
    </el-form-item>
    <el-form-item label="形象进度统计项：" prop="statName">
        <el-input v-model="dataModel.statName" size="small"></el-input>
    </el-form-item>
    <el-form-item label="选择分部分项：" prop="subId" v-if="dataModel.id === null">
        <el-cascader :options="bitemList" v-model="dataModel.subId" :props="defaultProp" size="small" style="width:100%;" ></el-cascader>
    </el-form-item>
    <el-form-item label="形象单位：" prop="unitId" v-if="dataModel.id === null">
        <el-select size="small" v-model="dataModel.unitId " placeholder="请选择" clearable style="width:100%;">
            <el-option v-for="(item,index) in planList" :label="item.unitName" :value="item.id" :key="index" ></el-option>
        </el-select>      
    </el-form-item>
    <el-form-item label=" 预算工程量：" prop="budgetTotal">
        <el-input v-model="dataModel.budgetTotal" size="small"></el-input>     
    </el-form-item>
    <el-form-item label="工程总产值：" prop="outputTotal">
        <el-input v-model="dataModel.outputTotal" size="small"></el-input>
    </el-form-item>
    <!-- <el-row>
          <el-col :span="17">
            <el-form-item label="工程总产值：" prop="outputTotal" style="width:96%">
              <el-input v-model="dataModel.outputTotal" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="是否自动计算:" prop="radio" label-width="100px">
              <el-radio-group v-model="radio" style="width:110px;">
               <el-radio label="0">是</el-radio>
               <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
    </el-row> -->
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary">保存</el-button>
  </div>
</div>
</template>

<script>
import {
  addVisualStatItem,
  listRegion,
  getSubsectionPage,
  getUnitPage
} from "../api/upload.js";
import { mapState, mapActions } from 'vuex'
export default {
  name: "addProgress",
  data() {
    return {
      dataModel: {
        id:null,
        budgetTotal: null,
        outputTotal:null,
        // finishBudget: 1545,
        // finishOutput: 1545,
        projectId: 12,
        regionId: [],
        statName: "",
        // state: "1",
        subId: [],
        unitId: "",
        dataParent:null,
        parentList:[]
      },
      //数据校验
      rules: {
        projectId: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        regionId: [{ required: true, message: "请选择施工区域", trigger: "blur" }],
        statName: [{ required: true, message: "请输入形象进度统计项名称", trigger: "blur" }],
        subId: [{ required: true, message: "请选择分部分项", trigger: "blur" }],
        unitId: [{ required: true, message: "请选择形象单位", trigger: "blur" }],
        budgetTotal: [{ required: true, message: "请输入预算工程量", trigger: "blur" }],
        outputTotal: [{ required: true, message: "请输入工程总产值", trigger: "blur" }]
      },
      radio: "",
      defaultProps: {
        children: "child",
        label: "regionName",
        value: "id"
      },
      defaultProp: {
        children: "child",
        label: "subName",
        value: "id"
      }
    };
  },
  computed: {
    ...mapState([
     'reginList',
     'bitemList',
     'planList'
    ]),
  },
  methods: {
    ...mapActions([
        'getReginList',
        'getSubsectionList',
        'getUnitList'
    ]),

  deepClone(data){
	let obj = JSON.stringify(data);
	return JSON.parse(obj);
  },

  initTree(data){
	let arr = [];
	for(let i=data.length;i--;){
		if(data[i]['child']){
			arr.push(...this.initTree(data[i]['child']));
			let a = this.deepClone(data[i]);
			delete a.child;
			arr.push(a);
		}else{
			arr.push(data[i]);
		}
	}
	return arr;
  },

  findParent(data,id){
	let arr = [];
	for(let i=data.length;i--;){
		if(id == data[i].id){
			arr.unshift(id);
			arr.unshift(...this.findParent(data,data[i].parentId));
		}
	  }
	  return arr;
  },
    /**
     反显数据
     */
    update(data) {
      this.getReginList();
      this.getSubsectionList();
      this.getUnitList();
      if (!data.id) return;
      this.dataModel ={...data};
      this.dataParent = this.dataModel.id;
      console.log(this.dataParent,"dataParent");
    },

    //重置方法
    reset() {
      const AddStat = this.$refs["addProgress"];
      AddStat.resetFields();
      this.dataModel.budgetTotal = null;
      this.dataModel.outputTotal = null;
      this.dataModel.projectId = 12;
      this.dataModel.regionId = [];
      this.dataModel.statName = "";
      this.dataModel.unitId = "";
      this.dataModel.subId = [];
      this.dataModel.id = null;
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },

    //点击提交
    commit() {
      let object = this.initTree(this.reginList);
      let arr  = this.findParent(object,"129204981474525294");
      console.log( object," object")
      console.log( arr," arr")
      this.$refs["addProgress"].validate(valid => {
        if (!valid) {
          return;
        }
        this.dataModel.regionId = this.dataModel.regionId[this.dataModel.regionId.length - 1];
        this.dataModel.subId    = this.dataModel.subId[this.dataModel.subId.length - 1];
        //根据是否有数据传入决定执行新增还是修改
        const result = this.dataModel.id ? this.updateRegion() : this.addVisualStatItem();
      });
    },

    //添加形象进度统计项
    addVisualStatItem() {
      addVisualStatItem(this.dataModel)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("添加成功!");
            this.close();
            this.$emit("refreshData");
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          this.$message.error(response.msg);
          return false;
        });
      return true;
    },

    //修改形象进度统计项
    updateRegion() {
      updateRegion(this.dataModel)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("修改成功!");
            this.close();
            this.$emit("refreshData");
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          this.$message.error(error);
          return false;
        });
      return true;
    }
  },
  mounted() {   
    // //查询施工区域
    // listRegion({current: 1,offset: 10,projectId: 12})
    // .then(response => {
    //     this.regionList = response.body;
    // })
    // .catch(error => {
    //     console.log(error);
    // });

    // //查询分部分项
    // getSubsectionPage({current: 1,offset: 10,projectType: 1})
    // .then(response => {
    //     this.bitem = response.body;
    // })
    // .catch(error => {
    //     console.log(error);
    // });

    // //查询统计单位
    // getUnitPage({current: 1,offset: 10})
    // .then(response => {
    //     this.stati = response.body.rows;
    // })
    // .catch(error => {
    //     console.log(error);
    // });
  }
};
</script>
<style lang="scss" scoped>
.addProgress {
  .clickBtn {
    text-align: center;
  }
  .el-form-item {
    width: 90%;
  }
  .el-radio + .el-radio {
    margin-left: 10px;
  }
}
</style>
