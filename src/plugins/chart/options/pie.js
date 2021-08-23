/*
 * @Autor: fandong
 * @Description: 饼图
 * @Date: 2020-12-26 15:04:26
 * @LastEditTime: 2020-12-28 16:51:41
 * @LastEditors: Please set LastEditors
 * @FilePath: \lishuigydn-web\src\plugins\chart\options\pie.js
 */
const colors = ['#1DA261', '#20DBEE', '#3271FF', '#F6BD16', '#F17171', '#CCE4F7', '#C6FBFD', '#FFFFFF', '#72C8FC'];

/**
 * @description: 环形-饼图
 * @param {array} data [{ value: 335, name: '直接访问' },{ value: 310, name: '邮件营销' },]
 * @param {string} name 三地规上工业企业数情况
 * @param {string} unit 家
 * @param {array} radius ['35%', '55%']
 * @param {array} center ['65%', '50%']
 * @param {array} legendPos ['10%', 'center']
 * @return {object} option
 */
export const basePieOption = (
  data = [],
  name = '',
  unit = '',
  radius = ['35%', '55%'],
  center = ['65%', '50%'],
  legendPos = ['10%', 'center']
) => {
  const position = parseInt(center[0].replace('%', '') - 1) + '%';
  var sum = 0;
  const dataList = data.map(item => ({
    name: `${item.name}  ${item.value}${unit}`,
    value: item.value
  }));
  dataList.forEach(v => {
    sum += v.value;
  });
  return {
    title: {
      textAlign: 'center',
      text: '总数\n\n' + sum + unit,
      textStyle: {
        color: '#fff',
        fontWeight: 600,
        fontSize: 14
      },
      left: position,
      y: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}({d}%)',
      backgroundColor: 'rgba(0, 71, 78, 0.64)',
      borderColor: 'rgba(32, 219, 238, 0.5)',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 14
      }
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      height: '78%',
      icon: 'circle',
      x: legendPos[0],
      y: legendPos[1],
      textStyle: {
        color: '#fff',
        fontSize: 14
      },
      pageIconSize: 14,
      pageTextStyle: {
        color: '#fff'
      }
    },
    color: colors,
    grid: {
      top: '15%',
      bottom: '15%',
      left: '15%',
      right: '15%'
    },
    series: [
      {
        name: name,
        type: 'pie',
        radius,
        center,
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: dataList
      }
    ]
  };
};
