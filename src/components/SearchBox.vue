<template>
  <div class="search-box">
    <el-input
      v-model="input"
      :placeholder="placeholder"
      size="small"
      style="margin-right: 8px"
      @keydown.enter.native="searchData"
    ></el-input>
    <el-button
      type="primary"
      size="small"
      @click="searchData"
    >
    <i class="el-icon-search icon"></i>查询</el-button>
  </div>
</template>
<script>
export default {
  name: 'SearchBox',
  props: {
    placeholder: {
      type: String,
      default: () => { return '请输入内容'}
    }
  },
  data () {
    return {
      input: ''
    }
  },
  methods: {
    searchData () {
      this.$emit('searchData', this.input)
    }
  }
}
</script>
<style scoped>
.search-box {
  display: flex;
}
.icon {
  font-weight: bold;
  margin-right: 5px;
}
</style>
