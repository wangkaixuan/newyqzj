<template>
	<div class="wrap">
		<yqzj-Head></yqzj-Head>
		<div class="center">
			<div class="info_detail_box clearfix">
				<div class="info_detail_left fl">
					<h1 class="info_detail_title">{{datailInfo.kvTitle}}</h1>
					<div class="information">
						<span class="info_time">{{datailInfo.krCtime}}</span>
						<span class="info_source">来源：{{datailInfo.kvSite}}</span>
            <span class="info_author">作者：{{datailInfo.kvAuthor}}</span>
            <span class="info_forward_num">转发数：{{sameInfoNum}}</span>
						<span class="info_tendency">倾向性：
              <span class="zheng" v-if="datailInfo.orientation == 1">正面</span>
              <span class="fu" v-if="datailInfo.orientation == 2">负面</span>
              <span class="zhong" v-else="datailInfo.orientation == 3">中性</span>
            </span>
					</div>
          <div class="info_url">
            <span class="url">原文链接:</span>
            <a :href="datailInfo.kvUrl">{{datailInfo.kvUrl}}</a>
            <span class="copy_url">复制链接</span>
          </div>
          <div class="info_datail_content clearfix">
            <div class="pic_wrap fl">
              <ul>
                <li class="copy_info">
                  <div class="infomation_info">【舆情报告】 2018-08-15 10:44:57　新浪微博网民“用户6586838459” 发布“转发微博 @y16405 看到一些言论说斐讯倒了，这么一个五百强企业就因为零元购及<font color="#ff0000">理财</font>，说倒旧倒了？旧股份卖了多少钱，股东每年分红利有多少，公示一下吧，估计也是赚的盆满钵满。新股东入主恐怕是出来挽回自”　截止到目前该消息评论：0 转发：14　http://weibo.com/6586838459/GuJ4jF9XY</div>
                  <a href="javascript:void(0)" class="copy_infomation" title="复制信息"><i></i>复制信息</a>
                </li>
                <li class="briefings">
                  <a href="javascript:void(0)" class="add_brief" title="加入简报"><i></i>加入简报</a>
                </li>
                <li class="warning">
                  <a href="javascript:void(0)" class="add_warning" title="加预警"><i></i>加预警</a>
                </li>
                <li class="attention">
                  <a href="javascript:void(0)" class="add_attention" title="加关注"><i></i>加关注</a>
                </li>
                <li class="topic">
                  <a href="javascript:void(0)" class="add_topic" title="加入话题"><i></i>加话题</a>
                </li>
                <li class="report">
                  <a href="javascript:void(0)" class="report_info" title="上报信息"><i></i>上报</a>
                </li>
                <li class="orientation">
                  <a href="javascript:void(0)" class="modify_orientation"><i></i>改倾向性</a>
                  <ul>
                    <li class="one"><a href="javascript:void(0)" title="标为负面">标为负面</a></li>
                    <li class="two"><a href="javascript:void(0)" title="标为中性">标为中性</a></li>
                    <li class="three"><a href="javascript:void(0)" title="标为正面">标为正面</a></li>
                  </ul>
                </li>
                <li class="delete">
                  <a href="javascript:void(0)" class="del_info" title="删除"><i></i>删除</a>
                </li>
                <li class="share">
                  <a href="javascript:void(0)" class="share_info"><i></i>分享</a>
                  <ul>
                    <li class="kongjian"><a href="javascript:void(0)">腾讯QQ</a></li>
                    <li class="weixin"><a href="javascript:void(0)">微信</a></li>
                    <div class="wxkuang">
                      <div class="wxshare">
                        <img src="../../assets/browse/download.png" />
                      </div>
                      <p>用微信扫描二维码</p>
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="content_wrap fr">
              <p>{{detailContent}}</p>
            </div>
          </div>
          <div class="event_tips"><span>*</span> 舆情秘书和网页<i>http://weibo.com/6586838459/GuJ4jF9XY</i>的作者无关，不对其内容负责。</div>
				</div>
				<div class="info_detail_right fr">
          <div class="same_info keyword">
            <div class="title clearfix"><b></b>涉及关键词<span class="close" v-bind:class="{open:keywordsArrow.isOpen}" @click="slideKeyword">{{keywordsArrow.text}}</span></div>
            <div class="keyword_content"  v-for="item,i in keywords" v-show="!keywordsArrow.isOpen">
              <a href="javascript:void(0)" class="keywordList" >{{item}}</a>
            </div>
          </div>
          <div class="same_info special">
            <div class="title clearfix"><b></b>涉及专题<span class="close" v-bind:class="{open:specialsArrow.isOpen}" @click="slideSpecial">{{specialsArrow.text}}</span></div>
            <div class="special_content" v-for="item,i in specials" v-show="!specialsArrow.isOpen">
              <router-link  tag="a" :to="{path: 'browse', query: { tid : item.kkType, sid : item.ksId , kkname: item.kkName}}" target="_blank" title="item.route">{{item.kkName}}</router-link>
              <!-- <a href="/Browse/index?tid=01&amp;sid=7bd1597f62ed450daf7443952d32b8dd&amp;kkname=投资理财" target="_blank" class="" :title="item.route">{{item.kkName}}</a> -->
            </div>
          </div>
          <div class="same_info">
            <div class="title clearfix"><b></b>相同信息（<span class="hotname">{{sameInfoNum}}条</span>）
              <a class="daochu" href="/Browse/getSameInfoExcel?shareid=&amp;kvuuid=7139f8b0a03511e887c40242ac11000c">导出</a>
            </div>
            <ul>
              <li class="">
                <span>首发</span>
                <a class="firsttitle" href="http://weibo.com/6586838459/GuJ4jF9XY" target="_blank">【新浪微博】</a>
                <span>2018-08-13 15:40</span>
              </li>
              <li class="list" v-for="item,i in sameList">
                <router-link  tag="a" :to="{path: 'infoDetail', query: { krUuid : item.krUuid, msUserId : $store.state.msUserId , shareMsUserId: $store.state.shareMsUserId }}" target="_blank"><i></i>{{item.kvTitle}}</router-link>
                <!-- <a href="/Browse/infoDetail?uuid=2a2787489f0f11e8ad3d0242ac110035&amp;tid=01&amp;message=&amp;state=xx&amp;type=&amp;sourcetype=04&amp;kvHot=14&amp;shareid=&amp;kktype=&amp;classid=" target="_blank"><i></i>转发微博 @y16405 看到一些言论说斐讯倒了，这么一个五百强企业就因为零元购及理财，说倒旧倒了？旧股份卖了多少钱，股东每年分红利有多少，公示一下吧，估计也是赚的盆满钵满。新股东入主恐怕是出来挽回自</a> -->
                <span>{{item.krCtime}}</span>
                <span>{{item.kvSite}}</span>
              </li>
            </ul>
          </div>
        </div>
			</div>
			<div class="clear"></div>
		</div>
		<yqzj-Footer></yqzj-Footer>
	</div>
</template>
<script>
import yqzjHead from '../../components/header.vue'
import yqzjFooter from '../../components/footer.vue'
import VueCookies from 'vue-cookies'
import {getBrowseDetail} from '../../service/browse'

export default {
	data() {
	    return {
	    	keywordsArrow: {
          text: '收起',
          isOpen: false
        },
        specialsArrow: {
          text: '收起',
          isOpen: false
        },
        datailInfo: {},    // 头部信息
        detailContent: '', //内容
        sameInfoNum: 0,    //相同信息条数 
        keywords: [],      //涉及关键词
        specials: [],      //涉及专题
        sameList: []       //相同信息列表
	    }
    },
    components:{
	    yqzjHead,
	    yqzjFooter,
	},
  methods: {
    //展开关闭关键词
  	slideKeyword(){
      this.keywordsArrow.isOpen = !this.keywordsArrow.isOpen;
      if(this.keywordsArrow.isOpen){
        this.keywordsArrow.text = '展开';
      }else{
        this.keywordsArrow.text = '收起';
      }
    },
    //展开关闭专题
    slideSpecial(){
      this.specialsArrow.isOpen = !this.specialsArrow.isOpen;
      if(this.specials.isOpen){
        this.specialsArrow.text = '展开';
      }else{
        this.specialsArrow.text = '收起';
      }
    }
  },
  mounted (){
  	let _this = this;
    let query = this.$route.query;//获取链接 ？ 之后的参数
    console.log('-------query val--------');
    console.log(query);
  	let data = {
      krUuid: query.krUuid,
  		msUserId: query.msUserId,
  		shareMsUserId: query.shareMsUserId
  	}
    //获取舆情浏览详情页
    getBrowseDetail(data).then(function (res) {
    	console.log('---------获取舆情浏览详情页-------------');
    	console.log(res);
      let result = res.data.result.data;
      if(result){
        _this.sameInfoNum = result.DetailReloadNum;
        _this.datailInfo = result.validationRef;
        _this.detailContent = result.detailInfoCnt;
        _this.keywords = result.validationRef.kvKeyWord.split(",");
        _this.specials = result.relationTopicList;
        _this.sameList = result.sameInfoList;
      }else{
        console.log('没有返回值');
      }
    }).catch(err=>{
      console.log(err,'请求失败！');
    });
  }
}
</script>
<style lang="less">
.clearfix:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.clearfix {
  //overflow: auto;
  zoom: 1; /* For IE 6/7 (trigger hasLayout) */
}
.fl {
  float: left;
}
.fr {
  float: right;
}
a:hover {
  text-decoration: none;
}
.border_box {
	box-sizing:border-box;
	-moz-box-sizing:border-box; /* Firefox */
	-webkit-box-sizing:border-box; /* Safari */
}
.wrap {
  background-color: #f2f2f2;
  width: 100%;
  /*min-width: 980px;*/
  min-width: 1100px;
}
.center {
  margin: 75px auto 30px;
  width: 90%;
  min-height: 500px;
  position: relative;
  max-width: 1600px;
  font-family: Avenir,Helvetica,Arial,sans-serif;
}
.info_detail_left {
  width: 80%;
  background: #fff;
  overflow: hidden;

  .info_detail_title {
  	padding: 0 150px;
    box-sizing: border-box;
    width: 100%;
    height: 90px;
    font-size: 22px;
    color: #2b2727;
    text-align: center;
    line-height: 90px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .information {
    color: #666;
    font-size: 12px;
    height: 25px;
    line-height: 25px;
    padding-left: 30px;

    span {
      margin-right: 30px;
    }
    .info_time {

    }
    .info_source {
      
    }
    .info_author {
      
    }
    .info_forward_num {
      
    }
    .info_tendency {
      .zheng {
        color: #00b2e6;
      }
      .fu {
        color: #ed3e4a;
      }
      .zhong {
        color: #ffa741;
      }
    }
  }
  .info_url {
    color: #666;
    font-size: 12px;
    height: 25px;
    line-height: 25px;
    word-break: break-all;
    word-wrap: break-word;
    padding: 0 30px 14px;
    span {
      //margin-right: 30px;
    }
    a {
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 80%;
      display: inline-block;
      vertical-align: middle;
    }
    .copy_url {
      color: #1B9FDE;
      cursor: pointer;
      display: none;
    }

  }
  .info_datail_content {
    .pic_wrap {
      width: 100px;
      margin-top: 10px;
      margin-left: 30px;
      .infomation_info {
        display: none;
      }
      ul {
        li {
          a {
            width: 100%;
            height: 60px;
            display: block;
            border-bottom: 1px solid #e5e5e5;
            position: relative;
            text-indent: 38px;
            line-height: 60px;
            color: #2b2727;
            font-size: 14px;
            cursor: pointer;
            i {
              display: block;
              width: 30px;
              height: 30px;
              background: url('../../assets/browse/browsedetail.png') no-repeat;
              position: absolute;
              top: 15px;
              left: 0;
            }
          } 
          .copy_infomation {
            i {
              //background: url('../../assets/browse/browsedetail.png') no-repeat;
            }
          }
          .add_brief {
            i {
              background-position: -45px 0;
            }
          }
          .add_warning {
            i {
              background-position: -90px 0;
            }
          }
          .add_attention {
            i {
              background-position: -135px 0;
            }
          }
          .add_topic {
            i {
              background-position: -180px 0;
            }
          }
          .report_info {
            i {
              background-position: -225px 0;
            }
          }
          .modify_orientation {
            i {
              background-position: -270px 0;
            }
          }
          .del_info {
            i {
              background-position: -315px 0;
            }
          }
          .share_info {
            i {
              background-position: -360px 0;
            }
          }
        }
        .orientation {
          width: 100%;
          height: 61px;
          position: relative;
          ul {
            display: none;
            width: 100px;
            position: absolute;
            z-index: 11;
            top: -18px;
            left: 100px;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            background: #fff;
            li {
              width: 100%;
              height: 30px;
              line-height: 30px;
              a {
                display: block;
                height: 30px;
                line-height: 30px;
                border-bottom: none;
                text-indent: 0;
                text-align: center;
                &:hover {
                  color: #38a9e1;
                  background: #f3f3f3;
                }
              }
            }
            .one {

            }
            .two {

            }
            .three {
              
            }
          }
          &:hover {
            ul {
              display: block;
            }
          }
        }
        .share {
          width: 100%;
          height: 61px;
          position: relative;
          ul {
            display: none;
            width: 100px;
            position: absolute;
            z-index: 11;
            top: -1px;
            left: 76px;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            background: #fff;
            li {
              width: 100%;
              height: 30px;
              line-height: 30px;
              a {
                display: block;
                height: 30px;
                line-height: 30px;
                border-bottom: none;
                text-indent: 16px;
                text-align: left;
                &:hover {
                  color: #38a9e1;
                  background: #f3f3f3;
                }
              }
              &.weixin:hover + .wxkuang {
                display: block;
              }
            }
          }
          &:hover {
            ul {
              display: block;
            }
          }

          .wxkuang {
            display: none; 
            width: 220px;
            height: 240px;
            position: absolute;
            top: -120px;
            left: 103px;
            background: url('../../assets/browse/weixin_k.jpg') no-repeat;
            background-size: 100%;
            padding-left: 25px;
            padding-top: 10px;
            box-sizing: border-box;
            .wxshare {
              img {
                display: block;
                width: 180px;
                height: 180px;
              }
            }
            p {
              width: 100%;
              padding-left: 34px;
              box-sizing: border-box;
              margin-top: 10px;
              font-size: 14px;
              color: #b2b2b2;
            }
          }
        }
        //暂时不做
        .copy_info,.briefings,.warning,.attention,.topic,.orientation,.share {
          display: none;
        }
      }
    }
    .content_wrap {
      width: 85%;
      line-height: 28px;
      font-size: 14px;
      margin-top: 20px;
      margin-right: 40px;
      min-height: 510px;
      p {
        word-break: break-all;
      }
    }
  }
  .event_tips {
    width: 96%;
    margin: 20px auto 0;
    border-top: 1px solid #e9e9e9;
    font-size: 12px;
    color: #999;
    padding: 20px 0 20px 140px;
    box-sizing: border-box;
    span {
      color: #ee545d;
    }
  }
}
.info_detail_right {
  width: 19%;
  background: #fff;
  float: right;

  .same_info {
    padding-top: 10px;
    box-sizing: border-box;
    .title {
      position: relative;
      height: 36px;
      line-height: 36px;
      font-size: 15px;
      color: #333;
      font-weight: 700;
      b {
        width: 4px;
        height: 14px;
        background: #38a9e1;
        margin: 11px 8px 0 14px;
        display: block;
        float: left;
      }
      .close {
        position: absolute;
        top: 0;
        right: 18px;
        width: 38px;
        color: #666;
        font-size: 12px;
        font-weight: 400;
        cursor: pointer;
        background: url('../../assets/browse/close.png') 24px 12px no-repeat;
      }
      .open {
        background: url('../../assets/browse/open.png') 24px 12px no-repeat;
      }
      .hotname {
        display: inline-block;
        color: #ffa741;
      }
      .daochu {
        float: right;
        width: 34px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        margin: 8px 14px 0 0;
        border: 1px solid #999;
        border-radius: 2px;
        font-size: 12px;
        color: #999;
        display: none;//暂时不做
      }
    }
    .keyword_content,
    .special_content {
      box-sizing: border-box;
      a {
        display: inline-block;
        font-size: 14px;
        max-width: 168px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .keyword_content {
      padding: 12px 14px 4px;
      
      .keywordList {
        margin: 0 6px 15px 0;
        height: 28px;
        line-height: 28px;
        padding: 0 6px;
        color: #666;
        &:nth-of-type(6n+1) {
          background: #efe7f9;
        }
        &:nth-of-type(6n+2) {
          background: #f3eae8;
        }
        &:nth-of-type(6n+3) {
          background: #eaedfb;
        }
         &:nth-of-type(6n+4) {
          background: #e5f2f9;
        }
         &:nth-of-type(6n+5) {
          background: #e5faee;
        }
         &:nth-of-type(6n+6) {
          background: #f0efe6;
        }
      }
    }
    .special_content {
      padding: 12px 14px 2px;
      a {
        margin: 0 16px 15px 0;
        height: 24px;
        line-height: 24px;
        padding: 0 6px;
        border-radius: 12px;

        &:nth-of-type(3n+1) {
          border: 1px solid #55c79c;
          color: #55c79c;
        }
        &:nth-of-type(3n+2) {
          border: 1px solid #6a8db6;
          color:#6a8db6;
        }
        &:nth-of-type(3n+3) {
          border: 1px solid #f37067;
          color:#f37067;
        }

      }
    }
    ul {
      overflow-y: auto;
      padding: 9px 14px 18px;
      max-height: 346px;
      
      li {
        height: 60px;
        overflow: hidden;
        border-bottom: 1px dotted #dbdbdb;

        span {
          font-size: 12px;
          color: #999;
          height: 32px;
          line-height: 32px;
          &:first-of-type {
            float: left;
            margin-left: 11px;
          }
          &:last-of-type {
            float: right;
            max-width: 40%;
            text-align: right;
          }
        }
        a {
          width: 100%;
          line-height: 20px;
          display: block;
          font-size: 14px;
          color: #333;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          &.firsttitle {
            width: 100%;
            height: 32px;
            line-height: 32px;
            display: block;
            padding-left: 40px;
            box-sizing: border-box;
          }
        }

        &:first-of-type {
          position: relative;
          span:first-of-type {
            display: inline-block;
            margin-left: 0;
            color: #ed404c;
            font-size: 12px;
            border: 1px solid #ed404c;
            width: 30px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 8px;
            position: absolute;
            left: 4px;
            top: 8px;
          }
          span:nth-of-type(2) {
            font-size: 14px;
            width: 100%;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
            padding-left: 40px;
            box-sizing: border-box;
          }
          span:last-of-type {
            display: block;
            height: 20px;
            line-height: 20px;
            color: #999;
            font-size: 12px;
            max-width: 80%;
          }
        }
        &.list {
          padding-top: 10px;
          box-sizing: border-box;
          a {
            i {
              display: inline-block;
              width: 12px;
              height: 12px;
              margin-right: 4px;
              background: url('../../assets/browse/simpic.png') no-repeat;
              vertical-align: middle;
            }
          }
        }
        &:hover {
          background: #f3f3f3;
        }
      }
    }
  }
  .keyword,
  .special {
    border-bottom: 1px solid #ddd;
  }
}

</style>