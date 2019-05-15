<template>
  <div class="login">
    <div class="login-container">
      <h1 class="logo">
        <img src="./../../common/images/logo.png" alt="">
      </h1>
      <div class="logo-form">
        <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" style="padding: 14px 0"></el-input>
        <div class="logo-code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width: 70%"></el-input>
          <img :src="codeImg" alt="验证码" class="code" id="code" @click="UpdateCode">
        </div>
        <el-button type="primary" style="margin-top: 16px" @click="submitLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      codeImg: 'https://oss.xlxt.net/AppUser/GetVerify'
    }
  },
  methods: {
    // 更新验证码
    UpdateCode () {
      this.codeImg = 'https://oss.xlxt.net/AppUser/GetVerify?time=' + Math.random()
    },
    // 登录提交
    submitLogin () {
      let msg = ''
      if (!this.loginForm.username) {
        msg = '请输入账号'
      } else if (!this.loginForm.password) {
        msg = '请输入密码'
      } else if (!this.loginForm.code) {
        msg = '请输入验证码'
      } else {

      }
      // 空选项弹出框
      if (msg) {
        this.$message({
          message: msg,
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url('./../../common/images/loginbg.jpg');
  background-size: 100vw 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-container {
    width: 400px;
    height: 300px;
    border-radius: 15px;
    background-color: #fff;
    overflow: hidden;
    .logo {
      background-color: #313538;
      text-align: center;
    }
    .logo-form {
      padding: 18px;
      display: flex;
      flex-direction: column;
      .logo-code {
        display: flex;
        justify-content: space-between;
        img {
          height: 40px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>
