<template>
  <div :class="$style.main">
    <basic-layout :filterList="filterList"
                  :areaList="areaList"
                  :points="points"
                  :middleList="middleList"
                  title="5G丽水"
                  @titleClick="on5GTitleClick"
                  ref="5g-ls-ref"
                  :changeMapOpacity="false">
      <template v-slot:west>
        <div :class="$style.box">
          <div>
            <base-chart title="5G基站建设情况"
                        :showChartsTwo="true"
                        @titleClick="on5GBaseClick">
              <template slot="chart-two">
                <div style="height: 100%; width: 100%; padding: 0px 10px; display: flex;justify-content: space-between;width:100%;"
                     class="border-box">
                  <div class="item"
                       style="width:45%">
                    <base-chart2 :option="leftTopOption"
                                 id="leftTop-one"></base-chart2>
                  </div>
                  <div class="item"
                       style="width:50%">
                    <base-chart2 :option="rightTopOption"
                                 id="leftTop-two"></base-chart2>
                  </div>
                </div>
              </template>
            </base-chart>
          </div>
          <div>
            <base-chart title="2020-2025年规划基站数排名"
                        endTag=""
                        :showCharts="false"
                        @titleClick="onPlanningClick">
              <template slot="chart">
                <div style="height: 100%; width: 100%; padding: 0px 10px"
                     class="border-box ">
                  <div class="full-xy overflow">
                    <base-progress :list="dataList"
                                   :header="{
                        rank: '序号',
                        name: '区域',
                        value: '规划基站数',
                        unit: '个'
                      }"></base-progress>
                  </div>
                </div>
              </template>
            </base-chart>
          </div>
          <div>
            <base-chart title="2020年已建成基站数排名"
                        endTag=""
                        :showCharts="false"
                        @titleClick="onCompletedClick">
              <template slot="chart">
                <div style="height: 100%; width: 100%; padding: 0px 10px"
                     class="border-box">
                  <div class="full-xy overflow">
                    <base-progress :list="completeDataList"
                                   :header="{
                        rank: '序号',
                        name: '区域',
                        value: '已完成基站数',
                        unit: '个'
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
          <base-chart title="各区县基站建设情况"
                      :showCharts="false"
                      chartHeight="92%"
                      @titleClick="onCityClick">
            <template slot="chart">
              <div id="rightBot"
                   style="height: 35%; width: 100%; overflow: hidden"></div>
              <div :class="$style.table">
                <div :class="$style.tableHead">
                  <div :class="$style.tableHeadItem">属地</div>
                  <div :class="$style.tableHeadItem"
                       @click="onPlanningClick">
                    <div>2020-2025年</div>
                    <div>规划基站数</div>
                  </div>
                  <div :class="$style.tableHeadItem"
                       @click="onPlanningClick">
                    <div>2020年</div>
                    <div>规划基站数</div>
                  </div>
                  <div :class="$style.tableHeadItem"
                       @click="onCompletedClick">
                    <div>2020年</div>
                    <div>已建成基站数</div>
                  </div>
                  <div :class="$style.tableHeadItem">
                    <div>2020年</div>
                    <div>完成率</div>
                  </div>
                </div>
                <div :class="$style.tableContent">
                  <div :class="$style.tableContentRow"
                       v-for="(item, index) in tableList"
                       :key="index">
                    <div :class="$style.tableContentRowItem">
                      {{ item.area }}
                    </div>
                    <div :class="$style.tableContentRowItem">
                      {{ item['5year_plan_stat'] }}
                    </div>
                    <div :class="$style.tableContentRowItem">
                      {{ item['2020_plan_stat'] }}
                    </div>
                    <div :class="$style.tableContentRowItem">
                      {{ item.finish_stat }}
                    </div>
                    <div :class="$style.tableContentRowItem">
                      {{ item['finish_rate'] }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </base-chart>
        </div>
      </template>
    </basic-layout>
  </div>
</template>

<script>
import {
  countyBaseStationNumData,
  mapData,
  builtData,
  planData,
  areaList,
  baseStationSituationData,
  alreadyBaseStationNumData,
  planningBaseStationNumData,
  tableList
} from './data/index.js';
import echarts from 'echarts';
import { baseGaugeOption, baseBarLine2Option } from '@plugins/chart';
// eslint-disable-next-line no-unused-vars
import {
  titleData,
  completedData,
  planningData,
  base5GData,
  cityData
} from './data/quota.js';

export default {
  data() {
    this.countyBaseStationNumData = countyBaseStationNumData.value;
    this.baseStationSituationData = baseStationSituationData;
    return {
      dataList: [],
      middleList: [],
      completeDataList: [],
      filterList: mapData,
      areaList,
      points: [...builtData, ...planData],
      rightBotOption: null,
      barData: [],
      leftTopOption: null,
      tableList
    };
  },
  created() {
    this.getCompleteDataList();
    this.getDataList();
    const gaugeDataOne = {
      title: '2020年完成率',
      topTit: '2020年规划基站2826个',
      colors: '#42E1A6',
      rate: '100%',
      rateData: 1 / 1.5,
      dataArr: [
        {
          value: this.baseStationSituationData.value[2].value
        }
      ]
    };
    const gaugeDataTwo = {
      title: '5年完成率',
      topTit: '5年规划基站12277个',
      colors: '#F6BD16',
      rate: '23.02%',
      rateData: 0.23,
      dataArr: [
        {
          value: this.baseStationSituationData.value[1].value
        }
      ]
    };
    this.leftTopOption = baseGaugeOption(gaugeDataOne, 1);
    this.rightTopOption = baseGaugeOption(gaugeDataTwo);
    this.dataHandle();
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    // 进度条数据获取
    getCompleteDataList() {
      const dataList = alreadyBaseStationNumData.value;
      const total = alreadyBaseStationNumData.total;
      this.completeDataList = dataList.map(item => {
        return {
          value: item.finish_stat,
          name: item.area,
          total: total
        };
      });
    },
    // 进度条数据获取
    getDataList() {
      const dataList = planningBaseStationNumData.value;
      const total = planningBaseStationNumData.total;
      this.dataList = dataList.map(item => {
        return {
          value: item.plan_stat,
          name: item.area,
          total: total
        };
      });
    },
    /**
     * @desc 数据处理
     */
    dataHandle() {
      this.middleList = _map(baseStationSituationData.value, o => ({
        text: o.left_top_label,
        value: o.value
      }));
      this.barData = {
        xAxis: countyBaseStationNumData.value.map(v => {
          return v.area;
        }),
        value: [
          {
            name: '2020年已建成基站',
            data: countyBaseStationNumData.value.map(v => {
              return v.finish_stat;
            })
          },
          {
            name: '2020年规划基站',
            data: countyBaseStationNumData.value.map(v => {
              return v['2020_plan_stat'];
            })
          },
          {
            name: '2020年完成率',
            data: countyBaseStationNumData.value.map(v => {
              return Number(v.finish_rate);
            })
          }
        ]
      };
    },
    initCharts() {
      this.charts = echarts.init(document.getElementById('rightBot'));
      this.charts.setOption(
        baseBarLine2Option(this.barData, ['个', '个', '%'], 1)
      );
      // 图例点击事件
      this.charts.on('legendselectchanged', event => {
        this.charts.setOption({
          legend: { selected: { [event.name]: true } }
        }); // 图例点击之后在选中图例
        if (event.name === '已建成基站') {
          // 暂时注释这里的点击事件
          // this.$refs['5g-ls-ref'].openDetailHandle(completedData, true, [
          //   'zbyy'
          // ]);
        }
        if (event.name === '规划基站') {
          // 暂时注释这里的点击事件
          // this.$refs['5g-ls-ref'].openDetailHandle(planningData, true, [
          //   'zbyy'
          // ]);
        }
      });
    },
    /**
     * @desc 标题点击事件
     */
    on5GTitleClick(event) {
      this.$refs['5g-ls-ref'].openDetailHandle(titleData, false, ['ztyy', 'bz']);
    },
    /**
     * @desc 5G基站建设情况-点击事件
     */
    on5GBaseClick(event) {
      this.$refs['5g-ls-ref'].openDetailHandle(base5GData, true, ['zbyy', 'cjcs']);
    },
    /**
     * @desc 已完成基站数排名-点击事件
     */
    onCompletedClick(event) {
      this.$refs['5g-ls-ref'].openDetailHandle(completedData, true, ['zbyy']);
    },
    /**
     * @desc 规划基站数排名-点击事件
     */
    onPlanningClick(event) {
      this.$refs['5g-ls-ref'].openDetailHandle(planningData, true, ['zbyy']);
    },
    /**
     * @desc 各县市基站建设情况-点击事件
     */
    onCityClick(event) {
      this.$refs['5g-ls-ref'].openDetailHandle(cityData, true, ['zbyy']);
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
.table {
  width: 100%;
  padding: 20px 20px;
  box-sizing: border-box;
  &-head {
    background-image: linear-gradient(to right, #07333c, #085968);
    min-height: 60px;
    display: flex;
    width: 100%;
    &-item {
      .flex-column;
      justify-content: space-evenly;
      text-align: center;
      width: 33%;
      color: #fff;
      font-size: 12px;
      border: 1px solid#48535C;
      &:nth-child(1) {
        width: 24%;
      }
      &:nth-child(5) {
        width: 20%;
      }
    }
    &-item:nth-child(2),
    &-item:nth-child(3),
    &-item:nth-child(4) {
      cursor: pointer;
    }
  }
  &-content {
    width: 100%;
    // height: 70%;
    overflow: auto;
    background: #132429;
    &-row {
      width: 100%;
      min-height: 40px;
      display: flex;
      &-item {
        .flex-center;
        color: #fff;
        font-size: 13px;
        border: 1px solid#48535C;
        width: 33%;
        &:nth-child(1) {
          width: 24%;
        }
        &:nth-child(5) {
          width: 20%;
        }
      }
    }
  }
}
</style>
