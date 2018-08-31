import Vue from 'vue'
import vuex from 'vuex'
import VueCookies from 'vue-cookies'
import api from '../../config/env'; //引用url.js

Vue.use(vuex);

const logininfo = JSON.parse(VueCookies.get('LOGININFO')) || [];

const stores = new vuex.Store({
    state:{
      'userinfo_name':logininfo.userName || '',                                //用户名称
      'ACCESSTOKEN':logininfo.accessToken || '',                              //token
      'ZHXGUSERID': logininfo.baseuserid || '',                               //加密后用户ID
      'accountId':logininfo.accountId || '',                                  //用户ID
      'generalGroupId':logininfo.generalGroupId || '',                        //集团ID
      'orgId':logininfo.orgId || '',                                           //机构ID
      'msUserId':logininfo.msUserId  || '',                                    //秘书ID
      'shareMsUserId':logininfo.shareMsUserId || '',                           //分享ID
      'savedays':logininfo.savedays || '',                                     //数据保存条数
      'oldyqzjUrl':api.oldyqzjUrl                                             //跳转路径
    }
});
export default stores
