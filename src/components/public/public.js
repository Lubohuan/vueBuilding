import Vue from 'vue'
import axios from 'axios'
var Api = {
    mainUrl:'http://autobuild.jiguantong.com/platformUserService/organization5',
    get,
    post,
    incookie,
    gettoken
}

// export function multiply(x, y) {
//     return x * y;
//   };


function get(url,params){
    
    let token = gettoken('token');
    return new Promise(function(resolve, reject) {
        if (token){
          resolve(axios.get(url,params));
        } else {
          reject({"msg":'身份过期，请重新登陆。'});
        }
      });

}
function post(url,params){
    
    let token = gettoken('token');
    return new Promise(function(resolve, reject) {
        if (token){
          resolve(axios.post(url,params));
        } else {
          reject({"msg":'身份过期，请重新登陆。'});
        }
      });

}
function gettoken(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return null;
    }
}
function incookie(name,value,time){
    var Days = time;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}








export default Api;