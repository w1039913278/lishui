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
                      @titleClick="onBenefitClick()">
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
  // upEnterpriseAverageBenefitData,
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
  mjAddMapData
  // rightTwo,
  // rightThree
} from './data/index.js';

import {
  // titleData,
  // mjTaxData,
  // mjBenefit,
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
      benefitList: null, // 规上企业亩均效益指标
      middleList: [], // 中央大屏数据
      mjTaxMapData: [],
      mjAddMapData: [],
      averageTaxRevenueData, // 亩均税收情况
      AllPlayProduceRmbData,
      RDexpenditureProportion,
      unitDischargeAddRmbData,
      unitPowerAddRmbData,
      averageAddRmbData,
      averageTaxRevenueRmbData,
      areaList,
      points: [],
      marginLeft: 0, // 区县各指标排名的偏移
      header: {
        rank: '序号',
        name: '区域',
        value: '企业家数',
        unit: ''
      },
      rightTwo: [],
      rightThree: [],
      titleData: {},
      mjTaxData: [],
      mjBenefit: [],
      rightTwoChartOption: {},
      rightThreeChartOption: {}
    };
  },
  async created() {
    this.loading = this.$loading({
      lock: true,
      target: '加载中'
    });
    await this.getMainData();
    // await this.getOneChartData();
    await this.getTwoChartData();
    await this.getThreeChartData();
    await this.getFourChartData();
    await this.getFiveChartData();
    await this.getZtIndexCardData();
    await this.getOneCardIndexData();
    await this.getTwoCardIndexData();
  },
  mounted() {
    this.initData();
  },
  methods: {
    /**
     * @desc 数据指标及地图数据
     */
    async getMainData() {
      this.$api['talk-hero/index/getMainData']({}).then((res) => {
        const data = res.data;
        const list = [
          { text: '规上企业数(家)', value: data.entNumber },
          { text: '税收实际贡献(万元)', value: data.taxValue },
          { text: '工业增加值(万元)', value: data.indusAddValue },
          { text: '用地面积(亩)', value: data.landArea }
        ];
        this.middleList = _map(list, (o) => ({
          text: o.text,
          value: o.value
        }));
        this.addmap(
          data.taxPerValueList,
          mjTaxMapData,
          this.mjTaxMapData,
          'Average_tax_per_mu'
        );
        this.addmap(
          data.taxPerAddValueList,
          mjAddMapData,
          this.mjAddMapData,
          'Average_value_added_per_mu'
        );
        this.points = [...this.mjTaxMapData, ...this.mjAddMapData];
      });
    },
    /**
     * @desc 地图数据添加
     */
    addmap(list1, list2, newlist, text) {
      list1.forEach((ele) => {
        list2.forEach((item) => {
          if (ele.area === item.name) {
            const ob = {
              name: item.name,
              value: ele.value,
              lng: item.lng,
              lat: item.lat,
              type: text
            };
            newlist.push(ob);
          }
        });
      });
    },
    /**
     * @desc 亩均税收情况-图表数据
     */
    async getOneChartData() {
      // console.log(this.mjTaxData[1].yzfz.split(',')[1]);
      // console.log(this.mjTaxData[1].cjfz.split(',')[1]);
      this.$api['talk-hero/index/getOneChartData']({}).then((res) => {
        const max = Number(this.mjTaxData[1].yzfz.split(',')[1]);
        const min = Number(this.mjTaxData[1].cjfz.split(',')[1]);
        const bar = {
          name: '亩均税收',
          key: 'mu_per_tax',
          data: []
        };
        const line = {
          name: '增速',
          key: 'mu_per_tax_rate',
          data: []
        };
        for (let i = 0, len = res.data.length; i < len; i++) {
          const _Value = res.data[i];
          bar.data.push({
            value: _Value.taxValue,
            name: _Value.year
          });
          line.data.push({
            value: _Value.increase,
            name: _Value.year
          });
        }
        this.optionData = [bar, line];
        this.option = baseBarLineOption(
          this.optionData,
          {
            isDoubleY: true,
            unit: ['亿元', '%']
          },
          3,
          1,
          max, min
        );
      });
    },
    /**
     * @desc 区县各指标排名-图表数据
    */
    async getTwoChartData() {
      this.$api['talk-hero/index/getTwoChartData']({}).then((res) => {
        res.data.forEach(item => {
          switch (item.indexName) {
          case '亩均税收':
            this.averageTaxRevenueRmbData.value = item.data;
            break;
          case '亩均增加值':
            this.averageAddRmbData.value = item.data;
            break;
          case '单位能耗增加值':
            this.unitPowerAddRmbData.value = item.data;
            break;
          case '单位排放增加值':
            this.unitDischargeAddRmbData.value = item.data;
            break;
          case 'R&D经费支出占比':
            this.RDexpenditureProportion.value = item.data;
            break;
          case '全员劳动生产率':
            this.AllPlayProduceRmbData.value = item.data;
            break;
          }
        });
        this.onIndicatrix(this.active);
      });
    },
    /**
     * @desc 规上企业亩均效益指标-图表数据
    */
    async getThreeChartData() {
      this.$api['talk-hero/index/getThreeChartData']({}).then((res) => {
        const upEnterpriseAverageBenefitData = [
          { label_name: '亩均税收(万元/亩)', label_value: res.data.taxPerValue },
          { label_name: '亩均增加值(万元/亩)', label_value: res.data.perAddValue },
          { label_name: '单位能耗增加值(万元/吨)', label_value: res.data.energyConsumeAddValue },
          { label_name: '单位排放增加值(万元/吨)', label_value: res.data.emissionAddValue },
          { label_name: 'R&D经费支出占比(%)', label_value: res.data.proportionOfExpenditure },
          { label_name: '全员劳动生产率(万元/人·年)', label_value: res.data.overallLaborProductivity }
        ];
        this.benefitList = upEnterpriseAverageBenefitData;
      });
    },
    /**
     * @desc 规上工业企业综合指标占比-图表数据
    */
    async getFourChartData() {
      this.$api['talk-hero/index/getFourChartData']({}).then((res) => {
        this.rightTwo = res.data;
        this.rightTwoChartOption = basePieOption(
          this.rightTwo,
          '规上工业企业综合指标占比',
          '家',
          ['50%', '75%'],
          ['70%', '50%'],
          ['15%', 'center']
        );
      });
    },
    /**
     * @desc 区县规上工业企业占比-图表数据
    */
    async getFiveChartData() {
      this.$api['talk-hero/index/getFiveChartData']({}).then((res) => {
        this.rightThree = res.data;
        this.rightThreeChartOption = basePieOption(
          this.rightThree,
          '区县规上工业企业情况',
          '家',
          ['50%', '70%'],
          ['70%', '50%'],
          ['15%', 'center']
        );
      });
    },
    /**
     * @desc 标题指标卡片数据
     */
    async getZtIndexCardData() {
      this.$api['talk-hero/index/getZtIndexCardData']({}).then((res) => {
        const data = res.data;
        this.titleData = { ...data };
        this.titleData.name = '工业经济运行';
      });
    },
    /**
     * @desc 亩均税收情况-卡片数据
     */
    async getOneCardIndexData() {
      let params = {};
      let list;
      for (let i = 0; i < 2; i++) {
        params = { type: i + 1 };
        this.$api['talk-hero/index/getOneCardIndexData']({
          params
        }).then((res) => {
          list = res.data;
          if (i === 0) {
            list.name = '丽水亩均税收';
            list.cjcs = '/';
          } else {
            list.name = '丽水亩均税收增速';
            list.cjcs = '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。（鼠标移入后在提示信息中展示）';
          }
          this.mjTaxData.push(list);
          this.getOneChartData();
        });
      }
    },
    /**
     * @desc 区县各指标排名或规上企业亩均效益指标-指标卡片数据
     */
    async getTwoCardIndexData() {
      let params = {};
      let list;
      for (let i = 0; i < 6; i++) {
        params = { type: i + 1 };
        this.$api['talk-hero/index/getTwoCardIndexData']({
          params
        }).then((res) => {
          list = res.data;
          list.cjcs = '/';
          switch (i) {
          case 0:
            list.name = '丽水亩均税收';
            break;
          case 1:
            list.name = '丽水亩均增加值';
            break;
          case 2:
            list.name = '丽水单位能耗增加值';
            break;
          case 3:
            list.name = '丽水单位排放增加值';
            break;
          case 4:
            list.name = '丽水研发经费支出占主营业务收入百分比';
            break;
          case 5:
            list.name = '丽水全员劳动生产率';
            break;
          }
          this.mjBenefit.push(list);
          this.loading.close();
        });
      }
    },
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
      // this.getIndicatrData();
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
        this.rightTwo,
        '规上工业企业综合指标占比',
        '家',
        ['50%', '75%'],
        ['70%', '50%'],
        ['15%', 'center']
      );
      this.rightThreeChartOption = basePieOption(
        this.rightThree,
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
          value: item.value,
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
    //     ['zb_hy']
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
      this.$refs['talk-hero-ref'].openDetailHandle(this.titleData, false, [
        'zt_hy',
        'bz'
      ]);
    },
    /**
     * @desc 点击亩均税收情况事件
     */
    onMjTax({ name }) {
      // const index = legendData.indexOf(name);
      this.$refs['talk-hero-ref'].openDetailHandle(
        this.mjTaxData,
        true,
        ['zb_hy', 'cjcs'],
        ['亩均税收', '亩均税收增速']
      );
    },
    /**
     * @desc 点击规上企业亩均效益指标
     */
    onBenefitClick() {
      this.$refs['talk-hero-ref'].openDetailHandle(
        this.mjBenefit,
        true,
        ['zb_hy'],
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
          ['zb_hy']
        );
      }
    },
    /**
     * @desc 区县规上工业企业占比
     */
    industryCountyClick() {
      this.$refs['talk-hero-ref'].openDetailHandle(industryCountyData, true, [
        'zb_hy'
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
        ['zb_hy'],
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
