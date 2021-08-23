<template>
  <basic-layout title="亩均论英雄"
                :middleList="middleList"
                :filterList="filterList"
                :areaList="areaList"
                :points="points"
                @titleClick="onTitleClick"
                ref="talk-hero-ref"
                :changeMapOpacity="false">
    <template slot="year">
      {{ dataYear.data_year + dataYear.value }}
    </template>
    <template slot="west">
      <div :class="$style.westBox">
        <div :class="$style.mjTaxRevenue">
          <base-chart title="亩均税收情况"
                      chartHeight="calc(100% - 50px)"
                      id="taxRevenue"
                      :option="option"
                      @titleClick="onMjTax"
                      :isClickLegend="true"></base-chart>
        </div>
        <div :class="$style.rankBox">
          <base-chart title="区县各指标排名"
                      chartHeight="calc(100% - 50px)"
                      id="taxRevenue"
                      :showCharts="false"
                      @titleClick="showAllIndex">
            <template slot="chart">
              <div :class="$style.cardBody">
                <div :class="$style.indicatrix">
                  <!-- <span :class="$style.indicatrixIcon"
                        style="left: 0"
                        class="el-icon-arrow-left"
                        @click="onLeftMargin(true)"></span> -->
                  <div :class="$style.indicatrixItemBox">
                    <div>
                      <div :class="{
                          [$style.indicatrixItem]: true,
                          [$style.indicatrixItemActive]: active === index
                        }"
                           v-for="(indicatrix, index) in indicatrixList"
                           @click="onIndicatrix(index)"
                           :key="index">
                        {{ indicatrix.title }}
                      </div>
                    </div>
                  </div>
                  <!-- <span :class="$style.indicatrixIcon"
                        style="right: 0"
                        class="el-icon-arrow-right"
                        @click="onLeftMargin(false)"></span> -->
                </div>
                <div :class="$style.progressBox">
                  <div :class="$style.progressBoxBody">
                    <base-progress :list="dataList"
                                   :header="header"></base-progress>
                  </div>
                </div>
              </div>
            </template>
          </base-chart>
        </div>
      </div>
    </template>
    <template slot="east">
      <div :class="$style.eastBox">
        <div :class="$style.right1">
          <base-chart title="规上企业亩均效益指标"
                      chartHeight="calc(100% - 50px)"
                      id="taxRevenue"
                      :showCharts="false"
                      @titleClick="onBenefitClick()">
            <template slot="chart">
              <div :class="$style.benefit">
                <div :class="{
                    [$style.benefitItem]: true,
                    [$style.benefitItemFlex]: item.flex
                  }"
                     v-for="(item, index) in benefitList"
                     :key="index">
                  <div :class="$style.benefitItemIcon">
                    <img :src="'/static/images/mj/mj-icon' + (index + 1) + '.png'"
                         alt="" />
                  </div>
                  <div :class="$style.benefitItemConent">
                    <p :class="$style.benefitItemConentValue">
                      {{ item.label_value }}
                    </p>
                    <p :class="$style.benefitItemConentTitle"
                       style="color: #fff; opacity: 1">
                      {{ item.label_name }}
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </base-chart>
        </div>
        <div :class="$style.right2">
          <base-chart title="规上工业企业综合指标占比"
                      chartHeight="calc(100% - 50px)"
                      id="rightTwo"
                      :option="rightTwoChartOption"></base-chart>
        </div>
        <div :class="$style.right3">
          <base-chart title="区县规上工业企业占比"
                      chartHeight="calc(100% - 50px)"
                      id="rightThreeChart"
                      :option="rightThreeChartOption"></base-chart>
        </div>
      </div>
    </template>
  </basic-layout>
</template>

<script>
import basicLayout from '../../packages/views/layouts/basic-layout.vue';
import { baseBarLineOption, basePieOption } from '@plugins/chart';
import {
  middleData,
  upEnterpriseAverageBenefitData,
  averageTaxRevenueData,
  AllPlayProduceRmbData,
  RDexpenditureProportion,
  unitDischargeAddRmbData,
  unitPowerAddRmbData,
  averageAddRmbData,
  averageTaxRevenueRmbData,
  indicatrixList,
  dataYear,
  optionData,
  filterList,
  areaList,
  mjTaxMapData,
  mjAddMapData,
  rightTwo,
  rightThree
} from './data/index.js';

import {
  titleData,
  mjTaxData,
  mjBenefit,
  mjBenefitCounty,
  middleTitleData,
  industryCountyData
} from './data/quota.js';

export default {
  components: { basicLayout },
  data() {
    return {
      dataList: [],
      dataYear,
      indicatrixList: indicatrixList,
      option: {}, // 亩均税收情况图表option
      optionData, // 亩均税收情况
      filterList,
      active: 0,
      benefitList: upEnterpriseAverageBenefitData, // 规上企业亩均效益指标
      middleList: [], // 中央大屏数据
      averageTaxRevenueData, // 亩均税收情况
      AllPlayProduceRmbData,
      RDexpenditureProportion,
      unitDischargeAddRmbData,
      unitPowerAddRmbData,
      averageAddRmbData,
      averageTaxRevenueRmbData,
      areaList,
      points: [...mjTaxMapData, ...mjAddMapData],
      marginLeft: 0, // 区县各指标排名的偏移
      header: {
        rank: '序号',
        name: '区域',
        value: '企业家数',
        unit: ''
      }
    };
  },
  created() {
    this.initData();
    this.onIndicatrix(this.active);
  },
  methods: {
    initData() {
      // 中央大屏数据处理
      this.middleList = middleData.map((item) => {
        return {
          text: item.label_name,
          value: item.label_value
        };
      });
      // 规上企业亩均效益指标-大屏右侧
      // this.benefitList = upEnterpriseAverageBenefitData.map(item => {
      //   if (item.label_name.length > 13) {
      //     item.flex = true;
      //   }
      //   return item;
      // });
      this.getIndicatrData();
      this.optionData = this.optionData.map((item) => {
        item.data = this.averageTaxRevenueData.value.map((value) => {
          return {
            value: value[item.key],
            name: value.year
          };
        });
        return item;
      });
      this.option = baseBarLineOption(
        this.optionData,
        {
          isDoubleY: true,
          unit: ['亿元', '%']
        },
        3,
        1,
        10
      );

      this.rightTwoChartOption = basePieOption(
        rightTwo,
        '规上工业企业综合指标占比',
        '家',
        ['50%', '75%'],
        ['70%', '50%'],
        ['15%', 'center']
      );
      this.rightThreeChartOption = basePieOption(
        rightThree,
        '区县规上工业企业情况',
        '家',
        ['50%', '70%'],
        ['70%', '50%'],
        ['15%', 'center']
      );
    },
    onIndicatrix(index) {
      this.active = index;
      this.header.value = this.indicatrixList[index].title;
      this.header.unit = this.indicatrixList[index].unit;
      this.getIndicatrData();
    },
    // 进度条数据获取
    getIndicatrData() {
      const indicatrix = this.indicatrixList[this.active];
      const dataList = this[indicatrix.key].value;
      this.dataList = dataList.map((item) => {
        return {
          value: item[indicatrix.valueIndex],
          name: item.area
        };
      });
    },

    /**
     * @desc 区县各指标排名点击最后一列
     */
    // goDetail({ title }) {
    //   const index = this.indicatrixList.findIndex(
    //     (item) => item.title === title
    //   );
    //   console.log(index);
    //   this.$refs['talk-hero-ref'].openDetailHandle(
    //     mjBenefitCounty[index],
    //     true,
    //     ['zbyy']
    //   );
    // },
    onLeftMargin(type) {
      const windowWidth = document.body.clientWidth;
      let marginLeft = this.marginLeft;
      if (type) {
        marginLeft += 15;
      } else {
        marginLeft -= 15;
      }
      console.log(windowWidth);
      // this.marginLeft =
      // marginLeft > 0 ? 0 : marginLeft < -60 ? -60 : marginLeft;
      if (windowWidth > 1800) {
        this.marginLeft =
          marginLeft > 0 ? 0 : marginLeft < -60 ? -60 : marginLeft;
      } else if (windowWidth > 1660) {
        this.marginLeft =
          marginLeft > 0 ? 0 : marginLeft < -80 ? -80 : marginLeft;
      } else if (windowWidth > 1420) {
        this.marginLeft =
          marginLeft > 0 ? 0 : marginLeft < -115 ? -115 : marginLeft;
      } else {
        this.marginLeft =
          marginLeft > 0 ? 0 : marginLeft < -215 ? -215 : marginLeft;
      }
    },
    /**
     * @desc 标题点击事件
     */
    onTitleClick(event) {
      this.$refs['talk-hero-ref'].openDetailHandle(titleData, false, [
        'ztyy',
        'bz'
      ]);
    },
    /**
     * @desc 点击亩均税收情况事件
     */
    onMjTax({ name }) {
      // const index = legendData.indexOf(name);
      this.$refs['talk-hero-ref'].openDetailHandle(
        mjTaxData,
        true,
        ['zbyy', 'cjcs'],
        ['亩均税收', '亩均税收增速']
      );
    },
    /**
     * @desc 点击规上企业亩均效益指标
     */
    onBenefitClick() {
      this.$refs['talk-hero-ref'].openDetailHandle(
        mjBenefit,
        true,
        ['zbyy'],
        [
          '亩均税收',
          '亩均增加值',
          '单位能耗增加值',
          '单位排放增加值',
          'R&D经费支出占比',
          '全员劳动生产率'
        ]
      );
    },
    /**
     * @desc 点击中间汇总
     */
    onMiddleTitleClick(item, index) {
      if (index < 3) {
        this.$refs['talk-hero-ref'].openDetailHandle(
          middleTitleData[index],
          true,
          ['zbyy']
        );
      }
    },
    /**
     * @desc 区县规上工业企业占比
     */
    industryCountyClick() {
      this.$refs['talk-hero-ref'].openDetailHandle(industryCountyData, true, [
        'zbyy'
      ]);
    },
    /**
     * @description 区县各指标排名显示全部
     */
    showAllIndex() {
      const tabs = [];
      this.indicatrixList.forEach((item) => {
        tabs.push(item.title);
      });
      this.$refs['talk-hero-ref'].openDetailHandle(
        mjBenefitCounty,
        true,
        ['zbyy'],
        tabs
      );
    }
  }
};
</script>

<style lang="less" module>
.westBox,
.eastBox {
  width: 100%;
  height: calc(100vh - 110px);
  padding-bottom: 35px;
  .border-box;
  .mjTaxRevenue {
    height: 32.6%;
    .mb-20;
  }
  .rankBox {
    height: calc(67.4% - 20px);
  }
  .card-body {
    width: 100%;
    height: 100%;
    .progressBox {
      width: 100%;
      height: calc(100% - 86px);
      .border-box;
      padding: 0 25px 25px;
      &-body {
        .full-x;
        .full-y;
        .overflow;
      }
    }

    .indicatrix {
      width: 100%;
      padding: 10px 25px 0;
      justify-content: space-between;
      .relative;
      .flex-start-center;
      .border-box;
      &-item-box {
        width: 100%;
        overflow: hidden; /* 超出内容不可见 */
        // white-space: nowrap; /* 不换行 */
        .indicatrix-item {
          .in-block;
          .c-fff;
          .f-12;
          cursor: pointer;
          height: 15px;
          line-height: 15px;
          border-radius: 4px;
          background-color: rgba(10, 33, 42, 0.8);
          box-shadow: inset 0px 0px 30px 0px rgba(33, 235, 255, 0.41);
          border: 1px solid rgba(32, 219, 238, 0.5);
          padding: 6px 12px;
          margin-right: 10px;
          margin-top: 10px;
          &-active {
            background-image: linear-gradient(to bottom, #20dbee, #42e1a6);
          }
        }
      }
      &-icon {
        .absolute;
        .c-fff;
        .f-24;
        .flex-center;
        .pointer;
      }
    }
    .progress-box-header {
      width: 100%;
      height: 50px;
      padding: 0 25px;
      .border-box;
      .flex-start-center;
      &-rank {
        width: 50px;
      }
      &-value {
        width: 78px;
      }
      &-bar,
      &-name {
        flex: 1;
      }
      p {
        .c-fff;
        text-align: center;
      }
    }
  }
}
.eastBox {
  .border-box;
  .right1 {
    height: 38%;
    padding-bottom: 20px;
    .border-box;
    .benefit {
      width: 100%;
      height: 100%;
      padding: 20px 32px;
      .border-box;
      .flex-start-center;
      flex-wrap: wrap;
      &-item {
        width: 50%;
        height: 25%;
        // .pointer;
        .flex-start-center;
        margin: 0;
        &-icon {
          width: 43px;
          img {
            width: 100%;
          }
          .mr-10;
        }
        &-conent {
          .flex-column;
          p {
            margin: 0;
          }
          &-title {
            opacity: 0.65;
            .c-fff;
            .f-12;
          }
          &-value {
            .f-28;
            .c-fff;
            margin-bottom: 10px;
          }
        }
        &-flex {
          width: 100%;
        }
      }
    }
  }
  .right2 {
    height: 30%;
    padding-bottom: 20px;
    .border-box;
  }
  .right3 {
    height: 32%;
  }
}
</style>
