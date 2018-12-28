<template>
<!-- 新增/修改进度计划 -->
<div class="addPlan">
  <el-form :model="dataModel" :rules="rules" ref="addPlan" label-width="135px">
    <el-form-item label="项目名称：" prop="projectIdArry">
        <el-cascader :options="projectList" v-model="dataModel.projectIdArry" :props="defaultProp" size="small" placeholder="请选择项目" style="width:100%;" @change="changeProject" clearable :disabled="iscompany"></el-cascader>
    </el-form-item>
    <el-form-item label="选择统计项：" prop="visualStatId">
         <el-select  size="small" v-model="dataModel.visualStatId" placeholder="请选择形象进度统计项"  style="width:100%;"  @change="changeVisu" clearable>
            <el-option v-for="(item,index) in statisList" :label="item.statName" :value="item.id" :key="index" ></el-option>
        </el-select>
        <span v-if="visualStatObject !== null" style="color:rgb(64, 158, 255);">分部分项：{{visualStatObject.subFullName}}</span>
        <div  v-if="visualStatObject !== null" class="visualSpan">
        <span>预算工程量：{{visualStatObject.budgetTotal}}{{visualStatObject.unitName}}</span>
        <span>已完成工程量：{{visualStatObject.finishBudget}}{{visualStatObject.unitName}}</span>
        <span>剩余工程量：{{visualStatObject.budgetTotal - visualStatObject.finishBudget}}{{visualStatObject.unitName}}</span>
        </div> 
    </el-form-item>
    <el-form-item label="任务名称：" prop="planName">
        <el-input v-model="dataModel.planName" size="small"></el-input>
    </el-form-item>
    <el-form-item label="开始时间：" prop="planStartTime">
         <el-date-picker format="yyyy 年 MM 月 dd 日"  size="small" v-model="dataModel.planStartTime" type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
    </el-form-item>
    <el-form-item label="完成时间：" prop="planEndTime">
        <el-date-picker  :picker-options="pickerOptions1"  format="yyyy 年 MM 月 dd 日"  size="small" v-model="dataModel.planEndTime " type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
    </el-form-item> 
    <el-form-item label="计划完成工程量：" prop="planFinish">
        <el-input v-model.number="dataModel.planFinish " size="small"></el-input>
    </el-form-item>
    <el-form-item label="跟踪频率：" prop="trackCycle">
         <el-select size="small" v-model="dataModel.trackCycle" placeholder="请选择跟踪频率：" clearable style="width:100%;">
            <el-option v-for="(item,index) in trackList" :label="item.name" :value="item.number" :key="index"></el-option>
         </el-select>
    </el-form-item>
    <el-form-item label="施工负责人：" prop="respUser">
         <el-select size="small" v-model="dataModel.respUser" placeholder="请选择负责人" clearable style="width:100%;">
            <el-option v-for="(item,index) in userList" :label="item.trueName" :value="item.id" :key="index"></el-option>
         </el-select> 
    </el-form-item>
  </el-form>
  <div class="clickBtn">
    <el-button @click="close"  size="small">取消</el-button>
    <el-button @click="commit" size="small" type="primary" :disabled="isSuccess">保存</el-button>
  </div>
</div>
</template>

<script>
import { addConstructPlan,updateConstructPlan,getConstructPlanById,getVisualStatItemList,listUserInfo} from "../api/system_interface.js";
import { mapState, mapActions } from 'vuex'
export default {
  name: "addPlan",
  data() {
    return {
      dataModel: {
        projectId: [],
        planEndTime: "",
        planFinish: null,
        planName: "",
        planStartTime: "",
        respUser: null,
        trackCycle: null,
        visualStatId: null,
        projectIdArry:[]
      },
      visualStatObject:null,
      iscompany:false,
      isSuccess:false,
      statisList:[],
      //数据校验
      rules: {
        projectIdArry: [{ required: true, message: "请选择项目", trigger: "blur" }],
        visualStatId: [{ required: true, message: "请选择统计项", trigger: "blur" }],
        planName: [{ required: true, message: "请输入任务名称：", trigger: "blur" }],
        planStartTime: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
        planEndTime: [{ required: true, message: "请选择完成时间", trigger: "blur" }],
        planFinish: [{ required: true, message: "请输入计划完成工程量：", trigger: "blur" }],
        trackCycle: [{ required: true, message: "请选择跟踪频率", trigger: "blur" }],
        respUser: [{ required: true, message: "请选择负责人", trigger: "blur" }]

      },
      trackList:[
        {
          name:'1天一次',
          number:1
        },
         {
          name:'2天一次',
          number:2
        },
         {
          name:'3天一次',
          number:3
        },
         {
          name:'4天一次',
          number:4
        },
         {
          name:'5天一次',
          number:5
        },
         {
          name:'6天一次',
          number:6
        },
         {
          name:'7天一次',
          number:7
        }
        ],
      radio: "",
      progressList: [],
      defaultProp: {
        children: "child",
        label: "name",
        value: "id"
      },
      userList:[],
      // pickerOptions0: {
      //     disabledDate:(time)=> {
      //       return time.getTime() < Date.now();
      //     }
      // },
      pickerOptions1: {
           disabledDate:(time) => {
            var date =  new Date(this.dataModel.planStartTime);
            var y = 1900+date.getYear();
            var m = "0"+(date.getMonth()+1);
            var d = "0"+date.getDate();
            var satrtTime = y+"-"+ m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
            var arr = satrtTime.split("-"); //将获取的时间按“-”拆分成字符串数组
            var year = parseInt(arr[0]); //开分字符串数组的第一个地址的内容是年份
            var month = parseInt(arr[1]); //开分字符串数组的第二个地址的内容是月份
            var prevmonthLastday = (new Date(year, month, 1)).getTime() - 86400000;
            var valueData = new Date(prevmonthLastday); //结束时间
            return time.getTime() <this.dataModel.planStartTime || time.getTime() > valueData;
          }
      }
    };
  },
  computed: {
    ...mapState([
     'projectList'    
    ]),
  },
  methods: {

    ...mapActions([
        'changeListChOrgInfo'
    ]),

    //根据选中的统计项id获取项目信息
    changeVisu(){
     this.visualStatObject = this.statisList.find((v) => v.id === this.dataModel.visualStatId);
     this.dataModel.planName = this.visualStatObject.statName;
    },

    /**
     反显数据
     */
    async update(data) {
      let companyTypes = sessionStorage.getItem("companyType");
      await this.changeListChOrgInfo();
      if(!data.id){
        if(companyTypes == 4){
           this.dataModel.projectIdArry = JSON.parse(sessionStorage.getItem("selectArry"));
           this.changeProject();
        }else{
          this.dataModel.projectIdArry = [];
        }
        this.iscompany = companyTypes == 4?true:false;
      }  
      if (!data.id) return;
      this.dataModel.id = data.id;
      await this.getInfoPlan();
      this.getVisitLIst();
      this.getUserLIst();
       //查找项目父级
      let object = this.$common.initTree(this.projectList);
      this.dataModel.projectIdArry  = this.$common.findParent(object, this.dataModel.projectId);
      this.iscompany = true;
    },

    //重置方法
    reset() {
      const AddStat = this.$refs["addPlan"];
      AddStat.resetFields();
      this.dataModel = {};
      this.dataModel.id = null;
      this.visualStatObject = null;
      this.isSuccess = false;
      this.iscompany = false;
      this.statisList = [];
      this.userList = [];
    },

    //关闭弹框
    close() {
      this.$emit("close");
      this.reset();
    },

    //点击提交
    commit() {
      this.$refs["addPlan"].validate(valid => {
        if (!valid) {
          return;
        }
        this.isSuccess = true;
        this.dataModel.planStartTime = this.$common.fomatDate(this.dataModel.planStartTime);
        this.dataModel.planEndTime = this.$common.fomatDate(this.dataModel.planEndTime);
        this.dataModel.projectId = this.dataModel.projectIdArry[this.dataModel.projectIdArry.length - 1];
        //根据是否有数据传入决定执行新增还是修改
        const result = this.dataModel.id ? this.updatePlan() : this.addPlan();
      });
    },

    //添加进度计划
    addPlan() {
      addConstructPlan(this.dataModel)
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

    //修改进度计划
    updatePlan(){
      updateConstructPlan(this.dataModel)
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
          this.isSuccess = false;
          return false;
        });
      return true;
    },

    //根据id查询进度计划详情
    getInfoPlan(){
      return new Promise((resolve,reject)=>{
         getConstructPlanById(this.dataModel.id)
        .then(response => {
          if (response.code == "200") {
            this.dataModel = response.body;
            resolve();
          } else {
            this.$message.error(response.msg);
          }
        })
        .catch(error => {
          return false;
          reject();
        });
      })
    },

    //查询形象进度统计项
    getVisitLIst(){
      getVisualStatItemList({
        projectId:this.dataModel.projectId
      })
        .then(response => {
          if (response.code == "200") {
           this.statisList = response.body;
          }
          else {
            this.statisList = [];
            this.$message.error(response.msg);          
          }
        })
        .catch(error => {
          this.statisList = [];
          console.log(error);
        });
    },

    //切换项目查询形象进度统计项
    changeProject(){
      this.dataModel.visualStatId = '';
      this.visualStatObject = null;
      if(this.dataModel.projectIdArry.length >= 1){
         this.dataModel.projectId = this.dataModel.projectIdArry[this.dataModel.projectIdArry.length - 1];
         this.getVisitLIst();
         this.getUserLIst(); 
      }
      else{
        this.statisList = [];
      }
    },

     //查询负责人
    getUserLIst(){
      listUserInfo(this.dataModel.projectId)
        .then(response => {
          if (response.code == "200") {
           this.userList = response.body;
           let userObject = this.userList.find((v) => v.id === this.dataModel.respUser);
           if(!userObject){
             this.dataModel.respUser = "";
           }
          }
          else {
            this.userList = [];
            this.$message.error(response.msg);          
          }
        })
        .catch(error => {
          this.userList = [];
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.addPlan {
  .clickBtn {
    text-align: center;
  }
  .el-form-item {
    width: 90%;
  }
  .visualSpan {
   line-height: 10px;
   span{
    color:#999999;
    display: inline-block;
    margin:5px 10px 5px 0;
  }
  }
}
</style>
