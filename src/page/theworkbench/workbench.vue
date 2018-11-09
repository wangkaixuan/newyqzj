<template>
  <div class="wary_workbench">
    <yqzj-Head @setSecondNav="setSubNav" funName="工作台" subname="舆情报送"></yqzj-Head>
    <!-- <work-nav :subNavData="subNavData" navName='舆情报送'></work-nav> -->
    <div class="center border_box">
      <div class="built_top">
        <div class="classification clearfix_workbench border_box">
          <div class="nav_button border_box hover" >舆情报送</div>
        </div>
        <div class="workbench_title">
          <a href="javascript:void(0)" :class="{hover:dataParameter.status == '0'}" @click="setNav('0')">未审批<span class="num" v-if="statusCount.unapprovedNum > 0">{{statusCount.unapprovedNum}}</span></a>
          <a href="javascript:void(0)" :class="{hover:dataParameter.status == '1'}" @click="setNav('1')">通过<span class="num" v-if="statusCount.passedNum > 0">{{statusCount.passedNum}}</span></a>
          <a href="javascript:void(0)" :class="{hover:dataParameter.status == '2'}" @click="setNav('2')">未通过<span class="num" v-if="statusCount.unpassedNum > 0">{{statusCount.unpassedNum}}</span></a>
          <a href="javascript:void(0)" :class="{hover:dataParameter.status == '3'}" @click="setNav('3')">已撤回<span class="num" v-if="statusCount.withdrawnNum > 0">{{statusCount.withdrawnNum}}</span></a>
        </div>
        <div class="search border_box">
          <ul class="clearfix_workbench">
            <li class="s_time border_box" :class="{hover:searchState == '0'}" @click.stop="searchTime('0')">
              <span class="work_date_title">上报时间</span><span class="hover">{{timeWz}}</span><i class="arrow"></i><span class="line">|</span>
            </li>
            <li class="s_time border_box" :class="{hover:searchState == '1'}" @click.stop="searchTime('1')">
              <span class="work_date_title">媒体类型</span><span class="hover">{{mediaTypeWz}}</span><i class="arrow"></i><span  class="line">|</span>
            </li>
            <li class="s_time border_box" :class="{hover:searchState == '2'}" @click.stop="searchTime('2')">
              <span class="work_date_title">舆情分类</span><span class="hover">{{dimensionWz}}</span><i class="arrow"></i>
            </li>
            <!--<li>维度 <i class="two"></i></li>-->
            <!--<li>重要性 <i class="three"></i></li>-->
            <!--<li>涉事地域 <i></i></li>-->
          </ul>
          <!-- 上报时间 -->
          <div class="searchTimeWary border_box" v-show="showTime" @click.stop="">
            <a href="javascript:void(0)" :class="{hover:dataParameter.time == 'all'}"
               @click.stop="setTime('all','不限')">不限</a>
            <a href="javascript:void(0)" :class="{hover:dataParameter.time == '1day'}"
               @click.stop="setTime('1day','今天')">今天</a>
            <a href="javascript:void(0)" :class="{hover:dataParameter.time == '3day'}"
               @click.stop="setTime('3day','近3天')">近3天</a>
            <a href="javascript:void(0)" :class="{hover:dataParameter.time == '7day'}"
               @click.stop="setTime('7day','近7天')">近7天</a>
            <a href="javascript:void(0)"  :class="{hover:dataHover}" @click.stop="selectDate">自定义时间</a>
            <div class="time_box" v-show="showDate">
              <el-date-picker
                v-model="chooseSTime"
                type="datetime"
                :editable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="开始时间"
                :picker-options="startDatePicker"
                @change="sTimeChange">
              </el-date-picker> -
              <el-date-picker
                v-model="chooseETime"
                type="datetime"
                :editable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束时间"
                :picker-options="endDatePicker"
                @change="eTimeChange">
              </el-date-picker>
            </div>
          </div>
          <!-- 媒体类型 -->
          <div class="searchTimeWary border_box" v-show="showMediaType" @click.stop="">
            <a href="javascript:void(0)" :class="{hover:dataParameter.mediaType == ''}"
               @click.stop="setMediaRange('','全部')">全部</a>
            <a href="javascript:void(0)" v-for="(item,i) in mediaTypeArr" :value="item.id" :class="{hover:dataParameter.mediaType == item.id}" @click.stop="setMediaRange(item.id,item.name)">{{item.name}}</a>
          </div>
          <!-- 舆情分类 -->
          <div class="searchTimeWary border_box" v-show="showDimension" @click.stop="">
            <a href="javascript:void(0)" :class="{hover:dataParameter.dimension === ''}"
               @click.stop="setSentimentRange('','全部')">全部</a>
            <a href="javascript:void(0)" v-for="(item,i) in sentimentTypeArr" :value="item.type" :class="{hover:dataParameter.dimension === item.type}" @click.stop="setSentimentRange(item.type,item.name)">{{item.name}}</a>
          </div>
          <!--/维度-不限/重要性-不限/涉事地域-不限-->
          <!-- <div class="search_info">上报时间 - {{timeWz}}</div> -->
        </div>
      </div>
      <div class="built_center">
        <label><input type="checkbox" name="allWork"> 全部</label>
        <div class="work_botton clearfix_workbench">
          <router-link tag="a" :to="{path: 'newbuiltdelivery', query: {from: 'workbench'}}" class="sb">新建报送
          </router-link>
          <a href="javascript:void(0)" @click="alertInfo">全部导出</a>
          <a href="javascript:void(0)" @click="alertInfo">批量导出</a>
        </div>
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
                  <router-link tag="a" :to="{path: 'seebuilt', query: {id: list.reportId,from: 'workbench'}}" target="_blank">{{list.title}}</router-link>
                </div>
                <div class="jb_info">
                  <p><span>上报时间</span> {{list.createTime}}</p>
                  <!--<p><span>涉事地域</span> 北京-海淀</p>-->
                  <p><span>报送人</span> {{list.createUser}}</p>
                </div>
              </div>
              <!--操作-->
              <div class="info_cz">
                <!--原查看条件 v-if="dataParameter.status == '0' || dataParameter.status == '1' || dataParameter.status == '2'" -->
                <router-link tag="a" :to="{path: 'seebuilt', query: {id: list.reportId,from: 'workbench'}}" target="_blank">查看 </router-link>
                <router-link tag="a" :to="{path: 'newbuiltdelivery', query: {id: list.reportId,from: 'workbench'}}"
                             v-if="status == '2' || status == '3'">重报
                </router-link>
                <a href="javascript:void(0)" v-if="status == '3'" @click="delInfo(list.reportId)">删除</a>
                <a href="javascript:void(0)" v-if="status == '0'"
                   @click="revocations(list.reportId)">撤回</a>
                <!--<a href="javascript:void(0)" >转报</a>-->
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
  import VueCookies from 'vue-cookies'
  import pubpaging from '../../components/pagination.vue'
  import workNav from './workNav.vue'
  import Watermark from '../../js/watermark'
  import {getWorkBenchData, deleteBuiltData, withdrawBuiltData, getStatusCount, getAllTypeData} from '../../service/built'

  export default{
    data() {
      return {
        status: '0',                    //0审批中，1已通过，2已拒绝, 3撤回
        showTime: false,                //是否显示选择时间的下拉菜单
        showDate: false,                //是否日历
        dataHover: false,               //选择自定义日期hover态
        showMediaType: false,           //是否显示媒体类型
        mediaTypeArr: [],               //媒体类型
        showDimension: false,           //是否显示舆情分类
        sentimentTypeArr: [],           //舆情分类
        mediaTypeWz: '全部',            //搜索媒体类型文字  默认是全部
        dimensionWz: '全部',            //搜索舆情分类文字  默认是全部
        pages: 1,                       //页数
        total: 0,                       //总条数
        timeWz: '不限',                 //搜索时间文字  默认是不限
        chooseSTime: '',                //开始时间
        chooseETime: '',                //结束时间
        dataParameter: {
          groupId: this.$store.state.generalGroupId,          //集团ID $store.state.generalGroupId
          orgId: this.$store.state.orgId,                    //机构ID $store.state.orgId
          pageSize: '10',                 //每页条数
          pageNum: 1,                     //当前页数
          status: '0',                    //状态       0审批中，1已通过，2已拒绝, 3撤回
          time: 'all',                    //状态 1day：当天，3day：3天内，7day：7天内，all ：不限  默认是不限
          sTime: '',                      //开始时间
          eTime: '',                      //结束时间
          mediaType: '',                  //媒体类型  '' 为全部
          dimension: '',                  //舆情分类  '' 为全部
        },
        listData: [],
        subNavData: [],                       //子集导航
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        searchState: '', //设置点击哪个筛选 0 上报时间 1媒体类型 2 舆情分类
        statusCount: {      //状态值的个数
          unapprovedNum: 0, //未审批
          passedNum: 0,     //通过
          unpassedNum: 0,   //未通过
          withdrawnNum: 0   //已撤回
        },
        oldTime: '',  //状态 1day：当天，3day：3天内，7day：7天内，all ：不限  默认是不限
      }
    },
    components: {
      yqzjHead,
      yqzjFooter,
      pubpaging,
      workNav
    },
    methods: {
      setSubNav(navData){
        this.subNavData = navData[0];
      },
      //处理不能选择今天之后的时间
      beginDate(){
        let _this = this;
        return {
          disabledDate(time){
            return time.getTime() > Date.now();//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      },
      //处理不能选择今天之后的时间
      processDate(){
        let _this = this;
        return {
          disabledDate(time){
            if (_this.dataParameter.sTime) {
              return new Date(_this.dataParameter.sTime).getTime() > time.getTime() || time.getTime() > Date.now();
            } else {
              return time.getTime() > Date.now();//开始时间不选时，结束时间最大值小于等于当天
            }
          }
        }
      },
      searchTime(s){
        this.searchState = s;  //添加hover态
        if(s == '0'){   //上报时间
          this.showTime = true;
          this.showDate = false;
          this.showMediaType = false;
          this.showDimension = false;
          this.oldTime = this.dataParameter.time;//解决选择自定义时间出现的bug
        }else if(s == '1'){ //媒体类型
          this.showTime = false;
          this.showMediaType = true;
          this.showDimension = false;
        }else if(s == '2'){ //舆情分类
          this.showTime = false;
          this.showMediaType = false;
          this.showDimension = true;
        }
      },
      //设置上报时间
      setTime(time, wz){
        this.dataParameter.time = time;
        this.dataParameter.sTime = ''; //解决选择自定义时间出现的bug
        this.dataParameter.eTime = ''; //解决选择自定义时间出现的bug
        this.timeWz = wz;
        this.getData();
        this.showTime = false;
        this.dataHover = false;
        this.searchState = ''; //重置hover态
        this.oldTime = this.dataParameter.time; //解决切换tab时，上报时间展示
      },
      //设置媒体类型
      setMediaRange(type, wz){
        this.dataParameter.mediaType = type;
        this.mediaTypeWz = wz;
        this.getData();
        this.showMediaType = false;
        this.searchState = ''; //重置hover态
      },
      //设置舆情分类
      setSentimentRange(type, wz){
        this.dataParameter.dimension = type;
        this.dimensionWz = wz;
        this.getData();
        this.showDimension = false;
        this.searchState = ''; //重置hover态
      },
      setNav(s) {
        //状态切换
        this.dataParameter.status = s;
        //解决切换tab时，上报时间展示
        if(this.oldTime == ''){
          this.dataParameter.time = 'all';
        }else{
          this.dataParameter.time = this.oldTime;
        }
        this.getData();
      },
      sTimeChange(){
        let _this = this;
        let startTime = _this.chooseSTime;
        let endTime = _this.chooseETime;
        if (startTime == '') {
          _this.$message({
            type: 'error',
            customClass: 'ele_ui_tips_position',
            message: '请选择开始时间！'
          });
        } else if (startTime != '' && endTime != '') {
          if (startTime > endTime) {
            _this.$message({
              type: 'error',
              customClass: 'ele_ui_tips_position',
              message: '开始时间不能大于结束时间！'
            });
            _this.chooseSTime = '';
            _this.chooseETime = '';
          } else {
            _this.dataParameter.time = '';
            _this.dataParameter.sTime = startTime;
            _this.dataParameter.eTime = endTime;
            _this.timeWz = startTime + ' 至 ' +endTime;
            _this.getData();
            _this.showTime = false;
            //查询完之后清空之间的时间
            _this.chooseSTime = '';
            _this.chooseETime = '';
            _this.searchState = ''; //重置hover态
          }
        }
      },
      eTimeChange(){
        let _this = this;
        let startTime = _this.chooseSTime;
        let endTime = _this.chooseETime;
        if (endTime == '') {
          _this.$message({
            type: 'error',
            customClass: 'ele_ui_tips_position',
            message: '请选择结束时时间！'
          });
        } else if (startTime != '' && endTime != '') {
          if (startTime > endTime) {
            _this.$message({
              type: 'error',
              customClass: 'ele_ui_tips_position',
              message: '开始时间不能大于结束时间！'
            });
            _this.chooseSTime = '';
            _this.chooseETime = '';
          } else {
            _this.dataParameter.time = '';
            _this.dataParameter.sTime = startTime;
            _this.dataParameter.eTime = endTime;
            _this.timeWz = startTime + ' 至 ' +endTime;
            _this.getData();
            _this.showTime = false;
            //查询完之后清空之间的时间
            _this.chooseSTime = '';
            _this.chooseETime = '';
            _this.searchState = ''; //重置hover态
          }
        }
      },
      //删除
      delInfo(id){
        let _this = this;
        let data = {
          reportId: id,
          groupId: this.$store.state.generalGroupId
        };
        _this.$confirm('确认删除该条信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false
        }).then(() => {
          deleteBuiltData(data).then(function (res) {
            if (res.data.status == '0') {
              _this.$message({
                type: 'success',
                customClass: 'ele_ui_tips_position',
                message: '删除成功!'
              });
              //删除时，状态值的数值变化
              _this.statusCount.withdrawnNum = _this.statusCount.withdrawnNum -1;
              _this.getData();
            } else {
              _this.$message({
                type: 'error',
                customClass: 'ele_ui_tips_position',
                message: '删除失败!'
              });
            }
          }).catch(err => {
            _this.$message({
              type: 'error',
              customClass: 'ele_ui_tips_position',
              message: '请求失败！'
            });
          });
        }).catch(() => {
        });
      },
      //撤回
      revocations(id){
        let _this = this;
        let data = {
          reportId: id,
          groupId: this.$store.state.generalGroupId
        };
        _this.$confirm('确认撤回该条报送信息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false
        }).then(() => {
          withdrawBuiltData(data).then(function (res) {
            if (res.data.status == '0') {
              _this.$message({
                type: 'success',
                customClass: 'ele_ui_tips_position',
                message: '撤回成功!'
              });
              //撤回时，状态值的数值变化
              _this.statusCount.unapprovedNum = _this.statusCount.unapprovedNum -1;
              _this.statusCount.withdrawnNum = _this.statusCount.withdrawnNum +1;
              _this.dataParameter.status = 3;//定位到已撤回tab页
              _this.getData();
            } else {
              _this.$message({
                type: 'error',
                customClass: 'ele_ui_tips_position',
                message: '撤回失败！'
              });
            }
          }).catch(err => {
            _this.$message({
              type: 'error',
              customClass: 'ele_ui_tips_position',
              message: '请求失败！'
            });
          });
        }).catch(() => {
        });
      },
      getData: function () {
        var _this = this;
        //获取舆情报送
        getWorkBenchData(_this.dataParameter).then(function (res) {
          if (res.data.result) {
            _this.listData = res.data.result.data || [];
            _this.total = res.data.result.total;  //总条数
            _this.pages = Math.ceil(res.data.result.total / res.data.result.pageSize);      //页数
          } else {
            _this.listData = [];
            _this.pages = 0;
          }
          _this.status = _this.dataParameter.status || '0';
        }).catch(err => {
          console.log(err, '请求失败！');
        });
      },
      msgListView(curPage){
        //分页
        this.dataParameter.pageNum = curPage;
        this.getData();
      },
      alertInfo(){
        this.$message({
          message: '此功能正在开发中,请耐心等待...',
          type: 'warning'
        });
      },
      handleBodyClick(){
        this.showTime = false;
        this.showMediaType = false;
        this.showDimension = false;
        this.dataHover = false; //处理点击其他按时间选择时引起的问题
        this.chooseSTime = '';
        this.chooseETime = '';
        this.searchState = ''; //重置hover态
        //处理点击其他按时间选择时，又点击自定义时间，自定义没有设置，直接点击空白处的问题
        if(this.dataParameter.sTime != '' || this.dataParameter.eTime != ''){
          this.dataParameter.time = '';
          this.dataHover = true;
        }else{
          this.dataParameter.time = this.oldTime; //解决选择自定义时间出现的bug
          this.dataHover = false;
        }
      },
      selectDate(){
        this.oldTime = this.dataParameter.time; //处理点击其他按时间选择时引起的问题
        this.dataParameter.time = '';
        this.showDate = true;
        this.dataHover = true;
      },
      //数据列表 —— 数据状态统计数字
      getStatusCountData(){
        var _this = this;
        let data = {
          groupId: this.$store.state.generalGroupId,
          orgId: this.$store.state.orgId,
          type: ''   //舆情报送 传空值
        };
        //获取舆情报送
        getStatusCount(data).then(function (res) {
          //0未审批，1已通过，2未通过, 3撤回
          if(res.data.result){
            let result = res.data.result.data;
            if(result.length > 0){
              for(let i in result){
                if(result[i].status == '0' || result[i].status == 0){
                  _this.statusCount.unapprovedNum = result[i].count;
                }else if(result[i].status == '1' || result[i].status == 1){
                  _this.statusCount.passedNum = result[i].count;
                }else if(result[i].status == '2' || result[i].status == 2){
                  _this.statusCount.unpassedNum = result[i].count;
                }else if(result[i].status == '3' || result[i].status == 3){
                  _this.statusCount.withdrawnNum = result[i].count;
                }
              }
            }
          }else{
            console.log('返回结果为空！');
          }
        }).catch(err => {
          console.log(err, '请求失败！');
        });
      },
      //获取处置建议、媒体类型、舆情分类列表
      getThreeData(){
        let _this = this;
        let parms = {
          groupId: this.$store.state.generalGroupId
        }
        //获取处置建议、媒体类型、舆情分类列表
        getAllTypeData(parms).then(function (res) {
          if(res.data.status == '0'){
            let resData = res.data.result.data || [];
            let mediaTypeData = [],sentimentTypeData = [],disposeProposalData = [];
            if(resData.length > 0){
              for(let i in resData){
                if(resData[i].dict_type == 'messageType'){ //舆情分类
                    sentimentTypeData.push(resData[i].dict_value);
                }else if(resData[i].dict_type == 'disposeProposal'){ //处置建议
                    disposeProposalData.push(resData[i].dict_value);
                }else if(resData[i].sourceTypeList != '' || resData[i].sourceTypeList != undefined){ //媒体类型
                   mediaTypeData = resData[i].sourceTypeList;
                }
              }
              _this.mediaTypeArr = mediaTypeData;
              if(sentimentTypeData.length > 0){
                _this.sentimentTypeArr = JSON.parse(sentimentTypeData);
              }else{
                _this.sentimentTypeArr = [];
                _this.$message({
                  type: 'error',
                  customClass: 'ele_ui_tips_position',
                  message: '请去设置舆情分类'
                });
              }
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
      }
    },
    mounted (){
      let username = this.$store.state.userinfo_name;
      let account = this.$store.state.account.substr(7,4);
      Watermark.set(username+"  "+account);
      this.getData();
      // this.getStatusCountData();
      //获取处置建议、媒体类型、舆情分类列表
      this.getThreeData();
      document.addEventListener('click', this.handleBodyClick);
    },
    destroyed () {
      document.removeEventListener('click', this.handleBodyClick)
    },
    watch: { //深度 watcher 监听状态值的变化
      unapprovedNum(val, oldVal){
        console.log("this.statusCount.unapprovedNum: "+val, oldVal);
      },
      passedNum(val, oldVal){
        console.log("this.statusCount.passedNum "+val, oldVal);
      },
      unpassedNum(val, oldVal){
        console.log("this.statusCount.unpassedNum "+val, oldVal);
      },
      withdrawnNum(val, oldVal){
        console.log("this.statusCount.withdrawnNum "+val, oldVal);
      }
    },
    computed: {
      unapprovedNum() {
  　　　　return this.statusCount.unapprovedNum;
  　　},
      passedNum() {
  　　　　return this.statusCount.passedNum;
  　　},
      unpassedNum() {
  　　　　return this.statusCount.unpassedNum;
  　　},
      withdrawnNum() {
  　　　　return this.statusCount.withdrawnNum;
  　　}
    }
  }
</script>
<style lang="less">
  @import "../../style/workbenchnew.css";
</style>
