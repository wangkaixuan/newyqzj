<template>
    <div class="wary_see">
		<yqzj-Head @setSecondNav="setSubNav" funName="工作台" v-if="from == 'workbench'" subname="舆情报送"></yqzj-Head>
		<yqzj-Head @setSecondNav="setSubNav" funName="工作台" v-if="from == 'examine'" subname="舆情审批"></yqzj-Head>
		<yqzj-Head @setSecondNav="setSubNav" funName="工作台" v-if="from == 'task'" subname="舆情任务"></yqzj-Head>
		<yqzj-Head @setSecondNav="setSubNav" funName="工作台" v-if="from == 'transact'" subname="抄送办理"></yqzj-Head>
		<!-- <work-nav :subNavData="subNavData" v-if="from == 'workbench'" navName='舆情报送'></work-nav>
		<work-nav :subNavData="subNavData" v-if="from == 'examine'" navName='舆情批示'></work-nav> -->
		<div class="center border_box">
			<div class="see_built_tit" v-if="from == 'workbench'">舆情报送 - 查看</div>
			<div class="see_built_tit" v-else-if="from == 'examine' && cztype =='audit'">舆情审批 - 审批</div>
			<div class="see_built_tit" v-else-if="from == 'examine' && cztype =='instruct'">舆情审批 - 指令</div>
			<div class="see_built_tit" v-else-if="from == 'examine' && cztype =='forward'">舆情审批 - 转发</div>
			<div class="see_built_tit" v-else-if="from == 'examine'">舆情审批 - 查看</div>
			<div class="see_built_tit" v-else-if="from == 'transact' && cztype =='comment'">抄送办理 - 评论</div>
			<div class="see_built_tit" v-else-if="from == 'transact'">抄送办理 - 查看</div>
			<div class="see_built_tit" v-else-if="from == 'task'">舆情任务 - 查看</div>
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
				<!-- <div class="see_built_list">
					<label>处置建议：</label><span>{{reportInfoData.handlingProposal}}</span>
				</div>
				<div class="see_built_list clearfix_see" v-if="reportInfoData.imagesSrc && reportInfoData.imagesSrc.length > 0">
					<p class="p1">图片：</p>
					<div class="p2">
						<ul class="imgs">
							<li v-for="ic in reportInfoData.imagesSrc"><img :src="ic.url" ></li>
						</ul>
					</div>
				</div>
				<div class="see_built_list clearfix_see" v-if="reportInfoData.fileData && reportInfoData.fileData.length > 0">
					<p class="p1">附件：</p>
					<div class="p2">
						<ul class="fj">
							<li v-for="fd in reportInfoData.fileData">  <a href="javascript:void (0)" @click="downloadFj(fd.url,fd.name)">{{fd.name}}</a></li>
						</ul>
					</div>
				</div> -->
				<!-- 审批  指令  评论 显示上报人
				<div class="see_built_list clearfix_see" v-if="cztype =='audit' || cztype =='instruct' || cztype =='comment' || cztype =='forward'">
					<p class="p1" style="line-height: 35px">上报人：</p>
					<p class="p2">
						<span class="enclosure"><span name="instruct_user">{{reportInfoData.createUser}}</span></span>
					</p>
				</div>-->
				<!-- 查看显示批示人
				<div class="see_built_list clearfix_see" v-else>
					<p class="p1" style="line-height: 30px">批示人：</p>
					<p class="p2">
						<span class="enclosure" v-for="apps in reportInfoData.approver"><span name="instruct_user">{{apps.name}}</span></span>
					</p>
				</div>-->
				<div class="see_built_list clearfix_see">
					<p class="p1">审批记录：</p>
					<div class="line" v-if="reportInfoData.approvers != ''" ></div>
					<div class="start" v-if="reportInfoData.approvers != ''"></div>
					<div class="end" v-if="reportInfoData.approvers != ''"></div>
					<div class="desc clearfix_see" v-for="item in reportInfoData.approvers" v-if="reportInfoData.approvers != ''">
						<div class="desc_left" ref="descLeft">
							<p>{{item.opeartTime.substr(11)}}</br>{{item.opeartTime.substr(0,10)}}</p>
						</div>
						<div class="desc_right">
							<div class="p3 clearfix_see"><span class="light" >{{item.accountName}}</span><span class="slant_line">/</span><span class="dark">{{item.stateName}}</span></div>
							<div class="p4 clearfix_see"><span class="light">描述</span><span class="dark">{{item.approveContent}}</span></div>
							<div class="p5 clearfix_see" v-if="item.fileData.length > 0">
								<span class="light">附件</span>
								<p class="files">
									<span class="dark" v-for="file in item.fileData" @click="downloadFj(file.url,file.name)">{{file.name}}</span>
								</p>
							</div>
							<div class="p5 clearfix_see"  v-if="item.imagesSrc.length > 0">
								<span class="light">图片</span>
								<p class="files">
									<a :href="img.url" target="_blank"  v-for="img in item.imagesSrc"><img :src="img.url" /></a>
								</p>
							</div>
						</div>
					</div>
					<span style="margin-left: 6px;" v-if="reportInfoData.approvers == ''">暂无记录</span>
				</div>
				<!-- 评论记录 -->
				<div class="see_built_list clearfix_see">
					<p class="p1">批示记录：</p>
					<div class="line" v-if="reportInfoData.batchProcessList != ''" ></div>
					<div class="start" v-if="reportInfoData.batchProcessList != ''"></div>
					<div class="end" v-if="reportInfoData.batchProcessList != ''"></div>
					<div class="desc clearfix_see" v-for="(item,i) in reportInfoData.batchProcessList" v-if="reportInfoData.batchProcessList != ''">
						<div class="desc_left" ref="descLeft">
							<p>{{item.approveTime.substr(11)}}</br>{{item.approveTime.substr(0,10)}}</p>
						</div>
						<div class="desc_right">
							<div class="p3 clearfix_see">
								<span class="light" v-if="item.approveType == 1" :ref="'utype'+i" :id="'utype'+i">{{item.forwardUserName}}</span><!-- approveType ：1 转发 2 批示-->
								<span class="light" v-else>{{item.approverUserName[0]}}</span>

								<span class="ops_process" v-if="item.approveType == 1" :ref="'uops'+i" :id="'utype'+i">{{item.approveTypeName}}给</span>
								<span class="ops_process" v-else>{{item.approveTypeName}}</span>
								<!-- 转发多个人时展示 -->
								<p class="ops_content" v-if="item.approveType == 1 && item.approverUserName.length <= 5">
									<span class="dark" v-for="(m,n) in item.approverUserName"><span class="light_line" v-if="(n+1) > 1">|</span>{{m}}</span>
								</p>
								<p class="ops_content" v-if="item.approveType == 1 && item.approverUserName.length > 5">
									<span class="dark" v-for="(m,n) in item.approverUserName" v-show="n < 5"><span class="light_line" v-if="(n+1) > 1">|</span>{{m}}</span>
									<span class="dark" v-for="(m,n) in item.approverUserName" v-show="n >= 5 && isOver"><span class="light_line">|</span>{{m}}</span>
									<span class="see_more" @click="seeMore(item)" v-show="!isOver">更多...</span>
								</p>
							</div>
							<div class="p4 clearfix_see"><span class="light">描述</span><span class="dark">{{item.approvalcontent}}</span></div>
						</div>
					</div>
					<span style="margin-left: 6px;" v-if="reportInfoData.batchProcessList == ''">暂无记录</span>
				</div>
				<!-- 审批相关内容开始 -->
				<div class="see_built_list clearfix_see" v-if="cztype =='audit'" :class="{mar_top: reportInfoData.approvers != ''}">
					<label>处置方式：</label>
					<label class="label1"><input type="radio" v-model="state" value="1"> 通过</label>
					<label class="label1"><input type="radio" v-model="state" value="2"> 驳回</label>
					<label class="label1" style="width:120px;margin-left: 28px;" v-if="infoType == 1"><input type="radio" v-model="state" value="3"> 通过并下达指令</label>
				</div>
				<div class="see_built_list clearfix_see" v-if="cztype =='audit' && state !='3'">
					<label>批示内容：</label>
					<textarea v-model="approveContent" class="approval_content"></textarea>
				</div>
				<div class="see_built_tips"  v-show="err.err1.showtips">
	                <span class="see_built_error"><em>*</em><span class="see_built_error_info">{{err.err1.errtips}}</span></span>
	            </div>
	            <!-- 审批相关内容结束 -->
	            <!-- 指令相关内容开始 -->
	            <div class="see_built_list clearfix_see" v-if="cztype =='instruct' || state =='3'">
					<label>任务指令：</label>
					<textarea v-model.trim="instructContent" class="approval_content"></textarea>
					<span class="quick_add" @click="dialogVisible = true">快捷添加</span>
				</div>
				<div class="see_built_tips"  v-show="err.err2.showtips">
	                <span class="see_built_error"><em>*</em><span class="see_built_error_info">{{err.err2.errtips}}</span></span>
	            </div>
	            <el-dialog
                  title="快捷添加"
                  :visible.sync="dialogVisible"
                  :close-on-click-modal="false"
                  custom-class="add_built_diag"
                  width="840px">
                    <el-checkbox-group v-model="suggestionsArr" @change="checkinlist">
                      <el-checkbox v-for="(item,i) in quickAddData" :key="i" :label="item.name" name="quick_add_opts" :value="item.type"></el-checkbox>
                    </el-checkbox-group>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitQuickAdd">确 定</el-button>
                  </span>
                </el-dialog>
	            <div class="see_built_list clearfix_see" v-if="cztype =='instruct' || state =='3'">
	            	<div class="executor_left"><label>执行人：</label><span class="add_icon" @click="addInstructUser"></span></div>
	            	<div class="executor_right">
	            		<span class="enclosure" v-if="instructUser.length > 0" v-for="item in instructUser"><span name="instruct_user">{{item.name}}</span><span class="close" @click="delInstruct(item.id)">×</span></span>
	            	</div>
	            </div>
	            <div class="see_built_tips" v-show="err.err3.showtips">
	                <span class="see_built_error"><em>*</em><span class="see_built_error_info">{{err.err3.errtips}}</span></span>
	            </div>
	            <el-dialog
                  :visible.sync="instructVisible"
                  :close-on-click-modal="false"
                  custom-class="instruct_diag"
                  width="450px">
                    <div class="instructions_wary_box">
                        <div class="instructions_title_box">
                            <span v-bind:class="{hover:saveType==1}" @click="switchNav(1)">选择单位</span><span v-bind:class="{hover:saveType==2}" @click="switchNav(2)">选择人</span>
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
                            <div  class="myOrg" v-bind:class="{hide:saveType==1}">
                                <el-checkbox-group v-model="orguserDataArr" @change="checkMylist">
                                  <el-checkbox v-for="(org,i) in orguserData" :key="i" :label="org.name" name="userCheckbox" v-bind:username="org.name" :value="org.accountId"></el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="instructVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveInstructions">确 定</el-button>
                  </span>
                </el-dialog>
                <!-- 指令相关内容结束 -->
                <!-- 评论相关内容开始 -->
                <div class="see_built_list clearfix_see" v-if="cztype =='comment'">
					<label>批示描述：</label>
					<textarea v-model="commentContent" class="approval_content"></textarea>
				</div>
				<div class="see_built_tips"  v-show="err.err4.showtips">
	                <span class="see_built_error"><em>*</em><span class="see_built_error_info">{{err.err4.errtips}}</span></span>
	            </div>
                <!-- 评论相关内容结束 -->
                <!-- 转发相关内容开始 -->
                <div class="see_built_list clearfix_see" v-if="cztype =='forward'">
					<label>描述：</label>
					<textarea v-model="forwardContent" class="approval_content"></textarea>
				</div>
				<div class="see_built_tips"  v-show="err.err5.showtips">
	                <span class="see_built_error"><em>*</em><span class="see_built_error_info">{{err.err5.errtips}}</span></span>
	            </div>
	            <div class="see_built_list clearfix_see" v-if="cztype =='forward'">
	            	<div class="executor_left"><label>接收人：</label><span class="add_icon" @click="addForwardUser"></span></div>
	            	<div class="executor_right">
	            		<span class="enclosure" v-if="delRepeatUsers.length > 0" v-for="item in delRepeatUsers"><span name="instruct_user">{{item.name}}</span><span class="close" @click="delForward(item.id)">×</span></span>
	            	</div>
	            </div>
	            <div class="see_built_tips" v-show="err.err6.showtips">
	                <span class="see_built_error"><em>*</em><span class="see_built_error_info">{{err.err6.errtips}}</span></span>
	            </div>
	            <el-dialog
	              title="接收人"
                  :visible.sync="forwardVisible"
                  :close-on-click-modal="false"
                  custom-class="instruct_diag"
                  width="640px">
                    <div class="instructions_wary_box">
                        <div class="instructions_are_content clearfix_see margin_btom">
                            <div class="border_box department">
                                <el-tree
                                  :data="departmentTreeData"
                                  default-expand-all
                                  check-on-click-node
                                  :expand-on-click-node='false'
                                  node-key="id"
                                  ref="departmenttree"
                                  highlight-current
                                  @node-click="handleNodeClick"
                                  :props="defaultProps">
                                </el-tree>
                            </div>
                            <div  class="border_box department_user">
                                <el-checkbox-group v-model="forwardDepartmentDataArr"v-if="forwardDepartmentData.length > 0" @change="checkinPersonlist">
                                  <!-- <el-checkbox v-for="(item,i) in forwardDepartmentData" :key="i" :label="item.userName+'（角色：'+(item.roleName.length > 0 ? item.roleName : '无')+'）'" name="userCheckbox" v-bind:username="item.userName" :value="item.id"></el-checkbox> -->
                                  <el-checkbox v-for="(item,i) in forwardDepartmentData" :key="i" :label="item.userName" name="userCheckbox" v-bind:username="item.userName" :value="item.id" :disabled="item.disabled"></el-checkbox>
                                </el-checkbox-group>
                                <p class="no_users" v-else>暂无数据</p>
                            </div>
                        </div>
                        <!-- 勾选中的人员展示 -->
                        <div class="checked_department_user clearfix_see" :class="{hide: forwardDepartmentDataArr.length == 0}">
                        	<label>接收的人员：</label>
                        	<!-- <textarea v-model="checked_users" class="approval_content"></textarea> -->
                        	<div class="executor_right">
			            		<span class="enclosure" v-if="forwardDepartmentDataArr.length > 0" v-for="item in forwardDepartmentDataArr"><span name="instruct_user">{{item}}</span><span class="close" @click="delForward2(item)">×</span></span>
			            	</div>
                        </div>
                    </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="cancleForward">取 消</el-button>
                    <el-button type="primary" @click="saveForward">确 定</el-button>
                  </span>
                </el-dialog>
                <!-- 转发相关内容结束 -->
			</div>
			<!-- 审核提交 -->
			<div class="btn_box" v-if="cztype =='audit' && state !='3'">
				<button type="button" class="btn save" @click="submitAudit">提交</button>
			</div>
			<!-- 指令提交 -->
			<div class="btn_box" v-if="cztype =='instruct' || state =='3'" >
				<button type="button" class="btn save" @click="submitInstruct">提交</button>
			</div>
			<!-- 评论提交 -->
			<div class="btn_box" v-if="cztype =='comment'" >
				<button type="button" class="btn save" @click="submitComment">提交</button>
			</div>
			<!-- 转发提交 -->
			<div class="btn_box" v-if="cztype =='forward'" >
				<button type="button" class="btn save" @click="submitForward">提交</button>
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
import VueCookies from 'vue-cookies'
import Watermark from '../../js/watermark'
import {getSeeBuiltData,downloadBuiltData,submitAuditData,getSuggestions,getInstructMyTreeData,getInstructOtherTreeData,getOrgUserList,saveTaskInfo,saveForwardInfo,saveCommentInfo,submitTaskAuditData} from '../../service/built'
import {WindowLoc} from '../../service/api'

export default{
	data() {
	    return {
	    	from: '', //workbench 来自舆情报送 examine 来自舆情审核  transact 来自抄送办理  task 来自舆情任务
	    	state:'1',                  //处理状态 1通过 2驳回 3通过并下指令
	    	cztype:'',                  //操作类型
	    	approveContent:'',          //处理建议
	    	reportId:'',                //报送ID
        	taskId:'',                  //任务ID
	    	reportInfoData: {},
	    	isLoading: false,           //保存的遮罩层
	    	subNavData:[],                       //子集导航
	    	err: {
	    		err1: {              //审批 —— 批示内容
	    			showtips: false, //是否显示错误的验证信息
	    			errtips: '',     //错误信息
	    		},
	    		err2: {              //指令 —— 任务指令
	    			showtips: false, //是否显示错误的验证信息
	    			errtips: '',     //错误信息
	    		},
	    		err3: {              //指令 —— 执行人
	    			showtips: false, //是否显示错误的验证信息
	    			errtips: '',     //错误信息
	    		},
	    		err4: {              //评论
	    			showtips: false, //是否显示错误的验证信息
	    			errtips: '',     //错误信息
	    		},
	    		err5: {				 //转发 —— 描述
	    			showtips: false, //是否显示错误的验证信息
	    			errtips: '',     //错误信息
	    		},
	    		err6: {				 //转发 —— 接收人
	    			showtips: false, //是否显示错误的验证信息
	    			errtips: '',     //错误信息
	    		}
	    	},
	    	dialogVisible: false,  //任务指令弹窗
	    	suggestionsArr: [],    //任务指令选中的值
	    	quickAddData: [],      //任务指令-快捷添加
	    	instructContent: '',   //任务指令内容
	    	instructType: '1',      //指令来源   1:部门下达 ，2：人下达
	    	instructUser: [],      //执行人--提交
	    	instructVisible: false, //是否显示执行人弹窗
	    	//查看组织树——其它单位
            nodesData:[],                        //其它单位
            saveType:1,                          //添加 机构1  人员2
            showtype:1,                          //保存类型
            defaultProps: {
              children: 'children',      //指定子树为节点对象的某个属性值
              label: 'name'              //指定节点标签为节点对象的某个属性值
            },
            //查看组织树——我的单位
            orguserData:[],                      //人员列表
            orguserDataArr:[],                   //我的单位选中的值
            commentContent: '',    //评论描述
            forwardContent: '',    //转发 —— 描述
            forwardVisible: false, //是否显示接收人弹窗
            forwardUser: [],         //转发 —— 接收人
            delRepeatUsers: [],      ////转发 —— 接收人 去重后的
            departmentTreeData: [], //部门树
            forwardDepartmentData:[],          //部门对应的人员
            forwardDepartmentDataArr:[],       //部门对应的人员选中的值
            saveUser: [],  //保存时接收人
            infoType: '', //信息类型， 1 上报 2 任务
            taskTableId: -1, //不存在
            hasForwardUser: [], //已经转发过的人
            isTask: '',         //转发的信息类型  审批类型 1报送审批 2任务审批
            isOver: false, //是否超过5条
	    }
	},
	components:{
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
		downloadFj(url,name) {
      		WindowLoc('/reportInfo/downLoadFile?fileName='+name+'&filePath='+url);
		},
		//审批 —— 审批提交
		submitAudit(){
			var _this = this;
            if(_this.approveContent.length > 200){
            	_this.err.err1.showtips = true;
            	_this.err.err1.errtips = '批示内容最多200个字符！';
                return false;
            }else{
            	_this.err.err1.showtips = false;
            }
            let data = {
            	groupId:this.$store.state.generalGroupId,       //集团ID
                reportId:_this.reportId,                        //报送ID
                taskId:_this.taskId,                            //任务ID
                state:_this.state,                              //处理状态
                approveContent:_this.approveContent,            //处理建议
                orgId: _this.$store.state.orgId,                //机构ID $store.state.orgId
                type: _this.instructType,                       // type  1:部门下达 ，2：人下达
            };
            if(_this.infoType == 1){ // 1 上报信息
            	submitAuditData(JSON.stringify(data),_this.hideLays).then(function (res) {
	                if(res.data.status == 0){
	                	if(res.data.result.data == 1){ //1成功
	                		_this.$message({
		                        type: 'success',
		                        customClass: 'ele_ui_tips_position',
		                        message: '提交成功!'
		                    });
		                    if(_this.from == 'workbench'){
		                        _this.$router.replace({ path: 'workbench'});
		                    }else{
		                        _this.$router.replace({ path: 'publicOpinionAudit'});
		                    }
	                	}else{
	                		_this.$message({
		                        type: 'error',
		                        customClass: 'ele_ui_tips_position',
		                        message: '提交失败！'
		                    });
	                		_this.isLoading = false;
	                	}
	                }else{
	                	_this.$message({
		                    type: 'error',
		                    customClass: 'ele_ui_tips_position',
		                    message: res.data.msg
		                });
		                _this.isLoading = false;
	                }
			    }).catch(err=>{
			        _this.$message({
	                    type: 'error',
	                    customClass: 'ele_ui_tips_position',
	                    message: '请求失败！'
	                });
			    });
            }else{ //2任务提交
            	data.taskIdTableId = _this.taskTableId;  // taskTableId : 任务表主键
            	submitTaskAuditData(JSON.stringify(data),_this.hideLays).then(function (res) {
	            	if(res.data.status == 0){
	            		_this.$message({
	                        type: 'success',
	                        customClass: 'ele_ui_tips_position',
	                        message: '提交成功!'
	                    });
	                    if(_this.from == 'workbench'){
	                        _this.$router.replace({ path: 'workbench'});
	                    }else{
	                        _this.$router.replace({ path: 'publicOpinionAudit'});
	                    }
	            	}else{
	                	_this.$message({
		                    type: 'error',
		                    customClass: 'ele_ui_tips_position',
		                    message: res.data.msg
		                });
		                _this.isLoading = false;
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
        //指令 —— 取消
        // cancleQuuckAdd() {
        // 	this.dialogVisible = false;
        // 	this.suggestionsArr = [];//清空之前的选项
        // },
        //指令 —— 提交任务指令赋值
        submitQuickAdd(formName) {
        	let _this = this;
        	for(let i in _this.suggestionsArr){
        		// console.log(_this.suggestionsArr[i]);
        		_this.instructContent +=' '+_this.suggestionsArr[i];
        	}
        	_this.dialogVisible = false;
            this.suggestionsArr = [];//清空之前的选项
	    },
		//指令 —— 显示执行人弹窗
		addInstructUser(){
			let _this = this;
			if(this.showtype === 1){
              if(this.nodesData.length == 0){
                  //没有数据
                this.setzTree();
              }else{
                //有数据
                let ztreeId = [];
                this.instructUser.forEach((iad,index) =>{
                  ztreeId.push(iad.id);
                });
                this.$refs.othertree.setCheckedKeys(ztreeId);
              }
            }else{
                if(this.orguserData.length == 0){
                    this.getOrgUserData();
                    return false;
                }
              let areString = JSON.stringify(this.instructUser);
              _this.orguserDataArr = [];
              this.orguserData.forEach((org,i) =>{
                 if(areString.indexOf(org.accountId) > -1){
                   _this.orguserDataArr.push(org.name);
                 }
              });
            }
            this.saveType = this.showtype;
            this.instructVisible = true;
		},
        //指令 —— 其它组织  我的单位切换
        switchNav(s){
            this.saveType = s;
            if(s == 2 && this.orguserData.length === 0){
                this.getOrgUserData();
            }else if(s == 2){
                // this.orguserDataArr = [];
            }
        },
        //指令 —— 查询我的单位数据
        getOrgUserData:function () {
            let _this = this;
            let parms = {
                groupId: this.$store.state.generalGroupId,
                orgId: this.$store.state.orgId,
                type: 2   // 1简单树，2 复杂树
            };
            getInstructMyTreeData(parms).then(function (res) {
                if(res.data.result){
                   _this.orguserData = res.data.result.data;
                }else{
                    console.log('没有返回值');
                }
            }).catch(err=>{
                console.log(err,'请求失败！');
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
                if(res.data.result){
                   _this.nodesData = res.data.result.data;
                }else{
                    console.log('没有返回值');
                }
            }).catch(err=>{
                console.log(err,'请求失败！');
            });
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
		//指令 —— 保存执行人
        saveInstructions(){
            let _this = this;
            if(_this.saveType == 1){ //机构 其它单位
                let otherData = this.$refs.othertree.getCheckedNodes();
                if(otherData.length == 0){
                    _this.$message({
                      type: 'error',
                      customClass: 'ele_ui_tips_position',
                      message: '请选择机构！'
                    });
                    return false;
                }else{
                    _this.err.tips11 = false;
                }
                _this.instructUser = [];
                for(let i in otherData){
                    _this.instructUser.push({
                        name: otherData[i].name,
                        id: otherData[i].id
                    })
                }
                this.orguserDataArr = [];
            }else{ //人员 我的单位
                if(_this.orguserDataArr.length == 0){
                    _this.$message({
                      type: 'error',
                      customClass: 'ele_ui_tips_position',
                      message: '请选择人员！'
                    });
                    return false;
                }else{
                    _this.err.tips11 = false;
                }
                _this.instructUser = [];
                for(let i in _this.orguserData){
                    for(let j in _this.orguserDataArr){
                        if(_this.orguserData[i].name == _this.orguserDataArr[j]){
                            _this.instructUser.push({
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
		//指令 —— 指令提交
		submitInstruct(){
			let _this = this;
			if(_this.instructContent.length > 200){
            	_this.err.err2.showtips = true;
            	_this.err.err2.errtips = '任务指令最多200个字符！';
                return false;
            }else{
            	_this.err.err2.showtips = false;
            }
            if(_this.instructUser.length == 0){
            	_this.err.err3.showtips = true;
            	_this.err.err3.errtips = '请添加执行人';
                return false;
            }else{
            	_this.err.err3.showtips = false;
            }

            let sqrID = "";
            for(let i in _this.instructUser){
                sqrID += _this.instructUser[i].id+",";
            }
            sqrID = sqrID.substr(0,sqrID.length-1);

            let parms = {
            	reportId:  parseInt(_this.reportId),              //信息ID
            	orgId: _this.$store.state.orgId,                  //机构ID $store.state.orgId
            	groupId: _this.$store.state.generalGroupId,       //集团ID
            	approveContent: _this.instructContent,            //处理意见
            	type: _this.instructType,                         // type  1:部门下达 ，2：人下达
            };

            if(_this.saveType == 1){
                //机构
                parms.handleTaskUser = '';   //审批人
                parms.handleTaskOrg = sqrID; //审批部门
            }else{
                //人员
                parms.handleTaskUser = sqrID;   //审批人
                parms.handleTaskOrg = ''; //审批部门
            }

            let data = {
            	groupId: _this.$store.state.generalGroupId,      //集团ID
                reportId: parseInt(_this.reportId),              //报送ID
                taskId: _this.taskId,                            //任务ID
                state: '1',                                      //处理状态 1通过
                approveContent: ''                               //处理建议_this.approveContent
            };
            if(_this.state == '3'){
            	//待审批状态下 —— 通过并下指令
            	submitAuditData(JSON.stringify(data),_this.hideLays).then(function (res1) {
	                if(res1.data.status == 0){
	                	if(res1.data.result.data == 1){ //1成功
	                		//通过状态下指令提交
	                		saveTaskInfo(JSON.stringify(parms),_this.hideLays).then(function (res) {
				            	if(res.data.status == 0){
				            		_this.$message({
				                        type: 'success',
				                        customClass: 'ele_ui_tips_position',
				                        message: '提交成功!'
				                    });
				                    if(_this.from == 'workbench'){
				                        _this.$router.replace({ path: 'workbench'});
				                    }else{
				                        _this.$router.replace({ path: 'publicOpinionAudit'});
				                    }
				            	}else{
				            		_this.$message({
					                    type: 'error',
					                    customClass: 'ele_ui_tips_position',
					                    message: res.data.msg
					                });
					                _this.isLoading = false;
				            	}
				            }).catch(err=>{
						        _this.$message({
					                type: 'error',
					                customClass: 'ele_ui_tips_position',
					                message: '请求失败！'
					            });
						    });
	                	}else{
	                		_this.$message({
		                        type: 'error',
		                        customClass: 'ele_ui_tips_position',
		                        message: '提交失败！'
		                    });
	                		_this.isLoading = false;
	                	}
	                }else{
	                	_this.$message({
		                    type: 'error',
		                    customClass: 'ele_ui_tips_position',
		                    message: res1.data.msg
		                });
		                _this.isLoading = false;
	                }
			    }).catch(err=>{
			        _this.$message({
	                    type: 'error',
	                    customClass: 'ele_ui_tips_position',
	                    message: '请求失败！'
	                });
			    });
            }else{
            	//通过状态下指令提交
	            saveTaskInfo(JSON.stringify(parms),_this.hideLays).then(function (res) {
	            	if(res.data.status == 0){
	            		_this.$message({
	                        type: 'success',
	                        customClass: 'ele_ui_tips_position',
	                        message: '提交成功!'
	                    });
	                    if(_this.from == 'workbench'){
	                        _this.$router.replace({ path: 'workbench'});
	                    }else if(_this.from == 'examine'){
	                        _this.$router.replace({ path: 'publicOpinionAudit'});
	                    }
	            	}else{
	            		_this.$message({
		                    type: 'error',
		                    customClass: 'ele_ui_tips_position',
		                    message: res.data.msg
		                });
		                _this.isLoading = false;
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
		//评论提交
		submitComment(){
			let _this = this;
			if(_this.commentContent.length ==0){
            	_this.err.err4.showtips = true;
            	_this.err.err4.errtips = '不能为空！';
                return false;
            }else if(_this.commentContent.length > 200){
            	_this.err.err4.showtips = true;
            	_this.err.err4.errtips = '批示描述最多200个字符！';
                return false;
            }else{
            	_this.err.err4.showtips = false;
            }
			let data = {
				groupId: _this.$store.state.generalGroupId,          //集团ID
				reportId: parseInt(_this.reportId),                    //主键
				approvalContent: _this.commentContent,                 //评论描述
			}
			saveCommentInfo(JSON.stringify(data),_this.hideLays).then(function (res) {
				if(res.data.status == 0){
					if(res.data.result.data == 1){ //1成功
                		_this.$message({
	                        type: 'success',
	                        customClass: 'ele_ui_tips_position',
	                        message: '批示成功!'
	                    });
	                    _this.$router.replace({ path: 'transact'});
                	}else{
                		_this.$message({
	                        type: 'error',
	                        customClass: 'ele_ui_tips_position',
	                        message: '批示失败！'
	                    });
                		_this.isLoading = false;
                	}
				}else{
            		_this.$message({
	                    type: 'error',
	                    customClass: 'ele_ui_tips_position',
	                    message: res.data.msg
	                });
	                _this.isLoading = false;
            	}
			}).catch(err=>{
		        _this.$message({
	                type: 'error',
	                customClass: 'ele_ui_tips_position',
	                message: '请求失败！'
	            });
		    });
		},
		//转发 —— 显示接收人弹窗
		addForwardUser(){
			this.forwardVisible = true;
            // 部门数据为空时请求
            if(this.departmentTreeData.length == 0){
                this.setDepartmentTree();
            }
		},
		//转发 —— 删除接收人
		delForward(id){
			let _this = this;
			for(let i in _this.delRepeatUsers){
                if(_this.delRepeatUsers[i].id === id){
                    _this.delRepeatUsers.splice(i,1);
                    break;
                }
            }
            let remaind = [];
            for(let m in _this.delRepeatUsers){
            	remaind.push(_this.delRepeatUsers[m].name);
            }
            //删除人后，对应的checkbox勾选更新
            _this.forwardDepartmentDataArr = remaind;
            //解决删除人后出现的问题
            _this.forwardUser = _this.delRepeatUsers;
		},
		//转发 —— 删除接收的人员
		delForward2(item){
			let _this = this;
			for(let i in _this.forwardDepartmentDataArr){
				if(_this.forwardDepartmentDataArr[i] == item){
					_this.forwardDepartmentDataArr.splice(i,1);
                    break;
				}
			}
		},
		//转发 —— 取消弹窗
		cancleForward(){
			let _this = this;
			_this.forwardVisible = false;
			//清空之前的选择的值
			_this.forwardDepartmentDataArr = [];
			//清空之前的展示的选项
			_this.delRepeatUsers = [];
            //清空之前的，防止再选择时出现的bug
            _this.forwardUser = [];
		},
		//转发 —— 保存接收人
		saveForward(){
			let _this = this;
			this.forwardVisible = false;
			//每次清空之前的选项
			_this.delRepeatUsers = [];
			for(let i in _this.saveUser){
				let item = _this.saveUser[i];
				if(_this.forwardDepartmentDataArr.indexOf(item.name) > -1){
					_this.delRepeatUsers.push({
						id: item.id,
						name: item.name
					});
				}
			}
		},
		//转发 —— 获取人管管理部门树
		setDepartmentTree(){
			let _this = this;
			let data = {
				groupId: this.$store.state.generalGroupId,
				type: 2   // 1简单树，2 复杂树
			}
			getInstructOtherTreeData(data).then(function (res) {
				if(res.data.result){
                    _this.departmentTreeData = res.data.result.data;
                    //设置默认查询第一个节点的人员
                	_this.getDepartmentUserData(_this.departmentTreeData[0].id);
                	//设置默认高亮
                	_this.$nextTick(() => {
					  _this.$refs.departmenttree.setCurrentKey(_this.departmentTreeData[0].id);
					});
                }else{
                    console.log('没有返回值');
                }
			}).catch(err=>{
		        _this.$message({
	                type: 'error',
	                customClass: 'ele_ui_tips_position',
	                message: '请求失败！'
	            });
		    });
		},
		//转发 —— 根据部门获取对应人员
		getDepartmentUserData(id){
			let _this = this;
			let data = {
				pageSize:'10000',           //每页条数
	            orgIds: id,                  //集团id
	            pageNum:1,                  //当前页数
	            retrievalName :'',          //检束
	            state:''                    //状态 1启用 0停用
			};
			getOrgUserList(data).then(function (res) {
				// console.log('-----根据部门获取对用人员--------');
				// console.log(res);
				if(res.data.status == 0){
					if(res.data.result && res.data.result.data && res.data.result.data.length > 0){
						_this.forwardDepartmentData = res.data.result.data;
						//针对已经转发过的禁用，避免再次转发
						for(let i in _this.forwardDepartmentData){
							let fd = _this.forwardDepartmentData[i];
							if(_this.hasForwardUser.indexOf(fd.accountId) > -1){
								_this.forwardDepartmentData[i].disabled = true; //是否禁用
							}else{
								_this.forwardDepartmentData[i].disabled = false; //是否禁用
							}
			            }
					}else{
	                    console.log('没有返回值');
	                }
				}
			}).catch(err=>{
		        _this.$message({
	                type: 'error',
	                customClass: 'ele_ui_tips_position',
	                message: '请求失败！'
	            });
		    });
		},
        //转发 —— 查看部门对应的人员选中的值
        checkinPersonlist(val){
        	let _this = this;
        	// console.log('--------查看部门对应的人员选中的值--------');
            // console.log(this.forwardDepartmentDataArr);
		    //根据勾选的值，查询勾选的id
            for(let i in _this.forwardDepartmentData){
				let fd = _this.forwardDepartmentData[i];
				if(_this.forwardDepartmentDataArr.indexOf(fd.userName) > -1){
					_this.forwardUser.push({
						id: fd.accountId,
						name: fd.userName
					});
				}
            }
            // console.log('---------------不去重的结果---------');
            // console.log(_this.forwardUser);
            //针对 forwardUser 的值去重
            let result = [];
		    let obj = {};
		    for(let i =0; i<_this.forwardUser.length; i++){
		        if(!obj[_this.forwardUser[i].id]){
		        	result.push(_this.forwardUser[i]);
		        	obj[_this.forwardUser[i].id] = true;
		        }
		    }
		    // console.log('---------------去重后的结果---------');
            // console.log(result);
		    //保存选中的接收人
		    _this.saveUser = result;
        },
        //点击树的每个节点，查询对应的人员
        handleNodeClick(data){
        	//清空之前的组织对应的人员
        	this.forwardDepartmentData = [];
        	this.getDepartmentUserData(data.id);
        },
		//转发 —— 转发提交
		submitForward(){
			let _this = this;
			if(_this.forwardContent.length > 200){
            	_this.err.err5.showtips = true;
            	_this.err.err5.errtips = '描述最多200个字符！';
                return false;
            }else{
            	_this.err.err5.showtips = false;
            }

            let sqrID = "";
            for(let i in _this.delRepeatUsers){
                sqrID += _this.delRepeatUsers[i].id+",";
            }
            sqrID = sqrID.substr(0,sqrID.length-1);
            if(sqrID == '' || sqrID.length == 0){
            	_this.err.err6.showtips = true;
            	_this.err.err6.errtips = '接收人不能为空！';
                return false;
            }else{
            	_this.err.err6.showtips = false;
            }
            let data = {
            	reportId: parseInt(_this.reportId),              //报送ID
            	groupId: _this.$store.state.generalGroupId,      //集团ID
            	approvalContent: _this.forwardContent,           //描述
            	approvers: sqrID,                                //评论人id
            	type: _this.isTask                               //审批类型 1报送审批 2任务审批
            }

			saveForwardInfo(JSON.stringify(data),_this.hideLays).then(function (res) {
				if(res.data.status == 0){
					if(res.data.result.data == 1){ //1成功
                		_this.$message({
	                        type: 'success',
	                        customClass: 'ele_ui_tips_position',
	                        message: '提交成功!'
	                    });
	                    if(_this.from == 'workbench'){
	                        _this.$router.replace({ path: 'workbench'});
	                    }else if(_this.from == 'examine'){
	                        _this.$router.replace({ path: 'publicOpinionAudit'});
	                    }
                	}else{
                		_this.$message({
	                        type: 'error',
	                        customClass: 'ele_ui_tips_position',
	                        message: '提交失败！'
	                    });
                		_this.isLoading = false;
                	}
				}else{
            		_this.$message({
	                    type: 'error',
	                    customClass: 'ele_ui_tips_position',
	                    message: res.data.msg
	                });
	                _this.isLoading = false;
            	}
			}).catch(err=>{
		        _this.$message({
	                type: 'error',
	                customClass: 'ele_ui_tips_position',
	                message: '请求失败！'
	            });
		    });
		},
		//查看更多
		seeMore(item){
			if(item.approverUserName.length > 5){
				this.isOver = true;
			}
		}
	},
	mounted() {
    let username = this.$store.state.userinfo_name;
    let account = this.$store.state.account.substr(7,4);
    Watermark.set(username+"  "+account);
		let _this = this;
	    let query = this.$route.query;  //获取链接 ？ 之后的参数
	    _this.from = query.from;
	    _this.reportId = query.id;      //提交时使用
	    _this.taskId = query.taskId;    //提交时使用
	    _this.cztype = query.flag;      //提交时使用  flag值的含义：audit 审批 instruct 指令  comment 评论 forward 转发
	    _this.infoType = query.taskType;      //提交时使用  taskType : 1 上报 2 任务
	    _this.taskTableId = query.taskTableId;      //提交时使用  taskTableId : 任务表主键
	    _this.hasForwardUser = query.hasForwardUser;      //查询已经转发过的人
	    _this.instructType = query.type;      //指令来源   1:部门下达 ，2：人下达
	    _this.isTask = query.istask;      //转发类型   审批类型 1报送审批 2任务审批
	    // console.log('-----------query------------');
	    // console.log(query);

	    let data = {
	    	groupId: this.$store.state.generalGroupId,
            id: query.id
	    };
	    getSeeBuiltData(data).then(function (res) {
			console.log('-----------获取查看------------');
	    	console.log(res);
	    	if(res.data.result){
	    		_this.reportInfoData = res.data.result.data;
	    		if(typeof _this.reportInfoData.approver  === 'string'){
	                _this.reportInfoData.approver = JSON.parse(_this.reportInfoData.approver);
	            }
	            if(typeof _this.reportInfoData.enclosures  === 'string'){
	                _this.reportInfoData.enclosures = JSON.parse(_this.reportInfoData.enclosures);
	            }
	            _this.reportInfoData.fileData = [];
	            _this.reportInfoData.imagesSrc = [];
	            if(_this.reportInfoData.enclosures.length > 0){
	                for(var i in _this.reportInfoData.enclosures){
	                    if(_this.reportInfoData.enclosures[i].type == 1){
	                        //图片
	                        _this.reportInfoData.imagesSrc.push(_this.reportInfoData.enclosures[i]);
	                    }else{
	                        //附件
	                        _this.reportInfoData.fileData.push(_this.reportInfoData.enclosures[i]);
	                    }
	                }
	            }
	            //处理详细记录中的附件和图片
	            if(_this.reportInfoData.approvers.length > 0){
	            	for (var j in _this.reportInfoData.approvers){
	            		if(typeof _this.reportInfoData.approvers[j].enclosures  === 'string'){
	            			_this.reportInfoData.approvers[j].enclosures = JSON.parse(_this.reportInfoData.approvers[j].enclosures);
	            		}
	            		_this.reportInfoData.approvers[j].imagesSrc = [];
	            		_this.reportInfoData.approvers[j].fileData = [];
	            		if(_this.reportInfoData.approvers[j].enclosures.length > 0){
	            			for(var n in _this.reportInfoData.approvers[j].enclosures){
	            				if(_this.reportInfoData.approvers[j].enclosures[n].type == 1){
	            					//图片
	            					_this.reportInfoData.approvers[j].imagesSrc.push(_this.reportInfoData.approvers[j].enclosures[n]);
	            				}else{
	            					//附件
	            					_this.reportInfoData.approvers[j].fileData.push(_this.reportInfoData.approvers[j].enclosures[n]);
	            				}
	            			}
	            			// console.log(_this.reportInfoData.approvers[j].imagesSrc)
	            		}
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
        handler(val,oldval) {
          if(val != '3'){
          	this.err.err2.showtips = false;
          	this.err.err3.showtips = false;
          }
        },
        deep: true
      }
    }
}
</script>
<style  lang="less">
@import "../../style/seebuilt.css";
</style>
