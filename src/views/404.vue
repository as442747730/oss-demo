<template>
  <div class="nofound">
    <p>{{time}}秒后返回首页</p>
  </div>
</template>
<script>
export default {
  name: 'nofound',
  data () {
    return {
      time: 3,
      timer: null
    }
  },
  mounted () {
    this._goHome()
  },
  methods: {
    _goHome () {
      this.timer = setInterval(() => {
        this.time = this.time - 1
        if (!this.time) {
          this.$router.push('/')
        }
      }, 1000)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
.nofound {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url('./../common/images/404.gif') bottom center no-repeat #43a0b6;
  background-size: 100vw 100vh;
  p {
    margin-left: 20%;
    font-size: 30px;
    color: #fff;
  }
}
</style>
