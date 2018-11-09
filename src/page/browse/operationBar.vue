<template>
  <div class="operation_bar" v-bind:style="styleObject"> <!-- {position: pos} -->
    <div class="operation_con">
      <label><input type="checkbox" name="checkall" v-model='isCheck' :is-check="isCheck" @click="selectAll">全选</label>
      <button @click="alertInfo">批量导出</button>
      <button @click="alertInfo">全部导出</button>
      <button @click="alertInfo">加简报</button>
      <button @click="alertInfo">加关注</button>
      <button @click="alertInfo">加预警</button>
      <div class="button" @click.stop="modifyTendency" v-if="hasPower.msUserId == hasPower.shareMsUserId">倾向性
        <div class="li_seccon li_seccon1" v-show="tendencyData.showTendency">
          <dl>
            <dd v-for="item,i in tendencyData.vals"><a href="javascript:void(0)" @click.stop="updateTendency(item)">{{item.text}}</a>
            </dd>
          </dl>
        </div>
      </div>
      <button @click.stop="markReadAll" v-if="hasPower.msUserId == hasPower.shareMsUserId">标已读</button>
      <button class="delete" @click.stop="deleteAll" v-if="hasPower.msUserId == hasPower.shareMsUserId"><span
        class="bot_text">删除</span></button>
      <!-- 每页条数设置 -->
      <div class="sort">
        <!-- <label></label> -->
        <span @click.stop="modifyPage">每页{{pageDate.selectPage}}<i class="pagesj"></i></span>
        <div class="li_seccon li_seccon2" v-show="pageDate.showPage">
          <dl>
            <dd v-for="item,i in pageDate.vals"><a href="javascript:void(0)" v-bind:class="{hover: item.isActive}" @click="choosePage(item)">{{item.pagesize}}条</a></dd>
          </dl>
        </div>
      </div>
      <!-- 按时间或重要度排序 -->
      <div class="sort" @click="alertInfo">
        <label></label>
        <span @click="updateTime">{{timesData.selectTxt}}<i></i></span>
        <div class="li_seccon li_seccon3" v-show="timesData.showTime">
          <dl>
            <dd v-for="item,i in timesData.vals"><a href="javascript:void(0)" v-bind:class="{hover: item.isActive}"
                                                    @click="updateOpts(item)">{{item.text}}</a></dd>
          </dl>
        </div>
      </div>
      <p>
        <label @click="alertInfo">
          <input type="checkbox" value="hide"/>
          <span>隐藏摘要</span>
        </label>
        <label>
          <input type="checkbox" v-model="importanceWeight"  @click="ShowImportant"/> <span>只看重要</span>
        </label>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        //修改倾向性
        tendencyData: {
          showTendency: false,
          vals: [
            {
              text: '标注正面',
              orientation: '1'
            }, {
              text: '标注负面',
              orientation: '2'
            }, {
              text: '标注中性',
              orientation: '3'
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
            }, {
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
              pagesize: '10',
              isActive: true,
            }, {
              pagesize: '30',
              isActive: false,
            }, {
              pagesize: '50',
              isActive: false,
            }, {
              pagesize: '100',
              isActive: false,
            }
          ]
        },
        styleObject: { //操作条定位
          position: 'relative',
          width: '100%',
          left:'0px'
        },
        //pos: 'relative', //操作条定位
        isCheck: false,  //是否全选
        importanceWeight: false,  //只看重要度
      }
    },
    components: {},
    props: {checked: '', width: '', hasPower: '',inquireParameter:{type: Object, default: {}}},
    methods: {
        //只看重要度
      ShowImportant(){
          let zkzyd = '';
        if(this.importanceWeight){
            //不看
          zkzyd = '0';
        }else{
          //看
          zkzyd = '1';
        }
        this.$emit('getListInfo', {
          keys:'importanceWeight',
          content: zkzyd
        });
      },
      //倾向性
      modifyTendency(){
        this.tendencyData.showTendency = true;
      },
      updateTendency(item){
        this.tendencyData.showTendency = false;
        this.$emit('updateTendency', item);
      },
      //时间 重要度
      updateTime(){
        // this.timesData.showTime = true;
        this.timesData.showTime = false;
      },
      updateOpts(item){
        this.timesData.selectTxt = item.text;
        for (let i in this.timesData.vals) {
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
        this.pageDate.selectPage = item.pagesize;
        for (let i in this.pageDate.vals) {
          this.pageDate.vals[i].isActive = false;
        }
        item.isActive = true;
        this.pageDate.showPage = false;
        this.$emit('updatePageSize', item.pagesize);
      },
      //监听操作条定位
      handleScroll(){
        //滚动条滚动时，距离顶部的距离
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        //滚动条到底部的条件
        if (scrollTop + windowHeight + 145 <= scrollHeight) {
          let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
          this.styleObject.position = 'fixed';
          this.styleObject.width = this.width + 'px';
          this.styleObject.left = 'auto';
          if(scrollLeft > 0){
            let left = 220 - scrollLeft;
            this.styleObject.left = left +'px';
          }
        } else {
          this.styleObject.position = 'relative';
          this.styleObject.width = '100%';
          this.styleObject.left = '0px';
        }
      },
      //全选
      selectAll(){
        this.isCheck = !this.isCheck;
        //把全选或反选的值传递到父级
        this.$emit('isCheck', this.isCheck);
      },
      alertInfo(){
        this.$message({
          message: '此功能正在开发中,请耐心等待...',
          type: 'warning'
        });
      },
      //批量导出
      batchExport(){

      },
      //标记已读
      markReadAll(){
        this.$emit('markAllRead');
      },
      //删除
      deleteAll(){
        this.$emit('deleteAllList');
      },
      //点击页面其他区域可以隐藏 标记已读和分页
      handleBodyClick(){
        this.tendencyData.showTendency = false;
        this.pageDate.showPage = false;
      },
      setpage(){
        let _this = this;
        //设置条数
        this.pageDate.selectPage = _this.inquireParameter.pageSize+'条';
        this.pageDate.vals.forEach(function (v,i,a) {
          if(v.pagesize === _this.inquireParameter.pageSize){
            v.isActive = true;
          }else{
            v.isActive = false;
          }
        })
      }
    },
    mounted (){
      let _this = this;
      //监听操作条定位
      this.handleScroll();
      window.addEventListener('scroll', this.handleScroll);
      document.addEventListener('click', this.handleBodyClick);
      if(this.inquireParameter.importanceWeight == '1'){
          this.importanceWeight = true;
      }else{
        this.importanceWeight = false;
      }
      this.setpage();
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
      document.removeEventListener('click', this.handleBodyClick);
    },
    watch: { //深度 watcher
      'checked': {
        handler() {
          if (this.checked) {
            this.isCheck = true;
          } else {
            this.isCheck = false;
          }
        },
        deep: true
      },
      'width': {
        handler(val, oldVal) {
          this.width = val;
          this.styleObject.width = this.width + 'px';
        },
        deep: true
      },
      'hasPower': {
        handler(val, oldVal) {
          this.hasPower = val;
        },
        deep: true
      }
    }
  }
</script>
<style lang="less">
.operation_bar {
    height: 45px;
    background: rgba(000,000,000,.7);
    bottom: 0;
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
		    border-radius: 6px;
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
		    border-radius: 6px;
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
			    -webkit-border-radius: 6px;
			    -moz-border-radius: 6px;
			    border-radius: 6px;
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
@media screen  and (max-width:1240px){
  .operation_bar .operation_con .sort{margin-left: 5px;}
}
</style>
