<template>
  <div class="personalManagement">
    <!-- 按钮组 -->
    <div class="layout-btn">
      <!-- 添加成员按钮 -->
      <div class="add-btn" @click="dialogTableVisible=true">
        <add-btn :title="addBtnTitle"></add-btn>
      </div>
      <div class="right-btn">
        <!-- 部门选择 -->
        <dep-select></dep-select>
        <!-- 搜索框 -->
        <search-box></search-box>
      </div>
    </div>
    <!-- 公用表格 -->
    <table-data :tableData="userTable"></table-data>
    <!-- 弹出层 -->
    <dialog-box v-if="dialogTableVisible" @closeDialog="closeDialog" :title="addBtnTitle"></dialog-box>
  </div>
</template>
<script>
import AddBtn from '@/components/AddBtn/AddBtn'
import DepSelect from '@/components/DepSelect/DepSelect'
import SearchBox from '@/components/SearchBox/SearchBox'
import TableData from '@/components/TableData/TableData'
import DialogBox from '@/components/DialogBox/DialogBox'
import { mapState } from 'vuex'
export default {
  name: 'PersonalManagement',
  data () {
    return {
      // 按钮名字
      addBtnTitle: '添加人员',
      // 弹出dialog
      dialogTableVisible: false
    }
  },
  created () {
    this.$store.dispatch('getUsers')
  },
  computed: {
    ...mapState(['userTable'])
  },
  methods: {
    closeDialog (val) {
      this.dialogTableVisible = val
    }
  },
  components: {
    TableData,
    AddBtn,
    DepSelect,
    SearchBox,
    DialogBox
  }
}
</script>
<style lang="scss" scoped>
.personalManagement {
  padding: 0 20px;
}
.layout-btn {
  // padding: 0 28px;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .right-btn {
    display: flex;
    width: 440px;
    justify-content: space-between;
  }
}
</style>
