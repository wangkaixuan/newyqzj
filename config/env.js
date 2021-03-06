/**
 * 配置编译环境和线上环境之间的切换
 *
 * api: 域名地址
 * yqzjlcoUr:   专家域名
 */

let oldyqzjUrl = 'http://localhost/yqzjSC';            //跳转地址
let thisyqzjUrl = 'http://localhost:8080/#/';            //地址
let api = 'http://yqzj-java-beta.istarshine.com/yqzj/v1';    //请求地址
let g_app = "http://172.16.5.254:8080/yqzj/v1";        //高于
let q_app = "http://172.16.5.108:8080/yqzj/v1";         //秦栓
let z_app = "http://172.16.252.192:8080/yqzj/v1";         //秦栓
let staticur = '/static';
export default{
  'apiUrl':api,
  'thisyqzjUrl':thisyqzjUrl,
  'oldyqzjUrl':oldyqzjUrl,
  'qUrl': q_app,
  'zUrl': z_app,
  'staticur': staticur,
  'gUrl': g_app
}
