export const baseArea2Option = (data = [], color = [], name = '', outOptions = { splitNumber: 4 }, unit = '') => {
  return {
    color: [color[0]],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      confine: true,
      formatter: function (params) {
        var relVal = params[0].name;
        var Img = '';
        for (var i = 0, l = params.length; i < l; i++) {
          params[i].value > 42.5 ? Img = '<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>' : Img = '';
          relVal += '<br/>' + params[i].seriesName + ' : ' + params[i].value + unit + Img;
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
      show: true,
      textStyle: { color: '#fff', fontSize: 12 },
      itemGap: 20,
      top: 15
    },
    /* dataZoom: [
      {
        type: 'inside',
        start: 50,
        end: 100
      }
    ], */
    grid: {
      top: '25%',
      left: '5%',
      right: '5%',
      bottom: '0%',
      containLabel: true,
      backgroundColor: '#fff',
      width: 'auto', // 图例宽度
      height: '70%' // 图例高度
    },
    xAxis: {
      type: 'category',
      data: data.map(v => {
        return v.name;
      }),
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#BFBFBF'
        }
      },
      axisLabel: {
        interval: 0,
        show: true,
        // rotate: 40,
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
    series: [
      {
        name: name,
        type: 'line',
        data: data.map(v => {
          return v.value;
        }),
        symbolSize: 6, // 拐点圆的大小
        itemStyle: {
          borderWidth: 2
        },
        lineStyle: {
          width: 2
        },
        areaStyle: {
        // 折现下是否填充
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: color[0]
              },
              {
                offset: 1,
                color: color[1]
              }
            ],
            global: false
          }
        }
      }
    ]
  };
}
;
