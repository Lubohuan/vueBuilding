import Vue from 'vue'
import Vuex from 'vuex'
import {getVisualStatItemPage,listRegion,getUnitPage,getSubsectionPage,listOrgInfo,listChildOrgInfo,listUserInfo,changelistChOrgInfo} from "../components/api/system_interface.js";
Vue.use(Vuex)
export default new Vuex.Store({
  strict: false, // 开发中启用严格模式
  state: {
    projectList: [], //项目列表
    reginList: [], //施工区域列表
    planList: [], //统计单位列表
    statisList: [], //形象进度统计项列表
    bitemList: [], //分部分项列表
    listOrgInfoList:[],//项目列表
    listChildOrgInfoList:[],//子项目列表
    userList:[],//用户列表
    userToken:'',//用户token
    orangType:'',
    planTypeList:[
      {
        name:'一级进度计划',
        number:1
      },
       {
        name:'二级进度计划',
        number:2
      },
      {
        name:'三级进度计划',
        number:3
      }
    ]
  },
  mutations: {
    updatestatisList(state, data) {
      state.statisList = data;
    },
    updatereginList(state, data) {
        state.reginList = data;
    },
    updateprojectList(state, data) {
        state.projectList = data;
    },
    updateplanList(state, data) {
        state.planList = data;
    },
    updatebitemList(state, data) {
        state.bitemList = data;
    },
    updatelistOrgInfoList(state, data) {
      state.listOrgInfoList = data;
    },
    updateChildlistOrgInfoList(state, data) {
      state.listChildOrgInfoList = data;
    },
    updateUserList(state, data) {
      state.userList = data;
    },
    updateUserToken(state, data) {
        state.userToken = data;
    },
    updateplanTypeList(state, data) {
      state.planTypeList = data;
  }
  },
  actions: {
    
    //形象进度下拉框
    getStatisList({commit}) {
      getVisualStatItemPage({
          current: 1,
          offset: 20
        })
        .then(response => {
          commit('updatestatisList', response.body.rows)
        })
        .catch(error => {
          console.log(error);
        });
    },

    //施工区域下拉框
    getReginList({commit}) {
        listRegion({})
          .then(response => {
            if(!response.body){
              commit('updatereginList', [{id:1,regionName:'暂无数据',disabled: true}])
            }
            else{
              commit('updatereginList', response.body)
            }  
          })
          .catch(error => {
            console.log(error);
          });
      },

    //查询分部分项下拉框
    getSubsectionList({commit}) {
      return new Promise((resolve, reject) => {
        getSubsectionPage({})
          .then(response => {
            commit('updatebitemList', response.body);
            resolve()
          })
          .catch(error => {
            console.log(error);
            reject();
          });
        })
      },

    //查询统计单位下拉框
    getUnitList({commit}) {
        getUnitPage({
            current: 1,
            offset: 20,
            projectType: 1
          })
          .then(response => {
            commit('updateplanList', response.body.rows)
          })
          .catch(error => {
            console.log(error);
          });
      },
      
    //查询用户列表
    getUserList({commit}) {
      listUserInfo()
        .then(response => {
          commit('updateUserList', response.body)
        })
        .catch(error => {
            console.log(error);
        });
      },

    //查询项目列表下拉框
    getlistOrgInfoList({commit}) {
      return new Promise((resolve, reject) => {
        listOrgInfo({})
        .then(response => {
          if(!response.body){
            commit('updatelistOrgInfoList', [])
          }
          else{
            commit('updatelistOrgInfoList', response.body)
          }  
          resolve()
        })
        .catch(error => {
          console.log(error);
          reject();
        });
      })
    },
    //查询当前子项目列表下拉框
    getChildlistOrgInfoList({commit}) {
      return new Promise((resolve, reject) => {
        listOrgInfo({})
        .then(response => {
          if(!response.body){
            commit('listChildOrgInfoList', [])
          }
          else{
            commit('listChildOrgInfoList', response.body)
          }  
          resolve()
        })
        .catch(error => {
          console.log(error);
          reject();
        });
      })
    },

     //根据切换的组织查询项目列表下拉框
     changeListChOrgInfo({commit}) {
      return new Promise((resolve, reject) => {
        changelistChOrgInfo({})
        .then(response => {
          if(!response.body){
            commit('updateprojectList', [])
          }
          else{
            commit('updateprojectList', response.body)
          }  
          resolve()
        })
        .catch(error => {
          console.log(error);
          reject();
        });
      })
    },

    //更新token
    getUserToken({commit},data) {
          commit('updateUserToken', data)
    },
    //更新级别列表
    getplanTypeList({commit},data){
      commit('updateplanTypeList', data)
    }
  }
})
