import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  //mode:"history",
  routes: [{
    path: '/',
    name: 'mainMenu',
    component: (resolve) => {
      require(['../components/home/mainMenu.vue'], resolve)
    },
    redirect: '/home',
    children: [
      //home页
      {
        path: '/home',
        name: 'home',
        component: (resolve) => {
          require(['../components/home/home.vue'], resolve)
        },
        redirect: '/commandCentre',
        children: [
          //指挥中心
          {
            path: '/commandCentre',
            name: 'commandCentre',
            component: (resolve) => {
              require(['../components/commandCentre/commandCentre.vue'], resolve)
            }
          },
           //企业指挥中心
           {
            path: '/enterpriseCommandCenter',
            name: 'enterpriseCommandCenter',
            component: (resolve) => {
              require(['../components/enterpriseCommandCenter/enterpriseCommandCenter.vue'], resolve)
            }
          },
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
            path: '/graphicProgress',
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
          // 实施记录管理
          {
            path: '/workRecord',
            name: 'workRecord',
            component: (resolve) => {
              require(['../components/workrecord/workRecord.vue'], resolve)
            }
          },
           // 总进度计划
           {
            path: '/planTotal',
            name: 'planTotal',
            component: (resolve) => {
              require(['../components/planTotal/planTotal.vue'], resolve)
            }
          },
           // 年进度计划
           {
            path: '/planYear',
            name: 'planYear',
            component: (resolve) => {
              require(['../components/planYear/planYear.vue'], resolve)
            }
          },
          //项目计划
          {
            path: '/planProject',
            name: 'planProject',
            component: (resolve) => {
              require(['../components/planProject/planProject.vue'], resolve)
            }
          },
          //
          {
            path: '/testvuetable',
            name: 'testvuetable',
            component: (resolve) => {
              require(['../components/testvuetable/testvuetable.vue'], resolve)
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
          {
            path: '/engineeringcategorymanagement',
            name: 'engineering-category-management',
            component: (resolve) => {
              require(['../components/engineering-category-management/engineering-category-management.vue'], resolve)
            }
          },
        ]
      },
      {
        path: '/home1',
        name: 'home1',
        component: (resolve) => {
          require(['../components/home/home1.vue'], resolve)
        },
        redirect: '/planhomePage',
        children:[
           //形象进度首页
           {
            path: '/planhomePage',
            name: 'planhomePage',
            component: (resolve) => {
              require(['../components/planhomePage/planhomePage.vue'], resolve)
            }
          },
          //形象进度甘特图
          {
            path: '/progressPIcture',
            name: 'progressPIcture',
            component: (resolve) => {
              require(['../components/progressPIcture/progressPicture.vue'], resolve)
            }
          }
      ]
      },
      {
        path: '/bimHome',
        name: 'bimHome',
        component: (resolve) => {
          require(['../components/home/bimHome.vue'], resolve)
        },
        redirect: '/bimHomePage',
        children:[
           //形象进度首页
           {
            path: '/bimHomePage',
            name: 'bimHomePage',
            component: (resolve) => {
              require(['../components/bimHomePage/bimHomePage.vue'], resolve)
            }
          }
      ]
      },
       //loading界面
       {
        path: '/loading',
        name: 'loading',
        component: (resolve) => {
          require(['../components/loading/loading.vue'], resolve)
        }
      }
    ]
  }]
})
