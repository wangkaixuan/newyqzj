import {getNavData} from '../service/api'
import store from '../store'
import VueCookies from 'vue-cookies'

function setHeaderData  () {
  let accountID = store.state.accountId;
  getNavData(accountID).then(function (res) {
    let funlist = res.data.result.data.funList || '';
    if(funlist === ''){
      localStorage.setItem("navData", '');
      localStorage.setItem("systemSteNavData",'');
      return false;
    }
    let navData = [];                           //主导航
    let systemSteNavData = [];                  //系统设置导航
    for (let i in funlist) {
      if (funlist[i].funName !== '系统设置') {
        navData.push(funlist[i]);
      } else {
        systemSteNavData.push(funlist[i]);
      }
    }
    localStorage.setItem("navData", JSON.stringify(navData));
    localStorage.setItem("systemSteNavData", JSON.stringify(systemSteNavData));
    VueCookies.set('NEWLOGIN','islogin');
    verifyAccess();
  }).catch(err => {
    console.log(err, '请求失败！');
  });
}
export function verifyAccess(pageSrc) {
  let isNewLogin = VueCookies.get('NEWLOGIN') || '';
  if(isNewLogin === 'new'){
    setHeaderData();
    return false;
  }
  let navData = localStorage.getItem("navData");
  if(navData === ''){
    return 'permissiondenied';
  }
  navData = JSON.parse(navData);
  return pageSrc;
}
