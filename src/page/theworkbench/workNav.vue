<template>
	<div class="second_nav clearfix">
		<ul class="ul_nav">
			<li v-for="snd in subNavData">
				<router-link  tag="a" :to="{path: snd.funUrl}" :title="snd.funName" class="border_box" :class="{hover:snd.funName==name}">{{snd.funName}}</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	data() {
	    return {
	    	from: '', //workbench 来自舆情报送 examine 来自舆情审核
	    	name:''
	    }
    },
    props: ['subNavData','navName'],
    methods: {

    },
    mounted (){
    	let _this = this;
	    let query = this.$route.query;  //获取链接 ？ 之后的参数
	    _this.from = query.from;
	    if(_this.from == 'workbench'){
	    	this.name = '舆情报送';
	    }else{
	    	this.name = '舆情审核';
	    }
	    if(this.navName){
	    	this.name = this.navName;
	    }
    }
}
</script>
<style lang="less">
.second_nav {
	width: 100%;
	margin: 60px auto 15px;
	height: 55px;
	line-height: 55px;
	background-color: #fff;
	ul.ul_nav {
		display: block;
		width: 94%;
		margin: 0 auto;
		li {
			display: inline-block;
			a {
				height: 55px;
				display: inline-block;
				color: #999999;
				font-size: 14px;
				margin-right: 30px;
				&:hover,
				&.hover {
					color: #333333;
					border-bottom: 2px solid #333333;
				}
			}
		}
	}
}	
</style>