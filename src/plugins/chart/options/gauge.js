/*
 * @Autor: fandong
 * @Description: 仪表盘
 * @Date: 2020-12-26 15:58:07
 * @LastEditTime: 2020-12-29 19:32:59
 * @LastEditors: fandong
 * @FilePath: \lishuigydn-web\src\plugins\chart\options\gauge.js
 */

// type是0不需要家图标是1需要加图标
export const baseGaugeOption = (data = {}, type = 0) => {
  var centerArr = ['50%', '75%'];
  return {
    title: {
      textAlign: 'center',
      //  text: '全市5年规划基站12277个\n\n2020年规划基站2826个\n\n2020年已建成基站2826个',
      text: data.topTit,
      textStyle: {
        color: '#fff',
        fontWeight: 600,
        fontSize: '100%'
      },
      top: '10%',
      left: '48%'
    },
    xAxis: {
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    yAxis: {
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    series: [
      // 进度图
      {
        type: 'gauge',
        radius: '90%',
        center: centerArr,
        min: 0,
        max: 1000,
        z: 5,
        splitNumber: 1, // 刻度数量
        startAngle: 180,
        endAngle: 0,
        animation: true,
        animationDuration: 10000,
        // 分隔线样式。
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        title: {
          show: false
        },
        axisLabel: {
          color: 'rgba(255,255,255,0)',
          fontSize: 12
        }, // 刻度节点文字颜色
        detail: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 15,
            color: [
              [data.rateData, data.colors],
              [
                1,
                new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: 'rgba(255,255,255, 0.3)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255,255,255, 0.2)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(255,255,255, 0.1)'
                  }
                ])
              ]
            ]
          }
        }
      },
      // 刻度尺
      {
        center: centerArr,
        type: 'gauge',
        radius: '55%',
        startAngle: 180,
        endAngle: 0,
        splitNumber: 5,
        z: 2,
        axisTick: {
          show: true,
          lineStyle: {
            color: '#fff',
            width: 1
          },
          length: -8
        }, // 刻度样式
        splitLine: {
          show: true,
          lineStyle: {
            color: '#fff',
            width: 1
          },
          length: -8
        }, // 分隔线样式
        axisLabel: {
          // color: 'rgba(255,255,255,0)',
          color: '#fff',
          fontSize: 12,
          distance: 10,
          show: false
        }, // 刻度节点文字颜色
        pointer: {
          show: false
        },
        axisLine: {
          show: false
        },
        label: {
          show: false
        },
        // 仪表盘详情，用于显示数据。
        detail: {
          show: true,
          offsetCenter: [0, '0%'],
          color: '#fff',
          formatter: function (params) {
            // return '56%';
            if (type) {
              if (data.rateData >= 1.2 / 1.5) {
                return '{gray|' + data.rate + '\n' + '}{white|' + data.title + '}{b|}';
              } else if (data.rateData < 1 / 1.5) {
                return '{gray|' + data.rate + '\n' + '}{white|' + data.title + '}{a|}';
              } else {
                return '{gray|' + data.rate + '\n' + '}{white|' + data.title + '}';
              }
            } else {
              return '{gray|' + data.rate + '\n' + '}{white|' + data.title + '}';
            }
          },
          rich: {
            gray: {
              fontSize: '160%',
              color: '#fff',
              padding: 10,
              fontWeight: 700
            },
            white: {
              fontSize: 12,
              color: '#fff'
            },
            a: {
              // 这样设定 backgroundColor 就可以是图片了。
              align: 'left',
              backgroundColor: {
                image: '/static/images/exclamatory-mark.png'
              },
              // 可以只指定图片的高度，从而图片的宽度根据图片的长宽比自动得到。
              height: 15
            },
            b: {
              // 这样设定 backgroundColor 就可以是图片了。
              align: 'left',
              backgroundColor: {
                image: '/static/images/thumbs-up.png'
              },
              // 可以只指定图片的高度，从而图片的宽度根据图片的长宽比自动得到。
              height: 15
            }
          },

          textStyle: {
            fontSize: '200%',
            fontWeight: 700
          }
        }
      }
    ]
  };
};
