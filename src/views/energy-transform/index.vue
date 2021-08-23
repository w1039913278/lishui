<template>
  <div :class="$style.main">
    <basic-layout :middleList="middleData"
                  :filterList="filterList"
                  :areaList="areaList"
                  :points="points"
                  @titleClick="onEnergyTitleClick"
                  @middleTitleClick="onMiddleTitleClick"
                  title="新旧动能转换"
                  ref="energy-ref"
                  :changeMapOpacity="false">
      <template slot="year">
        {{ `${dataYear.data_year}${dataYear.value}` }}
      </template>
      <template v-slot:west>
        <div :class="$style.box">
          <div>
            <base-chart title="'低散乱'企业整治"
                        id="leftTop"
                         :option="leftTopOption"
                        @titleClick="onLeftOne">
            </base-chart>
          </div>
          <div>
            <base-chart title="新增工业机器人情况"
                        id="leftMid"
                        :option="leftMidOption"
                        @titleClick="onAddRobot">
            </base-chart>
          </div>
          <div>
            <base-chart title="工业用地情况"
                        id="leftBot"
                        :option="leftBotOption"
                        @titleClick="onIndustrialLand"
                        :isClickLegend="true">
            </base-chart>
          </div>
        </div>
      </template>
      <template v-slot:east>
        <div :class="$style.box">
          <div>
            <base-chart title="备案投资额1000万元以上制造业情况"
                        id="rightBot"
                        :option="rightBotOption"
                        @titleClick="oninvestmentTop"
                        :isClickLegend="true">
            </base-chart>
          </div>
          <div>
            <base-chart title="市级企业技术中心排名"
                        :showCharts="false"
                        @titleClick="onTechnologyCenter">
              <template slot="chart">
                <div style="height: 100%; width: 100%; padding: 0px 10px"
                     class="border-box">
                  <div class="full-xy overflow">
                    <base-progress :list="rightTopDataList"
                                   :header="{
                        rank: '序号',
                        name: '区域',
                        unit: '家',
                        value: '市级企业技术中心企业家数',
                        img:'/static/images/thumbs-up.png'
                      }"></base-progress>
                  </div>
                </div>
              </template>
            </base-chart>
          </div>
          <div>
            <base-chart title="清洁生产审核企业排名"
                        :showCharts="false"
                        @titleClick="onCleanerProduction">
              <template slot="chart">
                <div style="height: 100%; width: 100%; padding: 0px 10px"
                     class="border-box">
                  <div class="full-xy overflow">
                    <base-progress :list="rightMidDataList"
                                   :header="{
                        rank: '序号',
                        name: '区域',
                        unit: '家',
                        value: '清洁生产审核企业家数',
                        img:'/static/images/thumbs-up.png'
                      }"></base-progress>
                  </div>
                </div>
              </template>
            </base-chart>
          </div>
        </div>
      </template>
    </basic-layout>
  </div>
</template>

<script>
import {
  dataYear,
  middleData,
  leftMidData,
  leftBotData,
  rightTopData,
  rightMidData,
  rightBottomData,
  optionData,
  areaList,
  addAreaMap,
  enterpriseRenovation,
  mapData
} from './data/index.js';
import {
  baseBarOption,
  baseBarLineOption
} from '@plugins/chart';
import {
  titleData,
  leftTopData,
  addRobotData,
  industrialLandData,
  technologyCenter,
  cleanerProduction,
  investmentTopData,
  middleTitleData
} from './data/quota.js';
export default {
  data() {
    this.dataYear = dataYear;
    this.middleData = middleData.map((v) => {
      switch (v.label_name) {
      case '整治企业数(家)':
        if (v.label_value > 310) {
          v.label_img = '/static/images/thumbs-up.png';
        } else if (v.label_value < 0) {
          v.label_img = '/static/images/exclamatory-mark.png';
        }
        break;
      case '新增工业机器人(台)':
        if (v.label_value > 415) {
          v.label_img = '/static/images/thumbs-up.png';
        } else if (v.label_value < 0) {
          v.label_img = '/static/images/exclamatory-mark.png';
        }
        break;
      case '新增工业供地面积(亩)':
        if (v.label_value > 5000) {
          v.label_img = '/static/images/thumbs-up.png';
        } else if (v.label_value < 0) {
          v.label_img = '/static/images/exclamatory-mark.png';
        }
        break;
      case '市级企业技术中心(家)':
        if (v.label_value > 16) {
          v.label_img = '/static/images/thumbs-up.png';
        } else if (v.label_value < 0) {
          v.label_img = '/static/images/exclamatory-mark.png';
        }
        break;
      }
      return {
        text: v.label_name,
        value: v.label_value,
        img: v.label_img
      };
    });
    return {
      rightTopDataList: [],
      rightMidDataList: [],
      rightBottomData,
      leftTopOption: {
        color: ['#3271FF', '#20DBEE', '#42E1A6', '#F3921F', '#F6BD16'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          confine: true,
          formatter: function (params) {
            var relVal = params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
              relVal +=
                '<br/>' + params[i].seriesName + ' : ' + params[i].value + '家';
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
          data: [
            '改造提升数',
            '整合入园数',
            '合理转移数',
            '关停淘汰数',
            '落后淘汰数'
          ],
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { color: '#fff', fontSize: 12 },
          itemGap: 20,
          top: 15
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [
            '莲都区',
            '开发区',
            '青田县',
            '缙云县',
            '遂昌县',
            '松阳县',
            '云和县',
            '庆元县',
            '景宁县',
            '龙泉市'
          ],
          axisLine: {
            show: true,
            lineStyle: {
              color: '#BFBFBF'
            }
          },
          axisLabel: {
            interval: 0,
            show: true,
            rotate: 0,
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
            name: '改造提升数',
            type: 'bar',
            stack: '总量',
            barWidth: 15,
            data: [16, 0, 33, 8, 12, 27, 15, 23, 5, 3]
          },
          {
            name: '整合入园数',
            type: 'bar',
            stack: '总量',
            barWidth: 15,
            data: [2, 0, 0, 38, 17, 0, 11, 2, 2, 6]
          },
          {
            name: '合理转移数',
            type: 'bar',
            stack: '总量',
            barWidth: 15,
            data: [0, 3, 6, 1, 0, 1, 1, 1, 0, 1]
          },
          {
            name: '关停淘汰数',
            type: 'bar',
            stack: '总量',
            barWidth: 15,
            data: [3, 52, 12, 14, 1, 14, 23, 0, 3, 27]
          }
        ]
      },
      leftMidOption: null,
      leftBotOption: null,
      filterList: mapData,
      areaList,
      points: [...addAreaMap, ...enterpriseRenovation],
      rightBotOption: null
    };
  },
  created() {
    this.getRightTopData();
    this.getRightMidData();
    this.getRightBottomData();
    this.leftMidOption = baseBarOption(
      leftMidData,
      {
        unit: ['台', '台', '台']
      },
      1
    );
    this.leftBotOption = baseBarOption(leftBotData, { unit: ['亩', '亩'] }, 1);
  },
  methods: {
    /**
     * @desc 数据指标及地图数据
     */
    getMainData() {
      const params = {};
      this.$api['energy-transform/index/getMainData']({ params }).then(res => {
        console.log(res);
      });
    },
    /**
     * @desc 标题点击事件
     */
    onEnergyTitleClick() {
      this.$refs['energy-ref'].openDetailHandle(titleData, false, [
        'ztyy',
        'bz'
      ]);
    },
    /**
     * @desc 点击中间指标
     */
    onMiddleTitleClick(item, index) {
      this.$refs['energy-ref'].openDetailHandle(middleTitleData[index], true, [
        'zbyy',
        'cjcs'
      ]);
    },
    /*
     * @desc 点击左侧第一个图例事件
     */
    onLeftOne({ name }) {
      // const legendData = this.leftTopOption.legend.data;
      // const index = legendData.indexOf(name);
      this.$refs['energy-ref'].openDetailHandle(leftTopData[0], true, ['zbyy']);
    },
    /*
     * @desc 新增机器人事件
     */
    onAddRobot() {
      this.$refs['energy-ref'].openDetailHandle(addRobotData, true, ['zbyy']);
    },
    /*
     * @desc 点击工业用地图例事件
     */
    onIndustrialLand() {
      this.$refs['energy-ref'].openDetailHandle(
        industrialLandData,
        true,
        ['zbyy'],
        ['新增工业供地面积', '新出让工业用地面积']
      );
    },
    /*
     * @desc 点击市级企业技术中心排名
     */
    onTechnologyCenter() {
      this.$refs['energy-ref'].openDetailHandle(technologyCenter, true, [
        'zbyy',
        'cjcs'
      ]);
    },
    /*
     * @desc 点击清洁生产审核企业排名
     */
    onCleanerProduction() {
      this.$refs['energy-ref'].openDetailHandle(cleanerProduction, true, [
        'zbyy',
        'cjcs'
      ]);
    },
    /*
     * @desc 备案投资额1000万元以上制造业情况
     */
    oninvestmentTop() {
      this.$refs['energy-ref'].openDetailHandle(
        investmentTopData,
        true,
        ['zbyy'],
        ['制造业项目数', '制造业项目投资额']
      );
    },
    //, 备案投资额1000万元以上制造业情况
    getRightBottomData() {
      const rightBottomData = optionData.map((item) => {
        item.data = this.rightBottomData.value.map((value) => {
          return {
            value: value[item.key],
            name: value.area
          };
        });
        return item;
      });
      this.rightBotOption = baseBarLineOption(
        rightBottomData,
        {
          isDoubleY: true,
          unit: ['个', '亿元']
        },
        1
      );
    },
    // 市级企业技术中心排名
    getRightTopData() {
      const dataList = rightTopData.value;
      const total = rightTopData.total;
      this.rightTopDataList = dataList.map((item) => {
        return {
          value: item.ent_count,
          name: item.area,
          total: total,
          rank: item.rank
        };
      });
    },
    // 清洁生产审核企业排名
    getRightMidData() {
      const dataList = rightMidData.value;
      const total = rightMidData.total;
      this.rightMidDataList = dataList.map((item) => {
        return {
          value: item.ent_count,
          name: item.area,
          total: total,
          rank: item.rank
        };
      });
    }
  }
};
</script>

<style lang="less" module>
.main {
  .full-xy;
  .box {
    height: calc(100vh - 110px);
    > div {
      height: 32%;
    }
    > div:nth-child(1) {
      margin-bottom: 10px;
    }
    > div:nth-child(2) {
      margin-bottom: 10px;
    }
  }
}
</style>
