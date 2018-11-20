import Vue from 'vue'
import Vuex from 'vuex'
import {getVisualStatItemPage,listRegion,getUnitPage,getSubsectionPage,listOrgInfo,listUserInfo} from "../components/api/upload.js";
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
    userList:[],//用户列表
    userToken:''//用户token
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
    updateUserList(state, data) {
      state.userList = data;
    },
    updateUserToken(state, data) {
        state.userToken = data;
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
            resolve()
          
          })
          .catch(error => {
            console.log(error);
          });
      },

    //查询分部分项下拉框
    getSubsectionList({commit}) {
      return new Promise((resolve, reject) => {
        getSubsectionPage({
            projectType: '131073993401696366'
          })
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
    //更新token
    getUserToken({commit},data) {
          commit('updateUserToken', data)
    }
  }
})
