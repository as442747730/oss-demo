<template>
  <div class="PersonalManagement">
    <!-- 人员管理模块按钮组 -->
    <nav class="per-tab">
      <!-- 添加成员按钮 -->
      <add-btn :title="addTitle" @click.native="addUser"></add-btn>
      <div class="per-tab-right">
        <!-- 部门下拉菜单 -->
        <dep-select></dep-select>
        <!-- 搜索框 -->
        <search-box :placeholder="placeholder" @searchData="searchData"></search-box>
      </div>
    </nav>
    <!-- 表格区域 -->
    <div class="per-table">
      <tl-table
        :pageSite="pageSite"
        :table="dataTable"
        @handleEdit="handleEdit"
        @handleReset="handleReset"
      >
        <template slot-scope="props" slot="username">
          <el-switch
            class="switchStyle"
            v-model="props.obj.row.switchVal"
            active-color="#1890ff"
            inactive-color="#d9d9d9"
            :active-value="1"
            :inactive-value="0"
            @change="changeSwitch(props.obj.row)"
          >
          </el-switch>
          <span style="padding-left: 5px">{{props.obj.row.switchVal?"正常":"冻结"}}</span>
        </template>
      </tl-table>
    </div>
    <!-- 密码重置弹出框 -->
    <psd-dialog v-if="psdDialog" @closeDialog="closeDialog" :userInfo="userInfo"></psd-dialog>
    <!-- 添加人员dialog -->
    <add-user v-if="dialogFormVisible" @closeDialog="closeDialog" :fromData="userInfo"></add-user>
  </div>
</template>
<script>
// 添加按钮
import AddBtn from '@/components/AddBtn'
// 部门下拉菜单
import DepSelect from '@/components/DepSelect'
// 搜索框
import SearchBox from '@/components/SearchBox'
// 表格区域
import tlTable from '@/components/Table'
// 重置密码弹出框
import PsdDialog from '@/components/PsdDialog'
// 添加人员dialog
import AddUser from './components/AddUser'
import { mapState } from 'vuex'
// 请求用户数据
export default {
  name: 'PersonalManagement',
  data () {
    return {
      // 添加按钮文字
      addTitle: '添加人员',
      // 搜索框提示内容
      placeholder: '请输入人员名称查询',
      // 分页器位置
      pageSite: 'page-center',
      // 表格数据
      dataTable: {
        border: true,
        hasOperation: true,
        tr: [
          {
            id: '1',
            label: '序号',
            prop: 'id',
            minWidth: '80'
          },
          {
            id: '2',
            label: '姓名',
            prop: 'name'
          },
          {
            id: '3',
            label: '部门',
            prop: 'dep',
            minWidth: '140'
          },
          {
            id: '4',
            label: '性别',
            prop: 'sex'
          },
          {
            id: '5',
            label: '手机号',
            prop: 'tel',
            minWidth: '140'
          },
          {
            id: '6',
            label: '创建时间',
            prop: 'startDate',
            minWidth: '140'
          },
          {
            id: '7',
            label: '最后登录时间',
            prop: 'endDate',
            minWidth: '140'
          },
          {
            id: '8',
            label: '状态',
            prop: 'username',
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
              label: '编辑', // 按钮文字
              Fun: 'handleEdit', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '1', // 按钮循环组件的key值
              classname: 'show' // 按钮的类名
            },
            {
              label: '重置密码', // 按钮文字
              Fun: 'handleReset', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '2', // 按钮循环组件的key值
              classname: 'show', // 按钮的类名
              type: 'primary'
            }
          ]
        }
      },
      // 重置密码弹出框
      psdDialog: false,
      // 单条数据
      userInfo: {},
      // 添加编辑人员Dialog
      dialogFormVisible: false
    }
  },
  created () {
    this.$store.dispatch('getUsers')
  },
  computed: {
    ...mapState(['userTable'])
  },
  methods: {
    // 新建
    addUser () {
      this.dialogFormVisible = true
    },
    // 状态切换
    changeSwitch (val) {
      console.log(val)
    },
    // 编辑
    handleEdit (val) {
      this.userInfo = val
      this.dialogFormVisible = true
    },
    // 重置密码
    handleReset (val) {
      this.userInfo = val
      this.psdDialog = true
    },
    // 关闭重置密码Dialog
    closeDialog (val) {
      this.psdDialog = val
      this.dialogFormVisible = val
      this.userInfo = {}
    },
    // 搜索内容
    searchData (val) {
      if (val) {
        this.dataTable.data = this.userTable.filter(item => item.name.includes(val))
      } else {
        this.dataTable.data = this.userTable
      }
    }
  },
  watch: {
    userTable (val) {
      this.dataTable.data = val
    }
  },
  components: {
    AddBtn,
    DepSelect,
    SearchBox,
    tlTable,
    PsdDialog,
    AddUser
  }
}
</script>
<style lang="scss" scoped>
.per-tab {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  .per-tab-right {
    width: 540px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
