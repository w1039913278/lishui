/**
 * @desc 数据
 */

// 数据年份
export const dataYear = { data_year: '数据年份：', value: '2019年' };

// 中央大屏
export const middleData = [
  { label_name: '规上企业数(家)', label_value: '942' },
  { label_name: '税收实际贡献(万元)', label_value: '573,564' },
  { label_name: '工业增加值(万元)', label_value: '2,236,605' },
  { label_name: '用地面积(亩)', label_value: '30,341' }
];
// 规上工业企业综合指标占比
export const rightTwo = [
  { name: 'A类', value: 258, rate: '27.4%' },
  { name: 'B类', value: 534, rate: '56.7%' },
  { name: 'C类', value: 135, rate: '14.3%' },
  { name: 'D类', value: 15, rate: '1.6%' }
];
// 区县规上工业企业占比
export const rightThree = [
  { name: '开发区', value: 209, rate: '22.19%' },
  { name: '青田县', value: 157, rate: '16.67%' },
  { name: '缙云县', value: 147, rate: '15.61%' },
  { name: '松阳县', value: 90, rate: '9.55%' },
  { name: '龙泉市', value: 87, rate: '9.24%' },
  { name: '遂昌县', value: 68, rate: '7.22%' },
  { name: '云和县', value: 65, rate: '6.90%' },
  { name: '莲都区', value: 55, rate: '5.84%' },
  { name: '庆元县', value: 48, rate: '5.10%' },
  { name: '景宁县', value: 16, rate: '1.70%' }
];

// 规上企业亩均效益指标-大屏右侧
export const upEnterpriseAverageBenefitData = [
  { label_name: '亩均税收(万元/亩)', label_value: '18.9' },
  { label_name: '亩均增加值(万元/亩)', label_value: '73.71' },
  { label_name: '单位能耗增加值(万元/吨)', label_value: '1.14' },
  { label_name: '单位排放增加值(万元/吨)', label_value: '611.55' },
  { label_name: 'R&D经费支出占比(%)', label_value: '2.36' },
  { label_name: '全员劳动生产率(万元/人·年)', label_value: '16.45' }
];

// 亩均税收情况
export const averageTaxRevenueData = {
  name: '亩均税收情况',
  value: [
    { year: 2017, mu_per_tax: 12.01, mu_per_tax_rate: 22.4 },
    { year: 2018, mu_per_tax: 17.5, mu_per_tax_rate: 45.7 },
    { year: 2019, mu_per_tax: 18.9, mu_per_tax_rate: 8.0 }
  ]
};

// 亩均税收（万元/亩）
export const averageTaxRevenueRmbData = {
  name: '亩均税收（万元/亩）',
  total: 209.58,
  value: [
    { area: '莲都区', mu_per_tax: 46.38, rate: 22.12997423 },
    { area: '缙云县', mu_per_tax: 36.91, rate: 17.6114133 },
    { area: '龙泉市', mu_per_tax: 22.97, rate: 10.96001527 },
    { area: '青田县', mu_per_tax: 21.41, rate: 10.21566943 },
    { area: '云和县', mu_per_tax: 21.36, rate: 10.1918122 },
    { area: '遂昌县', mu_per_tax: 16.75, rate: 7.992174826 },
    { area: '松阳县', mu_per_tax: 12.15, rate: 5.797308904 },
    { area: '庆元县', mu_per_tax: 11.78, rate: 5.62076534 },
    { area: '景宁县', mu_per_tax: 10.06, rate: 4.800076343 },
    { area: '开发区', mu_per_tax: 9.81, rate: 4.680790152 }
  ]
};

// 亩均增加值（万元/亩）
export const averageAddRmbData = {
  name: '亩均增加值（万元/亩）',
  total: 745.16,
  value: [
    { area: '龙泉市', mu_per_add: 106.35, rate: 14.27210264 },
    { area: '缙云县', mu_per_add: 101.58, rate: 13.63197166 },
    { area: '莲都区', mu_per_add: 98.96, rate: 13.28036932 },
    { area: '青田县', mu_per_add: 87.08, rate: 11.68608084 },
    { area: '云和县', mu_per_add: 74.68, rate: 10.0220087 },
    { area: '庆元县', mu_per_add: 66.22, rate: 8.886682055 },
    { area: '开发区', mu_per_add: 55.73, rate: 7.478930699 },
    { area: '遂昌县', mu_per_add: 54.45, rate: 7.30715551 },
    { area: '松阳县', mu_per_add: 52.66, rate: 7.066938644 },
    { area: '景宁县', mu_per_add: 47.45, rate: 6.367759944 }
  ]
};

// 单位能耗增加值（万元/吨）
export const unitPowerAddRmbData = {
  name: '单位能耗增加值（万元/吨）',
  total: 15.48,
  value: [
    { area: '遂昌县', consume_add: 3.05, rate: 19.70284238 },
    { area: '莲都区', consume_add: 2.27, rate: 14.66408269 },
    { area: '松阳县', consume_add: 2.05, rate: 13.24289406 },
    { area: '青田县', consume_add: 2.03, rate: 13.11369509 },
    { area: '景宁县', consume_add: 1.54, rate: 9.948320413 },
    { area: '龙泉市', consume_add: 1.14, rate: 7.364341085 },
    { area: '开发区', consume_add: 1.11, rate: 7.170542636 },
    { area: '庆元县', consume_add: 0.92, rate: 5.943152455 },
    { area: '云和县', consume_add: 0.86, rate: 5.555555556 },
    { area: '缙云县', consume_add: 0.51, rate: 3.294573643 }
  ]
};

// 单位排放增加值（万元/吨）
export const unitDischargeAddRmbData = {
  name: '单位排放增加值（万元/吨）',
  total: 4692.1,
  value: [
    { area: '开发区', blowdown_add: 1445.33, rate: 30.80347819 },
    { area: '莲都区', blowdown_add: 1119.07, rate: 23.85008845 },
    { area: '景宁县', blowdown_add: 786.86, rate: 16.76988981 },
    { area: '云和县', blowdown_add: 409.73, rate: 8.732337333 },
    { area: '遂昌县', blowdown_add: 392.11, rate: 8.356812515 },
    { area: '龙泉市', blowdown_add: 365.47, rate: 7.789049679 },
    { area: '庆元县', blowdown_add: 173.53, rate: 3.698344025 },
    { area: '青田县', blowdown_add: '/', rate: '/' },
    { area: '缙云县', blowdown_add: '/', rate: '/' },
    { area: '松阳县', blowdown_add: '/', rate: '/' }
  ]
};

// R&D经费支出占比（%）
export const RDexpenditureProportion = {
  name: 'R&D经费支出占比（%）',
  total: 26.76,
  value: [
    { area: '景宁县', research_rate: 4.87, rate: 18.19880419 },
    { area: '遂昌县', research_rate: 3.54, rate: 13.22869955 },
    { area: '龙泉市', research_rate: 2.95, rate: 11.02391629 },
    { area: '青田县', research_rate: 2.95, rate: 11.02391629 },
    { area: '开发区', research_rate: 2.92, rate: 10.91180867 },
    { area: '松阳县', research_rate: 2.6, rate: 9.715994021 },
    { area: '莲都区', research_rate: 2.36, rate: 8.819133034 },
    { area: '庆元县', research_rate: 2.25, rate: 8.408071749 },
    { area: '缙云县', research_rate: 1.28, rate: 4.783258595 },
    { area: '云和县', research_rate: 1.04, rate: 3.886397608 }
  ]
};
// 全员劳动生产率（万元/人*年）
export const AllPlayProduceRmbData = {
  name: '全员劳动生产率（万元/人*年）',
  total: 165.36,
  value: [
    { area: '云和县', all_work_rate: 23.79, rate: 14.38679245 },
    { area: '莲都区', all_work_rate: 19.6, rate: 11.85292695 },
    { area: '缙云县', all_work_rate: 19.28, rate: 11.65940977 },
    { area: '庆元县', all_work_rate: 19.07, rate: 11.53241413 },
    { area: '开发区', all_work_rate: 16.19, rate: 9.790759555 },
    { area: '青田县', all_work_rate: 16.14, rate: 9.760522496 },
    { area: '松阳县', all_work_rate: 15.47, rate: 9.355345912 },
    { area: '龙泉市', all_work_rate: 13.8, rate: 8.345428157 },
    { area: '景宁县', all_work_rate: 12.48, rate: 7.547169811 },
    { area: '遂昌县', all_work_rate: 9.54, rate: 5.769230769 }
  ]
};
// 区县各指标排名指标
export const indicatrixList = [
  {
    title: '亩均税收',
    key: 'averageTaxRevenueRmbData',
    valueIndex: 'mu_per_tax',
    unit: '万元/亩'
  },
  {
    title: '亩均增加值',
    key: 'averageAddRmbData',
    valueIndex: 'mu_per_add',
    unit: '万元/亩'
  },
  {
    title: '单位能耗增加值',
    key: 'unitPowerAddRmbData',
    valueIndex: 'consume_add',
    unit: '万元/吨'
  },
  {
    title: '单位排放增加值',
    key: 'unitDischargeAddRmbData',
    valueIndex: 'blowdown_add',
    unit: '万元/吨'
  },
  {
    title: 'R&D经费支出占比',
    key: 'RDexpenditureProportion',
    valueIndex: 'research_rate',
    unit: '%'
  },
  {
    title: '全员劳动生产率',
    key: 'AllPlayProduceRmbData',
    valueIndex: 'all_work_rate',
    unit: '万元/人·年'
  }
];

// 亩均税收地图点数据
export const mjTaxMapData = [
  {
    name: '开发区',
    value: '-',
    lng: 119.85027778,
    lat: 28.41416667,
    type: 'Average_tax_per_mu'
  },
  {
    name: '缙云县',
    value: 36.91,
    lng: 120.091573,
    lat: 28.709279,
    type: 'Average_tax_per_mu'
  },
  {
    name: '景宁县',
    value: 10.06,
    lng: 119.710697,
    lat: 28.013312,
    type: 'Average_tax_per_mu'
  },
  {
    name: '莲都区',
    value: 46.38,
    lng: 119.912612,
    lat: 28.495836,
    type: 'Average_tax_per_mu'
  },
  {
    name: '龙泉市',
    value: 22.97,
    lng: 119.141461,
    lat: 28.104623,
    type: 'Average_tax_per_mu'
  },
  {
    name: '青田县',
    value: 21.41,
    lng: 120.289277,
    lat: 28.179695,
    type: 'Average_tax_per_mu'
  },
  {
    name: '庆元县',
    value: 11.78,
    lng: 119.06259,
    lat: 27.65922,
    type: 'Average_tax_per_mu'
  },
  {
    name: '松阳县',
    value: 12.15,
    lng: 119.482015,
    lat: 28.499171,
    type: 'Average_tax_per_mu'
  },
  {
    name: '遂昌县',
    value: 16.75,
    lng: 119.276104,
    lat: 28.632119,
    type: 'Average_tax_per_mu'
  },
  {
    name: '云和县',
    value: 21.36,
    lng: 119.573397,
    lat: 28.16079,
    type: 'Average_tax_per_mu'
  }
];
export const areaList = [
  // 亩均税收
  { name: '缙云县', value: 36.91, type: 'Average_tax_per_mu' },
  { name: '景宁县', value: 10.06, type: 'Average_tax_per_mu' },
  { name: '莲都区', value: 46.38, type: 'Average_tax_per_mu' },
  { name: '龙泉市', value: 22.97, type: 'Average_tax_per_mu' },
  { name: '青田县', value: 21.41, type: 'Average_tax_per_mu' },
  { name: '庆元县', value: 11.78, type: 'Average_tax_per_mu' },
  { name: '松阳县', value: 12.15, type: 'Average_tax_per_mu' },
  { name: '遂昌县', value: 16.75, type: 'Average_tax_per_mu' },
  { name: '云和县', value: 21.36, type: 'Average_tax_per_mu' },
  // 亩均增加值
  { name: '缙云县', value: 101.58, type: 'Average_value_added_per_mu' },
  { name: '景宁县', value: 47.45, type: 'Average_value_added_per_mu' },
  { name: '莲都区', value: 98.96, type: 'Average_value_added_per_mu' },
  { name: '龙泉市', value: 106.35, type: 'Average_value_added_per_mu' },
  { name: '青田县', value: 87.08, type: 'Average_value_added_per_mu' },
  { name: '庆元县', value: 66.22, type: 'Average_value_added_per_mu' },
  { name: '松阳县', value: 52.66, type: 'Average_value_added_per_mu' },
  { name: '遂昌县', value: 54.45, type: 'Average_value_added_per_mu' },
  { name: '云和县', value: 74.68, type: 'Average_value_added_per_mu' }
];

// 亩均增加值地图点数据
export const mjAddMapData = [
  {
    name: '开发区',
    value: '-',
    lng: 119.85027778,
    lat: 28.41416667,
    type: 'Average_value_added_per_mu'
  },
  {
    name: '缙云县',
    value: 101.58,
    lng: 120.091573,
    lat: 28.709279,
    type: 'Average_value_added_per_mu'
  },
  {
    name: '景宁县',
    value: 47.45,
    lng: 119.710697,
    lat: 28.013312,
    type: 'Average_value_added_per_mu'
  },
  {
    name: '莲都区',
    value: 98.96,
    lng: 119.912612,
    lat: 28.495836,
    type: 'Average_value_added_per_mu'
  },
  {
    name: '龙泉市',
    value: 106.35,
    lng: 119.141461,
    lat: 28.104623,
    type: 'Average_value_added_per_mu'
  },
  {
    name: '青田县',
    value: 87.08,
    lng: 120.289277,
    lat: 28.179695,
    type: 'Average_value_added_per_mu'
  },
  {
    name: '庆元县',
    value: 66.22,
    lng: 119.06259,
    lat: 27.65922,
    type: 'Average_value_added_per_mu'
  },
  {
    name: '松阳县',
    value: 52.66,
    lng: 119.482015,
    lat: 28.499171,
    type: 'Average_value_added_per_mu'
  },
  {
    name: '遂昌县',
    value: 54.45,
    lng: 119.276104,
    lat: 28.632119,
    type: 'Average_value_added_per_mu'
  },
  {
    name: '云和县',
    value: 74.68,
    lng: 119.573397,
    lat: 28.16079,
    type: 'Average_value_added_per_mu'
  }
];
// 地图指标点击
export const filterList = [
  { name: '亩均税收(万元/亩)', type: 'Average_tax_per_mu' },
  { name: '亩均增加值(万元/亩)', type: 'Average_value_added_per_mu' }
];
// 亩均税收情况
export const optionData = [
  {
    name: '亩均税收',
    key: 'mu_per_tax',
    data: []
  },
  {
    name: '增速',
    key: 'mu_per_tax_rate',
    data: []
  }
];
