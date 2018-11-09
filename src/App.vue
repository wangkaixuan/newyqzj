<template>
    <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  @import "./style/base.css";
  /*授权弹窗*/
  .authorize_group .el-dialog__body{
	  padding: 30px 0;
  }
  /*授权弹窗*/
  .group_tree_wrap .el-tree {
  	border-radius: 6px;
  }
  /*element ui 提示信息位置调整上下左右居中*/
  body .ele_ui_tips_position {
    position: fixed;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
  body .el-message {
    top: 50%;
  }
</style>
