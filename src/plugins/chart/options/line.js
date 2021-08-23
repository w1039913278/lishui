/*
 * @Autor: fandong
 * @Description: 折线图
 * @Date: 2020-12-26 15:08:10
 * @LastEditTime: 2020-12-28 09:29:34
 * @LastEditors: fandong
 * @FilePath: \lishuigydn-web\src\plugins\chart\options\line.js
 */
const colors = ['#3271FF', '#20DBEE', '#F3921F'];

export const baseLineOption = (data = [], outOptions = { isDoubleY: false, splitNumber: 4, unit: [] }) => {
  const seriesData = data.value.map(v => {
    return {
      name: v.name,
      type: 'line',
      smooth: true,
      data: v.data.map(item => {
        return item;
      }),
      symbolSize: 6, // 拐点圆的大小
      itemStyle: {
        borderWidth: 2
      },
      lineStyle: {
        width: 2
      }
    };
  });
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
          relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value + outOptions.unit[i];
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
      top: 15,
      icon: 'circle'
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
        rotate: 40,
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
