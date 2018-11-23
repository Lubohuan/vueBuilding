export default {

  spmUrl(){
    const spmUrl = 'http://spm.1357.cn/Admin/Login/public_login';
    return  spmUrl;
  },

  deepClone(data) {
    let obj = JSON.stringify(data);
    return JSON.parse(obj);
  },

  //转化数组
  initTree(data) {
    let arr = [];
    for (let i = data.length; i--;) {
      if (data[i]['child']) {
        arr.push(...this.initTree(data[i]['child']));
        let a = this.deepClone(data[i]);
        delete a.child;
        arr.push(a);
      } else {
        arr.push(data[i]);
      }
    }
    return arr;
  },

  //查找父级
  findParent(data, id) {
    let arr = [];
    for (let i = data.length; i--;) {
      if (id == data[i].id) {
        arr.unshift(id);
        arr.unshift(...this.findParent(data, data[i].pid));
      }
    }
    return arr;
  },

   //查找父级
  findParents(data, id) {
    let arr = [];
    for (let i = data.length; i--;) {
      if (id == data[i].id) {
        arr.unshift(id);
        arr.unshift(...this.findParents(data, data[i].parentId));
      }
    }
    return arr;
  }
}
