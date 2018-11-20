export function hasPermissions(permission){
//  let myBtns = sessionStorage.getItem("userToken");
 let myBtns = [0,1,2];
 return myBtns.indexOf(permission) > -1;

  }
  