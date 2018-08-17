<template>
	<div class="wary">
		<yqzj-Head></yqzj-Head>
		<div></div>
		<div class="center">fdsf</div>
		<yqzj-Footer></yqzj-Footer>
	</div>
</template>
<script>
import yqzjHead from '../../components/header.vue'
import yqzjFooter from '../../components/footer.vue'
import VueCookies from 'vue-cookies'
import {getBrowseDetail} from '../../service/browse'

export default {
	data() {
	    return {

	    }
    },
    components:{
	    yqzjHead,
	    yqzjFooter,
	},
	methods: {

	},
	mounted (){
		let _this = this;
		let query = this.$route.query;//获取链接 ？ 之后的参数
		console.log('-------query val--------');
		console.log(query);
		let data = {
	    krUuid: query.krUuid,
			msUserId: query.msUserId,
			shareMsUserId: query.shareMsUserId
		}
		//获取舆情浏览详情页
		getBrowseDetail(data).then(function (res) {
			console.log('---------获取舆情浏览详情页-------------');
			console.log(res);
		    let result = res.data.result.data;
		    if(result){
			    _this.sameInfoNum = result.DetailReloadNum;
			    _this.datailInfo = result.validationRef;
			    _this.detailContent = result.detailInfoCnt;
			    _this.keywords = result.validationRef.kvKeyWord.split(",");
			    _this.specials = result.relationTopicList;
			    _this.sameList = result.sameInfoList;
			}else{
				console.log('没有返回值');
			}
		}).catch(err=>{
			console.log(err,'请求失败！');
		});
	}
}
</script>
<style lang="less">
.wary {
	background-color: #f2f2f2;
    width: 100%;
    min-width: 980px;
}
.center {
    width: 90%;
	margin: 75px auto 30px;
    min-height: 500px;
    min-width: 980px;
    max-width: 1600px;
    position: relative;
}
</style>




