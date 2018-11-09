<template>
	<div class="borwse_nav">
		<div class="title_head" @click="myTopic">我的专题<!-- <i title="展开"></i> --></div>
		<div class="telescopic_nav">
			<topic-ztree :list.sync='mytree' :func='nodeClick' :is-open='true' :is-check='false'  :is-sid='sid' ref="topicZtree" ></topic-ztree>
		</div>
		<div class="title_head mar_top" v-if="specialtree.length > 0" @click="shareTopic">授权专题<!-- <i title="展开"></i> --></div>
		<div class="telescopic_nav" v-if="specialtree.length > 0">
			<topic-ztree :list.sync='specialtree' :func='nodeClick' :is-open='true' :is-check='false' :is-sid='sid' ref="sqtopicZtree"></topic-ztree>
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
			parentNodeModel:[], //当前点击节点父亲对象
			nodeModel:null, // 当前点击节点对象
			toDetailUserId: '' //处理跳转详情页时的参数
	    }
    },
    props:['sid','mytree','specialtree','msUserId'], //处理从详情页跳转到舆情列表页定位问题
    components:{
	    topicZtree
	},
    methods: {
    	// 点击节点
	    nodeClick:function(m, parent, trees){
	      this.treeDeepCopy = trees;
	      this.nodeModel = m;  // 当前点击节点对象
	      this.parentNodeModel = parent; //当前点击节点父亲对象
	        if(m.kstype == 1){
	        	this.toDetailUserId = m.KU_ID;
	            //专题
	          this.$emit('getListInfoZtree', {
	            keys: 'kkIdList',
	            shareMsUserId:m.KU_ID,
	            content:m.id,
	            ztreeId:m.id,
	            kstype:m.kstype,
	            isClick:true,
	            name: m.name //针对专题标题
	          });
	        }else{
	            //分类
	            let children = m.children;
	            if(children.length > 0){
	              let ztid = '';
	              for (let i in children){
	                  ztid += children[i].id+',';
	              }
	              ztid = ztid.substr(0,ztid.length-1);
	              this.$emit('getListInfoZtree', {
	                keys: 'kkIdList',
	                shareMsUserId:m.KU_ID,
	                content:ztid,
                  ztreeId:m.id,
	                isClick:true,
                  kstype:m.kstype,
	                name: m.name //针对专题标题
	              });
	            }else{
	              this.$emit('getListInfoZtree', {
	                keys: 'kkIdList',
	                shareMsUserId:m.KU_ID,
	                content:'-1',
                  ztreeId:m.id,
                  kstype:m.kstype,
	                isClick:true,
	                name: m.name //针对专题标题
	              });
	            }

	        }
          if(this.msUserId == m.KU_ID){
            //我的专题
            if(this.specialtree.length > 0){
              this.$refs.sqtopicZtree.initTreeData();
            }
          }else{
            //授权的专题
            this.$refs.topicZtree.initTreeData();
          }
        //this.sid = '';
	    },
	    findById: function (data, parentId) {
	      var vm = this;
	      for (var i = 0; i < data.length; i++) {

	        if (parentId == data[i].id) {
	          vm.dataList.push(data[i]);
	          vm.findById(vm.ztreeDataSource, data[i].parentId)
	          return data[i]
	        }
	        if (data[i].hasOwnProperty('children')) {
	          vm.findById(data[i].children, parentId)
	        }
	      }
	    },
	    delhover(treesData){
        this.$refs.topicZtree.initTreeData();
        if(this.specialtree.length > 0){
          this.$refs.sqtopicZtree.initTreeData();
        }
      },
	    //处理点击我的专题
	    myTopic(){
	    	this.$emit('myTopic');
        this.delhover();
	    },
	    //处理点击授权专题
	    shareTopic(){
	    	this.$emit('shareTopic');
        this.delhover();
	    }
    },
    mounted (){
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
	    cursor: pointer;

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
				//display: block;
				display: flex;

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
