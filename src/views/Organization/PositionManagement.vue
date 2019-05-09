<template>
  <div class="positionManagement">
    <!-- 顶部按钮组 -->
    <div class="btn-group">
      <add-btn :title="addTitle" @click.native="dialogFormVisible=true"></add-btn>
      <search-box @searchData="searchDep"></search-box>
    </div>
    <div class="position-container">
      <!-- 左侧树状结构 -->
      <tree @handleNodeClick="handleNodeClick"></tree>
      <!-- 右侧表格 -->
      <div class="right-table">
        <tl-table
          :table="dataTable"
        >
        </tl-table>
      </div>
      <!-- 添加部门弹出层 -->
      <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="部门名称">
            <el-input v-model="form.dep" style="width: 60%"></el-input>
          </el-form-item>
          <el-form-item label="上级部门">
            <el-select v-model="form.superior" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDep">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import AddBtn from '@/components/AddBtn'
import SearchBox from '@/components/SearchBox'
import Tree from '@/components/Tree'
import tlTable from '@/components/Table'
import { getDep, setDep, editDep } from '@/api/index'
import moment from 'moment'
export default {
  name: 'PositionManagement',
  data () {
    return {
      addTitle: '添加部门',
      tableDep: [], // 筛选部门数组
      tableData: [], // 全部部门数组
      dialogFormVisible: false,
      form: {
        dep: '',
        superior: ''
      },
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
            label: '部门',
            prop: 'dep',
            minWidth: '140'
          },
          {
            id: '6',
            label: '创建时间',
            prop: 'startTime',
            minWidth: '140'
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
      }
    }
  },
  created () {
    this._getDep()
  },
  methods: {
    async _getDep () {
      let result = await getDep()
      this.tableData = result.message
      this.dataTable.data = this.tableData
    },
    handleNodeClick (val) {
      console.log(val)
    },
    // 添加部门
    async addDep () {
      let data = {
        dep: this.form.dep
      }
      let result = await setDep(data)
      console.log(result)
      if (result.success === 200) {
        this.$message({
          message: result.message,
          type: 'success'
        })
        this.form.dep = ''
        this.dialogFormVisible = false
        this._getDep()
      }
    },
    // 部门搜索
    searchDep (val) {
      this.dataTable.data = this.tableData.filter(item => item.dep.includes(val))
    },
    // 编辑部门
    async handleEdit (val) {
      let data = {
        id: val.id,
        dep: val.dep
      }
      let result = await editDep(data)
      console.log(result)
    }
  },
  filters: {
    dataFmoment (val) {
      return moment(val).format('YYYY年MM月DD日')
    }
  },
  components: {
    AddBtn,
    SearchBox,
    Tree,
    tlTable
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
  .position-container {
    display: flex;
    padding-top: 15px;
    .right-table {
      flex: 1;
      padding: 0 20px;
    }
    .dialog-footer {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
