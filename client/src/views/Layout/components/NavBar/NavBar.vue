<template>
  <div class="nav-bar">
    <div class="nav-btn">
      <i class="iconfont icon-zhankai"></i>
    </div>
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
  name: 'NavBar'
}
</script>
<style lang="scss" scoped>
.nav-bar {
  height: 64px;
  display: flex;
  justify-content: space-between;
  .nav-btn {
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #595959;
    i {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .user-container {
    width: 184px;
    display: flex;
    padding: 0 30px;
    align-items: center;
    color: #5a5a5a;
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
