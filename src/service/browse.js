import { fetch } from "../config/fetch"; //引用fetch.js
import api from '../../config/env'; //引用url.js
//获取舆情浏览专题树——我的专题和授权专题树数据
export function getSpecialTopicTree(data) {
  return fetch({
    //api.Hallowmas 引用url.js里面的数据
    url: api.apiUrl+'/PublicSentimentBrowse/getYqllSpecialTree',
    method: 'get',
    params: data
  })
}
//获取舆情浏览列表数据
export function getBrowseList(data,fun) {
  return fetch({
    transformRequest:function(data){
      fun();
      return data;
    },
    url:api.apiUrl+'/wkTValidationRef/getRefList',
    method:'get',
    params: data
  })
}
//获取舆情浏览详情页
export function getBrowseDetail(data) {
  return fetch({
    url:api.apiUrl+'/PublicSentimentBrowse/getYqllDetailInfo',
    method:'get',
    params: data
  })
}
//获取舆情浏览筛选条件
export function getYqllCondition(data) {
  return fetch({
    url:api.apiUrl+'/PublicSentimentBrowse/getYqllCondition',
    method:'get',
    params: data
  })
}
//舆情浏览列表——删除
export function delBrowseList(data) {
  return fetch({
    url:api.apiUrl+'/wkTValidationRef/delRefByUrlOrHash?msUserId='+data.msUserId+'&shareMsUserId='+data.shareMsUserId,
    method:'post',
    data: data
  })
}
//舆情浏览列表-标记已读
export function markRead(data) {
  return fetch({
    url:api.apiUrl+'/wkTValidationRef/updateRefByUrlOrHash?msUserId='+data.msUserId+'&shareMsUserId='+data.shareMsUserId,
    method:'post',
    data: data
  })
}
//舆情浏览列表-操作条——标记倾向性
export function markTendency(data) {
  return fetch({
    url:api.apiUrl+'/PublicSentimentBrowse/updateYqllOri?msUserId='+data.msUserId+'&shareMsUserId='+data.shareMsUserId+'&simhash='+data.simhash+'&orientation='+data.orientation,
    method:'post',
    data: data
  })
}
//获得舆情浏览保存筛选条件
export function getSearchCondition(data) {
  return fetch({
    url:api.apiUrl+'/wkTValidationRef/getSearchCondition',
    method:'get',
    params:data
  })
}
//保存筛选条件
export function saveSearchCondition(data){
  return fetch({
    url:api.apiUrl+'/wkTValidationRef/saveSearchCondition',
    method:'post',
    data:data
  })
}
