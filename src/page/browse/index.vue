<template>
  <div class="wrap">
    <yqzj-Head @setSecondNav="setSubNav" funName="舆情监测" @isHasPower="getPower"></yqzj-Head>
    <div class="second_nav clearfix_browse">
      <ul class="ul_nav">
        <li v-for="snd in subNavData">
          <router-link tag="a" :to="{path: snd.funUrl}" :title="snd.funName" class="border_box"  :class="{hover:snd.funName=='舆情浏览'}" v-if="snd.funName == '舆情浏览'">{{snd.funName}}</router-link>
          <a :href="$store.state.oldyqzjUrl+snd.funUrl" :title="snd.funName" class="border_box" v-else>{{snd.funName}}</a>
        </li>
      </ul>
    </div>
    <div class="center">
      <browse-nav @getListInfo="getListInfo" :sid="sid"></browse-nav>
      <div class="center_content">
        <!--搜12索-->
        <div class="sx_top">
          <div class="top_one">
            <p>全部专题</p>
          </div>
          <!--<div class="top_three">-->
            <!--<div class="select" the-id="select_words" @click="showSearchWords">-->
              <!--<p>{{selectWords.selectedtxt}}<i></i></p>-->
            <!--</div>-->
            <!--<ul the-id="search_contation" v-show="selectWords.showWords">-->
              <!--<li v-for="item,i in selectWords.opts" v-bind:class="{ hover: item.isActive }" @click="selevtOpts(item)">-->
                <!--{{item.content}}-->
              <!--</li>-->
            <!--</ul>-->
            <!--<input type="text" name="message" value="" attr="special">-->
            <!--<button class="searchbtn"></button>-->
          <!--</div>-->
        </div>
        <!--搜索条件上-->
        <div the-id="search_criteria">
          <search @getListInfo="getListInfo" @setAccurateInfo="setAccurateInfo" :inquireParameter="inquireParameter"></search>
        </div>
        <!-- <div the-id="browse_tab_content"> -->
        <div class="content_list">
          <div class="often_update">在这里添加时时更新提示</div>
          <!--信息列表-->
          <div class="message_list">
            <div v-if="listData != '' ">
              <ul >
                <li v-for="item,i in listData">
                  <div class="all_checkbox">
                    <label>
                      <input type="checkbox" class="input_checkbox" id="item.kvUuid" kruuid="item.krUuid"
                             keywordid="item.krKeywordid"/>
                    </label>
                  </div>
                  <div class="photo" v-if="item.kvIspic != 0 ">
                    <img :src="item.kvImgurl"/>
                  </div>
                  <div class="new_data" v-bind:class="[item.kvIspic != 0 ? 'content_right' : 'main_content']">
                    <!--标题-->
                    <div class="top_message">
                      <div class="title_text">
                        <div class="title">
                          <div v-if="item.orientation == 1" class="icon zheng"></div>
                          <div v-else-if="item.orientation == 2" class="icon fu"></div>
                          <div v-else class="icon zhong"></div>
                          <!-- 我的专题 有 已读设置功能 -->
                          <router-link tag="a"
                                       :to="{path: 'infoDetail', query: { krUuid : item.krUuid, msUserId : $store.state.msUserId , shareMsUserId: inquireParameter.shareMsUserId,isrepeat: inquireParameter.isRepeat,kvUrl: item.kvUrl,kvSimhash: item.kvSimhash}}"
                                       target="_blank" v-html="i+1+'.'+item.kvTitleMakeRed" @click.native="markedRead(item)" :class="[item.isread == 1 ? 'visited': '']" v-if="inquireParameter.msUserId == inquireParameter.shareMsUserId"></router-link>
                          <!-- 授权专题 无 已读设置功能 -->
                          <router-link tag="a"
                                       :to="{path: 'infoDetail', query: { krUuid : item.krUuid, msUserId : $store.state.msUserId , shareMsUserId: inquireParameter.shareMsUserId,isrepeat: inquireParameter.isRepeat,kvUrl: item.kvUrl,kvSimhash: item.kvSimhash}}"
                                       target="_blank" v-html="i+1+'.'+item.kvTitleMakeRed" :class="[item.isread == 1 ? 'visited': '']" v-else></router-link>
                        </div>
                      </div>
                      <div class="pic article_title">
                        <span class="identical" v-if="item.kvHot != 0"><em>{{item.kvHot}}</em>条</span>
                        <span class="yiyue" v-if="item.isread == 1"><img src="../../assets/browse/push_yiyue.gif"></span>
                        <!-- <span class="yiyujing"><img src="../../assets/browse/ggwarning.png"></span>
                        <span class="yiyujing"><img src="../../assets/browse/sdwarning.png"></span>
                        <span class="yiyujing"><img src="../../assets/browse/ztwarning.png"></span>
                        <span class="tuisong"><img src="../../assets/browse/push_tuisong_c.png"></span> -->
                      </div>
                    </div>
                    <!--摘要  isread -->
                    <div class="list_message" v-bind:class="[item.isread == 1 ? 'isread' : '']"
                         v-html="item.kvAbstractMakeRed"></div>
                    <!--时间作者来源关键词 小图片-->
                    <div class="url_wrap">
                      <div class="address">
                        <em>{{item.krCtime}}</em>
                        <!--头像-->
                        <em class="weibo_photo" v-if="item.kvWbauthorpic != '' ">
                          <!-- <a href="www.baidu.com" target="_blank"><img :src="item.kvWbauthorpic"></a> -->
                          <img :src="item.kvWbauthorpic">
                        </em>
                        <em class="weibo_photo" v-else>
                          <img src="../../assets/browse/noIdimg.png">
                        </em>
                        <!--名称-->
                        <em class="weibo_uname" :title="item.kvAuthor" :domain="item.kvDomain"
                            v-if="item.kvAuthor  != '' ">{{item.kvAuthor}}</em>
                        <!--来源-->
                        <em class="source_form"><a :href="item.kvUrl" class="viewMore" target="_blank" :uuid="item.kvUuid"
                                                   :sid="item.krKeywordid" :title="item.kvWebname">{{item.kvWebname}}</a></em>
                        <!--关键词-->
                        <em class="keywords"><i :title="item.kvKeyword">{{item.kvKeyword}}</i></em>
                        <!--标签--> <!--  -->
                        <em class="tags" v-if="item.kvExtendField != '' ">
                          <i v-for="list,j in JSON.parse(item.kvExtendField).tags" :title="list.industry">{{list.industry}}</i>
                        </em>
                      </div>
                      <!--一堆图标-->
                      <ul class="pic_list">
                        <!--删除-->
                        <li class="li6" v-if="$store.state.msUserId == item.krUid">
                          <a href="javascript:void(0)" class="kongshi" title="删除" @click="delList(item)"></a>
                        </li>
                        <!--正负中-->
                        <li class="li5" title="倾向性修改">
                          <div the-id="updateinfozt">
                            <p v-for="item,i in modifyTendency.opts" v-bind:class="{hover: item.isActive}"
                               :orientation="item.orientation" :title="item.title" @click="changeTendency(item)">
                              {{item.content}}</p>
                          </div>
                        </li>
                        <!--加入预警-->
                        <li class="li4" title="加入预警"></li>
                        <!--加入关注-->
                        <li class="li3" title="加入关注"></li>
                        <!--上报信息-->
                        <li class="li2">
                          <!-- <a href="javascript:void(0)" class="kongshi" title="上报信息" deleleflag></a> -->
                          <router-link  tag="a" :to="{path: 'newbuiltdelivery', query: {from: 'workbench',title: item.kvTitle,url: item.kvUrl, mediatype: item.kvSourcetype, source: item.kvWebname,time: item.krCtime,summary:item.kvAbstract }}" class="kongshi" title="上报信息" target="_blank" v-if="isHasBuiltPower"></router-link>
                          <a href="javascript:void(0)" class="kongshi" title="上报信息" v-else @click="promptUser"></a>
                        </li>
                        <!-- url查询 -->
                        <li class="urlsearch nobjimg">
                          <a target="_blank"
                             href="http://ispider.istarshine.com/urlSearchBeta/msMain?search=http%3A%2F%2Fweibo.com%2F1010075537%2FGtRc4j0tB&amp;uid=244"
                             class="kongshi" title="url查询"></a>
                        </li>
                        <!--复制信息-->
                        <li class="li1">
                          <a href="javascript:void(0)" class="copy_infomation" title="复制信息" place="舆情浏览-复制信息" info=""></a>
                          <div style="display:none;">【舆情报告】 2018-08-09 17:37:50　落伍者-新站长杂谈栏网民“menghua” 发布“30亿美元后
                            拼多多亟待脱胎换骨”　截止到目前该消息评论：0 转发：9　http://www.im286.net/thread-21056040-1.html
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="clear"></div><!-- 处理此页面引用分页组件引起的问题，不可删除 -->
              <!-- 分页 -->
              <pubpaging :pages="pages" :current.sync="borwseListData.pageNum" @navpage="clickPage"
                     v-show="listData != ''"></pubpaging>
            </div>
            <!--无数据-->
            <div v-else class="nodata">
              <div class="noData noDataBreowe">
                <img src="../../images/nodata.png">
                <p>暂无数据</p>
              </div>
            </div>
            <div class="masker" v-show="isLoading">
              <div><img src="../../assets/browse/download.gif"/>
                <p>加载中...</p></div>
            </div>
          </div>
          <operation-bar></operation-bar>
        </div>
        <!-- </div> -->
      </div>
      <div class="clear"></div>
    </div>
    <yqzj-Footer></yqzj-Footer>
  </div>
</template>
<script>
  import yqzjHead from '../../components/header.vue'
  import yqzjFooter from '../../components/footer.vue'
  import browseNav from '../../components/browseNav.vue'
  import search from './search.vue'
  import operationBar from './operationBar.vue'
  import pubpaging from '../../components/pagination.vue'
  import {getBrowseList,delBrowseList,markRead} from '../../service/browse'

  export default {
    data() {
      return {
        //搜索
        selectWords: {
          selectedtxt: '全文',
          showWords: false,
          opts: [
            {
              content: '全文',
              isActive: true
            }, {
              content: '标题',
              isActive: false
            }, {
              content: '来源',
              isActive: false
            }, {
              content: '作者',
              isActive: false
            }
          ]
        },
        //修改倾向性
        modifyTendency: {
          opts: [
            {
              content: '正',
              isActive: true,
              orientation: 1,
              title: '标为正面'
            }, {
              content: '负',
              isActive: false,
              orientation: 2,
              title: '标为负面'
            }, {
              content: '中',
              isActive: false,
              orientation: 3,
              title: '标为中性'
            }
          ]
        },
        pages: 1,             //总页数
        //列表数据
        listData: [],        //列表数据
        borwseListData: {
          pageNum: 1,      //当前页数
          pageSize: 10,    //每页条数 默认10条，30 , 50 , 100
          total: 0         //总条数
        },
        isLoading: false,    //是否显示加载的遮罩层
        subNavData: [],       //子集导航
        inquireParameter: {
          pageNum: '1',                 //一页多条
          pageSize: '10',                 //当前页数
          kkIdList: '',                 //专题ID
          startTime: '',                //开始时间
          endTime: '',                //结束时间
          orientationList: '',                //倾向性  1 2 3
          kvSourcetypeList: '',               //媒体类型
          wechatInfoTypeList: '',               //微博类型  原发1 回复并转发3 仅转发2
          timeType: '',                //时间类型  day   sevenDays  customDay
          region: '',                //信源地域   传最后一个  选市传市  否则传省
          infoSourceLevelList: '',                //信源分级
          isread: '-1',                 //浏览范围  -1全部 1已读 0 未读
          isRepeat: '1',                //1 去重 0 不去重
          krState: '1',                //噪音过滤  1 正常 x过滤 jing 精准  全部xx
          kvTitlematch: '',                //标题是否匹配  匹配全部''  仅匹配标题1
          kvOnlylocal: '',                //是否唯一地域   关闭'' 开启1
          kvMustwordminindex: '',                //位置
          kvKeywordsminindex: '',                //词距范围
          kvWeiboovertime: '',                //微博时间过滤
          kvWeibosignlocalnoise: '',                //忽略微博位置信息中的关键词
          kvWeibotopicnoise: '',                //忽略微博话题信息中的关键词
          kvWeiboatnoise: '',                //忽略微博@信息中的关键词
          msUserId: '',     //msUserId
          shareMsUserId: '',     //shareMsUserId
        },
        sid: '',  //处理从详情页跳转到舆情列表页定位问题
        isHasBuiltPower: false, //是否有上报权限
      }
    },
    components: {
      yqzjHead,
      yqzjFooter,
      browseNav,
      search,
      operationBar,
      pubpaging
    },
    methods: {
      //是否显示搜索框条件
      showSearchWords(e) {
        e.stopPropagation();
        this.selectWords.showWords = true;
      },
      //搜索框条件选择
      selevtOpts(item) {
        console.log(item);
        this.selectWords.selectedtxt = item.content;
        for (var i in this.selectWords.opts) {
          this.selectWords.opts[i].isActive = false;
        }
        item.isActive = true;
        this.selectWords.showWords = false;
      },
      //修改倾向性
      changeTendency(item) {
        console.log(item);
        for (var i in this.modifyTendency.opts) {
          this.modifyTendency.opts[i].isActive = false;
        }
        item.isActive = true;
      },
      //是否显示加载的遮罩层
      hideLays() {
        this.isLoading = true;
      },
      //查询数据
      queryData(){
        let _this = this;
        //获取舆情浏览列表数据
        getBrowseList(_this.inquireParameter, _this.hideLays).then(function (res) {
          console.log('----------获取舆情浏览列表数据------------');
          console.log(res);
          if (res.data.result.data) {
            _this.listData = res.data.result.data;
            _this.borwseListData.total = res.data.result.total;
            _this.pages = Math.ceil(res.data.result.total / res.data.result.pageSize);      //总页数
            // _this.keypage = parseInt(_this.borwseListData.pageNum-1+'0');
            _this.isLoading = false;
            document.documentElement.scrollTop = 0; //针对分页，每次刷新完数据回到页面顶部
          } else {
            _this.listData = [];
            _this.pages = 0;                                                //页数
            // _this.keypage = 0;
            _this.isLoading = false;
          }

        }).catch(err => {
          console.log(err, '请求失败！');
        });
      },
      //首次进入页面查询的数据
      firstComeIn(){
        let _this = this;
        let query = _this.$route.query;  //获取链接 ？ 之后的参数
        _this.sid = query.sid || '';
        _this.inquireParameter.orgId = _this.$store.state.orgId;  //集团id
        _this.inquireParameter.msUserId = _this.$store.state.msUserId;  //秘书ID
        _this.inquireParameter.shareMsUserId = _this.$store.state.msUserId;  //分享ID
        //处理从授权专题的详情页跳转到列表页加载不出数据的问题
        if(query.shareMsUserId != undefined){
          _this.inquireParameter.shareMsUserId = query.shareMsUserId;
        }
        _this.inquireParameter.kkIdList = _this.sid || '';  //分类ID
        console.log(_this.inquireParameter.kkIdList)
        _this.queryData();
      },
      //分页
      clickPage(curPage) {
        //分页组件跳转
        this.borwseListData.pageNum = curPage;
        this.inquireParameter.pageNum = curPage;
        this.queryData();
      },
      setSubNav(navData){
        console.log('-----------------');
        console.log(navData);
        this.subNavData = navData[0];
      },
      getListInfo(para){
        //筛选   keys查询的键值   content 内容;
        console.log(para);
        if (para.startTime && para.endTime) {
          this.inquireParameter.startTime = para.startTime;
          this.inquireParameter.endTime = para.endTime;
        } else {
          this.inquireParameter[para.keys] = para.content;
        }
        if (para.shareMsUserId) {
          this.inquireParameter.shareMsUserId = para.shareMsUserId;
        }
        this.borwseListData.pageNum = 1;
        this.inquireParameter.pageNum = 1;
        if(para.isClick){
            this.sid = '';
        }
        this.queryData();
      },
      //删除列表数据
      delList(item){
        let _this = this;
        let isrepeat = _this.inquireParameter.isRepeat; //1 去重 0 不去重
        let data = {};
        if(isrepeat == '0'){
          data = {
            msUserId: item.krUid,
            shareMsUserId: item.krUid,
            kvUrl: item.kvUrl,           //信息URL
          }
        }else{
          data = {
            msUserId: item.krUid,
            shareMsUserId: item.krUid,
            kvSimhash: item.kvSimhash    //信息HASH
          }
        }
        _this.$confirm('确认删除该条信息吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false
        }).then(() => {
          delBrowseList(data).then(function (res) {
            if(res.data.status == '0'){
              _this.$message({
                type: 'success',
                customClass: 'ele_ui_tips_position',
                message: '删除成功!'
              });
              _this.queryData();
            }else{
              _this.$message({
                type: 'error',
                customClass: 'ele_ui_tips_position',
                message: '删除失败！'
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
      setAccurateInfo(p){
        this.inquireParameter.kvTitlematch = p.kvTitlematch;
        this.inquireParameter.kvOnlylocal = p.kvOnlylocal;
        this.inquireParameter.kvMustwordminindex = p.kvMustwordminindex;
        this.inquireParameter.kvKeywordsminindex = p.kvKeywordsminindex;
        this.inquireParameter.kvWeiboovertime = p.kvWeiboovertime;
        this.inquireParameter.kvWeibosignlocalnoise = p.kvWeibosignlocalnoise;
        this.inquireParameter.kvWeibotopicnoise = p.kvWeibotopicnoise;
        this.inquireParameter.kvWeiboatnoise = p.kvWeiboatnoise;
        this.borwseListData.pageNum = 1;
        this.inquireParameter.pageNum = 1;
        this.queryData();
      },
      //标记已读
      markedRead(item){
        let _this = this;
        let isrepeat = _this.isRepeat; //1 去重 0 不去重
        let data = {};
        item.isread = 1;   //0未读  1已读
        if(isrepeat == '0'){
          data = {
            msUserId: item.krUid,
            shareMsUserId: item.krUid,
            kvUrl: item.kvUrl,           //信息URL
          }
        }else{
          data = {
            msUserId: item.krUid,
            shareMsUserId: item.krUid,
            kvSimhash: item.kvSimhash    //信息HASH
          }
        }
        markRead(data).then(function (res) {
          console.log('--------标记已读---------');
          console.log(res);
          if(res.data.result.data == 1){
            console.log('标记已读成功');
          }
        }).catch(err=>{
          console.log(err,'请求失败！');
        });
      },
      //是否有上报权限
      getPower(data){
        let _this = this;
        console.log('--------是否有上报权限---------');
        console.log(data);
        for(let i in data){
          if(data[i].funName == '工作台'){
            _this.isHasBuiltPower = true;
          }
        }
      },
      //针对没有上报权限的用户，提示用户找管理员开通
      promptUser(){
        this.$message({
          type: 'error',
          customClass: 'ele_ui_tips_position',
          duration: 5000,
          message: '您还没有功能权限，请找管理员开通吧！'
        });
      }
    },
    mounted (){
      //首次进入页面查询的数据
      this.firstComeIn();
    }
  }
</script>
<style>
  @import "../../style/browse.css";
</style>
<style lang="less">
.border_box{
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.second_nav {
  width: 100%;
  margin: 60px auto 15px;
  height: 55px;
  line-height: 55px;
  background-color: #fff;
  ul.ul_nav {
    display: block;
    width: 94%;
    margin: 0 auto;
    li {
      display: inline-block;
      a {
        height: 55px;
        display: inline-block;
        color: #999999;
        font-size: 14px;
        margin-right: 30px;
        &:hover,
        &.hover {
          color: #333333;
          border-bottom: 2px solid #333333;
        }
      }
    }
  }
}
</style>

