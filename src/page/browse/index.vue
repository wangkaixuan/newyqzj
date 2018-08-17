<template>
	<div class="wrap">
		<yqzj-Head></yqzj-Head>
		<div class="center">
			<browse-nav></browse-nav>
			<div class="center_content">
				<!--搜12索-->
                <div class="sx_top">
                    <div class="top_one">
                        <p>全部专题</p>
                    </div>
                    <div class="top_two">
                        <p the-id="browse_infolist" class="hover"><i></i>信息列表</p>
                        <p the-id="browse_tab"><i></i>统计分析</p>
                    </div>
                    <div class="top_three">
                        <div class="select" the-id="select_words" @click="showSearchWords">
                            <p>{{selectWords.selectedtxt}}<i></i></p>
                        </div>
                        <ul the-id="search_contation" v-show="selectWords.showWords">
                            <li v-for="item,i in selectWords.opts" v-bind:class="{ hover: item.isActive }" @click="selevtOpts(item)">{{item.content}}</li>
                        </ul>
                        <input type="text" name="message" value="" attr="special">
                        <button class="searchbtn"></button>
                    </div>
                </div>
                <!--搜索条件上-->
                <div the-id="search_criteria">
                	<search></search>
                </div>
                <!-- <div the-id="browse_tab_content"> -->
                    <div class="content_list">
                        <div class="often_update">在这里添加时时更新提示</div>
                        <!--信息列表-->
                        <div class="message_list">
                            <ul v-if="listData != '' ">
                                <li v-for="item,i in listData">
                                    <div class="all_checkbox">
                                        <label>
                                            <input type="checkbox" class="input_checkbox" id="item.kvUuid" kruuid="item.krUuid" keywordid="item.krKeywordid"/>
                                        </label>
                                    </div>
                                    <div class="photo" v-if="item.kvImgurl != '' ">
                                        <img src="item.kvImgurl" />
                                    </div>
                                    <div class="new_data" v-bind:class="[item.kvImgurl != ''  ? 'content_right' : 'main_content']">
                                        <!--标题-->
                                        <div class="top_message">
                                            <div class="title_text">
                                                <div class="title">
                                                    <div v-if="item.orientation == 1" class="icon zheng" ></div>
                                                    <div v-else-if="item.orientation == 2" class="icon fu" ></div>
                                                    <div v-else class="icon zhong" ></div>
                                                    <router-link  tag="a" :to="{path: 'infoDetail', query: { krUuid : item.krUuid, msUserId : $store.state.msUserId , shareMsUserId: $store.state.shareMsUserId}}" target="_blank">{{item.kvTitle}}</router-link>
                                                </div>
                                            </div>
                                            <div class="pic article_title">
                                                <span class="identical" v-if="item.kvHot != 0"><em>{{item.kvHot}}</em>条</span>
                                                <!-- <span class="yiyue" v-if="item.isread == 1"><img src="../../assets/browse/push_yiyue.gif"></span>
                                                <span class="yiyujing"><img src="../../assets/browse/ggwarning.png"></span>
                                                <span class="yiyujing"><img src="../../assets/browse/sdwarning.png"></span>
                                                <span class="yiyujing"><img src="../../assets/browse/ztwarning.png"></span>
                                                <span class="tuisong"><img src="../../assets/browse/push_tuisong_c.png"></span> -->
                                            </div>
                                        </div>
                                        <!--摘要  isread -->
                                        <div class="list_message" v-bind:class="[item.isread == 1 ? 'isread' : '']">{{item.kvAbstract}}</div>
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
                                                <em class="weibo_uname" :title="item.kvAuthor" :domain ="item.kvDomain" v-if="item.kvAuthor  != '' ">{{item.kvAuthor}}</em>
                                                <!--来源-->
                                                <em class="source_form"><a :href="item.kvUrl" class="viewMore" target="_blank" :uuid="item.kvUuid" :sid="item.krKeywordid" :title="item.kvWebname">{{item.kvWebname}}</a></em>
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
                                                <li class="li6">
                                                    <a href="javascript:void(0)" class="kongshi" title="删除" deleleflag="1" sid="item.krKeywordid" state="item.krState" deleteType="x" id="item.kvUuid" keywordid="item.krKeywordid" weiurl="item.kvUrl" domain="item.kvDomain" kvauthor="item.kvAuthor" site="item.kvWebname" v-if="item.kvHot != 0" havealike="1"></a>
                                                    <a href="javascript:void(0)" class="kongshi" title="删除" deleleflag="1" sid="item.krKeywordid" state="item.krState" deleteType="x" id="item.kvUuid" keywordid="item.krKeywordid" weiurl="item.kvUrl" domain="item.kvDomain" kvauthor="item.kvAuthor" site="item.kvWebname" v-else></a>
                                                </li>
                                                <!--正负中-->
                                                <li class="li5" title="倾向性修改">
                                                    <div the-id="updateinfozt">
                                                        <p v-for="item,i in modifyTendency.opts"v-bind:class="{hover: item.isActive}" :orientation="item.orientation" :title="item.title" @click="changeTendency(item)">{{item.content}}</p>
                                                    </div>
                                                </li>
                                                <!--加入预警-->
                                                <li class="li4" title="加入预警"></li>
                                                <!--加入关注-->
                                                <li class="li3" title="加入关注"></li>
                                                <!--上报信息-->
                                                <li class="li2">
                                                    <a href="javascript:void(0)" class="kongshi" title="上报信息" deleleflag></a>
                                                </li>
                                                <!-- url查询 -->
                                                <li class="urlsearch nobjimg">
                                                    <a target="_blank" href="http://ispider.istarshine.com/urlSearchBeta/msMain?search=http%3A%2F%2Fweibo.com%2F1010075537%2FGtRc4j0tB&amp;uid=244" class="kongshi" title="url查询"></a>
                                                </li>
                                                <!--复制信息-->
                                                <li class="li1">
                                                    <a href="javascript:void(0)" class="copy_infomation" title="复制信息" place="舆情浏览-复制信息" info=""></a>
                                                    <div style="display:none;">【舆情报告】 2018-08-09 17:37:50　落伍者-新站长杂谈栏网民“menghua” 发布“30亿美元后 拼多多亟待脱胎换骨”　截止到目前该消息评论：0 转发：9　http://www.im286.net/thread-21056040-1.html</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <!--无数据-->
                            <div v-else class="nodata">
                              <div class="noData noDataBreowe">
                                <img src="../../images/nodata.png">
                                <p>暂无数据</p>
                              </div>
                            </div>
                            <div class="clear"></div>
                            <div class="masker" v-show="isLoading">
                                <div><img src="../../assets/browse/download.gif"/><p>加载中...</p></div>
                            </div>
                        </div>
                        <div class="clear"></div><!-- 处理此页面引用分页组件引起的问题，不可删除 -->
                        <!-- 分页 -->
                        <pubpaging :pages="pages" :current.sync="borwseListData.pageNum" @navpage="clickPage" v-show="listData != ''"></pubpaging>
                        <!--操作条-->
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
import VueCookies from 'vue-cookies'
import pubpaging from '../../components/pagination.vue'
import {getBrowseList} from '../../service/browse'

export default {
	data() {
	    return {
            //搜索
	    	selectWords:{
	    		selectedtxt: '全文',
				showWords: false,
				opts: [
					{
						content: '全文',
						isActive: true
					},{
						content: '标题',
						isActive: false
					},{
						content: '来源',
						isActive: false
					},{
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
                    },{
                        content: '负',
                        isActive: false,
                        orientation: 2,
                        title: '标为负面'
                    },{
                        content: '中',
                        isActive: false,
                        orientation: 3,
                        title: '标为中性'
                    }
                ]
            },
            pages:1,             //页数
            //列表数据
            listData: [],        //列表数据
            borwseListData:{
                pageNum: 1,      //当前页数
                pageSize: 10,    //每页条数 默认10条，30 , 50 , 100
                total: 0         //总条数
            },
            isLoading: false,    //是否显示加载的遮罩层
	    }
    },
    components:{
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
    		for(var i in this.selectWords.opts){
    			this.selectWords.opts[i].isActive = false;
    		}
    		item.isActive = true;
    		this.selectWords.showWords = false;
    	},
        //修改倾向性
        changeTendency(item) {
            console.log(item);
            for(var i in this.modifyTendency.opts){
                this.modifyTendency.opts[i].isActive = false;
            }
            item.isActive = true;
        },
        //是否显示加载的遮罩层
        hideLays() { 
            this.isLoading = true;
        },
        //查询数据
        queryData(parms){
            let _this = this;
            //获取舆情浏览列表数据
            getBrowseList(parms,_this.hideLays).then(function (res) {
                console.log('----------获取舆情浏览列表数据------------');
                console.log(res);
                if(res.data.result.data){
                    _this.listData = res.data.result.data;
                    _this.borwseListData.pageNum = res.data.result.pageNum;
                    _this.borwseListData.pageSize = res.data.result.pageSize;
                    _this.borwseListData.total = res.data.result.total;
                    _this.pages =  Math.ceil(res.data.result.total/res.data.result.pageSize);      //页数
                    // _this.keypage = parseInt(_this.borwseListData.pageNum-1+'0');
                    _this.isLoading = false;
                }else{
                    _this.listData = [];
                    _this.pages = 0;                                                //页数
                    // _this.keypage = 0;
                }
               
            }).catch(err=>{
              console.log(err,'请求失败！');
            });
        },
        //首次进入页面查询的数据
        firstComeIn(){
            let _this = this;
            let parms = {
                orgId: this.$store.state.orgId,
                msUserId: this.$store.state.msUserId,
                shareMsUserId: this.$store.state.shareMsUserId
            };
            _this.queryData(parms);
        },
        //分页
        clickPage(curPage) {
            //分页组件跳转
            this.borwseListData.pageNum = curPage;
            this.getBrowseListInfo();
        },
        //分页请求数据
        getBrowseListInfo() {
            let _this = this;
            let parms = {
                orgId: this.$store.state.orgId,
                msUserId: this.$store.state.msUserId,
                shareMsUserId: this.$store.state.shareMsUserId
            };
            parms.pageNum = this.borwseListData.pageNum;
            parms.pageSize = this.borwseListData.pageSize;
            parms.total = this.borwseListData.total;
            _this.queryData(parms);
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