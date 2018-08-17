
<template>
	<div class="operation_bar">
		<div class="operation_con">
			<label><input type="checkbox" name="checkall">全选</label>
			<button>批量导出</button>
			<button>全部导出</button>
			<button>加简报</button>
        	<button>加关注</button>
        	<button>加预警</button>
        	<div class="button" @click="modifyTendency">倾向性
	            <div class="li_seccon li_seccon1" v-show="tendencyData.showTendency">
	                <dl>
	                    <dd v-for="item,i in tendencyData.vals"><a href="javascript:void(0)" @click.stop="updateTendency(item)">{{item.text}}</a></dd>
	                </dl>
	            </div>
	        </div>
	        <button>标已读</button>
	        <button pagesize="10" class="delete"><span class="bot_text">删除</span></button>
	        <!-- 每页条数设置 -->
	        <div class="sort">
	            <!-- <label></label> -->
	            <span @click="modifyPage">每页{{pageDate.selectPage}}<i class="pagesj"></i></span>
	            <div class="li_seccon li_seccon2" v-show="pageDate.showPage">
		            <dl>
		                <dd v-for="item,i in pageDate.vals"><a href="javascript:void(0)" v-bind:class="{hover: item.isActive}" @click="choosePage(item)">{{item.text}}</a></dd>
		            </dl>
		        </div>
        	</div>
        	<!-- 按时间或重要度排序 -->
        	<div class="sort">
                <label></label> 
                <span @click="updateTime">{{timesData.selectTxt}}<i></i></span>
                <div class="li_seccon li_seccon3" v-show="timesData.showTime">
	                <dl>
	                    <dd v-for="item,i in timesData.vals"><a href="javascript:void(0)" v-bind:class="{hover: item.isActive}" @click="updateOpts(item)">{{item.text}}</a></dd>
	                </dl>
            	</div>
            </div>
            <p>   
                <label>
                	<input type="checkbox" value="hide"/>
	                <span>隐藏摘要</span>
	            </label>
            	<label>
                    <input type="checkbox" value="hide" importance="1"/> <span>只看重要</span>
                </label>        
            </p>
		</div>
	</div>
</template>
<script>
import VueCookies from 'vue-cookies'


export default {
	data() {
	    return {
	    	//修改倾向性
	    	tendencyData: {
	    		showTendency: false,
	    		vals: [
	    			{
	    				text: '标注正面',
	    				// orientation: 1
	    			},{
	    				text: '标注负面',
	    				// orientation: 2
	    			},{
	    				text: '标注中性',
	    				// orientation: 2
	    			}
	    		]
	    	},
	    	//按时间或重要度排序
	    	timesData: {
	    		showTime: false,
	    		selectTxt: '按时间',
	    		vals: [
	    			{
	    				text: '按时间',
	    				isActive: true,
	    				// sorttype: 1
	    			},{
	    				text: '按重要度',
	    				isActive: false,
	    				// sorttype: 2
	    			}
	    		]
	    	},
	    	//选择每页显示的条数
	    	pageDate: {
	    		showPage: false,
	    		selectPage: '10条',
	    		vals: [
	    			{
	    				text: '10条',
	    				isActive: true,
	    				// pagesize: 10
	    			},{
	    				text: '30条',
	    				isActive: false,
	    				// pagesize: 30
	    			},{
	    				text: '50条',
	    				isActive: false,
	    				// pagesize: 50
	    			},{
	    				text: '100条',
	    				isActive: false,
	    				// pagesize: 100
	    			}
	    		]
	    	}
	    }
    },
    components:{
	    
	},
    methods: {
    	//倾向性
    	modifyTendency(){
    		this.tendencyData.showTendency = true;
    	},
	    updateTendency(item){
    		this.tendencyData.showTendency = false;
	    },
	    //时间 重要度
	    updateTime(){
	    	this.timesData.showTime = true;
	    },
	    updateOpts(item){
	    	this.timesData.selectTxt = item.text;
    		for(var i in this.timesData.vals){
    			this.timesData.vals[i].isActive = false;
    		}
    		item.isActive = true;
    		this.timesData.showTime = false;
	    },
	    //选择每页显示条数
	    modifyPage(){
	    	this.pageDate.showPage = true;
	    },
	    choosePage(item){
	    	this.pageDate.selectPage = item.text;
    		for(var i in this.pageDate.vals){
    			this.pageDate.vals[i].isActive = false;
    		}
    		item.isActive = true;
    		this.pageDate.showPage = false;
	    }
    },
    mounted (){
    	let _this = this;
	   
    }
}
</script>
<style lang="less">
.operation_bar {
	width: 100%;
    height: 45px;
    background: rgba(000,000,000,.7);
    position: relative;
    display: none;

	.operation_con {
		width: 98%;
	    margin-left: 10px;
	    color: #fff;
	    font-size: 12px;
	    height: 45px;

	    label {
	    	display: block;
		    float: left;
		    line-height: 45px;
		    cursor: pointer;
		    input[type=checkbox]{
		    	vertical-align: middle;
		    	margin-right: 4px;
		    }
	    }
	    button {
    	    border: none;
		    padding: 4px;
		    border-radius: 24px;
		    margin: 10px 0 0 8px;
		    position: relative;
		    font-size: 12px;
		    &.delete {
			    background: #f96261;
			}
	    }
	    .button {
	    	border: none;
		    padding: 4px 12px;
		    border-radius: 24px;
		    margin: 10px 0 0 8px;
		    position: relative;
	    }
	    button, .button {
	    	color: #fff;
		    background-color: #38a9e1;
		    display: block;
		    float: left;
		    cursor: pointer;
	    }
	    
	    .li_seccon {
	    	position: absolute;
			top: -104px;
			left: -5px;
			width: 70px;
			z-index: 100;
		    border: 1px solid #e9e9e9;
		    background: #fff;
		    //display: none;
		    border-radius: 5px 5px 0 0;
    		box-shadow: 0 6px 12px rgba(0,0,0,.175);
    		dl {
			    width: 100%;
			    margin: 0;
			    dd {
			    	a {
		    		    display: block;
					    width: 100%;
					    height: 30px;
					    text-align: left;
		    			text-indent: 10px;
					    line-height: 30px;
					    font-size: 12px;
					    color: #333;
					    &:hover {
					    	color: #38a9e1;
					    	background: #f3f3f3;
					    }
		    			&.hover {
			    			color: #38a9e1;
	    					background: url('../../assets/browse/eventdg.png') 68px 7px no-repeat #f3f3f3;
			    		}
			    	}
			    }
			}
	    }
	    .li_seccon1 {
	    	text-align: center;
	    	text-indent: 0px;
	    }
	    .li_seccon2 {
		    top: -122px;
		    width: 84px;
		}
		.li_seccon3 {
			top: -62px; 
			width: 90px;
		}
	    .sort {
		    width: 84px;
		    line-height: 45px;
		    font-size: 12px;
		    margin-left: 15px;
		    float: right;
		    position: relative;
		    span {
			    width: 87px;
			    height: 25px;
			    -webkit-border-radius: 25px;
			    -moz-border-radius: 25px;
			    border-radius: 25px;
			    background: rgba(000,000,000,.4);
			    display: block;
			    float: left;
			    line-height: 25px;
			    text-indent: 10px;
			    margin-top: 10px;
			    cursor: pointer;
			    position: relative;
			    i {
					display: inline-block;
					width: 10px;
				    height: 10px;
				    margin-left: 8px;
				    box-sizing: border-box;
				    background: url('../../assets/browse/orderank.png') no-repeat;
				    &.pagesj {
					    height: 7px;
					    margin-top: 5px;
					    background: url('../../assets/browse/pagesj.png') no-repeat;
					}
				}
			}
		}
		p {
			float: right;
		    line-height: 45px;
		    font-size: 12px;
	        label {
	        	display: inline-block;
			    margin-left: 10px;
	        }
		}
	}
}
</style>