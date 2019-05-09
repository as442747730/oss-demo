<template>
  <div>
    <tabs :tabs="tabs"></tabs>
    <nav class="per-tab">
      <!-- 时间选择器 -->
      <date-picker></date-picker>
      <div class="per-tab-right">
        <!-- 部门下拉菜单 -->
        <dep-select></dep-select>
        <!-- 搜索框 -->
        <search-box :placeholder="placeholder" @searchData="searchData"></search-box>
      </div>
    </nav>
    <!-- 表格 -->
    <div class="per-table">
      <tl-table
        :table="dataTable"
      >
        <template slot-scope="scope" slot="examine">
          <el-select v-model="scope.obj.row.option" placeholder="请选择部门" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </tl-table>
    </div>
  </div>
</template>
<script>
//  tab切换
import Tabs from '@/components/Tabs'
// 添加按钮
import DatePicker from '@/components/DatePicker'
// 部门下拉菜单
import DepSelect from '@/components/DepSelect'
// 搜索框
import SearchBox from '@/components/SearchBox'
// 表格区域
import tlTable from '@/components/Table'
export default {
  name: 'LecturerMemberList',
  data () {
    return {
      tabs: ['已通过', '审核'],
      dataTable: {
        border: true,
        hasOperation: true,
        tr: [
          {
            id: '1',
            label: 'ID',
            prop: 'id',
            minWidth: '80'
          },
          {
            id: '2',
            label: '企业名称',
            prop: 'name'
          },
          {
            id: '3',
            label: '登录账号',
            prop: 'user',
            minWidth: '140'
          },
          {
            id: '4',
            label: '员工数',
            prop: 'num'
          },
          {
            id: '5',
            label: '账户创建时间',
            prop: 'startTime',
            minWidth: '140'
          },
          {
            id: '8',
            label: '状态',
            prop: 'examine',
            show: 'template',
            minWidth: '120'
          }
        ],
        data: [],
        operation: { // 操作功能
          label: '操作', // 操作列的行首文字
          width: '350', // 操作列的宽度
          className: '', // 操作列的class名
          data: [ // 操作列数据
            {
              label: '查看信息', // 按钮文字
              Fun: 'handleEdit', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '2', // 按钮循环组件的key值
              classname: 'show' // 按钮的类名
            }
          ]
        }
      },
      allData: [
        {
          id: 1,
          name: '名称1',
          user: '123456',
          num: 12,
          startTime: '2019-4-19',
          iption: '正常'
        }
      ]
    }
  },
  created () {
    this.dataTable.data = this.allData
  },
  components: {
    Tabs,
    DatePicker,
    DepSelect,
    SearchBox,
    tlTable
  }
}
</script>
<style lang="scss" scoped>
.per-tab {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  .per-tab-right {
    width: 540px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
