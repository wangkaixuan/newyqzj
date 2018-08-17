/**
 * 配置编译环境和线上环境之间的切换
 *
 * api: 域名地址
 * yqzjlcoUr:   专家域名
 */
let service = 'dev';
//let service = 'prod';

let oldyqzjUrl = '';
let api = '';
let g_app='';
let q_app='';
api = 'https://m-beta-b.istarshine.com/yqzj/v1';
g_app = "http://172.16.5.254:8080/yqzj/v1";        //高于
q_app = "http://172.16.5.108:8080/yqzj/v1";         //秦栓

if (service === 'dev') {
  /**dev开发**/
  oldyqzjUrl = 'http://localhost/yqzjSC';
} else if (service === 'prod') {
  /**prod部署**/
  oldyqzjUrl = 'http://yqzj-beta.istarshine.com';
}
export default{
  'apiUrl':api,
  'oldyqzjUrl':oldyqzjUrl,
  'qUrl': q_app,
  'gUrl': g_app
}
