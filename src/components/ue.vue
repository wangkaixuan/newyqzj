<template>
	<div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
// 配置百度编辑器
import '../static/ue/ueditor.config.js'
import '../static/ue/ueditor.all.min.js'
import '../static/ue/lang/zh-cn/zh-cn.js'
import '../static/ue/ueditor.parse.min.js'
export default{
  name: 'ue',
  data() {
    return {
      editor: null
    }
  },
  props: {
    value: '',
    config: {}
    // value: {
    //   type: String
    // },
    // config: {
    //   type: Object
    // }
  },
  methods: {
    // 获取内容方法
    getUEContent () {
      return this.editor.getContent();
    },
    // 获取纯文本
    getUEContentTxt () {
      return this.editor.getContentTxt();
    }
  },
  mounted (){
    const _this = this
    this.editor = window.UE.getEditor('editor', this.config); // 初始化UE
    this.editor.addListener('ready', function () {
      _this.editor.setContent(_this.value); // 确保UE加载完成后，放入内容。
    });
  },
  destroyed () {
    this.editor.destroy();
  }
}
</script>
<style lang="less">

</style>


