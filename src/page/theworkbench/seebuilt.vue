<template>
    <div class="wary_see">
		<yqzj-Head @setSecondNav="setSubNav" funName="工作台"></yqzj-Head>
		<work-nav :subNavData="subNavData"></work-nav>
		<div class="center border_box">
			<div class="see_built_list">
				<label>标题：</label><span>{{reportInfoData.title}}</span>
			</div>
			<div class="see_built_list">
				<label>URL：</label><span>{{reportInfoData.url}}</span>
			</div>
			<div class="see_built_list" v-if="reportInfoData.content && reportInfoData.content.length > 0">
				<label>内容概要：</label><span>{{reportInfoData.content.length > 100 ?  reportInfoData.content.substr(0,100)+'...': reportInfoData.content }}</span>
			</div>
			<div class="see_built_list see_built_list2">
				<label>重要性：</label><span>{{reportInfoData.importanceName}}</span>
			</div>
			<div class="see_built_list see_built_list2">
				<label>舆情分类：</label><span>{{reportInfoData.dimensionName}}</span>
			</div>
			<div class="see_built_list see_built_list2">
				<label>来源网站：</label><span>{{reportInfoData.source}}</span>
			</div>
			<div class="see_built_list see_built_list2">
				<label>媒体类型：</label><span>{{reportInfoData.mediaTypeName}}</span>
			</div>
			<div class="see_built_list see_built_list2">
				<label>发布时间：</label><span>{{reportInfoData.ctime}}</span>
			</div>
			<div class="see_built_list see_built_list2 clearfix_see" v-if="reportInfoData.opeartTime">
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
			<div class="see_built_list clearfix_see" v-if="cztype =='audit'">
				<p class="p1" style="line-height: 30px">上报人：</p>
				<p class="p2">
					<span class="enclosure"><span name="instruct_user">{{reportInfoData.createUser}}</span></span>
				</p>
			</div>
			<div class="see_built_list clearfix_see" v-else>
				<p class="p1" style="line-height: 30px">批示人：</p>
				<p class="p2">
					<span class="enclosure" v-for="apps in reportInfoData.approver"><span name="instruct_user">{{apps.name}}</span></span>
				</p>
			</div>
			<div class="see_built_list clearfix_see">
				<p class="p1">审批记录：</p>
				<div class="line"></div>
				<div class="start"></div>
				<div class="desc clearfix_see" v-for="item in reportInfoData.approvers">
					<div class="desc_left" ref="descLeft">
						<p>{{item.opeartTime.substr(11)}}</br>{{item.opeartTime.substr(0,10)}}</p>
					</div>
					<div class="desc_right" ref="descRight">
						<div class="p3"><span class="light" >{{item.accountName}}</span><span>/</span><span class="dark">{{item.stateName}}</span></div>
						<div class="p4"><span class="light">上报描述</span><span class="dark">{{item.approveContent}}</span></div>
						<div class="p5" v-if="item.fileData.length > 0">
							<span class="light">附件</span>
							<p class="files">
								<span class="dark" v-for="file in item.fileData" @click="downloadFj(file.url,file.name)">{{file.name}}</span>
							</p>
						</div>
						<div class="p5 clearfix_see"  v-if="item.imagesSrc.length > 0">
							<span class="light">图片</span>
							<p class="files">
								<img :src="img.url"  v-for="img in item.imagesSrc"/>
							</p>
						</div>
					</div>
				</div>
				<div class="end"></div>
			</div>
			<div class="see_built_list clearfix_see mar_top" v-if="cztype =='audit'">
				<label>处置方式：</label>
				<label class="label1"><input type="radio" v-model="state" value="1"> 通过</label>
				<label class="label1"><input type="radio" v-model="state" value="2"> 驳回</label>
				<!--<input type="radio" name="" value=""> 下达指令-->
			</div>
			<div class="see_built_list clearfix_see" v-if="cztype =='audit'">
				<label>批示内容：</label>
				<textarea v-model="approveContent" class="approval_content"></textarea>
			</div>
			<div class="see_built_tips"  v-show="err.showtips">
                <span class="see_built_error"><em>*</em><span class="see_built_error_info">{{err.errtips}}</span></span>
            </div>
			<div class="btn_box" v-if="cztype =='audit'">
				<button type="button" class="btn save" @click="submitAudit">提交</button>
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
import {getSeeBuiltData,downloadBuiltData,submitAuditData} from '../../service/built'
import {WindowLoc} from '../../service/api'

export default{
	data() {
	    return {
	    	from: '', //workbench 来自舆情报送 examine 来自舆情审核
	    	state:'1',                  //处理状态 1通过 2驳回
	    	cztype:'',                  //操作类型
	    	approveContent:'',          //处理建议
	    	reportId:'',                //报送ID
        	taskId:'',                  //任务ID
	    	reportInfoData: {},
	    	isLoading: false,           //保存的遮罩层
	    	subNavData:[],                       //子集导航
	    	err: {
	    		showtips: false, //是否显示错误的验证信息
	    		errtips: '',     //错误信息
	    	}
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
		//提交
		submitAudit(){
			var _this = this;
            if(_this.approveContent.length > 200){
            	_this.err.showtips = true;
            	_this.err.errtips = '批示内容最多200字！';
                return false;
            }
            let data = {
            	groupId:this.$store.state.generalGroupId,       //集团ID
                reportId:_this.reportId,                        //报送ID
                taskId:_this.taskId,                            //任务ID
                state:_this.state,                              //处理状态
                approveContent:_this.approveContent             //处理建议
            };
            submitAuditData(JSON.stringify(data),_this.hideLays).then(function (res) {
		    	console.log('---------获取舆情审核提交-------------');
		    	console.log(res);
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
	                        message: '请提交失败！'
	                    });
                		_this.isLoading = false;
                	}
                }else{
                	_this.$message({
	                    type: 'error',
	                    customClass: 'ele_ui_tips_position',
	                    message: res.data.msg
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
	mounted() {
		let _this = this;
	    let query = this.$route.query;  //获取链接 ？ 之后的参数
	    _this.from = query.from;
	    _this.reportId = query.id;      //提交时使用
	    _this.taskId = query.taskId;    //提交时使用
	    _this.cztype = query.flag;      //提交时使用

	    let data = {
	    	groupId: this.$store.state.generalGroupId,
            id: query.id
	    };
	    getSeeBuiltData(data).then(function (res) {
	    	console.log('---------获取舆情报送审核-------------');
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
	            			console.log(_this.reportInfoData.approvers[j].imagesSrc)
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
	}
}
</script>
<style  lang="less">
@import "../../style/seebuilt.css";
</style>
