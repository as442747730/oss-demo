<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane v-for="item in tabs" :label="item.label" :name="String(item.name)" :key="item.name">用户管理</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'tabs',
  props: {
    tabs: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      activeName: '-1'
    }
  },
  methods: {
    tabClick (index) {
      this.current = index
      this.$emit('tabClick', index)
    },
    handleClick(tab, event) {
      this.$emit('tabClick', tab.name)
    }
  }
}
</script>
