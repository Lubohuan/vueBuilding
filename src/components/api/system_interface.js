import request from '@/utils/request';
import uploadRequest from '@/utils/uploadRequest';
import axios from 'axios'

//环境
// const domain = 'http://spm.';
const domain = 'http://autobuild.';

//请求url
const baseUrl = domain + 'jiguantong.com/bimScheduleService';
// const baseUrl = 'http://172.16.7.157:8080/bimScheduleService';

//云盘接口
const alphaUrl = domain + 'jiguantong.com';

//退出url
const spmUrl = domain + '1357.cn/Admin/Login/public_login';

export function loginUrl(){
  return spmUrl;
}

export function baseinUrl(){
  sessionStorage.setItem("baseUrl",baseUrl);
  return baseUrl;
}
// 查询统计单位接口
export function getUnitPage(data) {
  return request({
    url: baseUrl + '/basicData/listUnit',
    method: 'get',
    params: data
  })
}
// 添加统计单位接口
export function addUnit(data) {
  return request({
    url: baseUrl + '/basicData/addUnit',
    method: 'post',
    data: data
  })
}
// 修改统计单位接口
export function updateUnitById(data) {
  return request({
    url: baseUrl + '/basicData/updateUnitById',
    method: 'put',
    data: data
  })
}
// 删除统计单位接口
export function deleteUnitById(data) {
  return request({
    url: baseUrl + '/basicData/deleteUnitById/' + data,
    method: 'delete',
  })
}
// 删除分部分项接口
export function deleteSubsectionById(data) {
  return request({
    url: baseUrl + '/basicData/deleteSubsectionById/' + data,
    method: 'delete',
  })
}
// 分页查询任务预警记录
export function getTaskWarningLogPage(data) {
  return request({
    url: baseUrl + '/warning/getPlanWarningPage',
    method: 'get',
    params: data
  })
}
// 分页查询进度预警
export function getTaskWarningPage(data) {
  return request({
    url: baseUrl + '/warning/getPlanWarningLogPage',
    method: 'get',
    params: data
  })
}
// 解除任务预警
export function relieveTaskWarning(data) {
  return request({
    url: baseUrl + '/warning/relievePlanWarning',
    method: 'put',
    data: data
  })
}
// 任务督办
export function urgeTask(data) {
  return request({
    url: baseUrl + '/warning/urgeTask',
    method: 'put',
    data: data
  })
}
// 查询所在组织可用的分部分项信息
export function getSubsectionPage(data) {
  return request({
    url: baseUrl + '/basicData/listSubsection',
    method: 'get',
    params: data
  })
}
// 添加分部分项
export function addSubsection(data) {
  return request({
    url: baseUrl + '/basicData/addSubsection',
    method: 'post',
    data: data
  })
}
// 修改分部分项
export function updateSubsection(data) {
  return request({
    url: baseUrl + '/basicData/updateSubsection',
    method: 'put',
    data: data
  })
}
// 分页查询进度计划
export function getConstructPlanPage(data) {
  return request({
    url: baseUrl + '/task/getConstructPlanPage',
    method: 'get',
    params: data
  })
}
// 添加施工记录
export function addConstructLog(data) {
  return request({
    url: baseUrl + '/task/addConstructLog',
    method: 'post',
    data: data
  })
}
// 添加进度计划
export function addConstructPlan(data) {
  return request({
    url: baseUrl + '/task/addConstructPlan',
    method: 'post',
    data: data
  })
}
// 启用施工进度计划
export function startConstructPlan(data) {
  return request({
    url: baseUrl + '/task/startConstructPlan/' + data,
    method: 'put'
  })
}
// 禁用施工进度计划
export function stopVisualStatItem(data) {
  return request({
    url: baseUrl + '/task/stopVisualStatItem/' + data,
    method: 'put'
  })
}
// 删除施工进度计划
export function deleteConstructPlanById(data) {
  return request({
    url: baseUrl + '/task/deleteConstructPlanById/' + data,
    method: 'delete',
  })
}
// 根据父ID查询施工区域
export function listRegion(data) {
  return request({
    url: baseUrl + '/project/listRegion',
    method: 'get',
    params: data
  })
}
// 根据父ID查询施工区域
export function listRegionTree(data) {
  return request({
    url: baseUrl + '/project/regionTree',
    method: 'get',
    params: data
  })
}
// 添加施工区域
export function addRegion(data) {
  return request({
    url: baseUrl + '/project/addRegion',
    method: 'post',
    data: data
  })
}
// 添加形象进度统计项
export function addVisualStatItem(data) {
  return request({
    url: baseUrl + '/project/addVisualStatItem',
    method: 'post',
    data: data
  })
}
// 删除（逻辑删除）施工区域
export function deleteRegionById(data) {
  return request({
    url: baseUrl + '/project/deleteRegionById/' + data,
    method: 'delete',
  })
}
// 分页查询形象进度统计项
export function getVisualStatItemPage(data) {
  return request({
    url: baseUrl + '/project/getVisualStatItemPage',
    method: 'get',
    params: data
  })
}
// 启用形象进度统计项
export function startVisualStatItem(data) {
  return request({
    url: baseUrl + '/project/startVisualStatItem/' + data,
    method: 'get'
  })
}
// 禁用形象进度统计项
export function stopVisualStatItems(data) {
  return request({
    url: baseUrl + '/project/stopVisualStatItem/' + data,
    method: 'get'
  })
}
// 修改施工区域
export function updateRegion(data) {
  return request({
    url: baseUrl + '/project/updateRegion',
    method: 'put',
    data:data
  })
}
// 修改进度计划
export function updateConstructPlan(data) {
  return request({
    url: baseUrl + '/task/updateConstructPlan',
    method: 'put',
    data:data
  })
}
// 分页查询形象进度详请信息
export function getConstructPlanDetail(data) {
  return request({
    url: baseUrl + '/task/getConstructPlanDetail',
    method: 'get',
    params:data
  })
}
// 获取分部分项统计报表
export function getSubsectionReport(data) {
  return request({
    url: baseUrl + '/workStat/getSubsectionReport',
    method: 'get',
    params:data
  })
}
// 分页查询进度监视信息
export function getVisualStatMonitorPage(data) {
  return request({
    url: baseUrl + '/workStat/getVisualStatMonitorPage',
    method: 'get',
    params:data
  })
}
// 获取形象进度统计报表
export function getVisualStatReport(data) {
  return request({
    url: baseUrl + '/workStat/getVisualStatReport',
    method: 'get',
    params:data
  })
}
// 查询形象进度进展信息列表(指挥中心形象进度进展)
export function getVisualStatProgressPage(data) {
  return request({
    url: baseUrl + '/workStat/getVisualStatProgressPage',
    method: 'get',
    params:data
  })
}
// 查询项目下拉框
export function listOrgInfo(data) {
  return request({
    url: baseUrl + '/system/listOrgInfo',
    method: 'get',
    params:data
  })
}
// 查询子项目下拉框
export function listChildOrgInfo(data) {
  return request({
    url: baseUrl + '/system/listChOrgInfo',
    method: 'get',
    params:data
  })
}
// 查询项目类型
export function listProjectType(data) {
  return request({
    url: baseUrl + '/basicData/listProjectType',
    method: 'get',
    params:data
  })
}
// 删除项目类型
export function deleteProjectType(data) {
  return request({
    url: baseUrl + '/basicData/deleteProjectType/' + data,
    method: 'delete',
  })
}
// 添加项目类型
export function addProjectType(data) {
  return request({
    url: baseUrl + '/basicData/addProjectType',
    method: 'post',
    data:data
  })
}
// 修改项目类型
export function updateProjectType(data) {
  return request({
    url: baseUrl + '/basicData/updateProjectType',
    method: 'post',
    data:data
  })
}
//分页查询形象进度任务详请信息(形象进度任务管理分页查询)
export function getPlanTaskPage(data) {
  return request({
    url: baseUrl + '/task/getPlanTaskPage',
    method: 'get',
    params:data
  })
}
//根据id查询进度计划详情(形象进度任务管理)
export function getConstructPlanDetailById(data) {
  return request({
    url: baseUrl + '/task/getConstructPlanDetailById/'+ data,
    method: 'get'
  })
}
//根据进度计划ID分页查询施工日志信息(形象进度任务管理)
export function getConstructLogPage(data) {
  return request({
    url: baseUrl + '/task/getConstructLogPage',
    method: 'get',
    params:data
  })
}
// 修改形象进度统计项
export function updateVisualStatItemById(data) {
  return request({
    url: baseUrl + '/project/updateVisualStatItemById',
    method: 'post',
    data:data
  })
}
//根据id查询进度计划详情
export function getConstructPlanById(data) {
  return request({
    url: baseUrl + '/task/getConstructPlanById/' + data,
    method: 'get'
  })
}
//获取当前登录用户所在组织中的所有用户
export function listUserInfo(data) {
  return request({
    url: baseUrl + '/system/listUserInfo?orgId=' + data,
    method: 'get',
  })
}
//首页表盘
export function getDashBoard(data) {
  return request({
    url: baseUrl + '/workStat/getDashBoard',
    method: 'get',
    params:data
  })
}
//切换用户当前所在的项目
export function changeOrg(data) {
  return request({
    url: baseUrl + '/system/changeOrg',
    method: 'get',
    params:data
  })
}
//获取当前用户的权限码列表
export function listPermissionCode(data) {
  return request({
    url: baseUrl + '/system/listPermissionCode',
    method: 'get',
    params:data
  })
}
//获取当前登录用户信息
export function getSessionInfo(data) {
  return request({
    url: baseUrl + '/system/getSessionInfo',
    method: 'get',
    params:data
  })
}
//根据项目id获取分部分项信息
export function getVisualStatItemList(data) {
  return request({
    url: baseUrl + '/project/getVisualStatItemList',
    method: 'get',
    params:data
  })
}
//获取区域产值统计分析
export function getRegionOutputReport(data) {
  return request({
    url: baseUrl + '/workStat/getRegionOutputReport',
    method: 'get',
    params:data
  })
}
// 修改任务的优先级
export function updateTaskPriority(data) {
  return request({
    url: baseUrl + '/task/updateTaskPriority/' + data.id + '/' + data.level,
    method: 'put'
  })
}
// 导出单位excel
export function exportUnitByIds(data) {
  return request({
    url: baseUrl + '/web/export/exportUnitByIds',
    method: 'post',
    data:data
  })
}
// 导出工程类别excel
export function exportEngineerSortByIds(data) {
  return uploadRequest({
    url: baseUrl + '/web/export/exportEngineerSortByIds',
    method: 'post',
    data:data
  })
}
// 查询所有计划
export function plans(data) {
  return request({
    url: baseUrl + '/v1/projectPlan/plans',
    method: 'get',
    params:data
  })
}
// 新增计划
export function plan(data) {
  return request({
    url: baseUrl + '/v1/projectPlan/plan',
    method: 'post',
    data:data
  })
}
// 上传计划
export function mpp(data) {
  return uploadRequest({
    url: baseUrl + '/v1/projectPlan/import/mpp',
    method: 'post',
    data:data
  })
}
// 获取企业级管理看板统计信息
export function getCompanyOutputBoard(data) {
  return request({
    url: baseUrl + '/company/getCompanyOutputBoard',
    method: 'get',
    params:data
  })
}
//获取产值进展统计分页对象(企业级管理看板)
export function listOutputProgress(data) {
  return request({
    url: baseUrl + '/company/listOutputProgress',
    method: 'get',
    params:data
  })
}
//产值未完成情况分析(企业级管理看板)
export function getUnfinishedOutputAnalyze(data) {
  return request({
    url: baseUrl + '/company/getUnfinishedOutputAnalyze',
    method: 'get',
    params:data
  })
}
//获取项目级产值未完成预警列表(企业级管理看板)
export function listProjectOutputWarning(data) {
  return request({
    url: baseUrl + '/company/listProjectOutputWarning',
    method: 'get',
    params:data
  })
}
//删除形象进度统计项
export function deleteVisualStatItem(data) {
  return request({
    url: baseUrl + '/project/deleteVisualStatItem/' + data,
    method: 'delete'
  })
}
//查询项目信息
export function projectInfo(data) {
  return request({
    url: baseUrl + '/v1/projectPlan/projectInfo/' + data,
    method: 'get'
  })
}
//更新项目信息
export function updateProjectInfo(data) {
  return request({
    url: baseUrl + '/v1/projectPlan/projectInfo',
    method: 'put',
    data:data
  })
}

//上传bim url
export function uploadDrawing(data) {
  return request({
    url: baseUrl + '/drawing/uploadDrawing',
    method: 'post',
    data:data
  })
}

//分页查询施工图纸列表
export function getDrawingPage(data) {
  return request({
    url: baseUrl + '/drawing/getDrawingPage',
    method: 'get',
    params:data
  })
}

//获取图纸的ViewToken
export function getViewToken(data) {
  return request({
    url: baseUrl + '/drawing/getViewToken/'+ data,
    method: 'get'
  })
}

//删除工程图纸
export function deleteDrawing(data) {
  return request({
    url: baseUrl + '/drawing/deleteDrawing/'+ data,
    method: 'delete'
  })
}

//获取工程图纸下载地址
export function getDownloadUrl(data) {
  return request({
    url: baseUrl + '/drawing/getDownloadUrl/'+ data,
    method: 'get'
  })
}

//切换组织查询项目下拉列表
export function changelistChOrgInfo(data){
  return request({
    url: baseUrl + '/system/listChOrgInfo',
    method: 'get',
    params:data
  })
}

//获取总进度计划GET
export function getTotalPlan(data){
  return request({
    url: baseUrl + '/task/regionProfilePlan',
    method: 'get',
    params:data
  })
}
//修改总进度计划/task/updateRegionProfilePlan
export function updateTotalPlan(data){
  return request({
    url: baseUrl + '/task/updateRegionProfilePlan',
    method: 'put',
    data:data
  })
}
//添加总进度计划
export function addTotalPlan(data){
  return request({
    url: baseUrl + '/task/addRegionProfilePlan',
    method: 'post',
    data:data
  })
}
//实施项目计划
export function getProjectPlan(data){
  return request({
    url: baseUrl + '/task/visualProfilePlan',
    method: 'get',
    params:data
  })
}

//获取年进度计划GET
export function getYearPlan(data){
  return request({
    url: baseUrl + '/task/regionYearPlan',
    method: 'get',
    params:data
  })
}

//添加形象进度年计划
export function addYearPlan(data){
  return request({
    url: baseUrl + '/task/addRegionYearPlan',
    method: 'post',
    data:data
  })
}

//修改形象进度年计划
export function updateYearPlan(data){
  return request({
    url: baseUrl + '/task/updateRegionYearPlan',
    method: 'put',
    data:data
  })
}
// 删除进度计划
export function deleteTaskPlan(data) {
  return request({
    url: baseUrl + '/project/deleteVisualStatItem/' + data,
    method: 'delete',
  })
}
// 禁用进度计划
export function forbidTaskPlan(data) {
  return request({
    url: baseUrl + '/project/stopVisualStatItem/' + data,
    method: 'get',
  })
}
// 启用进度计划
export function openTaskPlan(data) {
  return request({
    url: baseUrl + '/project/startVisualStatItem/' + data,
    method: 'get',
  })
}



// 云盘上传文件接口
async function getPolicy(ext) {
  return new Promise(function(resolve, reject) {
      resolve(axios.get( alphaUrl + '/alphaPortalService/cloud/policy',{ ext }));
  });
}

//  uploadfile 上传
export async function uploadfile(file,callback,progressfn) {
      var _this = this;
      //参数  file ，
      //const file = document.getElementById('upload').files[0]
      let cloudFile = {};
      cloudFile.fileName = file.name;
      cloudFile.fileExt = file.type;
      //cloudFile.folderId = _this.folderId;///???
      cloudFile.fileSize = file.size +'';
      getPolicy(file.name).then(({data}) => {
        const fd = new FormData();
        const {accessid, host, policy, signature, dir, saveName} = data;

        fd.append('OSSAccessKeyId', accessid);
        fd.append('policy', policy);
        fd.append('signature', signature);
        fd.append('key', dir + saveName);
        fd.append('success_action_status', 200);
        fd.append('file', file, saveName);
        const xhr = new XMLHttpRequest();
        xhr.open('post', host, true);
        //控制进度条的
        xhr.upload.addEventListener('progress', (evt) => {
          let progress = Math.round((evt.loaded) * 100 / evt.total);
          progressfn && progressfn(progress);
        }, false)
        xhr.addEventListener('load', (e) => {
            if (e.target.status !== 200) {
                return
            }
            if (e.target.status === 200) {
            //cloudFile.fileUrl = host + '/' + dir + saveName

            //uploadSave(cloudFile).then((res) => {
                // queryCloudFolderInfoPage(this.parentId).then((res) => {
                //     this.folderList = res.body.rows
                // })
                // queryCloudFileInfoPage(this.folderId).then((res) => {
                //     if(res.code === 200){
                //     return this.fileList = res.body.rows;
                //     }
                // })
                //if(res.code === 200){

                  callback && callback('http://altadaye.com' + '/' + dir + saveName);
                //}
                //callback ,回显url
            //})
            //this.imgUrl = host + '/' + dir + saveName
            }
        }, false)
        xhr.send(fd)
      })
  }

