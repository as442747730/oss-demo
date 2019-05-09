<template>
  <el-button type="primary" @click="goBack" size="small">返回</el-button>
</template>
<script>
export default {
  name: 'GoBack',
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>
