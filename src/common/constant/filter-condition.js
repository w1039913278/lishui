
import {
  FILTEROPERATOR,
  VALUETYPE,
  LOGICOPERATOR,
  arrFilterOperatorMap
} from './constant.js';

export class FilterConditionItem {
  fieldCode = '';

  filterOperator = FILTEROPERATOR.Eq;

  value = {
    valueType: VALUETYPE.FixedValue,
    fixedValue: '',
    formulaValue: ''
  };

  start = {
    valueType: VALUETYPE.fixedValue,
    fixedValue: '',
    formulaValue: ''
  };

  end = {
    valueType: VALUETYPE.fixedValue,
    fixedValue: '',
    formulaValue: ''
  };

  valueList = [];

  hasEdit = true;

  constructor(ops) {
    if (!ops) {
      // 默认的新增
      this.hasEdit = false;
      return;
    }
    this.fieldCode = ops.fieldCode;
    this.filterOperator = ops.filterOperator;
    this.value = ops.value || {
      valueType: VALUETYPE.FixedValue,
      fixedValue: ''
    };
    this.valueList = ops.valueList || [];
    if (ops.start) this.start = ops.start;
    if (ops.end) this.end = ops.end;
  }

  getRequestParam() {
    const res = {
      fieldCode: this.fieldCode,
      filterOperator: this.filterOperator,
      value: this.value,
      valueList: this.valueList,
      start: this.start,
      end: this.end
    };
    if (FILTEROPERATOR.Range !== this.filterOperator) {
      delete res.start;
      delete res.end;
    } else if (arrFilterOperatorMap[this.filterOperator]) {
      delete res.value;
    }
    return res;
  }
}

export class FilterCondition {
  logicalOperator = LOGICOPERATOR.AND;

  filterList = [new FilterConditionItem()];

  conditionList = [];

  father = {};

  // eslint-disable-next-line constructor-super
  constructor(father, ops) {
    this.father = father;
    if (!ops) return;
    this.logicalOperator = ops.logicalOperator || LOGICOPERATOR.AND;
    this.filterList = Array.isArray(ops.filterList)
      ? ops.filterList.map((v) => new FilterConditionItem(v))
      : [];
    this.conditionList = Array.isArray(ops.conditionList)
      ? ops.conditionList.map((v) => new FilterCondition(this, v))
      : [];
  }

  wrapCondition(logicalOperator, father) {
    let wrap;
    const filterItem = new FilterConditionItem();
    if (logicalOperator === this.logicalOperator) {
      this.filterList.push(filterItem);
      wrap = this;
    } else {
      wrap = new FilterCondition(father, {
        logicalOperator,
        filterList: [],
        conditionList: []
      });
      wrap.filterList.push(filterItem);
      wrap.conditionList.push(this);
      this.father = wrap;
    }
    return wrap;
  }

  addCondition(logicalOperator, filterItem) {
    const newFilterItem = new FilterConditionItem();
    if (logicalOperator === this.logicalOperator) {
      // 操作符相同的时候，直接加在filterList上
      this.filterList.push(newFilterItem);
    } else if (this.filterList.length === 1) {
      // 只有一个条件的时候，加一个不同条件的filterItem就会改变父节点的逻辑符
      this.logicalOperator = logicalOperator;
      this.filterList.push(newFilterItem);
    } else {
      // 不同的时候加一个condition
      const idx = this.filterList.findIndex((v) => v === filterItem);
      this.filterList.splice(idx, 1);
      const condition = new FilterCondition(this, {
        logicalOperator,
        filterList: [],
        conditionList: []
      });
      condition.filterList.push(filterItem, newFilterItem);
      this.conditionList.unshift(condition);
    }
  }

  // 移除当前的 Condition
  deleteCurCondition() {
    if (this.father instanceof FilterCondition) {
      const conditionIdx = this.father.conditionList.findIndex((v) => v === this);
      this.father.conditionList.splice(conditionIdx, 1);
    }
  }

  deleteFilterItem(idx) {
    // 所有条件的最后一个不能删
    if (
      // eslint-disable-next-line no-use-before-define
      !(this.father instanceof FilterCondition) &&
      this.filterList.length === 1 &&
      !this.conditionList.length
    ) {
      this.filterList = [new FilterConditionItem()];
      return;
    }

    this.filterList.splice(idx, 1);
    // eslint-disable-next-line no-use-before-define
    if (!(this.father instanceof FilterCondition)) {
      if (this.conditionList.length === 1) {
        // eslint-disable-next-line prefer-destructuring
        this.father.filterCondition = this.conditionList[0];
      }
    } else if (this.father instanceof FilterCondition) {
      if (this.filterList.length === 1 && !this.conditionList.length) {
        // 当只有 一个条件的时候，会移除当前的Condition，将下级的条件合并到父级

        this.father.filterList = this.father.filterList.concat(this.filterList);
        this.deleteCurCondition();
      } else if (!this.filterList.length) {
        // 当没有条件的时候，会移除当前的Condition，将下级的条件合并到父级
        const filterList = [];
        const conditionList = [];

        this.conditionList.forEach((v) => {
          // 所有的conidtionList的filter合并到父级
          filterList.push(...v.filterList);
          // 将所有conditionList的conditionList 合并放到父级
          conditionList.push(
            ...v.conditionList.map((condition) => {
              // eslint-disable-next-line no-param-reassign
              condition.father = this;
              return condition;
            })
          );
        });

        this.father.filterList.push(...filterList);
        this.father.conditionList.push(...conditionList);
        this.deleteCurCondition();
      }
    }
  }

  getRequestParam() {
    return {
      logicalOperator: this.logicalOperator,
      filterList: this.filterList.filter((v) => v.hasEdit).map((v) => v.getRequestParam()),
      conditionList: this.conditionList.filter((v) => Boolean(v)).map((v) => v.getRequestParam())
    };
  }

  validFieldCode(hash, stage) {
    this.filterList.forEach((filterConfig) => {
      const { fieldCode, hasEdit } = filterConfig;
      if (hasEdit && !fieldCode) stage.throwError('筛选条件字段未选，请删除！');
      // 未编辑的节点会在请求的时候过滤掉
      if (!fieldCode) return;
      if (!hash[fieldCode]) stage.throwError('筛选条件字段不存在，请删除！');
    });
    this.conditionList.forEach((condition) => {
      condition.validFieldCode(hash, stage);
    });
  }
}
