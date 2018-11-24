export default {

  spmUrl(){
    // const spmUrl = 'http://spm.1357.cn/Admin/Login/public_login';
    const spmUrl = 'http://autobuild.1357.cn/Admin/Login/public_login';
    return  spmUrl;
  },

  deepClone(data) {
    let obj = JSON.stringify(data);
    return JSON.parse(obj);
  },
  //转换百分比
  fomatPrecent(data){
    var data2 = 100;
    var m=0,s1=data.toString(),s2=data2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
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
