<template>
  <div>
    <div :class="$style.personal">
      <div :class="$style.personalImg">
        <el-avatar
          :size="60"
          :src="personalMsg.headerImg"
          @error="errorHandler"
        >
          <img src="/static/images/gd-avatar.png" />
        </el-avatar>
      </div>
      <div :class="$style.personalContent">
        <p :class="$style.personalTitle">个人信息</p>
        <div :class="$style.personalContentMsg">
          <div
            :class="$style.personalContentMsgItem"
            v-for="(value, key) in userMsg"
            :key="key"
          >
            <p>{{ value }}</p>
            <p :title="personalMsg[key]">{{ personalMsg[key] || '' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseFilter',
  props: {
    rowData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      userMsg: {
        // nickName: '用户名称：',
        name: '姓名：',
        roleText: '角色：',
        // position: '职位：',
        departmentText: '所属部门：'
      },
      personalMsg: {
        // nickName: '',
        name: '',
        roleText: '',
        // position: '',
        departmentText: '',
        headerImg: ''
      }
    };
  },
  created() {
    this.getPersonData();
  },
  methods: {
    getPersonData() {
      this.$api['common/getPersonMsg']({
        params: { userId: this.rowData.id }
      }).then(res => {
        if (res.code === this.$constant.apiServeCode.SUCCESS_CODE) {
          this.personalMsg = res.data;
        }
      });
    },
    errorHandler() {
      if (!this.personalMsg.headerImg) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="less" module>
.personal-user-name {
  cursor: pointer;
  font-size: @font-size-small;
  color: @menu-active-font-color;
}

.personal-dialog {
  /deep/ .el-dialog::before {
    content: '';
    display: inline-block;
    width: 100%;
    height: 2px;
    color: rgba(66, 147, 244, 1);
    background: rgba(66, 147, 244, 1);
  }
}

.personal {
  position: relative;
  .personal-img {
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background: #999;
    position: absolute;
    top: -90px;
    left: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .personal-content {
    &-msg {
      display: flex;
      flex-wrap: wrap;
      &-item {
        width: 33%;
        height: 70px;
        > p:nth-child(1) {
          font-size: @font-size-small;
          color: rgba(0, 0, 0, 0.45);
        }
        > p:nth-child(2) {
          font-size: @font-size-medium;
          color: @title-font-color;
          font-weight: @title-font-weight;
          .textOverflow();
        }
      }
    }
  }

  .personal-title {
    font-size: @web-title-font;
    color: @title-font-color;
    font-weight: @title-font-weight;
    margin: 0 0 16px 0;
  }
}
</style>
