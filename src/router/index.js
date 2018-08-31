import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {verifyAccess} from '../js/getheightData'
import opm from '@/page/set/organizationPersonnelManage'
import text from '@/page/text'
import dialog from '@/page/set/dialog'
import organization from '@/page/set/groupManagement'
import browse from '@/page/browse/index'
import infodetail from '@/page/browse/infoDetail'
import workbench from '@/page/theworkbench/workbench'
import publicOpinionAudit from '@/page/theworkbench/publicOpinionAudit'
import newbuiltdelivery from '@/page/theworkbench/newBuiltDelivery'
import seebuilt from '@/page/theworkbench/seebuilt'
import permissiondenied from '@/page/index/permissionDenied'
import exit from '@/page/exit'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path:"/",
      component:text
    },
    {
      path:"/exit",
      component:exit
    },
    {
      path:'/opm',
      component:opm
    },
    {
      path:'/dialog',
      component:dialog
    },
    {
      path:'/organization',
      component:organization
    },
    {
      path:'/browse',
      component:browse
    },
    {
      path:'/infoDetail',
      component:infodetail
    },
    {
      path:'/workbench',
      component:workbench
    },
    {
      path:'/publicOpinionAudit',
      component:publicOpinionAudit
    },
    {
      path:'/newbuiltdelivery',
      component:newbuiltdelivery
    },
    {
      path:'/seebuilt',
      component:seebuilt
    },{
      path:'/permissiondenied',
      component:permissiondenied
    }
  ]
});
router.beforeEach((to, from, next)=>{
  if(to.matched.length  > 0){
    // console.log(to.matched[0].path);
    // verifyAccess(to.matched[0].path);
    // if(verifyAccess){
    //   //next();
    // }
    // console.log(to);
    if(store.state.ACCESSTOKEN != ''){
      next();
    }else{
      next();
    }
  }else{

  }

});

export default router
