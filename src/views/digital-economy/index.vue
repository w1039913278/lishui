<!--
 * @Author: your name
 * @Date: 2020-12-26 10:20:52
 * @LastEditTime: 2020-12-29 17:07:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lishuigydn-web\src\views\digital-economy\index.vue
-->
<template>
  <div :class="$style.box">
    <basic-layout :middleList="middleList"
                  :filterList="filterList"
                  :areaList="areaList"
                  :points="points"
                  title="数字经济"
                  @titleClick="onTitleClick"
                  @middleTitleClick="onMiddleTitleClick"
                  ref="digital-economy"
                  :changeMapOpacity="false">
      <template slot="year">
        {{ dataYear.data_year + dataYear.value }}
      </template>
      <template v-slot:west>
        <div :class="$style.box">
          <div :class="$style.leftOne">
            <base-chart title="数字经济核心产业增加值及增速"
                        :showCharts="false"
                        chartHeight="60%"
                        @titleClick="onAddIndustry">
              <template slot="chart">
                <div style="height: 100%; width: 100%; overflow: auto">
                  <base-target :dataList="targetList"></base-target>
                </div>
              </template>
            </base-chart>
          </div>
          <div :class="$style.leftTwo">
            <base-chart title="数字经济核心制造业增加值及增速情况"
                        :showCharts="false"
                        @titleClick="onManufacturing"
                        chartHeight="60%">
              <template slot="chart">
                <div style="height: 100%; width: 100%; overflow: auto">
                  <base-target :imgType="2"
                               :dataList="tarMakegetList"></base-target>
                </div>
              </template>
            </base-chart>
          </div>
          <div :class="$style.leftThree">
            <!-- @legendselectchanged="onLeftWtoLegend" 暂时注释柱状图点击事件 -->
            <base-chart title="规上数字经济核心制造业增加值区县情况"
                        chartHeight="80%"
                        :id="id"
                        :option="baseBarLineOption"
                        @titleClick="onCounty"
                        ref="digital-economy"
                        :isClickLegend="true"></base-chart>
          </div>
          <div :class="$style.leftFour">
            <base-chart title="数字经济核心制造业增加值排名"
                        @titleClick="onCoreMake"
                        :showCharts="false">
              <template slot="chart">
                <div style="height: 100%; width: 100%;padding:25px"
                     class="border-box">
                  <div class="full-xy overflow">
                    <base-progress :list="manufacturingData"
                                   :header="{
                        rank: '序号',
                        name: '区域',
                        unit: '亿元',
                        value: '核心制造业增加值'
                      }"></base-progress>
                  </div>
                </div>
              </template>
            </base-chart>
          </div>
        </div>
      </template>
      <template v-slot:east>
        <div :class="$style.box">
          <div :class="$style.rightOne">
            <base-chart title="数字经济发展综合评价情况"
                        :showCharts="false"
                        chartHeight="60%"
                        @titleClick="onDevelopmentEvaluate">
              <template slot="chart">
                <div style="height: 100%; width: 100%; overflow: auto">
                  <base-target :dataList="targetListRight"></base-target>
                </div>
              </template>
            </base-chart>
          </div>
          <div :class="$style.rightTwo">
            <base-chart title="数字经济发展综合评价排名"
                        @titleClick="onNumberMoney"
                        :showCharts="false">
              <template slot="chart">
                <div style="height: 100%; width: 100%;padding:25px"
                     class="border-box">
                  <div class="full-xy overflow">
                    <base-progress :list="dataList"
                                   :header="{
                        rank: '序号',
                        name: '区域',
                        unit: '',
                        value: '总指数'
                      }"></base-progress>
                  </div>
                </div>
              </template>
            </base-chart>
          </div>
          <div :class="$style.rightThree">
            <base-chart title="企业上云完成情况"
                        chartHeight="80%"
                        :id="cloudId"
                        :option="basePieOption"
                        @titleClick="onCloud"></base-chart>
          </div>
        </div>
      </template>
    </basic-layout>
  </div>
</template>

<script>
import { basePieOption, baseBarLineOption } from '@plugins/chart';
import baseTarget from '../../packages/views/common-view/base-target.vue';
import {
  dataYear,
  middleData,
  numEconomicCoreIndustriesAddData,
  upEconomicCoreManufactureAddData,
  ManufactureEconomicComprehensiveData,
  ManufactureAddCountyData,
  ManufactureAddListData,
  ManufactureEconomicDevelopComprehensiveData,
  enterpriseUpDayData,
  areaList,
  zzyMapData,
  ysqyMapData
} from './data/index.js';
import {
  titleData,
  addIndustryData,
  addIndustryDataRate,
  addManufacturingData,
  addManufacturingDataRate,
  addManufacturingCountyData,
  developmentData,
  cloudData,
  middleTitleData,
  countyData,
  coreMakeData,
  numberMoneyData
} from './data/quota.js';
export default {
  components: { baseTarget },
  created() {
    this.dataInit();
  },
  data() {
    return {
      areaList,
      points: [...zzyMapData, ...ysqyMapData],
      dataYear, // 数据年份
      dataList: [], // 数字经济发展综合评价排名
      manufacturingData: [], // 制造业增加排名
      middleList: [], // 测试
      filterList: [
        { name: '核心制造业增加值(亿元)', type: 'Manufacturing_value_added' },
        {
          name: '企业上云家数(家)',
          type: 'The_number_of_cloud_homes_on_the_enterprise'
        }
      ],
      barData: [
        {
          name: '核心制造业增加值累计',
          key: 'zzy_add_value',
          data: []
        },
        {
          name: '同比增速',
          key: 'zzy_add_rate',
          data: []
        }
      ],

      id: 'manufacture',
      targetList: [],
      tarMakegetList: [],
      targetListRight: [],
      cloudId: 'cloud',
      basePieOption: null,
      baseBarLineOption: null
    };
  },
  methods: {
    /**
     * @desc 标题点击事件
     */
    onTitleClick() {
      this.$refs['digital-economy'].openDetailHandle(titleData, false, [
        'ztyy', 'bz'
      ]);
    },
    /**
     * @desc 标题点击事件
     */
    onManufacturing() {
      this.$refs['digital-economy'].openDetailHandle(
        [addManufacturingData, addManufacturingDataRate],
        true,
        ['zbyy', 'cjcs'],
        ['数字经济核心制造业增加值', '数字经济核心制造业增加值增速']
      );
    },
    /**
     * @desc 核心制造业增加值区县情况 - 标题点击事件
     */
    onCounty() {
      this.$refs['digital-economy'].openDetailHandle(
        countyData,
        true,
        ['zbyy']
      );
    },
    /**
     * @desc 核心制造业增加值排名 - 标题点击事件
     */
    onCoreMake() {
      this.$refs['digital-economy'].openDetailHandle(
        coreMakeData,
        true,
        ['zbyy']
      );
    },

    /**
     * @desc 数字经济发展综合评价排名- 标题点击事件
     */
    onNumberMoney() {
      this.$refs['digital-economy'].openDetailHandle(
        numberMoneyData,
        true,
        ['zbyy']
      );
    },
    /**
     * @desc 点击中间指标
     */
    onMiddleTitleClick(item, index) {
      this.$refs['digital-economy'].openDetailHandle(
        middleTitleData[index],
        true,
        ['zbyy', 'cjcs']
      );
    },
    /**
     * @desc 点击数字经济发展综合评价情
     */
    onDevelopmentEvaluate() {
      this.$refs['digital-economy'].openDetailHandle(developmentData, true, [
        'zbyy', 'cjcs'
      ]);
    },
    /**
     * 企业上云完成情况
     */
    onCloud() {
      this.$refs['digital-economy'].openDetailHandle(cloudData, true, ['zbyy']);
    },
    onLeftWtoLegend({ name }) {
      const legendData = ['核心制造业增加值累计', '同比增速'];
      const index = legendData.indexOf(name);
      this.$refs['digital-economy'].openDetailHandle(
        addManufacturingCountyData[index],
        true,
        ['zbyy']
      );
    },
    /*
     * @desc 新增机器人事件
     */
    onAddIndustry() {
      this.$refs['digital-economy'].openDetailHandle([addIndustryData, addIndustryDataRate], true,
        ['zbyy', 'cjcs'],
        ['数字经济核心产业增加值', '数字经济核心产业增加值增速']
      );
    },
    // 数据初始化
    dataInit() {
      this.getManufacturingData();
      this.getDataList();
      this.getEnterpriseUpDayData();
      this.barData = this.barData.map(item => {
        item.data = ManufactureAddCountyData.value.map(value => {
          return {
            value: value[item.key],
            name: value.area
          };
        });
        return item;
      });
      this.baseBarLineOption = baseBarLineOption(
        this.barData,
        {
          isDoubleY: true,
          unit: ['亿元', '%']
        },
        1
      );
      this.middleList = middleData.map(item => {
        if (item.label_name === '核心产业增加值(亿元)') {
          if (item.label_value > 47) {
            item.label_img = '/static/images/thumbs-up.png';
          } else if (item.label_value < 41) {
            item.label_img = '/static/images/exclamatory-mark.png';
          }
        }
        if (item.label_name === '核心制造业增加值(亿元)') {
          if (item.label_value > 12) {
            item.label_img = '/static/images/thumbs-up.png';
          } else if (item.label_value < 10) {
            item.label_img = '/static/images/exclamatory-mark.png';
          }
        }
        if (item.label_name === '发展综合评价指数') {
          if (item.label_value > 75) {
            item.label_img = '/static/images/thumbs-up.png';
          } else if (item.label_value < 73) {
            item.label_img = '/static/images/exclamatory-mark.png';
          }
        }
        if (item.label_name === '上云企业数(家)') {
          if (item.label_value > 400) {
            item.label_img = '/static/images/thumbs-up.png';
          } else if (item.label_value < 300) {
            item.label_img = '/static/images/exclamatory-mark.png';
          }
        }
        return {
          text: item.label_name,
          value: item.label_value,
          img: item.label_img
        };
      });
      this.targetList = numEconomicCoreIndustriesAddData.value.map(item => {
        if (item.left_top_label === '丽水市累计(亿元)') {
          if (item.value > 47) {
            item.icon = '/static/images/thumbs-up.png';
          } else if (item.value < 41) {
            item.icon = '/static/images/exclamatory-mark.png';
          }
        }
        if (item.left_top_label === '同比增速(%)') {
          if (item.value > 15) {
            item.icon = '/static/images/thumbs-up.png';
          } else if (item.value < 5) {
            item.icon = '/static/images/exclamatory-mark.png';
          }
        }
        return {
          num: item.value,
          company: item.left_top_label,
          img: item.icon
        };
      });
      this.tarMakegetList = upEconomicCoreManufactureAddData.value.map(item => {
        if (item.left_below_label === '丽水市累计(亿元)') {
          if (item.value > 12) {
            item.icon = '/static/images/thumbs-up.png';
          } else if (item.value < 10) {
            item.icon = '/static/images/exclamatory-mark.png';
          }
        }
        if (item.left_below_label === '同比增速(%)') {
          if (item.value > 15) {
            item.icon = '/static/images/thumbs-up.png';
          } else if (item.value < 5) {
            item.icon = '/static/images/exclamatory-mark.png';
          }
        }
        return {
          num: item.value,
          company: item.left_below_label,
          img: item.icon
        };
      });
      this.targetListRight = ManufactureEconomicComprehensiveData.value.map(
        item => {
          return {
            num: item.value,
            company: item.right_top_label
          };
        }
      );
    },
    // 核心制造业增加值排名数据处理
    getManufacturingData() {
      const dataList = ManufactureAddListData.value;
      const total = ManufactureAddListData.total;
      this.manufacturingData = dataList.map(item => {
        return {
          value: item.zzy_add_value,
          name: item.area,
          total: total,
          rank: item.rank
        };
      });
    },
    // 数字经济发展综合评价排名
    getDataList() {
      const dataList = ManufactureEconomicDevelopComprehensiveData.value;
      const total = ManufactureEconomicDevelopComprehensiveData.total;
      this.dataList = dataList.map(item => {
        return {
          value: item.total_index,
          name: item.area,
          total: total,
          rank: item.rank
        };
      });
    },
    // 企业上云完成情况
    getEnterpriseUpDayData() {
      const data = enterpriseUpDayData.value.map(item => {
        return { value: item.new_cloud_ent, name: item.area };
      });
      this.basePieOption = basePieOption(data, '企业上云完成情况', '家');
      // this.basePieOption.legend.formatter = '{name}';
    }
  }
};
</script>
<style lang="less" module>
.box {
  .full-y;
  .box {
    height: calc(100vh - 110px);
  }
  .left-one {
    height: 130px;
    // outline: 1px solid red;
  }
  .left-two {
    margin-top: 10px;
    height: 130px;
    // outline: 1px solid red;
  }
  .left-three {
    margin-top: 10px;
    // height: 250px;
    height: 32%;
  }
  .left-four {
    margin-top: 20px;
    // height: 250px;
    height: 32%;
  }
  .right-one {
    height: 130px;
  }
  .right-two {
    margin-top: 20px;
    // height: 322px;
    height: 43%;
  }
  .right-three {
    // margin-top: 20px;
    // height: 322px;
    height: 41%;
  }
}
</style>
