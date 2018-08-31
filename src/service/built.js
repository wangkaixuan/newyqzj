import { fetch } from "../config/fetch"; //引用fetch.js
import api from '../../config/env'; //引用url.js
//获取处置建议、媒体类型、舆情分类列表
export function getAllTypeData(groupId) {
  return fetch({
    //api.Hallowmas 引用url.js里面的数据
    url: api.apiUrl+'/reportInfo/getDimenAndProposalAndSourceList',
    method: 'get',
    params: groupId
  })
}
//获取舆情报送
export function getWorkBenchData(data) {
  return fetch({
    url:api.apiUrl+'/reportInfo/getSentimentDeliveryList',
    method:'get',
    params: data
  })
}
//获取舆情报送 —— 删除
export function deleteBuiltData(data) {
  return fetch({
    url:api.apiUrl+'/reportInfo/delReportInfo',
    method:'post',
    data: data
  })
}
//获取舆情报送 —— 撤回
export function withdrawBuiltData(data) {
  return fetch({
    url:api.apiUrl+'/reportInfo/updateWithdraw',
    method:'post',
    data: data
  })
}
//获取舆情报送 —— 查看
export function getSeeBuiltData(data) {
  return fetch({
    url:api.apiUrl+'/reportInfo/getSentimentDeliveryInfo',
    method:'get',
    params: data
  })
}
//获取舆情报送 —— 新建报送——批示人——其他单位
export function getInstructOtherTreeData(data) {
  return fetch({
    url:api.apiUrl+'/organizational/getAllOrgTree',
    method:'get',
    params: data
  })
}
//获取舆情报送 —— 新建报送——批示人——我的单位
export function getInstructMyTreeData(data) {
  return fetch({
    url:api.apiUrl+'/reportInfo/getOrgUsers',
    method:'get',
    params: data
  })
}
//获取舆情报送 —— 新建报送保存
export function saveBuiltSubmitData(data,fun) {
  return fetch({
    transformRequest:function(data){
      fun();
      return data;
    },
    'Content-Type':'multipart/form-data',
    url:api.apiUrl+'/reportInfo/addOrgEditReportInfo',
    method:'post',
    data: data
  })
}
//获取舆情报送 —— 重报
export function getRestatementBuiltData(data) {
  return fetch({
    url:api.apiUrl+'/reportInfo/getSentimentDeliveryInfo',
    method:'get',
    params: data
  })
}
/****************************获取舆情审核*************************/
//获取舆情审核
export function getOpinionReviewListData(data) {
  return fetch({
    url:api.apiUrl+'/reportInfo/getOpinionReviewList',
    method:'get',
    params: data
  })
}
//获取舆情审核 —— 提交
export function submitAuditData(data,fun) {
  return fetch({
    transformRequest:function(data){
      fun();
      return data;
    },
    url:api.apiUrl+'/reportInfo/updateApproval',
    method:'post',
    data: data
  })
}
