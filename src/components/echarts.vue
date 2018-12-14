<template>
  <div class="chartswary">
    <div class="echarts_wary" :id="myechart"></div>
    <div class="noData noDataBreowe" v-show="isShow">
      <img src="../images/nodata.png">
      <p>暂无数据</p>
    </div>
  </div>
</template>
<script>
  /*
  *  pie  饼图
  *     legendData 代表 legend 下Data数据
  *     seriesData 代表 series 数据
  * */
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/dataZoom'
  export default {
    data(){
      return {
        myChart:"",
        isShow:false
      }
    },
//    props: {chartData: {type: Object}, myechart: {type: String}},
    props: ['chartData','myechart'],
    methods: {
      bar(){
        let nameData = this.chartData.nameData;
        let valueData = this.chartData.valueData;
        if(typeof nameData == 'string'){
          nameData = JSON.parse(nameData);
        }
        if(typeof valueData == 'string'){
          valueData = JSON.parse(valueData);
        }
        if(valueData.length > 0 && nameData.length > 0){
          let optionDataBar = {
            title: {
              show:false
            },
            tooltip: {},
            color: ['#3398DB'],
            xAxis: {
              type : 'category',
              data:nameData,
              axisLine : {
                show : true,
                lineStyle : {width:0.5}
              },
              axisLabel:{
                rotate : 45,
                margin : 6,
                formatter: function(value) {
                  var subString = "";
                  subString = value;
                  if(value.length > 4){
                    subString = value.substring(0,4)+"…";
                  }
                  return subString;
                }
              },
              axisTick:{show:false},
              splitLine:{show:false}
            },
            yAxis: {
              minInterval : 1,
              boundaryGap : [ 0, 0.1 ]
            },
            grid: {
              top:30,
              left: '3%',
              right: '4%',
            },
            series: [{
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              data: valueData
            }]
          };
          if(nameData.length > 20 && valueData.length > 20){
            optionDataBar.dataZoom = [{
              type: 'inside'
            }, {
              type: 'slider'
            }];
            optionDataBar.grid.bottom = '90';
          }
          this.myChart.clear();
          this.myChart.setOption(optionDataBar);
          this.isShow = false;
        }else {
          this.myChart.dispose();
          this.isShow = true;
        }
      },
      pie(){
        let legendData = this.chartData.legendData;
        let seriesData = this.chartData.seriesData;
        if(typeof legendData == 'string'){
          legendData = JSON.parse(legendData)
        }
        if(typeof seriesData == 'string'){
          seriesData = JSON.parse(seriesData)
        }
        if(legendData.length > 0 && seriesData.length > 0){
          let optionDataPie = {
            "tooltip": {
              "trigger": "item",
              "formatter": "{a} <br/>{b} : {c} ({d}%)"
            },
            "legend": {
             // type: 'scroll',
              orient: 'vertical',
              "x": "left",
              "data": legendData.length < 12 ? legendData : legendData.splice(0,12)
            },
            "calculable": true,
            "series": [
              {
                "name": "",
                "type": "pie",
                "radius": [0, 110],
                "center": ["55%", "55%"],
                "itemStyle": {
                  "normal": {
                    "label": {
                      "show": true,
                      "position": "outer",
                      "formatter": "{b} : {d}%"
                    }
                  }
                },
                "data": seriesData
              }
            ],
            "animation": false
          };
          this.myChart.clear();
          this.myChart.setOption(optionDataPie);
          this.isShow = false;
        }else{
          this.myChart.dispose();
          this.isShow = true;
        }
      },
      line(){
        let nameData = this.chartData.nameData;
        let valueData = this.chartData.valueData;
        if(typeof nameData == 'string'){
          nameData = JSON.parse(nameData);
        }
        if(typeof valueData == 'string'){
          valueData = JSON.parse(valueData);
        }
        if(nameData.length>0 && valueData.length){
          let optionData = {
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: nameData
            },
            tooltip: {
              trigger: 'axis'
            },
            yAxis: {
              type: 'value',
              minInterval : 1,
              boundaryGap : [ 0, 0.1 ]
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            series: [{
              data: valueData,
              type: 'line',
            }]
          };
          this.myChart.clear();
          this.myChart.setOption(optionData);
          this.isShow = false;
        }else{
          this.myChart.dispose();
          this.isShow = true;
        }
      },
      createEcharts(){
        let _this = this;
        _this.myChart = echarts.init(document.getElementById(_this.myechart));
        _this[_this.chartData.type]();
      }
    },
    mounted(){
      let _this = this;
      _this.myChart = echarts.init(document.getElementById(_this.myechart));
      _this[_this.chartData.type]();
    }
  }
</script>
<style scoped>
  .chartswary{position: relative;}
  .echarts_wary {
    width: 100%;
    height: 300px;
    overflow: hidden;
  }
  .noData {
    position: absolute;
    width: 100%;
    margin: 90px 0 0px;
    color: #d7d7d7;
    text-align: center;
    font-size: 14px;
    clear: both;
    top:0px;
  }
  .noData p {
    margin-top: 10px;
  }
</style>
