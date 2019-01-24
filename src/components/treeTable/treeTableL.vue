<template>
 <div>
    <el-table-column v-for="(item,index) in cloumns" 
    :label="item.label"  :key="index + 2" >
    <template slot-scope="scope">
        <div class="treetablecon" v-if="!item.innerHtml">
            <span class="spacespan" v-for="list in scope.row.nodeLevel" :key="list" v-if="item.name == setData.showicon"></span>
            <span class="spacespan"  v-if="item.name == setData.showicon && !scope.row.child"></span>
            <i class="el-icon-caret-bottom  nodeClickIcon" :class="{ 'el-icon-caret-right' : !scope.row.nodeExpand }" v-if="item.name == setData.showicon && scope.row.child" @click="nodeclick($event,scope.$index,scope.row)"></i>
            <span v-html="item.leftHtml"></span>
            <span class="text" v-if="setData.textTrigger"  @click="nodeclick($event,scope.$index,scope.row)">{{scope.row[item.name]}}</span>
            <span class="text" v-else  >{{scope.row[item.name]}}</span>
            <span v-html="item.rightHtml"></span>
        </div>
        <div class="treetablecon" v-else>
            <span class="spacespan" v-for="list in scope.row.nodeLevel" :key="list" v-if="item.name == setData.showicon"></span>
            <span class="spacespan"  v-if="item.name == setData.showicon && !scope.row.child"></span>
            <i class="el-icon-caret-bottom  nodeClickIcon" :class="{ 'el-icon-caret-right' : !scope.row.nodeExpand }" v-if="item.name == setData.showicon && scope.row.child" @click="nodeclick($event,scope.$index,scope.row)"></i>
            <span v-html="item.leftHtml"></span>
            <span class="text" v-if="setData.textTrigger"  @click="nodeclick($event,scope.$index,scope.row)" v-html="item.innerHtml"></span>
            <span class="text" v-else  v-html="item.innerHtml"></span>
            <span v-html="item.rightHtml"></span>
        </div>
    </template>
    </el-table-column>
</div>
</template>
<script>
export default {
  name:'treeTableL', 
  props:{
      cloumns:Array,
      //showicon:String,
      treeTableDate:Array,
      //textTrigger:String,
      setData:Object,
    // setData ={
    //     showicon:'id',
    //     textTrigger:false,
    //     allDefaultExpand:false,
    // }
  },
  data() {
    return {}
  },
  methods: {
    //nodeclick
    nodeclick(el,index,data){
      if(data.nodeExpand){
        this.closeNode(index,data);
      }else{
        this.expandNode(index,data);
      }
    },
    //展开节点
    expandNode(index,data){
      data.nodeExpand = true;
      let arr = this.addchildNode([],data.child);
      this.treeTableDate.splice(index+1,0,...arr);
    },
    //收缩节点
    closeNode(index,data){
      data.nodeExpand = false;
      let length = this.calculateLength(0,data.child);
      this.treeTableDate.splice(index+1,length);
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
    //增加子节点
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
    //全部展开
    allExpand(arr,data){
      let length = data.length;
      for(let i=0;i<length;i++){
        if(data[i].child){
          arr.push(data[i]);
          data[i]['nodeExpand'] = true;
          arr.push(...this.allExpand([],data[i].child));
          
        }else{
          arr.push(data[i]);
        }
      }
      return arr;
    },
  },
  mounted(){
    this.treeTableDate = this.initHandNode(this.treeTableDate,0);
    //校验参数的可用性
    let arr = this.cloumns.filter(obj=>obj.name==this.setData.showicon);
    if(arr.length<=0){
        this.setData.showicon = this.cloumns[0].name;
    }
    if(!this.setData.textTrigger){
        this.setData.textTrigger = false;
    }
    //全部展开
    if(this.setData.allDefaultExpand){
        let length = this.treeTableDate.length;
        let data = JSON.parse(JSON.stringify(this.treeTableDate));
        for(let i=0;i<length;i++){
            if(data[i].child){
                this.treeTableDate[i]['nodeExpand'] = true;
                let arr1 = this.allExpand([],this.treeTableDate[i].child);
                this.treeTableDate.splice(i+1,0,...arr1);
            }
        }
    }
    
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
.text{
    cursor:pointer;
}
</style>