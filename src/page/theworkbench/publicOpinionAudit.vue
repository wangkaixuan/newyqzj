<template>
    <div class="wary_workbench">
		<yqzj-Head @setSecondNav="setSubNav" funName="工作台"></yqzj-Head>
		<work-nav :subNavData="subNavData" navName='舆情审核'></work-nav>
		<div class="center border_box">
			<div class="built_top">
				<div class="classification clearfix_workbench">
					<div class="nav_button" :class="{hover:dataParameter.type == '2'}" @click="shwoDate(2)">舆情批示</div>
					<div class="nav_button" :class="{hover:dataParameter.type == '1'}" @click="shwoDate(1)">指给单位</div>
				</div>
				<div class="workbench_title">
					<a href="javascript:void(0)" :class="{hover:dataParameter.status == '0'}" @click="setNav('0')">待审批</a>
					<a href="javascript:void(0)" :class="{hover:dataParameter.status == '1'}" @click="setNav('1')">通过</a>
					<a href="javascript:void(0)" :class="{hover:dataParameter.status == '2'}" @click="setNav('2')">未通过</a>
				</div>
				<div class="search border_box">
					<ul class="clearfix_workbench">
						<li class="s_time" @click.stop="searchTime()">上报时间<i class="arrow"></i>
							<div class="searchTimeWary" v-show="showTime">
								<a href="javascript:void(0)" :class="{hover:dataParameter.time == '1day'}" @click.stop="setTime('1day','今天')">今天</a>
								<a href="javascript:void(0)" :class="{hover:dataParameter.time == '3day'}" @click.stop="setTime('3day','近3天')">近3天</a>
								<a href="javascript:void(0)" :class="{hover:dataParameter.time == '7day'}" @click.stop="setTime('7day','近7天')">近7天</a>
								<a href="javascript:void(0)">自定义时间</a>
								<div class="time_box">
									<el-date-picker
								      v-model="chooseSTime"
								      type="datetime"
								      :editable="false"
								      value-format="yyyy-MM-dd HH:mm:ss"
								      placeholder="开始时间"
								      :picker-options="startDatePicker"
								      @change="sTimeChange">
								    </el-date-picker>
								</div>
							    <div class="time_box">
							    	<el-date-picker
								      v-model="chooseETime"
								      type="datetime"
								      :editable="false"
								      value-format="yyyy-MM-dd HH:mm:ss"
								      placeholder="结束时间"
								      :picker-options="endDatePicker"
								      @change="eTimeChange">
								    </el-date-picker>
							    </div>
							</div>
						</li>
						<!--<li>维度 <i class="two"></i></li>-->
						<!--<li>重要性 <i class="three"></i></li>-->
						<!--<li>涉事地域 <i></i></li>-->
					</ul>
					<!--/维度-不限/重要性-不限/涉事地域-不限-->
					<div class="search_info">上报时间 - {{timeWz}}</div>
				</div>
			</div>
			<div class="built_center">
				<label style="display: none;"><input type="checkbox" name="allWork"> 全部</label>
				<div class="work_botton clearfix_workbench">
					<!-- <a href="javascript:void(0)">全部导出</a>
					<a href="javascript:void(0)">批量导出</a>  -->
				</div>
			</div>
			<div class="built_btom">
				<div class="work_list" v-if="listData.length > 0">
					<div class="list_pub clearfix_workbench" v-for="list in listData">
						<!--复选框-->
						<label  style="display: none;"><input type="checkbox" name="" value=""></label>
						<!--内容-->
						<div class="info clearfix_workbench">
							<div class="info_body">
								<div class="info_tit">
									<!--type_jj type_zy-->
									<p v-if="list.importanceName === '紧急'" class="type_jj">{{list.importanceName}}</p>
									<p v-else-if="list.importanceName === '重要'" class="type_zy">{{list.importanceName}}</p>
									<p v-else >{{list.importanceName}}</p>
									<p>{{list.dimensionName}}</p>
									<a>{{list.title}}</a>
								</div>
								<div class="jb_info">
									<p><span>上报</span> {{list.createTime}}</p>
									<!--<p><span>涉事地域</span> 北京-海淀</p>-->
									<p><span>报送人</span> {{list.createUser}}</p>
								</div>
							</div>
							<!--操作-->
							<div class="info_cz">
								<!-- <a href="javascript:void(0)" v-if="dataParameter.status == '0'" v-on:click="auditInfo(list.reportId,list.taskId,'audit')">审核</a>
								<a href="javascript:void(0)" v-on:click="auditInfo(list.reportId,list.taskId,'look')">查看</a> -->
								<router-link  tag="a" :to="{path: 'seebuilt', query: {id: list.reportId,taskId: list.taskId,from: 'examine',flag: 'audit'}}" target="_blank" v-if="dataParameter.status == '0'">审核</router-link>
								<router-link  tag="a" :to="{path: 'seebuilt', query: {id: list.reportId,from: 'examine'}}" target="_blank">查看</router-link>
								<!--<a href="javascript:void(0)" >转报</a>-->
							</div>
						</div>
					</div>
					<!--列表结束-->
					<!--分页-->
                    <pubpaging :pages="pages" :current.sync="dataParameter.pageNum" @navpage="msgListView"></pubpaging>
				</div>
				<div class="nodata" v-else>
					<div class="noData noDataBreowe">
						<img src="../../images/nodata.png">
						<p>暂无数据</p>
					</div>
				</div>
			</div>
		</div>
		<yqzj-Footer></yqzj-Footer>
	</div>
</template>
<script>
import yqzjHead from '../../components/header.vue'
import yqzjFooter from '../../components/footer.vue'
import VueCookies from 'vue-cookies'
import pubpaging from '../../components/pagination.vue'
import workNav from './workNav.vue'
import {getOpinionReviewListData} from '../../service/built'

export default{
	data() {
	    return {
	    	showTime: false,                //是否显示选择时间的下拉菜单
	    	pages:1,                        //页数
        	timeWz:'近7天',                 //搜索时间文字
        	chooseSTime: '',         			//开始时间
        	chooseETime: '',         			//结束时间
        	dataParameter:{
	            groupId: this.$store.state.generalGroupId,          //集团ID $store.state.generalGroupId
	            orgId: this.$store.state.orgId,                    //机构ID $store.state.orgId
	            type:2,                         // 1指给部门， 2指给个人
	            pageSize:'10',                  //每页条数
	            pageNum:1,                      //当前页数
	            status:'0',                     //状态       0审批中，1已通过，2已拒绝', 3撤回
	            time:'7day',                    //状态 1day：当天，3day：3天内，7day：7天内
	            sTime:'',                       //开始时间
	            eTime:''                        //结束时间
	        },
        	listData:[],
        	startDatePicker:this.beginDate(),
        	endDatePicker:this.processDate(),
        	subNavData:[],                       //子集导航
	    }
	},
	components:{
	    yqzjHead,
	    yqzjFooter,
	    pubpaging,
	    workNav
	},
	methods: {
		setSubNav(navData){
            this.subNavData = navData[0];
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
		//处理不能选择今天之后的时间
		processDate(){
			let _this = this
	        return {
				disabledDate(time){
					if(_this.dataParameter.sTime){
						return new Date(_this.dataParameter.sTime).getTime() > time.getTime() || time.getTime() > Date.now()
					}else{
						return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
					}
				}
	        }
		},
		searchTime(){
			this.showTime = true;
		},
		setTime(time,wz){
			this.dataParameter.time = time;
			this.timeWz = wz;
			this.getData();
			this.showTime = false;
		},
		setNav(s) {
            //状态切换
            this.dataParameter.status = s;
            this.getData();
        },
        sTimeChange(){
        	let _this = this;
        	let startTime = _this.chooseSTime;
        	let endTime = _this.chooseETime;
        	if(startTime == ''){
				_this.$message({
	              type: 'error',
	              customClass: 'ele_ui_tips_position',
	              message: '请选择开始时间！'
	            });
        	}else if(startTime != '' && endTime != ''){
        		if(startTime>endTime){
	        		_this.$message({
		              type: 'error',
		              customClass: 'ele_ui_tips_position',
		              message: '开始时间不能大于结束时间！'
		            });
	        		_this.chooseSTime = '';
	        		_this.chooseETime = '';
	        	}else {
	        		_this.dataParameter.time = '';
		        	_this.dataParameter.sTime = startTime;
		            _this.dataParameter.eTime = endTime;
		            _this.timeWz = startTime + ' 至 ' +endTime;
		            _this.getData();
		            _this.showTime = false;
		            //查询完之后清空之间的时间
		            _this.chooseSTime = '';
		            _this.chooseETime = '';
	        	}
        	}
        },
        eTimeChange(){
        	let _this = this;
        	let startTime = _this.chooseSTime;
        	let endTime = _this.chooseETime;
        	if(endTime == ''){
				_this.$message({
	              type: 'error',
	              customClass: 'ele_ui_tips_position',
	              message: '请选择结束时时间！'
	            });
        	}else if(startTime != '' && endTime != ''){
        		if(startTime>endTime){
	        		_this.$message({
		              type: 'error',
		              customClass: 'ele_ui_tips_position',
		              message: '开始时间不能大于结束时间！'
		            });
	        		_this.chooseSTime = '';
	        		_this.chooseETime = '';
	        	}else {
	        		_this.dataParameter.time = '';
	        		_this.dataParameter.sTime = startTime;
		            _this.dataParameter.eTime = endTime;
		            _this.timeWz = startTime + ' 至 ' +endTime;
		            _this.getData();
		            _this.showTime = false;
		            //查询完之后清空之间的时间
		            _this.chooseSTime = '';
		            _this.chooseETime = '';
	        	}
        	}
        },
		getData:function () {
			var _this = this;
			//获取舆情审核
		    getOpinionReviewListData(_this.dataParameter).then(function (res) {
		    	console.log('---------获取舆情审核-------------');
		    	console.log(res);
				if(res.data.result){
					_this.listData = res.data.result.data || [];
					_this.pages =  Math.ceil(res.data.result.total/res.data.result.pageSize);      //页数
				}else{
					_this.listData = [];
                    _this.pages = 0;
				}
		    }).catch(err=>{
		      console.log(err,'请求失败！');
		    });
		},
		msgListView(){
			//分页
            this.dataParameter.pageNum = curPage;
            this.getData();
		},
		shwoDate(s){
			//指给 身份切换
            this.dataParameter.type = s;
            this.dataParameter.status = 0;
            this.getData();
		}
	},
	mounted (){
		this.getData();
	}
}
</script>
<style  lang="less">
@import "../../style/workbench.css";
</style>
