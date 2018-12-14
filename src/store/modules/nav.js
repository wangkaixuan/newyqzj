import {getNavData} from '../../service/api'

const nav = {
  state: {
    headNavData:[],   //主导航
    systemSteNavData:[]  //设置导航
  },
  mutations:{
    setHeadNavData:(state,funlist) =>{
      // state.headNavData = navData;
      let navData = [];                           //主导航
      let systemSteNavDatas = [];                  //系统设置导航
      //遍历
      for (let i in funlist) {
        navData.push(funlist[i]);
        if (funlist[i].funName === '系统设置') {
          systemSteNavDatas.push(funlist[i]);
        }
      }
      if (navData.length > 0) {``
        state.headNavData = navData;
      }
      if (systemSteNavDatas.length > 0) {
        state.systemSteNavData = systemSteNavDatas;
      }
    }
  },
  actions:{
    setHeadNavData({ commit},accountId){
      console.log("---------------------");
      return new Promise((resolve,reject) =>{
        getNavData(accountId).then(function (res) {
          let funlist = res.data.result.data.funList;
           console.log(funlist);
          commit('setHeadNavData',funlist)
          resolve()
        }).catch(err => {
          reject(err);
        });
      })
    }
  }
};
export default nav
