<template>
  <div class="echarts_wary" id="myechart">

  </div>
</template>
<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  export default {
    data(){
      return {

      }
    },
    props:[],
    methods: {
      pie(){
        var myChart = echarts.init(document.getElementById('myechart'));
        let optionDataBar = {
          title: {
            text: '舆情涉事地域统计',
            x:'center'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        }
        myChart.setOption(optionDataBar);
      }
    },
    mounted(){

      // 绘制图表
//      let optionData = {
//        xAxis: {
//          type: 'category',
//          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//        },
//        yAxis: {
//          type: 'value'
//        },
//        series: [{
//          data: [820, 932, 901, 934, 1290, 1330, 1320],
//          type: 'line'
//        }]
//      };
//
//      let optionDataPie = {
//        title:{
//          text:"舆情分类统计",
//          x:'center'
//        },
//        "tooltip": {
//          "trigger": "item",
//          "formatter": "{a} <br/>{b} : {c} ({d}%)"
//        },
//        "legend": {
//          "orient": "vertical",
//          "x": "left",
//          "data": [
//            "企业",
//            "政府",
//            "机构",
//            "名人",
//            "网站",
//            "媒体"
//          ]
//        },
//        "calculable": true,
//        "series": [
//          {
//            "name": "大V分布",
//            "type": "pie",
//            "radius": [
//              0,
//              110
//            ],
//            "center": [
//              "55%",
//              "55%"
//            ],
//            "itemStyle": {
//              "normal": {
//                "label": {
//                  "show": true,
//                  "position": "outer",
//                  "formatter": "{b} : {d}%"
//                }
//              }
//            },
//            "data": [
//              {
//                "name": "名人",
//                "value": 4
//              },
//              {
//                "name": "机构",
//                "value": 3
//              },
//              {
//                "name": "企业",
//                "value": 2
//              },
//              {
//                "name": "政府",
//                "value": 1
//              }
//            ]
//          }
//        ],
//        "animation": false
//      }
//      myChart.setOption(optionDataPie);
    }
  }
</script>
<style>
  .echarts_wary{width: 100%;height: 300px;}
</style>
