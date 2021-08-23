<template>
  <div :class="[$style.box]">
    <div class="ls-map-shade_box"></div>
    <div class="ls-map-shade-right_box"></div>
    <div :class="$style.mapContainer"
         id="helperMapContainer"></div>
    <div :class="$style.mapDataFilterWrapper"
         v-show="!isDetail">
      <base-filter :list="filterList"
                   @change="dataChange"></base-filter>
    </div>
    <div :class="$style.north">
      <div :class="$style.title">
        <!--这里的标题应该用title-->
        <span @click="onTitleClick">{{ title }}</span>
      </div>
      <div :class="$style.back"
           @click="onBack">
        <img src="/static/images/top/back.png"
             alt=""
             title="返回" />
        <span>返回</span>
      </div>
    </div>
    <div :class="$style.west"
         ref="west-ref">
      <slot name="west"></slot>
    </div>
    <div :class="$style.east"
         ref="east-ref">
      <slot name="east"></slot>
    </div>
    <template v-if="!isDetail">
      <div :class="$style.middle"
           v-if="renderMiddle">
        <div>
          <span>{{ middleTitle }}</span>
        </div>
        <div>
          <div v-for="(item, index) of middleList"
               :key="index"
               @click="middleTitleClick(item, index)"
               :style="{
              cursor: pointer(item, index)
            }">
            <span>{{ item.text }}</span>
            <span>
              {{ item.value }}
              <img :src="item.img"
                   alt=""
                   style="width: 20px;height: 20px;"
                   v-if="item.img">
            </span>
          </div>
        </div>
      </div>
    </template>
    <div :class="$style.detailBox"
         v-if="isDetail">
      <div :class="$style.title"
           v-if="showDetailTitle.length > 0">
        <img src="/static/images/arrow-right.png"
             alt="" />
        {{ showDetailTitle }}
        <img src="/static/images/arrow-left.png"
             alt="" />
      </div>
      <div :class="$style.tabs">
        <el-tabs v-model="activeName">
          <template v-for="(item, index) in tabs">
            <el-tab-pane :label="item"
                         :name="index.toString()"
                         :key="index"></el-tab-pane>
          </template>
        </el-tabs>
      </div>
      <div :class="$style.form">
        <template v-for="(item, index) of showDetailData">
          <template v-if="item.length === 2">
            <div :key="item[0].id">
              <div :class="$style.left">
                <span>{{ item[0].text }}：</span>
                <span>{{ item[0].value }}</span>
              </div>
              <div :class="$style.left">
                <span>{{ item[1].text
                  }}<span v-if="item[1].text.length > 0">：</span></span>
                <span>{{ item[1].value }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div :key="index">
              <div :class="$style.last">
                <span>{{ item[0].text }}</span>
                <div v-for="(sub, index) of item[0].value"
                     :key="index">
                  <p v-if="sub.length > 0">
                    <span v-if="item[0].value.length > 1">{{ index }}、</span>
                    <span v-html="sub"></span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import {
  mapInit,
  getBounds,
  renderPolyline,
  createMarkers
} from '@plugins/amap';
import myMixin from './mixin/server.js';
import _hasIn from 'lodash/hasIn';

export default {
  name: 'BasicLayout',
  mixins: [myMixin],
  props: {
    // 标题
    title: {
      type: String,
      default: '工业经济运行'
    },
    // 组件区域的标题
    middleTitle: {
      type: String,
      default: '数据指标'
    },
    middleList: {
      type: Array,
      default: () => [
        { text: '整治企业数(家)', value: '345678' },
        { text: '新增工业供地面积(亩)', value: '345678' },
        { text: '新出让工业用地面积(亩)', value: '345678' },
        { text: '工业投资增幅(%)', value: '345678' }
      ]
    },
    // 是否渲染
    renderMiddle: {
      type: Boolean,
      default: true
    },
    // 是否改变地图透明度
    changeMapOpacity: {
      type: Boolean,
      default: true
    },
    filterList: {
      type: Array,
      default: () => [
        { name: '“低散乱”企业整治', type: 'renovate' },
        { name: '工业投资增幅', type: 'amplification' },
        { name: '新增工业供地面积', type: 'area' },
        { name: '市级企业技术中心家数', type: 'science' }
      ]
    },
    // 地图点位数据
    points: {
      type: Array,
      default: () => [
        {
          name: '有数数字科技有限公司',
          value: 50,
          lng: '120.093997',
          lat: '28.528893',
          type: 'renovate'
        },
        {
          name: '有数数字科技有限公司',
          value: 80,
          lng: '120.086523',
          lat: '28.591837',
          type: 'renovate'
        },
        {
          name: '有数数字科技有限公司',
          value: 80,
          lng: '120.379155',
          lat: '28.25205',
          type: 'amplification'
        },
        {
          name: '有数数字科技有限公司',
          value: 80,
          lng: '120.00316',
          lat: '28.378232',
          type: 'amplification'
        },
        {
          name: '有数数字科技有限公司',
          value: 80,
          lng: '120.108945',
          lat: '28.525592',
          type: 'area'
        },
        {
          name: '有数数字科技有限公司',
          value: 80,
          lng: '120.320514',
          lat: '28.570014',
          type: 'area'
        },
        {
          name: '有数数字科技有限公司',
          value: 80,
          lng: '120.134241',
          lat: '28.674773',
          type: 'science'
        },
        {
          name: '有数数字科技有限公司',
          value: 80,
          lng: '120.294067',
          lat: '28.676801',
          type: 'science'
        }
      ]
    },
    areaList: {
      type: Array,
      default: () => [
        { name: '莲都区', value: 2000, type: '' },
        { name: '青田县', value: 30, type: '' },
        { name: '缙云县', value: 800, type: '' },
        { name: '遂昌县', value: 700, type: '' },
        { name: '松阳县', value: 300, type: '' },
        { name: '云和县', value: 400, type: '' },
        { name: '庆元县', value: 100, type: '' },
        { name: '景宁畲族自治县', value: 50, type: '' },
        { name: '龙泉市', value: 3000, type: '' },
        { name: '开发区', value: '', type: '' }
      ]
    },
    // 详情数据
    detailTitle: {
      type: String,
      default: ''
    },
    // 指标数据
    detailData: {
      type: Array,
      default: () => { }
    },
    // 是否显示名称
    pointShowName: {
      type: Boolean,
      default: false
    },
    // 需要点击的选项卡的下标
    middleTitleIndex: {
      type: Array
    }
  },
  watch: {
    isDetail(val, oldVal) {
      if (val) {
        // 展示指标
        if (!_isNil(this.$refs['west-ref'])) {
          this.$refs['west-ref'].style.zIndex = -10;
          this.$refs['east-ref'].style.zIndex = -10;
          this.isShow = true;
        }
      } else {
        // 隐藏指标
        if (!_isNil(this.$refs['west-ref'])) {
          this.$refs['west-ref'].style.zIndex = 1111;
          this.$refs['east-ref'].style.zIndex = 1111;
          this.isShow = false;
        }
      }
    }
  },
  data() {
    this.timer = null;
    return {
      day: '',
      minute: '',
      map: null,
      districtExplorer: null,
      renderList: [], // 渲染adcode对应的数组
      polyLine: null, // 边界线对象
      districtPolygon: null, // 区县polygon对象
      adcode: '331100',
      allmarkers: [],
      infoWindow: null,
      isDetail: false, // 是否详情页面
      isShow: true,
      mapType: '' // 当前展示的是那个类型的map 为空时展示全部
    };
  },
  created() {
    if (this.tabs.length) {
      this.activeName = '0';
    }
    this.$nextTick(() => {
      if (_has(this.$slots, 'year')) {
        this.isShow = false;
      }
      if (_isNil(this.timer)) {
        this.timeHandle();
        this.timer = setInterval(() => {
          this.timeHandle();
        }, 10 * 1000);
      }
    });
  },
  mounted() {
    // console.log(this.title)
    this.map = mapInit('helperMapContainer');
    this.map.on('complete', () => {
      this.renderList = [this.adcode];
      // this.countryRender();
      this.fnText(); // 开发区
      if (this.pointShowName) {
        this.countryRender();
      }
      this.initBounds(this.adcode);
      this.addPionts(this.points);
      this.dataChange(this.filterList[0]);
    });
    this.$once('hook:beforeDestroy', () => {
      this.map.destroy();
      setTimeout(() => {
        this.map = null;
      }, 0);
    });
  },
  beforeDestroy() {
    if (!_isNil(this.timer)) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  methods: {
    /**
     * @desc 开发区
     * */
    fnText() {
      const txtArr = new AMap.Text({
        text: '开发区',
        position: [119.85027778, 28.37016667]
      }); // 开发区单独处理

      if (this.map) {
        this.map.add(txtArr);
      }
    },

    /**
     * @description: 地图画边框
     * @param {*} code 行政区域编码
     */
    initBounds(code) {
      getBounds(code).then((res) => {
        const arr = res.districtList[0].boundaries.filter((v) => {
          return v.length > 1000;
        });
        this.polyLine = renderPolyline({
          map: this.map,
          path: arr[0],
          strokeColor: '#fff',
          strokeWeight: 1,
          strokeOpacity: 2
        });
      });
    },

    /**
     * @description: 获取地图填充颜色的透明度
     * @param {String } name 区域名称
     */
    getMapFillOpacity(name) {
      let opacity;
      // const areaList = this.areaList.filter(item => this.mapType === item.type);
      // const maxValue = Math.max.apply(
      //   Math,
      //   areaList.map(function(o) {
      //     return o.value;
      //   })
      // );
      this.areaList.forEach((item) => {
        if (item.name === name && this.mapType === item.type) {
          opacity = 0.3;
          // switch (true) {
          // case item.value > maxValue:
          //   opacity = 0.9;
          //   break;
          // case item.value > maxValue - maxValue / 5 && item.value <= maxValue:
          //   opacity = 0.8;
          //   break;
          // case item.value > maxValue - 2 * (maxValue / 5) &&
          //   item.value <= maxValue - maxValue / 5:
          //   opacity = 0.7;
          //   break;
          // case item.value > maxValue - 3 * (maxValue / 5) &&
          //   item.value <= maxValue - 2 * (maxValue / 5):
          //   opacity = 0.6;
          //   break;
          //   mo;
          // case item.value > maxValue - 4 * (maxValue / 5) &&
          //   item.value <= maxValue - 3 * (maxValue / 5):
          //   opacity = 0.4;
          //   break;
          // case item.value:
          //   opacity = 0.8;
          //   break;
          // default:
          //   opacity = 0.3;
          //   break;
          // }
        }
      });
      return opacity;
    },
    /**
     * @description: 渲染地图区域
     */
    countryRender() {
      const that = this;
      if (this.map) {
        this.map.clearMap();
      }
      this.fnText(); // 开发区单独处理
      this.initDistrictExplorer().then((districtExplorer) => {
        // console.log(districtExplorer);
        that.districtPolygon && that.districtPolygon.setMap(null);
        function renderAreaNode(areaNode) {
          districtExplorer.renderSubFeatures(areaNode, function (feature, i) {
            // console.log(feature);
            if (feature.properties.name === '景宁畲族自治县') {
              feature.properties.name = '景宁县';
            }
            that.mapCityText = new AMap.Text({
              text: feature.properties.name,
              position: feature.properties.center
            });
            that.map.add(that.mapCityText);
            return {
              cursor: 'default',
              bubble: true,
              strokeColor: '#fff', // 线颜色
              strokeOpacity: 1, // 线透明度
              strokeWeight: 2, // 线宽
              fillColor: that.changeMapOpacity
                ? 'rgba(32, 219, 238)'
                : 'rgba(32, 219, 238)', // 填充色
              fillOpacity: that.changeMapOpacity
                ? that.getMapFillOpacity(feature.properties.name)
                : 0.7 // 填充透明度
            };
          });
        }
        const adcodes = that.renderList;
        districtExplorer.loadMultiAreaNodes(
          adcodes,
          function (error, areaNodes) {
            console.log(error);
            districtExplorer.setAreaNodesForLocating(areaNodes);
            // 清除已有的绘制内容
            // districtExplorer.clearFeaturePolygons();
            for (var i = 0, len = areaNodes.length; i < len; i++) {
              renderAreaNode(areaNodes[i]);
            }
            if (adcodes[0] !== that.adcode) {
              that.map.setFitView(districtExplorer.getAllFeaturePolygons());
            }
          }
        );
      });
    },

    /**
     * @description: 初始化地图区域
     */
    initDistrictExplorer() {
      const that = this;
      return new Promise((resolve, reject) => {
        if (that.districtExplorer) {
          resolve(that.districtExplorer);
        } else {
          AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
            that.districtExplorer = new DistrictExplorer({
              eventSupport: true,
              map: that.map
            });
            const districtExplorer = that.districtExplorer;
            function toggleHoverFeature(feature, isHover, position) {
              if (!feature) return;
              var props = feature.properties;
              // 更新相关多边形的样式
              var polys = districtExplorer.findFeaturePolygonsByAdcode(
                props.adcode
              );
              let fillOpacity;

              if (that.changeMapOpacity) {
                fillOpacity = isHover
                  ? 1
                  : that.getMapFillOpacity(feature.properties.name);
              } else {
                fillOpacity = isHover ? 1 : 0.7;
              }
              for (var i = 0, len = polys.length; i < len; i++) {
                polys[i].setOptions({
                  fillOpacity: fillOpacity
                });
              }
            }
            // 监听feature的hover事件
            districtExplorer.on(
              'featureMouseout featureMouseover',
              (e, feature) => {
                toggleHoverFeature(
                  feature,
                  e.type === 'featureMouseover',
                  e.originalEvent ? e.originalEvent.lnglat : null
                );
              }
            );
            resolve(districtExplorer);
          });
        }
      });
    },

    /**
     * @description: 添加地图点位
     * @param {Array} list 点位数据
     */
    addPionts(list) {
      this.allmarkers = createMarkers({
        map: this.map,
        list,
        showLabel: !this.pointShowName
      });
    },

    /**
     * @description: 地图点位数据筛选
     * @param {String} type 点位数据类型
     */
    dataChange({ type }) {
      this.mapType = type;
      if (_has(window, 'infoWindow') && _hasIn(this.map, 'clearInfoWindow')) {
        window.infoWindow && this.map.clearInfoWindow(); // 关闭地图信息框
      }
      if (!this.pointShowName) {
        this.countryRender();
        this.addPionts(this.points);
      }

      this.allmarkers.forEach((item) => {
        if (item && item.getExtData() && item.getExtData().type === type) {
          item.show();
        } else {
          item.hide();
        }
      });
      this.$emit('getDataType', type);
    },
    timeHandle() {
      this.minute = moment().format('HH:mm');
      this.day = moment().format('YYYY-MM-DD');
    },
    /**
     * @desc 返回
     */
    onBack(event) {
      if (this.isDetail) {
        // 当前是详情页
        this.isDetail = false;
        this.activeName = '0';
        this.params = {};
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="less">
.ls-map-shade_box {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  box-shadow: 200px 80px 200px 100px #283b49 inset;
  z-index: 999;
}
.ls-map-shade-right_box {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  box-shadow: -200px 0px 200px 100px #283b49 inset;
  z-index: 1000;
}
</style>

<style lang="less" module>
@import url('../common-view/fontStyle/font.css');
@north_height: 100px;
.box {
  .map-container {
    width: 100%;
    height: 100%;
    // border: 1px solid red;
    // box-sizing: border-box;
    position: absolute;
    z-index: 10;
  }
  .map-data-filter-wrapper {
    height: 40px;
    width: 770px;
    left: 50%;
    top: 108px;
    margin-left: -385px;
    position: absolute;
    left: 50%;
    z-index: 1118;
  }
  .full-y;
  // box-shadow: inset 0px 110px 60px -1px rgba(28, 57, 73, 0.4);
  .relative;
  .north {
    height: @north_height;
    // background-color: #333;
    position: absolute;
    z-index: 1111;
    background-image: url(/static/images/top/background.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    .title {
      text-align: center;
      font-size: 36px;
      color: rgba(255, 255, 255, 100);
      letter-spacing: 13px;
      padding-top: 21px;
      box-sizing: border-box;
      font-family: 'pmzd';
      text-align: center;
      span {
        cursor: pointer;
        display: inline-block;
      }
    }
    .back {
      width: 105px;
      height: 40px;
      position: absolute;
      top: 30px;
      left: 36px;
      line-height: 50px;
      text-align: right;
      color: rgba(255, 255, 255, 100);
      font-size: 28px;
      font-family: 'pmzd';
      cursor: pointer;
      img {
        width: 50px;
        height: 50px;
        position: absolute;
        left: 0px;
        top: 3px;
      }
    }
    .time {
      // width: 240px;
      height: 32px;
      // outline: 1px solid red;
      position: absolute;
      top: 35px;
      right: 36px;
      font-family: 'pmzd';
      color: rgba(255, 255, 255, 100);
      font-size: 28px;
      > span {
        display: inline-block;
        margin-right: 20px;
      }
    }
  }
  .west {
    width: 496px;
    box-sizing: border-box;
    position: absolute;
    left: 13px;
    top: 90px;
    z-index: 1111;
    padding-bottom: 10px;
  }
  .east {
    width: 496px;
    box-sizing: border-box;
    position: absolute;
    right: 13px;
    top: 90px;
    z-index: 1111;
    padding-bottom: 10px;
  }
  .middle {
    width: 770px;
    height: 145px;
    position: absolute;
    left: 50%;
    top: 170px;
    z-index: 1111;
    margin-left: -385px;
    > div:first-child {
      height: 35px;
      line-height: 35px;
      color: rgba(255, 255, 255, 100);
      font-size: 28px;
      font-family: 'pmzd';
    }
    > div:nth-child(2) {
      margin-top: 18px;
      height: 90px;
      // background-color: bisque;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      // cursor: pointer;
      > div {
        color: rgba(32, 219, 238, 100);
        font-size: 16px;
        display: flex;
        flex-direction: column;
        height: 100%;
        // outline: 1px solid red;
        span {
          display: block;
        }
        > span:nth-child(2) {
          margin-top: 10px;
          color: rgba(255, 255, 255, 100);
          font-size: 32px;
        }
      }
    }
  }
  .detail-box {
    width: 1200px;
    height: 763px;
    background-color: bisque;
    position: absolute;
    top: 155px;
    left: 360px;
    z-index: 1115;
    background-color: rgba(10, 33, 42, 0.8);
    box-shadow: inset 0px 0px 30px 0px rgba(33, 235, 255, 0.41);
    border: 1px solid rgba(32, 219, 238, 0.5);
    font-size: 16px;
    overflow: auto;
    .title {
      height: 50px;
      text-align: center;
      line-height: 50px;
      color: rgba(255, 255, 255, 100);
      font-size: 28px;
      font-family: 'pmzd';
      img {
        width: 29px;
        height: 10px;
        position: relative;
        top: -3px;
      }
    }

    .tabs {
      :global(.el-tabs) {
        padding: 0px 50px;
      }
      :global(.el-tabs__nav-wrap:after) {
        background-color: initial;
      }
      :global(.el-tabs__active-bar) {
        background-color: #fff;
        margin: 0 auto;
        height: 4px;
        width: 5rem;
      }
      :global(.el-tabs__item) {
        color: rgba(132, 213, 255, 0.68);
        font-size: 18px;
      }
      :global(.is-active) {
        color: #fff;
        font-size: 18px;
      }
    }

    .form {
      padding: 0 100px;
      box-sizing: border-box;
      margin-top: 35px;
      overflow: auto;
      > div {
        display: flex;
        flex-direction: row;
        color: rgba(255, 255, 255, 100);
        font-size: 18px;
        margin-bottom: 30px;
        // background-color: aqua;
        padding: 10px 0;
        .left {
          width: 700px;
          display: inline-block;
          box-sizing: border-box;
        }
        .last {
          > span:first-child {
            display: block;
            margin-bottom: 10px;
          }
          box-sizing: border-box;
          // outline: 1px solid red;
        }
      }
    }
  }
}
</style>
