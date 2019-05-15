<template>
  <div class="CourseComment">
    <!-- 返回上一页 -->
    <go-back></go-back>
    <!-- 搜索框 -->
    <div class="course-search">
      <span class="coursr-name">{{courseTitle}}</span>
      <div class="search-container">
        <search-box :placeholder="placeholder" @searchData="searchData"></search-box>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="course-tab">
      <tl-table :table="dataTable" @handleDel="handleDel" :total="tableTotal">
        <template slot-scope="props" slot="username">
          <el-switch
            class="switchStyle"
            v-model="props.obj.row.IsShow"
            active-color="#1890ff"
            inactive-color="#d9d9d9"
            :active-value="1"
            :inactive-value="0"
            @change="changeSwitch(props.obj.row)"
          >
          </el-switch>
          <span style="padding-left: 5px">{{props.obj.row.IsShow?"是":"否"}}</span>
        </template>
        <template slot-scope="props" slot="dateTime">
          <span>{{props.obj.row.AddTime | dataFormat}}</span>
        </template>
      </tl-table>
    </div>
    <!-- 删除弹出框 -->
    <del-dialog v-if="isDialog" @closeDialog="closeDialog" @submitData="submitData" :title="delTitle"></del-dialog>
  </div>
</template>
<script>
import GoBack from '@/components/GoBack'
import SearchBox from '@/components/SearchBox'
import tlTable from '@/components/Table'
import DelDialog from '@/components/DelDialog'
import { GetReviewByID, ReviewIsEnable, DelReview } from '@/api/index'
export default {
  name: 'CourseComment',
  data () {
    return {
      courseTitle: '所有课程商课程评论',
      // 搜索框提示文字
      placeholder: '请输入人名查找',
      delTitle: '删除',
      // 表格配置
      dataTable: {
        border: true,
        hasOperation: true,
        tr: [
          {
            id: '1',
            label: 'ID',
            prop: 'ReviewID',
            minWidth: '100'
          },
          {
            id: '2',
            label: '评论人',
            prop: 'Name'
          },
          {
            id: '3',
            label: '手机号',
            prop: 'LoginMobile',
            minWidth: '140'
          },
          {
            id: '5',
            label: '评论星级',
            prop: 'Star',
            sort: true,
            minWidth: '140'
          },
          {
            id: '6',
            label: '评论时间',
            prop: 'dateTime',
            show: 'template',
            sort: true,
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
              label: '删除', // 按钮文字
              Fun: 'handleDel', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '4', // 按钮循环组件的key值
              classname: 'show', // 按钮的类名
              type: 'danger'
            }
          ]
        }
      },
      // 控制弹出层
      isDialog: false,
      // 需要删除的数据
      isDelInfo: [],
      // 课程ID
      courseID: 0,
      name: '',
      pagesize: 15,
      pageindex: 1,
      // 总条数
      tableTotal: 0
    }
  },
  created () {
    if (this.$route.params.CourseID) {
      this.courseID = this.$route.params.CourseID
      this.courseTitle = '课程名称：' + this.$route.params.Name
    }
    this._getReview()
  },
  methods: {
    // 获取评论列表
    async _getReview () {
      let result = await GetReviewByID({
        courseID: this.courseID,
        name: this.name,
        pagesize: this.pagesize,
        pageindex: this.pageindex
      })
      this.dataTable.data = result.Data
      this.tableTotal = result.Count
    },
    // 删除按钮点击
    handleDel (val) {
      this.isDelInfo = val
      this.isDialog = true
    },
    // 关闭弹出层
    closeDialog (val) {
      this.isDialog = val
    },
    // 提交删除请求
    async submitData (val) {
      let result = await DelReview({
        reviewID: this.isDelInfo.ReviewID
      })
      if (result.Code === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
      this.isDialog = val
      this._getReview()
    },
    // 搜索按钮点击或按下回车键
    searchData (val) {
      this.name = val
      this._getReview()
    },
    // 状态改变
    async changeSwitch (val) {
      let result = await ReviewIsEnable({
        reviewID: val.ReviewID,
        isEnable: val.IsShow
      })
      if (result.Code === 200) {
        this.$message({
          message: '状态修改成功',
          type: 'success'
        })
      }
    }
  },
  components: {
    GoBack,
    SearchBox,
    tlTable,
    DelDialog
  }
}
</script>
<style lang="scss" scoped>
.CourseComment {
  .course-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    .coursr-name {
      font-weight: bold;
    }
    .search-container {
      width: 300px;
    }
  }
}
</style>
