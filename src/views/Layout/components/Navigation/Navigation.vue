<template>
  <div class="navigation">
    <el-col :span="24" class="breadcrumb-container">
      <!-- <strong class="title">{{$route.name}}</strong> -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
        <transition-group name="breadcrumb" mode="out-in">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'Navigation'
}
</script>
<style lang="scss" scoped>
@import url('./../../../../common/css/transition.scss');
.navigation {
  height: 28px;
  margin: 10px 0;
  background-color:#f0f2f5;
  color: #333333;
  padding-left: 22px;
  font-size: 14px;
  line-height: 2;
  display: flex;
  align-items: center;
}
</style>
