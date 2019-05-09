<template>
  <el-button
    type="primary"
    icon="el-icon-circle-plus"
    size="small"
  >{{title}}</el-button>
</template>
<script>
export default {
  name: 'AddBtn',
  props: {
    title: {
      type: String,
      default: '添加人员'
    }
  }
}
</script>
