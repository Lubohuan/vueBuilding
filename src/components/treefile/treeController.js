  export function nodeclick(el,index,data,treeTableDate){
    if(data.nodeExpand){
      closeNode(index,data,treeTableDate);
    }else{
      expandNode(index,data,treeTableDate);
    }
  }
  //展开节点
  export function expandNode(index,data,treeTableDate){
    data.nodeExpand = true;
    let arr = addchildNode([],data.child);
    treeTableDate.splice(index+1,0,...arr);
  }
  //收缩节点
  export function closeNode(index,data,treeTableDate){
    data.nodeExpand = false;
    let length = calculateLength(0,data.child);
    treeTableDate.splice(index+1,length);
  }
  //计算展开的子节点数量
  export function calculateLength(number,data){
    let length = data.length;
    for(let i=length;i--;){
      if(data[i].child){
        if(data[i].nodeExpand){
          number += calculateLength(0,data[i].child);
        }
        number += 1;
      }else{
        number += 1;
      }
    }
    return number;
  }
  //增加子节点
  export function addchildNode(arr,data){
    let length = data.length;
    for(let i=0;i<length;i++){
      if(data[i].child){
        arr.push(data[i]);
        if(data[i].nodeExpand){
          arr.push(...addchildNode([],data[i].child));
        }
      }else{
        arr.push(data[i]);
      }
    }
    return arr;
  }
  //增加nodelevel层级
  export function initHandNode(data,index){
    let length = data.length;
    for(let i=length;i--;){
      data[i]['nodeLevel'] = index;
      if(data[i].child){
        data[i].child = initHandNode(data[i].child,index+1);
      }
    }
    return data;
  }
  //全部展开
  export function allExpand(arr,data){
    let length = data.length;
    for(let i=0;i<length;i++){
      if(data[i].child){
        arr.push(data[i]);
        data[i]['nodeExpand'] = true;
        arr.push(...allExpand([],data[i].child));
        
      }else{
        arr.push(data[i]);
      }
    }
    return arr;
  }
  //触发全部展开
  export function goAllexpand(treeTableDate){
    let length = treeTableDate.length;
      let data = JSON.parse(JSON.stringify(treeTableDate));
      for(let i=0;i<treeTableDate.length;i++){
          if(treeTableDate[i].child){
              treeTableDate[i]['nodeExpand'] = true;
              let arr1 = allExpand([],treeTableDate[i].child);
              treeTableDate.splice(i+1,0,...arr1);
              i = i+arr1.length;
          }
      }
  }