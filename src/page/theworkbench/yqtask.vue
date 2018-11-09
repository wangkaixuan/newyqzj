<template>
  <div class="wary_workbench">
    <yqzj-Head funName="工作台" subname="舆情任务"></yqzj-Head>
    <div class="center border_box">
      <gztsearch :navData="navData" :searchitem="searchitem" :dataParameter="dataParameter" @searchData ="searchData"></gztsearch>
      <div class="built_center">
        <label><input type="checkbox" name="allWork"> 全部</label>
        <!--<div class="work_botton clearfix_workbench">-->
        <!--<router-link tag="a" :to="{path: 'newbuiltdelivery', query: {from: 'workbench'}}" class="sb">新建报送-->
        <!--</router-link>-->
        <!--<a href="javascript:void(0)" @click="alertInfo">全部导出</a>-->
        <!--<a href="javascript:void(0)" @click="alertInfo">批量导出</a>-->
        <!--</div>-->
      </div>
      <div class="built_btom">
        <div class="work_list" v-if="listData.length > 0">
          <div class="list_pub clearfix_workbench" v-for="list in listData">
            <!--复选框-->
            <label><input type="checkbox" name="" value=""></label>
            <!--内容-->
            <div class="info clearfix_workbench">
              <div class="info_body">
                <div class="info_tit">
                  <!--type_jj type_zy-->
                  <p v-if="list.importanceName === '紧急'" class="type_jj">{{list.importanceName}}</p>
                  <p v-else-if="list.importanceName === '重要'" class="type_zy">{{list.importanceName}}</p>
                  <p v-else>{{list.importanceName}}</p>
                  <p class="fenlei">{{list.dimensionName}}</p>
                  <!-- <a>{{list.title}}</a> -->
                  <router-link tag="a" :to="{path: 'seebuilt', query: {id: list.reportId,from: 'task'}}" target="_blank">{{list.title}}</router-link>
                </div>
                <div class="jb_info">
                  <p><span>发起时间</span> {{list.createTaskTime}}</p>
                  <p><span>发起人</span> {{list.createTaskUser}}</p>
                </div>
              </div>
              <!--操作-->
              <div class="info_cz">
                <router-link tag="a" :to="{path: 'seebuilt', query: {id: list.reportId,from: 'task'}}" target="_blank">查看 </router-link>
                <router-link tag="a" :to="{path: 'receiptTask', query: {id: list.id,taskId:list.taskId,cztype: 'receipt',reportId:list.reportId}}" v-if="dataParameter.status == '1' && list.isOperation == '1' ">回执 </router-link>
                <router-link tag="a" :to="{path: 'receiptTask', query: {id: list.id,taskId:list.taskId,cztype: 'assign',reportId:list.reportId,handleTaskUser:list.handleTaskUser,handleTaskOrg:list.handleTaskOrg,type:dataParameter.type}}" v-if="dataParameter.status == '1' && list.isOperation == '1' ">交办 </router-link>
              </div>
            </div>
          </div>
          <!--列表结束-->
          <!--分页-->
          <pubpaging :pages="pages" :current.sync="dataParameter.pageNum" :totals="total" @navpage="msgListView"></pubpaging>
        </div>
        <div class="nodata" v-else>
          <div class="noData noDataBreowe">
            <img src="../../images/nodata.png">
            <p>暂无数据</p>
          </div>
        </div>
      </div>
    </div>
    <yqzj-Footer></yqzj-Footer>
  </div>
</template>
<script>
  import yqzjHead from '../../components/header.vue'
  import yqzjFooter from '../../components/footer.vue'
  import pubpaging from '../../components/pagination.vue'
  import gztsearch from './search.vue'
  import Watermark from '../../js/watermark'
  import {getTaskList} from '../../service/built'
  export default{
      data(){
        return {
          listData:[],
          navData:[{info:'我的任务',key:'2'},{info:'单位任务',key:'1'}],
          searchitem:[{info:'待处置',key:'1'},{info:'未审核',key:'2'},{info:'已完成',key:'3'}],
          timeWz: '不限',                 //搜索时间文字
          showDate: false,                //是否日历
          chooseSTime: '',         			//开始时间
          chooseETime: '',         			//结束时间
          dataParameter: {
            groupId: this.$store.state.generalGroupId,          //集团ID $store.state.generalGroupId
            orgId: this.$store.state.orgId,                    //机构ID $store.state.orgId
            type:2,                           // 1指给部门 2 指给个人
            pageSize: '10',                  //每页条数
            pageNum: 1,                      //当前页数
            status: '1',                    //状态       1 待审核，2未审核, 3 已完成
            time: 'all',                    //状态 1day： 当天，3day：3天内，7day：7天内 all
            sTime: '',                      //开始时间
            eTime: '',                      //结束时间
            mediaType: '',                  //媒体类型  '' 为全部
            dimension: '',                  //舆情分类  '' 为全部
          },
          total: 0,                       //总条数
          searchState: '', //设置点击哪个筛选 0 上报时间 1媒体类型 2 舆情分类
        }
      },
    components:{
      yqzjHead,
      yqzjFooter,
      pubpaging,
      gztsearch
    },
    methods:{
      getList(){
        let _this = this;
        getTaskList(this.dataParameter).then(res=>{
          this.listData = res.data.result.data || [];
          _this.total = res.data.result.total;  //总条数
          _this.pages =  Math.ceil(res.data.result.total/res.data.result.pageSize);      //页数
        }).catch(err=>{

        })
      },
      msgListView(curPage){
        //分页
        this.dataParameter.pageNum = curPage;
        this.getList();
      },
      searchData(s){
        if(s.type === 'sTime'){
          this.dataParameter.sTime = s.sTime;
          this.dataParameter.eTime = s.eTime;
        }else{
          this.dataParameter[s.key] = s.val;
        }
        this.dataParameter.pageNum = 1;
        this.getList();
      }
    },
    mounted(){
      this.getList();
//      document.addEventListener('click', this.handleBodyClick);
    }
  }
</script>
<style>
  @import "../../style/workbenchnew.css";
</style>
