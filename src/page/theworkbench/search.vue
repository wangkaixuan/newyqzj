<template>
  <div class="built_top">
    <div class="classification clearfix_workbench border_box">
      <div class="nav_button border_box" :class="{hover:dataParameter.type == n.key}" @click="updateType(n.key)" v-for="n,i in navData">{{n.info}}</div>
    </div>
    <div class="workbench_title">
      <a href="javascript:void(0)" :class="{hover:dataParameter.status == itme.key}" @click="setNav(itme.key)" v-for="itme,i in searchitem">{{itme.info}}</a>
    </div>
    <div class="search border_box">
      <ul class="clearfix_workbench">
        <li class="s_time border_box" :class="{hover:searchState == '0'}" @click.stop="searchTime('0')">
          <span class="work_date_title">发起时间</span><span class="hover">{{timeWz}}</span><i class="arrow"></i><span class="line">|</span>
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
</template>
<script>
  /*
  *  dataParameter  参数
  *  searchData     查询
  *     key         查询key
  *     info        查询内容
  *
  * */
  import yqzjHead from '../../components/header.vue'
  import yqzjFooter from '../../components/footer.vue'
  import pubpaging from '../../components/pagination.vue'
  import {getAllTypeData} from '../../service/built'
  export default{
    data(){
      return {
        timeWz: '不限',                 //搜索时间文字
        showTime: false,                //是否显示选择时间的下拉菜单
        dataHover: false,               //选择自定义日期hover态
        showDate: false,                //是否日历
        chooseSTime: '',         			//开始时间
        chooseETime: '',         			//结束时间
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        searchState: '',                  //设置点击哪个筛选 0 上报时间 1媒体类型 2 舆情分类
        oldTime: '',  //状态 1day：当天，3day：3天内，7day：7天内，all ：不限  默认是不限
        navhover:'0',
        showMediaType: false,           //是否显示媒体类型
        mediaTypeArr: [],               //媒体类型
        showDimension: false,           //是否显示舆情分类
        sentimentTypeArr: [],           //舆情分类
        mediaTypeWz: '全部',            //搜索媒体类型文字  默认是全部
        dimensionWz: '全部',            //搜索舆情分类文字  默认是全部
      }
    },
    props: ['navData','searchitem','dataParameter'],
    methods:{
      selectDate(){
        this.oldTime = this.dataParameter.time; //处理点击其他按时间选择时引起的问题
        this.dataParameter.time = '';
        this.showDate = true;
        this.dataHover = true;
      },
      //设置上报时间
      setTime(s,info){
        this.$emit('searchData', {
          key:'time',
          val:s,
        });
        this.dataParameter.sTime = ''; //解决选择自定义时间出现的bug
        this.dataParameter.eTime = ''; //解决选择自定义时间出现的bug
        this.timeWz = info;
        this.showTime = false;
        this.dataHover = false;
        this.searchState = ''; //重置hover态
        this.oldTime = this.dataParameter.time; //解决切换tab时，上报时间展示
      },
      //设置媒体类型
      setMediaRange(type, wz){
        this.dataParameter.mediaType = type;
        this.mediaTypeWz = wz;
        this.$emit('searchData', {
          key:'mediaType',
          val:type
        });
        this.showMediaType = false;
        this.searchState = ''; //重置hover态
      },
      //设置舆情分类
      setSentimentRange(type, wz){
        this.dataParameter.dimension = type;
        this.dimensionWz = wz;
        this.$emit('searchData', {
          key:'dimension',
          val:type
        });
        this.showDimension = false;
        this.searchState = ''; //重置hover态
      },
      updateType(s){
        this.$emit('searchData', {
          key:'type',
          val:s
        })
      },
      setNav(s){
        this.$emit('searchData', {
          key:'status',
          val:s
        })
      },
      alertInfo(){
        this.$message({
          message: '此功能正在开发中,请耐心等待...',
          type: 'warning'
        });
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
           // _this.getData();
            this.$emit('searchData', {
              key:'sTime',
              sTime:startTime,
              eTime:endTime,
            });
            _this.showTime = false;
            //查询完之后清空之间的时间
            _this.chooseSTime = '';
            _this.chooseETime = '';
            _this.searchState = ''; //重置hover态
          }
        }
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
    mounted(){
      //获取处置建议、媒体类型、舆情分类列表
      this.getThreeData();
      document.addEventListener('click', this.handleBodyClick);
      if(this.dataParameter.type === 2){
        this.navhover = 0
      }else{
        this.navhover = 1
      }
    },
    destroyed () {
      //document.removeEventListener('click', this.handleBodyClick)
    },
  }
</script>
