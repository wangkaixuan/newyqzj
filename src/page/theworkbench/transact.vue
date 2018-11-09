<template>
  <div class="wary_workbench">
    <yqzj-Head @setSecondNav="setSubNav" funName="工作台" subname="抄送办理"></yqzj-Head>
    <!-- <work-nav :subNavData="subNavData" navName='舆情报送'></work-nav> -->
    <div class="center border_box">
      <div class="built_top">
        <div class="classification clearfix_workbench border_box">
          <div class="nav_button border_box hover" >抄送办理</div>
        </div>
        <div class="workbench_title">
          <a href="javascript:void(0)" :class="{hover:dataParameter.status == '1'}" @click="setNav('1')">未批示<span class="num" v-if="statusCount.uncommentNum > 0">{{statusCount.uncommentNum}}</span></a>
          <a href="javascript:void(0)" :class="{hover:dataParameter.status == '2'}" @click="setNav('2')">已批示<span class="num" v-if="statusCount.commentNum > 0">{{statusCount.commentNum}}</span></a>
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
              <span class="work_date_title">舆情分类</span><span class="hover">{{dimensionWz}}</span><i class="arrow"></i><span  class="line" v-if="status == '1'">|</span>
            </li>
            <li class="s_time border_box" :class="{hover:searchState == '3'}" @click.stop="searchTime('3')" v-if="status == '1'">
              <span class="work_date_title">浏览范围</span><span class="hover">{{rangeWz}}</span><i class="arrow"></i>
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
            <a href="javascript:void(0)" :class="{hover:dataParameter.dimensionType === ''}"
               @click.stop="setSentimentRange('','全部')">全部</a>
            <a href="javascript:void(0)" v-for="(item,i) in sentimentTypeArr" :value="item.type" :class="{hover:dataParameter.dimensionType === item.type}" @click.stop="setSentimentRange(item.type,item.name)">{{item.name}}</a>
          </div>
          <!-- 浏览范围 -->
          <div class="searchTimeWary border_box" v-show="showRange" @click.stop="">
            <a href="javascript:void(0)" :class="{hover:dataParameter.isRead == 0}"
               @click.stop="setRange(0,'全部')">全部</a>
            <a href="javascript:void(0)" :class="{hover:dataParameter.isRead == 1}"
               @click.stop="setRange(1,'已读')">已读</a>
            <a href="javascript:void(0)" :class="{hover:dataParameter.isRead == 2}"
               @click.stop="setRange(2,'未读')">未读</a>
          </div>
          <!--/维度-不限/重要性-不限/涉事地域-不限-->
          <!-- <div class="search_info">上报时间 - {{timeWz}}</div> -->
        </div>
      </div>
      <div class="built_center">
        <label><input type="checkbox" name="allWork"> 全部</label>
        <div class="work_botton clearfix_workbench">
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
                  <router-link tag="a" :to="{path: 'seebuilt', query: {id: list.reportId,from: 'transact'}}" target="_blank" @click.native="markedRead(list)">{{list.title}} <span class="hasreaded" v-if="list.status > 0 && status == '1'"><img src="../../assets/browse/push_yiyue.gif"></span></router-link>
                </div>
                <div class="jb_info">
                  <p><span>上报时间</span> {{list.createTime}}</p>
                  <!--<p><span>涉事地域</span> 北京-海淀</p>-->
                  <p><span>报送人</span> {{list.createUser}}</p>
                </div>
              </div>
              <!--操作-->
              <div class="info_cz">
                <router-link tag="a" :to="{path: 'seebuilt', query: {id: list.reportId,from: 'transact'}}" target="_blank" @click.native="markedRead(list)">查看 </router-link>
                <router-link tag="a" :to="{path: 'seebuilt', query: {id: list.reportId,from: 'transact',flag: 'comment'}}" @click.native="markedRead(list)">批示 </router-link>
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
  import {getTransactData,getStatusCount,markRead,getAllTypeData} from '../../service/built'

  export default{
    data() {
      return {
        status: '0',                    //0未评论，1已评论
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
        timeWz: '不限',                //搜索时间文字  默认是不限
        chooseSTime: '',         			  //开始时间
        chooseETime: '',         			  //结束时间
        dataParameter: {
          groupId: this.$store.state.generalGroupId,          //集团ID
          orgId: this.$store.state.orgId,                     //机构ID
          pageSize: '10',                  //每页条数
          pageNum: 1,                      //当前页数
          status: '1',                     //状态  1未评论，2已评论
          time: 'all',                     //状态 1day：当天，3day：3天内，7day：7天内，all ：不限  默认是不限
          sTime: '',                       //开始时间
          eTime: '',                       //结束时间
          mediaType: '',                   //媒体类型  '' 为全部
          dimensionType: '',               //舆情分类  '' 为全部
          isRead: 0,                       //0全部  1已读 ， 2未读
        },
        listData: [],
        subNavData: [],                       //子集导航
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        searchState: '', //设置点击哪个筛选 0 上报时间 1媒体类型 2 舆情分类
        oldTime: '',     //状态 1day：当天，3day：3天内，7day：7天内，all ：不限  默认是不限
        statusCount: {      //状态值的个数
          uncommentNum: 0, //未评论
          commentNum: 0,     //已评论
        },
        showRange: false,    //是否显示浏览范围
        rangeWz: '全部',      //搜索时间文字  默认是不限
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
          this.showRange = false;
          this.oldTime = this.dataParameter.time;//解决选择自定义时间出现的bug
        }else if(s == '1'){ //媒体类型
          this.showTime = false;
          this.showMediaType = true;
          this.showDimension = false;
          this.showRange = false;
        }else if(s == '2'){ //舆情分类
          this.showTime = false;
          this.showMediaType = false;
          this.showDimension = true;
          this.showRange = false;
        }else if(s == '3'){  //浏览范围
          this.showTime = false;
          this.showMediaType = false;
          this.showDimension = false;
          this.showRange = true;
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
        this.dataParameter.dimensionType = type;
        this.dimensionWz = wz;
        this.getData();
        this.showDimension = false;
        this.searchState = ''; //重置hover态
      },
      //设置浏览范围
      setRange(s, wz){
        this.dataParameter.isRead = s;
        this.rangeWz = wz;
        this.getData();
        this.showRange = false;
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
      getData: function () {
        var _this = this;
        //获取抄送列表数据
        getTransactData(_this.dataParameter).then(function (res) {
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
        this.showRange = false;
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
      //标记已读
      markedRead(item){
        let _this = this;
        let data = {
          reportId: parseInt(item.reportId),               //主键
          groupId: _this.$store.state.generalGroupId,      //集团ID
        }
        if(item.status == 0){
          item.status = 1; //标记已读
          markRead(data).then(function (res) {
            if(res.data.status == '0'){
              if(res.data.result.data >= 1){
                console.log('标记已读成功');
              }else{
                console.log('标记已读失败');
              }
            }else{
              console.log('标记已读失败');
            }
          }).catch(err=>{
            console.log(err,'请求失败！');
          });
        }
      },
      //数据列表 —— 数据状态统计数字
      getStatusCountData(){
        var _this = this;
        let data = {
          groupId: this.$store.state.generalGroupId,
          orgId: this.$store.state.orgId,
          type: 'transact'   //舆情报送 传空值
        };

        getStatusCount(data).then(function (res) {
          //1未评论，2已评论
          if(res.data.result){
            let result = res.data.result.data;
            if(result.length > 0){
              for(let i in result){
                if(result[i].status == '1' || result[i].status == 0){
                  _this.statusCount.uncommentNum = result[i].count;
                }else if(result[i].status == '2' || result[i].status == 1){
                  _this.statusCount.commentNum = result[i].count;
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
      //获取处置建议、媒体类型、舆情分类列表
      this.getThreeData();
      document.addEventListener('click', this.handleBodyClick);
    },
    destroyed () {
      document.removeEventListener('click', this.handleBodyClick)
    }
  }
</script>
<style lang="less">
  @import "../../style/workbenchnew.css";
</style>
