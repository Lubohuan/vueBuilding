import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: (resolve) => {
      require(['../components/home/home.vue'], resolve)
    },
    children: [
      //分部分项库
      {
        path: '/bitem',
        name: 'bitem',
        component: (resolve) => {
          require(['../components/bitem/bitem.vue'], resolve)
        }
      },
      //统计单位库
      {
        path: '/statistical',
        name: 'statistical',
        component: (resolve) => {
          require(['../components/bitem/statistical.vue'], resolve)
        }
      },
      // 形象进度统计项
      {
        path: '/',
        name: 'graphicProgress',
        component: (resolve) => {
          require(['../components/graphicProgress/graphicProgress.vue'], resolve)
        }
      },
      //施工区域管理
      {
        path: '/areaManagement',
        name: 'areaManagement',
        component: (resolve) => {
          require(['../components/areaManagement/areaManagement.vue'], resolve)
        }
      },
      //进度检视
      {
        path: '/lookProgress',
        name: 'lookProgress',
        component: (resolve) => {
          require(['../components/lookProgress/lookProgress.vue'], resolve)
        }
      },
      // 进度计划
      {
        path: '/planProgress',
        name: 'planProgress',
        component: (resolve) => {
          require(['../components/planProgress/planProgress.vue'], resolve)
        }
      },
      //任务预警
      {
        path: '/taskWarning',
        name: 'taskWarning',
        component: (resolve) => {
          require(['../components/taskWarning/taskWarning.vue'], resolve)
        }
      },
      //预警记录
      {
        path: '/warningRecord',
        name: 'warningRecord',
        component: (resolve) => {
          require(['../components/warningRecord/warningRecord.vue'], resolve)
        }
      },
      // 形象进度任务管理
      {
        path: '/taskManagement',
        name: 'taskManagement',
        component: (resolve) => {
          require(['../components/taskManagement/taskManagement.vue'], resolve)
        }
      },
      //形象进度报表
      {
        path: '/Imagereport',
        name: 'Imagereport',
        component: (resolve) => {
          require(['../components/Imagereport/Imagereport.vue'], resolve)
        }
      },
    ]
  }]
})
