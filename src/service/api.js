import { fetch } from "../config/fetch"; //引用fetch.js
import api from '../config/env'; //引用url.js

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
