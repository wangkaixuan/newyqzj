import { fetch } from "../config/fetch"; //引用fetch.js
import api from '../../config/env'; //引用url.js

export function getNavData(id) {
  return fetch({
    //api.Hallowmas 引用url.js里面的数据
    url: api.apiUrl+'/getRoleFunListByAccountId',
    method: 'get',
    params: {
      accountId:id
    }
  })
}
export function WindowLoc(url) {
    window.location = api.apiUrl+url;
}

export function linkDetails(url) {
  let top = (window.screen.height - 800)/2-40;
  let left = (window.screen.width - 1200)/2-20;
  if(top < 0){
    top = 0;
  }
  if(left < 0){
    left = 0;
  }
  window.open(api.thisyqzjUrl+url, '_blank', 'height=800, width=1200, top='+top+', left='+left+', toolbar=no, menubar=no, resizable=no, location=no, status=no')
}
