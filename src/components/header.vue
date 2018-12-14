<template>
  <div class="header" :style="{left:'-'+scrollLeft+'px'}">
    <div class="logo_dls1" v-if="msUserId == '62816' || shareMsUserId == '62816'"></div>
    <div class="logo border_box" v-else>
      <div class="logo_img" v-show="defaultData.imgSrc != ''"><img :src="defaultData.imgSrc" /></div>
      <div class="logo_txt wid236" v-html="defaultData.content" v-if="defaultData.imgSrc != ''"></div>
      <div class="logo_txt wid300" v-html="defaultData.content" v-else></div>
    </div>
    <ul class="nav">
      <li v-for="nav,i in navData" v-if="nav.funName != '系统设置'">
        <el-dropdown class="change_size" v-if="nav.funName == '舆情监测'" trigger="hover" :show-timeout="showTime" :hide-timeout="showTime">
          <router-link tag="a" :to="{path:nav.funSonList[0].funUrl}" :class="{hover:nav.funName==funName}" v-if="nav.funSonList[0].funName == '舆情浏览'" @click.native="yqjcClick">{{nav.funName}}</router-link>
          <a :href="$store.state.oldyqzjUrl+nav.funSonList[0].funUrl"  v-else>{{nav.funName}}</a>
          <!-- <a :href="nav.funUrl" :class="{hover:nav.funName == funName}"  v-else>{{nav.funName}}</a> -->
          <el-dropdown-menu slot="dropdown" class="arrow_nav">
            <el-dropdown-item  v-for="item,i in nav.funSonList" :key="i">
              <router-link tag="a" :to="{path:item.funUrl}" :title="item.funName" :class="{hover:item.funName==subname}"
              v-if="item.funName == '舆情浏览'" @click.native="yqjcClick">{{item.funName}}</router-link>
              <a :href="$store.state.oldyqzjUrl+item.funUrl" :title="item.funName" class="border_box" v-else>{{item.funName}}</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown  class="change_size" v-else-if="nav.funName == '工作台'" trigger="hover" :show-timeout="showTime" :hide-timeout="showTime">
          <router-link tag="a" :to="{path:nav.funSonList[0].funUrl}" :class="{hover:nav.funName==funName}">{{nav.funName}}</router-link>
          <el-dropdown-menu slot="dropdown" class="arrow_nav">
            <el-dropdown-item  v-for="item,i in nav.funSonList" :key="i">
              <router-link tag="a" :to="{path:item.funUrl}" :title="item.funName" :class="{hover:item.funName==subname}">{{item.funName}}</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a :href="$store.state.oldyqzjUrl+nav.funUrl" v-else-if="nav.funName == '舆情导控'">{{nav.funName}}</a>
        <el-dropdown class="change_size" v-else trigger="hover" :show-timeout="showTime" :hide-timeout="showTime">
          <a :href="$store.state.oldyqzjUrl+nav.funSonList[0].funUrl">{{nav.funName}}</a>
          <el-dropdown-menu slot="dropdown" class="arrow_nav">
            <el-dropdown-item  v-for="item,i in nav.funSonList" :key="i">
              <a :href="$store.state.oldyqzjUrl+item.funUrl" :title="item.funName" class="border_box">{{item.funName}}</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
    <div class="userinfo_box">
      <!-- 未来会用到搜索 -->
      <div class="search_box">
        <!-- <el-input placeholder="请输入内容" v-model="searchval" size="mini">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
        <input type="text" name="search_all" class="search_all"><span class="search_btn" @click="alertInfo"></span>
      </div>
      <div class="user_box">
        <!--{{nav.funSonList[0].funUrl}}-->
        <!-- <a :href="$store.state.oldyqzjUrl+setUrlInfo" v-if="set_issHow "  class="sys_setup" title="系统设置"></a> -->
        <a :href="$store.state.oldyqzjUrl+setUrlInfo" v-if="set_issHow && setUrlInfo != 'updatelogo'"  class="sys_setup" title="系统设置"></a>
        <router-link tag="a" :to="{path:setUrlInfo}" class="sys_setup" title="系统设置" v-show="set_issHow" v-else-if="set_issHow && setUrlInfo == 'updatelogo'"></router-link>
        <el-dropdown class="change_size" trigger="hover" :show-timeout="showTime" :hide-timeout="showTime">
          <span class="user_img">
            <!-- <img src="../assets/image/login/user_icon.png" /> -->
            <img src="../images/user_icon.png" />
            <span class="user_name">{{$store.state.userinfo_name}}</span>
          </span>
          <el-dropdown-menu slot="dropdown" class="arrow_nav">
            <el-dropdown-item>
              <a :href="$store.state.oldyqzjUrl+'/Set/userinfo'" title="个人信息">个人信息</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a :href="$store.state.oldyqzjUrl+'/Login/logout'" title="退出" @click="exit" >退出</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- <p class="welcome"> 欢迎<span> {{$store.state.userinfo_name}}</span>登录！</p>
    <ul class="nav_xt">
      <li><a :href="$store.state.oldyqzjUrl+'/Set/userinfo'"><i></i> <span>系统设置</span></a></li>
      <li><a :href="$store.state.oldyqzjUrl+'/Login/logout'" @click="exit"><i></i> <span>退出</span></a></li>
    </ul> -->
    <div class="clear"></div>
  </div>
</template>
<script>
  import {getNavData} from '../service/api'
  import {mapState} from 'vuex';
  export default {
    data(){
      return {
        msUserId:this.$store.state.msUserId,
        shareMsUserId:this.$store.state.shareMsUserId,
        navData: [],
        subNav: [],   //二级导航数据
        from: '', //workbench 来自舆情报送 examine 来自舆情审核
        searchval: '',
        scrollLeft:0,
        showTime: 50, //显示和隐藏给的时间
        setUrlInfo:'',
        set_issHow:true,  //是否显示
        defaultData: { //默认logo
          // content: '<p style="font-size: 24px; color: #33a7ff;font-family: 微软雅黑;">智慧舆情指挥平台</p>', //默认文本
          content: this.$store.state.sysName, //默认文本
          imgSrc: this.$store.state.orgLogo,  //默认logo,要放在static目录下面
        }
      }
    },
    computed: {
      ...mapState({
        accountId: state => state.accountId,
        headNavData: state => state.nav.headNavData,
      })
    },
    props: {funName: '',subname: '',previewContent: '',previewImg: ''},
    methods: {
      handleScroll(){
        this.scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
      },
      getNavData(){
        let _this = this;
        getNavData(_this.accountId).then(function (res) {
          let funlist = res.data.result.data.funList;
          let navData = [];                           //主导航
          let systemSteNavData = [];                  //系统设置导航
          for (let i in funlist) {
            navData.push(funlist[i]);
            if (funlist[i].funName === '系统设置') {
              systemSteNavData.push(funlist[i]);
            }
          }
          if (navData.length == 0) {
            _this.navData = [];
            return false;
          }
          if (navData.length > 0) {
            _this.navData = navData;
            localStorage.setItem("navData", JSON.stringify(navData));
            _this.returnNavData();
          }
          if (systemSteNavData.length > 0) {
            localStorage.setItem("systemSteNavData", JSON.stringify(systemSteNavData));
          }
          _this.getSetUrl();
          if(_this.setUrlInfo === ''){
            _this.set_issHow = false;
          }
        }).catch(err => {
          console.log(err, '请求失败！');
        });
      },
      exit: function () {
        localStorage.clear();
      },
      returnNavData(){
        let _this = this;
        if (this.navData.length > 0) {
          for (let i in _this.navData) {
            if (_this.navData[i].funName === _this.funName) {
              _this.subNav.push(_this.navData[i].funSonList);
              break;
            }
          }
          this.$emit('setSecondNav', _this.subNav);
        }
      },
      //把导航数据回传到舆情监测列表页，去处理是否授权上报的问题
      sendInfoToParent(data){
        this.$emit('isHasPower', data);
      },
      //处理点击舆情监测——刷新数据
      yqjcClick(){
        this.$emit('yqzjNav');
      },
      setUrl(n){
        if(n.funUrl !== ''){
          return n.funUrl;
        }
        return this.setUrl(n.funSonList[0]);
      },
      getSetUrl(){
        let _this = this;
        _this.navData.forEach(function (n) {
          if(n.funName === '系统设置'){
            _this.setUrlInfo =  _this.setUrl(n.funSonList[0]);
          }
        })
      },
      alertInfo(){
        this.$message({
          message: '此功能正在开发中,请耐心等待...',
          type: 'warning'
        });
      },
      disposeData(){
        this.getSetUrl();
        if(this.setUrlInfo === ''){
          this.set_issHow = false;
        }
        this.returnNavData();
        this.sendInfoToParent(this.navData);
      }
    },
    mounted: function () {
      this.navData = this.headNavData;
      if(this.navData.length == 0){
        this.$store.dispatch("setHeadNavData",this.accountId).then(()=>{
          this.navData = this.$store.state.nav.headNavData;
          this.disposeData();  //处理数据
        }).catch(()=>{

        });
      }else{
        this.disposeData(); //处理数据
      }
      window.addEventListener('scroll', this.handleScroll);

      // 查询默认 logo and 文本
      // this.queryDefaultLogo();

      /*****************更换logo功能*****************/
      if(this.previewContent){
        this.defaultData.content = this.previewContent;
      }
      if(this.previewImg){
        this.defaultData.imgSrc = this.previewImg;
      }
    },
    watch: { //深度 watcher
      'previewContent': {
        handler(val, oldVal) {
          this.defaultData.content = val;
        },
        deep: true
      },
      'previewImg': {
        handler(val, oldVal) {
          this.defaultData.imgSrc = val;
        },
        deep: true
      },
    }
  }
</script>
<style scoped>
a:link {
  text-decoration: none;
}

a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

a:active {
  text-decoration: none;
}

.header {
  width: 100%;
  height: 64px;
  background-color: #fff;
  border-bottom: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 888;
  box-shadow: 0 2px 15px #e5e5e5;
  min-width: 1100px;
}

.header .logo {
  width: 17%;
  float: left;
  /*background: url("../images/zj_logo.png") center no-repeat;*/
  height: 64px;
  padding: 8px 0;
  margin-left: 3%;
  overflow: hidden;
  font-size: 0;
}
.header .logo_dls1 {
  width: 17%;
  float: left;
  background: url("../images/dls_zj_logo.png") center no-repeat;
  height: 64px;
  min-width: 200px;
}
.header .logo .logo_img {
  display: inline-block;
  width: 48px;
  height: 48px;
}
.header .logo .logo_img img {
  width: 48px;
  height: 48px;
}
.header .logo .logo_txt {
  display: inline-block;
  font-size: 24px;
  color: #33a7ff;
  vertical-align: middle;
  max-height: 48px;
  overflow: hidden;
}
.header .logo .wid236 {
  max-width: 76%;
  margin-left: 5%;
  line-height: 24px;
}
.header .logo .wid300 {
  max-width: 100%;
  line-height: 48px;
}
.header .nav {
  float: left;
}

.header .nav li {
  float: left;
  line-height: inherit;
  width: 120px;
  font-size: 16px;
  text-align: center;
  /*font-family: "黑体";*/
  font-family: '微软雅黑';
  padding-top: 20px;
}

.header .nav li a {
  display: inline-block;
  color: #333;
  width: auto;
  padding: 0 20px;
}

.header .nav li a:hover {
  color: #3292d8;
  color: #3387C5;
  font-weight: normal;
}

.header .nav li a.hover {
  color: #3292d8;
  /*background: #3292d8;
  color: #ffffff !important;*/
  color: #3387C5;
  font-weight: normal;
}

.header .nav_xt {
  float: right;
  margin: 10px 20px 0 0;
}

.header .nav_xt li {
  float: left;
  display: block;
  width: 80px;
  text-align: center;
  margin-right: 5px;
}

.header .nav_xt li a {
  font-size: 12px;
  line-height: 16px;
  color: #333;
  text-decoration: none;
}

.header .nav_xt li i {
  display: inline-block;
  width: 14px;
  height: 16px;
  background: url(../images/head_ico.png) no-repeat;
  vertical-align: middle;
}

.header .nav_xt li a span {
  vertical-align: middle;
}

.header .nav_xt li a:hover {
  color: #3387C5;
  text-decoration: none;
}

.header .nav_xt li a.hover {
  color: #3387C5;
  text-decoration: none;
}

.header .nav_xt li:nth-child(1) a i {
  background-position: left -22px;
  width: 15px;
}

.header .nav_xt li:nth-child(1) a.hover i {
  background-position: left top;
}

.header .nav_xt li:nth-child(1) a:hover i {
  background-position: left top;
}

.header .nav_xt li:nth-child(2) a i {
  background-position: right -22px;
}

.header .nav_xt li:nth-child(2) a.hover i {
  background-position: right top;
}

.header .nav_xt li:nth-child(2) a:hover i {
  background-position: right top;
}

.header .welcome {
  width: 98%;
  text-align: right;
  font-size: 12px;
  margin: 8px 0 0 0;
  padding-right: 20px;
}

.header .welcome span {
  color: #3387C5;
}
/*子菜单样式设置*/
.header .nav li .change_size {
  font-size: 16px;
}
.arrow_nav li {
  padding: 0;
}
.arrow_nav li a {
  color: #606266;
  padding: 0 20px;
  display: inline-block;
  line-height: 36px;
}
.arrow_nav li:hover a,
.arrow_nav li a.hover {
  color: #409eff;
}
/*用户信息样式设置*/
.header .userinfo_box {
 float: right;
 margin-right: 80px;
}
.header .userinfo_box .search_box {
  margin-top: 18px;
  float: left;
}
.header .userinfo_box .search_box .search_all {
  width: 180px;
  outline: 0;
  padding: 0 4px;
  border: none;
  border-bottom: 1px solid #e5e5e5;
  height: 28px;
  line-height: 28px;
}
.header .userinfo_box .search_box .search_all:focus {
  border-bottom: 1px solid #409eff;
}
.header .userinfo_box .search_box .search_btn {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(../images/search.png) no-repeat;
  background-size: 20px 20px;
  vertical-align: middle;
  cursor: pointer;
}
.header .userinfo_box .user_box {
  float: left;
  border-left: 1px solid #a5aabb;
  height: 18px;
  line-height: 18px;
  margin-top: 23px;
  /*margin-top: 30px;*/
  margin-left: 12px;
  font-size: 0;
}
.header .userinfo_box .user_box span {
  display: inline-block;
}
.header .userinfo_box .user_box span.user_img {
  /*margin: 0 12px;*/
  margin: 0 10px;
  cursor: pointer;
}
.header .userinfo_box .user_box span.user_img img {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-top: 0px;
}
.header .userinfo_box .user_box span.user_name {
  font-size: 14px;
  color: #1d2b56;
  color: #3387C5;
  margin-left: 5px;
  padding-top: 1px;
}
.header .userinfo_box .user_box .sys_setup {
  display: inline-block;
  width: 23px;
  height: 23px;
  background: url(../images/setup.png) no-repeat;
  background-size: 23px 23px;
  vertical-align: top;
  margin: -1px 0 0 10px;
}
@media screen  and (max-width:1600px){
  .header .nav > li{width: 110px;}
  .header .userinfo_box .search_box .search_all{width: 150px;}
}
@media screen  and (max-width:1510px){
  .header .logo {width: 22%;}
  .header .logo .wid236 {max-width: 66%; margin-left: 3%;}
}
@media screen  and (max-width:1460px){
  .header .nav > li{width: 100px;}
  .header .nav > li a{padding: 0 15px;}
}
@media screen  and (max-width:1380px){
  .header .userinfo_box{margin-right:4%;}
  .header .userinfo_box .search_box .search_all{width: 100px;}
  .header .nav > li{width: 90px;}
  .header .nav > li a{padding: 0 10px;}
}
@media screen  and (max-width:1350px){
  .header .logo {width: 24%;}
}
@media screen  and (max-width:1300px){
  .header .userinfo_box .search_box .search_all{width: 80px;}
}
@media screen  and (max-width:1270px){
  .header .userinfo_box{margin-right:1.5%;}
  .header .userinfo_box .search_box .search_all{width: 60px;}
}
@media screen  and (max-width:1240px){
  .header .logo {width: 25%;}
}
@media screen  and (max-width:1200px){
  .header .nav > li{width: 90px;}
  .header .nav > li a{padding: 0 10px;}
  .header .nav li .subset_nav li{padding: 0 10px;}
}
@media screen  and (max-width:1190px){
  .header .logo {width: 27%;}
}
@media screen  and (max-width:1100px){
  .header .nav > li{width: 88px;}
  .header .nav > li a{padding: 0 10px;}
  .header .nav li .subset_nav li{padding: 0 10px;}
}
</style>
