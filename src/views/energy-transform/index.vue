<template>
  <div :class="$style.main">
    <basic-layout
      :middleList="middleData"
      :filterList="filterList"
      :areaList="areaList"
      :points="points"
      @titleClick="onEnergyTitleClick"
      @middleTitleClick="onMiddleTitleClick"
      title="新旧动能转换"
      ref="energy-ref"
      :changeMapOpacity="false"
    >
      <!-- <template slot="year">
        {{ `${dataYear.data_year}${dataYear.value}` }}
      </template>-->
      <template v-slot:west>
        <div :class="$style.box">
          <div>
            <base-chart title="'低散乱'企业整治" id="leftTop" :option="leftTopOption" @titleClick="onLeftOne"></base-chart>
          </div>
          <div>
            <base-chart title="新增工业机器人情况" id="leftMid" :option="leftMidOption" @titleClick="onAddRobot"></base-chart>
          </div>
          <div>
            <base-chart title="工业用地情况" id="leftBot" :option="leftBotOption" @titleClick="onIndustrialLand" :isClickLegend="true"></base-chart>
          </div>
        </div>
      </template>
      <template v-slot:east>
        <div :class="$style.box">
          <div>
            <base-chart title="备案投资额1000万元以上制造业情况" id="rightBot" :option="rightBotOption" @titleClick="oninvestmentTop" :isClickLegend="true"></base-chart>
          </div>
          <div>
            <base-chart title="市级企业技术中心排名" :showCharts="false" @titleClick="onTechnologyCenter">
              <template slot="chart">
                <div style="height: 100%; width: 100%; padding: 0px 10px" class="border-box">
                  <div class="full-xy overflow">
                    <base-progress :list="rightTopDataList" :header="header_tc"></base-progress>
                  </div>
                </div>
              </template>
            </base-chart>
          </div>
          <div>
            <base-chart title="清洁生产审核企业排名" :showCharts="false" @titleClick="onCleanerProduction">
              <template slot="chart">
                <div style="height: 100%; width: 100%; padding: 0px 10px" class="border-box">
                  <div class="full-xy overflow">
                    <base-progress :list="rightMidDataList" :header="header_sc"></base-progress>
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
  leftBotData,
  optionData,
  addAreaMap,
  areaList,
  leftMidData,
  enterpriseRenovation,
  mapData
} from './data/index.js';
import { baseBarOption, baseBarLineOption } from '@plugins/chart';
export default {
  data() {
    this.dataYear = dataYear;
    return {
      NewaddAreaMap: [], // 新增工业供地面积地图数据
      NewenterpriseRenovation: [], // 低散乱企业整治地图数据
      Remediation: null, // 整治企业家数
      Newindustrial: null, // 新增工业机器人
      Newlyaddedarea: null, // 新增工业供地面积
      MunicipalEnterprise: null, // 市级企业供地中
      middleData: [
        { text: '整治企业数(家)', value: '', img: '' },
        { text: '新增工业机器人(台)', value: '', img: '' },
        { text: '新增工业供地面积(亩)', value: '', img: '' },
        { text: '市级企业技术中心(家)', value: '', img: '' }
      ],
      rightTopDataList: [],
      rightMidDataList: [],
      titleData: {},
      leftTopOption: {
        color: ['#3271FF', '#20DBEE', '#42E1A6', '#F3921F'],
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
          data: ['改造提升数', '整合入园数', '合理转移数', '关停淘汰数'],
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
            aname: 'gztss',
            type: 'bar',
            stack: '总量',
            barWidth: 15,
            data: [
              // 16, 0, 33, 8, 12, 27, 15, 23, 5, 3
            ]
          },
          {
            name: '整合入园数',
            aname: 'zhrys',
            type: 'bar',
            stack: '总量',
            barWidth: 15,
            data: [
              // 2, 0, 0, 38, 17, 0, 11, 2, 2, 6
            ]
          },
          {
            name: '合理转移数',
            aname: 'hlzys',
            type: 'bar',
            stack: '总量',
            barWidth: 15,
            data: [
              // 0, 3, 6, 1, 0, 1, 1, 1, 0, 1
            ]
          },
          {
            name: '关停淘汰数',
            aname: 'gttts',
            type: 'bar',
            stack: '总量',
            barWidth: 15,
            data: [
              // 3, 52, 12, 14, 1, 14, 23, 0, 3, 27
            ]
          }
        ]
      },
      leftMidOption: baseBarOption(
        leftMidData,
        { unit: ['台', '台', '台'] },
        1
      ),
      leftBotOption: baseBarOption(leftBotData, { unit: ['亩', '亩'] }, 1),
      cleanerProduction: null,
      filterList: mapData,
      areaList,
      points: [],
      rightBotOption: baseBarLineOption(
        optionData,
        { isDoubleY: true, unit: ['个', '亿元'] },
        1
      ),
      investmentTopData: [],
      loading: null,
      industrialLandData: [],
      header_tc: {
        rank: '序号',
        name: '区域',
        unit: '家',
        value: '市级企业技术中心企业家数',
        img: ''
      },
      header_sc: {
        rank: '序号',
        name: '区域',
        unit: '家',
        value: '清洁生产审核企业家数',
        img: ''
      }
    };
  },
  async created() {
    this.loading = this.$loading({
      lock: true,
      target: '加载中'
    });
    await this.getMainIndexCardData();
    await this.getZtIndexCardData();
    await this.getOneChartData();
    await this.getTwoChartData();
    await this.getThreeChartData();
    await this.getThreeCardIndexData();
    await this.getFourCardIndexData();
    await this.getFourChartData();
    await this.getFiveChartData();
    await this.getSixCardIndexData();
    await this.getMainData();
    await this.getSixChartData();
  },
  methods: {
    /**
     * @desc 清洁生产审核企业排名-指标卡片数据
     */
    async getSixCardIndexData() {
      this.$api['energy-transform/index/getSixCardIndexData']({}).then(
        (res) => {
          const obj = res.data;
          obj.name = '清洁生产审核企业家数';
          // obj.cjfz = '0';
          // obj.yzfz = '51';
          obj.cjcs =
            '触警在该指标对应区县数据的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标对应区县数据的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
          this.cleanerProduction = obj;
        }
      );
    },
    /**
     * @desc 市级企业技术中心排名-图表数据
     */
    async getSixChartData() {
      this.$api['energy-transform/index/getSixChartData']({}).then((res) => {
        const list = res.data;
        let total = 0;
        this.rightMidDataList = list.map((item) => {
          total += Number(item.value);
          return {
            value: item.value,
            name: item.area
          };
        });
        if (total > this.cleanerProduction.yzfz.split(',')[1]) {
          this.header_sc.img = '/static/images/thumbs-up.png';
        } else if (total <= Number(this.cleanerProduction.cjfz.split(',')[1])) {
          this.header_sc.img = '/static/images/exclamatory-mark.png';
        }
        this.loading.close();
      });
    },
    /**
     * @desc 市级企业技术中心排名-图表数据
     */
    async getFiveChartData() {
      this.$api['energy-transform/index/getFiveChartData']({}).then((res) => {
        const list = res.data;
        let total = 0;
        this.rightTopDataList = list.map((item) => {
          total += Number(item.value);
          return {
            value: item.value,
            name: item.area
            // total: total,
            // rank: item.rank
          };
        });
        if (total > this.MunicipalEnterprise.yzfz.split(',')[1]) {
          this.header_tc.img = '/static/images/thumbs-up.png';
        } else if (total <= Number(this.MunicipalEnterprise.cjfz.split(',')[1])) {
          this.header_tc.img = '/static/images/exclamatory-mark.png';
        }
      });
    },
    /**
     * @desc 备案投资额1000万-图表数据
     */
    async getFourChartData() {
      this.$api['energy-transform/index/getFourChartData']({}).then((res) => {
        const list = res.data;
        const optionData = [
          {
            name: '制造业项目数',
            key: 'zzyxms',
            data: []
          },
          {
            name: '制造业项目投资额',
            key: 'zzyxmtze',
            data: []
          }
        ];
        const rightBottomData = optionData.map((item) => {
          item.data = list.map((value) => {
            return {
              value: value[item.key],
              name: value.area
            };
          });
          return item;
        });
        this.rightBotOption = baseBarLineOption(
          rightBottomData,
          { isDoubleY: true, unit: ['个', '亿元'] },
          1
        );
      });
    },
    /**
     * @desc 备案投资额1000万-指标卡片数据
     */
    async getFourCardIndexData() {
      this.$api['energy-transform/index/getFourCardIndexData']({}).then(
        (res) => {
          const obj = res.data;
          obj.zzyxms.name = '当年新增备案投资额1000万元以上制造业项目数';
          obj.zzyxms.cjcs = '/';
          obj.zzyxmtze.name = '当年新增备案投资额1000万元以上制造业项目投资额';
          obj.zzyxmtze.cjcs = '/';
          this.investmentTopData.push(obj.zzyxms);
          this.investmentTopData.push(obj.zzyxmtze);
        }
      );
    },
    /**
     * @desc 工业用地情况-指标卡片数据
     */
    async getThreeCardIndexData() {
      this.$api['energy-transform/index/getThreeCardIndexData']({}).then(
        (res) => {
          const obj = res.data;
          obj.gymj_bq.name = '新增工业供地面积';
          obj.gymj_bq.cjcs = '/';
          obj.rgymj_bq.name = '新出让工业用地面积';
          obj.rgymj_bq.cjcs = '/';
          this.industrialLandData.push(obj.gymj_bq);
          this.industrialLandData.push(obj.rgymj_bq);
        }
      );
    },
    /**
     * @desc 工业用地情况-图表数据
     */
    async getThreeChartData() {
      this.$api['energy-transform/index/getThreeChartData']({}).then((res) => {
        const list = res.data;
        const leftBotData = {
          name: '工业用地情况',
          xAxis: [],
          value: []
        };
        list.forEach((item) => {
          leftBotData.xAxis.push(item.area);
          Object.keys(item).forEach((text, index) => {
            if (text !== 'area') {
              let titile = '';
              text === 'gymj'
                ? (titile = '新增工业供地面积')
                : (titile = '新出让工业用地面积');
              if (leftBotData.value.length === 0) {
                const obj = {
                  name: titile,
                  key: text,
                  data: []
                };
                obj.data.push(item[text]);
                leftBotData.value.push(obj);
              } else if (
                leftBotData.value.some((item) => {
                  return item.key === text;
                })
              ) {
                leftBotData.value.forEach((ele) => {
                  if (ele.key === text) {
                    ele.data.push(item[text]);
                  }
                });
              } else {
                const obj = {
                  name: titile,
                  key: text,
                  data: []
                };
                obj.data.push(item[text]);
                leftBotData.value.push(obj);
              }
            }
          });
        });
        this.leftBotOption = baseBarOption(
          leftBotData,
          { unit: ['亩', '亩'] },
          1
        );
      });
    },
    /**
     * @desc 新增工业机器人情况-图表数据
     */
    async getTwoChartData() {
      this.$api['energy-transform/index/getTwoChartData']({}).then((res) => {
        const list = res.data;
        const leftMidData = {
          name: '新增工业机器人情况',
          xAxis: [],
          value: []
        };
        list.forEach((item) => {
          leftMidData.xAxis.push(item.area);
          Object.keys(item).forEach((text, index) => {
            if (text !== 'area') {
              // !item.text ? item.text = 0 : item.text;
              if (leftMidData.value.length === 0) {
                const obj = {
                  name: text,
                  data: []
                };
                obj.data.push(item[text]);
                leftMidData.value.push(obj);
              } else if (
                leftMidData.value.some((item) => {
                  return item.name === text;
                })
              ) {
                leftMidData.value.forEach((ele) => {
                  if (ele.name === text) {
                    ele.data.push(item[text]);
                  }
                });
              } else {
                const obj = {
                  name: text,
                  data: []
                };
                obj.data.push(item[text]);
                leftMidData.value.push(obj);
              }
            }
          });
        });
        this.$nextTick(() => {
          this.leftMidOption = baseBarOption(
            leftMidData,
            {
              unit: ['台', '台', '台']
            },
            1
          );
        });
      });
    },
    /**
     * @desc 低散乱企业政治-图表数据
     */
    async getOneChartData() {
      this.$api['energy-transform/index/getOneChartData']({}).then((res) => {
        const list = res.data;
        this.leftTopOption.xAxis.data = [];
        list.forEach((item) => {
          this.leftTopOption.xAxis.data.push(item.area);
          this.leftTopOption.series.forEach((text) => {
            text.data.push(item[text.aname]);
          });
        });
      });
    },
    /**
     * @desc 专题指标卡片数据
     */
    async getMainIndexCardData() {
      for (let number = 1; number < 5; number++) {
        if (number === 1) {
          const params = { type: number };
          this.$api['energy-transform/index/getMainIndexCardData']({
            params
          }).then((res) => {
            this.Remediation = res.data;
            this.Remediation.name = '“低散乱”企业（作坊）整治数';
          });
        }
        if (number === 2) {
          const params = { type: number };
          this.$api['energy-transform/index/getMainIndexCardData']({
            params
          }).then((res) => {
            this.Newindustrial = res.data;
            this.Newindustrial.name = '新增工业机器人情况';
          });
        }
        if (number === 3) {
          const params = { type: number };
          this.$api['energy-transform/index/getMainIndexCardData']({
            params
          }).then((res) => {
            this.Newlyaddedarea = res.data;
            this.Newlyaddedarea.name = '新增工业供地面积';
            this.Newlyaddedarea.cjcs =
            '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
          });
        }
        if (number === 4) {
          const params = { type: number };
          this.$api['energy-transform/index/getMainIndexCardData']({
            params
          }).then((res) => {
            this.MunicipalEnterprise = res.data;
            this.MunicipalEnterprise.name = '市级企业技术中心企业家数';
            this.MunicipalEnterprise.cjcs =
            '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
          });
        }
      }
    },
    /**
     * @desc 专题指标卡片数据
     */
    async getZtIndexCardData() {
      this.$api['energy-transform/index/getZtIndexCardData']({}).then((res) => {
        const data = res.data;
        this.titleData = { ...data };
        this.titleData.name = '新旧动能转换';
        this.titleData.xtdw =
          '市发改委、市经信局、市科技局、市财政局、市人力社保局、市自然资源局、市生态环境局、市商务局、市应急管理局、市税务局、市市场监管局、市金融办、市统计局';
      });
    },
    /**
     * @desc 头部内容逻辑添加图片
     */
    getImg(list) {
      this.middleData = list.map((v) => {
        switch (v.text) {
        case '整治企业数(家)':
          if (v.value > Number(this.Remediation.yzfz.split(',')[1])) {
            v.img = '/static/images/thumbs-up.png';
          } else if (v.value <= Number(this.Remediation.cjfz.split(',')[1])) {
            v.img = '/static/images/exclamatory-mark.png';
          }
          break;
        case '新增工业机器人(台)':
          if (v.value > Number(this.Newindustrial.yzfz.split(',')[1])) {
            v.img = '/static/images/thumbs-up.png';
          } else if (v.value <= Number(this.Newindustrial.cjfz.split(',')[1])) {
            v.img = '/static/images/exclamatory-mark.png';
          }
          break;
        case '新增工业供地面积(亩)':
          if (v.value > Number(this.Newlyaddedarea.yzfz.split(',')[1])) {
            v.img = '/static/images/thumbs-up.png';
          } else if (v.value <= Number(this.Newlyaddedarea.cjfz.split(',')[1])) {
            v.img = '/static/images/exclamatory-mark.png';
          }
          break;
        case '市级企业技术中心(家)':
          if (v.value > Number(this.MunicipalEnterprise.yzfz.split(',')[1])) {
            v.img = '/static/images/thumbs-up.png';
          } else if (v.value <= Number(this.MunicipalEnterprise.cjfz.split(',')[1])) {
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
     * @desc 数据指标及地图数据
     */
    async getMainData() {
      this.$api['energy-transform/index/getMainData']({}).then((res) => {
        const data = res.data;
        const list = [
          { text: '整治企业数(家)', value: data.entSum, img: '' },
          { text: '新增工业机器人(台)', value: data.robotSum, img: '' },
          { text: '新增工业供地面积', value: data.landAreaSum, img: '' },
          {
            text: '市级企业技术中心(家)',
            value: data.municipalEntSum,
            img: ''
          }
        ];
        this.getImg(list);
        this.addmap(
          data.gdmj,
          addAreaMap,
          this.NewaddAreaMap,
          'Area_of_new_industrial_land'
        );
        this.addmap(
          data.qyzz,
          enterpriseRenovation,
          this.NewenterpriseRenovation,
          'Corporate_governance'
        );
        this.points = [...this.NewenterpriseRenovation, ...this.NewaddAreaMap];
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
     * @desc 标题点击事件
     */
    onEnergyTitleClick() {
      this.$refs['energy-ref'].openDetailHandle(this.titleData, false, [
        'zt_hy',
        'bz'
      ]);
    },
    /**
     * @desc 点击中间指标
     */
    async onMiddleTitleClick(item, index) {
      let data;
      switch (index) {
      case 0:
        // this.Remediation.yzfz = '310';
        // this.Remediation.cjfz = '0';
        this.Remediation.cjcs =
            '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
        data = { ...this.Remediation };
        break;
      case 1:
        // this.Newindustrial.yzfz = '415';
        // this.Newindustrial.cjfz = '0';
        this.Newindustrial.cjcs =
            '触警在该指标的右侧出现<img src="/static/images/exclamatory-mark.png" style="width:15px;height:15px;"></img>图标。触发优质时在该指标的右侧出现<img src="/static/images/thumbs-up.png" style="width:15px;height:15px;"></img>图标。';
        data = { ...this.Newindustrial };
        break;
      case 2:
        data = { ...this.Newlyaddedarea };
        break;
      case 3:
        data = { ...this.MunicipalEnterprise };
        break;
      }
      this.$refs['energy-ref'].openDetailHandle(data, true, ['zb_hy', 'cjcs']);
    },
    /*
     * @desc 点击左侧第一个图例事件
     */
    onLeftOne(number) {
      const newRemediation = { ...this.Remediation };
      newRemediation.yzfz = '/';
      newRemediation.cjfz = '/';
      newRemediation.cjcs = '/';
      this.$refs['energy-ref'].openDetailHandle(newRemediation, true, [
        'zb_hy'
      ]);
    },
    /*
     * @desc 新增机器人事件
     */
    onAddRobot() {
      const Newindustrial1 = { ...this.Newindustrial };
      Newindustrial1.yzfz = '/';
      Newindustrial1.cjfz = '/';
      Newindustrial1.cjcs = '/';
      this.$refs['energy-ref'].openDetailHandle(Newindustrial1, true, [
        'zb_hy'
      ]);
    },
    /*
     * @desc 点击工业用地图例事件
     */
    onIndustrialLand() {
      this.$refs['energy-ref'].openDetailHandle(
        this.industrialLandData,
        true,
        ['zb_hy'],
        ['新增工业供地面积', '新出让工业用地面积']
      );
    },
    /*
     * @desc 点击市级企业技术中心排名
     */
    onTechnologyCenter() {
      this.$refs['energy-ref'].openDetailHandle(
        this.MunicipalEnterprise,
        true,
        ['zb_hy', 'cjcs']
      );
    },
    /*
     * @desc 点击清洁生产审核企业排名
     */
    onCleanerProduction() {
      this.$refs['energy-ref'].openDetailHandle(this.cleanerProduction, true, [
        'zb_hy',
        'cjcs'
      ]);
    },
    /*
     * @desc 备案投资额1000万元以上制造业情况
     */
    oninvestmentTop() {
      this.$refs['energy-ref'].openDetailHandle(
        this.investmentTopData,
        true,
        ['zb_hy'],
        ['制造业项目数', '制造业项目投资额']
      );
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
