<template>
  <div class="contains">
    <h1>树表格实现</h1>
    <el-table :data="treeDataSource" style="width: 100%;">
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
              </el-table>
  </div>
</template>
<script>
import dataJson from './data.json'
import tableTreeColumn from '../treeTable'
export default {
  data() {
    return {
      treeDataSource: dataJson
    }
  },
  components: {
    tableTreeColumn
  },
  methods: {
    orderByFunc(val) {
      alert('排序')
      alert(val)
    },
    actionFunc(m) {
      alert('编辑')
    },
    deleteFunc(m) {
      alert('删除')
    },
    handlerExpand(m) {
      console.log('展开/收缩')
      m.isExpand = !m.isExpand
    }
    // getTreeData() {
    //   // 取父节点
    //   let parentArr = this.list.filter(l => l.parentId === 0)
    //   this.treeDataSource = this.getTreeData(this.list, parentArr)
    // },
    // // 这里处理没有children结构的数据
    // getTreeData(list, dataArr) {
    //   dataArr.map((pNode, i) => {
    //     let childObj = []
    //     list.map((cNode, j) => {
    //       if (pNode.Id === cNode.parentId) {
    //         childObj.push(cNode)
    //       }
    //     })
    //     pNode.children = childObj
    //     if (childObj.length > 0) {
    //       this.getTreeData(list, childObj)
    //     }
    //   })
    //   return dataArr
    // }
  }
}
</script>

<style lang="scss" scoped>
.contains {
    width: 960px;
    margin: 30px auto;
}
</style>