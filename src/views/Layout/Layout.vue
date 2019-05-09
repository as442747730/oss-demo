<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper">
    </el-scrollbar> -->
    <side-bar></side-bar>
    <div class="main-container">
      <!-- 顶部Nav -->
      <nav-bar></nav-bar>
      <!-- 面包屑导航 -->
      <navigation></navigation>
      <section class="right-container">
        <transition name="fade-transform" mode="out-in">
          <el-scrollbar style="height: 100%">
            <router-view :key="key" class="views"></router-view>
          </el-scrollbar>
        </transition>
      </section>
    </div>
  </div>
</template>
<script>
import SideBar from './components/SideBar/SideBar'
import NavBar from './components/NavBar/NavBar'
import Navigation from './components/Navigation/Navigation'
export default {
  name: 'Layout',
  data () {
    return {
    }
  },
  computed: {
    key () {
      return this.$route.fullPath
    }
  },
  components: {
    SideBar,
    NavBar,
    Navigation
  }
}
</script>
<style lang="scss" scoped>
@import url('./../../common/css/transition.scss');
.layout {
  height: 100%;
  overflow: hidden;
  display: flex;
  .main-container {
    flex: 1;
  }
  .right-container {
    padding: 20px 0;
    box-sizing: border-box;
    height: calc(100% - 100px);
    overflow: hidden;
    .views {
      padding: 0 28px;
    }
  }
}
</style>
