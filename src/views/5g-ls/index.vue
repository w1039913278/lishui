<template>
  <div :class="$style.main">
    <basic-layout
      :filterList="filterList"
      :areaList="areaList"
      :points="points"
      :middleList="middleList"
      title="5G丽水"
      @titleClick="on5GTitleClick"
      ref="5g-ls-ref"
      :changeMapOpacity="false"
    >
      <template v-slot:west>
        <div :class="$style.box">
          <div>
            <base-chart
              title="5G基站建设情况"
              :showChartsTwo="true"
              @titleClick="on5GBaseClick"
            >
              <template slot="chart-two">
                <div
                  style="height: 100%; width: 100%; padding: 0px 10px; display: flex;justify-content: space-between;width:100%;"
                  class="border-box"
                >
                  <div class="item" style="width:45%">
                    <base-chart2
                      :option="leftTopOption"
                      id="leftTop-one"
                    ></base-chart2>
                  </div>
                  <div class="item" style="width:50%">
                    <base-chart2
                      :option="rightTopOption"
                      id="leftTop-two"
                    ></base-chart2>
                  </div>
                </div>
              </template>
            </base-chart>
          </div>
          <div>
            <base-chart
              title="2020-2025年规划基站数排名"
              endTag=""
              :showCharts="false"
              @titleClick="onPlanningClick"
            >
              <template slot="chart">
                <div
                  style="height: 100%; width: 100%; padding: 0px 10px"
                  class="border-box "
                >
                  <div class="full-xy overflow">
                    <base-progress
                      :list="dataList"
                      :header="{
                        rank: '序号',
                        name: '区域',
                        value: '规划基站数',
                        unit: '个'
                      }"
                    ></base-progress>
                  </div>
                </div>
              </template>
            </base-chart>
          </div>
          <div>
            <base-chart
              title="2020年已建成基站数排名"
              endTag=""
              :showCharts="false"
              @titleClick="onCompletedClick"
            >
              <template slot="chart">
                <div
                  style="height: 100%; width: 100%; padding: 0px 10px"
                  class="border-box"
                >
                  <div class="full-xy overflow">
                    <base-progress
                      :list="completeDataList"
                      :header="{
                        rank: '序号',
                        name: '区域',
                        value: '已完成基站数',
                        unit: '个'
                      }"
                    ></base-progress>
                  </div>
                </div>
              </template>
            </base-chart>
          </div>
        </div>
      </template>
      <template v-slot:east>
        <div :class="$style.box">
          <base-chart
            title="各区县基站建设情况"
            :showCharts="false"
            chartHeight="92%"
            @titleClick="onCityClick"
          >
            <template slot="chart">
              <div
                id="rightBot"
                style="height: 35%; width: 100%; overflow: hidden"
              ></div>
              <div :class="$style.table">
                <div :class="$style.tableHead">
                  <div :class="$style.tableHeadItem">属地</div>
                  <div :class="$style.tableHeadItem" @click="onPlanningClick">
                    <div>2020-2025年</div>
                    <div>规划基站数</div>
                  </div>
                  <div :class="$style.tableHeadItem" @click="onPlanningClick">
                    <div>2020年</div>
                    <div>规划基站数</div>
                  </div>
                  <div :class="$style.tableHeadItem" @click="onCompletedClick">
                    <div>2020年</div>
                    <div>已建成基站数</div>
                  </div>
                  <div :class="$style.tableHeadItem">
                    <div>2020年</div>
                    <div>完成率</div>
                  </div>
                </div>
                <div :class="$style.tableContent">
                  <div
                    :class="$style.tableContentRow"
                    v-for="(item, index) in tableList"
                    :key="index"
                  >
                    <div :class="$style.tableContentRowItem">
                      {{ item.area }}
                    </div>
                    <div :class="$style.tableContentRowItem">
                      {{ item.fiveYearCompleteNumber }}
                    </div>
                    <div :class="$style.tableContentRowItem">
                      {{ item.yearPlanNumber }}
                    </div>
                    <div :class="$style.tableContentRowItem">
                      {{ item.yearCompleteNumber }}
                    </div>
                    <div :class="$style.tableContentRowItem">
                      {{ item.yearCompleteRate }}
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
  // countyBaseStationNumData,
  mapData,
  builtData,
  planData,
  areaList
} from './data/index.js';
import echarts from 'echarts';
import { baseGaugeOption, baseBarLine2Option } from '@plugins/chart';

export default {
  data() {
    // this.countyBaseStationNumData = countyBaseStationNumData.value;
    return {
      titleData: {},
      dataList: [],
      middleList: [],
      completeDataList: [],
      filterList: mapData,
      areaList,
      points: [],
      rightBotOption: null,
      barData: [],
      NewbuiltData: [],
      NewplanData: [],
      leftTopOption: baseGaugeOption(
        {
          title: '2020年完成率',
          topTit: '2020年规划基站2826个',
          colors: '#42E1A6',
          rate: '0',
          rateData: 0 / 1.5,
          dataArr: [
            {
              value: 0
            }
          ]
        },
        1
      ),
      tableList: [],
      baseStationSituationData: {},
      rightTopOption: baseGaugeOption({
        title: '5年完成率',
        topTit: '5年规划基站12277个',
        colors: '#F6BD16',
        rate: '0',
        rateData: 0,
        dataArr: [
          {
            value: 0
          }
        ]
      }),
      base5GData: {}, // 5G基站建设情况
      planningData: {}, // 2020-2025基站数排名
      completedData: {},
      loading: null
    };
  },
  async created() {
    this.loading = this.$loading({
      lock: true,
      target: '加载中'
    });
    await this.getMainData();
    await this.getZtIndexCardData();
    await this.getOneIndexCardData();
    await this.getTwoChartData();
    await this.getTwoCardIndexData();
    await this.getThreeChartData();
    await this.getThreeCardIndexData();
    await this.getFourChartData();
    await this.getFourCardIndexData();
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initCharts();
    // });
  },
  methods: {
    /**
     * @desc 各区县基站建设情况-指标卡片数据
     */
    async getFourCardIndexData() {
      this.$api['5g-ls/index/getFourCardIndexData']({}).then(res => {
        this.cityData = { ...res.data };
        this.cityData.name = '5G通信基础设施建设已完成情况';
        // this.cityData.yzfz = '/';
        // this.cityData.cjfz = '/';
        this.cityData.cjcs = '/';
        this.loading.close();
      });
    },
    /**
     * @desc 2020年已建成基站数排名-指标卡片数据
     */
    async getFourChartData() {
      this.$api['5g-ls/index/getFourChartData']({}).then(res => {
        const data = res.data;
        this.tableList = data;
        this.barData = {
          xAxis: data.map(v => {
            return v.area;
          }),
          value: [
            {
              name: '2020年已建成基站',
              data: data.map(v => {
                return Number(v.yearCompleteNumber);
              })
            },
            {
              name: '2020年规划基站',
              data: data.map(v => {
                return Number(v.yearPlanNumber);
              })
            },
            {
              name: '2020年完成率',
              data: data.map(v => {
                return Number(v.yearCompleteRate);
              })
            }
          ]
        };
        this.$nextTick(() => {
          this.initCharts();
        });
      });
    },
    /**
     * @desc 2020年已建成基站数排名-指标卡片数据
     */
    async getThreeCardIndexData() {
      this.$api['5g-ls/index/getThreeCardIndexData']({}).then(res => {
        this.completedData = { ...res.data };
        this.completedData.name = '5G通信基础设施建设已完成情况';
        // this.completedData.yzfz = '/';
        // this.completedData.cjfz = '/';
        this.completedData.cjcs = '/';
      });
    },
    /**
     * @desc 2020年已建成基站数排名-图表数据
     */
    async getThreeChartData() {
      this.$api['5g-ls/index/getThreeChartData']({}).then(res => {
        this.completeDataList = res.data.map(item => {
          return {
            value: item.value,
            name: item.area
          };
        });
      });
    },
    /**
     * @desc 2020-2025年规划基站数排名-指标卡片数据
     */
    async getTwoCardIndexData() {
      this.$api['5g-ls/index/getTwoCardIndexData']({}).then(res => {
        this.planningData = { ...res.data };
        this.planningData.name = '5G通信基础设施建设规划完成情况';
        // this.planningData.yzfz = '/';
        // this.planningData.cjfz = '/';
        this.planningData.cjcs = '/';
      });
    },
    /**
     * @desc 2020-2025年规划基站数排名-图表数据
     */
    async getTwoChartData() {
      this.$api['5g-ls/index/getTwoChartData']({}).then(res => {
        this.dataList = res.data.map(item => {
          return {
            value: item.value,
            name: item.area
          };
        });
      });
    },
    /**
     * @desc 5G基站建设情况-指标卡片数据
     */
    async getOneIndexCardData() {
      this.$api['5g-ls/index/getOneIndexCardData']({}).then(res => {
        this.base5GData = { ...res.data };
        this.base5GData.name = '5G通信基础设施建设已完成情况';
        this.base5GData.cjcs =
          '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
        this.getOneChartData();
      });
    },
    /**
     * @desc 专5G基站建设情况-图表数据
     */
    async getOneChartData() {
      this.$api['5g-ls/index/getOneChartData']({}).then(res => {
        const data = res.data;
        const max = Number(this.base5GData.yzfz.split(',')[1]);
        const min = Number(this.base5GData.cjfz.split(',')[1]);
        const gaugeDataOne = {
          title: '2020年完成率',
          topTit: `2020年规划基站${data.yearPlanNumber}个`,
          colors: '#42E1A6',
          rate: data.yearCompleteRate + '%',
          rateData: Number(data.yearCompleteRate) / 150,
          dataArr: [
            {
              value: data.yearPlanNumber
            }
          ]
        };
        const gaugeDataTwo = {
          title: '5年完成率',
          topTit: `5年规划基站${data.fiveYearPlanNumber}个`,
          colors: '#F6BD16',
          rate: data.fiveYearCompleteRate + '%',
          rateData: Number(data.fiveYearCompleteRate) / 100,
          dataArr: [
            {
              value: data.fiveYearPlanNumber
            }
          ]
        };
        this.leftTopOption = baseGaugeOption(gaugeDataOne, 1, min, max);
        this.rightTopOption = baseGaugeOption(gaugeDataTwo);
      });
    },
    /**
     * @desc 专题指标卡片数据
     */
    async getZtIndexCardData() {
      this.$api['5g-ls/index/getZtIndexCardData']({}).then(res => {
        this.titleData = { ...res.data };
        this.titleData.name = '5G丽水';
      });
    },
    /**
     * @desc 数据指标及地图数据
     */
    async getMainData() {
      this.$api['5g-ls/index/getMainData']({}).then(res => {
        const data = res.data;
        this.baseStationSituationData = {
          name: '基站建设情况',
          value: [
            {
              left_top_label: ' 全市5年规划基站（个）',
              value: data.fiveYearPlanNumber
            },
            {
              left_top_label: '2020年规划基站（个）',
              value: data.yearPlanNumber
            },
            {
              left_top_label: '2020年已建成基站（个）',
              value: data.yearCompleteNumber
            }
          ]
        };
        this.middleList = _map(this.baseStationSituationData.value, o => ({
          text: o.left_top_label,
          value: o.value
        }));
        this.addmap(
          data.completeInfo,
          builtData,
          this.NewbuiltData,
          'The_base_station_has_been_built'
        );
        this.addmap(
          data.planInfo,
          planData,
          this.NewplanData,
          'Planning_Base_Station'
        );
        this.points = [...this.NewbuiltData, ...this.NewplanData];
      });
    },
    /**
     * @desc 地图数据添加
     */
    addmap(list1, list2, newlist, text) {
      list1.forEach(ele => {
        list2.forEach(item => {
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
     * @desc 数据处理
     */
    // dataHandle() {
    //   this.barData = {
    //     xAxis: countyBaseStationNumData.value.map(v => {
    //       return v.area;
    //     }),
    //     value: [
    //       {
    //         name: '2020年已建成基站',
    //         data: countyBaseStationNumData.value.map(v => {
    //           return v.finish_stat;
    //         })
    //       },
    //       {
    //         name: '2020年规划基站',
    //         data: countyBaseStationNumData.value.map(v => {
    //           return v['2020_plan_stat'];
    //         })
    //       },
    //       {
    //         name: '2020年完成率',
    //         data: countyBaseStationNumData.value.map(v => {
    //           return Number(v.finish_rate);
    //         })
    //       }
    //     ]
    //   };
    // },
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
      this.$refs['5g-ls-ref'].openDetailHandle(this.titleData, false, [
        'zt_hy',
        'bz'
      ]);
    },
    /**
     * @desc 5G基站建设情况-点击事件
     */
    on5GBaseClick(event) {
      this.$refs['5g-ls-ref'].openDetailHandle(this.base5GData, true, [
        'zb_hy',
        'cjcs'
      ]);
    },
    /**
     * @desc 已完成基站数排名-点击事件
     */
    onCompletedClick(event) {
      this.$refs['5g-ls-ref'].openDetailHandle(this.completedData, true, [
        'zb_hy'
      ]);
    },
    /**
     * @desc 规划基站数排名-点击事件
     */
    onPlanningClick(event) {
      this.$refs['5g-ls-ref'].openDetailHandle(this.planningData, true, [
        'zb_hy'
      ]);
    },
    /**
     * @desc 各县市基站建设情况-点击事件
     */
    onCityClick(event) {
      this.$refs['5g-ls-ref'].openDetailHandle(this.cityData, true, ['zb_hy']);
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
