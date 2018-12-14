import Vue from 'vue'
import Vuex from 'vuex'
import nav from './modules/nav'
import VueCookies from 'vue-cookies'
import api from '../../config/env'; //引用url.js

Vue.use(Vuex);
let logininfo = VueCookies.get('LOGININFO') || [];

if (typeof logininfo === 'string') {
  logininfo = JSON.parse(VueCookies.get('LOGININFO'));
}
const stores = new Vuex.Store({
  modules: {
    nav
  },
  state: {
    'account': logininfo.account || '',                                        //手机号
    'userinfo_name': logininfo.userName || '',                                //用户名称
    'ACCESSTOKEN': logininfo.accessToken || '',                              //token
    'ZHXGUSERID': logininfo.baseuserid || '',                               //加密后用户ID
    'accountId': logininfo.accountId || '',                                  //用户ID
    'generalGroupId': logininfo.generalGroupId || '',                        //集团ID
    'orgId': logininfo.orgId || '',                                           //机构ID
    'msUserId': logininfo.msUserId || '',                                    //秘书ID
    'shareMsUserId': logininfo.shareMsUserId || '',                           //分享ID
    'savedays': logininfo.savedays || '',                                     //数据保存条数
    'orgLogo': logininfo.orgLogo || '',                                     //logo
    'sysName': logininfo.sysNamedata || '',                                     //名字
    'provinceId': logininfo.provinceId || '',                                     //地域 省ID
    'oldyqzjUrl': api.oldyqzjUrl                                             //跳转路径
  }
});
export default stores
