import { fetch } from "../config/fetch"; //引用fetch.js
import api from '../config/env'; //引用url.js
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

