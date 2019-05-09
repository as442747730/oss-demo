<template>
  <div class="psd-dialog">
    <div class="psd-box">
      <div class="psd-title-container">
        <h2 class="psd-title">密码</h2>
        <i class="el-icon-close icon" @click="closeDialog"></i>
      </div>
      <div class="psd-container">
        <p class="psd-name">【{{userInfo.name}}】生成的密码是：</p>
        <p class="psd-info">{{password}}</p>
      </div>
      <div class="psd-btn">
        <el-button
          type="primary"
          size="small"
        >复制密码</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PsdDialog',
  props: {
    userInfo: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      password: null
    }
  },
  created () {
    this._setPassword()
  },
  methods: {
    _setPassword () {
      let num = Math.ceil(Math.random() * (99999 - 1000 + 1) + 1000)
      let charCode = ''
      for (let i = 0; i < 4; i++) {
        let az = String.fromCharCode(97 + Math.ceil(Math.random() * 25))
        charCode += az
      }
      this.password = `${num}&${charCode}`
    },
    closeDialog () {
      this.$emit('closeDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.psd-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.3);
  .psd-box {
    width: 370px;
    height: 274px;
    background-color: #fff;
    .psd-title-container {
      height: 44px;
      padding: 0 16px;
      background-color: #515151;
      font-weight: normal;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .psd-title {
        font-size: 16px;
        color: #fff;
      }
      .icon {
        font-size: 24px;
        transition: .5s;
        color: #a0a0a0;
        &:hover {
          transform: rotate(360deg)
        }
      }
    }
    .psd-container {
      padding: 18px 26px;
      color: #666666;
      .psd-name {
        font-size: 14px;
        line-height: 34px;
      }
      .psd-info {
        text-align: center;
        font-size: 24px;
      }
    }
    .psd-btn {
      text-align: center;
      padding-top: 48px;
    }
  }
}
</style>
