<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <side-bar></side-bar>
    <div class="main-container">
      <!-- 顶部Nav -->
      <nav-bar></nav-bar>
      <!-- 面包屑导航 -->
      <navigation></navigation>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
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
  components: {
    SideBar,
    NavBar,
    Navigation
  }
}
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  .main-container {
    flex: 1;
  }
  .layout-table {
    padding: 0 20px;
  }
}
</style>
