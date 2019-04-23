<template>
  <div class="positionManagement">
    <!-- 顶部按钮组 -->
    <div class="btn-group">
      <add-btn :title="addTitle"></add-btn>
      <search-box></search-box>
    </div>
  </div>
</template>
<script>
import AddBtn from '@/components/AddBtn/AddBtn'
import SearchBox from '@/components/SearchBox/SearchBox'
export default {
  name: 'PositionManagement',
  data () {
    return {
      addTitle: '添加部门'
    }
  },
  components: {
    AddBtn,
    SearchBox
  }
}
</script>
<style lang="scss" scoped>
.positionManagement {
  padding: 20px;
  .btn-group {
    display: flex;
    justify-content: space-between;
  }
}
</style>
