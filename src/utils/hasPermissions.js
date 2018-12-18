export function hasPermissions(permission){
 let myBtns = sessionStorage.getItem("companyPressCode");
//  let myBtns = [100000,110000,120000,130000];
 return myBtns.indexOf(permission) > -1;
}
  