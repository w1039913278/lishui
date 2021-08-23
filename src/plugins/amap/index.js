// marker-图标markerActive
const icon = new AMap.Icon({
  image: require('@static/images/map/markerActive.svg'),
  size: new AMap.Size(36, 50),
  imagesSize: new AMap.Size(18, 25),
  imageOffset: new AMap.Pixel(-2, 0)
});
// marker-图标-选中
const activeIcon = new AMap.Icon({
  image: require('@static/images/map/marker.svg'),
  size: new AMap.Size(36, 50),
  imagesSize: new AMap.Size(18, 25),
  imageOffset: new AMap.Pixel(-2, 0)
});
/**
 * @desc 初始化高德地图
 */
export const mapInit = (id = 'mapContainer', zoom = 9, y = 28.45) => {
  return new AMap.Map(id, {
    // mapStyle: 'amap://styles/140c5762696519e9d4c23cbcc1d74d60',
    // mapStyle: 'amap://styles/whitesmoke',
    zoomEnable: false,
    dragEnable: false, // 禁止拖动和缩放的方法
    zoom: zoom,
    pitch: 10, // 地图俯仰角度，有效范围 0 度- 83 度
    viewMode: '3D', // 地图模式
    center: [119.603265, y],
    layers: [new AMap.TileLayer.Satellite()]
    // showBuildingBlock: true,
    // features: ['bg', 'road', 'building']
  });
};

/**
 * @desc 地图画线
 * @param { Object } map 当前地图
 * @param { Array } path 数据
 * @param { String } strokeColor 颜色
 * @param { Number } strokeWeight  线的宽度
 * @return { Array }  返回Polyline集合
 */
export const renderPolyline = ({
  map = null,
  path = [],
  strokeColor = 'rgba(84, 247, 255, 1)',
  strokeWeight = 4,
  strokeOpacity = 0.9
}) => {
  return new AMap.Polyline({
    path,
    map,
    strokeColor,
    strokeWeight,
    strokeOpacity
  });
};

const district = new AMap.DistrictSearch({
  level: 'province',
  showbiz: false,
  extensions: 'all',
  subdistrict: 0
});

/**
 * @desc 获取行政区
 * @param { Object } code 行政编码
 * @return { Object }  返回 Promise
 */
export const getBounds = (code = '330000') => {
  return new Promise((resolve, reject) => {
    district.search(code, function (status, result) {
      if (status === 'complete') {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });
};

/**
 * @desc  创建地图Marker集合
 * @param { Object } map 当前map对象
 * @param { Array } list 要打点的数据集合
 * @param { Function } clickEvent Marker点击事件
 * @return { Array }  返回 markers 集合
 */

export const createMarkers = ({
  map = null,
  list = [],
  clickEvent = null,
  markerImg = icon,
  markerImgActive = activeIcon,
  showLabel = false
}) => {
  if (!map || !list || list.length < 1) return [];
  return list.map(item => {
    if (item && item.lng && item.lat) {
      const marker = new AMap.Marker({
        map,
        icon: markerImg,
        topWhenClick: true,
        position: new AMap.LngLat(Number(item.lng), Number(item.lat)),
        extData: item
      });
      if (showLabel && item && item.value) {
        marker.setLabel({
          offset: new AMap.Pixel(-4, 0),
          // content: `<div>${Math.floor(item.value * 100) / 100}</div>`, // 设置文本标注内容
          content: `<div>${item.value}</div>`,
          direction: 'top' // 设
        });
      }

      marker.on('mouseover', e => {
        if (!showLabel) {
          marker.setIcon(markerImgActive);
          const infoWindow = createInfoWindow(item);
          window.infoWindow = infoWindow;
          infoWindow.open(map, marker.getPosition());
        }
      });
      marker.on('mouseout', e => {
        if (!showLabel) {
          marker.setIcon(markerImg);
          map.clearInfoWindow();
        }
      });
      marker.on('click', e => {
        if (!showLabel) {
          const infoWindow = createInfoWindow(item);
          window.infoWindow = infoWindow;
          infoWindow.open(map, marker.getPosition());
          clickEvent && clickEvent(item);
        }
      });

      return marker;
    }
  });
};

/**
 * @desc  创建地图自定义弹窗
 * @param { Object } data 传入的数据
 * @return { Object }  返回 InfoWindow
 */
export const createInfoWindow = data => {
  const content = `
    <div class='custom-info-window-park-name'>${data.name}</div>
  `;
  return new AMap.InfoWindow({
    isCustom: true, // 使用自定义窗体
    content, // 传入 dom 对象，或者 html 字符串
    offset: new AMap.Pixel(-1, -40) // 窗体偏移
  });
};
