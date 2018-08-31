import { fetch } from "../config/fetch"; //引用fetch.js
import api from '../../config/env'; //引用url.js

//获得组织机构树数据
export function getOrganizationalManagementTree(groupId) {
  return fetch({
    //api.Hallowmas 引用url.js里面的数据
    url: api.apiUrl+'/organizational/getOrganizationalManagementTree',
    method: 'get',//请求方法
    params:{
      groupId:groupId //传过去的参数
    }
  })
}
//获得人员列表数据
export function getOrgUserList(dataParameter) {
  return fetch({
    url:api.apiUrl+'/orgUser/getOrgUserList',
    method:'get',
    params:dataParameter
  })
}
//保存人员数据
export function addOrgUser(dp) {
  return fetch({
    url:api.apiUrl+'/orgUser/addOrgUser',
    method:'post',
    data:dp
  })
}


