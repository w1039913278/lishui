/**
 * @desc 全局组件库
 */
import Vue from 'vue';
import _has from 'lodash/has';
import BaseSelect from './select/index.js';
import BasePermissionBox from './permission-box/index.js';
import BaseBorderLayout from './border-layout/index.js';
import BaseDoubleWing from './double-wing/index.js';
import BaseNavMenu from './nav-menu/index.js';
import BaseDropDown from './drop-down/index.js';
import BaseBreadCrumb from './bread-crumb/index.js';
import BaseGrid from './grid/index.js';
import BaseDialog from './dialog/index.js';
import BaseTree from './tree/index.js';
import BaseBlockGroup from './block-group/index.js';
import BaseDropColumnDown from './drop-column-down/index.js';
import BaseRollGrid from './roll-grid/index.js';
import BaseDrawer from './drawer/index.js';
import BaseIconPicker from './icon-picker/index.js';
import BaseSelectTree from './select-tree/index.js';
import BaseTempVar from './temp-var/index.js';
import BaseSelectInput from './select-input/index.js';
import BaseCheckboxGroup from './checkbox-group/index.js';
import BaseViewCollapse from './view-collapse/index.js';
import BaseDeferInput from './defer-input/index.js';
import BaseLabel from './label/index.js';
import BaseButton from './button/index.js';
import BasePasswordCheck from './password-check/index.js';
import BaseSelectGrid from './select-grid/index.js';
import BaseTableSelectCondition from './condition/index.js';
import BaseNestingGrid from './nesting-grid/grid.js';
import { Steps, Step } from './steps/index.js';

// 弹出框
if (!_has(window, '$baseDialog')) {
  Object.defineProperty(Vue.prototype, '$baseDialog', { value: BaseDialog });
}
// 弹出抽屉
if (!_has(window, '$baseDrawer')) {
  Object.defineProperty(Vue.prototype, '$baseDrawer', { value: BaseDrawer });
}

export default {
  BaseSelect,
  BasePermissionBox,
  BaseBorderLayout,
  BaseDoubleWing,
  BaseNavMenu,
  BaseDropDown,
  BaseBreadCrumb,
  BaseGrid,
  BaseTree,
  BaseBlockGroup,
  BaseDropColumnDown,
  BaseRollGrid,
  BaseIconPicker,
  BaseSelectTree,
  BaseTempVar,
  BaseSelectInput,
  BaseCheckboxGroup,
  BaseViewCollapse,
  BaseDeferInput,
  BaseLabel,
  BaseButton,
  BasePasswordCheck,
  BaseSelectGrid,
  BaseTableSelectCondition,
  BaseNestingGrid,
  BaseSteps: Steps,
  BaseStep: Step
};
