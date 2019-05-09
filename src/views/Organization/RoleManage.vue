<template>
  <div class="rolemanage">
    <add-btn :title="addTitle" @click.native="addUser"></add-btn>
    <!-- 表格表单 -->
    <div class="role-table">
       <tl-table
          :table="dataTable"
          @handleEdit="handleEdit"
          @handleAdd="handleAdd"
          @handleDel="handleDel"
        >
        </tl-table>
    </div>
  </div>
</template>
<script>
import AddBtn from '@/components/AddBtn'
import tlTable from '@/components/Table'
export default {
  name: 'RoleManage',
  data () {
    return {
      // 按钮名称
      addTitle: '添加角色',
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
            label: '角色名称',
            prop: 'name',
            minWidth: '140'
          },
          {
            id: '3',
            label: '创建时间',
            prop: 'startTime',
            minWidth: '140'
          },
          {
            id: '4',
            label: '包含人员',
            prop: 'include',
            minWidth: '440'
          }
        ],
        data: [
          {
            id: 1,
            name: '知识管理员',
            startTime: '2019-04-28',
            include: '刘备、关羽、张飞'
          },
          {
            id: 2,
            name: '管理员',
            startTime: '2019-04-28',
            include: '孙悟空、猪八戒、沙悟净'
          }
        ],
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
              label: '添加人员', // 按钮文字
              Fun: 'handleAdd', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '2', // 按钮循环组件的key值
              classname: 'show', // 按钮的类名
              type: 'primary'
            },
            {
              label: '删除', // 按钮文字
              Fun: 'handleDel', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '3', // 按钮循环组件的key值
              classname: 'show', // 按钮的类名
              type: 'danger'
            }
          ]
        }
      }
    }
  },
  methods: {
    // 添加角色
    addUser () {
      console.log('添加角色')
    },
    // 编辑
    handleEdit (val) {
      console.log(val, '编辑')
    },
    // 添加人员
    handleAdd (val) {
      console.log(val, '添加')
    },
    handleDel (val) {
      console.log(val, '删除')
    }
  },
  components: {
    AddBtn,
    tlTable
  }
}
</script>
<style lang="scss" scoped>
.rolemanage {
  .role-table {
    padding-top: 16px;
  }
}
</style>
