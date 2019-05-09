<template>
  <div class="nav-bar">
    <div></div>
    <div class="user-container">
      <div class="search">
        <i class="el-icon-search"></i>
      </div>
      <div class="remind">
        <i class="el-icon-bell"></i>
      </div>
      <div class="user-name">
        <span>momo zxy</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  data () {
    return {
      activeIndex: '1'
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  background-color: #00284d;
  .user-container {
    width: 184px;
    display: flex;
    padding: 0 30px;
    align-items: center;
    color: #fff;
    .search,.remind {
      flex: 1;
    }
    .user-name {
      flex: 3;
    }
    i {
      color: 20px;
    }
  }
}
</style>
