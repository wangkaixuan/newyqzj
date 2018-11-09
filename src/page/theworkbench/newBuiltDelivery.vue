<template>
  <div class="wary_buile">
    <yqzj-Head @setSecondNav="setSubNav" funName="工作台" subname="舆情报送"></yqzj-Head>
    <!-- <work-nav :subNavData="subNavData"></work-nav> -->
    <div class="center border_box">
      <!-- <div class="new_built_title" v-if="reportId == ''">
          <router-link  tag="a" :to="{path: 'workbench'}" title="舆情报送">舆情报送</router-link>-<a class="" href="javascript:void (0)">新建报送</a>
          <router-link  tag="a" :to="{path: 'workbench'}" title="舆情报送" class="goback">返回</router-link>
      </div>
      <div class="new_built_title" v-else>
          <router-link  tag="a" :to="{path: 'workbench'}" title="舆情报送">舆情报送</router-link>-<a class="" href="javascript:void (0)">重报</a>
          <router-link  tag="a" :to="{path: 'workbench'}" title="舆情报送" class="goback">返回</router-link>
      </div> -->
      <div class="new_built_content">
        <div class="new_built_tit" v-if="reportId == ''">舆情报送 - 新建报送</div>
        <div class="new_built_tit" v-else>舆情报送 - 重报</div>
        <div class="new_built_left border_box">
          <div class="new_built_list">
            <label><em class="start">*</em>标题</label><input type="text" name="built_title" class="title"
                                                            v-model.trim="form.title"/>
          </div>
          <div class="edit_tips edit_tips1" v-show="err.tips1">
            <span class="error err1"><em>*</em><span class="error_info">{{err.err1}}</span></span>
          </div>
          <div class="new_built_list">
            <label>URL</label><input type="text" name="url" class="url" v-model="form.url"/>
          </div>
          <div class="edit_tips edit_tips2" v-show="err.tips2">
            <span class="error err2"><em>*</em><span class="error_info">{{err.err2}}</span></span>
          </div>
          <div class="new_built_list">
            <label><em class="start">*</em>媒体类型</label>
            <select id="mediaType" v-model="form.mediaType">   <!--  -->
              <option value="请选择媒体类型" selected>请选择媒体类型</option>
              <option v-for="item in mediaTypeArr" :value="item.id">{{item.name}}</option>
            </select>
          </div>
          <div class="edit_tips edit_tips3" v-show="err.tips3">
            <span class="error err3"><em>*</em><span class="error_info">{{err.err3}}</span></span>
          </div>
          <div class="new_built_list">
            <label><em class="start">*</em>来源网站</label><input type="text" name="net_source" class="net_source"
                                                              v-model.trim="form.sourceWebsite"/>
          </div>
          <div class="edit_tips edit_tips4" v-show="err.tips4">
            <span class="error err4"><em>*</em><span class="error_info">{{err.err4}}</span></span>
          </div>
          <div class="new_built_list">
            <label><em class="start">*</em>发布时间</label>
            <el-date-picker
              v-model="form.time"
              type="datetime"
              :readonly="isReadonly"
              :editable="false"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              :picker-options="startDatePicker">
            </el-date-picker>
          </div>
          <div class="edit_tips edit_tips5" v-show="err.tips5">
            <span class="error err5"><em>*</em><span class="error_info">{{err.err5}}</span></span>
          </div>
          <div class="new_built_list">
            <label><em class="start">*</em>内容概要</label>
            <textarea class="txt_area" name="summary_con" v-model.trim="form.summary"></textarea>
          </div>
          <div class="edit_tips edit_tips6" v-show="err.tips6">
            <span class="error err6"><em>*</em><span class="error_info">{{err.err6}}</span></span>
          </div>
        </div>
        <div class="new_built_right border_box">
          <div class="new_built_list">
            <label><em class="start">*</em>舆情分类</label>
            <select id="sentimentType" v-model="form.sentimentType">
              <option value="请选择舆情分类" selected>请选择舆情分类</option>
              <option v-for="item in sentimentTypeArr" :value="item.type">{{item.name}}</option>
            </select>
          </div>
          <div class="edit_tips edit_tips7" v-show="err.tips7">
            <span class="error err7"><em>*</em><span class="error_info">{{err.err7}}</span></span>
          </div>
          <div class="new_built_list">
            <label>涉事地域</label>
            <select class="dy_select" @change.stop="showCountyInfo" v-model="form.cityId" v-if="territory.city.length > 0">
              <option value="" selected>——请选择——</option>
              <option v-for="city in territory.city" :value="city.uuid">{{city.name}}</option>
            </select>
            <select class="dy_select" v-model="form.countyId" v-if="territory.county.length > 0">
              <option value="" selected>——请选择——</option>
              <option v-for="county in territory.county" :value="county.uuid">{{county.name}}</option>
            </select>
          </div>
          <div class="new_built_list">
            <label>重要性</label>
            <label class="choices"><input type="radio" name="importance" value="0" v-model="form.importance"/>一般</label>
            <label class="choices"><input type="radio" name="importance" value="1" v-model="form.importance"/>重要</label>
            <label class="choices"><input type="radio" name="importance" value="2" v-model="form.importance"/>紧急</label>
          </div>
          <div class="new_built_list">
            <label>处置建议</label>
            <textarea class="txt_suggest" name="suggestions" v-model.trim="form.suggestions"></textarea>
            <span class="quick_add" @click="dialogVisible = true">快捷添加</span>
          </div>
          <div class="edit_tips edit_tips8" v-show="err.tips8">
            <span class="error err8"><em>*</em><span class="error_info">{{err.err8}}</span></span>
          </div>
          <el-dialog
            title="快捷添加"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            custom-class="add_built_diag"
            width="840px">
            <el-checkbox-group v-model="suggestionsArr" @change="checkinlist">
              <el-checkbox v-for="(item,i) in quickAddData" :key="i" :label="item.name" name="quick_add_opts"
                           :value="item.type"></el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitQuickAdd">确 定</el-button>
                      </span>
          </el-dialog>
          <div class="new_built_list">
            <div class="wkx_tit">图片</div>
            <div class="img_warys">
              <div class="video_img">
                <a href="javascript:void(0);">
                  <!-- <em>+</em>选择图片 -->
                  <form>
                    <input type="file" accept="image/gif, image/jpeg, image/x-png, image/bmp" multiple="multiple"
                           ref="built_img" @change="uploadPic">
                  </form>
                </a>
              </div>
              <div class="pub_imgs" v-if="imagesfileData.length > 0" v-for="ic,i in imagesfileData">
                <img :src="ic.src">
                <i @click="delImags(i)">&times;</i>
              </div>
            </div>
            <div class="clear"></div>
          </div>
          <div class="edit_tips edit_tips9" v-show="err.tips9">
            <span class="error err9"><em>*</em><span class="error_info">{{err.err9}}</span></span>
          </div>
          <div class="new_built_list clearfix_new">
            <div class="pos_left">
              <label>附件</label>
              <span class="add_icon">+
                                <form>
                                 <input type="file" action-type="changeFile" node-type="file1" ref="built_file"
                                        @change="uploadFile">
                                </form>
                            </span>
            </div>
            <div class="show_options">
              <span class="enclosure" v-if="fileshowData.length > 0" v-for="fd,i in fileshowData">{{fd.name}}<span
                class="close" @click="delfile(i)">&times;</span></span>
            </div>
          </div>
          <div class="edit_tips edit_tips10" v-show="err.tips10">
            <span class="error err10"><em>*</em><span class="error_info">{{err.err10}}</span></span>
          </div>
          <div class="new_built_list clearfix_new">
            <div class="pos_left">
              <label><em class="start">*</em>批示人</label>
              <span class="add_icon" @click="showOrgLayer">+</span>
            </div>
            <div class="show_options">
              <span class="enclosure" v-if="instructionsAreData.length > 0" v-for="iad in instructionsAreData"><span
                name="instruct_user">{{iad.name}}</span><span class="close"
                                                              v-on:click="closeAreData(iad.id)">&times;</span></span>
            </div>
          </div>
          <div class="edit_tips edit_tips11" v-show="err.tips11">
            <span class="error err11"><em>*</em><span class="error_info">{{err.err11}}</span></span>
          </div>
          <el-dialog
            :visible.sync="instructVisible"
            :close-on-click-modal="false"
            custom-class="instruct_diag"
            width="450px">
            <div class="instructions_wary_box">
              <div class="instructions_title_box">
                <span v-bind:class="{hover:saveType==1}" @click="switchNav(1)">选择单位</span><span
                v-bind:class="{hover:saveType==2}" @click="switchNav(2)">选择人</span>
              </div>
              <div class="instructions_are_content ">
                <!--其它单位-->
                <div v-bind:class="{hide:saveType==2}">
                  <el-tree
                    :data="nodesData"
                    show-checkbox
                    default-expand-all
                    check-on-click-node
                    :expand-on-click-node='false'
                    node-key="id"
                    ref="othertree"
                    check-strictly
                    :props="defaultProps">
                  </el-tree>
                </div>
                <!--我的单位-->
                <div class="myOrg" v-bind:class="{hide:saveType==1}">
                  <el-checkbox-group v-model="orguserDataArr" @change="checkMylist">
                    <el-checkbox v-for="(org,i) in orguserData" :key="i" :label="org.name" name="userCheckbox"
                                 v-bind:username="org.name" :value="org.accountId"></el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="instructVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveInstructions">确 定</el-button>
                      </span>
          </el-dialog>
        </div>
        <div class="clear"></div>

        <!-- 按钮 -->
        <div class="built_btn_box clearfix_new">
          <button type="button" class="btn built_submit" @click="submitBulit" style="float: right;">提交</button>
          <router-link tag="a" :to="{path: 'workbench'}" title="舆情报送" style="margin-right: 15px;float: right;"
                       class="btn built_cancle">返回
          </router-link>
        </div>
        <div class="masker" v-show="isLoading">
          <div><img src="../../assets/browse/download.gif"/>
            <p>保存中...</p></div>
        </div>
      </div>
    </div>
    <yqzj-Footer></yqzj-Footer>
  </div>
</template>
<script>
  import yqzjHead from '../../components/header.vue'
  import yqzjFooter from '../../components/footer.vue'
  import workNav from './workNav.vue'
  import Watermark from '../../js/watermark'
  import {
    getAllTypeData,
    getInstructOtherTreeData,
    getInstructMyTreeData,
    saveBuiltSubmitData,
    getRestatementBuiltData,
    getAreaList
  } from '../../service/built'

  export default {
    data() {
      return {
        isLoading: false, //保存的遮罩层
        from: '', //workbench 来自舆情报送 examine 来自舆情审核
        reportId: '', // 有值重报  无值新建
        quickAddData: [], //处置建议
        dialogVisible: false, //处置建议弹窗
        instructVisible: false, //批示人
        form: {
          title: '',
          url: '',
          mediaType: '请选择媒体类型',
          sourceWebsite: '',
          time: '',
          summary: '',
          sentimentType: '请选择舆情分类',
          importance: 0, //0一般 默认 1重要 2紧急
          suggestions: '', //处置建议
          cityId: '',         //市ID
          countyId: '',         //县ID
          state: 0        //state  0审批中 4重报
        },
        err: {
          tips1: false,
          err1: '',
          tips2: false,
          err2: '',
          tips3: false,
          err3: '',
          tips4: false,
          err4: '',
          tips5: false,
          err5: '',
          tips6: false,
          err6: '',
          tips7: false,
          err7: '',
          tips8: false,
          err8: '',
          tips9: false,
          err9: '',
          tips10: false,
          err10: '',
          tips11: false,
          err11: '',
        },
        mediaTypeArr: [],                         //媒体类型
        sentimentTypeArr: [],                     //舆情分类
        suggestionsArr: [],                       //处置建议选中的值
        imagesSrc: [],                         //图片显示数据（src）
        imagesfileData: [],                    //图片file数据
        fileshowData: [],                      //附件显示数据（name）
        fileData: [],                          //附件file数据
        instructionsAreData: [],                //批示人
        //查看组织树——其它单位
        nodesData: [],                        //其它单位
        saveType: 1,                          //添加 机构1  人员2
        showtype: 1,                         //保存类型
        defaultProps: {
          children: 'children',      //指定子树为节点对象的某个属性值
          label: 'name'              //指定节点标签为节点对象的某个属性值
        },
        //查看组织树——我的单位
        orguserData: [],                      //人员列表
        orguserDataArr: [],                   //我的单位选中的值
        startDatePicker: this.beginDate(),
        subNavData: [],                       //子集导航
        isReadonly: false,  //日期是否只读
        territory:{
          city:[],
          county:[]
        }
      }
    },
    components: {
      yqzjHead,
      yqzjFooter,
      workNav
    },
    methods: {
      setSubNav(navData){
        this.subNavData = navData[0];
      },
      //是否显示加载的遮罩层
      hideLays(){
        this.isLoading = true;
      },
      //处理不能选择今天之后的时间
      beginDate(){
        let _this = this
        return {
          disabledDate(time){
            return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      },
      //查看处置建议选中的值
      checkinlist(val){
        // console.log('--------处置建议选中的值--------');
        // console.log(this.suggestionsArr);
      },
      //查看我的单位选中的值
      checkMylist(val){
        // console.log('--------我的单位选中的值--------');
        // console.log(this.orguserDataArr);
      },
      //提交处置建议赋值
      submitQuickAdd(formName) {
        let _this = this;
        for (let i in _this.suggestionsArr) {
          // console.log(_this.suggestionsArr[i]);
          _this.form.suggestions += ' ' + _this.suggestionsArr[i];
        }
        _this.dialogVisible = false;
        this.suggestionsArr = [];//清空之前的选项
      },
      //上传图片
      uploadPic(){
        let _this = this,
          built_img = this.$refs.built_img,
          files = built_img.files;
        if (files) {
          //刚刚上传图片
          let fl = files.length;
          if (fl > 8) {
            _this.err.tips9 = true;
            _this.err.err9 = '最多只能上传8张图片！';
            return false;
          } else {
            _this.err.tips9 = false;
          }
          //已经上传
          // let fl_sum = fl + _this.imagesSrc.length;
          let fl_sum = fl + _this.imagesfileData.length;
          if (fl_sum > 8) {
            _this.err.tips9 = true;
            _this.err.err9 = '最多只能上传8张图片！';
            return false;
          } else {
            _this.err.tips9 = false;
          }
          for (let i = 0, len = files.length; i < len; i++) {
            console.log('----------files[i]----------------');
            console.log(files[i]);
            if (files[i].type == "") {
              _this.err.tips9 = true;
              _this.err.err9 = '上传失败！上传图片文件只支持jpg jpeg png gif bmp！';
              return false;
            } else {
              let imgType = 'image/jpeg,image/png,image/gif,image/bmp';
              if (imgType.indexOf(files[i].type) == -1) {
                _this.err.tips9 = true;
                _this.err.err9 = '上传失败！上传图片文件只支持jpg jpeg png gif bmp！';
                return false;
              } else {
                _this.err.tips9 = false;
              }
            }
            //单个图片大小限制
            if ((files[i].size / 1024 / 1024) > 1) {
              _this.err.tips9 = true;
              _this.err.err9 = '上传失败！上传图片最大支持1M！';
              return false;
            } else {
              _this.err.tips9 = false;
            }
            _this.imagesfileData.push({
              imgfiles: files[i],
              src: ''
            });
            let imgI = _this.imagesfileData.length;
            if (window.FileReader) {
              let reader = new FileReader();
              reader.readAsDataURL(files[i]);
              reader.onload = function (evt) {
                _this.imagesfileData[imgI - 1].src = evt.target.result
              }
            }
          }
        }
      },
      //上传附件
      uploadFile(){
        let _this = this,
          built_file = this.$refs.built_file,
          files = built_file.files;
        console.log('--------files--------');
        console.log(files);
        if (!files[0].type || files[0].type == '') {
          //处理word type没值的时候
          let str = "zip,rar,xlsx,pptx,doc,docx,flv,mkv,rmvb,csv",
            nameArray = files[0].name.split("."),
            hz = nameArray[nameArray.length - 1];
          if (str.indexOf(hz) == -1) {
            _this.err.tips10 = true;
            _this.err.err10 = '请选择PDF、word、Excel、ppt、txt、zip、rar、mp4等格式！';
            return false;
          } else {
            _this.err.tips10 = false;
          }
        } else {
          //type有值的时候
          let str = "text/plain,video/mp4,application/pdf,video/avi,video/x-ms-wmv,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/msword,application/zip,application/vnd.ms-powerpoint,application/x-zip-compressed,video/x-flv,video/x-matroska,video/vnd.rn-realvideo,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          if (str.indexOf(files[0].type) == -1) {
            _this.err.tips10 = true;
            _this.err.err10 = '请选择PDF、word、Excel、ppt、txt、zip、rar、mp4等格式！';
            return false;
          } else {
            _this.err.tips10 = false;
          }
        }
        //限制文件大小
        if (files[0].size / 1024 / 1024 > 5) {
          _this.err.tips10 = true;
          _this.err.err10 = '上传失败！上传附件最大支持5M！';
          return false;
        } else {
          _this.err.tips10 = false;
        }
        //限制文件上传的个数
        if (_this.fileData.length == 5) {
          _this.err.tips10 = true;
          _this.err.err10 = '最多上传5个附件！';
          return false;
        } else {
          _this.err.tips10 = false;
        }
        _this.fileData.push(files[0]);
        _this.fileshowData.push({name: files[0].name});
      },
      //删除图片
      delImags(s){
        this.imagesfileData.splice(s, 1);
      },
      //删除附件
      delfile(s){
        this.fileData.splice(s, 1);
        this.fileshowData.splice(s, 1);
      },
      //显示批示人弹窗
      showOrgLayer(){
        let _this = this;
        if (this.showtype === 1) {
          if (this.nodesData.length == 0) {
            //没有数据
            this.setzTree();
          } else {
            //有数据
            let ztreeId = [];
            this.instructionsAreData.forEach((iad, index) => {
              ztreeId.push(iad.id);
            });
            this.$refs.othertree.setCheckedKeys(ztreeId);
          }
        } else {
          if (this.orguserData.length == 0) {
            this.getOrgUserData();
            return false;
          }
          let areString = JSON.stringify(this.instructionsAreData);
          _this.orguserDataArr = [];
          this.orguserData.forEach((org, i) => {
            if (areString.indexOf(org.accountId) > -1) {
              _this.orguserDataArr.push(org.name);
            }
          });
        }
        this.saveType = this.showtype;
        this.instructVisible = true;
      },
      //其它组织  我的单位切换
      switchNav(s){
        this.saveType = s;
        if (s == 2 && this.orguserData.length === 0) {
          this.getOrgUserData();
        } else if (s == 2) {
          //this.orguserDataArr = [];
        }
      },
      //查询我的单位数据
      getOrgUserData: function () {
        let _this = this;
        let parms = {
          groupId: this.$store.state.generalGroupId,
          orgId: this.$store.state.orgId,
          type: 2   // 1简单树，2 复杂树
        };
        getInstructMyTreeData(parms).then(function (res) {
          if (res.data.result) {
            _this.orguserData = res.data.result.data;
          } else {
            console.log('没有返回值');
          }
        }).catch(err => {
          console.log(err, '请求失败！');
        });
      },
      //获取批示人数据
      setzTree(){
        let _this = this;
        let parms = {
          groupId: this.$store.state.generalGroupId,
          type: 2   // 1简单树，2 复杂树
        }
        //获取批示人数据
        getInstructOtherTreeData(parms).then(function (res) {
          if (res.data.result) {
            _this.nodesData = res.data.result.data;
          } else {
            console.log('没有返回值');
          }
        }).catch(err => {
          console.log(err, '请求失败！');
        });
      },
      //删除批示人
      closeAreData(id){
        let _this = this;
        for (var i in _this.instructionsAreData) {
          if (_this.instructionsAreData[i].id === id) {
            _this.instructionsAreData.splice(i, 1);
            break;
          }
        }
      },
      //保存批示人
      saveInstructions(){
        let _this = this;
        if (_this.saveType == 1) { //机构 其它单位
          let otherData = this.$refs.othertree.getCheckedNodes();
          if (otherData.length == 0) {
            _this.$message({
              type: 'error',
              customClass: 'ele_ui_tips_position',
              message: '请选择机构！'
            });
            return false;
          } else {
            _this.err.tips11 = false;
          }
          _this.instructionsAreData = [];
          for (let i in otherData) {
            _this.instructionsAreData.push({
              name: otherData[i].name,
              id: otherData[i].id
            })
          }
          this.orguserDataArr = [];
        } else { //人员 我的单位
          if (_this.orguserDataArr.length == 0) {
            _this.$message({
              type: 'error',
              customClass: 'ele_ui_tips_position',
              message: '请选择人员！'
            });
            return false;
          } else {
            _this.err.tips11 = false;
          }
          _this.instructionsAreData = [];
          for (let i in _this.orguserData) {
            for (let j in _this.orguserDataArr) {
              if (_this.orguserData[i].name == _this.orguserDataArr[j]) {
                _this.instructionsAreData.push({
                  id: _this.orguserData[i].accountId,
                  name: _this.orguserDataArr[j]
                });
              }
            }
          }
          this.$refs.othertree.setCheckedKeys([]);
        }
        this.showtype = this.saveType;
        this.instructVisible = false;
      },
      //提交表单
      submitBulit() {
        let _this = this;
        // url 验证规则
        let reg = /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig,
          reg2 = (/\s/g, "");

        let title = _this.form.title; //let newTitle = title.replace(/\s/g, ""); //标题 去掉首尾空格，过滤掉中间的空格后，进行验证
        let url = _this.form.url;
        let mediaVal = _this.form.mediaType;//.toString()
        let sourceWebsite = _this.form.sourceWebsite;
        let time = _this.form.time;
        let summary = _this.form.summary;
        let sentimentVal = _this.form.sentimentType;//.toString()
        let importance = parseInt(_this.form.importance);
        let suggestions = _this.form.suggestions;
        //标题
        if (title.length == 0) {
          _this.err.tips1 = true;
          _this.err.err1 = '不能为空';
          return false;
        } else if (title.length > 50) {
          _this.err.tips1 = true;
          _this.err.err1 = '最多50个字符';
          return false;
        } else {
          _this.err.tips1 = false;
        }
        //url
        // if(url.length == 0){
        // 	_this.err.tips2 = true;
        // 	_this.err.err2 = '不能为空';
        // 	return false;
        // }else if(!reg.test(url)){
        // 	_this.err.tips2 = true;
        // 	_this.err.err2 = '网址格式不正确';
        // 	return false;
        // }else if(url.length > 300){
        // 	_this.err.tips2 = true;
        // 	_this.err.err2 = '最多300个字符';
        // 	return false;
        // }else {
        // 	_this.err.tips2 = false;
        // }

        //url
        if (url.length != 0) {
          if (!reg.test(url)) {
            _this.err.tips2 = true;
            _this.err.err2 = '网址格式不正确';
            return false;
          } else if (url.length > 300) {
            _this.err.tips2 = true;
            _this.err.err2 = '最多300个字符';
            return false;
          } else {
            _this.err.tips2 = false;
          }
        }
        //媒体类型
        if (mediaVal == '请选择媒体类型') {
          _this.err.tips3 = true;
          _this.err.err3 = '请选择媒体类型';
          return false;
        } else {
          _this.err.tips3 = false;
        }
        //网站来源
        if (sourceWebsite.length == 0) {
          _this.err.tips4 = true;
          _this.err.err4 = '不能为空';
          return false;
        } else if (sourceWebsite.length > 50) {
          _this.err.tips4 = true;
          _this.err.err4 = '最多50个字符';
          return false;
        } else {
          _this.err.tips4 = false;
        }
        //发布时间
        if (time.length == 0) {
          _this.err.tips5 = true;
          _this.err.err5 = '不能为空';
          return false;
        } else {
          _this.err.tips5 = false;
        }
        //内容概要 summary
        if (summary.length == 0) {
          _this.err.tips6 = true;
          _this.err.err6 = '不能为空';
          return false;
        } else if (summary.length > 3000) {
          _this.err.tips6 = true;
          _this.err.err6 = '最多3000个字符';
          return false;
        } else {
          _this.err.tips6 = false;
        }
        //舆情分类
        if (sentimentVal == '请选择舆情分类') {
          _this.err.tips7 = true;
          _this.err.err7 = '请选择舆情分类';
          return false;
        } else {
          _this.err.tips7 = false;
        }
        //处置建议
        if (suggestions.length > 200) {
          _this.err.tips8 = true;
          _this.err.err8 = '最多200个字符';
          return false;
        } else {
          _this.err.tips8 = false;
        }
        //批示人
        if (_this.instructionsAreData.length == 0) {
          _this.err.tips11 = true;
          _this.err.err11 = '请添加批示人';
          return false;
        } else {
          _this.err.tips11 = false;
        }
        let formData = new FormData();
        formData.append('title', title);                  //标题
        formData.append('url', url);                      //url
        formData.append('mediaType', mediaVal);         //媒体类型
        formData.append('source', sourceWebsite);           //来源网站
        formData.append('content', summary);         //内容概要
        formData.append('importance', importance);       //重要性  0一般  1重要  2紧急
        formData.append('dimension', sentimentVal);     //舆情分类
        formData.append('describe', '');                 //上报描述
        formData.append('handlingProposal', suggestions);  //处置建议
        formData.append('copyers', "");                   //抄送人 无
        formData.append('ctime', time);                   //发布时间
        formData.append('groupId', this.$store.state.generalGroupId);       //集团ID
        formData.append('author', "");                   //作者
        formData.append('reportId', this.reportId);       //reportId
        formData.append('provinceId',this.$store.state.provinceId);       //省ID
        formData.append('cityId',this.form.cityId);       //省ID
        formData.append('countyId',this.form.countyId);       //省ID
        formData.append('state', 0);                      //state  0审批中 4重报
        let sqrID = "";
        for (let i in _this.instructionsAreData) {
          sqrID += _this.instructionsAreData[i].id + ",";
        }
        sqrID = sqrID.substr(0, sqrID.length - 1);
        if (_this.saveType == 1) {
          //机构
          formData.append('approver', "");                  //审批人
          formData.append('approveOrg', sqrID);                //审批部门
        } else {
          //人员
          formData.append('approver', sqrID);                  //审批人
          formData.append('approveOrg', "");                //审批部门
        }
        if (_this.imagesfileData.length > 0) {
          //图片
          for (let i in _this.imagesfileData) {
            formData.append('files', _this.imagesfileData[i].imgfiles);
          }
        }
        if (_this.fileData.length > 0) {
          //附件
          for (let i in _this.fileData) {
            formData.append('files', _this.fileData[i]);
          }
        }

        if (_this.reportId != '') {
          let enclosures = [];
          //重报
          if (_this.imagesfileData.length > 0) {
            //图片数据(返回的)
            for (let i in _this.imagesfileData) {
              if (_this.imagesfileData[i].type == 1) {
                enclosures.push(_this.imagesfileData[i]);
              }
            }
          }
          if (_this.fileshowData.length > 0) {
            //附件数据(返回的)
            for (let i in _this.fileshowData) {
              if (_this.fileshowData[i].type == 2) {
                enclosures.push(_this.fileshowData[i]);
              }
            }
          }
          formData.append('enclosures', JSON.stringify(enclosures));
          formData.append('state', 4);
        }
        saveBuiltSubmitData(formData, _this.hideLays).then(function (res) {
          if (res || res.status == '0') {
            _this.$message({
              type: 'success',
              customClass: 'ele_ui_tips_position',
              message: '上报成功!'
            });
            if (_this.from == 'workbench') {
              _this.$router.replace({path: 'workbench'});
            } else {
              _this.$router.replace({path: 'publicOpinionAudit'});
            }
          } else if (res == '') {
            _this.$message({
              type: 'error',
              customClass: 'ele_ui_tips_position',
              message: '请联系管理员!'
            });
          } else {
            _this.$message.error(res.msg);
            _this.isLoading = false;
          }
        }).catch(err => {
          _this.$message({
            type: 'error',
            customClass: 'ele_ui_tips_position',
            message: '请求失败！'
          });
        });
      },
      //获取处置建议、媒体类型、舆情分类列表
      getThreeData(){
        let _this = this;
        let parms = {
          groupId: this.$store.state.generalGroupId
        }
        //获取处置建议、媒体类型、舆情分类列表
        getAllTypeData(parms).then(function (res) {
          if (res.data.status == '0') {
            let resData = res.data.result.data || [];
            let mediaTypeData = [], sentimentTypeData = [], disposeProposalData = [];
            if (resData.length > 0) {
              for (let i in resData) {
                if (resData[i].dict_type == 'messageType') { //舆情分类
                  sentimentTypeData.push(resData[i].dict_value);
                } else if (resData[i].dict_type == 'disposeProposal') { //处置建议
                  disposeProposalData.push(resData[i].dict_value);
                } else if (resData[i].sourceTypeList != '' || resData[i].sourceTypeList != undefined) { //媒体类型
                  mediaTypeData = resData[i].sourceTypeList;
                }
              }
              _this.mediaTypeArr = mediaTypeData;
              if (sentimentTypeData.length > 0) {
                _this.sentimentTypeArr = JSON.parse(sentimentTypeData);
              } else {
                _this.sentimentTypeArr = [];
                _this.$message({
                  type: 'error',
                  customClass: 'ele_ui_tips_position',
                  message: '请去设置舆情分类'
                });
              }
              if (disposeProposalData.length > 0) {
                _this.quickAddData = JSON.parse(disposeProposalData);
              } else {
                _this.quickAddData = [];
              }
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
      //查询重报的数据
      getRestatementData(){
        let _this = this;
        let parms = {
          groupId: this.$store.state.generalGroupId,
          id: _this.reportId  //报告id
        }
        getRestatementBuiltData(parms).then(function (res) {
          if (res.data.status == '0') {
            if (res.data.result) {
              let result = res.data.result.data;
              _this.form.title = result.title;
              _this.form.url = result.url;
              _this.form.mediaType = result.mediaType;
              _this.form.sourceWebsite = result.source;
              _this.form.time = result.ctime;
              _this.form.summary = result.content;
              _this.form.sentimentType = result.dimension;
              _this.form.importance = result.importance;
              _this.form.suggestions = result.handlingProposal;
              let enclosures = JSON.parse(result.enclosures);     //图片附件
              _this.instructionsAreData = JSON.parse(result.approver);       //批示人
              _this.saveType = result.approverType;               //批示人
              _this.form.provinceId = result.provinceId;         //省
              _this.form.cityId = result.cityId;                //市
              _this.form.countyId = result.countyId;            //县
              if(_this.form.cityId != ''){
                  _this.setTerritoryInfo({puuid:_this.form.cityId,level:2})
              }
              let queryImgsData = [];
              let queryFilesData = [];
              console.log(enclosures);
              for (let i in enclosures) {
                if (enclosures[i].type == 1) {        //图片
                  enclosures[i].src = enclosures[i].url;
                  queryImgsData.push(enclosures[i]);
                } else if (enclosures[i].type == 2) {  //附件
                  queryFilesData.push(enclosures[i]);
                }
              }
              _this.imagesfileData = queryImgsData;
              _this.fileshowData = queryFilesData;
            } else {
              _this.$message({
                type: 'error',
                customClass: 'ele_ui_tips_position',
                message: '没有返回值'
              });
            }
          }
        }).catch(err => {
          _this.$message({
            type: 'error',
            customClass: 'ele_ui_tips_position',
            message: '请求失败！'
          });
        });
      },
      //获得地域信息
      setTerritoryInfo(parms){
        let data = {
          parentUuid:parms.puuid
        };
        getAreaList(data).then(rel=>{
            if(parms.level==1){
               this.territory.city = rel.data.result.data
            }else{
              this.territory.county = rel.data.result.data
            }
        }).catch(err=>{
          console.log(err);
        })
      },
      //查询省
      showCountyInfo(){
        console.log(this.form.cityId);
        if(this.form.cityId === ''){
          this.territory.county = [];
          this.form.countyId = '';
        }else {
          this.setTerritoryInfo({puuid:this.form.cityId,level:2})
        }
      }
    },
    mounted (){
      let username = this.$store.state.userinfo_name;
      let account = this.$store.state.account.substr(7, 4);
      Watermark.set(username + "  " + account);
      let _this = this;
      let query = this.$route.query;//获取链接 ？ 之后的参数
      _this.from = query.from;
      _this.reportId = query.id || ''; //重报时使用
      //获取处置建议、媒体类型、舆情分类列表
      _this.getThreeData();
      //查询重报的数据
      if (_this.reportId != '') {
        _this.getRestatementData();
      }
      //处理舆情浏览列表——上报
      query.title = query.title || '';
      query.url = query.url || '';
      query.mediatype = query.mediatype || '';
      query.source = query.source || '';
      query.time = query.time || '';
      query.summary = query.summary || '';
      if (query.title != '') {
        if (query.title.length > 50) {
          _this.form.title = query.title.substr(0, 50);
        } else {
          _this.form.title = query.title;
        }
      }
      if (query.url != '') {
        _this.form.url = query.url;
      }
      if (query.mediatype != '') {
        //处理微博
        if (query.mediatype == '04' || query.mediatype == '08') {
          _this.form.mediaType = '04,08';
        } else {
          _this.form.mediaType = query.mediatype;
        }
      }
      if (query.source != '') {
        _this.form.sourceWebsite = query.source;
      }
      if (query.time != '') {
        _this.form.time = query.time;
        _this.isReadonly = true; //时间只读，不能修改
      }
      if (query.summary != '') {
        _this.form.summary = query.summary;
      }
      this.setTerritoryInfo({puuid:this.$store.state.provinceId,level:'1'});
    }
  }
</script>
<style lang="less">
  @import "../../style/newbuilt.css";
  .wary_buile .center .new_built_content .new_built_list .dy_select{margin-right: 5px;}
</style>




