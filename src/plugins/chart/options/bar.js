/*
 * @Autor: fandong
 * @Description: 柱图
 * @Date: 2020-12-26 15:07:59
 * @LastEditTime: 2020-12-28 09:31:22
 * @LastEditors: fandong
 * @FilePath: \lishuigydn-web\src\plugins\chart\options\bar.js
 */
const color = [
  'rgba(58,253,247,1)',
  'rgba(243,145,31,1)',
  'rgba(50,113,255,1)'
];
const colors = [
  'rgba(58,253,247,0.3)',
  'rgba(243,145,31,0.3)',
  'rgba(50,113,255,0.3)'
];
export const baseBarOption = (
  data = [],
  outOptions = { isDoubleY: false, splitNumber: 4, unit: [] },
  type = 0
) => {
  const seriesData = data.value.map((v, i) => {
    return {
      name: v.name,
      type: 'bar',
      barWidth: 10,
      data: v.data.map(item => {
        return item;
      }),
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color[i]
            },
            {
              offset: 1,
              color: colors[i]
            }
          ])
        }
      }
    };
  });
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      confine: true,
      formatter: function (params) {
        var relVal = params[0].name;
        for (var i = 0, l = params.length; i < l; i++) {
          relVal +=
            '<br/>' +
            params[i].seriesName +
            ' : ' +
            params[i].value +
            outOptions.unit[i];
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
    yAxis: {
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
    series: seriesData
  };
};
