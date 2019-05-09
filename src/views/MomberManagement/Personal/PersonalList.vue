<template>
  <div class="PersonalList">
    <div class="per-tabs">
      <tabs :tabs="tabs" @tabClick="tabClick"></tabs>
    </div>
    <nav class="per-btn">
      <!-- 时间选择器 -->
      <date-picker></date-picker>
      <div class="search-box">
        <search-box :placeholder="placeholder"></search-box>
      </div>
    </nav>
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
import Tabs from '@/components/Tabs'
import DatePicker from '@/components/DatePicker'
import SearchBox from '@/components/SearchBox'
import tlTable from '@/components/Table'
export default {
  name: 'PersonalList',
  data () {
    return {
      tabs: ['全部', '正常', '冻结'],
      placeholder: '请输入手机号或者姓名查找',
      // 表格数据
      dataTable: {
        border: true,
        hasOperation: true,
        tr: [
          {
            id: '1',
            label: 'ID',
            prop: 'id',
            minWidth: '50'
          },
          {
            id: '2',
            label: '姓名',
            prop: 'name',
            minWidth: '80'
          },
          {
            id: '3',
            label: '登录账号',
            prop: 'login',
            minWidth: '100'
          },
          {
            id: '4',
            label: '手机号',
            prop: 'tel',
            minWidth: '120'
          },
          {
            id: '5',
            label: '来源',
            prop: 'source',
            minWidth: '100'
          },
          {
            id: '6',
            label: '所属企业',
            prop: 'company',
            minWidth: '120'
          },
          {
            id: '7',
            label: '添加时间',
            prop: 'startTime',
            minWidth: '100'
          },
          {
            id: '8',
            label: '积分',
            prop: 'integral',
            minWidth: '50'
          },
          {
            id: '9',
            label: '杏林币',
            prop: 'gold',
            minWidth: '80'
          },
          {
            id: '10',
            label: '余额',
            prop: 'balance',
            minWidth: '50'
          },
          {
            id: '11',
            label: '已绑定微信',
            prop: 'wx',
            minWidth: '180'
          },
          {
            id: '12',
            label: '状态',
            prop: 'examine',
            show: 'template',
            minWidth: '120'
          }
        ],
        data: [],
        operation: { // 操作功能
          label: '操作', // 操作列的行首文字
          width: '300', // 操作列的宽度
          className: '', // 操作列的class名
          fixed: 'right',
          data: [ // 操作列数据
            {
              label: '重置密码', // 按钮文字
              Fun: 'handleAdd', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '1', // 按钮循环组件的key值
              classname: 'show' // 按钮的类名
            },
            {
              label: '解绑微信ID', // 按钮文字
              Fun: 'handleDiscuss', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '5', // 按钮循环组件的key值
              classname: 'show', // 按钮的类名
              type: 'primary'
            }
          ]
        }
      },
      allData: [
        {
          id: 999,
          name: '名称一',
          login: '123456',
          tel: '13845646646',
          source: '个人入驻',
          company: '杏林学堂',
          startTime: '2019-4-22',
          integral: 12,
          gold: 10,
          balance: 2,
          wx: '你个糟老头'
        }
      ]
    }
  },
  created () {
    this.dataTable.data = this.allData
  },
  methods: {
    // 选项卡切换
    tabClick (val) {
      console.log(val)
    }
  },
  components: {
    Tabs,
    DatePicker,
    SearchBox,
    tlTable
  }
}
</script>
<style lang="scss" scoped>
.per-btn {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  .search-box {
    width: 300px;
  }
  .per-table {
    width: 100%;
  }
}
</style>
