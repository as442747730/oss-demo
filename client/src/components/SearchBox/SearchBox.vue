<template>
  <div class="search-box">
    <el-input
      v-model="input"
      placeholder="请输入人员名称查询"
      size="small"
      style="margin-right: 8px"
    ></el-input>
    <el-button type="primary" size="small">查询</el-button>
  </div>
</template>
<script>
export default {
  name: 'SearchBox',
  data () {
    return {
      input: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.search-box {
  display: flex;
}
</style>
