<template>
  <div>
    <!--<input class="file" name="file" type="file"  @change="update"/>-->
  </div>
</template>
<script>
  import axios from 'axios';
  import VueCookies from 'vue-cookies'
  import qs from 'qs';
  export default {
    data (){
      return{
          ztreeData:"",
          file:''
      }
    },
    methods:{
      update(e){
        const token =  VueCookies.get('accessToken') || '';
        const userid =  VueCookies.get('userid') || '';
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('files',file);//通过append向form对象添加数据
        param.append('title','验证驳回重报未通过列表个人');
        param.append('url','http://www.baidu.com');
        param.append('mediaType','1');
        param.append('source','百度');
        param.append('content','验证驳回重报未通过列表个人');
        param.append('importance','0');
        param.append('dimension','1');
        param.append('describe','');
        param.append('handlingProposal','');
        param.append('copyers','');
        param.append('ctime','2018-08-07 17:01:18');
        param.append('groupId','73');
        param.append('author','');
        param.append('reportId','62');
        param.append('approver','2813');
        param.append('approveOrg','');
        param.append('enclosures','');
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{
             'ACCESSTOKEN': token,
              'ZHXGUSERID': userid,
              'Content-Type':'multipart/form-data'
          }
        }; //添加请求头
        axios.post('https://m-beta-b.istarshine.com/yqzj/v1/reportInfo/addOrgEditReportInfo',param,config)
          .then(response=>{
            console.log(response.data);
          })
      }
    },
    computed:{

    },
    created(){
//        var _this = this;
//      const token =  VueCookies.get('accessToken') || '';
//      const userid =  VueCookies.g et('userid') || '';
//      const urls = 'https://m-beta-b.istarshine.com/yqzj/v1/orgUser/getOrgUserList'
//      const data = {
//        pageSize:10,
//        orgIds:189,
//        pageNum:1,
//        retrievalName:"",
//        state:""
//      };
//      const headers = qs.stringify({
//        'ACCESSTOKEN': token,
//        'ZHXGUSERID': userid,
//        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//      })
//
//      axios.post(urls, data, headers)
//        .then(function (response) {
//          debugger;
//          console.log(response);
//        })
//        .catch(function (error) {
//          debugger;
//          console.log(error);
//        });


//      getOrganizationalManagementTree('43').then(function (res) {
//          console.log(res);
//        _this.ztreData = res.data;
//        console.log(_this.ztreData);
//      }).catch(err=>{
//          console.log(err,'请求失败！');
//      })
      axios({
        url:'/api/organizational/getOrganizationalManagementTree',
        method:'get',//请求方式
        //这里可以添加axios文档中的各种配置
      }).then(function (res) {
        console.log(res,'成功');
      }).catch(function (err) {
        console.log(err,'错误');
      })
    }
  }
</script>
<style>

</style>
