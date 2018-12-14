<template>
  <div class="wary_chart" ref="watermarkWary">
    <yqzj-Head  funName="工作台" subname="工作统计"></yqzj-Head>
    <div class="center border_box">
      <!--搜索start-->
      <div class="cen_pub">
        <div class="cen_title">
           工作统计
        </div>
        <div class="built_top">
          <div class="search border_box">
            <ul class="clearfix_workbench">
              <li class="s_time border_box" :class="{hover:searchState == '0'}" @click.stop="searchTime('0')">
                <span class="work_date_title">上报时间</span><span class="hover">{{timeWz}}</span><i class="arrow"></i><span class="line">|</span>
              </li>
              <li class="s_time border_box" :class="{hover:searchState == '2'}" @click.stop="searchTime('2')">
                <span class="work_date_title">舆情状态</span><span class="hover">{{dimensionWz}}</span><i class="arrow"></i>
              </li>
            </ul>
            <!-- 上报时间 -->
            <div class="searchTimeWary border_box" v-show="showTime" @click.stop="">
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
            <!-- 舆情状态 -->
            <div class="searchTimeWary border_box" v-show="showDimension" @click.stop="">
              <a href="javascript:void(0)" :class="{hover:dataParameter.status === null}" @click.stop="setSentimentRange('','全部')">全部</a>
              <a href="javascript:void(0)" :class="{hover:dataParameter.status == '0'}" @click.stop="setSentimentRange('0','未审批')">未审批</a>
              <a href="javascript:void(0)" :class="{hover:dataParameter.status == '1'}" @click.stop="setSentimentRange('1','通过')">通过</a>
              <a href="javascript:void(0)" :class="{hover:dataParameter.status == '2'}" @click.stop="setSentimentRange('2','未通过')">未通过</a>
            </div>
          </div>
          <div style="clear: both;"></div>
        </div>
      </div>
      <!--搜索end-->
      <!--舆情涉事地域统计start-->
      <div class="cen_pub cen_pub16">
        <div class="title">舆情涉事地域统计</div>
        <div class="chart">
          <echarts :chartData="territoryInfo" ref="territoryChart"  myechart="myechart_yqdy"></echarts>
        </div>
      </div>
      <!--舆情涉事地域统计end-->
      <!--舆情报送单位统计start-->
      <div class="cen_pub cen_pub16">
        <div class="title">舆情报送单位统计</div>
        <div class="chart">
          <echarts :chartData="builtInfo" ref="builtChart" myechart="myechart_yqbs"></echarts>
        </div>
      </div>
      <!--舆情报送单位统计end-->
      <!--舆情整体走势统计start-->
      <div class="cen_pub cen_pub16">
        <div class="title">舆情整体走势统计
          <p class="p1">
            <el-dropdown trigger="click" @command="yqzsTypetime">
              <span class="el-dropdown-link">
                {{yqzsWz}} <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu   slot="dropdown">
                <el-dropdown-item command="1">按上报时间统计</el-dropdown-item>
                <el-dropdown-item command="2">按发布时间统计</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </p>
        </div>
        <div class="chart">
          <echarts :chartData="yqztInfo" ref="yqzsChart" myechart="myechart_yqzs"></echarts>
        </div>
      </div>
      <!--舆情整体走势统计end-->
      <!--饼图start-->
      <div class="cen_pub_warys">
        <div class="cen_pub cen_pub16 pie_left">
          <div class="title">舆情分类统计</div>
          <div class="chart">
            <echarts :chartData="yqClassInfo" ref="yqClassInfoEcharts" myechart="myechart_class"></echarts>
          </div>
        </div>
        <div class="cen_pub cen_pub16 pie_right">
          <div class="title">媒体类型统计</div>
          <div class="chart">
            <echarts :chartData="yqMediaInfo" ref="mediaEcharts" myechart="myechart_yqmt"></echarts>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <!--饼图end-->
    </div>
    <yqzj-Footer></yqzj-Footer>
  </div>
</template>
<script>
  import yqzjHead from '../../components/header.vue'
  import yqzjFooter from '../../components/footer.vue'
  import echarts from '../../components/echarts.vue'
  import Watermark from '../../js/watermark'
  import {
    getRegionCount,
    getMediaCount,
    getDimenCount,
    getTrendOfPubOpi,
    getOrgCount
  } from '../../service/built'
  export default {
    data(){
      return {
        dataHover: false,               //选择自定义日期hover态
        showDate: false,                //是否日历
        chooseSTime: '',                //开始时间
        chooseETime: '',                //结束时间
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        searchState: '', //设置点击哪个筛选 0 上报时间  2 舆情分类
        timeWz: '近7天',                 //搜索时间文字  默认是不限
        dimensionWz: '全部',            //搜索舆情分类文字  默认是全部
        yqzsWz: '按上报时间统计',            //搜索舆情分类文字  默认是全部
        showTime: false,                //是否显示选择时间的下拉菜单
        showDimension: false,           //是否显示舆情分类
        oldTime: '7day',           //是否显示舆情分类
        dataParameter:{
          status:null,           //状态: 0待审批，1已通过，2未通过
          time:'7day',        //时间： 1day：当天，3day：3天内，7day：7天内
          sTime:'',
          eTime:'',
          timeType:1,
          groupId:this.$store.state.generalGroupId,              // 集团id
          orgId: this.$store.state.orgId                         //组织id
        },
        //地域数据
        territoryInfo:{
          valueData:[],
          nameData:[],
          type:'bar'
        },
        //舆情报送单位数据
        builtInfo:{
          valueData:[],
          nameData:[],
          type:'bar'
        },
        //舆情整体走势
        yqztInfo:{
          valueData:[],
          nameData:[],
          type:'line'
        },
        //舆情分类统计
        yqClassInfo:{
          legendData:[],
          seriesData:[],
          type:'pie'
        },
        //舆情媒体统计
        yqMediaInfo:{
          legendData:[],
          seriesData:[],
          type:'pie'
        }
      }
    },
    components: {
      yqzjHead,
      yqzjFooter,
      echarts
    },
    methods:{
      //舆情走势切换类型
      yqzsTypetime(command){
        if (this.dataParameter.timeType != command) {
          this.dataParameter.timeType = command;
          if (command == 1) {
            this.yqzsWz = '按上报时间统计';
          }
          if (command == 2) {
            this.yqzsWz = '按发布时间统计';
          }
          this.trendOfPubOpi();
        }
      },
      //筛选时间
      setTime(time,wz){
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
      //舆情状态
      setSentimentRange(s,info){
        this.dimensionWz = info;
        this.dataParameter.status = s;
        if(this.dataParameter.status == ''){
          this.dataParameter.status = null;
        }
        this.getData();
        this.showDimension = false;
        this.searchState = ''; //重置hover态
      },
      // 获得数据
      getData(){
        this.getTerritoryCharts();   //地域统计
        this.dimenCount();   //分类统计
        this.mediaCount();   //媒体类型统计
        this.orgCount();   //报送单位
        this.trendOfPubOpi();   //获取舆情整体走势统计
      },
      selectDate(){
        this.oldTime = this.dataParameter.time; //处理点击其他按时间选择时引起的问题
        this.dataParameter.time = '7day';
        this.showDate = true;
        this.dataHover = true;
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
          this.dataParameter.time = '7day';
          this.dataHover = true;
        }else{
          this.dataParameter.time = this.oldTime; //解决选择自定义时间出现的bug
          this.dataHover = false;
        }
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
        }else if(s == '2'){ //舆情分类
          this.showTime = false;
          this.showMediaType = false;
          this.showDimension = true;
        }
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
            _this.dataParameter.time = '7day';
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
            _this.dataParameter.time = '7day';
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
      //涉事地域统计
      getTerritoryCharts(){
        let _this = this;
        _this.dataParameter.regionPId = this.$store.state.provinceId;
        _this.dataParameter.regionType = '1';
        getRegionCount(_this.dataParameter).then(rel=>{
          let thenData = rel.data.result.data;
          _this.territoryInfo.valueData = thenData.data;
          _this.territoryInfo.nameData = thenData.nameData;
          _this.$refs.territoryChart.createEcharts();
        }).catch(err=>{
          console.log(err);
        })
      },
      //媒体统计
      mediaCount(){
        let _this = this;
        getMediaCount( _this.dataParameter).then(rel=>{
          let thenData = rel.data.result.data;
          _this.yqMediaInfo.legendData = thenData.nameData;
          _this.yqMediaInfo.seriesData = thenData.data;
          _this.$refs.mediaEcharts.createEcharts();
        }).catch(err=>{
            console.log(err);
        })
      },
      //舆情分类统计
      dimenCount(){
        let _this = this;
        getDimenCount(_this.dataParameter).then(rel=>{
          let thenData = rel.data.result.data;
          _this.yqClassInfo.legendData = thenData.nameData;
          _this.yqClassInfo.seriesData = thenData.data;
          _this.$refs.yqClassInfoEcharts.createEcharts();
        }).catch(err=>{
            console.log(err);
        });
      },
      //舆情报送单位统计
      orgCount(){
        let _this = this;
        getOrgCount(_this.dataParameter).then(rel =>{
          let thenData = rel.data.result.data;
          _this.builtInfo.valueData = thenData.data;
          _this.builtInfo.nameData = thenData.nameData;
          _this.$refs.builtChart.createEcharts();
        }).catch(err=>{
          console.log(err);
        })
      },
      //获取舆情整体走势统计
      trendOfPubOpi(){
        let _this = this;
        getTrendOfPubOpi(_this.dataParameter).then(rel=>{
          let thenData = rel.data.result.data;
          _this.yqztInfo.valueData = thenData.data;
          _this.yqztInfo.nameData = thenData.nameData;
          _this.$refs.yqzsChart.createEcharts();
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    mounted(){
      let username = this.$store.state.userinfo_name;
      let account = this.$store.state.account.substr(7,4);
      Watermark.set(username+"  "+account,this.$refs.watermarkWary);
      document.addEventListener('click', this.handleBodyClick);
      this.getData();
    },
    destroyed () {
      document.removeEventListener('click', this.handleBodyClick);
    },
  }
</script>
<style scoped>
  .wary_chart .center{
    width: 94%;
    margin: 88px auto 30px;
    border-radius: 4px;
    position: relative;
  }
  .cen_pub_warys{max-width:1600px;margin: 0 auto;}
  .cen_pub{max-width:1600px;margin: 0 auto;background-color: #fff;border-radius: 4px;}
  .cen_pub16{margin: 16px auto 0;}
  .pie_left{width: 49.5%;float:left;}
  .pie_right{width: 49.5%;float:right;}
  .cen_pub .title{width: 96%;margin: 0 auto;padding:16px 0;font-size: 14px;color:#333;border-bottom:1px solid #e5e5e5;}
  .cen_pub_warys .title{width: 92%;}
  .cen_pub .cen_title{height: 42px;text-indent: 24px;line-height: 42px;font-size: 14px;color:#333;border-bottom:1px solid #e5e5e5;}
  .cen_pub .chart{width: 96%;margin: 20px auto 0px;padding-bottom: 20px;}
  .cen_pub .title .p1{width: 140px;float:right;cursor: pointer;}
  .cen_pub .title .p1 select{width: 100px;height: 20px;}
  /*搜索*/
  .wary_chart .center .built_top .search {
    width: 100%;
    padding: 20px 30px;
    background-color: #fff;
    position: relative;
    padding: 0;
  }
  .wary_chart .center .built_top .search ul {
    margin: 0 0 0 12px;
  }
  .wary_chart .center .built_top .search ul li {
    float: left;
    font-weight: normal;
    cursor: pointer;
    position: relative;
    width: auto;
    margin: 10px 0;
    padding: 10px 12px 10px 12px;
    z-index: 20;
    line-height: 20px;
  }
  .wary_chart .center .built_top .search ul li:nth-child(1) {
    width: auto;
  }
  .wary_chart .center .built_top .search ul li span.hover{
    color: #333;
    margin: 0 8px;
    font-size: 14px;
  }
  .wary_chart .center .built_top .search ul li span,
  .wary_chart .center .built_top .search ul li i {
    float: left;
  }
  .wary_chart .center .built_top .search ul li.hover {
    border: 1px solid #e6e6e6;
    border-bottom: 1px solid #fff;
    padding:10px 12px 10px 12px;
  }
  .wary_chart .center .built_top .search ul li span.work_date_title {
    color: #999;
    font-size: 12px;
  }
  .wary_chart .center .built_top .search ul li .arrow{
    display: inline-block;
    width: 6px;
    height: 6px;
    background: url('../../assets/browse/icon_dow.png') no-repeat;
    background-size: 100%;
    margin-top: 8px;
  }
  .wary_chart .center .built_top .search ul li .line {
    margin-left: 10px;
    color: #dadada;
    display: none;
  }
  .wary_chart .center .built_top .search .searchTimeWary {
    position: absolute;
    background-color: #fff;
    font-weight: normal;
    color: #333;
    border: 1px solid #e6e6e6;
    padding: 0px 0 5px;
    top: 51px;
    left: 0px;
    right: 0px;
    z-index: 18;
  }
  .wary_chart .center .built_top .search .searchTimeWary a {
    display: inline-block;
    height: auto;
    font-size: 14px;
    line-height: 44px;
    text-indent: 15px;
    color: #999;
    padding-left: 12px;
  }
  .wary_chart .center .built_top .search .searchTimeWary a:hover,
  .wary_chart .center .built_top .search .searchTimeWary a.hover {
    background-color: transparent;
    color: #333;
  }
  .wary_chart .center .built_top .search .searchTimeWary .built_time{
    width: 156px;
    border: 1px solid #cccccc;
    height: 30px;
    display: block;
    margin: 10px auto 0;
    border-radius: 4px;
    text-align: center;
  }
  .wary_chart .center .built_top .search .searchTimeWary .time_box {
    margin-left: 15px;
    margin-bottom: 10px;
  }
</style>
