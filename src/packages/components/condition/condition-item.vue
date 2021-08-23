<template>
  <div class="base-condtion-item layout_row">
    <template v-if="filterConfig.hasEdit">
      <div class="layout_row-expand">
        <el-select v-model="filterConfig.fieldId" @change="handleChangeField">
          <el-option
            v-for="field in fieldList"
            :key="field.id"
            :value="field.id"
            :label="field.name"
          >
          </el-option>
        </el-select>

        <el-select
          v-model="filterConfig.filterOperator"
          style="margin: 0 10px"
          @change="handleChangeOperator"
        >
          <el-option
            v-for="(operator, key) in filterOperatorMap"
            :key="key"
            :value="key"
            :label="operator"
          ></el-option>
        </el-select>

        <!-- 数字类型 -->
        <template v-if="field.type === FIELD_SETTING_TYPE.Num">
          <template v-if="filterConfig.filterOperator === FILTEROPERATOR.Range">
            <el-input v-model="filterConfig.start"></el-input>
            ~
            <el-input v-model="filterConfig.end"></el-input>
          </template>
          <template
            v-else-if="numberBaseFilterOperatorMap[filterConfig.filterOperator]"
          >
            <el-input v-model="filterConfig.value"></el-input>
          </template>
          <template
            v-else-if="arrFilterOperatorMap[filterConfig.filterOperator]"
          >
            <ListInput v-model="filterConfig.valueList">
              <template slot-scope="scope">
                <el-tag closable @close="handlerRemoveValue(scope)">
                  {{ scope.value }}
                </el-tag>
              </template>
            </ListInput>
          </template>
        </template>

        <!-- 文本类型 -->
        <template v-if="field.type === FIELD_SETTING_TYPE.Text">
          <template v-if="arrFilterOperatorMap[filterConfig.filterOperator]">
            <ListInput v-model="filterConfig.valueList">
              <template slot-scope="scope">
                <el-tag closable @close="handlerRemoveValue(scope)">
                  {{ scope.value }}
                </el-tag>
              </template>
            </ListInput>
          </template>
          <el-input
            v-model="filterConfig.value"
            type="text"
            v-else-if="!emptyFilterOperatorMap[filterConfig.filterOperator]"
          ></el-input>
        </template>

        <!-- 时间类型 -->
        <template
          v-if="
            field.type === FIELD_SETTING_TYPE.Date &&
              !emptyFilterOperatorMap[filterConfig.filterOperator]
          "
        >
          <el-date-picker
            v-if="filterConfig.filterOperator !== FILTEROPERATOR.Range"
            v-model="filterConfig.value"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
          <template v-else>
            <el-date-picker
              v-model="filterConfig.start"
              type="datetime"
              placeholder="选择日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="{
                disabledDate: startTimePickerOptions
              }"
            ></el-date-picker>
            ~
            <el-date-picker
              v-model="filterConfig.end"
              type="datetime"
              placeholder="选择日期"
              :picker-options="{
                disabledDate: endTimePickerOptions
              }"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </template>
        </template>
      </div>

      <div>
        <slot></slot>
      </div>
    </template>
    <el-button v-else @click="filterConfig.hasEdit = true" type="text">
      添加字段
    </el-button>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import {
  emptyFilterOperatorMap,
  arrFilterOperatorMap,
  numberBaseFilterOperatorMap,
  textBaseFilterOperatorMap,
  FILTEROPERATOR,
  FIELD_SETTING_TYPE,
  LOGICOPERATOR,
  // eslint-disable-next-line no-unused-vars
  VALUETYPE
} from './constant.js';
import ListInput from './list-input.vue';

const numberOperator = {
  ...numberBaseFilterOperatorMap,
  ...emptyFilterOperatorMap,
  ...arrFilterOperatorMap
};

const textOperator = {
  ...textBaseFilterOperatorMap,
  ...emptyFilterOperatorMap,
  ...arrFilterOperatorMap
};

const dateOperator = {
  ...numberBaseFilterOperatorMap,
  ...emptyFilterOperatorMap
};

export default {
  name: 'condition-item',
  components: {
    ListInput
  },
  props: {
    filterConfig: {
      type: Object,
      required: true,
      default: () => {}
    },
    fieldList: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      LOGICOPERATOR: LOGICOPERATOR,
      FILTEROPERATOR: FILTEROPERATOR,
      FIELD_SETTING_TYPE: FIELD_SETTING_TYPE,
      arrFilterOperatorMap: arrFilterOperatorMap,
      numberBaseFilterOperatorMap: numberBaseFilterOperatorMap,
      textBaseFilterOperatorMap: textBaseFilterOperatorMap,
      emptyFilterOperatorMap: emptyFilterOperatorMap
    };
  },
  computed: {
    filterOperatorMap: function () {
      if (this.field.type === FIELD_SETTING_TYPE.Num) {
        return numberOperator;
      }
      if (this.field.type === FIELD_SETTING_TYPE.Text) {
        return textOperator;
      }
      if (this.field.type === FIELD_SETTING_TYPE.Date) {
        return dateOperator;
      }
      return emptyFilterOperatorMap;
    },
    field: function () {
      return (
        this.fieldList.find(v => v.id === this.filterConfig.fieldId) || {
          fieldId: 0,
          name: '',
          fieldCode: '',
          type: FIELD_SETTING_TYPE.Text
        }
      );
    }
  },
  methods: {
    startTimePickerOptions(date) {
      if (!this.filterConfig.end || !this.filterConfig.end) return false;

      return dayjs(date).isAfter(this.filterConfig.end);
    },

    endTimePickerOptions(date) {
      if (!this.filterConfig.start || !this.filterConfig.start) return false;

      return dayjs(date).isBefore(this.filterConfig.start);
    },

    handleChangeOperator(val) {
      this.filterConfig.value = '';
      this.filterConfig.start = '';
      this.filterConfig.end = '';
      this.filterConfig.valueList = [];
    },

    // 字段改变时初始化所有值
    handleChangeField(fieldCode) {
      this.filterConfig.filterOperator = FILTEROPERATOR.Eq;

      this.handleChangeOperator(this.filterConfig.filterOperator);
    },

    handlerRemoveValue(scope) {
      this.filterConfig.valueList.splice(scope.index, 1);
    }
  }
};
</script>
