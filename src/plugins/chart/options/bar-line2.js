/*
 * @Autor: fandong
 * @Description:  柱图-折线
 * @Date: 2020-12-26 15:08:47
 * @LastEditTime: 2020-12-29 19:40:40
 * @LastEditors: fandong
 * @FilePath: \lishuigydn-web\src\plugins\chart\options\bar-line2.js
 */
const colors = ['rgba(58,253,247,1)', 'rgba(243,145,31,1)', 'rgba(50,113,255,1)'];
export const baseBarLine2Option = (data = {}, unit = [], type = 0) => {
  // console.log(data.xAxis);
  return {
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      confine: true,
      formatter: function (params) {
        var relVal = params[0].name;
        for (var i = 0, l = params.length; i < l; i++) {
          relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value + unit[i];
        }
        return relVal;
      },
      backgroundColor: 'rgba(0, 71, 78, 0.64)',
      borderColor: 'rgba(32, 219, 238, 0.5)',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 14
      }
    },
    legend: {
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: '#fff', fontSize: 12 },
      top: 15
    },
    grid: {
      top: '25%',
      left: '5%',
      right: '5%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.xAxis,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#BFBFBF'
        }
      },
      axisLabel: {
        interval: 0,
        show: true,
        rotate: type === 1 ? 0 : 40,
        textStyle: {
          color: '#fff',
          fontSize: 10
        }
      }
    },
    yAxis: [
      {
        type: 'value',
        axisLine: { show: false },
        axisLabel: {
          textStyle: {
            color: '#fff',
            margin: 15
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, 0.2)'
          }
        }
      },
      {
        type: 'value',
        axisLine: { show: false },
        axisLabel: {
          textStyle: {
            color: '#fff',
            margin: 15
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: data.value[0].name,
        type: 'bar',
        barWidth: 15,
        data: data.value[0].data,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(58,253,247,1)'
              },
              {
                offset: 1,
                color: 'rgba(58,253,247, 0.3)'
              }
            ])
          }
        }
      },
      {
        name: data.value[1].name,
        type: 'bar',
        barWidth: 15,
        data: data.value[1].data,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(243,145,31,1)'
              },
              {
                offset: 1,
                color: 'rgba(243,145,31,0.3)'
              }
            ])
          }
        }
      },
      {
        name: data.value[2].name,
        type: 'line',
        smooth: true,
        data: data.value[2].data,
        symbolSize: 6, // 拐点圆的大小
        itemStyle: {
          borderWidth: 2,
          color: 'rgba(50,113,255,1)'
        },
        yAxisIndex: 1
        // lineStyle: {
        //   width: 2,
        //   normal: {
        //     color: 'rgba(50,113,255,1)', // 折线条的颜色
        //     borderColor: 'rgba(50,113,255,0.3)' // 拐点边框颜色
        //   }
        // }
      }
    ]
  };
};
