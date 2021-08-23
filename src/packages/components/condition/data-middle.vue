<template>
  <condition
    :data="filterData"
    :fieldList="fieldList"
    @deleteFilterItem="handleDeleteFilterItem"
    @addConidtion="handleAddConidtion"
    @toggleFilter="handleToggle"
  ></condition>
</template>

<script>
import condition from './condition.vue';
import _cloneDeep from 'lodash/cloneDeep';
import { LOGICOPERATOR } from './constant.js';

export default {
  name: 'BaseTableSelectCondition',
  components: {
    condition
  },
  props: {
    data: {
      type: Object,
      require: true,
      default: () => {
        return {};
      }
    },
    fieldList: {
      type: Array,
      require: true,
      default: () => {
        return [];
      }
    }
  },
  const: {
    DATAMODEL: {
      logicalOperator: '', // 逻辑运算 且和或
      id: '', // 节点id
      parentId: '', // 父节点信息
      filterList: [], // 筛选数据列表
      conditionList: [] // 子筛选项
    },
    FILTERITEMMODEL: {
      fieldId: '', // 字段id
      filterOperator: 'Eq', // 筛选类型
      fieldCode: '',
      value: '', // 筛选的值
      start: '', // 当筛选项是时间的的时候的起始时间
      end: '', // 当筛选项是时间的的时候的截止时间
      valueList: [],
      hasEdit: false // 是否已添加字段
    }
  },
  data() {
    return {
      filterData: {}
    };
  },
  created() {
    this.initFilterData();
  },
  methods: {
    /**
     * @description 初始化筛选数据
     */
    initFilterData() {
      if (this.data && Object.keys(this.data).length !== 0) {
        this.filterData = this.data;
        this.setFilterDataStatus(this.filterData);
      } else {
        this.filterData = _cloneDeep(this.DATAMODEL);
        this.filterData.id = this.setId();
        this.filterData.filterList.push(_cloneDeep(this.FILTERITEMMODEL));
        this.filterData.logicalOperator = LOGICOPERATOR.AND;
      }
    },
    /**
     * @description 删除当前数据
     * @param { index } idx 下标
     * @param { object } condition 当前筛选项
     * @param { string } 当前节点的id
     * @param { string } parentId 父节点id
     */
    handleDeleteFilterItem(idx, condition, id, parentId) {
      // 所有条件的最后一个不能删
      if (
        this.filterData.filterList.length === 1 &&
        !this.filterData.conditionList.length
      ) {
        this.filterData = _cloneDeep(this.DATAMODEL);
        this.filterData.id = this.setId();
        this.filterData.filterList[0] = _cloneDeep(this.FILTERITEMMODEL);
        this.filterData.logicalOperator = LOGICOPERATOR.AND;

        return false;
      }

      const currntNode = this.getNode(id);

      currntNode.filterList.splice(idx, 1);
      // 如果是根数据
      if (!parentId) {
        if (this.filterData.conditionList.length === 1) {
          this.filterData = this.filterData.conditionList[0];
          this.filterData.parentId = '';
        }
      } else {
        const parentNode = this.getNode(parentId);

        if (
          currntNode.filterList.length === 1 &&
          !currntNode.conditionList.length
        ) {
          // 当只有 一个条件的时候，会移除当前的Condition，将下级的条件合并到父级
          (currntNode.filterList || []).map((item) => {
            parentNode.filterList.push(item);
          });

          this.deleteCurCondition(id, parentId);
        } else if (!currntNode.filterList.length) {
          // 当没有条件的时候，会移除当前的Condition，将下级的条件合并到父级
          const filterList = [];
          const conditionList = [];

          currntNode.conditionList.forEach((v) => {
            // 所有的conidtionList的filter合并到父级

            filterList.push(...v.filterList);
            // 将所有子节点的conditionList 合并放到父级
            conditionList.push(
              ...v.conditionList.map((condition) => {
                condition.parentId = parentNode.id;
                return condition;
              })
            );
          });

          parentNode.filterList.push(...filterList);
          parentNode.conditionList.push(...conditionList);
          this.deleteCurCondition(id, parentId);
        }
      }
    },
    /**
     * @description 删除condition项
     * @param { numebr } id 节点id
     * @param { number } parentId 父节点id
     */
    deleteCurCondition(id, parentId) {
      const parentNode = this.getNode(parentId);
      const conditionIdx = parentNode.conditionList.findIndex(
        (v) => v.id === id
      );

      parentNode.conditionList.splice(conditionIdx, 1);
    },
    /**
     * @description 新增筛选条件
     * @param { string } logicalOperator 逻辑条件
     * @param { object } filterItem 当前筛选条件
     * @param { number } id 当前节点的id
     * @param { string } nodeOperator 当前节点的逻辑运算符
     */
    handleAddConidtion(logicalOperator, filterItem, id, nodeOperator) {
      const newFilterItem = _cloneDeep(this.FILTERITEMMODEL);
      // 根据id获取到当前需要操作的节点
      const currntNode = this.getNode(id);

      // 操作符相同的时候，直接加在filterList上
      if (logicalOperator === nodeOperator) {
        currntNode.filterList.push(newFilterItem);
      } else if (currntNode.filterList.length === 1) {
        // 只有一个条件的时候，加一个不同条件的filterItem就会改变父节点的逻辑符
        currntNode.logicalOperator = logicalOperator;
        currntNode.filterList.push(newFilterItem);
      } else {
        // 不同的时候加一个condition
        const condition = _cloneDeep(this.DATAMODEL);
        const idx = currntNode.filterList.findIndex((v) => v === filterItem);
        const parentId = currntNode.id;

        currntNode.filterList.splice(idx, 1);
        condition.filterList.push(filterItem, newFilterItem);
        condition.id = this.setId();
        condition.parentId = parentId;
        condition.logicalOperator = logicalOperator;
        currntNode.conditionList.unshift(condition);
      }
    },
    /**
     * @description 根据id获取节点
     * @param { number } id 节点id
     * @returns 相关节点
     */
    getNode(id) {
      return id === this.filterData.id
        ? this.filterData
        : this.searchfilterId(id, this.filterData.conditionList);
    },
    /**
     * @description 根据id进行筛选对象的搜索
     * @param { string } id 节点id
     * @param { object } node 递归的节点
     */
    searchfilterId(id, node) {
      if (id === '') return {};

      if (!(node instanceof Array)) return;

      for (const item of node) {
        if (id === item.id) return item;

        const key = this.searchfilterId(id, item.conditionList);

        if (key) return key;
      }
    },
    /**
     * @description 设置节点id
     * @returns 节点id
     */
    setId() {
      const currentId = Date.parse(new Date());

      return currentId;
    },
    /**
     * @description 切换逻辑条件
     * @param { number } id 当前条件的id
     */
    handleToggle(id) {
      const currntNode = this.getNode(id);

      currntNode.logicalOperator =
        currntNode.logicalOperator === LOGICOPERATOR.AND
          ? LOGICOPERATOR.OR
          : LOGICOPERATOR.AND;
    },
    /**
     * @description 清除筛选条件
     */
    clearFilter() {
      this.initFilterData();
    },
    /**
     * @description 获取最新的筛选参数
     */
    getFilterCondition() {
      this.$emit('currentCondition', this.filterData);
    },
    /**
     * @description 设置筛选条件可编辑状态
     */
    setFilterDataStatus(data) {
      if (!data.filterList.length) return false;

      for (const item of data.filterList) {
        item.hasEdit = true;
      }

      if (data.conditionList.length) {
        for (const item of data.conditionList) {
          this.setFilterDataStatus(item);
        }
      }
    }
  }
};
</script>
