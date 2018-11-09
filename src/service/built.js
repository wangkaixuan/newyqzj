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
    'timeout':180 * 1000,
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
// export function getOpinionReviewListData(data) {
//   return fetch({
//     url:api.apiUrl+'/reportInfo/getOpinionReviewList',
//     method:'get',
//     params: data
//   })
// }
//获取舆情审核 —— 提交(上报信息)
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
//获取处置建议
export function getSuggestions(groupId) {
  return fetch({
    url: api.apiUrl+'/reportInfo/getProposalList',
    method: 'get',
    params: groupId
  })
}
//数据列表 —— 数据状态统计数字
export function getStatusCount(data) {
  return fetch({
    url: api.apiUrl+'/reportInfo/getGroupStateCount',
    method: 'get',
    params: data
  })
}
//舆情审批——通过状态的转发——获取人管管理部门树——对应的人
export function getOrgUserList(data) {
  return fetch({
    url: api.apiUrl+'/orgUser/getOrgUserList',
    method: 'get',
    params: data
  })
}
//舆情审批 —— 下指令功能
export function saveTaskInfo(data,fun) {
  return fetch({
    transformRequest:function(data){
      fun();
      return data;
    },
    url:api.apiUrl+'/taskInfo/saveTaskInfo',
    method:'post',
    data: data
  })
}
//舆情审批 —— 转发功能
export function saveForwardInfo(data,fun) {
  return fetch({
    transformRequest:function(data){
      fun();
      return data;
    },
    url:api.apiUrl+'/reportInfo/forwardInfo',
    method:'post',
    data: data
  })
}
//获取舆情审核 —— 带有待回执，已完成
export function getReviewListData(data) {
  return fetch({
    url:api.apiUrl+'/reportInfo/getReviewList',
    method:'get',
    params: data
  })
}
//获取舆情审核 —— 提交(任务信息)
export function submitTaskAuditData(data,fun) {
  return fetch({
    transformRequest:function(data){
      fun();
      return data;
    },
    url:api.apiUrl+'/taskInfo/taskApproval',
    method:'post',
    data: data
  })
}
/****************************获取舆情任务*************************/
//舆情任务 —— 回执
export function taskComplete(data,fun){
  return fetch({
    transformRequest:function(data){
      fun();
      return data;
    },
    'timeout':180 * 1000,
    'Content-Type':'multipart/form-data',
    url:api.apiUrl+'/taskInfo/taskComplete',
    method:'post',
    data: data
  })
}
//舆情任务--列表
export function getTaskList(data) {
  return fetch({
    url: api.apiUrl+'/reportInfo/getTaskInfoList',
    method: 'get',
    params: data
  })
}
//舆情任务 --交办
export function transferTask(data,fun) {
  return fetch({
    transformRequest:function(data){
      fun();
      return data;
    },
    url:api.apiUrl+'/taskInfo/transferTask',
    method:'post',
    data: data
  })
}
/****************************获取抄送办理*************************/
//获取抄送办理 —— 列表
export function getTransactData(data) {
  return fetch({
    url:api.apiUrl+'/reportInfo/getApproverInfoList',
    method:'get',
    params: data
  })
}
//抄送办理 —— 评论信息
export function saveCommentInfo(data,fun) {
  return fetch({
    transformRequest:function(data){
      fun();
      return data;
    },
    url:api.apiUrl+'/reportInfo/approverInfo',
    method:'post',
    data: data
  })
}
//抄送办理 —— 标记已读
export function markRead(data) {
  return fetch({
    url:api.apiUrl+'/reportInfo/UpdateInfoIsread?reportId ='+data.reportId +'&groupId ='+data.groupId,
    method:'post',
    data: data
  })
}
//获得涉事地域
export function getAreaList(data) {
  return fetch({
    url:api.apiUrl+'/reportInfo/getAreaList',
    method:'get',
    params: data
  })
}
//涉事地域统计图
export function getRegionCount(data) {
  return fetch({
    url:api.qUrl+'/workStatistics/getRegionCount',
    method:'get',
    params:data
  })
}
//获取媒体类型统计
export function getMediaCount(data) {
  return fetch({
    url:api.qUrl+'/workStatistics/getMediaCount',
    method:'get',
    params:data
  })
}
//获取舆情分类统计
export function getDimenCount(data) {
  return fetch({
    url:api.apiUrl+'/workStatistics/getDimenCount',
    method:'get',
    params:data
  })
}
