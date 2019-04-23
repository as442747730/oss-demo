<template>
  <div class="table">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        min-width="60"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        min-width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="dep"
        label="部门"
        align="center"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        align="center"
        min-width="80"
      >
      </el-table-column>
      <el-table-column
        prop="tel"
        label="手机号"
        align="center"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        prop="startDate"
        label="创建时间"
        align="center"
        min-width="150"
      >
        <template slot-scope="scope">
          <span>{{scope.row.startDate | dataFmoment}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="endDate"
        label="最后登录时间"
        align="center"
        min-width="150"
      >
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.switchVal"
            active-color="#1890ff"
            inactive-color="#d9d9d9"
            @change="changeswitch(scope)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleReset(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      prev-text="上一页"
      next-text="下一页"
      background
      small
    >
    </el-pagination>
    <dialog-box
      v-if="dialogTableVisible"
      @closeDialog="closeDialog"
      :title="editTitle"
      :fromData="fromData"
    ></dialog-box>
  </div>
</template>
<script>
import DialogBox from '@/components/DialogBox/DialogBox'
import moment from 'moment'
export default {
  name: 'TableData',
  props: {
    tableData: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      editTitle: '编辑人员信息',
      // 弹出dialog
      dialogTableVisible: false,
      fromData: {}
    }
  },
  methods: {
    // 状态开关
    changeswitch (val) {
      console.log(val)
    },
    // 修改按钮
    handleEdit (val) {
      let data = {
        name: val.name,
        sex: val.sex,
        dep: val.dep,
        tel: val.tel
      }
      this.fromData = data
      this.dialogTableVisible = true
    },
    // 重置密码按钮
    handleReset (val) {
      console.log(val)
    },
    handleSizeChange () {
    },
    handleCurrentChange () {
    },
    closeDialog (val) {
      this.dialogTableVisible = val
    }
  },
  filters: {
    dataFmoment (val) {
      return moment(val).format('YYYY年MM月DD日')
    }
  },
  components: {
    DialogBox
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  margin-top: 45px;
  height: 40px;
  display: flex;
  justify-content: center;
}
.el-pagination {
  font-weight: normal;
}
</style>
