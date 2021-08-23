<template>
  <div :class="$style.box">
    <basic-layout
      title="企业培育和帮扶"
      :filterList="filterList"
      :middleList="middleData"
      :points="points"
      :pointShowName="true"
      :changeMapOpacity="false"
      @getDataType="getDataType"
      @titleClick="onTitleClick"
      ref="grow-helper-ref"
    >
      <template v-slot:west>
        <div :class="$style.left">
          <div :class="$style.leftOne">
            <base-chart :title="leftOneTitle" :showCharts="false" :chartHeight="chartHeight">
              <template slot="chart">
                <div :class="$style.rank">
                  <vue-seamless-scroll v-show="showScrollList && isScroll" :data="rankList" class="seamless-warp" :class-option="classOption">
                   <div :class="$style.rankItem" v-for="(item, index) in rankList" :key="index">
                      <div style="width: 6px" :class="$style.rankItemIndex">{{ index + 1 }}</div>
                      <div :class="$style.rankItemName">{{ item.name }}</div>
                     </div>
                  </vue-seamless-scroll>
                  <div v-if="!isScroll">
                    <div :class="$style.rankItem" v-for="(item, index) in rankList" :key="index">
                      <div style="width: 6px" :class="$style.rankItemIndex">{{ index + 1 }}</div>
                      <div :class="$style.rankItemName">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
              </template>
            </base-chart>
          </div>
          <div :class="$style.leftTwo">
            <base-chart title="小升规完成情况" :chartHeight="chartHeight" :showCharts="false" @titleClick="onSmallItemClick">
              <template slot="chart">
                <div style="height: 100%; width: 100%; overflow: auto">
                  <base-target :dataList="ruleFinish" :clickItemIndex="[0, 1]" @itemClick="onSmallItemClick"></base-target>
                </div>
              </template>
            </base-chart>
          </div>
          <div :class="$style.leftThree">
            <base-chart title="隐形冠军" :chartHeight="chartHeight" :showCharts="false" @titleClick="onCultivateItemClick">
              <template slot="chart">
                <div style="height: 100%; width: 100%; overflow: auto">
                  <base-target :dataList="championEnt" :imgType="2" @itemClick="onCultivateItemClick"></base-target>
                </div>
              </template>
            </base-chart>
          </div>
          <div :class="$style.leftFour">
            <base-chart title="小微企业园" :chartHeight="chartHeight" :option="leftPieOption" id="leftFourChart" @titleClick="pieLegendselectchanged" :isClickLegend="true"></base-chart>
          </div>
        </div>
      </template>
      <template v-slot:east>
        <div :class="$style.right">
          <base-border :height="chartHeight" title="降本减负完成情况" @itemClick="onFiveClick">
            <div :class="$style.inner">
              <div :class="$style.innerOne">
                <div :class="$style.innerTitle">减税完成情况</div>
                <base-target :dataList="taxReduction"></base-target>
              </div>
              <div :class="$style.innerTwo">
                <div :class="$style.innerTitle">减费完成情况</div>
                <base-chart2 id="rightOnePie" :option="rightPieOption"></base-chart2>
              </div>
              <div :class="$style.innerThree">
                <div :class="$style.innerTitle">减租完成情况</div>
                <base-chart2 id="rightOnePie2" :option="rightPieOption2"></base-chart2>
              </div>
              <div :class="$style.innerFour">
                <div :class="$style.innerTitle">减息完成情况</div>
                <base-target :dataList="interestList"></base-target>
              </div>
              <div :class="$style.innerFive">
                <div :class="$style.innerTitle">减支完成情况</div>
                <base-target :dataList="expenditureList"></base-target>
              </div>
            </div>
          </base-border>
        </div>
      </template>
    </basic-layout>
  </div>
</template>

<script>
import { basePieOption } from '@plugins/chart';
import vueSeamlessScroll from 'vue-seamless-scroll';
import {
  listedCompanies,
  tercelEntlist,
  giantList,
  championList,
  ruleList,
  gardenList,
  filterList,
  middleData
} from './data/index';
export default {
  components: { vueSeamlessScroll },
  data() {
    return {
      fivePolicyData: {},
      goldEnterpriseCultivateData: {},
      goldEnterpriseData: {}, // 隐形冠军
      newUpEnterpriseTaskData: {},
      newUpEnterpriseData: {}, // 小升规
      titleData: {}, // 企业培育帮扶
      // 上市企业
      listedCompanies,
      // 小升规完成情况
      ruleFinish: [],
      // 隐形冠军
      championEnt: [],
      // 减税完成情况
      taxReduction: [],
      // 减息完成情况
      interestList: [],
      // 减支完成情况
      expenditureList: [],
      // 雄鹰企业
      tercelEntlist,
      // 小巨人
      giantList,
      // 隐形冠军
      championList,
      // 小升规
      ruleList,
      // 小微企业园
      gardenList,
      filterList,
      middleData,
      leftOneTitle: '上市企业',
      showScrollList: true,
      points: [],
      rankList: [],
      isScroll: true,
      leftPieOption: basePieOption(
        [
          { value: 2, name: 'A档园区' },
          { value: 7, name: 'B档园区' },
          { value: 11, name: 'C档园区' },
          { value: 4, name: 'D档园区' }
        ],
        '小微企业园',
        '个',
        ['45%', '65%'],
        ['70%', '50%'],
        ['15%', 'center']
      ),
      rightPieOption: basePieOption(
        [{ name: '社保费减免', value: 0 }],
        '减费完成情况',
        '亿元',
        ['65%', '85%'],
        ['78%', '50%'],
        ['0%', 'center']
      ),
      rightPieOption2: basePieOption(
        [{ name: '国有企业租金减免', value: 0 }],
        '减租完成情况',
        '亿元',
        ['65%', '85%'],
        ['78%', '50%'],
        ['0%', 'center']
      ),
      classOption: {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 0, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      },
      chartHeight: 'calc(100% - 50px)',
      loading: null
    };
  },
  async created() {
    this.loading = this.$loading({
      lock: true,
      target: '加载中'
    });
    await this.getZtIndexCardData();
    await this.getUpgradeChartData();
    this.getUpgradeCardData(1);
    this.getUpgradeCardData(2);
    await this.getInvisibleChampionChartData();
    this.getInvisibleChampionIndexData(1);
    this.getInvisibleChampionIndexData(2);
    await this.getMicroEntChartData();
    this.getMicroEntIndexData(1);
    this.getMicroEntIndexData(2);
    this.getMicroEntIndexData(3);
    this.getMicroEntIndexData(4);
    await this.getCostChartData();
    await this.getCostIndexData();
    this.ruleList = this.ruleList.map((item) => ({
      id: item.id,
      name: item.name,
      lng: item.lng,
      lat: item.lat,
      type: 'rule'
    }));
    this.gardenList = this.gardenList.map((item) => ({
      id: item.id,
      name: item.name,
      lng: item.lng,
      lat: item.lat,
      type: 'garden'
    }));
    this.points = [
      ...listedCompanies,
      ...tercelEntlist,
      ...giantList,
      ...championList,
      ...this.ruleList,
      ...this.gardenList
    ];
  },
  methods: {
    /**
     * @desc 降本减负完成情况-指标卡片数据
     */
    async getCostIndexData() {
      this.$api['grow-helper/index/getCostIndexData']({}).then((res) => {
        this.fivePolicyData = { ...res.data };
        this.fivePolicyData.name = '降本减负完成情况';
        this.fivePolicyData.cjcs = '/';
        this.loading.close();
        // this.fivePolicyData.zb_hy = '1.反映减轻企业负担情况';
      });
    },
    /**
     * @desc 降本减负完成情况-图表数据
     */
    async getCostChartData() {
      this.$api['grow-helper/index/getCostChartData']({}).then((res) => {
        const data = res.data;
        this.taxReduction = [
          { num: data.taxCutsInfo.jsyjs, company: '预计数(亿元)' },
          { num: data.taxCutsInfo.jswcs, company: '完成数(亿元)' },
          { num: data.taxCutsInfo.jswcl, company: '完成率(%)' }
        ];
        this.interestList = [
          { num: data.cutInterestInfo.jxyjs, company: '预计数(亿元)' },
          { num: data.cutInterestInfo.jxwcs, company: '完成数(亿元)' },
          { num: data.cutInterestInfo.jxwcl, company: '完成率(%)' }
        ];
        this.expenditureList = [
          { num: data.reduceExpenditureInfo.jzyjs, company: '预计数(亿元)' },
          { num: data.reduceExpenditureInfo.jzwcs, company: '完成数(亿元)' },
          { num: data.reduceExpenditureInfo.jzwcl, company: '完成率(%)' }
        ];
        this.rightPieOption = basePieOption(
          data.reduceFeeInfo,
          '减费完成情况',
          '亿元',
          ['65%', '85%'],
          ['78%', '50%'],
          ['0%', 'center']
        );
        this.rightPieOption2 = basePieOption(
          data.rentReduceInfo,
          '减费完成情况',
          '亿元',
          ['65%', '85%'],
          ['78%', '50%'],
          ['0%', 'center']
        );
      });
    },
    /**
     * @desc 小微企业园-指标卡片数据
     */
    getMicroEntIndexData(num = 1) {
      const params = { type: num };
      this.$api['grow-helper/index/getMicroEntIndexData']({
        params
      }).then((res) => {
        if (num === 1) {
          this.aGardenData = { ...res.data };
          this.aGardenData.name = 'A档小微企业园数量';
          this.aGardenData.cjcs = '/';
        } else if (num === 2) {
          this.bGardenData = { ...res.data };
          this.bGardenData.name = 'B档小微企业园数量';
          this.bGardenData.cjcs = '/';
        } else if (num === 3) {
          this.cGardenData = { ...res.data };
          this.cGardenData.name = 'C档小微企业园数量';
          this.cGardenData.cjcs = '/';
        } else {
          this.dGardenData = { ...res.data };
          this.dGardenData.name = 'D档小微企业园数量';
          this.dGardenData.cjcs = '/';
        }
      });
    },
    /**
     * @desc 小微企业园-图表数据
     */
    async getMicroEntChartData() {
      this.$api['grow-helper/index/getMicroEntChartData']({}).then((res) => {
        const data = res.data;
        this.gardenEnt = [
          {
            value: Number(data.aSum),
            name: 'A档园区'
          },
          {
            value: Number(data.bSum),
            name: 'B档园区'
          },
          {
            value: Number(data.cSum),
            name: 'C档园区'
          },
          {
            value: Number(data.dSum),
            name: 'D档园区'
          }
        ];
        // 小微企业园
        this.leftPieOption = basePieOption(
          this.gardenEnt,
          '小微企业园',
          '个',
          ['45%', '65%'],
          ['70%', '50%'],
          ['15%', 'center']
        );
      });
    },
    /**
     * @desc 隐形冠军-指标卡片数据
     */
    getInvisibleChampionIndexData(num = 1) {
      const params = { type: num };
      this.$api['grow-helper/index/getInvisibleChampionIndexData']({
        params
      }).then((res) => {
        if (num === 1) {
          this.goldEnterpriseData = { ...res.data };
          this.goldEnterpriseData.name = '隐形冠军企业数量';
          this.goldEnterpriseData.cjcs = '/';
        } else {
          this.goldEnterpriseCultivateData = { ...res.data };
          this.goldEnterpriseCultivateData.name = '隐形冠军培育企业数量';
          this.goldEnterpriseCultivateData.cjcs = '/';
        }
      });
    },
    /**
     * @desc 隐形冠军-图表数据
     */
    async getInvisibleChampionChartData() {
      this.$api['grow-helper/index/getInvisibleChampionChartData']({}).then(
        (res) => {
          const data = res.data;
          this.championEnt = [
            { num: Number(data.yxgjqy), company: '隐形冠军企业(家)' },
            { num: Number(data.yxgjpyqy), company: '隐形冠军培育企业(家)' }
          ];
        }
      );
    },
    /**
     * @desc 小升规完成情况-指标卡片数据
     */
    getUpgradeCardData(num = 1) {
      const params = { type: num };
      this.$api['grow-helper/index/getUpgradeCardData']({ params }).then(
        (res) => {
          if (num === 1) {
            this.newUpEnterpriseData = { ...res.data };
            this.newUpEnterpriseData.name = '新升规企业任务数量';
            this.newUpEnterpriseData.cjcs = '/';
          } else {
            this.newUpEnterpriseTaskData = { ...res.data };
            this.newUpEnterpriseTaskData.name = '新升规企业任务数量';
            this.newUpEnterpriseTaskData.cjcs = '/';
          }
        }
      );
    },
    /**
     * @desc 小升规完成情况-图表数据
     */
    async getUpgradeChartData() {
      this.$api['grow-helper/index/getUpgradeChartData']({}).then((res) => {
        const data = res.data;
        this.ruleFinish = [
          { num: data.upgradeAmount, company: '新升规数量(家)' },
          { num: data.targetAmount, company: '目标任务数(家)' },
          { num: data.proportion, company: '完成任务比例(%)' }
        ];
      });
    },
    /**
     * @desc 专题指标卡片数据
     */
    async getZtIndexCardData() {
      this.$api['grow-helper/index/getZtIndexCardData']({}).then((res) => {
        this.titleData = { ...res.data };
        this.titleData.name = '企业培育和帮扶';
      });
    },
    getDataType(type) {
      this.showScrollList = false;
      switch (type) {
      case 'listedCompanies':
        this.leftOneTitle = '上市企业';
        this.rankList = listedCompanies;
        this.classOption.step = 0.2;
        this.isScroll = true;
        break;
      case 'tercel':
        this.leftOneTitle = '雄鹰企业';
        this.rankList = tercelEntlist;
        this.classOption.step = 0;
        this.isScroll = false;
        break;
      case 'giant':
        this.leftOneTitle = '小巨人';
        this.rankList = giantList;
        this.classOption.step = 0;
        this.isScroll = false;
        break;
      case 'champion':
        this.leftOneTitle = '隐形冠军';
        this.rankList = championList;
        this.classOption.step = 0.2;
        this.isScroll = true;
        break;
      case 'rule':
        this.leftOneTitle = '小升规';
        this.rankList = ruleList;
        this.classOption.step = 0.2;
        this.isScroll = true;
        break;
      case 'garden':
        this.leftOneTitle = '小微企业园';
        this.rankList = gardenList;
        this.classOption.step = 0.2;
        this.isScroll = true;
        break;
      default:
        break;
      }
      this.$nextTick(() => {
        this.showScrollList = true;
      });
    },
    /**
     * @desc 标题点击事件
     */
    onTitleClick() {
      console.log(this.titleData);
      this.$refs['grow-helper-ref'].openDetailHandle(this.titleData, false, [
        'zt_hy',
        'bz'
      ]);
    },
    /**
     * @desc 小升规完成情况-点击事件
     */
    onSmallItemClick(item, index) {
      this.$refs['grow-helper-ref'].openDetailHandle(
        [this.newUpEnterpriseData, this.newUpEnterpriseTaskData],
        true,
        ['zb_hy'],
        ['新升规数量', '目标任务数']
      );
    },
    /**
     * @desc 小升规完成情况-点击事件
     */
    onCultivateItemClick(item, index) {
      this.$refs['grow-helper-ref'].openDetailHandle(
        [this.goldEnterpriseData, this.goldEnterpriseCultivateData],
        true,
        ['zb_hy'],
        ['隐形冠军企业', '隐形冠军培育企业']
      );
    },
    /**
     * @desc 小微企业园-点击事件
     */
    pieLegendselectchanged(params) {
      this.$refs['grow-helper-ref'].openDetailHandle(
        [
          this.aGardenData,
          this.bGardenData,
          this.cGardenData,
          this.dGardenData
        ],
        true,
        ['zb_hy'],
        ['A档园区', 'B档园区', 'C档园区', 'D档园区']
      );
      // if (params.name.startsWith('A档园区')) {
      //   this.$refs['grow-helper-ref'].openDetailHandle(aGardenData);
      // }
      // if (params.name.startsWith('B档园区')) {
      //   this.$refs['grow-helper-ref'].openDetailHandle(bGardenData);
      // }
      // if (params.name.startsWith('C档园区')) {
      //   this.$refs['grow-helper-ref'].openDetailHandle(cGardenData);
      // }
      // if (params.name.startsWith('D档园区')) {
      //   this.$refs['grow-helper-ref'].openDetailHandle(dGardenData);
      // }
    },
    /**
     * @desc 五减政策落实情况-点击事件
     */
    onFiveClick(event) {
      this.$refs['grow-helper-ref'].openDetailHandle(this.fivePolicyData, true, [
        'zb_hy'
      ]);
    }
  }
};
</script>

<style lang="less" module>
.box {
  overflow: hidden;
  .full-y;
  .left,
  .right {
    width: 100%;
    height: calc(100vh - 110px);
  }
  .left {
    &-one {
      height: 36%;
      padding-bottom: 20px;
      box-sizing: border-box;
      // .mb-20;
      .rank {
        height: 94%;
        overflow: hidden;
        padding: 25px;
        box-sizing: border-box;
        &-item {
          .full-x;
          height: 32px;
          padding: 0 20px;
          box-sizing: border-box;
          color: rgba(255, 255, 255, 100);
          .f-16;
          .flex-start-center;
          &-name {
            margin-left: 60px;
          }
          &:nth-child(odd) {
            background-color: rgba(34, 60, 78, 1);
          }
        }
      }
    }
    &-two {
      height: 17%;
      padding-bottom: 20px;
      box-sizing: border-box;
    }
    &-three {
      height: 17%;
      padding-bottom: 20px;
      box-sizing: border-box;
    }
    &-four {
      height: 30%;
    }
  }

  .right {
    .inner {
      padding: 28px;
      box-sizing: border-box;
      height: 100%;
      &-title {
        color: #fff;
        font-size: 16px;
      }
      &-one {
        height: 15%;
        margin-bottom: 40px;
      }
      &-two {
        height: 24.5%;
        margin-bottom: 40px;
      }
      &-three {
        height: 24.5%;
      }
      &-four {
        height: 10%;
        margin-bottom: 40px;
      }
      &-five {
        height: 10%;
      }
    }
  }
}
</style>
