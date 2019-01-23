<template>
  <div class="contains">
    <h1>树表格实现</h1>
    <el-table
    :data="treeTableDate"
    border
    sortable="true"
    style="width: 100%">
    <el-table-column 
        label="操作"  >
        <template slot-scope="scope">
          <el-button  size="mini" type="primary">编辑</el-button>
        </template>
      </el-table-column>
      
      <treeTableLan :cloumns="cloumns" :showicon="showicon" :treeTableDate="treeTableDate"></treeTableLan>
      
    </el-table>
  </div>
</template>
<script>
import treeTableLan from '../treeTable/treeTableL.vue'
export default {
  data() {
    return {
      cloumns: [ //配置header
        {label:'商品id',name:'id'},
        {label:'商品名称',name:'name'},
        {label:'描述',name:'desc'}
      ],
      showicon:'id',//配置伸缩图标展示列
      textTrigger:false,
      treeTableDate: [{
          id: '1',
          name: '好滋好味鸡蛋仔',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          child:[
            {
              id: '11',
              name: '好滋好味鸡蛋仔',
              desc: '荷兰优质淡奶，奶香浓而不腻',
              child:[
                {
                  id: '111',
                  name: '好滋好味鸡蛋仔',
                  desc: '荷兰优质淡奶，奶香浓而不腻',
                  child:[
                    {
                      id: '1111',
                      name: '好滋好味鸡蛋仔',
                      desc: '荷兰优质淡奶，奶香浓而不腻',
                    },
                    {
                      id: '1112',
                      name: '好滋好味鸡蛋仔',
                      desc: '荷兰优质淡奶，奶香浓而不腻',
                    },
                    {
                      id: '1113',
                      name: '好滋好味鸡蛋仔',
                      desc: '荷兰优质淡奶，奶香浓而不腻',
                    }
                  ]
                },
                {
                  id: '112',
                  name: '好滋好味鸡蛋仔',
                  desc: '荷兰优质淡奶，奶香浓而不腻',
                },
                {
                  id: '113',
                  name: '好滋好味鸡蛋仔',
                  desc: '荷兰优质淡奶，奶香浓而不腻',
                }
              ]
            },
            {
              id: '12',
              name: '好滋好味鸡蛋仔',
              desc: '荷兰优质淡奶，奶香浓而不腻',
            },
            {
              id: '13',
              name: '好滋好味鸡蛋仔',
              desc: '荷兰优质淡奶，奶香浓而不腻',
            }
          ]
        }, {
          id: '2',
          name: '好滋好味鸡蛋仔',
          desc: '荷兰优质淡奶，奶香浓而不腻',
        }, {
          id: '3',
          name: '好滋好味鸡蛋仔',
          desc: '荷兰优质淡奶，奶香浓而不腻',
        }, {
          id: '4',
          name: '好滋好味鸡蛋仔',
          desc: '荷兰优质淡奶，奶香浓而不腻',
        }]
    }
  },
  components: {
    treeTableLan
  },
  methods: {
    //nodeclick
    nodeclick(el,index,data){
      //el.target.classList.toggle('el-icon-caret-right');
      if(data.nodeExpand){
        this.closeNode(index,data);
      }else{
        this.expandNode(index,data);
      }
      
      //document.querySelector(el.target).classList.toggle('el-icon-caret-right');
    },
    //展开节点
    expandNode(index,data){
      data.nodeExpand = true;
      let arr = this.addchildNode([],data.child);
      this.tableData.splice(index+1,0,...arr);
      
    },
    //收缩节点
    closeNode(index,data){
      data.nodeExpand = false;
      let length = this.calculateLength(0,data.child);
      this.tableData.splice(index+1,length);
    },
    //计算展开的子节点数量
    calculateLength(number,data){
      let length = data.length;
      for(let i=length;i--;){
        if(data[i].child){
          if(data[i].nodeExpand){
            number += this.calculateLength(0,data[i].child);
          }
          number += 1;
        }else{
          number += 1;
        }
      }
      return number;
    },
    //增加字节点
    addchildNode(arr,data){
      let length = data.length;
      for(let i=0;i<length;i++){
        if(data[i].child){
          arr.push(data[i]);
          if(data[i].nodeExpand){
            arr.push(...this.addchildNode([],data[i].child));
          }
        }else{
          arr.push(data[i]);
        }
      }
      return arr;
    },
    //增加nodelevel层级
    initHandNode(data,index){
      let length = data.length;
      for(let i=length;i--;){
        data[i]['nodeLevel'] = index;
        if(data[i].child){
          data[i].child = this.initHandNode(data[i].child,index+1);
        }
      }
      return data;
    },
  },
  mounted(){
    //this.treeTableDate = this.initHandNode(this.treeTableDate,0);
    //console.log(this.treeTableDate);
  }
}
</script>

<style lang="scss" scoped>
.contains {
    width: 960px;
    margin: 30px auto;
}
.treetablecon{
  height:100%;
  width:100%;
  vertical-align: middle;
}
.spacespan{
  width:18px;
  display: inline-block;
  height:18px;
}
.nodeClickIcon{
  font-size: 18px;
  vertical-align: middle;
  cursor: pointer;
}
</style>