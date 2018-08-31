/**
 * 配置编译环境和线上环境之间的切换
 *
 * api: 域名地址
 * yqzjlcoUr:   专家域名
 */

let oldyqzjUrl = 'http://localhost/yqzjSC';            //跳转地址
let api = 'https://m-beta-b.istarshine.com/yqzj/v1';    //请求地址
let g_app = "http://172.16.5.254:8080/yqzj/v1";        //高于
let q_app = "http://172.16.5.108:8080/yqzj/v1";         //秦栓

export default{
  'apiUrl':api,
  'oldyqzjUrl':oldyqzjUrl,
  'qUrl': q_app,
  'gUrl': g_app
}
