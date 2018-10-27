import request from '@/utils/request'
import { getToken} from '@/utils/auth'

// 云盘上传文件接口
export function getPolicy(ext) {
  return request({
    url: `http://localhost:8080/alphaPortalService/cloud/policy`,
    method: 'get',
    params: { ext }
  })
}

// 云盘上传文件接口
export function uploadSave(data) {
  return request({
    url: 'http://autobuild.jiguantong.com/alphaPortalService/cloud/file',
    method: 'post',
    data: data
  })
}
// 请求云盘列表数据
export function getUploadDataList() {
  return request({
    url: '',
    method: 'get',
    data: {
      
    }
  })
}

///////////////////

// 新增云盘文件信息
export function saveCloudFileInfo(data) {
  return request({
    url: 'http://autobuild.jiguantong.com/alphaPortalService/cloud/file',
    // url: 'http://192.168.1.16:8080/alphaPortalService/cloud/file',
    method: 'post',
    data: data
  })
}

// 修改云盘文件信息
export function updateCloudFileInfo(data) {
  return request({
    url: 'http://autobuild.jiguantong.com/alphaPortalService/cloud/file',
    method: 'put',
    data: data
  })
}

// 分页查询云盘文件信息
// 传入文件夹ID 查询文件夹下列表， 默认传入值0
export function queryCloudFileInfoPage(folderId) {
  return request({
    url: 'http://autobuild.jiguantong.com/alphaPortalService/cloud/file',
    method: 'get',
    params: {folderId}
  })
}

// 查询云盘文件信息
export function queryCloudFileInfo(id) {
  return request({
    url: 'http://autobuild.jiguantong.com/alphaPortalService/cloud/file'+'?id='+id,
    method: 'get',
    data: {
      
    }
  })
}

// 删除云盘文件信息
export function deleteCloudFileInfo(data) {
  return request({
    url: 'http://autobuild.jiguantong.com/alphaPortalService/cloud/file',
    method: 'delete',
    data: data
  })
}

///////////////////

// 新增云盘文件夹信息
export function saveCloudFolderInfo(data) {
  return request({
    url: 'http://autobuild.jiguantong.com/alphaPortalService/cloud/folder',
    // url: 'http://192.168.1.16:8080/alphaPortalService/cloud/folder',
    method: 'post',
    data: data
  })
}

// 修改云盘文件夹信息
export function updateCloudFolderInfo(data) {
  return request({
    url: 'http://autobuild.jiguantong.com/alphaPortalService/cloud/folder',
    method: 'put',
    data: data
  })
}

// 分页查询云盘文件夹信息
// 传如parentId 查询文件夹下列表， 默认传入值0 
export function queryCloudFolderInfoPage(parentId) {
  return request({
    url: 'http://autobuild.jiguantong.com/alphaPortalService/cloud/folder',
    method: 'get',
    params: { parentId }
  })
}

// 查询云盘文件夹信息
// 目前没用
export function queryCloudFolderInfo(id) {
  return request({
    url: 'http://autobuild.jiguantong.com/alphaPortalService/cloud/folder'+'?id='+id,
    method: 'get',
    data: {
      
    }
  })
}

// 删除云盘文件夹信息
export function deleteCloudFolderInfo(data) {
  return request({
    url: 'http://autobuild.jiguantong.com/alphaPortalService/cloud/folder',
    method: 'delete',
    data: data
  })
}

//获取code
export function getUserCode(token) {
  return request({
    url: 'http://autobuild.jiguantong.com/alphaPortalService/user/code',
    method: 'POST',
    data: {token: token}
  })
}