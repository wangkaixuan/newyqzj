<template>
	<div class="sx_wrap">
		<!--筛选条件-->
		<div class="sx_content">
			<ul the-id="search_condition">
				<!--时间-->
	            <li>
	                <a href="javascript:void(0)" v-bind:class="{hover: timetypeData.isActive}" @click.stop="timetype">
	                    <p>时间</p>
	                    <p>
	                        <em>全部</em>
	                        <i></i>
	                    </p>
	                    <span>|</span>
	                </a><!-- 当前选中hover -->
	            </li>
	            <!--倾向性-->
	            <li>
	                <a href="javascript:void(0)" v-bind:class="{hover: orientationtypeData.isActive}" @click.stop="orientationtype">
	                    <p>倾向性</p>
	                    <p>
	                        <em>全部</em>
	                        <i></i>
	                    </p>
	                    <span>|</span>
	                </a>
	            </li>
	            <!--媒体类型--> 
	            <li>
	                <a href="javascript:void(0)" v-bind:class="{hover: mediatypeData.isActive}" @click.stop="mediatype">
	                    <p>媒体类型</p>
	                    <p>
	                        <em></em>
	                        <i></i>
	                    </p>
	                    <span>|</span>
	                </a>
	            </li>
	            <!--微博类型-->
	            <li>
	                <a href="javascript:void(0)" v-bind:class="{hover: weibotypeData.isActive}" @click.stop="weibotype">
	                    <p>微博类型</p>
	                    <p>
	                        <em>全部</em>
	                        <i></i>
	                    </p>
	                    <span>|</span>
	                </a>
	            </li>
	            <!--信源分级-->
	            <li>
	                <a href="javascript:void(0)" v-bind:class="{hover: infoSourceLevelData.isActive}" @click.stop="infoSourceLevel">
	                    <p>信源分级</p>
	                    <p>
	                        <em>
	                            全部
	                        </em>
	                        <i></i>
	                    </p>
	                    <span>|</span>
	                </a>
	            </li>
	            <!--信源地域-->
	            <li>
	                <a href="javascript:void(0)" v-bind:class="{hover: infoSourceRegionData.isActive}" @click.stop="infoSourceRegion">
	                    <p>信源地域</p>
	                    <p>
	                        <em>全部</em>
	                        <i></i>
	                    </p>
	                    <span>|</span>
	                </a>
	            </li>
	            <!--噪音过滤-->
	            <li>
	                <a href="javascript:void(0)" v-bind:class="{hover: noiseFilterData.isActive}" @click.stop="noiseFilter">
	                    <p>噪音过滤</p>
	                    <p>
	                       <em>全部</em>
	                        <i></i>
	                    </p>
	                    <span>|</span>
	                </a>
	            </li>
	            <!--重复信息-->
	            <li>
	                <a href="javascript:void(0)" v-bind:class="{hover: repeatData.isActive}" @click.stop="repeat">
	                    <p>重复信息</p>
	                    <p>
	                        <em>不去重</em>
	                        <i></i>
	                    </p>
	                    <span>|</span>
	                </a>
	            </li>
	            <!--浏览范围-->
	            <li>
	                <a href="javascript:void(0)" v-bind:class="{hover: browseRangeData.isActive}" @click.stop="browseRange">
	                    <p>浏览范围</p>
	                    <p>
	                        <em>全部</em>
	                        <i></i>
	                    </p>
	                    <span>|</span>
	                </a>
	            </li>
	            <!--精准筛选-->
	            <li>
	                <a href="javascript:void(0)" v-bind:class="{hover: accurateFilterData.isActive}" @click.stop="accurateFilter">
	                    <p>精准筛选</p>
	                    <p>
	                        <em>关闭</em>
	                        <i></i>
	                    </p>
	                    <span>|</span>
	                </a>
	            </li>
	            <!--自定义筛选
	            <li>
	                <a href="javascript:void(0)" wrap="zdyscreen">
	                    <p style="width:76px">自定义筛选</p>
	                    <p>
	                        <em>全部</em>
	                        <i></i>
	                    </p>
	                    <span>|</span>
	                </a>
	            </li>-->
	            <!--标签-->
	            <li>
	                <a href="javascript:void(0)" v-bind:class="{hover: labelData.isActive}" @click.stop="label">
	                    <p>标签</p>
	                    <p>
	                        <em>全部</em>
	                        <i></i>
	                    </p>
	                    <span>|</span>
	                </a>
	            </li>
			</ul>
			<div class="sx_true">
	            <a href="javascript:void(0)" the-id="saveSearchbtn">保存筛选条件</a>
	        </div>
	        <!--时间-->
	        <div class="sx_pub" style="display: none; top: 43px;" v-show="timetypeData.showTimetype" @click.stop="noHide">
	            <ul>
	                <li>
	                    <span the-id="browseajsourcetype" time="" class="hover">全部</span>
	                </li>
	                <li>
	                    <span the-id="browseajsourcetype" time="day">当天</span>
	                </li>
	                <li>
	                    <span the-id="browseajsourcetype" time="week">近7天</span>
	                </li>
	                <li class="js_time">
	                    <span>自定义时间</span>
	                </li>
	                <div class="clear"></div>
	                <li class="timejs_input" style="">
	                    <input type="hidden" the-id="jasetime" site="" sid="" orientation="" state="xx" deletetype="x" tid="01" sourcetype="" repeat="1" isread="" time="1" message="" pagesize="10">
	                    <input the-id="pagebtime" class="inline laydate-icon" id="start" name="btime" type="text" onfocus="setudStart('yyyy-MM-dd HH:mm:ss','7')" readonly="readonly" value="">
	                    <span class="timedao">到</span>
	                    <input the-id="pageetime" class="inline laydate-icon" id="end" hides="time_wary" name="etime" type="text" onfocus="setudEndNewbrowse('yyyy-MM-dd HH:mm:ss','7')" readonly="readonly" value="">
	                    <button the-id="timeSurebtn">确定</button>
	                </li>
	            </ul>
	        </div>
	        <!--倾向性 mult_pub控制input显示-->
	        <div class="sx_pub mult_pub" style="display: none; top: 43px;" v-show="orientationtypeData.showOrientationtype"  @click.stop="noHide">
	            <ul the-id="sourcetype_wrap">
	                <li>
	                    <label>
	                        <input type="checkbox" info="全部" name="orientationtypeone" the-id="sourcetypeall" orientation="4" style="display: inline-block;">
	                        <span orientation="4" class="hover" the-id="browseajsourcetype">全部</span>
	                    </label>
	                </li>
	                <li>
	                    <label>
	                        <input type="checkbox" info="正面" name="orientationtypeone" the-id="mediatypeonecheck" orientation="1" style="display: inline-block;">
	                        <span orientation="1" class="" the-id="browseajsourcetype">正面</span>
	                    </label>
	                </li>
	                <li>
	                    <label>
	                        <input type="checkbox" info="负面" name="orientationtypeone" the-id="mediatypeonecheck" orientation="2" style="display: inline-block;">
	                        <span orientation="2" class="" the-id="browseajsourcetype">负面</span>
	                    </label>
	                </li>
	                <li>
	                    <label>
	                        <input type="checkbox" info="中性" name="orientationtypeone" the-id="mediatypeonecheck" orientation="3" style="display: inline-block;">
	                        <span orientation="3" class="" the-id="browseajsourcetype">中性</span>
	                    </label>
	                </li>
	            </ul>
	            <div class="all_btn" the-id="selecttypemore" style="display: block;">+ 多选</div>
	            <div class="btn_wrap" style="display: none;display: block;">
	                <div class="btn" the-id="sourcetypeSurebtn" types="orientation">确定</div>
	                <div class="btn no" the-id="sourcetypeCancle">取消</div>
	            </div>
	        </div>
	        <!--媒体类型 mult_pub控制input显示-->
	        <div class="sx_pub mult_pub" style="display: none; top: 43px;" v-show="mediatypeData.showMediatype"  @click.stop="noHide">
	            <ul the-id="sourcetype_wrap">
	                <li>
	                    <label>
	                        <input type="checkbox" sourcetype="xx" the-id="sourcetypeall" style="display: inline-block;">
	                        <span sourcetype="xx" class="hover" the-id="browseajsourcetype">全部</span>
	                    </label>
	                </li>
	                <li>
	                    <label>
	                        <input name="mediatypeone" info="网媒" sourcetype="01" the-id="mediatypeonecheck" type="checkbox" style="display: inline-block;">
	                        <span sourcetype="01" class="" the-id="browseajsourcetype">网媒</span>
	                    </label>
	                </li><li>
	                    <label>
	                        <input name="mediatypeone" info="论坛" sourcetype="02" the-id="mediatypeonecheck" type="checkbox" style="display: inline-block;">
	                        <span sourcetype="02" class="" the-id="browseajsourcetype">论坛</span>
	                    </label>
	                </li><li>
	                    <label>
	                        <input name="mediatypeone" info="微博" sourcetype="04,08" the-id="mediatypeonecheck" type="checkbox" style="display: inline-block;">
	                        <span sourcetype="04,08" class="" the-id="browseajsourcetype">微博</span>
	                    </label>
	                </li><li>
	                    <label>
	                        <input name="mediatypeone" info="微信" sourcetype="06" the-id="mediatypeonecheck" type="checkbox" style="display: inline-block;">
	                        <span sourcetype="06" class="" the-id="browseajsourcetype">微信</span>
	                    </label>
	                </li><li>
	                    <label>
	                        <input name="mediatypeone" info="博客" sourcetype="03" the-id="mediatypeonecheck" type="checkbox" style="display: inline-block;">
	                        <span sourcetype="03" class="" the-id="browseajsourcetype">博客</span>
	                    </label>
	                </li><li>
	                    <label>
	                        <input name="mediatypeone" info="报刊" sourcetype="05" the-id="mediatypeonecheck" type="checkbox" style="display: inline-block;">
	                        <span sourcetype="05" class="" the-id="browseajsourcetype">报刊</span>
	                    </label>
	                </li><li>
	                    <label>
	                        <input name="mediatypeone" info="视频" sourcetype="07" the-id="mediatypeonecheck" type="checkbox" style="display: inline-block;">
	                        <span sourcetype="07" class="" the-id="browseajsourcetype">视频</span>
	                    </label>
	                </li><li>
	                    <label>
	                        <input name="mediatypeone" info="APP" sourcetype="09" the-id="mediatypeonecheck" type="checkbox" style="display: inline-block;">
	                        <span sourcetype="09" class="" the-id="browseajsourcetype">APP</span>
	                    </label>
	                </li><li>
	                    <label>
	                        <input name="mediatypeone" info="其他" sourcetype="99" the-id="mediatypeonecheck" type="checkbox" style="display: inline-block;">
	                        <span sourcetype="99" class="" the-id="browseajsourcetype">其他</span>
	                    </label>
	                </li><li>
	                    <label>
	                        <input name="mediatypeone" info="评论" sourcetype="10" the-id="mediatypeonecheck" type="checkbox" style="display: inline-block;">
	                        <span sourcetype="10" class="" the-id="browseajsourcetype">评论</span>
	                    </label>
	                </li>
	            </ul>
	            <div class="all_btn" the-id="selecttypemore" style="display: block;">+ 多选</div>
	            <div class="btn_wrap" style="display: none;display: block">
	                <div class="btn" the-id="sourcetypeSurebtn" types="sourcetype">确定</div>
	                <div class="btn no" the-id="sourcetypeCancle">取消</div>
	            </div>
	        </div>
	        <!--微博类型 mult_pub控制input显示-->
	        <div class="sx_pub" style="display: none; top: 43px;" v-show="weibotypeData.showWeibotype"  @click.stop="noHide">
	            <ul the-id="sourcetype_wrap">
	                <li>
	                    <label>
	                        <input type="checkbox" name="weibotypeone" info="全部" the-id="sourcetypeall" wechatinfotype="" style="" checked="checked">
	                        <span wechatinfotype="" class="hover">全部</span>
	                    </label>
	                </li>
	                <li>
	                    <label>
	                        <input type="checkbox" name="weibotypeone" info="原发" the-id="mediatypeonecheck" wechatinfotype="1" style="" checked="checked">
	                        <span wechatinfotype="1" class="">原发</span>
	                    </label>
	                </li>
	                <li>
	                    <label>
	                        <input type="checkbox" name="weibotypeone" info="回复并转发" the-id="mediatypeonecheck" wechatinfotype="3" style="" checked="checked">
	                        <span wechatinfotype="3" class="">回复并转发</span>
	                    </label>
	                </li>
	                <li>
	                    <label>
	                        <input type="checkbox" name="weibotypeone" info="仅转发" the-id="mediatypeonecheck" wechatinfotype="2" style="" checked="checked">
	                        <span wechatinfotype="2" class="">仅转发</span>
	                    </label>
	                </li>
	            </ul>
	            <div class="all_btn" the-id="selecttypemore" style="display: block;">+ 多选</div>
	            <div class="btn_wrap" style="display: none;">
	                <div class="btn" the-id="sourcetypeSurebtn" types="wechatInfoType">确定</div>
	                <div class="btn no" the-id="sourcetypeCancle">取消</div>
	            </div>
	        </div>
	        <!--信源分级 mult_pub控制input显示-->
	        <div class="sx_pub" style="display: none; top: 43px;" v-show="infoSourceLevelData.showInfoSourceLevel"  @click.stop="noHide">
	            <ul the-id="sourcetype_wrap">
	                <li>
	                    <label>
	                        <input type="checkbox" name="infoSourceLeveltypeone" info="全部" the-id="sourcetypeall" infosourcelevel="" checked="checked">
	                        <span infosourcelevel="" class="hover">全部</span>
	                    </label>
	                </li>
	                <li>
	                    <label>
	                        <input type="checkbox" name="infoSourceLeveltypeone" info="A级" the-id="mediatypeonecheck" infosourcelevel="3871" checked="checked">
	                        <span infosourcelevel="3871" class="">A级</span>
	                    </label>
	                </li><li>
	                    <label>
	                        <input type="checkbox" name="infoSourceLeveltypeone" info="B级" the-id="mediatypeonecheck" infosourcelevel="3872" checked="checked">
	                        <span infosourcelevel="3872" class="">B级</span>
	                    </label>
	                </li><li>
	                    <label>
	                        <input type="checkbox" name="infoSourceLeveltypeone" info="C级" the-id="mediatypeonecheck" infosourcelevel="3873" checked="checked">
	                        <span infosourcelevel="3873" class="">C级</span>
	                    </label>
	                </li>
	            </ul>
	            <div class="all_btn" the-id="selecttypemore" style="display: block;">+ 多选</div>
	            <div class="btn_wrap" style="display: none;">
	                <div class="btn" the-id="sourcetypeSurebtn" types="infoSourceLevel">确定</div>
	                <div class="btn no" the-id="sourcetypeCancle">取消</div>
	            </div>
	        </div>
	        <!--信源地域-->	
	        <div class="sx_pub info_sourceregion" style="display: none; top: 43px;" v-show="infoSourceRegionData.showInfoSourceRegion"  @click.stop="noHide">
	            <ul>
	                <li>
	                    <span class="infoSourceRegionall hover" the-id="infoSourceRegionBtn">全部</span>
	                </li>
	                <li>
	                    <select the-id="province_select" autocomplete="off">
	                        <option value="" selected="selected">请选择省</option>
	                    </select>
	                </li>
	                <li>
	                    <select the-id="cities_select" autocomplete="off">
	                        <option value="" selected="selected">请选择市</option>
	                    </select>
	                </li>
	                <li>
	                    <button the-id="infoSourceRegionBtn">确定</button>
	                </li>
	            </ul>
	        </div>
	        <!--噪音过滤-->	
	        <div class="sx_pub" style="display: none; top: 43px;" v-show="noiseFilterData.showNoiseFilter"  @click.stop="noHide">
	            <ul>
	                <li>
	                    <span the-id="browseajsourcetype" state="xx" class="hover">全部</span>
	                </li>
	                <li>
	                    <span the-id="browseajsourcetype" state="1">正常信息</span>
	                </li>
	                <li>
	                    <span the-id="browseajsourcetype" state="jing">精准信息</span>
	                </li>
	                <li>
	                    <span the-id="browseajsourcetype" state="x">过滤信息</span>
	                </li>
	            </ul>
	        </div>
	        <!--重复信息-->	
	        <div class="sx_pub" style="display: none; top: 43px;" v-show="repeatData.showRepeat"  @click.stop="noHide">
	            <ul>
	                <li>
	                    <span the-id="browseajsourcetype" repeat="0">去重</span>
	                </li>
	                <li>
	                    <span the-id="browseajsourcetype" repeat="1" class="hover">不去重</span>
	                </li>
	            </ul>
	        </div>
	        <!--浏览范围-->	
	        <div class="sx_pub" style="display: none; top: 82px;" v-show="browseRangeData.showBrowseRange"  @click.stop="noHide">
	            <ul>
	                <li>
	                    <span isread="" the-id="browseajsourcetype" class="hover">全部</span>
	                </li>
	                <li>
	                    <span isread="1" the-id="browseajsourcetype">未读</span>
	                </li>
	                <li>
	                    <span isread="2" the-id="browseajsourcetype">已读</span>
	                </li>
	            </ul>
	        </div>
	        <!--精准筛选-->	
	        <div class="sx_pub twofloor sx_jz" style="display: none; top: 82px;" v-show="accurateFilterData.showAccurateFilter" @click.stop="noHide">
	            <ul>
	                <li the-id="mate">
	                    <i title="匹配全部：标题和内容同时匹配关键词仅匹配标题：仅标题匹配关键词"></i>
	                    <em>匹配范围：</em>
	                    <p>
	                        <span value="" class="hover">匹配全部</span>
	                        <span value="1" class="">仅匹配标题</span>
	                    </p>
	                </li>
	                <li the-id="region">
	                    <i title="开启后，信息中将进行地域词匹配，只有当设置的地域词占比最高时，该条信息才会被筛选出来。"></i>
	                    <em>唯一地域：</em>
	                    <p>
	                        <span value="" class="hover">关闭</span>
	                        <span value="1">开启</span>
	                    </p>
	                </li>
	                <li the-id="position">
	                    <i title="品牌词首次出现的位置 <= 设定值，信息会被筛选出来。"></i>
	                    <em>位置：</em>
	                    <p>
	                        <span style="color:#333">品牌词首次出现位置</span>
	                        <input type="text" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" value="">
	                        <span style="color:#333">个字</span>
	                    </p>
	                </li>
	                <li the-id="distance">
	                    <i title="设置关键词的词距范围。如果设置2组关键词，则必须满足2组词词距小于等于设定值；如果设置3组关键词，则品牌词与主体词，主体词与事件词都要小于等于设定值，信息才会被筛选出来。"></i>
	                    <em>词距范围：</em>
	                    <p>
	                        <input type="text" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/" value="">
	                        <span style="color: #333;">个字</span>
	                    </p>
	                </li>
	                <li the-id="filter">
	                    <i title="开启后，微博信息中出现的时间在专题创建时间前后1个月之外的数据会被过滤掉。"></i>
	                    <em>微博时间过滤：</em>
	                    <p>
	                        <span value="" class="hover">关闭</span>
	                        <span value="1">开启</span>
	                    </p>
	                </li>
	                <li the-id="ignore_loc">
	                    <i title="若选择“是”，则对微博信息中出现的位置信息不进行关键词匹配。位置信息为位置定位显示的信息。"></i>
	                    <em>忽略微博位置信息中的关键词：</em>
	                    <p>
	                        <span value="0" class="hover">否</span>
	                        <span value="1">是</span>
	                    </p>
	                </li>
	                <li the-id="ignore_topic">
	                    <i title="若选择“是”，则对微博信息中出现的话题信息不进行关键词匹配。话题信息一般是热门话题名称。"></i>
	                    <em>忽略微博话题信息中的关键词：</em>
	                    <p>
	                        <span value="0" class="hover">否</span>
	                        <span value="1">是</span>
	                    </p>
	                </li>
	                <li the-id="ignore_a">
	                    <i title="若选择“是”，则对微博信息中的@信息部分不进行关键词匹配。@信息一般是网名、微博名称等。"></i>
	                    <em>忽略微博@信息中的关键词：</em>
	                    <p>
	                        <span value="0" class="hover">否</span>
	                        <span value="1">是</span>
	                    </p>
	                </li>
	                <li>
	                    <button the-id="accurateSurebtn">确定</button>
	                    <button the-id="accurateCanclebtn">取消</button>
	                </li>
	            </ul>
	        </div>
	        <!--自定义筛选-->	
	        <!--标签-->	
	        <div class="sx_pub sx_labelname" style="display: none; top: 82px;" v-show="labelData.showLabel" @click.stop="noHide">
	            <ul style="width: 100%;">
	                <li>
	                    <span the-id="browseajsourcetype" labelname="" class="hover">全部</span>
	                </li>
	            </ul>
	        </div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
	    return {
	    	timetypeData:{
	    		showTimetype: false, //时间
	    		isActive: false
	    	},
	    	orientationtypeData: {
	    		showOrientationtype: false, //倾向性
	    		isActive: false
	    	},
	    	mediatypeData: {
	    		showMediatype: false, //媒体类型
	    		isActive: false
	    	},
	    	weibotypeData: {
	    		showWeibotype: false, //微博类型
	    		isActive: false
	    	},
	    	infoSourceLevelData: {
	    		showInfoSourceLevel: false, //信源分级
	    		isActive: false
	    	},
	    	infoSourceRegionData: {
	    		showInfoSourceRegion: false, //信源地域
	    		isActive: false
	    	},
	    	noiseFilterData: {
	    		showNoiseFilter: false, //噪音过滤
	    		isActive: false
	    	},
	    	repeatData: {
	    		showRepeat: false, //重复信息
	    		isActive: false
	    	},
	    	browseRangeData: {
	    		showBrowseRange: false, //浏览范围
	    		isActive: false
	    	},
	    	accurateFilterData: {
	    		showAccurateFilter: false, //精准筛选
	    		isActive: false
	    	},
	    	// customFilterData: {
	    	// 	showCustomFilter: false, //自定义筛选
	    	// 	isActive: false
	    	// },
	    	labelData: {
	    		showLabel: false, //标签
	    		isActive: false
	    	}
	    	
	    }
    },
    components:{
	    
	},
	methods: {
		//其他选项false，当前true
		hideOthers(){
			this.timetypeData.showTimetype = false;
			this.timetypeData.isActive = false;
			this.orientationtypeData.showOrientationtype = false;
			this.orientationtypeData.isActive = false;
			this.mediatypeData.showMediatype = false;
			this.mediatypeData.isActive = false;
			this.weibotypeData.showWeibotype = false;		
			this.weibotypeData.isActive = false;		
			this.infoSourceLevelData.showInfoSourceLevel = false;
			this.infoSourceLevelData.isActive = false;
			this.infoSourceRegionData.showInfoSourceRegion = false;
			this.infoSourceRegionData.isActive = false;
			this.noiseFilterData.showNoiseFilter = false;
			this.noiseFilterData.isActive = false;
			this.repeatData.showRepeat = false;
			this.repeatData.isActive = false;
			this.browseRangeData.showBrowseRange = false;
			this.browseRangeData.isActive = false;
			this.accurateFilterData.showAccurateFilter = false;
			this.accurateFilterData.isActive = false;
			this.labelData.showLabel = false;	
			this.labelData.isActive = false;	
		},
		timetype(){
			this.hideOthers();
			this.timetypeData.showTimetype = true;
			this.timetypeData.isActive = true;
		},
		orientationtype(){
			this.hideOthers();
			this.orientationtypeData.showOrientationtype = true;
			this.orientationtypeData.isActive = true;
			
		},
		mediatype(){
			this.hideOthers();
			this.mediatypeData.showMediatype = true;
			this.mediatypeData.isActive = true;
		},
		weibotype(){
			this.hideOthers();
			this.weibotypeData.showWeibotype = true;
			this.weibotypeData.isActive = true;
		},
		infoSourceLevel(){
			this.hideOthers();
			this.infoSourceLevelData.showInfoSourceLevel = true;
			this.infoSourceLevelData.isActive = true;
		},
		infoSourceRegion(){
			this.hideOthers();
			this.infoSourceRegionData.showInfoSourceRegion = true;
			this.infoSourceRegionData.isActive = true;
		},
		noiseFilter(){
			this.hideOthers();
			this.noiseFilterData.showNoiseFilter = true;
			this.noiseFilterData.isActive = true;
		},
		repeat(){
			this.hideOthers();
			this.repeatData.showRepeat = true;
			this.repeatData.isActive = true;
		},
		browseRange(){
			this.hideOthers();
			this.browseRangeData.showBrowseRange = true;
			this.browseRangeData.isActive = true;
		},
		accurateFilter(){
			this.hideOthers();
			this.accurateFilterData.showAccurateFilter = true;
			this.accurateFilterData.isActive = true;
		},
		label(){
			this.hideOthers();
			this.labelData.showLabel = true;
			this.labelData.isActive = true;
		},
		//点击页面其他区域可以隐藏选项卡
		handleBodyClick(){
			this.hideOthers();
		},
		//解决点击选项卡区域 不隐藏选项卡
		noHide(){
			console.log('组织时间冒泡');
		}
	},
	mounted (){
    	let _this = this;
	    document.addEventListener('click', this.handleBodyClick)
    },
	destroyed () {
	    document.removeEventListener('click', this.handleBodyClick)
	}
}
</script>
<style lang="less">

</style>