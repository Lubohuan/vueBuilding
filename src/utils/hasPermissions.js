export function hasPermissions(permission){
 let myBtns = sessionStorage.getItem("companyPressCode");
//  console.log(myBtns,'myBtns');
//  let myBtns = ['110101','110301','110401','110701','110402','110404'];
 return myBtns.indexOf(permission) > -1;
}
  