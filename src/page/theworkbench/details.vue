<template>
  <div class="wary_details" ref="watermarkWary">
    <div class="detailsWary">
      <!--基本信息-->
      <h1>{{reportInfoData.title}}
        <!--<i v-if="reportInfoData.status == '0'" class="ioc3"></i>-->
        <!--通过-->
        <i v-if="status == '1' && (from == 'workbench' || from ==  'examine')" class="ioc1"></i>
        <!--上报页未通过-->
        <i v-if="status == '2' && from =='workbench'" class="ioc6"></i>
        <!--已撤回-->
        <i v-if="status == '3' && from =='workbench'" class="ioc4"></i>
        <!--审批未通过-->
        <i v-if="status == '2' && from =='examine'" class="ioc6"></i>
        <!--审批完成-->
        <i v-if="status == '4' && from =='examine'" class="ioc2"></i>
        <!--任务完成-->
        <i v-if="status == '3' && from =='task'" class="ioc2"></i>
        <!--抄送页 已批示-->
        <i v-if="status == '2' && from =='transact'" class="ioc5"></i>
      </h1>
      <div class="info">
        <ul class="jb_info">
          <li class="info_max">
            <label>媒体类型</label>
            <p :title="reportInfoData.mediaTypeName">{{reportInfoData.mediaTypeName}}</p>
          </li>
          <li class="info_max">
            <label>来源网站</label>
            <p :title="reportInfoData.source">{{reportInfoData.source}}</p>
          </li>
          <!--<li><label>作者</label><p>礼品</p></li>-->
          <li class="info_max">
            <label>发布时间</label>
            <p :title="reportInfoData.ctime">{{reportInfoData.ctime}}</p>
          </li>
          <!-- <li class="info_max">
            <label>上报时间</label>
            <p :title="reportInfoData.createTime">{{reportInfoData.createTime}}</p>
          </li> -->
          <li class="yh">
            <label>原文链接</label>
            <p :title="reportInfoData.url"><a :href="reportInfoData.url" target="_blank">{{reportInfoData.url}}</a></p>
          </li>
          <li class="yh" v-if="reportInfoData.content && reportInfoData.content.length > 0">
            <label class="label1">内容</label>
            <p :title="reportInfoData.content">{{reportInfoData.content}}</p>
          </li>
          <li class="info_max">
            <label>舆情分类</label>
            <p :title="reportInfoData.dimensionName">{{reportInfoData.dimensionName}}</p>
          </li>
          <li class="info_max">
            <label>涉事地域</label>
            <p :title="reportInfoData.city+'-'+reportInfoData.county" v-if="reportInfoData.city !== 'null' && reportInfoData.county !== 'null'">{{reportInfoData.city}}-{{reportInfoData.county}}</p>
            <p :title="reportInfoData.city" v-else-if="reportInfoData.city !== 'null' && reportInfoData.county === 'null'">{{reportInfoData.city}}</p>
            <p v-else></p>
          </li>
          <li class="info_max">
            <label>重要度</label>
            <p :title="reportInfoData.importanceName">{{reportInfoData.importanceName}}</p>
          </li>
        </ul>
      </div>
      <!--基本信息end-->
    </div>
    <!--记录-->
    <div class="logWary">
      <div class="log">
        <div class="title">详情记录</div>
        <div class="logInfo">
          <div class="line"></div>
          <div class="descWary" v-for="(item,i) in reportInfoData.approvers" v-if="reportInfoData.approvers != ''">
            <div class="desc_lefts">{{item.opeartTime}}</div>
            <div class="desc_rights">
              <div class="p1 newPsLog">
                <span class="light" :title="item.accountName">{{item.accountName}}</span> 
                <span class="dark">{{item.stateName}}</span> 
                <!-- 上报、下达任务、交办 多个人时展示 -->
                <p class="psry" v-if="item.approveUsersList.length <= 5">
                  <span class="light" v-for="(m,n) in item.approveUsersList"><span class="light_line" v-if="(n+1) > 1">| </span>{{m}}</span>
                </p>
                <p class="psry" v-if="item.approveUsersList.length > 5">
                  <span class="light" v-for="(m,n) in item.approveUsersList" v-show="n < 5"><span class="light_line" v-if="(n+1) > 1">|</span>{{m}}</span>
                  <span class="light" v-for="(m,n) in item.approveUsersList" v-show="n >= 5 && item.flag"><span class="light_line">|</span>{{m}}</span>
                  <span class="light"><span class="see_more" @click="seeMore2(item,i,reportInfoData.approvers)" v-show="!(item.flag)">更多...</span></span>
                </p>
              </div>
              <div class="p2">
                <span class="light">描述：</span>
                <span class="dark">{{item.approveContent}}</span>
              </div>
              <div class="p3" v-if="item.fileData.length > 0">
                <span class="light">附件：</span>
                <p class="files">
                  <span class="dark" v-for="file in item.fileData" @click="downloadFj(file.url,file.name)">{{file.name}}</span>
                </p>
              </div>
              <div class="p4" v-if="item.imagesSrc.length > 0">
                <span class="light">图片：</span>
                <p class="files">
                  <a :href="img.url" target="_blank"  v-for="img in item.imagesSrc"><img :src="img.url" /></a>
                </p>
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="log_end">
            <i></i>
            <!-- <p>结束</p> -->
          </div>
        </div>
        <div class="log_footer"></div>
      </div>
    </div>
    <div class="logWary" v-if="reportInfoData.batchProcessList && reportInfoData.batchProcessList.length > 0">
      <div class="log">
        <div class="title">批示记录</div>
        <div class="logInfo">
          <div class="line"></div>
          <div class="descWary" v-for="(item,i) in reportInfoData.batchProcessList">
            <div class="desc_lefts">{{item.approveTime}}</div>
            <div class="desc_rights">
              <div class="p1 newPsLog">
                <span class="light" :title="item.forwardUserName" v-if="item.approveType == 1">{{item.forwardUserName}}</span><!-- approveType ：1 转发 2 批示-->
                <span class="light" :title="item.approverUserName[0]" v-else>{{item.approverUserName[0]}}</span>
                <span class="dark" v-if="item.approveType == 1">{{item.approveTypeName}}给</span>
                <span class="dark" v-else>{{item.approveTypeName}}</span>
                <p class="psry" v-if="item.approveType == 1 && item.approverUserName.length <= 5">
                  <span class="light" v-for="(m,n) in item.approverUserName"><span class="light_line" v-if="(n+1) > 1">| </span>{{m}}</span>
                </p>
                <p class="psry" v-if="item.approveType == 1 && item.approverUserName.length > 5">
                  <span class="light" v-for="(m,n) in item.approverUserName" v-show="n < 5"><span class="light_line" v-if="(n+1) > 1">|</span>{{m}}</span>
                  <span class="light" v-for="(m,n) in item.approverUserName" v-show="n >= 5 && isOver"><span class="light_line">|</span>{{m}}</span>
                  <span class="light"><span class="see_more" @click="seeMore(item)" v-show="!isOver">更多...</span></span>
                </p>
              </div>
              <div class="p2"><span class="light">描述：</span><span class="dark">{{item.approvalcontent}}</span></div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="log_end">
            <i></i>
            <!-- <p>结束</p> -->
          </div>
        </div>
        <div class="log_footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getRestatementBuiltData,
    getSeeBuiltData
  } from '../../service/built'
  import {WindowLoc} from '../../service/api'
  import Watermark from '../../js/watermark'
  export default{
    data(){
      return {
        detailProps: {
          id: '',
          groupId: this.$store.state.generalGroupId,
        },
        status:'',
        from:'',
        isOver:'',
        reportInfoData: {},
      }
    },
    methods: {

      //下载附件
      downloadFj(url,name) {
        WindowLoc('/reportInfo/downLoadFile?fileName='+name+'&filePath='+url);
      },
      getDetailsInfo(){
        let _this = this;
        getSeeBuiltData(_this.detailProps).then(function (res) {
          if (res.data.result) {
            _this.reportInfoData = res.data.result.data;
            if (typeof _this.reportInfoData.approver === 'string') {
              _this.reportInfoData.approver = JSON.parse(_this.reportInfoData.approver);
            }
            if (typeof _this.reportInfoData.enclosures === 'string') {
              _this.reportInfoData.enclosures = JSON.parse(_this.reportInfoData.enclosures);
            }
            _this.reportInfoData.fileData = [];
            _this.reportInfoData.imagesSrc = [];
            if (_this.reportInfoData.enclosures.length > 0) {
              for (var i in _this.reportInfoData.enclosures) {
                if (_this.reportInfoData.enclosures[i].type == 1) {
                  //图片
                  _this.reportInfoData.imagesSrc.push(_this.reportInfoData.enclosures[i]);
                } else {
                  //附件
                  _this.reportInfoData.fileData.push(_this.reportInfoData.enclosures[i]);
                }
              }
            }
            //处理详细记录中的附件和图片
            if (_this.reportInfoData.approvers.length > 0) {
              for (var j in _this.reportInfoData.approvers) {
                if (typeof _this.reportInfoData.approvers[j].enclosures === 'string') {
                  _this.reportInfoData.approvers[j].enclosures = JSON.parse(_this.reportInfoData.approvers[j].enclosures);
                }
                _this.reportInfoData.approvers[j].imagesSrc = [];
                _this.reportInfoData.approvers[j].fileData = [];
                if (_this.reportInfoData.approvers[j].enclosures.length > 0) {
                  for (var n in _this.reportInfoData.approvers[j].enclosures) {
                    if (_this.reportInfoData.approvers[j].enclosures[n].type == 1) {
                      //图片
                      _this.reportInfoData.approvers[j].imagesSrc.push(_this.reportInfoData.approvers[j].enclosures[n]);
                    } else {
                      //附件
                      _this.reportInfoData.approvers[j].fileData.push(_this.reportInfoData.approvers[j].enclosures[n]);
                    }
                  }
                  // console.log(_this.reportInfoData.approvers[j].imagesSrc)
                }
              }
            }
            //处理更多功能 —— 添加标识
            for(let i in _this.reportInfoData.approvers){ 
              let list = _this.reportInfoData.approvers[i];
              list.flag = false;
            }
          } else {
            _this.$message({
              type: 'error',
              customClass: 'ele_ui_tips_position',
              message: '没有返回值'
            });
          }
        }).catch(err => {
          _this.$message({
            type: 'error',
            customClass: 'ele_ui_tips_position',
            message: '请求失败！'
          });
        });
      },
      //查看更多
      seeMore(item){
        if(item.approverUserName.length > 5){
          this.isOver = true;
        }
      },
      seeMore2(item,i,data){
        let _this = this;
        // 上报、下达任务、交办
        if(item.approveUsersList.length > 5){
          item.flag = true; 
          //需要主动通知vue
          this.$set(_this.reportInfoData.approvers[i],i,item.flag);
        }
      }
    },
    mounted(){
      let query = this.$route.query;  //获取链接 ？ 之后的参数
      this.detailProps.id = query.id;      //提交时使用
      this.from = query.from || '';           //位置
      this.status = query.status || '';      //状态
      this.getDetailsInfo();
      //水印
      let username = this.$store.state.userinfo_name;
      let account = this.$store.state.account.substr(7,4);
      Watermark.set(username+"  "+account,this.$refs.watermarkWary);
    }
  }
</script>
<style scoped>
  .wary_details {
    width: 100%;
    min-width: 960px;
  }

  .detailsWary {
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
    overflow: hidden;
  }

  .detailsWary h1 {
    font-size: 18px;
    width: 960px;
    text-align: center;
    display: block;
    margin: 40px auto 0;
    font-weight: bold;
    font-family: 黑体;
    position:relative;
  }
  .detailsWary > h1 > i{
    display: block;
    width: 68px;
    height: 56px;
    position:absolute;
    top:-20px;
    right: -25px;
  }
  .detailsWary > h1 > i.ioc1{background: url("../../images/details_ico1.png") no-repeat top left;}     /*通过*/
  .detailsWary > h1 > i.ioc2{background: url("../../images/details_ico2.png") no-repeat top left;}     /*完成*/
  .detailsWary > h1 > i.ioc3{background: url("../../images/details_ico3.png") no-repeat top left;}     /*未审核*/
  .detailsWary > h1 > i.ioc4{background: url("../../images/details_ico4.png") no-repeat top left;}     /*已撤回*/
  .detailsWary > h1 > i.ioc5{background: url("../../images/details_ico5.png") no-repeat top left;}     /*已批示*/
  .detailsWary > h1 > i.ioc6{background: url("../../images/details_ico6.png") no-repeat top left;}     /*未通过*/
  .detailsWary .info {
    width: 960px;
    display: block;
    margin: 16px auto 0;
    border-top: 1px solid #e5e5e5;
    overflow: hidden;
    padding: 18px 0;
  }

  .detailsWary .info .jb_info {
    width: 100%;
  }

  .detailsWary .info .jb_info li {
    width: 320px;
    float: left;
    font-size: 14px;
    font-family: 黑体;
    color: #333;
    line-height: 24px;
    overflow: hidden;
    padding-bottom: 4px;
    display: -webkit-flex;
    display: flex;
  }

  .detailsWary .info .jb_info li label {
    color: #999999;
    font-size: 12px;
    display: inline-block;
    /*float: left;*/
    width: auto;
    margin-right: 16px;
    width: 50px;
  }

  .detailsWary .info .jb_info li p {
    /*float: left;*/
    -webkit-box-flex: 1;
    flex: 1;
  }

  .detailsWary .info .jb_info li.yh {
    width: 100%;
    clear: both;
    float: none;
  }

  .detailsWary .info .jb_info li.yh .label1 {
    text-align: right;
  }

  .detailsWary .info .jb_info li.yh p {
    width: 90%;
  }

  .detailsWary .info .jb_info li.info_max p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .logWary {
    width: 100%;
    margin: 16px auto 0;
    background-color: #fff;
    overflow: hidden;
  }

  .logWary .log {
    width: 960px;
    display: block;
    margin: 0 auto;
  }

  .logWary .log .title {
    width: 100%;
    line-height: 46px;
    font-size: 14px;
    font-family: 黑体;
    border-bottom: 1px solid #e5e5e5;
  }

  .logWary .log .logInfo {
    width: 100%;
    position: relative;
    margin-top: 16px;
    overflow: hidden;
  }

  .logWary .log .logInfo .line {
    width: 2px;
    position: absolute;
    background: #e6e6e6;
    top: 0;
    bottom: 0;
    left: 65px;
    height: auto;
  }

  .logWary .descWary {
    position: relative;
    zoom: 1;
    width: 100%;
    margin-bottom: 24px;
  }

  .logWary .descWary .desc_lefts {
    width: 150px;
    color: #333;
    float: left;
    font-size: 14px;
    font-family: 黑体;
    background-color: #fff;
    padding: 8px 0;
  }

  .logWary .descWary .desc_rights {
    width: 730px;
    float: left;
    margin-top: 8px;
  }

  .logWary .descWary .desc_rights > div {
    font-size: 0px;
    font-family: 黑体;
    margin-top: 16px;
    overflow: hidden;
  }
  .logWary .descWary .desc_rights > div span {
    display: inline-block;
    font-size: 14px;
  }
  .logWary .descWary .desc_rights > div span.light_line {
    color: #cccccc;
    margin: 0 6px;
  }

  .logWary .descWary .desc_rights .p1 {
    margin-top: 0px;
    display: -webkit-flex;
    display: flex;
  }

  .logWary .descWary .desc_rights .p1 .light {
    color: #333;
    margin-right: 0px;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .logWary .descWary .desc_rights .p1 .dark {
    color: #33a7ff;
    margin: 0 16px;
  }
  .logWary .descWary .desc_rights .light {
    min-width: auto;
  }
  .logWary .descWary .desc_rights .p2 .light,
  .logWary .descWary .desc_rights .p3 .light,
  .logWary .descWary .desc_rights .p4 .light {
    color: #999999;
    font-size: 12px;
    display: block;
    float: left;
    width: auto;
    line-height: 20px;
  }
  .logWary .descWary .desc_rights .p2 .light {
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .logWary .descWary .desc_rights .p2 .dark {
    display: block;
    width: 644px;
    float: left;
    line-height: 20px;
  }

  .logWary .descWary .desc_rights .p3 {
    display: block;
    width: 100%;
    clear: both;
  }

  .logWary .descWary .desc_rights .p3 .dark {
    color: #33a7ff;
    cursor: pointer;
    margin-right: 12px;
  }

  .logWary .descWary .desc_rights .p4 .files {
    display: block;
    width: 88%;
    float: left;
  }

  .logWary .descWary .desc_rights .p4 .files a {
    display: inline-block;
    width: 80px;
    height: 67px;
    margin: 0 10px 10px 0;
  }

  .logWary .descWary .desc_rights .p4 .files a img {
    display: inline-block;
    width: 80px;
    height: 67px;
    border-radius: 4px;
  }
  .logWary .descWary .desc_rights .newPsLog{
    /*overflow: hidden;
    clear: both*/
    display: -webkit-flex;
    display: flex;
  }
  .logWary .descWary .desc_rights .newPsLog > span{
    display: inline-block;
    float:left;
  }
  .logWary .descWary .desc_rights .newPsLog > .psry{
    display: inline-block;
    float:left;
    width: 84%;
    line-height: 24px;
    margin-top: -4px;
    flex: 1;
  }
  .logWary .descWary .desc_rights .newPsLog > .psry .see_more{
    margin-left: 6px;
    color: #33a7ff;
    cursor: pointer;
    display: inline-block;
  }
  .log_end {
    position: absolute;
    bottom: 0px;
    left: 60px;
    clear: both;
  }

  .log_end i {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #fff;
    float: left;
    margin-top: 5px;
    border: 1px solid #e5e5e5;
  }

  .log_end p {
    float: left;
    color: #ff0000;
    font-size: 14px;
    font-family: 黑体;
    margin-left: 79px;
  }

  .log_footer {
    width: 100%;
    height: 26px;
  }

  @media screen  and (max-width: 1400px) {
    .logWary .descWary .desc_rights {
      /*width: 84%;*/
    }
    /*.logWary .descWary .desc_rights .newPsLog > .psry{width: 78%;}*/
  }
</style>
