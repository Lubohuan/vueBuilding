<template>
  <div class="contains">
    <h1>树表格实现</h1>
    <!-- <el-table :data="treeDataSource" style="width: 100%;">
                <table-tree-column prop="Id" treeKey="Id" label="id"></table-tree-column>
                <el-table-column label="姓名">
                  <template slot-scope="scope">
                    <span>{{scope.row.ResponsibleName}}</span>
                    
                  </template>
                </el-table-column>
                <el-table-column label="权限">
                  <template slot-scope="scope">
                   <span>{{scope.row.CreateTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column width="200" label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
                    
                  </template>
                </el-table-column> 
              </el-table> -->
    <el-table
    :data="tableData"
    border
    style="width: 100%">
      <!-- <el-table-column
        label="商品 ID"  id="ceshi">
        <template slot-scope="scope">
          <div class="treetablecon">
            {{scope.row.id}}
          </div>
        </template>

      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="desc">
      </el-table-column> -->
      <el-table-column v-for="item in cloumns" :key="item.name"
        :label="item.label"  >
        <template slot-scope="scope">
          <div class="treetablecon">
            <span class="spacespan" v-for="list in scope.row.nodeLevel" :key="list" v-if="item.name == showicon"></span>
            <span class="spacespan"  v-if="item.name == showicon && !scope.row.child"></span>
            <i class="el-icon-caret-right nodeClickIcon" v-if="item.name == showicon && scope.row.child && !scope.row.nodeExpand" @click="expandNode(scope.$index,scope.row)"></i>
            <i class="el-icon-caret-bottom nodeClickIcon" v-if="item.name == showicon && scope.row.child && scope.row.nodeExpand" @click="closeNode(scope.$index,scope.row)"></i>
            <span>{{scope.row[item.name]}}</span>
          </div>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import dataJson from './data.json'
import tableTreeColumn from '../treeTable'
export default {
  data() {
    return {
      cloumns: [ //配置header
        {label:'商品id',name:'id'},
        {label:'商品名称',name:'name'},
        {label:'描述',name:'desc'}
      ],
      showicon:'name',//配置伸缩图标展示列
      tableData: [{
          id: '1',
          name: '好滋好味鸡蛋仔',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          nodeLevel:0,
          nodeExpand:false,
          child:[
            {
              id: '11',
              name: '好滋好味鸡蛋仔',
              desc: '荷兰优质淡奶，奶香浓而不腻',
              nodeLevel:1,
              child:[
                {
                  id: '111',
                  name: '好滋好味鸡蛋仔',
                  desc: '荷兰优质淡奶，奶香浓而不腻',
                  nodeLevel:2,
                  child:[
                    {
                      id: '1111',
                      name: '好滋好味鸡蛋仔',
                      desc: '荷兰优质淡奶，奶香浓而不腻',
                      nodeLevel:3,
                    }
                  ]
                }
              ]
            }
          ]
        }, {
          id: '2',
          name: '好滋好味鸡蛋仔',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          nodeLevel:0,
        }, {
          id: '3',
          name: '好滋好味鸡蛋仔',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          nodeLevel:0,
        }, {
          id: '4',
          name: '好滋好味鸡蛋仔',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          nodeLevel:0,
        }]
    }
  },
  components: {
    tableTreeColumn
  },
  methods: {
    
    //展开节点
    expandNode(index,data){
      data.nodeExpand = true;
      data['childLength'] = data.child.length;
      let arr = this.addchildNode([],data.child);
      this.tableData.splice(index+1,0,...arr);
      
    },
    //收缩节点
    closeNode(index,data){
      
      data.nodeExpand = false;
      data['childLength'] = 0;
      let length = this.calculateLength(0,data.child);
      this.tableData.splice(index+1,length);
    },
    //计算展开的子节点数量
    calculateLength(number,data){
      let length = data.length;

      for(let i=length;i--;){
        if(data[i].child){
          number += 1;
          if(data[i].nodeExpand){
            number += data[i].child.length;
          }else{
            this.calculateLength(number,data[i].child);
          }
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
          if(data[i].expandNode){
            arr.push(...this.addchildNode([],data[i].child));
          }else{
            arr.push(data[i]);
          }
        }else{
          arr.push(data[i]);
        }
      }
      return arr;
    },
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