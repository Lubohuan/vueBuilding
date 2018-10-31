import Vue from 'vue'
import Vuex from 'vuex'
import {getVisualStatItemPage,listRegion,getUnitPage,getSubsectionPage} from "../components/api/upload.js";
Vue.use(Vuex)
export default new Vuex.Store({
  strict: false, // 开发中启用严格模式
  state: {
    projectList: [], //项目列表
    reginList: [], //施工区域列表
    planList: [], //统计单位列表
    statisList: [], //形象进度统计项列表
    bitemList: [] //分部分项列表
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
        listRegion({
            current: 1,
            offset: 20,
            projectId: 12
          })
          .then(response => {
            commit('updatereginList', response.body)
          })
          .catch(error => {
            console.log(error);
          });
      },
      //查询分部分项下拉框
    getSubsectionList({commit}) {
        getSubsectionPage({
            current: 1,
            offset: 20,
            projectType: 1
          })
          .then(response => {
            commit('updatebitemList', response.body)
          })
          .catch(error => {
            console.log(error);
          });
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
      }
  }
})
