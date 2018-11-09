import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router);

const router =  new Router({
  routes: [
    // {
    //   path:"/",
    //   component:text
    // },
    {
      path:"/exit",
      name:"exit",
      component:resolve => require(['@/page/exit'],resolve)
    },
    {
      path:'/opm',
      name:'opm',
      component:resolve => require(['@/page/set/organizationPersonnelManage'],resolve)
    },
    {
      path:'/dialog',
      name:'dialog',
      component:resolve => require(['@/page/set/dialog'],resolve)
    },
    {
      path:'/organization',
      name:'organization',
      component:resolve => require(['@/page/set/groupManagement'],resolve)
    },
    {
      path:'/browse',
      name:'browse',
      component:resolve => require(['@/page/browse/index'],resolve)
    },
    {
      path:'/infoDetail',
      name:'infoDetail',
      component:resolve => require(['@/page/browse/infoDetail'],resolve)
    },
    {
      path:'/workbench',
      name:'workbench',
      component:resolve => require(['@/page/theworkbench/workbench'],resolve)
    },
    {
      path:'/publicOpinionAudit',
      name:'publicOpinionAudit',
      component:resolve => require(['@/page/theworkbench/publicOpinionAudit'],resolve)
    },
    {
      path:'/newbuiltdelivery',
      name:'newbuiltdelivery',
      component:resolve => require(['@/page/theworkbench/newBuiltDelivery'],resolve)
    },
    {
      path:'/seebuilt',
      name:'seebuilt',
      component:resolve => require(['@/page/theworkbench/seebuilt'],resolve)
    },{
      path:'/permissiondenied',
      name:'permissiondenied',
      component:resolve => require(['@/page/index/permissionDenied'],resolve)
    },{
      path:'/yqtask',
      name:'yqtask',
      component:resolve => require(['@/page/theworkbench/yqtask'],resolve)
    },{
      path:'/transact',
      name:'transact',
      component:resolve => require(['@/page/theworkbench/transact'],resolve)
    },{
      path:"/receiptTask",
      name:'receiptTask',
      component:resolve => require(['@/page/theworkbench/receiptTask'],resolve)
    },{
      path:"/updatelogo",
      name:'updatelogo',
      component:resolve => require(['@/page/set/updatelogo'],resolve)
    },{
      //工作统计
      path:"/workbenchChart",
      name:'workbenchChart',
      component:resolve => require(['@/page/theworkbench/workbenchChart'],resolve)
    },{
      //工作台详情页
      path:"/details",
      name:"details",
      component:resolve => require(['@/page/theworkbench/details'],resolve)
    }
  ]
});
router.beforeEach((to, from, next)=>{
  if(to.matched.length  > 0){
    if(store.state.ACCESSTOKEN != ''){
      next();
    }else{
      console.log('-----------')
      //window.location = store.state.oldyqzjUrl+'/Login/login'
    }
  }else{
    console.log('+++++++++++++++++++++++++++++++++')
    //window.location = store.state.oldyqzjUrl+'/Login/login'
  }

});

export default router
