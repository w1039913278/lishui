<template>
  <div class="base-password-style">
    <ul>
      <li>
        <div class="password-line" :class="count > 5 ? 'levelActive1' : ''">
          <div class="line-bg"></div>
          <div class="title">弱</div>
        </div>
      </li>
      <li>
        <div class="password-line" :class="count >= 50 ? 'levelActive2' : ''">
          <div class="line-bg"></div>
          <div class="title">一般</div>
        </div>
      </li>
      <li>
        <div class="password-line" :class="count >= 60 ? 'levelActive3' : ''">
          <div class="line-bg"></div>
          <div class="title">强</div>
        </div>
      </li>
      <li>
        <div class="password-line" :class="count >= 70 ? 'levelActive4' : ''">
          <div class="line-bg"></div>
          <div class="title">较强</div>
        </div>
      </li>
      <li>
        <div class="password-line" :class="count >= 80 ? 'levelActive5' : ''">
          <div class="line-bg"></div>
          <div class="title">安全</div>
        </div>
      </li>
      <li>
        <div class="password-line" :class="count >= 90 ? 'levelActive6' : ''">
          <div class="line-bg"></div>
          <div class="title">非常安全</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// 密码强度校验组件
// 参数-密码文本 password
/**
 *规则：
 一、密码长度:5 分: 小于等于 4 个字符
10 分: 5 到 7 字符
 25 分: 大于等于 8 个字符

二、字母:
0 分: 没有字母
10 分: 全都是小（大）写字母
20 分: 大小写混合字母
三、数字:
0分: 没有数字
10分: 1 个数字
20分: 大于等于 3个数字
四、符号:
0分: 没有符号
10分: 1个符号
25分: 大于1个符号
五、奖励:
2分: 字母和数字
3分: 字母、数字和符号
5分: 大小写字母、数字和符号
规则:

>= 90: 非常安全
>= 80: 安全（Secure）
>= 70: 非常强
>= 60: 强（Strong）
>= 50: 一般（Average）
>= 25: 弱（Weak）
>= 0: 非常弱
 */
export default {
  name: 'BasePasswordCheck',
  props: {
    password: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      count: 0
    };
  },
  watch: {
    password(v) {
      setTimeout(() => {
        this.count = this.checkPasswordInfo(v);
      }, 800);
    }
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * @description 计算得分
     */
    checkPasswordInfo(v) {
      let count = 0;
      // 长度计分
      if (v === '') {
        count = 0;
      } else {
        if (v.length <= 4) {
          count = 5;
        } else if (v.length < 5 && v.length >= 7) {
          count = 10;
        } else {
          count = 25;
        }
        if (this.includeCheck(v, 'lower')) {
          count += 10;
        }
        if (this.includeCheck(v, 'upper')) {
          count += 10;
        }
        if (this.includeCheck(v, 'number')) {
          const len = this.countLen('number', v);
          if (len >= 3) {
            count += 20;
          } else {
            count += 10;
          }
        }
        if (this.includeCheck(v, 'syboml')) {
          const sybomlLen = this.countLen('syboml', v);
          if (sybomlLen > 1) {
            count += 25;
          } else {
            count += 10;
          }
        }
      }
      // console.log('count', v, count);
      return count;
    },
    countLen(type, str) {
      let num = 0;
      if (str.length > 0) {
        for (const value of str) {
          if (this.checkStr(value, type)) {
            num++;
          }
        }
      }
      return num;
    },
    includeCheck(str, type) {
      switch (type) {
      case 'lower':
        return /^(?=.*?[a-z]).*$/.test(str);
      case 'upper':
        return /^(?=.*?[A-Z]).*$/.test(str);
      case 'number':
        return /^(?=.*?[0-9]).*$/.test(str);
      case 'syboml':
        return /^(?=.*?[`~!@#$%^&*.<>￥，。《》?？【】、·~；’：”;']).*$/.test(
          str
        );
      default:
        return true;
      }
    },
    checkStr(str, type) {
      switch (type) {
      case 'phone': // 手机号码
        return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
      case 'tel': // 座机
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case 'card': // 身份证
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
      case 'pwd': // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        return /^[a-zA-Z]\w{5,17}$/.test(str);
      case 'postal': // 邮政编码
        return /[1-9]\d{5}(?!\d)/.test(str);
      case 'QQ': // QQ号
        return /^[1-9][0-9]{4,9}$/.test(str);
      case 'email': // 邮箱
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case 'money': // 金额(小数点2位)
        return /^\d*(?:\.\d{0,2})?$/.test(str);
      case 'URL': // 网址
        return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\\.,@?^=%&:/~\\+#]*[\w\-\\@?^=%&/~\\+#])?/.test(str);
      case 'IP': // IP
        return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
      case 'date': // 日期时间
        return /^(\d{4})\\-(\d{2})\\-(\d{2}) (\d{2})(?:\\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\\-(\d{2})\\-(\d{2})$/.test(str);
      case 'number': // 数字
        return /^[0-9]$/.test(str);
      case 'english': // 英文
        return /^[a-zA-Z]+$/.test(str);
      case 'chinese': // 中文
        return /^[\\u4E00-\\u9FA5]+$/.test(str);
      case 'lower': // 小写
        return /^[a-z]+$/.test(str);
      case 'upper': // 大写
        return /^[A-Z]+$/.test(str);
      case 'HTML': // HTML标记
        return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
      case 'symbol':
        return /^[^`~!@#$%^&*.<>￥，。《》?？【】、·~；’：”;']+$/.test(str);
      default:
        return true;
      }
    }
  }
};
</script>
