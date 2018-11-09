<template>
  <div class="left_nav border_box">
  	<ul class="">
      <li v-for="item in subNavData" v-if="item.funName !== '监测设置' && item.funName !== '工作台设置'&& item.funName !== 'LOGO设置' ">
        <a :href="$store.state.oldyqzjUrl+item.funUrl">{{item.funName}}</a>
      </li>
      <li v-else-if="item.funName == '工作台设置' ">
        <a href="javascript:void(0);">{{item.funName}}</a>
        <i class="hover"  @click="showOrhideOne"></i>
        <ul class="sonlist" v-show="showIconOne">
          <li v-for="sub in item.funSonList">
            <a :href="$store.state.oldyqzjUrl+sub.funUrl">{{sub.funName}}</a>
          </li>
        </ul>
      </li>
      <li v-else-if="item.funName == '监测设置'">
        <a href="javascript:void(0);">{{item.funName}}</a>
        <i class="hover"  @click="showOrhideTwo"></i>
        <ul class="sonlist" v-show="showIconTwo">
          <li v-for="sub in item.funSonList">
            <a :href="$store.state.oldyqzjUrl+sub.funUrl">{{sub.funName}}</a>
          </li>
        </ul>
      </li>
      <li v-else :class="{hover: item.funName == subname}">
       <router-link tag="a" :to="{path:item.funUrl}">{{item.funName}}</router-link>
      </li> 
    </ul>
  </div>
</template>
<script>
export default{
  data() {
    return {
      showIconOne: true, //是否显示图标 —— 工作台设置
      showIconTwo: true, //是否显示图标 —— 监测设置
    }
  },
  props: {
    subNavData: {
      type: Array
    },
    subname: '',
  },
  components: {
  },
  methods: {
    showOrhideOne(){
      this.showIconOne = !this.showIconOne;
    },
    showOrhideTwo(){
      this.showIconTwo = !this.showIconTwo;
    },
  },
  mounted (){
    
  }
}
</script>
<style>
.left_nav {
  -webkit-box-shadow: 0px 3px 7px #ebebeb;
  -moz-box-shadow: 0px 3px 7px #ebebeb;
  box-shadow: 0px 3px 7px #ebebeb;
  width: 18%;
  float: left;
  background-color: #fff;
  border: 1px solid #eeeeee;
  padding-bottom: 100px;
  font-family: "宋体";
}
.left_nav .hide {
  display: none;
}
.left_nav ul {

}
.left_nav ul li {
  position: relative;
}
.left_nav ul li a {
  display: block;
  color: #333;
  text-indent: 5px;
  font-size: 14px;
  box-sizing: border-box;
  height: 35px;
  line-height: 35px;
  text-indent: 15px;
}
.left_nav ul li a:hover {
  color: #33a7ff;
}
.left_nav ul li.hover a {
  color: #33A7FF;
  font-weight: bold;
  border-left: 4px solid #33A7FF;
  text-indent: 11px;
}

.left_nav ul li i {
  display: block;
  width: 19px;
  height: 11px;
  background: url("../images/setNavico.png") no-repeat -23px 0;
  position: absolute;
  z-index: 10;
  top: 10px;
  right: 13px;
  cursor: pointer;
}

.left_nav ul li i.hover {
  display: block;
  width: 15px;
  height: 12px;
  background: url("../images/setNavico.png") no-repeat -1px 0px;
  position: absolute;
  z-index: 10;
  top: 10px;
  right: 15px;
  cursor: pointer;
}

.left_nav ul li .sonlist {
  margin-left: 25px;
}
.left_nav ul li .sonlist li a {
  color: #999;
}
.left_nav ul li .sonlist li a:hover {
  color: #33a7ff;
}

</style>


