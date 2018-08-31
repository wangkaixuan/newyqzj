<template>
	<div class="borwse_nav">
		<div class="title_head">我的专题<i title="展开"></i></div>
		<div class="telescopic_nav">
			<topic-ztree :list.sync='mySpecialTopic' :func='nodeClick' :is-open='true' :is-check='false' :is-sid='sid'></topic-ztree>
		</div>
		<div class="title_head mar_top" v-if="shareSpecialTopic.length > 0">授权专题<i title="展开"></i></div>
		<div class="telescopic_nav" v-if="shareSpecialTopic.length > 0">
			<topic-ztree :list.sync='shareSpecialTopic' :func='nodeClick' :is-open='true' :is-check='false' :is-sid='sid'></topic-ztree>
		</div>
	</div>
</template>
<script>
import topicZtree from './topic-ztree.vue'
import VueCookies from 'vue-cookies'
import {getSpecialTopicTree} from '../service/browse'

export default {
	data() {
	    return {
	    	//查看组织树
			dataList:[],
			mySpecialTopic:[], //我的专题
			shareSpecialTopic:[], //授权专题
			parentNodeModel:[], //当前点击节点父亲对象
			nodeModel:null, // 当前点击节点对象
			toDetailUserId: '' //处理跳转详情页时的参数
	    }
    },
    props:['sid'], //处理从详情页跳转到舆情列表页定位问题
    components:{
	    topicZtree
	},
    methods: {
    	// 点击节点
	    nodeClick:function(m, parent, trees){
	      this.treeDeepCopy = trees;
	      this.nodeModel = m;  // 当前点击节点对象
	      this.parentNodeModel = parent; //当前点击节点父亲对象
	      console.log('========m==============');
	      console.log(m);
        if(m.kstype == 1){
        	this.toDetailUserId = m.KU_ID;
            //专题
          this.$emit('getListInfo', {
            keys: 'kkIdList',
            shareMsUserId:m.KU_ID,
            content:m.id,
            isClick:true
          });
        }else{
            //分类
            let children = m.children;
            if(children.length > 0){
              console.log(children);
              let ztid = '';
              for (let i in children){
                  ztid += children[i].id+',';
              }
              ztid = ztid.substr(0,ztid.length-1)
              console.log(ztid);
              this.$emit('getListInfo', {
                keys: 'kkIdList',
                shareMsUserId:m.KU_ID,
                content:ztid,
                isClick:true
              });
            }else{
              this.$emit('getListInfo', {
                keys: 'kkIdList',
                shareMsUserId:m.KU_ID,
                content:'-1',
                isClick:true
              });
            }
        }
         //this.sid = '';
	    },
	    findById: function (data, parentId) {
	      var vm = this;
	      for (var i = 0; i < data.length; i++) {

	        if (parentId == data[i].id) {
	          console.log(data[i])
	          vm.dataList.push(data[i]);
	          vm.findById(vm.ztreeDataSource, data[i].parentId)
	          return data[i]
	        }
	        if (data[i].hasOwnProperty('children')) {
	          vm.findById(data[i].children, parentId)
	        }
	      }
	    },
    },
    mounted (){ 
    	let _this = this;
    	let data = {
    		orgId: this.$store.state.orgId,
    		msUserId: this.$store.state.msUserId,
    		type: 2   // 1简单树，2 复杂树
    	};
	    //获取舆情浏览专题树
	    getSpecialTopicTree(data).then(function (res) {
	    	console.log('----------获取舆情浏览专题树------------');
	    	console.log(res);
	    	_this.mySpecialTopic = res.data.result.data.mySpecialTopic;
	    	_this.shareSpecialTopic = res.data.result.data.shareSpecialTopic; 
	    }).catch(err=>{
	      console.log(err,'请求失败！');
	    });
    }
}
</script>
<style lang="less">
.borwse_nav {
	float: left;
    overflow: hidden;
    width: 16%;
    height: auto;
    font-family: "黑体";

    .title_head {
    	width: 100%;
	    height: 53px;
	    background: url('../assets/browse/title_bg.png') no-repeat;
	    background-size: 100%;
	    color: #fff;
	    font-weight: 700;
	    font-size: 18px;
	    line-height: 53px;
	    text-indent: 10px;
	    position: relative;

	    i{
	    	display: block;
		    width: 10px;
		    height: 16px;
		    background: url('../assets/browse/tit_bj.png') top left no-repeat;
		    position: absolute;
		    top: 20px;
		    right: 15px;
		    cursor: pointer;

		    &.hover{
		    	width: 16px;
			    height: 10px;
			    background: url('../assets/browse/tit_bj.png') top right no-repeat;
			    top: 23px;
			    right: 15px;
		    }
	    }
    }
    .telescopic_nav {
    	height: auto;
    	background-color: #fff;
	    overflow: auto;
	    //min-height: 800px;
    }
    .mar_top {
    	margin-top: 30px;
    }
}
//左侧树样式
.telescopic_nav {
    .ztree_content_wrap {
	    height: auto;
	}
	.zTreeDemoBackground  {
		height: auto;
	}

	.ztree_browse {
		margin-left: 0;
		padding: 0;
		*{
			font-size: 14px;
		}
		li {
			line-height: 40px !important;
			a {
				height: 40px;
				line-height: 40px;
				padding-top: 0px;
				position: relative;
				display: block;

				&:hover {
					border-left: 2px solid #1f96d2;
				    background: #eff7fb;
				    color: #4da5d8;
				}
				&.hover {
					border-left: 2px solid #1f96d2;
				    background: #eff7fb;
				    color: #4da5d8;
				}
				span.curSelectedNode{background: none !important;color: #33a7ff!important;padding: 0;}
			}
		}
	}
}
</style>
