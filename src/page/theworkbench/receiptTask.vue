<template>
  <div class="wary_see">
    <yqzj-Head @setSecondNav="setSubNav" funName="工作台" subname="舆情任务"></yqzj-Head>
    <div class="center border_box">
      <div class="see_built_tit" v-if="cztype ==='receipt'">舆情任务 - 回执</div>
      <div class="see_built_tit" v-if="cztype ==='assign'">舆情任务 - 交办</div>
      <div class="see_built_content">
        <div class="see_built_list">
          <label>标题：</label><span>{{reportInfoData.title}}</span>
        </div>
        <div class="see_built_list clearfix_see">
          <label class="see_label">URL：</label><span class="see_span"><a :href="reportInfoData.url" target="_blank">{{reportInfoData.url}}</a></span>
        </div>
        <div class="see_built_list clearfix_see" v-if="reportInfoData.content && reportInfoData.content.length > 0">
          <label class="see_label">内容概要：</label><span class="see_span">{{reportInfoData.content.length > 100 ?  reportInfoData.content.substr(0,100)+'...': reportInfoData.content }}</span>
        </div>
        <div class="see_built_list">
          <label>重要性：</label><span>{{reportInfoData.importanceName}}</span>
        </div>
        <div class="see_built_list">
          <label>舆情分类：</label><span>{{reportInfoData.dimensionName}}</span>
        </div>
        <div class="see_built_list">
          <label>来源网站：</label><span>{{reportInfoData.source}}</span>
        </div>
        <div class="see_built_list">
          <label>媒体类型：</label><span>{{reportInfoData.mediaTypeName}}</span>
        </div>
        <div class="see_built_list">
          <label>发布时间：</label><span>{{reportInfoData.ctime}}</span>
        </div>
        <div class="see_built_list clearfix_see" v-if="reportInfoData.opeartTime">
          <label>审核时间：</label><span>{{reportInfoData.opeartTime}}</span>
        </div>
        <div class="clearfix_see"></div>
        <div class="see_built_list clearfix_see">
          <p class="p1">审批记录：</p>
          <div class="line" v-if="reportInfoData.approvers != ''"></div>
          <div class="start" v-if="reportInfoData.approvers != ''"></div>
          <div class="end" v-if="reportInfoData.approvers != ''"></div>
          <div class="desc clearfix_see" v-for="item in reportInfoData.approvers" v-if="reportInfoData.approvers != ''">
            <div class="desc_left" ref="descLeft">
              <p>{{item.opeartTime.substr(11)}}</br>{{item.opeartTime.substr(0,10)}}</p>
            </div>
            <div class="desc_right">
              <div class="p3 clearfix_see"><span class="light">{{item.accountName}}</span><span class="slant_line">/</span><span class="dark">{{item.stateName}}</span>
              </div>
              <div class="p4 clearfix_see"><span class="light">描述</span><span class="dark">{{item.approveContent}}</span></div>
              <div class="p5 clearfix_see" v-if="item.fileData.length > 0">
                <span class="light">附件</span>
                <p class="files">
                  <span class="dark" v-for="file in item.fileData"
                        @click="downloadFj(file.url,file.name)">{{file.name}}</span>
                </p>
              </div>
              <div class="p5 clearfix_see" v-if="item.imagesSrc.length > 0">
                <span class="light">图片</span>
                <p class="files">
                  <a :href="img.url" target="_blank" v-for="img in item.imagesSrc"><img :src="img.url"/></a>
                </p>
              </div>
            </div>
          </div>
          <span style="margin-left: 6px;" v-if="reportInfoData.approvers == ''">暂无记录</span>
        </div>
        <!--回执-->
        <div v-if="cztype ==='receipt'">
          <!-- 回执相关内容开始 -->
          <div class="see_built_list clearfix_see">
            <label>回执描述：</label>
            <textarea v-model="disposeContent" class="approval_content"></textarea>
          </div>
          <div class="see_built_tips" v-show="err.tips11">
            <span class="see_built_error"><em>*</em><span class="see_built_error_info">{{err.err11}}</span></span>
          </div>
          <!--图片-->
          <div class="see_built_list clearfix_see new_see_built_list">
            <label>图片：</label>
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
          <div class="see_built_tips edit_tips9" v-show="err.tips9">
            <span class="see_built_error"><em>*</em><span class="see_built_error_info">{{err.err9}}</span></span>
          </div>
          <!--图片end-->
          <!--附件-->
          <div class="see_built_list clearfix_see new_see_built_list">
            <div class="pos_left">
              <label>附件：</label>
              <span class="add_icon"><form><input type="file" action-type="changeFile" node-type="file1"
                                                  ref="built_file" @change="uploadFile"></form></span>
            </div>
            <div class="show_options">
              <span class="enclosure" v-if="fileshowData.length > 0" v-for="fd,i in fileshowData">{{fd.name}}<span
                class="close" @click="delfile(i)">&times;</span></span>
            </div>
          </div>
          <div class="see_built_tips edit_tips10" v-show="err.tips10">
            <span class="see_built_error"><em>*</em><span class="see_built_error_info">{{err.err10}}</span></span>
          </div>
          <!--附件end-->
          <!-- 评论相关内容结束 -->
        </div>
        <!--回执end-->
        <!--交办-->
        <div v-if="cztype ==='assign'">
          <div class="see_built_list clearfix_see">
            <label>交办描述：</label>
            <textarea v-model.trim="instructContent" class="approval_content"></textarea>
            <span class="quick_add" @click="dialogVisible = true">快捷添加</span>
          </div>
          <div class="see_built_tips" v-show="err.tips1">
            <span class="see_built_error"><em>*</em><span
              class="see_built_error_info">{{err.err1}}</span></span>
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
          <div class="see_built_list clearfix_see">
            <div class="executor_left"><label>交办人员：</label><span class="add_icon" @click="addInstructUser"></span></div>
            <div class="executor_right">
              <span class="enclosure" v-if="instructUser.length > 0" v-for="item in instructUser"><span
                name="instruct_user">{{item.name}}</span><span class="close"
                                                               @click="delInstruct(item.id)">×</span></span>
            </div>
          </div>
          <div class="see_built_tips" v-show="err.tips2">
            <span class="see_built_error"><em>*</em><span
              class="see_built_error_info">{{err.err2}}</span></span>
          </div>
          <el-dialog
            :visible.sync="instructVisible"
            :close-on-click-modal="false"
            custom-class="instruct_diag"
            width="450px">
            <div class="instructions_wary_box">
              <div class="instructions_title_box">
                <span v-bind:class="{hover:saveType==1}" @click="switchNav(1)">选择单位</span><span
                v-bind:class="{hover:saveType==2}" @click="switchNav(2)" v-if="dataType == 2">选择人</span>
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
                                 v-bind:username="org.name" :value="org.accountId" :disabled="org.disabled" ></el-checkbox>
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
        <!--交办end-->
      </div>
      <!-- 审核提交 -->
      <div class="btn_box" v-if="cztype ==='receipt'">
        <button type="button" class="btn save" @click="submitAudit">提交</button>
      </div>
      <div class="btn_box" v-if="cztype ==='assign'">
        <button type="button" class="btn save" @click="submitAssign">提交</button>
      </div>
      <div class="masker" v-show="isLoading">
        <div><img src="../../assets/browse/download.gif"/>
          <p>提交中...</p>
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
    getSeeBuiltData,
    taskComplete,
    submitAuditData,
    getSuggestions,
    getInstructMyTreeData,
    getInstructOtherTreeData,
    transferTask
  } from '../../service/built'
  import {WindowLoc} from '../../service/api'

  export default{
    data() {
      return {
        dataType:'',
        userAccountId:this.$store.state.accountId,
        handleTaskUser:'',            //提交过的ID
        handleTaskOrg:'',            //机构的ID
        cztype: '',                  //操作类型
        approveContent: '',          //处理建议
        reportId: '',                //报送ID
        taskId: '',                  //任务ID
        instructContent: '',        //转交描述
        dialogVisible: false,     //任务指令弹窗
        instructVisible: false, //是否显示执行人弹窗
        reportInfoData: {},
        isLoading: false,           //保存的遮罩层
        subNavData: [],              //子集导航
        imagesfileData: [],          //图片file数据
        fileshowData: [],                      //附件显示数据（name）
        fileData: [],                          //附件file数据
        disposeContent: '',         //处理描述
        forwardVisible: false, //是否显示接收人弹窗
        suggestionsArr: [],    //任务指令选中的值
        orguserDataArr: [],                   //我的单位选中的值
        orguserData: [],                      //人员列表
        quickAddData: [],      //任务指令-快捷添加
        instructUser: [],      //执行人--提交
        nodesData: [],                        //其它单位
        defaultProps: {
          children: 'children',      //指定子树为节点对象的某个属性值
          label: 'name'              //指定节点标签为节点对象的某个属性值
        },
        saveType: 1,                          //添加 机构1  人员2
        taskIdTableId: '',               //任务表主键
        err: {
          tips1: false,
          err1: '',
          tips2: false,
          err2: '',
          tips9: false,
          err9: '',
          tips10: false,
          err10: '',
          tips11: false,
          err11: '',
        },
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
      //下载附件
      downloadFj(url, name) {
        WindowLoc('/reportInfo/downLoadFile?fileName=' + name + '&filePath=' + url);
      },
      //指令 —— 删除执行人
      delInstruct(id){
        let _this = this;
        for(var i in _this.instructUser){
          if(_this.instructUser[i].id === id){
            _this.instructUser.splice(i,1);
            break;
          }
        }
      },
      //交办 --交办
      submitAssign(){
        var _this = this;
        if (_this.instructContent.length > 200) {
          _this.err.tips1 = true;
          _this.err.err1 = '转交描述最多200个字符！';
          return false;
        } else {
          _this.err.tips1 = false;
        }
        let sqrID = "";
        for(let i in _this.instructUser){
          sqrID += _this.instructUser[i].id+",";
        }
        sqrID = sqrID.substr(0,sqrID.length-1);
        let parms = {
          groupId: _this.$store.state.generalGroupId,       //集团ID
          taskId:_this.taskIdTableId,
          reportId:_this.reportId,
          orgId:_this.$store.state.orgId,
          transferContent: _this.instructContent,            //处理意见
        };
        if(sqrID == ''){
          _this.err.tips2 = true;
          _this.err.err2 = '转交人员不能为空！';
          return false;
        }else{
          _this.err.tips2 = false;
        }
        if(_this.saveType == 1){
          //机构
          parms.transferUser = '';   //审批人
          parms.transferOrg = sqrID; //审批部门
        }else{
          //人员
          parms.transferUser = sqrID;   //审批人
          parms.transferOrg = ''; //审批部门
        }
        transferTask(JSON.stringify(parms), _this.hideLays).then(res =>{
            console.log(res);
          if(res.data.status === '0'){
            _this.$message({
              type: 'success',
              customClass: 'ele_ui_tips_position',
              message: '交办成功!'
            });
            _this.$router.replace({ path: 'yqtask'});
          }else{
            _this.$message({
              type: 'error',
              customClass: 'ele_ui_tips_position',
              message: res.data.msg
            });
            _this.isLoading = false;
          }
        }).catch(err =>{
            console.log(err);
        })
      },
      //回执 —— 回执提交
      submitAudit(){
        var _this = this;
        if (_this.disposeContent.length == 0) {
          _this.err.tips11 = true;
          _this.err.err11 = '回执描述不能为空！';
          return false;
        } else {
          _this.err.tips11 = false;
        }
        if (_this.disposeContent.length > 200) {
          _this.err.tips11 = true;
          _this.err.err11 = '回执描述最多200个字符！';
          return false;
        } else {
          _this.err.tips11 = false;
        }
        let formData = new FormData();
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
        formData.append('approveContent', _this.disposeContent);               //回执描述d
        formData.append('groupId', this.$store.state.generalGroupId);         //回执描述d
        formData.append('taskId', _this.taskId);                               //工作流任务ID
        formData.append('taskIdTableId', _this.taskIdTableId);                  //任务表主键
        formData.append('reportId', _this.reportId);                             //报送ID
        taskComplete(formData, _this.hideLays).then(res => {
          if(res.data.status === '0'){
            _this.$message({
              type: 'success',
              customClass: 'ele_ui_tips_position',
              message: '提交成功!'
            });
            _this.$router.replace({ path: 'yqtask'});
            //window.close();
          }else{
            _this.$message({
              type: 'error',
              customClass: 'ele_ui_tips_position',
              message: res.data.msg
            });
            _this.isLoading = false;
          }
        }).catch(err => {

        });
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
      //指令 —— 查看任务指令选中的值
      checkinlist(val){
        // console.log('--------任务指令选中的值--------');
        // console.log(this.suggestionsArr);
      },
      //指令 —— 查看我的单位选中的值
      checkMylist(val){
        // console.log('--------我的单位选中的值--------');
        // console.log(this.orguserDataArr);
      },
      //指令 —— 提交任务指令赋值
      submitQuickAdd(formName) {
        let _this = this;
        for(let i in _this.suggestionsArr){
          _this.instructContent +=_this.suggestionsArr[i]+' ';
        }
        _this.dialogVisible = false;
        this.suggestionsArr = [];//清空之前的选项
      },
      //指令 —— 显示执行人弹窗
      addInstructUser(){
        this.saveType = 1;
        this.instructVisible = true;
        // 其他单位数据为空时请求
        if(this.nodesData.length == 0){
          this.setzTree();
        }
      },
      //指令 —— 保存执行人
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
          _this.instructUser = [];
          for (let i in otherData) {
            _this.instructUser.push({
              name: otherData[i].name,
              id: otherData[i].id
            })
          }
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
          _this.instructUser = [];
          for (let i in _this.orguserData) {
            for (let j in _this.orguserDataArr) {
              if (_this.orguserData[i].name == _this.orguserDataArr[j]) {
                _this.instructUser.push({
                  id: _this.orguserData[i].accountId,
                  name: _this.orguserDataArr[j]
                });
              }
            }
          }
        }
        this.instructVisible = false;
      },
      //指令 —— 其它组织  我的单位切换
      switchNav(s){
        this.saveType = s;
        if (s == 2 && this.orguserData.length === 0) {
          this.getOrgUserData();
        } else if (s == 2) {
          this.orguserDataArr = [];
        }
      },
      //指令 —— 查询我的单位数据
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
            let noSelectUId = _this.handleTaskUser+','+_this.userAccountId;
            console.log(noSelectUId);
            _this.orguserData.forEach((org,index)=>{
                if(noSelectUId.indexOf(org.accountId) > -1){
                  _this.orguserData[index].disabled = true;
                }
            });
          } else {
            console.log('没有返回值');
          }
        }).catch(err => {
          console.log(err, '请求失败！');
        });
      },
      //设置机构不能选择
      setzTreeNoSelect(z){
        let _this = this;
        z.forEach((tree,index)=>{
            if(_this.handleTaskOrg.indexOf(tree.id) > -1){
               tree.disabled = true;
            }
            if(tree.children.length > 0){
              _this.setzTreeNoSelect(tree.children);
            }
        });
      },
      //指令 —— 获取批示人数据
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
            console.log("getInstructOtherTreeData+++++++++++++++");
            console.log(_this.nodesData);
            _this.setzTreeNoSelect(_this.nodesData)
          } else {
            console.log('没有返回值');
          }
        }).catch(err => {
          console.log(err, '请求失败！');
        });
      },
    },
    mounted() {
      let username = this.$store.state.userinfo_name;
      let account = this.$store.state.account.substr(7,4);
      Watermark.set(username+"  "+account);
      let _this = this;
      let query = this.$route.query;  //获取链接 ？ 之后的参数
      _this.cztype = query.cztype;        //类型
      _this.taskIdTableId = query.id;      //任务主键ID
      _this.taskId = query.taskId || '';    //提交时使用
      _this.reportId = query.reportId || '';
      _this.handleTaskUser = query.handleTaskUser || '';   //用户iD
      _this.handleTaskOrg = query.handleTaskOrg+'' || '';    //机构iD
      _this.dataType = query.type || '';              //数据类型 机构1 还是个人2
      if(_this.dataType == '2'){
        _this.handleTaskOrg = this.$store.state.orgId+'';
      }
      let data = {
        groupId: this.$store.state.generalGroupId,
        id: _this.reportId
      };
      getSeeBuiltData(data).then(function (res) {
        if (res.data.result) {
          _this.reportInfoData = res.data.result.data;
          if (typeof _this.reportInfoData.approver === 'string') {
            _this.reportInfoData.approver = JSON.parse(_this.reportInfoData.approver);
          }
          if (typeof _this.reportInfoData.enclosures === 'string') {
            _this.reportInfoData.enclosures = JSON.parse(_this.reportInfoData.enclosures);
          }
          _this.reportInfoData.fileData = [];
          _this.reportInfoData.imagesSrc = [];
          if (_this.reportInfoData.enclosures.length > 0) {
            for (var i in _this.reportInfoData.enclosures) {
              if (_this.reportInfoData.enclosures[i].type == 1) {
                //图片
                _this.reportInfoData.imagesSrc.push(_this.reportInfoData.enclosures[i]);
              } else {
                //附件
                _this.reportInfoData.fileData.push(_this.reportInfoData.enclosures[i]);
              }
            }
          }
          //处理详细记录中的附件和图片
          if (_this.reportInfoData.approvers.length > 0) {
            for (var j in _this.reportInfoData.approvers) {
              if (typeof _this.reportInfoData.approvers[j].enclosures === 'string') {
                _this.reportInfoData.approvers[j].enclosures = JSON.parse(_this.reportInfoData.approvers[j].enclosures);
              }
              _this.reportInfoData.approvers[j].imagesSrc = [];
              _this.reportInfoData.approvers[j].fileData = [];
              if (_this.reportInfoData.approvers[j].enclosures.length > 0) {
                for (var n in _this.reportInfoData.approvers[j].enclosures) {
                  if (_this.reportInfoData.approvers[j].enclosures[n].type == 1) {
                    //图片
                    _this.reportInfoData.approvers[j].imagesSrc.push(_this.reportInfoData.approvers[j].enclosures[n]);
                  } else {
                    //附件
                    _this.reportInfoData.approvers[j].fileData.push(_this.reportInfoData.approvers[j].enclosures[n]);
                  }
                }
                // console.log(_this.reportInfoData.approvers[j].imagesSrc)
              }
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

      //获取处置建议 —— 任务指令
      let parms = {
        groupId:this.$store.state.generalGroupId,       //集团ID
      };
      getSuggestions(parms).then(function(res){
        if(res.data.status == '0'){
          if(res.data.result.data){
            _this.quickAddData = JSON.parse(res.data.result.data.dict_value);
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
    },
    watch: { //深度 watcher
      'state': {  //审批需要
        handler(val, oldval) {
          if (val != '3') {
            this.err.err2.showtips = false;
          }
        },
        deep: true
      },
    }
  }
</script>
<style lang="less">
  @import "../../style/seebuilt.css";
</style>
