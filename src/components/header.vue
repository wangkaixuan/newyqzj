<template>
  <div class="header" style="min-width: 1360px;">
    <div class="logo"></div>
    <ul class="nav">
      <li v-for="nav,i in navData" v-if="nav.funName == '工作台' || nav.funName == '舆情监测'">
        <router-link tag="a" :to="{path:nav.funSonList[0].funUrl}" :class="{hover:nav.funName==funName}">
          {{nav.funName}}
        </router-link>
      </li>
      <li v-else>
        <a :href="$store.state.oldyqzjUrl+nav.funUrl">{{nav.funName}}</a>
      </li>
    </ul>
    <p class="welcome"> 欢迎<span> {{$store.state.userinfo_name}}</span>登录！</p>
    <ul class="nav_xt">
      <li><a :href="$store.state.oldyqzjUrl+'/Set/userinfo'"><i></i> <span>系统设置</span></a></li>
      <li><a :href="$store.state.oldyqzjUrl+'/Login/logout'" @click="exit"><i></i> <span>退出</span></a></li>
    </ul>
    <div class="clear"></div>
  </div>
</template>
<script>
  import {getNavData} from '../service/api'
  import {mapState} from 'vuex';
  export default {
    data(){
      return {
        navData: []
      }
    },
    computed: {
      ...mapState({
        accountId: state => state.accountId
      }),
    },
    props: {funName: ''},
    methods: {
      getNavData(){
        var _this = this;
        getNavData(_this.accountId).then(function (res) {
          let funlist = res.data.result.data.funList;
          let navData = [];                           //主导航
          let systemSteNavData = [];                  //系统设置导航
          for (let i in funlist) {
            if (funlist[i].funName !== '系统设置') {
              navData.push(funlist[i]);
            } else {
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
        }).catch(err => {
          console.log(err, '请求失败！');
        });
      },
      exit: function () {
        localStorage.clear();
      },
      returnNavData(){
        var _this = this;
        if (this.navData.length > 0) {
          let subNav = [];
          for (let i in _this.navData) {
            if (_this.navData[i].funName === _this.funName) {
              subNav.push(_this.navData[i].funSonList);
              break;
            }
          }
          this.$emit('setSecondNav', subNav);
        }
      },
      //把导航数据回传到舆情监测列表页，去处理是否授权上报的问题
      sendInfoToParent(data){
        this.$emit('isHasPower', data);
      }
    },
    mounted: function () {
      var navData = localStorage.getItem("navData");
      if (!navData) {
        console.log("--------请求获得导航----------");
        //获得导航数据
        this.getNavData();
      } else {
        console.log("--------sessionStorage获得导航----------");
        //设置数据
        this.navData = JSON.parse(navData);
        console.log(JSON.parse(navData));
        this.returnNavData();
        //把导航数据回传到舆情监测列表页，去处理是否授权上报的问题
        this.sendInfoToParent(this.navData);
      }
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
    height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #E4E4E4;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .header .logo {
    width: 17%;
    float: left;
    background: url("../images/zj_logo.png") center no-repeat;
    height: 60px;
  }

  .header .nav {
    float: left;
  }

  .header .nav li {
    float: left;
    line-height: 60px;
    width: 120px;
    font-size: 16px;
    text-align: center;
    font-family: "黑体"
  }

  .header .nav li a {
    display: inline-block;
    color: #333;
    width: auto;
    padding: 0 20px;
  }

  .header .nav li a:hover {
    color: #3292d8;
    background: #3292d8;
    color: #ffffff !important;
  }

  .header .nav li a.hover {
    color: #3292d8;
    background: #3292d8;
    color: #ffffff !important;
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
</style>
