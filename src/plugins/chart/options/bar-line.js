/*
 * @Autor: fandong
 * @Description:  柱图-折线
 * @Date: 2020-12-26 15:08:47
 * @LastEditTime: 2020-12-29 17:39:18
 * @LastEditors: fandong
 * @FilePath: \lishuigydn-web\src\plugins\chart\options\bar-line.js
 */
const colors = ['#F3921F', '#20DBEE'];
// type 0 没有操作 type 1 每间隔一个现实 type 3是x轴文字横着显示
// icon判断是否要显示图标 0不显示，1显示
// threshold 判断大小的阈值
export const baseBarLineOption = (
  data = [],
  outOptions = { isDoubleY: false, splitNumber: 4, unit: [] },
  type = 0,
  icon = 0,
  threshold = 1
) => {
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
        var Img = '';
        if (icon) {
          Img =
            '<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>';
        }
        for (var i = 0, l = params.length; i < l; i++) {
          relVal +=
            '<br/>' +
            params[i].seriesName +
            ' : ' +
            params[i].value +
            outOptions.unit[i];
          if (icon && params[i].value < threshold) {
            Img = '';
          }
        }
        return relVal + Img;
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
      itemGap: 20,
      top: 15
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data[0].data.map(v => {
        return v.name;
      }), // 规上工业单独去判断
      axisLine: {
        show: true,
        lineStyle: {
          color: '#BFBFBF'
        }
      },
      axisLabel: {
        interval: 0,
        show: true,
        rotate: type === 3 || type === 1 ? 0 : 40, // 亩均论英雄  亩均税收情况是横着显示
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
        splitNumber: outOptions.splitNumber,
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
        name: data[0].name,
        type: 'bar',
        barWidth: 15,
        data: data[0].data.map(v => {
          return v.value;
        }),
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
        name: data[1].name,
        type: 'line',
        smooth: true,
        data: data[1].data.map(v => {
          return v.value;
        }),
        symbolSize: 6, // 拐点圆的大小
        itemStyle: {
          borderWidth: 2,
          color: '#F3921F'
        },
        yAxisIndex: outOptions.isDoubleY ? 1 : 0,
        lineStyle: {
          width: 2,
          normal: {
            color: '#F3921F', // 折线条的颜色
            borderColor: '#F3921F' // 拐点边框颜色
          }
        }
      }
    ]
  };
};
