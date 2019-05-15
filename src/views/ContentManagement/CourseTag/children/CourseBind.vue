<template>
  <div class="CourseBind">
    <!-- 返回上一页 -->
    <go-back></go-back>
    <!-- 绑定课程 -->
    <section class="bind-course">
      <div class="bind-nav">
        <h2 class="course-title">已绑定课程</h2>
        <div class="search-box">
          <search-box :placeholder="placeholder"></search-box>
        </div>
      </div>
      <tl-table
        :table="bindTable"
        :total="bindTotal"
        :pageSite="'page-right'"
        :height="240"
        @handleDel="handleDel"
      >
        <template slot-scope="props" slot="SortBox">
          <el-input type="number" v-model="props.obj.row.Sort" @keydown.enter.native="orderCourse(props.obj.row)"></el-input>
        </template>
      </tl-table>
    </section>
    <section class="bind-course">
      <div class="bind-nav">
        <h2 class="course-title">未绑定课程</h2>
        <div class="search-box">
          <search-box :placeholder="placeholder"></search-box>
        </div>
      </div>
      <tl-table
        :table="unBindTable"
        :total="unBindTotal"
        :pageSite="'page-right'"
        :height="240"
        @handleBind="handleBind"
      ></tl-table>
    </section>
    <div class="bind-btn">
      <el-button size="small">取消</el-button>
      <el-button type="primary" size="small">确定</el-button>
    </div>
  </div>
</template>
<script>
import GoBack from '@/components/GoBack'
import tlTable from '@/components/Table'
import SearchBox from '@/components/SearchBox'
import { GetBindCourse, GetUnB1indCourse, DelBindCourse, BindCourse, OrderByCourse } from '@/api/index'
export default {
  name: 'CourseBind',
  data () {
    return {
      placeholder: '请输入名称查询',
      // 已绑定
      bindTable: {
        border: true,
        hasOperation: true,
        // hasHidePage: true,
        tr: [
          {
            id: '1',
            label: '编号',
            prop: 'CourseID',
            minWidth: '80'
          },
          {
            id: '2',
            label: '课程名称',
            prop: 'Name'
          },
          {
            id: '3',
            label: '课程分类',
            prop: 'CourseTypeID',
            minWidth: '140'
          },
          {
            id: '4',
            label: '排序',
            prop: 'SortBox',
            show: 'template',
            sort: true,
            minWidth: '30'
          }
        ],
        data: [],
        operation: { // 操作功能
          label: '操作', // 操作列的行首文字
          width: '350', // 操作列的宽度
          className: '', // 操作列的class名
          data: [ // 操作列数据
            {
              label: '删除', // 按钮文字
              Fun: 'handleDel', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '1', // 按钮循环组件的key值
              classname: 'show', // 按钮的类名
              type: 'danger'
            }
          ]
        }
      },
      // 未绑定
      unBindTable: {
        border: true,
        hasOperation: true,
        // hasHidePage: true,
        tr: [
          {
            id: '1',
            label: '编号',
            prop: 'CourseID',
            minWidth: '80'
          },
          {
            id: '2',
            label: '课程名称',
            prop: 'Name'
          },
          {
            id: '3',
            label: '课程分类',
            prop: 'CourseTypeID',
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
              label: '关联', // 按钮文字
              Fun: 'handleBind', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '1', // 按钮循环组件的key值
              classname: 'show', // 按钮的类名
              type: 'primary'
            }
          ]
        }
      },
      // 已绑定总条数
      bindTotal: 0,
      // 未绑定总条数
      unBindTotal: 0,
      // 当前课程标签
      courseTagID: 0,
      // 当前标签名字
      courseTagName: ''
    }
  },
  created () {
    this._getTagInfo()
    this._getCourseBind()
    this._getCourseUnBind()
  },
  methods: {
    // 获取当前标签名字和ID
    _getTagInfo () {
      this.courseTagID = this.$route.query.courseTagID
      // this.courseTagName = this.$route.query.courseTagName
    },
    // 获取已绑定课程
    async _getCourseBind () {
      let bind = await GetBindCourse({
        courseTagID: this.courseTagID,
        courseTagName: ''
      })
      this.bindTable.data = bind.Data
      this.bindTotal = bind.Data.length
    },
    // 获取未绑定课程
    async _getCourseUnBind () {
      let unBind = await GetUnB1indCourse({
        courseTagID: this.courseTagID,
        courseTagName: this.courseTagName,
        courseTypeID: 0,
        pagesize: 5,
        pageindex: 1
      })
      this.unBindTable.data = unBind.Data
      this.unBindTotal = unBind.Data.length
    },
    // 删除课程
    async handleDel (val) {
      let result = await DelBindCourse({
        courseTagID: this.courseTagID,
        courseID: val.CourseID
      })
      if (result.Code === 200) {
        this.$message({
          message: '删除课程成功',
          type: 'success'
        })
        this._getCourseBind()
        this._getCourseUnBind()
      }
    },
    // 关联课程标签
    async handleBind (val) {
      let result = await BindCourse({
        courseTagID: this.courseTagID,
        courseID: val.CourseID
      })
      if (result.Code === 200) {
        this.$message({
          message: '关联课程成功',
          type: 'success'
        })
        this._getCourseUnBind()
        this._getCourseBind()
      }
    },
    // 关联标签排序
    async orderCourse (val) {
      console.log(val)
      let result = await OrderByCourse({
        courseTagID: this.courseTagID,
        courseID: val.CourseID,
        sort: Number(val.Sort)
      })
      if (result.Code === 200) {
        this.$message({
          message: '设置排序成功',
          type: 'success'
        })
        this._getCourseBind()
      }
    }
  },
  components: {
    GoBack,
    tlTable,
    SearchBox
  }
}
</script>
<style lang="scss" scoped>
.CourseBind {
  .bind-nav {
    padding: 10px 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .course-title {
      font-size: 16px;
      font-weight: normal;
    }
    .search-box {
      width: 256px;
    }
  }
  .bind-btn {
    margin: 25 px 0 0;
    display: flex;
    justify-content: space-around;
    .el-button {
      padding: 10px 50px;
    }
  }
  .el-table td, .el-table th {
    padding: 1px 0 !important;
  }
}
</style>
