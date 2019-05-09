<template>
  <div class="CourseList">
    <div class="course-nav">
      <div class="course-tab">
        <tabs :tabs="tabs" @tabClick="tabClick"></tabs>
      </div>
      <div class="search-box">
        <search-box :placeholder="placeholder"></search-box>
      </div>
    </div>
    <div class="course-table">
      <tl-table
        :table="dataTable"
        @handleAdd="handleAdd"
        @handleDiscuss="handleDiscuss"
      >
        <template slot-scope="props" slot="dateTime">
          <span>{{props.obj.row.AddTime | dataFormat}}</span>
        </template>
        <template slot-scope="props" slot="username">
          <el-switch
            class="switchStyle"
            v-model="props.obj.row.IsEnable"
            active-color="#1890ff"
            inactive-color="#d9d9d9"
            :active-value="1"
            :inactive-value="0"
            @change="changeSwitch(props.obj.row)"
          >
          </el-switch>
          <span style="padding-left: 5px">{{props.obj.row.IsEnable?"已上架":"未上架"}}</span>
        </template>
        <template slot-scope="scope" slot="examine">
          <el-select v-model="scope.obj.row.IsAudit" placeholder="请选择部门" size="small" @change="selectClick(scope.obj.row)">
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
    <!-- 添加分类 -->
    <select-class v-if="isAddClass" @closeDialog="closeDialog"></select-class>
  </div>
</template>
<script>
import Tabs from '@/components/Tabs'
import SearchBox from '@/components/SearchBox'
import tlTable from '@/components/Table'
import SelectClass from './components/SelectClass'
import { mapState } from 'vuex'
import { IsEnableCourse, UpdateCourseAudit } from '@/api/index'
export default {
  name: 'CourseList',
  data () {
    return {
      placeholder: '请选择企业',
      tabs: ['全部', '已上架', '待上架', '已审核', '未审核', '未通过'],
      dataTable: {
        border: true,
        hasOperation: true,
        tr: [
          {
            id: '1',
            label: 'ID',
            prop: 'EnterpriseID',
            minWidth: '100'
          },
          {
            id: '2',
            label: '课程名称',
            prop: 'EnterpriseName'
          },
          {
            id: '3',
            label: '课程所属',
            prop: 'Contacts'
          },
          {
            id: '4',
            label: '课程价格',
            prop: 'Price',
            minWidth: '140'
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
            id: '8',
            label: '状态',
            prop: 'username',
            show: 'template',
            minWidth: '120'
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
              label: '添加分类', // 按钮文字
              Fun: 'handleAdd', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '1', // 按钮循环组件的key值
              classname: 'show' // 按钮的类名
            },
            {
              label: '查看评论', // 按钮文字
              Fun: 'handleDiscuss', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '5', // 按钮循环组件的key值
              classname: 'show', // 按钮的类名
              type: 'primary'
            }
          ]
        }
      },
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
      // 课程名称
      courseName: '',
      pagesize: 15,
      pageindex: 1,
      state: -1,
      isAddClass: false
    }
  },
  created () {
    this._getCourseList()
  },
  computed: {
    ...mapState(['shopCourse'])
  },
  methods: {
    // 请求列表数据
    _getCourseList () {
      this.$store.dispatch('GetSPCourse', {
        courseName: this.courseName,
        enterepriseID: '',
        pagesize: this.pagesize,
        pageindex: this.pageindex,
        state: this.state
      })
    },
    // 选项卡点击
    tabClick (val) {
      if (!val) {
        this.state = -1
      } else if (val === 1) {
        this.state = 3
      } else if (val === 2) {
        this.state = 4
      } else if (val === 3) {
        this.state = 1
      } else if (val === 4) {
        this.state = 0
      } else if (val === 5) {
        this.state = 2
      }
      this._getCourseList()
    },
    // 添加分类
    handleAdd (val) {
      this.isAddClass = true
      console.log(val)
    },
    async selectClick (val) {
      let result = await UpdateCourseAudit({
        courseID: val.CourseID,
        status: val.IsAudit
      })
      if (result.Code === 200) {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }
      this._getCourseList()
    },
    // 状态切换
    async changeSwitch (val) {
      let result = await IsEnableCourse({
        courseID: val.CourseID,
        isEnable: val.IsEnable
      })
      if (result.Code === 200) {
        this.$message({
          message: '状态修改成功',
          type: 'success'
        })
      }
    },
    // 查看评论
    handleDiscuss (val) {
      console.log(val)
    },
    // 关闭dialog
    closeDialog (val) {
      this.isAddClass = val
    }
  },
  watch: {
    shopCourse (val) {
      this.dataTable.data = val.Data
    }
  },
  components: {
    Tabs,
    SearchBox,
    tlTable,
    SelectClass
  }
}
</script>
<style lang="scss" scoped>
.CourseList {
  .course-nav {
    display: flex;
    justify-content: space-between;
    .course-tab {
      width: 485px;
    }
  }
  .course-table {
    padding-top: 15px;
  }
}
</style>
