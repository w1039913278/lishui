<template>
  <div :class="$style.box">
    <basic-layout :middleList="middleList"
                  :filterList="filterList"
                  :areaList="areaList"
                  :points="points"
                  title="工业经济运行"
                  @titleClick="onTitleClick"
                  @middleTitleClick="onMiddleTitleClick"
                  ref="industry-economic-run-ref"
                  :changeMapOpacity="false">
      <template v-slot:west>
        <div :class="$style.box">
          <div :class="$style.leftOne">
            <base-chart title="规上工业产值及增幅"
                        chartHeight="calc(100% - 50px)"
                        id="upIndustryValueListId"
                        @titleClick="upIndustryAddClick"
                        :option="rightBotOption">
            </base-chart>
          </div>
          <div :class="$style.leftTwo">
            <base-chart title="规上工业增加值及增幅"
                        chartHeight="calc(100% - 50px)"
                        :option="rightBotOptionTwo"
                        id="upIndustryAddValueListId"
                        @titleClick="upIndustryAddClick1">
            </base-chart>
          </div>
          <div :class="$style.leftThree">
            <base-chart title="工业投资情况 "
                        chartHeight="calc(100% - 50px)"
                        id="leftMiddleOne"
                        :option="leftMiddleOne"
                        @titleClick="industryInvestClick"></base-chart>
          </div>
          <div :class="$style.leftFour">
            <base-chart title="（重点）技改投资情况 "
                        chartHeight="calc(100% - 50px)"
                        id="industryEnterpriseId"
                        :option="leftBotOption"
                        @titleClick="keynoteTechnicalInvestClick"></base-chart>
          </div>
        </div>
      </template>
      <template v-slot:east>
        <div :class="$style.box">
          <div :class="$style.rightOne">
            <base-chart title="工业企业情况"
                        chartHeight="calc(100% - 50px)"
                        id="leftLeftOptionLineThreeId"
                        :option="leftLeftOptionLineThree"
                        @titleClick="upIndustryEnterpriseNumClick"></base-chart>
          </div>
          <div :class="$style.rightTwo">
            <base-chart title="工业用电情况"
                        chartHeight="calc(100% - 50px)"
                        id="leftLeftOptionLineOneId"
                        :option="leftLeftOptionLineOne"
                        @titleClick="industryPowerZbClick"></base-chart>
          </div>
          <div :class="$style.rightThree">
            <base-chart title="工业税收收入情况"
                        chartHeight="calc(100% - 50px)"
                        id="leftLeftOptionLineTwoId"
                        :option="leftLeftOptionLineTwo"
                        @titleClick="industryTaxIncomeClick"></base-chart>
          </div>
        </div>
      </template>
    </basic-layout>
  </div>
</template>

<script>
import {
  baseBarOption,
  baseBarLineOption,
  baseAreaOption,
  baseArea2Option
} from '@plugins/chart';
// eslint-disable-next-line no-unused-vars
import {
  industryPowerData,
  industryTaxRevenueData,
  industryEnterpriseData,
  middleData,
  upIndustryValueList,
  industryInvestmentData,
  technicalChangeInvestmentData,
  upIndustryAddValueList
} from './data/index.js';
import {
  areaList,
  upIndustryValuePoints,
  upIndustryAddValuePoints
} from './data/map-data.js';
import {
  titleData,
  upIndustryAddData,
  upIndustryValueData,
  upIndustryAddAmplificationData,
  keynoteTechnicalInvestData,
  industryPowerZbData,
  industryTaxIncomeData,
  upIndustryEnterpriseNumData,
  industryInvestData,
  upIndustryValuelificationData
} from './data/quota.js';

export default {
  data() {
    this.data1 = [];
    this.data6 = [];
    this.data7 = [];
    this.data8 = [];
    this.data9 = [];
    this.filterList = [
      { name: '工业增加值(亿元)', type: 'Industrial_output' },
      { name: '工业总产值(亿元)', type: 'Total_industrial_output_value' }
    ];
    this.areaList = areaList;
    this.points = [...upIndustryValuePoints, ...upIndustryAddValuePoints];
    return {
      carouselTitle: '规上工业产值', // 规上工业产值, 规上工业增加值
      middleList: [],
      leftBotOption: null,
      rightBotOption: null,
      rightBotOptionTwo: null,
      leftLeftOptionLineOne: null,
      leftLeftOptionLineTwo: null,
      leftLeftOptionLineThree: null,
      // 左侧中间4个图表
      leftMiddleOne: null,
      leftMiddleTwo: null,
      leftMiddleThree: null,
      leftMiddleFour: null
    };
  },
  created() { },
  mounted() {
    this.dataHandle();
    this.initChart();
  },
  methods: {
    /**
     * @desc 处理数据
     */
    dataHandle() {
      this.middleList = _map(middleData, (o) => ({
        text: o.label_name,
        value: Math.floor(o.label_value * 100) / 100,
        img: o.label_img
      }));
      // 规上工业产值
      const bar = { name: '规上工业产值', data: [] };
      const line = { name: '增幅', data: [] };
      for (let i = 0, len = upIndustryValueList.value.length; i < len; i++) {
        const upIndustryValue = upIndustryValueList.value[i];
        bar.data.push({
          value: upIndustryValue.total_value,
          name: upIndustryValue.year
        });
        line.data.push({
          value: upIndustryValue.total_value_percent,
          name: upIndustryValue.year
        });
      }
      this.data1 = [bar, line];
      // 规上工业增加值
      const addBar = { name: '规上工业增加值', data: [] };
      const addLine = { name: '增幅', data: [] };
      for (let i = 0, len = upIndustryAddValueList.value.length; i < len; i++) {
        const upIndustryValue = upIndustryAddValueList.value[i];
        addBar.data.push({
          value: upIndustryValue.add_value,
          name: upIndustryValue.year
        });
        addLine.data.push({
          value: upIndustryValue.add_value_percent,
          name: upIndustryValue.year
        });
      }
      this.data10 = [addBar, addLine];
      // 工业投资情况
      this.data6 = _map(industryInvestmentData.value, (o) => {
        return { value: o.invest, name: o.year };
      });
      // （重点）技改投资情况
      this.data7 = _map(technicalChangeInvestmentData.value, (o) => {
        return { value: o.tech_invest, name: o.year };
      });
      this.data8 = _map(industryPowerData.value, (o) => {
        return { value: o.industry_elec, name: o.year };
      });
      this.data9 = _map(industryTaxRevenueData.value, (o) => {
        return { value: o.industry_tax, name: o.year };
      });
    },
    /**
     * @desc 初始化图表
     */
    initChart() {
      const obj = {
        isDoubleY: true,
        unit: ['亿元', '%']
      };
      this.rightBotOption = baseBarLineOption(this.data1, obj, 3, 1, 10);

      this.rightBotOptionTwo = baseBarLineOption(this.data10, obj, 3, 1, 10);
      this.leftBotOption = baseArea2Option(
        this.data7,
        ['rgba(58,253,247,1)', 'rgba(58,253,247,0.3)'],
        '（重点）技改投资',
        { splitNumber: 3 },
        '亿元'
      );

      this.leftLeftOptionLineOne = baseAreaOption(
        this.data8,
        ['rgba(58,253,247,1)', 'rgba(58,253,247,0.3)'],
        '工业用电量',
        { splitNumber: 4 },
        '亿千瓦时'
      );
      this.leftLeftOptionLineTwo = baseAreaOption(
        this.data9,
        ['rgba(243,145,31,1)', 'rgba(243,145,31,0.3)'],
        '工业税收收入',
        { splitNumber: 4 },
        '亿元'
      );
      this.leftLeftOptionLineThree = baseBarOption(
        industryEnterpriseData,
        {
          unit: ['家', '家', '家']
        },
        1
      );
      // 左侧中间4个图表
      this.leftMiddleOne = baseAreaOption(
        this.data6,
        ['rgba(243,145,31,1)', 'rgba(243,145,31,0.3)'],
        '工业投资',
        { splitNumber: 2 },
        '亿元'
      );
    },
    /**
     * @desc 幻灯片切换事件
     */
    onChange(index) {
      if (index === 0) {
        this.carouselTitle = '规上工业产值';
      }
      if (index === 1) {
        this.carouselTitle = '规上工业增加值';
      }
    },
    /**
     * @desc 标题点击
     */
    onTitleClick(event) {
      // console.log(titleData)
      this.$refs['industry-economic-run-ref'].openDetailHandle(
        titleData,
        false,
        ['ztyy', 'bz']
      );
    },
    /**
     * @desc 规上工业增加值-点击事件
     */
    upIndustryAddClick() {
      this.$refs['industry-economic-run-ref'].openDetailHandle(
        [upIndustryValuelificationData, upIndustryValueData],
        true,
        ['zbyy', 'cjcs'],
        ['规上工业产值增幅', '规上工业产值']
      );
    },
    upIndustryAddClick1() {
      this.$refs['industry-economic-run-ref'].openDetailHandle(
        [upIndustryAddAmplificationData, upIndustryAddData],
        true,
        ['zbyy', 'cjcs'],
        ['规上工业增加值增幅', '规上工业增加值']
      );
    },
    /**
     * @desc 工业投资-点击事件
     */
    industryInvestClick() {
      this.$refs['industry-economic-run-ref'].openDetailHandle(
        industryInvestData,
        true,
        ['zbyy', 'cjcs']
      );
    },
    /**
     * @desc （重点）技改投资-点击事件
     */
    keynoteTechnicalInvestClick() {
      this.$refs['industry-economic-run-ref'].openDetailHandle(
        keynoteTechnicalInvestData,
        true,
        ['zbyy', 'cjcs']
      );
    },
    /**
     * @desc 规上工业企业数-点击事件
     */
    upIndustryEnterpriseNumClick() {
      this.$refs['industry-economic-run-ref'].openDetailHandle(
        upIndustryEnterpriseNumData
      );
    },
    /**
     * @desc 工业用电量-点击事件
     */
    industryPowerZbClick() {
      this.$refs['industry-economic-run-ref'].openDetailHandle(
        industryPowerZbData
      );
    },
    /**
     * @desc 工业税收收入-点击事件
     */
    industryTaxIncomeClick() {
      this.$refs['industry-economic-run-ref'].openDetailHandle(
        industryTaxIncomeData
      );
    },
    /**
     * @desc 中间区域数据展示-点击事件
     */
    onMiddleTitleClick(item, index) {
      if (item.text === '规上工业产值(亿元)') {
        this.$refs['industry-economic-run-ref'].openDetailHandle(
          upIndustryValueData
        );
      }
      if (item.text === '规上工业增加值(亿元)') {
        this.$refs['industry-economic-run-ref'].openDetailHandle(
          upIndustryAddData
        );
      }
      if (item.text === '工业税收收入(亿元)') {
        this.$refs['industry-economic-run-ref'].openDetailHandle(
          industryTaxIncomeData
        );
      }
      if (item.text === '工业用电量(亿千瓦时)') {
        this.$refs['industry-economic-run-ref'].openDetailHandle(
          industryPowerZbData
        );
      }
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
    height: 24%;
    // outline: 1px solid red;
    :global .el-carousel--horizontal {
      height: 100% !important;
    }
    :global .el-carousel__container {
      height: 100% !important;
    }
    :global .el-carousel__indicators {
      display: none;
    }
    .lunbo {
      height: 100%;
    }
  }
  .left-two {
    margin-top: 10px;
    height: 24%;
    .left-middle-four-box {
      height: 100%;
      > div {
        height: 50%;
        display: flex;
        > div {
          width: 50%;
        }
      }
    }
  }
  .right-one {
    height: 28%;
    // outline: 1px solid red;
    :global .el-carousel--horizontal {
      height: 100% !important;
    }
    :global .el-carousel__container {
      height: 100% !important;
    }
    :global .el-carousel__indicators {
      display: none;
    }
    .lunbo {
      height: 100%;
    }
  }
  .right-two {
    margin-top: 20px;
    height: 37%;
    .left-middle-four-box {
      height: 100%;
      > div {
        height: 50%;
        display: flex;
        > div {
          width: 50%;
        }
      }
    }
  }
  .left-three {
    margin-top: 10px;
    height: 25%;
  }
  .left-four {
    margin-top: 10px;
    height: 25%;
  }
  .right-three {
    margin-top: 10px;
    // height: 265px;
    height: 32%;
  }
}
</style>
