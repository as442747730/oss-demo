<template>
  <div class="CompanyList">
    <div class="course-nav">
      <div class="course-tab">
        <tabs :tabs="tabs" @tabClick="tabClick"></tabs>
      </div>
      <div class="search-box">
        <search-box :placeholder="placeholder"></search-box>
      </div>
    </div>
    <div class="company-table">
      <tl-table
        :total="tableTotal"
        :table="dataTable"
        @handleVideo="handleVideo"
      >
        <!-- 时间 -->
        <template slot-scope="props" slot="dateTime">
          <span>{{props.obj.row.AddTime | dataFormat}}</span>
        </template>
        <!-- 审核状态 -->
        <template slot-scope="scope" slot="examine">
          <el-select
            v-model="scope.obj.row.IsAudit"
            placeholder="请选择部门"
            size="small"
            @change="stateChage(scope.obj.row)"
          >
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
import SearchBox from '@/components/SearchBox'
import tlTable from '@/components/Table'
import { mapState } from 'vuex'
import { UpdateCourseAudit, GetVideoUrl } from '@/api/index'
export default {
  name: 'CompanyList',
  data () {
    return {
      placeholder: '请输入课程名称查找',
      // tabs: ['全部', '已审核', '未审核', '未通过'],
      tabs: [
        {
          label: '全部',
          name: -1
        },
        {
          label: '已审核',
          name: 1
        },
        {
          label: '未审核',
          name: 0
        },
        {
          label: '未通过',
          name: 2
        }
      ],
      // 表格数据
      dataTable: {
        border: true,
        hasOperation: true,
        tr: [
          {
            id: '1',
            label: 'ID',
            prop: 'CourseID',
            minWidth: '100'
          },
          {
            id: '2',
            label: '课程名称',
            prop: 'Name'
          },
          {
            id: '3',
            label: '课程所属',
            prop: 'EnterpriseName'
          },
          {
            id: '5',
            label: '浏览人次',
            prop: 'BrowseNum',
            sort: true,
            minWidth: '140'
          },
          {
            id: '6',
            label: '添加时间',
            prop: 'dateTime',
            show: 'template',
            minWidth: '140'
          },
          {
            id: '9',
            label: '审核',
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
              label: '预览', // 按钮文字
              Fun: 'handleVideo', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '1', // 按钮循环组件的key值
              classname: 'show', // 按钮的类名
              type: 'primary'
            }
          ]
        }
      },
      // 总条数
      tableTotal: 0,
      // 下拉菜单
      options: [
        {
          value: 0,
          label: '未审核'
        },
        {
          value: 1,
          label: '已审核'
        },
        {
          value: 2,
          label: '未通过'
        }
      ],
      // 审核状态
      courseStatus: -1,
      // 当前页数
      pageindex: 1,
      pagesize: 15
    }
  },
  created () {
    this._getCourse()
  },
  computed: {
    ...mapState(['EnterPriseCourse'])
  },
  methods: {
    _getCourse () {
      this.$store.dispatch('GetEPCourse', {
        courseName: '',
        pagesize: this.pagesize,
        pageindex: this.pageindex,
        state: this.courseStatus
      })
    },
    // 选项卡切换
    tabClick (val) {
      this.courseStatus = val
      this._getCourse()
    },
    // 状态更改
    async stateChage (val) {
      let result = await UpdateCourseAudit({
        courseID: val.CourseID,
        status: val.IsAudit
      })
      if (result.Code === 200) {
        this.$message({
          message: '状态修改成功',
          type: 'success'
        })
      }
      this._getCourse()
    },
    // 视频
    async handleVideo (val) {
      let result = await GetVideoUrl({
        courseID: val.CourseID
      })
      console.log(result)
    }
  },
  watch: {
    EnterPriseCourse (val) {
      this.dataTable.data = val.Data
      this.tableTotal = val.Count
    }
  },
  components: {
    Tabs,
    SearchBox,
    tlTable
  }
}
</script>
<style lang="scss" scoped>
.CompanyList {
  .course-nav {
    display: flex;
    justify-content: space-between;
  }
  .company-table {
    padding-top: 15px;
  }
}
</style>
