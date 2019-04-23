<template>
  <el-row class="side-bar">
    <el-col :span="24">
      <div class="logo">
        <img src="@/common/images/logo.png" alt="">
      </div>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#001529"
        text-color="#ffffff"
        active-text-color="#ffffff"
      >
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i class="iconfont icon" :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="citem in item.children" :to="citem.path" :key="citem.path">
              <el-menu-item :index="citem.path">
                <span slot="title" class="item-name">{{citem.name}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'SideBar',
  data () {
    return {
      items: [
        {
          icon: 'icon-guanli',
          name: '组织管理',
          path: 'organization',
          children: [
            {path: '/RoleManage', name: '权限管理'},
            {path: '/positionManagement', name: '部门管理'},
            {path: '/personalManagement', name: '人员管理'}
          ]
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
.side-bar {
  min-width: 256px;
  height: 100%;
  background-color: #001529;
  .el-menu {
    border: none;
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
