<template>
<!-- 新增/修改形象进度统计项 -->
<div class="addProgress">
  <el-form :model="dataModel" :rules="rules" ref="updatetask" label-width="150px">
     <el-form-item v-if="isUps" label="项目名称：" prop="projectIdArry">
       <el-cascader :options="listOrgInfoList" v-model="dataModel.projectIdArry" :props="defaultPropss" size="small" placeholder="请选择项目" style="width:100%;" :disabled="isUps" @change="changeCheckProgress"></el-cascader>
    </el-form-item>
    <el-form-item v-else  label="项目名称：" prop="projectIdArry">
       <el-cascader  :options="projectList" v-model="dataModel.projectIdArry" :props="defaultPropss" size="small" placeholder="请选择项目" style="width:100%;" :disabled="isUps" @change="changeCheckProgress"></el-cascader>
    </el-form-item>
    <el-form-item label="施工区域" prop="regionIdArry" >
         <el-cascader ref="checkRegion" change-on-select :options="reginList" v-model="dataModel.regionIdArry" :props="defaultProps" size="small" style="width:100%;" :disabled="isUps" @change="changeCheckRegion"></el-cascader>
    </el-form-item>
    <el-form-item label="选择分部分项：" prop="subIdArry">
        <el-cascader ref="checkBitem"  change-on-select :options="bitemList" v-model="dataModel.subIdArry" :props="defaultProp" size="small" style="width:100%;" :disabled="isUp"  @change="changeCheckBitem"></el-cascader>
    </el-form-item>
     <el-form-item label="形象进度统计项：" prop="statName">
        <el-input v-model="dataModel.statName" size="small"></el-input>
    </el-form-item>
    <el-form-item label="形象单位：" prop="unitId" class="unitem">
        <el-select :disabled="isUp" size="small" v-model="dataModel.unitId " placeholder="请选择" clearable style="width:100%;">
            <el-option v-for="(item,index) in planList" :label="item.unitName" :value="item.id" :key="index" ></el-option>
        </el-select>      
    </el-form-item>
    <el-form-item label=" 预算工程量：" prop="budgetTotal">
        <el-input v-model="dataModel.budgetTotal" size="small" maxlength="9"></el-input>     
    </el-form-item>
    <el-form-item label="工程总产值(万元)：" prop="outputTotal" >
        <el-input v-model="dataModel.outputTotal" size="small" maxlength="9" :disabled="isUp"></el-input>
    </el-form-item>
    <el-form-item label="计划开始时间：" prop="startTime" >
        <el-date-picker
            size="small"
            v-model="dataModel.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
            </el-date-picker>
    </el-form-item>
    <el-form-item label="计划完成时间" prop="endTime" >
        <el-date-picker
            size="small"
            v-model="dataModel.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
            </el-date-picker>
    </el-form-item>
    <el-form-item label="里程碑" prop="isMilestone" >
        <el-checkbox v-model="dataModel.isMilestone">是</el-checkbox>
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
    <el-button @click="commit" size="small" type="primary" :disabled="isSuccess">保存</el-button>
  </div>
</div>
</template>

<script>
import { addVisualStatItem,updateVisualStatItemById,listRegion} from "../api/system_interface.js";
import { mapState, mapActions } from 'vuex'
export default {
  name: "updatetask",
  data() {
    return {
      dataModel: {
        id:null,
        budgetTotal: null,
        outputTotal:null,
        projectId:null,
        regionId: null,
        subId: null,
        statName: "",    
        unitId: "",
        dataParent:null,
        projectIdArry:[],
        regionIdArry:[],
        subIdArry:[],
        startTime:'',
        endTime:'',
        isMilestone:false
      },
      //数据校验
      rules: {
        projectIdArry: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        regionIdArry: [{ required: true, message: "请选择施工区域", trigger: "blur" }],
        statName: [{ required: true, message: "请输入形象进度统计项名称", trigger: "blur" }],
        subIdArry: [{ required: true, message: "请选择分部分项", trigger: "blur" }],
        unitId: [{ required: true, message: "请选择形象单位", trigger: "blur" }],
        budgetTotal: [{ required: true, message: "请输入预算工程量", trigger: "blur" }],
        outputTotal: [{ required: true, message: "请输入工程总产值", trigger: "blur" }],
        startTime: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
        endTime: [{ required: true, message: "请选择完成时间", trigger: "blur" }],
        isMilestone: [{ required: true, message: "请选择是否里程碑", trigger: "blur" }],
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
      },
      defaultPropss: {
        children: "child",
        label: "name",
        value: "id"
      },
      isUp:false,
      isUps:false,
      isSuccess:false,
      checkReginLabel:'',
      checkBitemLabel:'',
      checkdProgress:'',
      reginList:[{regionName:"暂无数据",id:'0',disabled: true}]
    };
  },
  computed: {
    ...mapState([
     'bitemList',
     'planList',
     'projectList',
     'listOrgInfoList'
    ]),
  },
  methods: {
    ...mapActions([
        'getSubsectionList',
        'getUnitList',
        'changeListChOrgInfo',
        'getlistOrgInfoList'
    ]),

    //根据选择的项目查询施工区段
    changeCheckProgress(){
      return new Promise((resolve, reject) => {
        this.reginList = [];
        this.checkdProgress =  this.dataModel.projectIdArry[this.dataModel.projectIdArry.length - 1];
        listRegion({projectId:this.checkdProgress,})
          .then(response => {
            if(response.body.length>1){
              this.reginList = response.body;
            }else{
              this.reginList = [{regionName:"暂无数据",id:'0',disabled: true}]
            }         
            resolve()
          })
          .catch(error => {
            console.log(error);
            reject();
          });
      })
    },

    changeCheckRegion(){   
      this.checkReginLabel = this.$refs["checkRegion"].currentLabels.join("/");
      this.dataModel.statName = this.checkReginLabel + '/' + this.checkBitemLabel;      
    },

    changeCheckBitem(){
      this.checkBitemLabel = this.$refs["checkBitem"].currentLabels.join("/");
      this.dataModel.statName = this.checkReginLabel + '/' + this.checkBitemLabel;
    },
    /**
     反显数据
     */
    async update(data) {
      console.log('进入调用');
      //this.reset();
        if(data.isMilestone == '0'){
            data.isMilestone = false;
        }else{
            data.isMilestone = true;
        }
      
      await this.getSubsectionList();
      this.getUnitList();
      let companyTypes = sessionStorage.getItem("companyType");
      
    //   if(data.optype == 'add'){         
    //     //项目层级自动回填项目并且不能修改
    //     if(companyTypes == 4){
    //        this.dataModel.projectIdArry = JSON.parse(sessionStorage.getItem("selectArry"));
    //        this.changeCheckProgress();
    //     }else{
    //       this.dataModel.projectIdArry = [];
    //     }
    //    // this.isUps = companyTypes == 4?true:false;
         
    //   }      
      if(data.optype == 'add'){
          this.isUps = true;
      }    
      this.changeListChOrgInfo();  
      this.getlistOrgInfoList();
      //if (data.optype == 'add') return;
      this.dataModel ={...data};
      //this.isUp = true;
      //this.isUps = true;

      //查找项目父级
      let object = this.$common.initTree(this.listOrgInfoList);
      this.dataModel.projectIdArry  = this.$common.findParent(object,data.projectId);
      await this.changeCheckProgress();

      //查找地区父级
      let objects = this.$common.initTree(this.reginList);
      //this.dataModel.regionIdArry  = this.$common.findParents(objects,data.regionId);
      // setTimeout(()=>{
      //   this.dataModel.regionIdArry  = this.$common.findParents(objects,data.regionId);
      // },0);this.$set.(key, value)
      this.$set(this.dataModel,'regionIdArry', this.$common.findParents(objects,data.regionId));
      console.log(this.dataModel.regionIdArry,'父区域');
      //查找分部分项父级
      let objectss = this.$common.initTree(this.bitemList);
      this.dataModel.subIdArry  = this.$common.findParents(objectss,data.subId);
      console.log(this.dataModel.subIdArry,'分部分项');
      // console.log(this.dataModel.subIdArry,'this.dataModel.subIdArry ');
    },

    //重置方法
    reset() {
      const AddStat = this.$refs["updatetask"];
      AddStat.resetFields();
      this.dataModel.budgetTotal = null;
      this.dataModel.outputTotal = null;
      this.dataModel.projectId = '';
      this.dataModel.regionId = '';
      this.dataModel.statName = "";
      this.dataModel.unitId = "";
      this.dataModel.subId = '';
      this.dataModel.id = null;
      this.dataModel.regionIdArry = [];
      this.dataModel.subIdArry = [];
      this.dataModel.projectIdArry = [];
      this.dataModel.isMilestone = false;
      this.isSuccess = false;
      this.isUp = false;
      this.isUps = false;
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },

    //点击提交
    commit() {
      console.log(this.dataModel.startTime,"this.dataModel.subIdArry");
      this.$refs["updatetask"].validate(valid => {
        if (!valid) {
          return;
        }
         this.isSuccess = true;
         this.dataModel.regionId  = this.dataModel.regionIdArry[this.dataModel.regionIdArry.length - 1];
         this.dataModel.subId     = this.dataModel.subIdArry[this.dataModel.subIdArry.length - 1];
         this.dataModel.projectId = this.dataModel.projectIdArry[this.dataModel.projectIdArry.length - 1];
         this.dataModel.isMilestone = this.dataModel.isMilestone == true?1:0;
        //根据是否有数据传入决定执行新增还是修改
        const result = this.dataModel.optype =='update' ? this.updateVisualStatItemById() : this.addVisualStatItem();
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
          this.isSuccess = false;
          return false;
        });
      return true;
    },

    //修改形象进度统计项
    updateVisualStatItemById() {
      updateVisualStatItemById(this.dataModel)
        .then(response => {
          if (response.code == "200") {
            this.$message.success("修改成功!");
            this.close();
            this.reset();
            this.$emit("refreshData");
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          this.isSuccess = false;
          return false;
        });
      return true;
    }
  },
  mounted() {}
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
