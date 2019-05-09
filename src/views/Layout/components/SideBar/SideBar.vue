<template>
  <el-row class="side-bar">
    <el-col :span="24">
      <div class="logo">
        <img src="@/common/images/logo.png" alt="">
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#001529"
        text-color="#ffffff"
        active-text-color="#ffffff"
        unique-opened
      >
        <template v-for="item in $router.options.routes">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.iconCls" class="icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link tag="div" v-for="citem in item.children" :to="citem.path" :key="citem.path" v-if="!citem.children">
              <el-menu-item :index="citem.path">
                <span slot="title" class="item-name">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
            <el-submenu v-for="child in item.children" :index="child.path" :key="child.path" v-if="child.children">
              <template slot="title">{{child.name}}</template>
              <router-link tag="div" v-for="citem in child.children" :to="citem.path" :key="citem.path">
                <el-menu-item :index="citem.path">
                  <span slot="title" class="item-name">{{citem.name}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'SideBar'
}
</script>
<style lang="scss" scoped>
.side-bar {
  min-width: 256px;
  min-height: 100%;
  background-color: #001529;
  .el-menu {
    border: none;
    li > span {
      color: #fff;
    }
    .router-link-active > li {
      background: #3399ff !important;
    }
  }
  .logo {
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00284d;
  }
  .icon {
    color: #fff;
    position: relative;
    left: -5px;
  }
  .item-name {
    color: #bcbcbc;
  }
}
</style>
