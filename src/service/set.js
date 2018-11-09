import { fetch } from "../config/fetch"; //引用fetch.js
import api from '../../config/env'; //引用url.js
//查询图片
export function getLogoDate(data) {
  return fetch({
    url:api.apiUrl+'/organizational/getOrgLogoList',
    method:'get',
    params: data
  })
}
//上传图片
export function uploadLogoData(data) {
  return fetch({
    'Content-Type':'multipart/form-data',
    url:api.apiUrl+'/organizational/saveOrgLogo',
    method:'post',
    data: data
  })
}
//删除图片
export function delLogoData(data) {
  return fetch({
    url:api.apiUrl+'/organizational/delOrgLogo',
    method:'post',
    data: data
  })
}
//查询默认 logo and 文本
export function getDefaultLogoDate(data) {
  return fetch({
    url:api.apiUrl+'/organizational/getSysName',
    method:'get',
    params: data
  })
}
//编辑图片 -- 提交图片
export function editLogoData(data) {
  return fetch({
    url:api.apiUrl+'/organizational/editOrgLogo',
    method:'post',
    data: data
  })
}