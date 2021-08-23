/**
 * @desc 菜单 mock
 */
import Mock from 'mockjs2';
import { builder } from '../util';

const getMenu = (options) => {
  const aMenuList = [
    // models: [
    {
      id: 1,
      menuCode: 'data-center',
      menuName: '数据中心',
      menuUrl: '/data-center',
      iconUrl: 'el-icon-eleme',
      remark: '11月6日11时19分，我国在太原卫星发射中心用长征六号运载火箭，成功将NewSat9-18卫星送入预定轨道，发射获得圆满成功。',
      // hrefType: 'out' // out 外部打开（会以新窗口的形式打开），in 内部打开（普通路由形式）
      children: [
        {
          id: 7,
          menuCode: 'center-enterprise',
          menuName: '入驻企业',
          menuUrl: 'center-enterprise',
          iconUrl: 'svg-center-enterprise',
          buttons: [{ name: '上传', code: 'upload', status: 1 }],
          remark: 'NewSat9-18卫星是阿根廷Satellogic公司研制的10颗遥感小卫星'
        },
        {
          id: 8,
          menuCode: 'center-info',
          menuName: '园区列表',
          menuUrl: 'center-info',
          iconUrl: 'svg-enter-review',
          remark: ''
        },
        {
          id: 8,
          menuCode: 'center-label',
          menuName: '园区标签',
          menuUrl: 'center-label',
          iconUrl: 'svg-center-info',
          remark: ''
        }
      ]
    },
    {
      id: 16,
      menuCode: 'garden-enter',
      menuName: '园区认定',
      menuUrl: '/garden-enter',
      iconUrl: 'el-icon-notebook-2',
      remark: '八一03星（全称“中国青少年科普卫星八一03星‘太原号’”）由太原市教育局联合中国航天科技国际交流中心发起',
      children: [
        {
          id: 17,
          menuCode: 'enter-quit',
          menuName: '申请退园',
          menuUrl: 'enter-quit',
          iconUrl: 'svg-enter-quit',
          remark: ''
        },
        {
          id: 37,
          menuCode: 'enter-review',
          menuName: '认定审核',
          menuUrl: 'enter-review',
          iconUrl: 'svg-enter-review',
          remark: '这次任务是长征系列运载火箭的第351次飞行。（总台央视记者 杨弘杨 我们的太空创新实践中心 朱霄雄 路俊）'
        },
        {
          id: 38,
          menuCode: 'enter-state',
          menuName: '认定情况',
          menuUrl: 'enter-state',
          iconUrl: 'svg-enter-state',
          remark: ''
        }
      ]
    },
    {
      id: 12,
      menuCode: 'study-achievement',
      menuName: '绩效评价',
      menuUrl: '/study-achievement',
      iconUrl: '',
      remark: '',
      children: [
        {
          id: 39,
          menuCode: 'study-record',
          menuName: '评价记录',
          menuUrl: 'study-record',
          iconUrl: 'svg-study-record',
          remark: ''
        },
        {
          id: 40,
          menuCode: 'study-state',
          menuName: '评价情况',
          menuUrl: 'study-state',
          iconUrl: 'svg-study-state',
          remark: ''
        },
        {
          id: 41,
          menuCode: 'study-review',
          menuName: '评价审核',
          menuUrl: 'study-review',
          iconUrl: 'svg-study-review',
          remark: ''
        },
        {
          id: 42,
          menuCode: 'study-template',
          menuName: '评价模板',
          menuUrl: 'study-template',
          iconUrl: 'svg-study-template',
          remark: ''
        }
      ]
    },
    {
      id: 15,
      menuCode: 'star-grade',
      menuName: '星级评定',
      menuUrl: '/star-grade',
      iconUrl: '',
      remark: '',
      children: [
        {
          id: 24,
          menuCode: 'star-review',
          menuName: '评定审核',
          menuUrl: 'star-review',
          iconUrl: 'svg-star-review',
          remark: ''
        },
        {
          id: 25,
          menuCode: 'star-state',
          menuName: '评定情况',
          menuUrl: 'star-state',
          iconUrl: 'svg-star-state',
          remark: ''
        }
      ]
    },
    {
      id: 2,
      menuCode: 'data-report',
      menuName: '数据直报',
      menuUrl: '/data-report',
      iconUrl: 'el-icon-s-grid',
      remark: '',
      children: [
        {
          id: 20,
          menuCode: 'report-review',
          menuName: '上报审核',
          menuUrl: 'report-review',
          iconUrl: 'svg-report-review',
          buttons: [
            { id: 10, name: '添加', code: 'add', status: 0 },
            { id: 11, name: '删除', code: 'delete', status: 1 }
          ],
          remark: ''
        },
        {
          id: 21,
          menuCode: 'report-state',
          menuName: '上报情况',
          menuUrl: 'report-state',
          iconUrl: 'svg-report-state',
          remark: ''
        }
      ]
    },
    {
      id: 22,
      menuCode: 'notice',
      menuName: '信息公告',
      menuUrl: '/notice',
      iconUrl: '',
      remark: '',
      children: [
        {
          id: 23,
          menuCode: 'notice-index',
          menuName: '公告发布',
          menuUrl: 'notice-index',
          iconUrl: 'svg-notice',
          remark: ''
        }
      ]
    },
    {
      id: 26,
      menuCode: 'system',
      menuName: '系统设置',
      menuUrl: '/system',
      iconUrl: 'el-icon-c-scale-to-original',
      remark: '',
      children: [
        {
          id: 43,
          menuCode: 'sys-garden',
          menuName: '园区账号',
          menuUrl: 'sys-garden',
          iconUrl: 'svg-sys-garden',
          remark: ''
        },
        {
          id: 44,
          menuCode: 'sys-government',
          menuName: '组织架构',
          menuUrl: 'sys-government',
          iconUrl: 'svg-sys-government',
          remark: ''
        },
        {
          id: 54,
          menuCode: 'sys-authority',
          menuName: '政务账号',
          menuUrl: 'sys-authority',
          iconUrl: 'svg-sys-government',
          remark: '政务账号'
        },
        {
          id: 53,
          menuCode: 'sys-role',
          menuName: '角色管理',
          menuUrl: 'sys-role',
          iconUrl: 'svg-sys-role',
          remark: ''
        },
        {
          id: 45,
          menuCode: 'sys-permission-setting',
          menuName: '权限设置',
          menuUrl: 'sys-permission-setting',
          iconUrl: 'svg-sys-permission-setting',
          remark: ''
        }
      ]
    },
    {
      id: 28,
      menuCode: 'electron-map',
      menuName: '电子地图',
      menuUrl: '/electron-map',
      iconUrl: 'el-icon-tickets',
      hrefType: 'out',
      remark: '',
      children: [
        {
          id: 46,
          menuCode: 'ele-map',
          menuName: '电子地图',
          menuUrl: 'ele-map',
          iconUrl: '',
          remark: ''
        }
      ]
    },
    {
      id: 5,
      menuCode: 'data-drive-view',
      menuName: '数据驾驶仓',
      menuUrl: '/data-drive-view',
      iconUrl: 'el-icon-user',
      hrefType: 'out',
      remark: '',
      children: [
        {
          id: 47,
          menuCode: 'view-achievement',
          menuName: '综合评价',
          menuUrl: 'view-achievement',
          iconUrl: '',
          remark: ''
        },
        {
          id: 48,
          menuCode: 'view-distribute',
          menuName: '企业分布',
          menuUrl: 'view-distribute',
          iconUrl: '',
          remark: ''
        },
        {
          id: 49,
          menuCode: 'view-economy',
          menuName: '经济运行',
          menuUrl: 'view-economy',
          iconUrl: '',
          remark: ''
        },
        {
          id: 50,
          menuCode: 'view-industry',
          menuName: '园区建设',
          menuUrl: 'view-industry',
          iconUrl: '',
          remark: ''
        },
        {
          id: 51,
          menuCode: 'view-garden',
          menuName: '首页概览',
          menuUrl: 'view-garden',
          iconUrl: '',
          remark: ''
        },
        {
          id: 52,
          menuCode: 'view-home',
          menuName: '产业投资',
          menuUrl: 'view-home',
          iconUrl: '',
          remark: ''
        }
      ]
    }
  ]
  // }
  ;
  return builder(aMenuList);
};

Mock.mock(/\/mock\/index\/menu/, 'get', getMenu); // 菜单
