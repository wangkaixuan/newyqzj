import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import opm from '@/page/set/organizationPersonnelManage'
import text from '@/page/text'
import dialog from '@/page/set/dialog'
import organization from '@/page/set/groupManagement'
import browse from '@/page/browse/index'
import infodetail from '@/page/browse/infoDetail'
import newbuilt from '@/page/theworkbench/newBuilt'
import workbench from '@/page/theworkbench/workbench'
import publicOpinionAudit from '@/page/theworkbench/publicOpinionAudit'

Vue.use(Router)

const router =  new Router({
  routes: [
    // {
    //   path:"/",
    //   component:text
    // },
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
      path:'/newbuilt',
      component:newbuilt
    },
    {
      path:'/workbench',
      component:workbench
    },
    {
      path:'/publicOpinionAudit',
      component:publicOpinionAudit
    }
  ]
})
router.beforeEach((to, from, next)=>{
  if(to.matched.length  > 0){
    if(store.state.ACCESSTOKEN != ''){
      next();
    }else{
      window.location = store.state.oldyqzjUrl+'/Login/login'
    }
  }else{
    window.location = store.state.oldyqzjUrl+'/Login/login'
  }

});

export default router
