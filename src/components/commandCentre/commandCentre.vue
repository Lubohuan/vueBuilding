<template>
<!--指挥中心-->
<div class="commandCentre">    
    <el-row :gutter="20">
        <el-col :span="6" >
        <div class="commandCard">
            <div>
                <img src="../../assets/u484.png" alt="" class="despImage">
                <div class="cradContent">
                    <div class="desp_look">今日完成生产任务</div>
                    <div class="desp_personal">负责人</div>
                </div>
             </div>
             <div class="cardFooter">
                <span>同周比：
                   <span>
                       <img v-if="imageData === 'up'" src="../../assets/u489.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                    </span>
                   <span>2.23%</span> 
                </span>
                <span class="footerRight">日环比:
                    <span>
                       <img v-if="imageData === 'up'" src="../../assets/u489.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                    </span>
                    <span>23%</span>
                </span>
             </div>
        </div>
        </el-col>
        <el-col :span="6">
        <div class="commandCard">
            <div>
            <img src="../../assets/u484.png" alt="" class="despImage">
                       <div  class="cradContent">
                            <div class="desp_look">今日产值</div>
                            <div class="desp_personal">负责人</div>
                       </div>
            </div>
            <div class="cardFooter">
                <span>同周比：
                   <span>
                       <img v-if="imageData === 'up'" src="../../assets/u489.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                    </span>
                   <span>2.23%</span> 
                </span>
                <span class="footerRight">日环比:
                    <span>
                       <img v-if="imageData === 'up'" src="../../assets/u489.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u493.png" alt="" class="upDownImage downImage">
                    </span>
                    <span>23%</span>
                </span>
            </div>
        </div>
    </el-col>
    <el-col :span="6" >
        <div class="commandCards">
            <div class="cradContents">
                <span class="desp_looks">产值完成情况</span>
                <el-progress :stroke-width="18" :percentage="70"></el-progress>
                </div>
                <div class="cardFooters">
                <span>同周比：
                   <span>
                       <img v-if="imageData === 'up'" src="../../assets/u514.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u518.png" alt="" class="upDownImage downImage">
                    </span>
                   <span>2.23%</span> 
                </span>
                <span class="footerRight">日环比:
                    <span>
                       <img v-if="imageData === 'up'" src="../../assets/u514.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u518.png" alt="" class="upDownImage downImage">
                    </span>
                    <span>23%</span>
                </span>
                </div>
            </div>
    </el-col>
    <el-col :span="6" >
        <div class="commandCards">
           <div class="cradContents">
                <span class="desp_looks">合同工期进度</span>
                <el-progress :stroke-width="18" :percentage="70"></el-progress>
                </div>
            <div class="cardFooters">
              <span>同周比：
                   <span>
                       <img v-if="imageData === 'up'" src="../../assets/u514.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u518.png" alt="" class="upDownImage downImage">
                    </span>
                   <span>2.23%</span> 
                </span>
                <span class="footerRight">日环比:
                    <span>
                       <img v-if="imageData === 'up'" src="../../assets/u514.png" alt="" class="upDownImage" >
                       <img v-else src="../../assets/u518.png" alt="" class="upDownImage downImage">
                    </span>
                    <span>23%</span>
                </span>
            </div>
      </div>
    </el-col>
</el-row>
<div class="tableDiv">
    <el-row class="tableTitle">
          <el-col :span="18">
             <span class="blueBlock"></span>
             <span class="spanBlock">产值进度</span>
          </el-col>
          <el-col :span="6" style="text-align:right;">
            <el-radio-group v-model="tabPosition" size="small">
             <el-radio-button label="最近七天">最近七天</el-radio-button>
             <el-radio-button label="本周">本周</el-radio-button>
             <el-radio-button label="上周">上周</el-radio-button>
            </el-radio-group>
          </el-col>
      </el-row>
      <el-table  border :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
       <el-table-column prop="name" label="施工区段" align="center"></el-table-column>
       <el-table-column prop="name" label="计划任务名称" align="center" min-width="120"></el-table-column>
       <el-table-column prop="name" label="设计工程量" align="center" min-width="120"></el-table-column>
       <el-table-column prop="name" label="累计完成" align="center" min-width="120"></el-table-column>
       <el-table-column prop="name" label="累计完成百分比" align="center" min-width="120"></el-table-column>
       <el-table-column prop="name" label="本月计划" align="center"></el-table-column>
       <el-table-column prop="name" label="本月完成" align="center"></el-table-column>
       <el-table-column prop="name" label="完成比例" align="center"></el-table-column>
       <el-table-column prop="name" label="24" align="center" ></el-table-column>
       <el-table-column prop="name" label="25" align="center" ></el-table-column>
       <el-table-column prop="name" label="26" align="center" ></el-table-column>
       <el-table-column prop="name" label="27" align="center" ></el-table-column>
       <el-table-column prop="name" label="28" align="center" ></el-table-column>
       <el-table-column prop="name" label="29" align="center" ></el-table-column>
       <el-table-column prop="name" label="30" align="center" ></el-table-column>
      </el-table>
    </div>
     <div class="tableDiv" style="border-top:none;">
      <el-row class="tableTitle">
          <el-col :span="18">
             <span class="blueBlock"></span>
             <span class="spanBlock">施工区域进展</span>
          </el-col>
          <el-col :span="6" style="text-align:right;">
            <el-radio-group v-model="tabPositions" size="small">
             <el-radio-button label="最近七天"></el-radio-button>
             <el-radio-button label="本周"></el-radio-button>
             <el-radio-button label="上周"></el-radio-button>
            </el-radio-group>
          </el-col>
      </el-row>
     
      <el-table  border :data="tableData" style="width: 100%">
       <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
       <el-table-column prop="name" label="施工区段" align="center"></el-table-column>
       <el-table-column prop="name" label="分部分项名称" align="center"></el-table-column>
       <el-table-column prop="name" label="预算工程量" align="center" min-width="120"></el-table-column>
       <el-table-column prop="name" label="今日完成工程量" align="center" min-width="120"></el-table-column>
       <el-table-column prop="name" label="累计完成工程量" align="center"></el-table-column>
       <el-table-column prop="name" label="累计完成比例" align="center" min-width="120"></el-table-column>
       <el-table-column prop="name" label="今日完成产值" align="center"></el-table-column>
       <el-table-column prop="name" label="累计完成产值" align="center"></el-table-column>
       <el-table-column prop="name" label="累计完成比例" align="center" ></el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
  name: "commandCentre",
  data() {
    return {
      tableData: [],
      activeName: "first",
      value6: "",
      personalData: {},
      textarea: "",
      monthData1: "",
      monthData2: "",
      monthData: "",

      dayData1: "",
      dayData2: "",
      dayData3: "",
      dayData: "",
      weekData: "",
      imageData:"up",
      tabPosition:"最近七天",
      tabPositions:"最近七天"
    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
      console.log(this.activeName, "tab");
    },

    //月份减
    reduceMonth() {
      var arr = this.monthData.split("-");
      var year = parseInt(arr[0]);
      var month = parseInt(arr[1]);
      //判断month
      if (month == 1) {
        year = year - 1;
        month = 12;
      } else {
        month = month - 1;
      }
      this.monthData = year + "-" + month;
    },

    //月份加
    addMonth() {
      var arr = this.monthData.split("-");
      var year = parseInt(arr[0]);
      var month = parseInt(arr[1]);
      //判断month
      if (month == 12) {
        year = year + 1;
        month = 1;
      } else {
        month = month + 1;
      }
      this.monthData = year + "-" + month;
    },

    //天数加
    addDay() {
      var arr = this.dayData.split("-"); //将获取的数组按“-”拆分成字符串数组

      var year = parseInt(arr[0]); //开分字符串数组的第一个地址的内容是年份
      var mouth = parseInt(arr[1]); //开分字符串数组的第二个地址的内容是月份
      var date = parseInt(arr[arr.length - 1]); //开分字符串数组的第三个地址的内容是日期

      if (date == 28) {
        //当日期为28号时 只判断是否是2月
        switch (mouth) {
          case 2:
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
              date = date + 1;
              break;
              //如果是闰年2月 日期就加一
            } else {
              date = 1;
              mouth = mouth + 1;
              break;
              //不是闰年2月 日期就变为1 月份加一
            }
          default:
            date = date + 1;
            break;
          //其他月份默认日期加一
        }
      } else if (date == 29) {
        //当日期为29号是 也是判断是否是2月
        switch (mouth) {
          case 2:
            date = 1;
            mouth = mouth + 1;
            break;
          default:
            date = date + 1;
            break;
        } //当29号出现必定是闰年 日期变为1 月份加一 其他月份默认日期加一
      } else if (date == 30) {
        //当日期为30 时
        switch (mouth) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            date = date + 1;
            break; //这些月份的时候一个月有31天 到30的时候再加一
          case 4:
          case 6:
          case 9:
          case 11:
            date = 1;
            mouth = mouth + 1;
            break; //这些月份的时候一个月有30天 到30的时候 日期变为1 月份加一
        }
      } else if (date == 31) {
        switch (mouth) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
            date = 1;
            mouth = mouth + 1;
            break; //这些月份的时候一个月有31天 到31的时候  日期为1月份加一
          case 12:
            date = 1;
            mouth = 1;
            year = year + 1;
            break; //十二月 的 31 号 日期变为一 月份变为一 年份加一
        }
      } else {
        date += 1;
      }
      this.dayData = year + "-" + mouth + "-" + date;
    },

    //天数减
    reduceDay() {
      var arr = this.dayData.split("-"); //将获取的数组按“-”拆分成字符串数组
      var year = parseInt(arr[0]); //开分字符串数组的第一个地址的内容是年份
      var mouth = parseInt(arr[1]); //开分字符串数组的第二个地址的内容是月份
      var date = parseInt(arr[arr.length - 1]); //开分字符串数组的第三个地址的内容是日期

      if (date == 1) {
        //当日期为1时，再剪就会改变月份，甚至年份
        switch (mouth) {
          case 1:
            date = 31;
            mouth = 12;
            year = year - 1;
            break; //一月一日 再剪一天 年份减一 月份为12 日期为31
          case 2:
          case 4:
          case 6:
          case 8:
          case 9:
          case 11:
            date = 31;
            mouth = mouth - 1;
            break; //这些月一日 再剪一天  月份减一 日期为31
          case 3:
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
              date = 29;
              mouth = mouth - 1;
            } else {
              date = 28;
              mouth = mouth - 1;
            }
            break; //三月一日 再剪一天  月份减一 日期为根据是否是闰年来判断 日期
          case 5:
          case 7:
          case 10:
            date = 30;
            mouth = mouth - 1;
            break; //这些月一日 再剪一天  月份减一 日期为30
        }
      } else {
        date = date - 1;
      }
      this.dayData = year + "-" + mouth + "-" + date; //拼接字符串插入到标签中
    },
    //周数减
    reduceWeek() {
      if (this.weekData <= 1) {
        return;
      } else {
        this.weekData = this.weekData - 1;
      }
    },
    //周数加
    addWeek() {
      if (this.weekData >= 52) {
        return;
      } else {
        this.weekData = this.weekData + 1;
      }
    },

    /*传入年，周数，获取周数对应的所有日期*/
    getWeekTime() {
      var year = 2018;
      var index = 43;
      var d = new Date(year, 0, 1);
      while (d.getDay() != 1) {
        d.setDate(d.getDate() + 1);
      }
      var to = new Date(year + 1, 0, 1);
      var i = 1;
      var arr = [];
      for (var from = d; from < to; ) {
        if (i == index) {
          arr.push(
            from.getFullYear() +
              "-" +
              (from.getMonth() + 1) +
              "-" +
              from.getDate()
          );
        }
        var j = 6;
        while (j > 0) {
          from.setDate(from.getDate() + 1);
          if (i == index) {
            arr.push(
              from.getFullYear() +
                "-" +
                (from.getMonth() + 1) +
                "-" +
                from.getDate()
            );
          }
          j--;
        }
        if (i == index) {
          return arr;
        }
        from.setDate(from.getDate() + 1);
        i++;
        console.log(arr, "arr");
      }
    }
  },
  created() {
    //年月
    var data = new Date();
    this.monthData1 = data.getFullYear();
    this.monthData2 = data.getMonth() + 1;
    this.monthData = this.monthData1 + "-" + this.monthData2;

    //年月日
    this.dayData1 = data.getFullYear();
    this.dayData2 = data.getMonth() + 1;
    this.dayData3 = data.getDate();
    this.dayData = this.dayData1 + "-" + this.dayData2 + "-" + this.dayData3;

    //获取今天是今年第几周
    var d1 = new Date();
    var d2 = new Date();
    d2.setMonth(0);
    d2.setDate(1);
    var rq = d1 - d2;
    var s1 = Math.ceil(rq / (24 * 60 * 60 * 1000));
    this.weekData = Math.ceil(s1 / 7);
  }
};
</script>
<style lang="scss">
@import "commandCentre.scss";
</style>
