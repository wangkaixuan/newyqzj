<template>
  <div class="sx_wrap">
    <!--筛选条件-->
    <div class="sx_content">
      <ul the-id="search_condition">
        <!--时间-->
        <li ref="timetype">
          <a href="javascript:void(0)" v-bind:class="{hover: timetypeData.isActive}"
             @click.stop="showScreenCondition({'id':'timetype',showKey:'timetypeData'})">
            <p>时间</p>
            <p>
              <em>{{timetypeData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a><!-- 当前选中hover -->
        </li>
        <!--倾向性-->
        <li ref="orientationt">
          <a href="javascript:void(0)" v-bind:class="{hover: orientationtypeData.isActive}"
             @click.stop="showScreenCondition({'id':'orientationt',showKey:'orientationtypeData'})">
            <p>倾向性</p>
            <p>
              <em>{{orientationtypeData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--媒体类型-->
        <li ref="mediatype">
          <a href="javascript:void(0)" v-bind:class="{hover: mediatypeData.isActive}"
             @click.stop="showScreenCondition({'id':'mediatype',showKey:'mediatypeData'})">
            <p>媒体类型</p>
            <p>
              <em>{{mediatypeData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--微博类型-->
        <li v-if="inquireParameter.kvSourcetypeList == '' || (inquireParameter.kvSourcetypeList.indexOf('04,08') > -1)"
            ref="weibotype">
          <a href="javascript:void(0)" v-bind:class="{hover: weibotypeData.isActive}"
             @click.stop="showScreenCondition({'id':'weibotype',showKey:'weibotypeData'})">
            <p>微博类型</p>
            <p>
              <em>{{weibotypeData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--信源分级-->
        <li ref="infoSource">
          <a href="javascript:void(0)" v-bind:class="{hover: infoSourceLevelData.isActive}"
             @click.stop="showScreenCondition({'id':'infoSource',showKey:'infoSourceLevelData'})">
            <p>信源分级</p>
            <p>
              <em>{{infoSourceLevelData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--信源地域-->
        <li ref="infoSourceRegion">
          <a href="javascript:void(0)" v-bind:class="{hover: infoSourceRegionData.isActive}"
             @click.stop="showScreenCondition({'id':'infoSourceRegion',showKey:'infoSourceRegionData'})">
            <p>信源地域</p>
            <p>
              <em>{{infoSourceRegionData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--噪音过滤-->
        <li ref="noise">
          <a href="javascript:void(0)" v-bind:class="{hover: noiseFilterData.isActive}"
             @click.stop="showScreenCondition({'id':'noise',showKey:'noiseFilterData'})">
            <p>噪音过滤</p>
            <p>
              <em>{{noiseFilterData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--重复信息-->
        <li id="repeat" ref="repeat">
          <a href="javascript:void(0)" v-bind:class="{hover: repeatData.isActive}"
             @click.stop="showScreenCondition({'id':'repeat',showKey:'repeatData'})">
            <p>重复信息</p>
            <p>
              <em>{{repeatData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--浏览范围-->
        <li ref="browseRange" v-if="inquireParameter.msUserId == inquireParameter.shareMsUserId">
          <a href="javascript:void(0)" v-bind:class="{hover: browseRangeData.isActive}"
             @click.stop="showScreenCondition({'id':'browseRange',showKey:'browseRangeData'})">
            <p>浏览范围</p>
            <p>
              <em>{{browseRangeData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--精准筛选-->
        <li ref="accurate">
          <a href="javascript:void(0)" v-bind:class="{hover: accurateFilterData.isActive}"
             @click.stop="showScreenCondition({'id':'accurate',showKey:'accurateFilterData'})">
            <p>精准筛选</p>
            <p>
              <em
                v-if="inquireParameter.kvTitlematch == '' && inquireParameter.kvOnlylocal == '' && inquireParameter.kvMustwordminindex == '' && inquireParameter.kvKeywordsminindex == '' && inquireParameter.kvWeiboovertime == '' && inquireParameter.kvWeibosignlocalnoise == '' && inquireParameter.kvWeibotopicnoise == '' && inquireParameter.kvWeiboatnoise == ''">关闭</em>
              <em v-else>开启</em>
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
        <!--<li>-->
        <!--<a href="javascript:void(0)" v-bind:class="{hover: labelData.isActive}" @click.stop="label">-->
        <!--<p>标签</p>-->
        <!--<p>-->
        <!--<em>全部</em>-->
        <!--<i></i>-->
        <!--</p>-->
        <!--<span>|</span>-->
        <!--</a>-->
        <!--</li>-->
      </ul>
      <!--<div class="sx_true">-->
        <!--<a href="javascript:void(0)" @click="saveSearch()">保存筛选条件</a>-->
      <!--</div>-->
      <!--时间-->
      <div class="sx_pub" v-bind:style="{top:timetypeData.top+'px'}" v-show="timetypeData.isActive"
           @click.stop="noHide">
        <ul>
          <li>
            <span @click.stop="getListInfo({cxKey:'timeType',cxInfo:'',showKey:'timetypeData',showInfo:'全部'})"
                  :class="{hover:inquireParameter.timeType === ''}">全部</span>
          </li>
          <li>
            <span @click.stop="getListInfo({cxKey:'timeType',cxInfo:'day',showKey:'timetypeData',showInfo:'当天'})"
                  :class="{hover:inquireParameter.timeType === 'day'}">当天</span>
          </li>
          <li>
            <span @click.stop="getListInfo({cxKey:'timeType',cxInfo:'sevenDays',showKey:'timetypeData',showInfo:'近7天'})"
                  :class="{hover:inquireParameter.timeType === 'sevenDays'}">近7天</span>
          </li>
          <li class="js_time" @click.stop="showCustomDay">
            <span>自定义时间</span>
          </li>
          <div class="clear"></div>
          <li class="timejs_input" v-if="timetypeData.customDay">
            <div class="block">
              <el-date-picker
                v-model="formData.start_end_Time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" disabledDate="" value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="formData.startDatePicker">
              </el-date-picker>
              <button @click="updateTimeTj()">确定</button>
            </div>
          </li>
        </ul>
      </div>
      <!--倾向性 mult_pub控制input显示-->
      <div class="sx_pub " v-bind:style="{top:orientationtypeData.top+'px'}"
           :class="{mult_pub:orientationtypeData.multipleClass}"
           v-show="orientationtypeData.isActive" @click.stop="noHide">
        <ul>
          <li>
            <label>
              <input type="checkbox" info="全部" v-model.lazy="formData.orientationtypeone" value="-1"
                     @change.stop="checkboxInfo({formDataKey:'orientationtypeone',value:'-1',showKey:'orientationtypeData',allValue:'-1,1,2,3'})">
              <span :class="{hover:(formData.orientationtypeone.indexOf('-1') > -1)}"
                    @click.stop="getListInfo({cxKey:'orientationList',cxInfo:'',showKey:'orientationtypeData',showInfo:'全部',formDataKey:'orientationtypeone'})">全部</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" info="正面" v-model.lazy="formData.orientationtypeone" value="1"
                     @change.stop="checkboxInfo({formDataKey:'orientationtypeone',value:'1',showKey:'orientationtypeData',gs:'3'})">
              <span :class="{hover:(formData.orientationtypeone.indexOf('1') > -1)}"
                    @click.stop="getListInfo({cxKey:'orientationList',cxInfo:'1',showKey:'orientationtypeData',showInfo:'正面',formDataKey:'orientationtypeone'})">正面</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" info="负面" v-model.lazy="formData.orientationtypeone" value="2"
                     @change.stop="checkboxInfo({formDataKey:'orientationtypeone',value:'2',showKey:'orientationtypeData',gs:'3'})">
              <span :class="{hover:(formData.orientationtypeone.indexOf('2') > -1)}"
                    @click.stop="getListInfo({cxKey:'orientationList',cxInfo:'2',showKey:'orientationtypeData',showInfo:'负面',formDataKey:'orientationtypeone'})">负面</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" info="中性" v-model.lazy="formData.orientationtypeone" value="3"
                     @change.stop="checkboxInfo({formDataKey:'orientationtypeone',value:'3',showKey:'orientationtypeData',gs:'3'})">
              <span :class="{hover:(formData.orientationtypeone.indexOf('3') > -1)}"
                    @click.stop="getListInfo({cxKey:'orientationList',cxInfo:'3',showKey:'orientationtypeData',showInfo:'中性',formDataKey:'orientationtypeone'})">中性</span>
            </label>
          </li>
        </ul>
        <div class="all_btn" @click="multipleOption('orientationtypeData')">+ 多选</div>
        <div class="btn_wrap">
          <div class="btn"
               @click="setMoreProps({cxKey:'orientationList',showKey:'orientationtypeData',formDataKey:'orientationtypeone'})">
            确定
          </div>
          <div class="btn no" @click.stop="cancelShow('orientationtypeData')">取消</div>
        </div>
      </div>
      <!--媒体类型 mult_pub控制input显示-->
      <div class="sx_pub" v-bind:style="{top:mediatypeData.top+'px'}" :class="{mult_pub:mediatypeData.multipleClass}"
           v-show="mediatypeData.isActive" @click.stop="noHide">
        <ul the-id="sourcetype_wrap" v-if="sourceTypeList.length > 0">
          <li>
            <label>
              <input type="checkbox" value="-1" v-model.lazy="formData.sourcetypeInfo"
                     @change.stop="checkboxInfo({formDataKey:'sourcetypeInfo',value:'-1',showKey:'mediatypeData',allValue:mediatypeData.allId})">
              <span :class="{hover:(formData.sourcetypeInfo.indexOf('-1') > -1)}"
                    @click.stop="getListInfo({cxKey:'kvSourcetypeList',cxInfo:'',showKey:'mediatypeData',showInfo:'全部',formDataKey:'sourcetypeInfo'})">全部</span>
            </label>
          </li>
          <li v-for="type in sourceTypeList">
            <label>
              <input type="checkbox" :value="type.id" v-model.lazy="formData.sourcetypeInfo"
                     @change.stop="checkboxInfo({formDataKey:'sourcetypeInfo',value:type.id,showKey:'mediatypeData',gs:mediatypeData.allId.split(',').length-2})">
              <span :class="{hover:(formData.sourcetypeInfo.toString().indexOf(type.id) > -1)}"
                    @click="getListInfo({cxKey:'kvSourcetypeList',cxInfo:type.id,showKey:'mediatypeData',showInfo:type.name,formDataKey:'sourcetypeInfo'})">{{type.name}}</span>
            </label>
          </li>
        </ul>
        <div class="all_btn" @click="multipleOption('mediatypeData')">+ 多选</div>
        <div class="btn_wrap">
          <div class="btn"
               @click="setMoreProps({cxKey:'kvSourcetypeList',showKey:'mediatypeData',formDataKey:'sourcetypeInfo'})">确定
          </div>
          <div class="btn no" @click.stop="cancelShow('mediatypeData')">取消</div>
        </div>
      </div>
      <!--微博类型 mult_pub控制input显示-->
      <div class="sx_pub" v-bind:style="{top:weibotypeData.top+'px'}" :class="{mult_pub:weibotypeData.multipleClass}"
           v-show="weibotypeData.isActive" @click.stop="noHide">
        <ul the-id="sourcetype_wrap">
          <li>
            <label>
              <input type="checkbox" value="-1" v-model.lazy="formData.weiboType"
                     @change.stop="checkboxInfo({formDataKey:'weiboType',value:'-1',showKey:'weibotypeData',allValue:'-1,1,2,3'})">
              <span :class="{hover:(formData.weiboType.indexOf('-1') > -1)}"
                    @click.stop="getListInfo({cxKey:'wechatInfoTypeList',cxInfo:'',showKey:'weibotypeData',showInfo:'全部',formDataKey:'weiboType'})">全部</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" value="1" v-model.lazy="formData.weiboType"
                     @change.stop="checkboxInfo({formDataKey:'weiboType',value:'1',showKey:'weibotypeData',gs:'3'})">
              <span :class="{hover:(formData.weiboType.indexOf('1') > -1)}"
                    @click.stop="getListInfo({cxKey:'wechatInfoTypeList',cxInfo:'1',showKey:'weibotypeData',showInfo:'原发',formDataKey:'weiboType'})">原发</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" value="3" v-model.lazy="formData.weiboType"
                     @change.stop="checkboxInfo({formDataKey:'weiboType',value:'3',showKey:'weibotypeData',gs:'3'})">
              <span :class="{hover:(formData.weiboType.indexOf('3') > -1)}"
                    @click.stop="getListInfo({cxKey:'wechatInfoTypeList',cxInfo:'3',showKey:'weibotypeData',showInfo:'回复并转发',formDataKey:'weiboType'})">回复并转发</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" value="2" v-model.lazy="formData.weiboType"
                     @change.stop="checkboxInfo({formDataKey:'weiboType',value:'2',showKey:'weibotypeData',gs:'3'})">
              <span :class="{hover:(formData.weiboType.indexOf('2') > -1)}"
                    @click.stop="getListInfo({cxKey:'wechatInfoTypeList',cxInfo:'2',showKey:'weibotypeData',showInfo:'仅转发',formDataKey:'weiboType'})">仅转发</span>
            </label>
          </li>
        </ul>
        <div class="all_btn" @click="multipleOption('weibotypeData')">+ 多选</div>
        <div class="btn_wrap">
          <div class="btn"
               @click="setMoreProps({cxKey:'wechatInfoTypeList',showKey:'weibotypeData',formDataKey:'weiboType'})">确定
          </div>
          <div class="btn no" @click.stop="cancelShow('weibotypeData')">取消</div>
        </div>
      </div>
      <!--信源分级 mult_pub控制input显示-->
      <div class="sx_pub" v-bind:style="{top:infoSourceLevelData.top+'px'}"
           :class="{mult_pub:infoSourceLevelData.multipleClass}"
           v-show="infoSourceLevelData.isActive" @click.stop="noHide">
        <ul the-id="sourcetype_wrap" v-if="infoSourceLevelInfo.length > 0">
          <li>
            <label>
              <input type="checkbox" v-model.lazy="formData.infoSourceLeveltypeone" value="-1"
                     @change.stop="checkboxInfo({formDataKey:'infoSourceLeveltypeone',value:'-1',showKey:'infoSourceLevelData',allValue:infoSourceLevelData.allId})">
              <span :class="{hover:(formData.infoSourceLeveltypeone.indexOf('-1') > -1)}"
                    @click.stop="getListInfo({cxKey:'infoSourceLevelList',cxInfo:'',showKey:'infoSourceLevelData',showInfo:'全部',formDataKey:'infoSourceLeveltypeone'})">全部</span>
            </label>
          </li>
          <li v-for="level in infoSourceLevelInfo">
            <label>
              <input type="checkbox" :value="level.id" v-model.lazy="formData.infoSourceLeveltypeone"
                     @change.stop="checkboxInfo({formDataKey:'infoSourceLeveltypeone',value:level.id,showKey:'infoSourceLevelData',gs:'3'})">
              <span :class="{hover:(formData.infoSourceLeveltypeone.toString().indexOf(level.id) > -1)}"
                    @click="getListInfo({cxKey:'infoSourceLevelList',cxInfo:level.id,showKey:'infoSourceLevelData',showInfo:level.name,formDataKey:'infoSourceLeveltypeone'})">{{level.name}}</span>
            </label>
          </li>
        </ul>
        <div class="all_btn" @click="multipleOption('infoSourceLevelData')">+ 多选</div>
        <div class="btn_wrap">
          <div class="btn"
               @click="setMoreProps({cxKey:'infoSourceLevelList',showKey:'infoSourceLevelData',formDataKey:'infoSourceLeveltypeone'})">
            确定
          </div>
          <div class="btn no" @click.stop="cancelShow('infoSourceLevelData')">取消</div>
        </div>
      </div>
      <!--信源地域-->
      <div class="sx_pub info_sourceregion" v-bind:style="{top:infoSourceRegionData.top+'px'}"
           v-show="infoSourceRegionData.isActive" @click.stop="noHide">
        <ul>
          <li>
            <span class="infoSourceRegionall" :class="{hover:inquireParameter.region == ''}"
                  @click.stop="getListInfo({cxKey:'region',cxInfo:'',showKey:'infoSourceRegionData',showInfo:'全部'})">全部</span>
          </li>
          <li>
            <select autocomplete="off" @change.stop="changeType" v-model="formData.region_selected">
              <option value="" selected="selected">请选择省</option>
              <option v-for="region in formData.region" :value="region.code">
                {{ region.name }}
              </option>
            </select>
          </li>
          <li>
            <select the-id="cities_select" autocomplete="off" v-model="formData.city_selected">
              <option value="" selected="selected">请选择市</option>
              <option v-for="city in formData.city" :value="city.code">
                {{ city.name }}
              </option>
            </select>
          </li>
          <li>
            <button @click="infoSourceRegionBtn()">确定</button>
          </li>
        </ul>
      </div>
      <!--噪音过滤-->
      <div class="sx_pub" v-bind:style="{top:noiseFilterData.top+'px'}" v-show="noiseFilterData.isActive"
           @click.stop="noHide">
        <ul>
          <li>
            <span state="" :class="{hover:inquireParameter.krState === ''}"
                  @click.stop="getListInfo({cxKey:'krState',cxInfo:'',showKey:'noiseFilterData',showInfo:'全部'})">全部</span>
          </li>
          <li>
            <span state="1" :class="{hover:inquireParameter.krState === '1'}"
                  @click.stop="getListInfo({cxKey:'krState',cxInfo:'1',showKey:'noiseFilterData',showInfo:'正常信息'})">正常信息</span>
          </li>
          <li>
            <span state="jing" :class="{hover:inquireParameter.krState === 'jing'}"
                  @click.stop="getListInfo({cxKey:'krState',cxInfo:'jing',showKey:'noiseFilterData',showInfo:'精准信息'})">精准信息</span>
          </li>
          <li>
            <span state="x" :class="{hover:inquireParameter.krState === 'x'}"
                  @click.stop="getListInfo({cxKey:'krState',cxInfo:'x',showKey:'noiseFilterData',showInfo:'过滤信息'})">过滤信息</span>
          </li>
        </ul>
      </div>
      <!--重复信息-->
      <div class="sx_pub" v-show="repeatData.isActive" @click.stop="noHide" v-bind:style="{top:repeatData.top+'px'}">
        <ul>
          <li>
            <span the-id="browseajsourcetype" :class="{hover:inquireParameter.isRepeat === '1'}"
                  @click.stop="getListInfo({cxKey:'isRepeat',cxInfo:'1',showKey:'repeatData',showInfo:'去重'})">去重</span>
          </li>
          <li>
            <span the-id="browseajsourcetype" :class="{hover:inquireParameter.isRepeat === '0'}"
                  @click.stop="getListInfo({cxKey:'isRepeat',cxInfo:'0',showKey:'repeatData',showInfo:'不去重'})">不去重</span>
          </li>
        </ul>
      </div>
      <!--浏览范围-->
      <div class="sx_pub" v-bind:style="{top:browseRangeData.top+'px'}" v-show="browseRangeData.isActive"
           @click.stop="noHide">
        <ul>
          <li>
            <span isread="-1" :class="{hover:inquireParameter.isread === '-1'}"
                  @click.stop="getListInfo({cxKey:'isread',cxInfo:'-1',showKey:'browseRangeData',showInfo:'全部'})">全部</span>
          </li>
          <li>
            <span isread="0" :class="{hover:inquireParameter.isread === '0'}"
                  @click.stop="getListInfo({cxKey:'isread',cxInfo:'0',showKey:'browseRangeData',showInfo:'未读'})">未读</span>
          </li>
          <li>
            <span isread="1" :class="{hover:inquireParameter.isread === '1'}"
                  @click.stop="getListInfo({cxKey:'isread',cxInfo:'1',showKey:'browseRangeData',showInfo:'已读'})">已读</span>
          </li>
        </ul>
      </div>
      <!--精准筛选-->
      <div class="sx_pub twofloor sx_jz" v-bind:style="{top:accurateFilterData.top+'px'}"
           v-show="accurateFilterData.isActive" @click.stop="noHide">
        <ul>
          <li the-id="mate">
            <i title="匹配全部：标题和内容同时匹配关键词仅匹配标题：仅标题匹配关键词"></i>
            <em>匹配范围：</em>
            <p>
              <span value="" :class="{hover:accurate.kvTitlematch == ''}"
                    @click="setAccurateInfo({'cxKey':'kvTitlematch',cxInfo:''})">匹配全部</span>
              <span value="1" :class="{hover:accurate.kvTitlematch != ''}"
                    @click="setAccurateInfo({'cxKey':'kvTitlematch',cxInfo:'1'})">仅匹配标题</span>
            </p>
          </li>
          <li the-id="region">
            <i title="开启后，信息中将进行地域词匹配，只有当设置的地域词占比最高时，该条信息才会被筛选出来。"></i>
            <em>唯一地域：</em>
            <p>
              <span value="" :class="{hover:accurate.kvOnlylocal == ''}"
                    @click="setAccurateInfo({'cxKey':'kvOnlylocal',cxInfo:''})">关闭</span>
              <span value="1" :class="{hover:accurate.kvOnlylocal != ''}"
                    @click="setAccurateInfo({'cxKey':'kvOnlylocal',cxInfo:'1'})">开启</span>
            </p>
          </li>
          <li the-id="position">
            <i title="品牌词首次出现的位置 <= 设定值，信息会被筛选出来。"></i>
            <em>位置：</em>
            <p>
              <span style="color:#333">品牌词首次出现位置</span>
              <input type="text" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"
                     v-model="accurate.kvMustwordminindex">
              <span style="color:#333">个字</span>
            </p>
          </li>
          <li the-id="distance">
            <i title="设置关键词的词距范围。如果设置2组关键词，则必须满足2组词词距小于等于设定值；如果设置3组关键词，则品牌词与主体词，主体词与事件词都要小于等于设定值，信息才会被筛选出来。"></i>
            <em>词距范围：</em>
            <p>
              <input type="text" onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/"
                     v-model="accurate.kvKeywordsminindex">
              <span style="color: #333;">个字</span>
            </p>
          </li>
          <li the-id="filter">
            <i title="开启后，微博信息中出现的时间在专题创建时间前后1个月之外的数据会被过滤掉。"></i>
            <em>微博时间过滤：</em>
            <p>
              <span value="" :class="{hover:accurate.kvWeiboovertime == ''}"
                    @click="setAccurateInfo({'cxKey':'kvWeiboovertime',cxInfo:''})">关闭</span>
              <span value="1" :class="{hover:accurate.kvWeiboovertime != ''}"
                    @click="setAccurateInfo({'cxKey':'kvWeiboovertime',cxInfo:'1'})">开启</span>
            </p>
          </li>
          <li the-id="ignore_loc">
            <i title="若选择“是”，则对微博信息中出现的位置信息不进行关键词匹配。位置信息为位置定位显示的信息。"></i>
            <em>忽略微博位置信息中的关键词：</em>
            <p>
              <span value="0" :class="{hover:accurate.kvWeibosignlocalnoise == ''}"
                    @click="setAccurateInfo({'cxKey':'kvWeibosignlocalnoise',cxInfo:''})">否</span>
              <span value="1" :class="{hover:accurate.kvWeibosignlocalnoise != ''}"
                    @click="setAccurateInfo({'cxKey':'kvWeibosignlocalnoise',cxInfo:'1'})">是</span>
            </p>
          </li>
          <li the-id="ignore_topic">
            <i title="若选择“是”，则对微博信息中出现的话题信息不进行关键词匹配。话题信息一般是热门话题名称。"></i>
            <em>忽略微博话题信息中的关键词：</em>
            <p>
              <span value="0" :class="{hover:accurate.kvWeibotopicnoise == ''}"
                    @click="setAccurateInfo({'cxKey':'kvWeibotopicnoise',cxInfo:''})">否</span>
              <span value="1" :class="{hover:accurate.kvWeibotopicnoise != ''}"
                    @click="setAccurateInfo({'cxKey':'kvWeibotopicnoise',cxInfo:'1'})">是</span>
            </p>
          </li>
          <li the-id="ignore_a">
            <i title="若选择“是”，则对微博信息中的@信息部分不进行关键词匹配。@信息一般是网名、微博名称等。"></i>
            <em>忽略微博@信息中的关键词：</em>
            <p>
              <span value="0" :class="{hover:accurate.kvWeiboatnoise == ''}"
                    @click="setAccurateInfo({'cxKey':'kvWeiboatnoise',cxInfo:''})">否</span>
              <span value="1" :class="{hover:accurate.kvWeiboatnoise != ''}"
                    @click="setAccurateInfo({'cxKey':'kvWeiboatnoise',cxInfo:'1'})">是</span>
            </p>
          </li>
          <li>
            <button @click="inquireAccurate">确定</button>
            <button @click.stop="cancelShow('accurateFilterData')">取消</button>
          </li>
        </ul>
      </div>
      <!--自定义筛选-->
      <!--标签-->
      <!--<div class="sx_pub sx_labelname" style="display: none; top: 82px;" v-show="labelData.showLabel"-->
      <!--@click.stop="noHide">-->
      <!--<ul style="width: 100%;">-->
      <!--<li>-->
      <!--<span the-id="browseajsourcetype" labelname="" class="hover">全部</span>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  import {getBrowseList, getYqllCondition, saveSearchCondition} from '../../service/browse'
  export default {
    data() {
      return {
        timetypeData: {
          isActive: false,
          top: 43,
          customDay: false,
          screenInfo: '全部',
          screenInfoArry: {'day': '当天', 'sevenDays': '近7天'}
        },
        orientationtypeData: {
          isActive: false,
          top: 43,
          multipleClass: false,                     //倾向性更多样式
          screenInfo: '全部',                     //倾向性显示文字
          screenInfoArry: {'1': '正面', '2': '负面', '3': "中性"},                     //倾向性显示文字
        },
        mediatypeData: {
          isActive: false,
          top: 43,
          multipleClass: false,                  //媒体类型多选
          screenInfo: '全部',                      //媒体类型显示文字
          allId: '-1,',
          screenInfoArry: []
        },
        weibotypeData: {
          isActive: false,
          top: 43,
          multipleClass: false,                  //媒体类型多选
          screenInfo: '全部',                      //微博类型显示文字
          screenInfoArry: {'1': '原发', '2': '仅转发', '3': "回复并转发"}
        },
        infoSourceLevelData: {
          isActive: false,
          top: 43,
          multipleClass: false,                  //信源分级多选
          screenInfo: '全部',
          allId: '-1,',
          screenInfoArry: []
        },
        infoSourceRegionData: {
          isActive: false,                 //信源地域
          top: 43,
          screenInfo: '全部'
        },
        noiseFilterData: {
          isActive: false,  //噪音过滤  1 正常 x过滤 jing 精准
          top: 43,
          screenInfoArry: {'1': '正常信息', 'x': '过滤信息', 'jing': '精准信息'},
          screenInfo: '正常信息'
        },
        repeatData: {
          isActive: false,   //重复信息
          top: 43,
          screenInfoArry: {'0': '不去重', '1': '去重'},
          screenInfo: '去重'
        },
        browseRangeData: {
          isActive: false,         //浏览范围
          top: 43,
          screenInfoArry: {'0': '未读', '1': '已读'},
          screenInfo: '全部'
        },
        accurateFilterData: {
          top: 43,
          isActive: false
        },
        infoSourceLevelInfo: [],   //信源分级
        sourceTypeList: [],    //媒体列表
        formData: {
          region: [],            //信源地域  省数据
          region_selected: '',            //信源地域  省选中信息
          city: [],            //信源地域  市数据
          city_selected: '',            //信源地域  市选中信息
          orientationtypeone: ['-1'],            //倾向性值
          start_end_Time: '',
          startDatePicker: this.beginDate(),
          infoSourceLeveltypeone: ["-1"],    //信源分级
          sourcetypeInfo: ['-1'],              //媒体数据
          weiboType: ['-1'],                 //微博类型
        },
        accurate: {
          kvTitlematch: '',                //标题是否匹配  匹配全部''  仅匹配标题1
          kvOnlylocal: '',                //是否唯一地域   关闭'' 开启1
          kvMustwordminindex: '',                //位置
          kvKeywordsminindex: '',                //词距范围
          kvWeiboovertime: '',                //微博时间过滤
          kvWeibosignlocalnoise: '',                //忽略微博位置信息中的关键词
          kvWeibotopicnoise: '',                //忽略微博话题信息中的关键词
          kvWeiboatnoise: '',                //忽略微博@信息中的关键词
        }
      }
    },
    props: ['inquireParameter','classId'],
    components: {},
    methods: {
      //其他选项false，当前true
      hideOthers(){
        this.timetypeData.isActive = false;
        this.orientationtypeData.isActive = false;
        this.mediatypeData.isActive = false;
        this.weibotypeData.isActive = false;
        this.infoSourceLevelData.isActive = false;
        this.infoSourceRegionData.isActive = false;
        this.noiseFilterData.isActive = false;
        this.repeatData.isActive = false;
        this.browseRangeData.isActive = false;
        this.accurateFilterData.isActive = false;
      },
      showScreenCondition(porpsInfo){
        //初始化
        this.hideOthers();
        //显示筛选条件
        let top = parseInt(this.$refs[porpsInfo.id].offsetTop) + 33;
        this[porpsInfo.showKey].top = top;
        this[porpsInfo.showKey].isActive = true;
        this[porpsInfo.showKey].multipleClass = false;
        if (porpsInfo.showKey === 'timetypeData') {
          //时间
          this.timetypeData.customDay = false;
        }
        if (porpsInfo.showKey === 'accurateFilterData') {
          //精选
          this.accurate.kvTitlematch = this.inquireParameter.kvTitlematch;
          this.accurate.kvOnlylocal = this.inquireParameter.kvOnlylocal;
          this.accurate.kvMustwordminindex = this.inquireParameter.kvMustwordminindex;
          this.accurate.kvKeywordsminindex = this.inquireParameter.kvKeywordsminindex;
          this.accurate.kvWeiboovertime = this.inquireParameter.kvWeiboovertime;
          this.accurate.kvWeibosignlocalnoise = this.inquireParameter.kvWeibosignlocalnoise;
          this.accurate.kvWeibotopicnoise = this.inquireParameter.kvWeibotopicnoise;
          this.accurate.kvWeiboatnoise = this.inquireParameter.kvWeiboatnoise;
        }
        if (porpsInfo.showKey === 'infoSourceLevelData') {
          //信源分级
          this.inquireParameter.infoSourceLevelList = this.inquireParameter.infoSourceLevelList + '';
          this.formData.infoSourceLeveltypeone = (this.inquireParameter.infoSourceLevelList == '') ? ['-1'] : this.inquireParameter.infoSourceLevelList.split(',');
        }
        if (porpsInfo.showKey === 'weibotypeData') {
          //微博类型
          this.formData.weiboType = (this.inquireParameter.wechatInfoTypeList == '') ? ['-1'] : this.inquireParameter.wechatInfoTypeList.split(',');
        }
        if (porpsInfo.showKey === 'mediatypeData') {
          //媒体类型
          if (this.inquireParameter.kvSourcetypeList == '') {
            this.formData.sourcetypeInfo = ['-1']
          } else if (this.inquireParameter.kvSourcetypeList.indexOf('04,08') > -1) {
            let typeArray = this.inquireParameter.kvSourcetypeList.split(',');
            let newSourcetypeInfoArray = [];
            for (let i in typeArray) {
              if (typeArray[i] == '04') {
                newSourcetypeInfoArray.push('04,08');
              }
              if (typeArray[i] != '08' && typeArray[i] != '04') {
                newSourcetypeInfoArray.push(typeArray[i]);
              }
            }
            this.formData.sourcetypeInfo = newSourcetypeInfoArray;
          } else {
            this.formData.sourcetypeInfo = this.inquireParameter.kvSourcetypeList.split(',');
          }
        }
        if (porpsInfo.showKey === 'orientationtypeData') {
          //倾向性
          this.formData.orientationtypeone = (this.inquireParameter.orientationList == '') ? ['-1'] : this.inquireParameter.orientationList.split(',');
        }
        if (porpsInfo.showKey === 'infoSourceRegionData') {
          //信源地域
          if (this.formData.provinceOrCity && this.inquireParameter.region != '') {
            //恢复地域显示
            this.formData.region_selected = this.formData.provinceOrCity.region;
            this.formData.city = this.formData.region[this.formData.provinceOrCity.region].cities;
            this.formData.city_selected = this.formData.provinceOrCity.city;
          }
          if (this.inquireParameter.region === '') {
            this.formData.region_selected = '';
            this.formData.city_selected = '';
          }
        }
      },
      //点击页面其他区域可以隐藏选项卡
      handleBodyClick(){
        this.hideOthers();
      },
      //解决点击选项卡区域 不隐藏选项卡
      noHide(){
        //console.log('组织时间冒泡');
      },
      getCondition(){
        //查询筛选条件  媒体类型  信源 分级、地域
        let _this = this;
        getYqllCondition('').then(res => {
          if (res.data.result.data) {
            _this.sourceTypeList = res.data.result.data.sourceTypeList || [];    //媒体类型
            _this.formData.region = res.data.result.data.region || [];                    //地域 省
            _this.infoSourceLevelInfo = res.data.result.data.infoSourceLevel || [];   //信源分级
            if (_this.sourceTypeList.length > 0) {
              for (let i in _this.sourceTypeList) {
                this.mediatypeData.screenInfoArry[_this.sourceTypeList[i].id] = _this.sourceTypeList[i].name;
                this.mediatypeData.allId += _this.sourceTypeList[i].id + ',';
              }
              this.mediatypeData.allId = this.mediatypeData.allId.substr(0, this.mediatypeData.allId.length - 1);
            }
            if (_this.infoSourceLevelInfo.length > 0) {
              for (let i in _this.infoSourceLevelInfo) {
                this.infoSourceLevelData.screenInfoArry[_this.infoSourceLevelInfo[i].id] = _this.infoSourceLevelInfo[i].name;
                this.infoSourceLevelData.allId += _this.infoSourceLevelInfo[i].id + ',';
              }
              this.infoSourceLevelData.allId = this.infoSourceLevelData.allId.substr(0, this.infoSourceLevelData.allId.length - 1);
            }
          }
          //_this.setSearchWz();
        }).catch(err => {
          console.log(err, '请求失败！');
        })
      },
      setSearchWz(){
        //设置显示文字
        let _this = this;
        //设置时间
        if (_this.inquireParameter.timeType !== '') {
          _this.timetypeData.screenInfo = _this.timetypeData.screenInfoArry[_this.inquireParameter.timeType] || '全部';
          if(this.inquireParameter.timetypeInfo){
            _this.timetypeData.screenInfo = this.inquireParameter.timetypeInfo;
          }
        }else{
          _this.timetypeData.screenInfo = '全部';
        }
        //设置倾向性
        if (_this.inquireParameter.orientationList !== '') {
          this.setScreenInfo({
            'inquireP': 'orientationList',
            'showKey': 'orientationtypeData'
          });
        }else{
          _this.orientationtypeData.screenInfo = '全部'
        }
        //设置媒体类型
        if (_this.inquireParameter.kvSourcetypeList !== '') {
          let typeList = _this.inquireParameter.kvSourcetypeList,
            typeInfo = '';
          if (typeList.length > 0) {
            for (let i in _this.sourceTypeList) {
              if (typeList.indexOf(_this.sourceTypeList[i].id) > -1) {
                typeInfo += _this.sourceTypeList[i].name + ',';
              }
            }
            _this.mediatypeData.screenInfo = typeInfo.substr(0, typeInfo.length - 1);
          }
        }else{
          _this.mediatypeData.screenInfo = '全部'
        }
        //微博类型设置
        if (_this.inquireParameter.wechatInfoTypeList !== '') {
          this.setScreenInfo({
            'inquireP': 'wechatInfoTypeList',
            'showKey': 'weibotypeData'
          });
        }else{
          _this.weibotypeData.screenInfo = '全部';
        }
        //信源分级
        if (_this.inquireParameter.infoSourceLevelList !== '') {
          this.setScreenInfo({
            'inquireP': 'infoSourceLevelList',
            'showKey': 'infoSourceLevelData'
          });
        }else{
            _this.infoSourceLevelData.screenInfo = '全部';
        }
        //噪音过滤
        if (_this.inquireParameter.krState !== '') {
          this.setScreenInfo({
            'inquireP': 'krState',
            'showKey': 'noiseFilterData'
          });
        }else{
          _this.noiseFilterData.screenInfo = '全部';
        }
        //重复信息
        if (_this.inquireParameter.isRepeat != '1') {
          this.setScreenInfo({
            'inquireP': 'isRepeat',
            'showKey': 'repeatData'
          });
        }else{
          _this.repeatData.screenInfo = '去重';
        }
        //浏览范围
        if (_this.inquireParameter.isread != '-1') {
          this.setScreenInfo({
            'inquireP': 'isread',
            'showKey': 'browseRangeData'
          });
        }else{
          _this.browseRangeData.screenInfo = '全部';
        }
        if (_this.inquireParameter.region !== '') {
          this.formData.provinceOrCity = this.inquireParameter.provinceOrCity;
          let info = '';
          if (this.formData.provinceOrCity.region != '') {
            //省
            info = this.formData.region[this.formData.provinceOrCity.region].name;
          }
          if (this.formData.provinceOrCity.city != '') {
            //市
            info = info + '-' + this.formData.region[this.formData.provinceOrCity.region].cities[this.formData.provinceOrCity.city].name
          }
          this.infoSourceRegionData.screenInfo = info;
        }else{
          this.infoSourceRegionData.screenInfo = '全部';
        }
      },
      setScreenInfo(porpsInfo){
        /*
         * porpsInfo.
         *   inquireP      inquireParameter 值
         *   showKey       显示key值
         * */
        let _this = this,
          searchArray = (typeof this.inquireParameter[porpsInfo.inquireP] === 'String') ? this.inquireParameter[porpsInfo.inquireP].split(',') : this.inquireParameter[porpsInfo.inquireP].toString().split(','),//查询数据
          searchInfo = '';                                                            //显示文字

        if (searchArray.length > 0) {
          searchArray.forEach((item, index) => {
            let info = _this[porpsInfo.showKey].screenInfoArry[item] || '全部';
            searchInfo += info + ',';
          });
          _this[porpsInfo.showKey].screenInfo = searchInfo.substr(0, searchInfo.length - 1);
        }
      },
      changeType(){
        //信源地域 省市联动
        if (this.formData.region_selected !== '') {
          let reg = this.formData.region[this.formData.region_selected] || '';
          if (reg !== '') {
            this.formData.city = this.formData.region[this.formData.region_selected].cities;
            this.formData.city_selected = '';
          }
        } else {
          this.formData.city = [];
          this.formData.city_selected = '';
        }
      },
      multipleOption(opn){
        this[opn].multipleClass = true;
      },
      showCustomDay: function () {
        //显示自定义时间
        this.timetypeData.customDay = true;
      },
      getListInfo(porpsInfo){
        /*
         * 单个数据查询
         * 参数值
         *   cxInfo     查询值
         *   cxKey      查询key
         *   showInfo   显示内容
         *   showKey    显示key值
         *   formDataKey  多选有form表单数据key值
         * */
        //查询数据
        if (typeof this.formData[porpsInfo.formDataKey] === 'undefined' || !this[porpsInfo.showKey].multipleClass) {
          var fkey = porpsInfo.formDataKey || '';
          this.$emit('getListInfo', {
            keys: porpsInfo.cxKey,
            content: porpsInfo.cxInfo
          });
          if (fkey !== '') {
            this.formData[porpsInfo.formDataKey] = [porpsInfo.cxInfo];
          }
          this[porpsInfo.showKey].screenInfo = porpsInfo.showInfo;
          this[porpsInfo.showKey].isActive = false;
        }
      },
      setMoreProps(porpsInfo){
        /*
         * 多选
         * 参数值
         *   cxKey      查询key
         *   showKey    显示key值
         *   formDataKey  多选有form表单数据key值
         * */
        if (typeof this.formData[porpsInfo.formDataKey] !== 'undefined' && this.formData[porpsInfo.formDataKey].length == 0) {
          this.$message({
            message: '请选择需要查询内容！',
            type: 'warning'
          });
          return false;
        }
        let xyformData = this.formData[porpsInfo.formDataKey];
        let cxInfo = xyformData.join();
        if (cxInfo.indexOf('-1') == -1) {
          //no 全选
          this.$emit('getListInfo', {
            keys: porpsInfo.cxKey,
            content: cxInfo
          });
          let showInfos = '';
          for (let i in xyformData) {
            showInfos += this[porpsInfo.showKey].screenInfoArry[xyformData[i]] + '、';
          }
          this[porpsInfo.showKey].screenInfo = showInfos.substr(0, showInfos.length - 1);
        } else {
          //全选
          this.$emit('getListInfo', {
            keys: porpsInfo.cxKey,
            content: ''
          });
          this[porpsInfo.showKey].screenInfo = '全部';
        }
        this[porpsInfo.showKey].isActive = false;
      },
      infoSourceRegionBtn(){
        //信源地域
        if (this.formData.region_selected === '' && this.formData.city_selected === '') {
          //alert('请选择信源所属地域!');
          //return false;
          this.$emit('getListInfo', {
            keys: 'region',
            content: ''
          });
          this.infoSourceRegionData.screenInfo = '全部';
          this.infoSourceRegionData.isActive = false;
        }else{
          this.formData.provinceOrCity = {
            city: this.formData.city_selected,
            region: this.formData.region_selected
          };
          let region = '';
          let info = '';
          if (this.formData.region_selected != '') {
            //省
            region = this.formData.region_selected;
            info = this.formData.region[region].name;
          }
          if (this.formData.city_selected != '') {
            //市
            region = this.formData.city_selected;
            info = info + '-' + this.formData.region[this.formData.region_selected].cities[region].name
          }
          this.inquireParameter.provinceOrCity = {
            city: this.formData.city_selected,
            region: this.formData.region_selected
          };
          this.$emit('getListInfo', {
            keys: 'region',
            content: region
          });
          this.infoSourceRegionData.screenInfo = info;
          this.infoSourceRegionData.isActive = false;
        }
      },
      cancelShow(cancelKey){
        //取消
        this[cancelKey].isActive = false;
      },
      checkboxInfo(porpsInfo){
        /*
         *  多选
         *   formDataKey  多选有form表单数据key值
         *   gs           单个用到 该多选个数
         *   showKey      显示key值
         *   value        值
         *   allValue   全部用到 所有值
         *
         * */
        if (typeof this.formData[porpsInfo.formDataKey] !== 'undefined' && this[porpsInfo.showKey].multipleClass) {
          //  this.formData.orientationtypeone                    v-model 绑定参数
          if (porpsInfo.value == '-1') {
            //全选
            if (this.formData[porpsInfo.formDataKey].indexOf(porpsInfo.value) > -1) {
              //选中
              let allValue = porpsInfo.allValue || '';
              if (allValue != '') {
                allValue = allValue.split(',');
                if (porpsInfo.showKey === 'mediatypeData') {
                  let newSourcetypeInfoArray = [];
                  for (let i in allValue) {
                    if (allValue[i] == '04') {
                      newSourcetypeInfoArray.push('04,08');
                    }
                    if (allValue[i] != '08' && allValue[i] != '04') {
                      newSourcetypeInfoArray.push(allValue[i]);
                    }
                  }
                  allValue = newSourcetypeInfoArray;
                }
              }
              this.formData[porpsInfo.formDataKey] = allValue;
            } else {
              //没选中
              this.formData[porpsInfo.formDataKey] = [];
            }
          } else {
            //单个
            var allWz = this.formData[porpsInfo.formDataKey].indexOf('-1');
            if (allWz > -1) {
              this.formData[porpsInfo.formDataKey].splice(allWz, 1);
            }
            if (this.formData[porpsInfo.formDataKey].indexOf('-1') == -1 && this.formData[porpsInfo.formDataKey].length == porpsInfo.gs) {
              this.formData[porpsInfo.formDataKey].push('-1');
            }
          }
        }
      },
      updateTimeTj(){
        //时间筛选
        if (this.formData.start_end_Time == '') {
          this.$message({
            message: '请选择开始时间和结束时间！',
            type: 'warning'
          });
          return false;
        }
        this.$emit('getListInfo', {
          startTime: this.formData.start_end_Time[0].replace(/-|:|\s/g, ""),
          endTime: this.formData.start_end_Time[1].replace(/-|:|\s/g, "")
        });
        this.timetypeData.screenInfo = this.formData.start_end_Time[0] + ' 至 ' + this.formData.start_end_Time[1];
        this.inquireParameter.timetypeInfo = this.timetypeData.screenInfo;
        this.timetypeData.isActive = false;
      },
      setAccurateInfo(porpsInfo){
        //设置精准相关信息
        this.accurate[porpsInfo.cxKey] = porpsInfo.cxInfo;
      },
      inquireAccurate(){
        this.$emit('setAccurateInfo', this.accurate);
        this.accurateFilterData.isActive = false;
      },
      //处理不能选择今天之后的时间
      beginDate(){
        let _this = this;
        return {
          disabledDate(time){
            let date = new Date();
            let timestamp = date.getTime();
            let limitData = new Date(timestamp - _this.$store.state.savedays * 24 * 3600 * 1000);
            return time.getTime() > Date.now() || time.getTime() < limitData//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      },
      saveSearch(){
        //保存筛选条件
        let _this = this;
        this.$confirm('确认保存筛选条件吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false
        }).then(() => {
          if(_this.inquireParameter.timeType != 'customDay'){
            _this.inquireParameter.startTime = '';
            _this.inquireParameter.endTime = ''
          }
          if(_this.inquireParameter.startTime == '' && _this.inquireParameter.endTime == ''){
            _this.inquireParameter.timetypeInfo = ''
          }
          if(_this.inquireParameter.region == ''){
            _this.inquireParameter.provinceOrCity = ''
          }
          let kkId = _this.inquireParameter.kkIdList;
          if(_this.classId != ''){
            kkId = _this.classId;
          }
          saveSearchCondition({
            msUserId: _this.inquireParameter.msUserId,
            kkId: kkId,
            condition: JSON.stringify(_this.inquireParameter)
          }).then(rel => {
            if (rel.data.status == '0') {
              _this.$message({
                type: 'success',
                customClass: 'ele_ui_tips_position',
                message: '设置成功！'
              });
            }else if(rel.data.status == '2000000'){
              _this.$message({
                type: 'success',
                customClass: 'ele_ui_tips_position',
                message: '保存失败！'
              });
            }
          }).catch(err => {
              console.log(err);
          });
        }).catch(err => {
//          _this.$message({
//            type: 'error',
//            customClass: 'ele_ui_tips_position',
//            message: '请求失败！'
//          });
        });
      }
    },
    mounted (){
      document.addEventListener('click', this.handleBodyClick);
      this.getCondition();
    },
    destroyed () {
      document.removeEventListener('click', this.handleBodyClick);
    }
  }
</script>
<style lang="less">
  .all_btn {
    width: 58px;
    height: 22px;
    border: 1px solid #AEAEAE;
    border-radius: 22px;
    -moz-border-radius: 22px;
    -webkit-border-radius: 22px;
    text-align: center;
    line-height: 22px;
    cursor: pointer;
    float: right;
    color: #6C6C6C;
    margin-right: 20px
  }
</style>
