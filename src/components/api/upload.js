import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'
const baseUrl = 'http://172.16.7.135'
// 查询统计单位接口
export function getUnitPage(data) {
  return request({
    url: baseUrl + '/basicData/getUnitPage',
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
// 分页查询任务预警记录
export function getTaskWarningLogPage(data) {
  return request({
    url: baseUrl + '/warning/getTaskWarningLogPage',
    method: 'get',
    params: data
  })
}
// 分页查询进度预警
export function getTaskWarningPage(data) {
  return request({
    url: baseUrl + '/warning/getTaskWarningPage',
    method: 'get',
    params: data
  })
}
// 解除任务预警
export function relieveTaskWarning(data) {
  return request({
    url: baseUrl + '/warning/relieveTaskWarning',
    method: 'post',
    data: data
  })
}
// 任务督办
export function urgeTask(data) {
  return request({
    url: baseUrl + '/warning/urgeTask',
    method: 'post',
    data: data
  })
}
// 查询所在组织可用的分部分项信息
export function getSubsectionPage(data) {
  return request({
    url: baseUrl + '/basicData/getSubsectionPage',
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
    url: baseUrl + '/schedule/getConstructPlanPage',
    method: 'get',
    params: data
  })
}
// 添加施工记录
export function addConstructLog(data) {
  return request({
    url: baseUrl + '/schedule/addConstructLog',
    method: 'post',
    data: data
  })
}
// 添加进度计划
export function addConstructPlan(data) {
  return request({
    url: baseUrl + '/schedule/addConstructPlan',
    method: 'post',
    data: data
  })
}
// 启用施工进度计划
export function startConstructPlan(data) {
  return request({
    url: baseUrl + '/schedule/startConstructPlan/' + data,
    method: 'put'
  })
}
// 禁用施工进度计划
export function stopVisualStatItem(data) {
  return request({
    url: baseUrl + '/schedule/stopVisualStatItem/' + data,
    method: 'put'
  })
}
// 删除施工进度计划
export function deleteConstructPlanById(data) {
  return request({
    url: baseUrl + '/schedule/deleteConstructPlanById/' + data,
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