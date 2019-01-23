import treeTableL from './treeTableL.vue'
// 这里是重点
const treeTableLan = {
    install: function(Vue){
        Vue.component('CorpperImg',treeTableL)
    }
}
 
// 导出组件
export default treeTableLan