<template>
  <div class="update_logo_box">
    <yqzj-Head @setSecondNav="setSubNav" funName="系统设置" subname="LOGO设置" ref="setlogo"></yqzj-Head>
    <div class="center border_box">
      <set-Nav :subNavData="subNavData" subname="LOGO设置"></set-Nav>
      <div class="logo_right fr border_box">
        <div class="logo_top_box">
          <a href="javascript:void(0);">
            <form>
              <input type="file" accept="image/gif, image/jpeg, image/x-png, image/bmp" ref="selectImg"
                     @change="selectImg">
            </form>
          </a>
          <span class="tips">注：支持上传图片格式为 png，jpg，jpeg，gif，bmp</br>尺寸最好为宽高相同，像素最佳为48*48</span>
        </div>
        <div class="logo_center_box clearfix_logo">
          <div class="sub_img_box border_box" v-if="imagesfileData.length > 0" v-for="(img,i) in imagesfileData"
               :class="{hover: img.isSelect}"
               @click.stop="selectLogo(img)"><!-- isSelect: 0 未选中 1 选中 -->
            <div class="sub_img border_box">
              <img :src="img.orgLogo"/>
              <i v-show="img.type != 0" @click.stop="delImgs(img,i)"></i> <!-- type: 0 不可删 1 可删 -->
            </div>
            <p>{{img.logoName}}</p>
          </div>
        </div>
        <div class="logo_btom_box">
          <editor id='tinymce' v-model='tinymceHtml' :init='init' ref="ue"></editor>
          <div class="logo_btn_box">
            <button class="logo_btn border_box logo_sure" @click="saveSubmit">确定</button>
            <button class="logo_btn border_box logo_cancle" @click="preview">预览</button>
            <button class="border_box logo_reset" @click="reset">恢复默认</button>
          </div>
        </div>
        <el-dialog
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
          :show-close="false"
          custom-class="logo_diag"
          width="100%"
          top="0">
          <yqzj-Head @setSecondNav="setSubNav" funName="系统设置" subname="LOGO设置" :previewContent="previewContent"
                     :previewImg="previewImg"></yqzj-Head>
          <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
                  </span>
        </el-dialog>
      </div>
      <div style="clear: both;width: 100%;height: 0px;"></div>
    </div>
    <yqzj-Footer></yqzj-Footer>
  </div>
</template>
<script>
  import env from "../../../config/env"
  import yqzjHead from '../../components/header.vue'
  import yqzjFooter from '../../components/footer.vue'
  import VueCookies from 'vue-cookies'
  import setNav from '../../components/setNav.vue'
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/modern/theme'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/plugins/textcolor'
  import {getLogoDate, uploadLogoData, delLogoData, editLogoData} from '../../service/set'
  export default{
    data() {
      return {
        previewContent: '',
        previewImg: '',
        //富文本编辑器配置
        subNavData: [],     //子集导航
        imagesfileData: [], //存储图片
        dialogVisible: false, //是否显示预览弹窗
        tinymceHtml: this.$store.state.sysName,
        init: {
          language_url: env.staticur+'/tinymce/zh_CN.js',
          language: 'zh_CN',
          skin_url:  env.staticur+'/tinymce/skins/lightgray',
          height: 120,
          plugins: 'textcolor',
          toolbar: 'fontselect | fontsizeselect | forecolor | bold ',
          fontsize_formats: '10px 12px 14px 16px 18px 20px 22px 24px 26px',
          font_formats: "微软雅黑='微软雅黑';宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';隶书='隶书';幼圆='幼圆';Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings",
          branding: false,
          menubar: false,
          elementpath: false,
        }
      }
    },
    components: {
      yqzjHead,
      yqzjFooter,
      setNav,
      'editor': Editor // <- Important part
    },
    methods: {
      //设置顶部导航 —— 左侧导航
      setSubNav(navData){
        this.subNavData = navData[0];
      },
      //查询图片
      queryImgData(){
        let _this = this;
        let parms = {
          orgId: this.$store.state.orgId       //orgId
        };
        //查询图片
        getLogoDate(parms).then(function (res) {
          if (res.data.status == '0') {
            if (res.data.result.data) {
              _this.imagesfileData = res.data.result.data;
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
      //上传图片
      selectImg(){
        let _this = this,
          selectImg = this.$refs.selectImg,
          files = selectImg.files;
        if (files) {
          for (let i = 0, len = files.length; i < len; i++) {
            if (files[i].type == "") {
              _this.$message({
                type: 'error',
                customClass: 'ele_ui_tips_position',
                message: '上传失败！上传图片文件只支持jpg jpeg png gif bmp！'
              });
              return false;
            } else {
              let imgType = 'image/jpeg,image/png,image/gif,image/bmp';
              if (imgType.indexOf(files[i].type) == -1) {
                _this.$message({
                  type: 'error',
                  customClass: 'ele_ui_tips_position',
                  message: '上传失败！上传图片文件只支持jpg jpeg png gif bmp！'
                });
                return false;
              }
            }
            //单个图片大小限制
            if ((files[i].size / 1024) > 200) {
              _this.$message({
                type: 'error',
                customClass: 'ele_ui_tips_position',
                message: '上传失败！上传图片最大支持200KB！'
              });
              return false;
            }
            //表单提交
            let formData = new FormData();
            formData.append('files', files[i]);
            formData.append('orgId', this.$store.state.orgId);
            formData.append('logoName', '自定义logo');
            uploadLogoData(formData).then(function (res) {
              if (res.data.status == '0') {
                if (res.data.result.data == 1) { //上传成功
                  _this.queryImgData();
                } else {
                  _this.$message({
                    type: 'error',
                    customClass: 'ele_ui_tips_position',
                    message: '上传图片失败！'
                  });
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
          }
        }
      },
      //删除图片
      delImgs(img, i){
        let _this = this;
        let params = {
          orgId: this.$store.state.orgId,
          logoId: img.id,
        };
        _this.$confirm('您确认要删除该图片吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false
        }).then(() => {
          delLogoData(params).then(function (res) {
            if (res.data.status == '0') {
              if (res.data.result.data == 1) { //上传成功
                _this.queryImgData();
              } else {
                _this.$message({
                  type: 'error',
                  customClass: 'ele_ui_tips_position',
                  message: '图片删除失败！'
                });
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
        }).catch(() => {
        });
      },
      //选中的logo高亮显示
      selectLogo(img){
        for (let m in this.imagesfileData) {
          this.imagesfileData[m].isSelect = 0;
        }
        img.isSelect = 1;
      },
      //提交
      saveSubmit() {
        let _this = this;
        //获取不带HTML标记的纯文本内容
        let activeEditor = tinymce.activeEditor;
        let editBody = activeEditor.getBody();
        activeEditor.selection.select(editBody);
        //文本过滤掉 单引号 和 空格
        let text = activeEditor.selection.getContent( { 'format' : 'text'} ).replace(/'/g,"").replace(/\s/g, "");
        // 获取纯文本 —— 限制文本长度不可超过20个字
        if (text.length > 20) {
          _this.$message({
            type: 'error',
            customClass: 'ele_ui_tips_position',
            message: '最多20个字符'
          });
          return false;
        }
        _this.$confirm('您确认要更换吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false
        }).then(() => {
          _this.$confirm('此操作会退出系统，需要重新登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {
              orgId: this.$store.state.orgId, //组织ID
            };
            // 获取内容方法
            params.sysName = tinymce.editors[0].getContent().replace(/'/g,"");
            // 筛选出选中的logo
            for (let i in this.imagesfileData) {
              // isSelect: 0 未选中 1 选中
              if (this.imagesfileData[i].isSelect == 1) {
                params.logoId = this.imagesfileData[i].id;
              }
            }
            editLogoData(params).then(function (res) {
              if (res.data.status == '0') {
                if (res.data.result.data == 1) { //图片更换成功
                  _this.$router.replace({path: 'exit'});
                } else {
                  _this.$message({
                    type: 'error',
                    customClass: 'ele_ui_tips_position',
                    message: '图片更换失败！'
                  });
                }
              } else {
                _this.$message({
                  type: 'error',
                  customClass: 'ele_ui_tips_position',
                  message: res.data.msg
                });
              }
            }).catch(err => {
              _this.$message({
                type: 'error',
                customClass: 'ele_ui_tips_position',
                message: '请求失败！'
              });
            });
          }).catch(() => {
          });
        }).catch(() => {
        });
      },
      //预览
      preview(){
        let _this = this;
        //获取不带HTML标记的纯文本内容
        let activeEditor = tinymce.activeEditor;
        let editBody = activeEditor.getBody();
        activeEditor.selection.select(editBody);
        //文本过滤掉 单引号 和 空格
        let text = activeEditor.selection.getContent( { 'format' : 'text'} ).replace(/'/g,"").replace(/\s/g, "");
        // 获取纯文本 —— 限制文本长度不可超过20个字
        if (text.length > 20) {
          _this.$message({
            type: 'error',
            customClass: 'ele_ui_tips_position',
            message: '最多20个字符'
          });
          return false;
        }

        this.dialogVisible = true;
        this.previewContent = tinymce.editors[0].getContent().replace(/'/g,"");
        // 筛选出选中的logo
        for (let i in this.imagesfileData) {
          // isSelect: 0 未选中 1 选中
          if (this.imagesfileData[i].isSelect == 1) {
            this.previewImg = this.imagesfileData[i].orgLogo;
          }
        }
      },
      //恢复默认
      reset(){
        let _this = this;
        _this.$confirm('您确认要恢复默认吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false
        }).then(() => {
          _this.$confirm('此操作会退出系统，需要重新登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let params = {
              orgId: this.$store.state.orgId, //组织ID
              sysName: '<p style="font-size: 24px; color: #33a7ff;font-family: 微软雅黑;">智慧舆情指挥平台</p>',
              logoId: 1
            };
            editLogoData(params).then(function (res) {
              if (res.data.status == '0') {
                if (res.data.result.data == 1) { //图片更换成功
                  _this.$router.replace({path: 'exit'});
                } else {
                  _this.$message({
                    type: 'error',
                    customClass: 'ele_ui_tips_position',
                    message: '图片更换失败！'
                  });
                }
              } else {
                _this.$message({
                  type: 'error',
                  customClass: 'ele_ui_tips_position',
                  message: res.data.msg
                });
              }
            }).catch(err => {
              _this.$message({
                type: 'error',
                customClass: 'ele_ui_tips_position',
                message: '请求失败！'
              });
            });
          }).catch(() => {
          });
        }).catch(() => {
        });
      }
    },
    mounted (){
      // tinymce.init({});
      //查询图片
      this.queryImgData();
    }
  }
</script>
<style lang="less">
  @import "../../style/updatelogo.css";
</style>


