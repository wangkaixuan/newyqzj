<template>
  <div class="wary_workbench_new" ref="watermarkWary">
    <yqzj-Head funName="工作台" subname="舆情任务"></yqzj-Head>
    <div class="center border_box clearfix_workbench">
      <div class="tab_box clearfix_workbench border_box">
        <div class="nav_button border_box" :class="{hover:dataParameter.type == n.key}" @click="updateType(n.key)" v-for="n,i in navData">{{n.info}}<span class="total_num" v-if="n.count > 0">{{n.count}}</span></div>
      </div>
      <!-- 左侧导航 -->
      <div class="new_nav_left">
        <ul class="new_nav_list_box border_box">
          <li class="border_box">
            <a href="javascript:void(0);" class="clearfix_workbench" :class="{hover:showTotal===''}" @click="queryAll">
              <span class="list_l">全部</span>
              <span class="list_r">{{totalDimenCount}}</span>
            </a>
          </li>
          <li class="border_box">
            <a href="javascript:void(0);" class="clearfix_workbench" :class="{hover:showTotal === list.id}" v-if="leftDimenData.length > 0" v-for="(list,i) in leftDimenData" @click.stop="queryDimen(list)">
              <span class="list_l">{{list.name}}</span>
              <span class="list_r">{{list.value}}</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- 右侧列表 -->
      <div class="new_nav_right">
        <gztsearch :navData="navData" :searchitem="searchitem" :dataParameter="dataParameter" :statusCount="statusCount" :txtObj="txtObj" @searchData ="searchData"></gztsearch>
        <div class="built_center">
          <label><input type="checkbox" name="allWork"> 全部</label>
          <span class="total_box" v-if="total > 0"><span class="total_num">{{total}}</span>&nbsp;条</span>
          <span class="total_box" v-else><span class="total_num">0</span>&nbsp;条</span>
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
                    <a href="javascript:void(0)" @click="detailsInfo(list.reportId,'task',dataParameter.status)" >{{list.title}}</a>
                  </div>
                  <div class="jb_info clearfix_workbench">
                    <p><span class="s_light">发起时间</span> <span class="s_dark">{{list.createTaskTime}}</span></p>
                    <p v-if="list.city !== 'null' || list.cityId != 0">
                      <span class="s_light">涉事地域</span>
                      <span class="s_dark s_max" :title="list.city+'-'+list.county" v-if="list.county !== 'null'">{{list.city}}-{{list.county}}</span>
                      <span class="s_dark s_max" :title="list.city" v-else>{{list.city}}</span>
                    </p>
                    <p v-else><span class="s_light">涉事地域</span></p>
                    <p><span class="s_light">发起人</span> <span class="s_dark s_max" :title="list.createTaskUser">{{list.createTaskUser}}</span></p>
                    <p><span class="s_light">来源</span> <span class="s_dark s_max" :title="list.source">{{list.source}}</span></p>
                  </div>
                </div>
                <!--操作-->
                <div class="info_cz">
                  <!--<router-link tag="a" :to="{path: 'seebuilt', query: {id: list.reportId,from: 'task'}}" target="_blank">查看 </router-link>-->
                  <a href="javascript:void(0)" @click="detailsInfo(list.reportId,'task',dataParameter.status)" >查看</a>
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
  import {getTaskList, getLeftDimenData, getTaskCount} from '../../service/built'
  import {linkDetails} from '../../service/api'
  export default{
      data(){
        return {
          listData:[],
          navData:[{info:'我的任务',key:'2',count: 0},{info:'单位任务',key:'1',count: 0}],
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
            cityId: '',                     //涉事地域 - 市ID
            countyId: '',                   //涉事地域 - 县ID
          },
          total: 0,                       //总条数
          searchState: '', //设置点击哪个筛选 0 上报时间 1媒体类型 2 舆情分类

          leftDimenData: [],   //左侧舆情分类数据
          dimenParams:{        //查询左侧列表请求的参数
            groupId: this.$store.state.generalGroupId,
            orgId: this.$store.state.orgId,
            type: 3,       //类型：1报送 2审批 3任务
            AssignType: 2, //类型:1指给部门的，2指给我的  this.dataParameter.type
          },
          totalDimenCount: 0, //查询左侧列表数据的总和
          showTotal: '',      //全部是否高亮
          statusCount: {      //状态值的个数
            undisposedNum: 0, //待处置
            UnauditedNum: 0,  //未审核
            completedNum: 0,  //已完成
          },
          myUndoCount: 0,        //我的待审批
          deptmentUndoCount: 0,  //部门待审批
          txtObj: {     //筛选条件默认文本
            timeWz: '不限',                 //搜索时间文字
            mediaTypeWz: '全部',            //搜索媒体类型文字  默认是全部
            dimensionWz: '全部',            //搜索舆情分类文字  默认是全部
            areaWz: '全部',                 //搜索涉事地域文字  默认是全部
            oldTime: '',  //状态 1day：当天，3day：3天内，7day：7天内，all ：不限  默认是不限
          },
        }
      },
    components:{
      yqzjHead,
      yqzjFooter,
      pubpaging,
      gztsearch
    },
    methods:{
      //跳转详情页
      detailsInfo(s,f,status){
        linkDetails('details?id='+s+'&from='+f+'&status='+status);
      },
      getList(){
        let _this = this;
        getTaskList(this.dataParameter).then(res=>{
          this.listData = res.data.result.data || [];
          _this.total = res.data.result.total;  //总条数
          _this.pages =  Math.ceil(res.data.result.total/res.data.result.pageSize);      //页数
        }).catch(err=>{
          console.log(err,'请求失败！');
        })
      },
      msgListView(curPage){
        //分页
        this.dataParameter.pageNum = curPage;
        this.getList();
      },
      searchData(s){
        if(s.key === 'sTime'){
          this.dataParameter.sTime = s.sTime;
          this.dataParameter.eTime = s.eTime;
        }else if(s.key === 'cityId'){
          this.dataParameter.cityId = s.cityId;
          this.dataParameter.countyId = s.countyId;
        }else{
          this.dataParameter[s.key] = s.val;
        }
        this.dataParameter.pageNum = 1;
        this.getList();
      },
      updateType(s){
        this.dataParameter.type = s;
        this.dataParameter.status = '1';
        //切换时，素有参数回复到最初值
        this.dataParameter.time = 'all';
        this.txtObj.oldTime = 'all'; 
        this.txtObj.timeWz = '不限';
        this.dataParameter.sTime = '';
        this.dataParameter.eTime = '';
        this.dataParameter.mediaType = '';
        this.txtObj.mediaTypeWz = '全部';
        this.dataParameter.dimension = '';
        this.txtObj.dimensionWz = '全部';
        this.dataParameter.cityId = '';
        this.dataParameter.countyId = '';
        this.txtObj.areaWz = '全部';
        this.getList();
        this.dimenParams.AssignType = s;
        this.totalDimenCount = 0;
        this.getDimenTree();
        //切换身份时，重置到最初的值
        this.statusCount.undisposedNum = 0;
        this.statusCount.UnauditedNum = 0;
        this.statusCount.completedNum = 0;
        this.getStatusCountData();
      },
      //获取审批列表左侧舆情分类
      getDimenTree(){
        let _this = this;
        getLeftDimenData(_this.dimenParams).then(function (res) {
          if(res.data.status == '0'){
            if(res.data.result){
              _this.leftDimenData = res.data.result.data;
              for(let i in _this.leftDimenData){
                _this.totalDimenCount += _this.leftDimenData[i].value;
              }
            }else{
              _this.leftDimenData = [];
              _this.totalDimenCount = 0;
            }
          }else{
            _this.$message({
              type: 'error',
              customClass: 'ele_ui_tips_position',
              message: '没有返回值'
            });
          }
        }).catch(err=>{
          _this.$message({
            type: 'error',
            customClass: 'ele_ui_tips_position',
            message: '请求失败！'
          });
          });
      },
      // 左侧——舆情分类 全部高亮
      queryAll(){
        this.showTotal = '';
        this.dataParameter.dimension = '';
        this.getList();
      },
      // 左侧——舆情分类设置高亮
      queryDimen(item){
        this.showTotal = item.id;
        this.dataParameter.dimension = item.id;
        this.getList();
      },
      //数据列表 —— 数据状态统计数字
      getStatusCountData(){
        let _this = this;
        //获取舆情任务
        getTaskCount(_this.dataParameter).then(function (res) {
          // 1 待处置，2 未审核, 3 已完成
          if(res.data.result){
            let result = res.data.result.data;
            for(let i in result){
              if(i == 1){
                _this.statusCount.undisposedNum = result[i];
              }else if(i == 2){
                _this.statusCount.UnauditedNum = result[i];
              }else if(i == 3){
                _this.statusCount.completedNum = result[i];
              }
            }
          }else{
            console.log('返回结果为空！');
          }
        }).catch(err => {
          console.log(err, '请求失败！');
        });
      },
      //数据列表 —— 数据状态统计数字 - 部门
      getStatusCountData2(){
        let _this = this;
        _this.dataParameter.type = 1; //部门的
        //获取舆情任务
        getTaskCount(_this.dataParameter).then(function (res) {
          // 1 待处置，2 未审核, 3 已完成
          if(res.data.result){
            let result = res.data.result.data;
            for(let i in result){
              if(i == 1){
                _this.statusCount.undisposedNum = result[i];
                _this.deptmentUndoCount = result[i];
              }else if(i == 2){
                _this.statusCount.UnauditedNum = result[i];
              }else if(i == 3){
                _this.statusCount.completedNum = result[i];
              }
            }
            //查询 部门 待审批 的统计数
            for(let n in _this.navData){
              if(_this.navData[n].key == '1'){
                _this.navData[n].count = _this.deptmentUndoCount;
              }
            }
          }else{
            console.log('返回结果为空！');
          }
          _this.getStatusCountData3();
        }).catch(err => {
          console.log(err, '请求失败！');
        });
      },
      //数据列表 —— 数据状态统计数字 - 我的
      getStatusCountData3(){
        let _this = this;
        _this.dataParameter.type = 2; //我的
        _this.getList();
        //获取舆情任务
        getTaskCount(_this.dataParameter).then(function (res) {
          // 1 待处置，2 未审核, 3 已完成
          if(res.data.result){
            let result = res.data.result.data;
            for(let i in result){
              if(i == 1){
                _this.statusCount.undisposedNum = result[i];
                _this.myUndoCount = result[i];
              }else if(i == 2){
                _this.statusCount.UnauditedNum = result[i];
              }else if(i == 3){
                _this.statusCount.completedNum = result[i];
              }
            }
            //查询 我的 待审批 的统计数
            for(let n in _this.navData){
              if(_this.navData[n].key == '2'){
                _this.navData[n].count = _this.myUndoCount;
              }
            }
          }else{
            console.log('返回结果为空！');
          }
        }).catch(err => {
          console.log(err, '请求失败！');
        });
      }
    },
    mounted(){
      let username = this.$store.state.userinfo_name;
      let account = this.$store.state.account.substr(7,4);
      Watermark.set(username+"  "+account,this.$refs.watermarkWary);
      //获取审批列表左侧舆情分类
      this.getDimenTree();
      // document.addEventListener('click', this.handleBodyClick);
      // this.getStatusCountData();
      this.getStatusCountData2();
    },
    watch: { //深度 watcher 监听状态值的变化
      undisposedNum(val, oldVal){
        // console.log("this.statusCount.unapprovedNum: "+val, oldVal);
      },
      UnauditedNum(val, oldVal){
        // console.log("this.statusCount.UnauditedNum "+val, oldVal);
      },
      completedNum(val, oldVal){
        // console.log("this.statusCount.completedNum "+val, oldVal);
      }
    },
    computed: {
      undisposedNum() {
  　　　　return this.statusCount.undisposedNum;
  　　},
      UnauditedNum() {
  　　　　return this.statusCount.UnauditedNum;
  　　},
      completedNum() {
  　　　　return this.statusCount.completedNum;
  　　}
    }
  }
</script>
<style>
  @import "../../style/workbenchnew.css";
</style>
