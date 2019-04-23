<template>
  <div class="navigation">
    <el-col :span="24" class="breadcrumb-container">
      <!-- <strong class="title">{{$route.name}}</strong> -->
      <el-breadcrumb separator=">" class="breadcrumb-inner">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
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
.navigation {
  height: 28px;
  background-color:#f0f2f5;
  padding-left: 22px;
  color: #333333;
  font-size: 14px;
  line-height: 2;
  display: flex;
  align-items: center;
}
</style>
