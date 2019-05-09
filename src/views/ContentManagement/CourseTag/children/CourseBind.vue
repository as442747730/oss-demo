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
        :height="300"
      ></tl-table>
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
        :height="300"
      ></tl-table>
    </section>
  </div>
</template>
<script>
import GoBack from '@/components/GoBack'
import tlTable from '@/components/Table'
import SearchBox from '@/components/SearchBox'
import { GetBindCourse, GetUnB1indCourse } from '@/api/index'
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
            prop: 'Sort',
            sort: true
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
            prop: 'id',
            minWidth: '80'
          },
          {
            id: '2',
            label: '课程名称',
            prop: 'name'
          },
          {
            id: '3',
            label: '课程分类',
            prop: 'dep',
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
              Fun: 'handleDel', // 点击按钮后触发的父组件事件
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
      this.courseTagName = this.$route.query.courseTagName
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
      console.log(unBind)
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
}
</style>
