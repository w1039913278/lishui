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
    <basic-layout
      :middleList="middleList"
      :filterList="filterList"
      :areaList="areaList"
      :points="points"
      title="数字经济"
      @titleClick="onTitleClick"
      @middleTitleClick="onMiddleTitleClick"
      ref="digital-economy"
      :changeMapOpacity="false"
    >
      <template slot="year">{{ dataYear.data_year + dataYear.value }}</template>
      <template v-slot:west>
        <div :class="$style.box">
          <div :class="$style.leftOne">
            <base-chart
              title="数字经济核心产业增加值及增速"
              :showCharts="false"
              chartHeight="60%"
              @titleClick="onAddIndustry"
            >
              <template slot="chart">
                <div style="height: 100%; width: 100%; overflow: auto">
                  <base-target :dataList="targetList"></base-target>
                </div>
              </template>
            </base-chart>
          </div>
          <div :class="$style.leftTwo">
            <base-chart
              title="数字经济核心制造业增加值及增速情况"
              :showCharts="false"
              @titleClick="onManufacturing"
              chartHeight="60%"
            >
              <template slot="chart">
                <div style="height: 100%; width: 100%; overflow: auto">
                  <base-target
                    :imgType="2"
                    :dataList="tarMakegetList"
                  ></base-target>
                </div>
              </template>
            </base-chart>
          </div>
          <div :class="$style.leftThree">
            <!-- @legendselectchanged="onLeftWtoLegend" 暂时注释柱状图点击事件 -->
            <base-chart
              title="规上数字经济核心制造业增加值区县情况"
              chartHeight="80%"
              :id="id"
              :option="baseBarLineOption"
              @titleClick="onCounty"
              ref="digital-economy"
              :isClickLegend="true"
            ></base-chart>
          </div>
          <div :class="$style.leftFour">
            <base-chart
              title="数字经济核心制造业增加值排名"
              @titleClick="onCoreMake"
              :showCharts="false"
            >
              <template slot="chart">
                <div
                  style="height: 100%; width: 100%;padding:25px"
                  class="border-box"
                >
                  <div class="full-xy overflow">
                    <base-progress
                      :list="manufacturingData"
                      :header="{
                        rank: '序号',
                        name: '区域',
                        unit: '亿元',
                        value: '核心制造业增加值'
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
          <div :class="$style.rightOne">
            <base-chart
              title="数字经济发展综合评价情况"
              :showCharts="false"
              chartHeight="60%"
              @titleClick="onDevelopmentEvaluate"
            >
              <template slot="chart">
                <div style="height: 100%; width: 100%; overflow: auto">
                  <base-target :dataList="targetListRight"></base-target>
                </div>
              </template>
            </base-chart>
          </div>
          <div :class="$style.rightTwo">
            <base-chart
              title="数字经济发展综合评价排名"
              @titleClick="onNumberMoney"
              :showCharts="false"
            >
              <template slot="chart">
                <div
                  style="height: 100%; width: 100%;padding:25px"
                  class="border-box"
                >
                  <div class="full-xy overflow">
                    <base-progress
                      :list="dataList"
                      :header="{
                        rank: '序号',
                        name: '区域',
                        unit: '',
                        value: '总指数'
                      }"
                    ></base-progress>
                  </div>
                </div>
              </template>
            </base-chart>
          </div>
          <div :class="$style.rightThree">
            <base-chart
              title="企业上云完成情况"
              chartHeight="80%"
              :id="cloudId"
              :option="basePieOption"
              @titleClick="onCloud"
            ></base-chart>
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
  ManufactureAddCountyData,
  areaList,
  zzyMapData,
  ysqyMapData,
  enterpriseUpDayData
} from './data/index.js';
import {
  addManufacturingCountyData
} from './data/quota.js';
export default {
  components: { baseTarget },
  data() {
    return {
      areaList,
      points: [...zzyMapData, ...ysqyMapData],
      dataYear, // 数据年份
      dataList: [], // 数字经济发展综合评价排名
      manufacturingData: [], // 制造业增加排名
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
          key: 'addValueSum',
          data: []
        },
        {
          name: '同比增速',
          key: 'rate',
          data: []
        }
      ],
      titleData: {},
      addIndustryData: {}, // 数字经济核心产业增加值
      addManufacturingData: {}, // 数字经济制造业增加值
      developmentData: {}, // 数字经济发展综合指数
      cloudData: {}, // 新增上云企业家数
      coreMakeData: {},
      addManufacturingDataRate: {}, // 数字经济核心制造业增速情况
      countyData: {},
      numberMoneyData: {},
      middleList: [], // 数字经济头部内容
      NewzzyMapData: [],
      NewysqyMapData: [],
      id: 'manufacture',
      targetList: [],
      tarMakegetList: [],
      targetListRight: [],
      cloudId: 'cloud',
      basePieOption: basePieOption(
        enterpriseUpDayData,
        '企业上云完成情况',
        '家'
      ),
      baseBarLineOption: baseBarLineOption(
        [
          {
            name: '核心制造业增加值累计',
            key: 'addValueSum',
            data: []
          },
          {
            name: '同比增速',
            key: 'rate',
            data: []
          }
        ],
        { isDoubleY: true, unit: ['亿元', '%'] },
        1
      ),
      loading: null,
      addIndustryDataRate: {}
    };
  },
  async created() {
    this.loading = this.$loading({
      lock: true,
      target: '加载中'
    });
    await this.getMainIndexCardData();
    // this.dataInit();
    await this.getZtIndexCardData();
    await this.getOneIndexCardData(2);
    // await this.getOneChartData();
    await this.getTwoCardIndexData(2);
    // await this.getTwoChartData();
    await this.getThreeChartData();
    await this.getThreeCardIndexData();
    await this.getFourChartData();
    await this.getFourCardIndexData();
    await this.getFiveChartData();
    await this.getSixCardIndexData();
    await this.getSixChartData();
    await this.getMainData();
    await this.getSevenChartData();
  },

  methods: {
    /**
     * @desc 数字经济发展综合评价排名-图表数据
     */
    async getSevenChartData() {
      this.$api['digital-economy/index/getSevenChartData']({}).then(res => {
        const list = res.data;
        const data = list.map(item => {
          return {
            value: Number(item.value),
            name: item.area
          };
        });
        this.basePieOption = basePieOption(data, '企业上云完成情况', '家');
        this.loading.close();
      });
    },
    /**
     * @desc 数字经济发展综合评价排名-图表数据
     */
    async getSixChartData() {
      this.$api['digital-economy/index/getSixChartData']({}).then(res => {
        const list = res.data;
        this.dataList = list.map(item => {
          return {
            value: item.value,
            name: item.area
          };
        });
      });
    },
    /**
     * @desc 数字经济发展综合评价排名-指标卡片数据
     */
    async getSixCardIndexData() {
      this.$api['digital-economy/index/getSixCardIndexData']({}).then(res => {
        this.numberMoneyData = res.data;
        this.numberMoneyData.name = '数字经济发展综合评价排名';
        this.numberMoneyData.cjcs = '/';
      });
    },
    /**
     * @desc 数字经济发展综合评价情况-图表数据
     */
    async getFiveChartData() {
      this.$api['digital-economy/index/getFiveChartData']({}).then(res => {
        const obj = {
          name: '数字经济发展综合评价情况',
          value: [
            { company: '丽水市总指数', value: res.data.totalIndex, icon: '' },
            { company: '全省位次', value: res.data.provinceRank }
          ]
        };
        this.targetListRight = obj.value.map(item => {
          if (item.company === '丽水市总指数') {
            if (item.value > Number(this.developmentData.yzfz.split(',')[1])) {
              item.icon = '/static/images/thumbs-up.png';
            } else if (item.value < Number(this.developmentData.cjfz.split(',')[1])) {
              item.icon = '/static/images/exclamatory-mark.png';
            }
          }
          return {
            num: item.value,
            company: item.company,
            img: item.icon
          };
        });
      });
    },
    /**
     * @desc 核心制造业增加值排名-指标卡片数据
     */
    async getFourCardIndexData() {
      this.$api['digital-economy/index/getFourCardIndexData']({}).then(res => {
        this.coreMakeData = res.data;
        this.coreMakeData.name = '数字经济核心制造业增加值排名';
        this.coreMakeData.cjcs = '/';
      });
    },
    /**
     * @desc 核心制造业增加值排名-图表数据
     */
    async getFourChartData() {
      this.$api['digital-economy/index/getFourChartData']({}).then(res => {
        const list = res.data;
        this.manufacturingData = list.map(item => {
          return {
            value: item.value,
            name: item.area
          };
        });
      });
    },
    /**
     * @desc 核心制造业增加值区县情况-指标卡片数据
     */
    async getThreeCardIndexData() {
      this.$api['digital-economy/index/getThreeCardIndexData']({}).then(res => {
        this.countyData = res.data;
        this.countyData.cjcs = '/';
        this.countyData.name = '规上数字经济核心制造业增加值区县情况';
      });
    },
    /**
     * @desc 核心制造业增加值区县情况-图表数据
     */
    async getThreeChartData() {
      this.$api['digital-economy/index/getThreeChartData']({}).then(res => {
        const list = res.data;
        this.barData = this.barData.map(item => {
          item.data = list.map(value => {
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
      });
    },
    /**
     * @desc 数字经济核心产业增加值及增速-指标卡片数据
     */
    async getOneIndexCardData(num) {
      const params = { type: num };
      this.$api['digital-economy/index/getOneIndexCardData']({ params }).then(
        res => {
          this.addIndustryDataRate = res.data;
          this.addIndustryDataRate.name = '数字经济核心产业增加值增速';
          this.addIndustryDataRate.cjcs =
            '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
          this.getOneChartData();
        }
      );
    },
    /**
     * @desc 数字经济核心产业增加值及增速-图表数据
     */
    async getOneChartData() {
      this.$api['digital-economy/index/getOneChartData']({ }).then(res => {
        const obj = {
          name: '数字经济核心产业增加值',
          value: [
            {
              left_top_label: '丽水市累计(亿元)',
              value: res.data.amountSum,
              icon: ''
            },
            { left_top_label: '同比增速(%)', value: res.data.rate, icon: '' },
            { left_top_label: '增速排名', value: res.data.rank }
          ]
        };
        this.targetList = obj.value.map(item => {
          if (item.left_top_label === '丽水市累计(亿元)') {
            if (item.value > Number(this.addIndustryData.yzfz.split(',')[1])) {
              item.icon = '/static/images/thumbs-up.png';
            } else if (item.value < Number(this.addIndustryData.cjfz.split(',')[1])) {
              item.icon = '/static/images/exclamatory-mark.png';
            }
          }
          if (item.left_top_label === '同比增速(%)') {
            if (item.value > Number(this.addIndustryDataRate.cjfz.split(',')[1])) {
              item.icon = '/static/images/thumbs-up.png';
            } else if (item.value < Number(this.addIndustryDataRate.cjfz.split(',')[1])) {
              item.icon = '/static/images/exclamatory-mark.png';
            }
          }
          return {
            num: item.value,
            company: item.left_top_label,
            img: item.icon
          };
        });
      }
      );
    },
    /**
     * @desc 核心制造业增加值及增速情况-指标卡片数据
     */
    async getTwoCardIndexData(num) {
      const params = { type: num };
      this.$api['digital-economy/index/getTwoCardIndexData']({ params }).then(
        res => {
          this.addManufacturingDataRate = res.data;
          this.addManufacturingDataRate.name = '数字经济核心制造业增加值增速';
          this.addManufacturingDataRate.cjcs =
            '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
          this.getTwoChartData();
        }
      );
    },
    /**
     * @desc 核心制造业增加值及增速情况-图表数据
     */
    getTwoChartData() {
      this.$api['digital-economy/index/getTwoChartData']({}).then(res => {
        const obj = {
          name: '规上数字经济核心核心制造业增加值情况',
          value: [
            {
              left_below_label: '丽水市累计(亿元)',
              value: res.data.amountSum,
              icon: ''
            },
            { left_below_label: '同比增速(%)', value: res.data.rate, icon: '' },
            { left_below_label: '增速排名', value: res.data.rank }
          ]
        };
        this.tarMakegetList = obj.value.map(item => {
          if (item.left_below_label === '丽水市累计(亿元)') {
            if (item.value > Number(this.addManufacturingData.yzfz.split(',')[1])) {
              item.icon = '/static/images/thumbs-up.png';
            } else if (item.value < Number(this.addManufacturingData.cjfz.split(',')[1])) {
              item.icon = '/static/images/exclamatory-mark.png';
            }
          }
          if (item.left_below_label === '同比增速(%)') {
            if (item.value > Number(this.addManufacturingDataRate.yzfz.split(',')[1])) {
              item.icon = '/static/images/thumbs-up.png';
            } else if (item.value < Number(this.addManufacturingDataRate.cjfz.split(',')[1])) {
              item.icon = '/static/images/exclamatory-mark.png';
            }
          }
          return {
            num: item.value,
            company: item.left_below_label,
            img: item.icon
          };
        });
      });
    },
    /**
     * @desc 数据指标-指标卡片数据
     */
    async getMainIndexCardData() {
      for (let number = 1; number < 5; number++) {
        if (number === 1) {
          const params = { type: number };
          this.$api['digital-economy/index/getMainIndexCardData']({
            params
          }).then(res => {
            this.addIndustryData = res.data;
            this.addIndustryData.name = '数字经济核心产业增加值';
            this.addIndustryData.cjcs =
            '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
          });
        }
        if (number === 2) {
          const params = { type: number };
          this.$api['digital-economy/index/getMainIndexCardData']({
            params
          }).then(res => {
            this.addManufacturingData = res.data;
            this.addManufacturingData.name = '数字经济核心制造业增加值';
            this.addManufacturingData.cjcs =
            '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
          });
        }
        if (number === 3) {
          const params = { type: number };
          this.$api['digital-economy/index/getMainIndexCardData']({
            params
          }).then(res => {
            this.developmentData = res.data;
            this.developmentData.name = '数字经济发展综合评价指数';
            this.developmentData.cjcs =
            '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
          });
        }
        if (number === 4) {
          const params = { type: number };
          this.$api['digital-economy/index/getMainIndexCardData']({
            params
          }).then(res => {
            this.cloudData = res.data;
            this.cloudData.name = '新增上云企业家数';
            this.cloudData.cjcs =
            '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
          });
        }
      }
    },
    /**
     * @desc 专题指标卡片数据
     */
    async getZtIndexCardData() {
      this.$api['digital-economy/index/getZtIndexCardData']({}).then(res => {
        const data = res.data;
        this.titleData = data;
        this.titleData.name = '数字经济';
        this.titleData.xtdw = '市统计局';
      });
    },
    /**
     * @desc 数据指标及地图数据
     */
    async getMainData() {
      this.$api['digital-economy/index/getMainData']({}).then(res => {
        const data = res.data;
        const list = [
          { text: '核心产业增加值(亿元)', value: data.hxcyzjz, img: '' },
          { text: '核心制造业增加值(亿元)', value: data.hxzzyzjz, img: '' },
          { text: '发展综合评价指数', value: data.fzzhpjzs, img: '' },
          { text: '上云企业数(家)', value: data.qysys, img: '' }
        ];
        this.getImg(list);
        this.addmap(
          data.addValueList,
          zzyMapData,
          this.NewzzyMapData,
          'Manufacturing_value_added'
        );
        this.addmap(
          data.entCountList,
          ysqyMapData,
          this.NewysqyMapData,
          'The_number_of_cloud_homes_on_the_enterprise'
        );
        this.points = [...this.NewysqyMapData, ...this.NewzzyMapData];
      });
    },
    /**
     * @desc 头部内容逻辑添加图片
     */
    getImg(list) {
      this.middleList = list.map(v => {
        switch (v.text) {
        case '核心产业增加值(亿元)':
          if (v.value > this.addIndustryData.yzfz.split(',')[1]) {
            v.img = '/static/images/thumbs-up.png';
          } else if (v.value < this.addIndustryData.cjfz.split(',')[1]) {
            v.img = '/static/images/exclamatory-mark.png';
          }
          break;
        case '核心制造业增加值(亿元)':
          if (v.value > this.addManufacturingData.yzfz.split(',')[1]) {
            v.img = '/static/images/thumbs-up.png';
          } else if (v.value < this.addManufacturingData.cjfz.split(',')[1]) {
            v.img = '/static/images/exclamatory-mark.png';
          }
          break;
        case '发展综合评价指数':
          if (v.value > this.developmentData.yzfz.split(',')[1]) {
            v.img = '/static/images/thumbs-up.png';
          } else if (v.value < this.developmentData.yzfz.split(',')[1]) {
            v.img = '/static/images/exclamatory-mark.png';
          }
          break;
        case '上云企业数(家)':
          if (v.value > this.cloudData.yzfz.split(',')[1]) {
            v.img = '/static/images/thumbs-up.png';
          } else if (v.value <= this.cloudData.yzfz.split(',')[1]) {
            v.img = '/static/images/exclamatory-mark.png';
          }
          break;
        }
        return {
          text: v.text,
          value: v.value,
          img: v.img
        };
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
     * @desc 标题点击事件
     */
    onTitleClick() {
      this.$refs['digital-economy'].openDetailHandle(this.titleData, false, [
        'zt_hy',
        'bz'
      ]);
    },
    /**
     * @desc 标题点击事件
     */
    onManufacturing() {
      console.log(this.addManufacturingDataRate);
      this.$refs['digital-economy'].openDetailHandle(
        [this.addManufacturingData, this.addManufacturingDataRate],
        true,
        ['zb_hy', 'cjcs'],
        ['数字经济核心制造业增加值', '数字经济核心制造业增加值增速']
      );
    },
    /**
     * @desc 核心制造业增加值区县情况 - 标题点击事件
     */
    onCounty() {
      this.$refs['digital-economy'].openDetailHandle(this.countyData, true, [
        'zb_hy'
      ]);
    },
    /**
     * @desc 核心制造业增加值排名 - 标题点击事件
     */
    onCoreMake() {
      this.$refs['digital-economy'].openDetailHandle(this.coreMakeData, true, [
        'zb_hy'
      ]);
    },

    /**
     * @desc 数字经济发展综合评价排名- 标题点击事件
     */
    onNumberMoney() {
      this.$refs['digital-economy'].openDetailHandle(
        this.numberMoneyData,
        true,
        ['zb_hy']
      );
    },
    /**
     * @desc 点击中间指标
     */
    onMiddleTitleClick(item, index) {
      let data;
      switch (index) {
      case 0:
        data = { ...this.addIndustryData };
        break;
      case 1:
        data = { ...this.addManufacturingData };
        break;
      case 2:
        data = { ...this.developmentData };
        break;
      case 3:
        // this.cloudData.cjfz = '300家';
        // this.cloudData.yzfz = '400家';
        this.cloudData.cjcs =
            '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
        data = { ...this.cloudData };
        break;
      }
      this.$refs['digital-economy'].openDetailHandle(data, true, [
        'zb_hy',
        'cjcs'
      ]);
    },
    /**
     * @desc 点击数字经济发展综合评价情
     */
    onDevelopmentEvaluate() {
      this.$refs['digital-economy'].openDetailHandle(
        this.developmentData,
        true,
        ['zb_hy', 'cjcs']
      );
    },
    /**
     * 企业上云完成情况
     */
    onCloud() {
      // this.cloudData.cjfz = '/';
      // this.cloudData.yzfz = '/';
      this.cloudData.cjcs = '/';
      this.$refs['digital-economy'].openDetailHandle(this.cloudData, true, [
        'zb_hy'
      ]);
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
      this.$refs['digital-economy'].openDetailHandle(
        [this.addIndustryData, this.addIndustryDataRate],
        true,
        ['zb_hy', 'cjcs'],
        ['数字经济核心产业增加值', '数字经济核心产业增加值增速']
      );
    },
    // 数据初始化
    dataInit() {
      // this.getManufacturingData();
      // this.getDataList();
      // this.getEnterpriseUpDayData();
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
