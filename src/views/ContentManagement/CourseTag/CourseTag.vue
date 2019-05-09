<template>
  <div class="course-tag">
    <div class="course-tag" v-if="$route.fullPath==='/CourseTag'">
      <!-- 按钮功能组 -->
      <div class="tag-btn">
        <div class="add-btn">
          <add-btn :title="addBtnTitle" @click.native="dialogFormVisible=true"></add-btn>
        </div>
        <div class="search-box">
          <search-box @searchData="searchTag" :placeholder="placeholder"></search-box>
        </div>
      </div>
      <div class="per-table">
        <tl-table
          :table="dataTable"
          :total="tableTotal"
          @handleEdit="handleEdit"
          @handleBind="handleBind"
          @sizeChange="sizeChange"
          @currentChange="currentChange"
          @handleDel="handleDel"
        >
          <template slot-scope="props" slot="dateTime">
            <span>{{props.obj.row.AddTime | dataFormat}}</span>
          </template>
          <template slot-scope="props" slot="username">
            <el-switch
              class="switchStyle"
              v-model="props.obj.row.State"
              active-color="#1890ff"
              inactive-color="#d9d9d9"
              :active-value="1"
              :inactive-value="0"
              @change="changeSwitch(props.obj.row)"
            >
            </el-switch>
            <span style="padding-left: 5px">{{props.obj.row.State?"已上架":"待上架"}}</span>
          </template>
        </tl-table>
      </div>
      <add-tag v-if="dialogFormVisible" @closeDialog="closeDialog" :tagInfo="editInfo" @getCourseTag="_getCourseTag"></add-tag>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import AddBtn from '@/components/AddBtn'
import SearchBox from '@/components/SearchBox'
// 表格区域
import tlTable from '@/components/Table'
// 添加标签
import AddTag from './components/AddTag'
import { mapState } from 'vuex'
import { DelCourseTag, SetTagSet } from '@/api/index'
export default {
  name: 'CourseTag',
  data () {
    return {
      addBtnTitle: '新建标签',
      placeholder: '请输入标签名称查找',
      dialogFormVisible: false,
      editInfo: {},
      dataTable: {
        border: true,
        hasOperation: true,
        tr: [
          {
            id: '1',
            label: 'ID',
            type: true,
            minWidth: '80'
          },
          {
            id: '2',
            label: '标签名称',
            prop: 'Name'
          },
          {
            id: '4',
            label: '添加时间',
            prop: 'dateTime',
            show: 'template'
          },
          {
            id: '5',
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
              label: '课程绑定', // 按钮文字
              Fun: 'handleBind', // 点击按钮后触发的父组件事件
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
      },
      keyword: '', // 关键字
      pagesize: 15, // 每页显示条数
      pageindex: 1, // 当前页
      tableTotal: 0 // 总条数
    }
  },
  computed: {
    ...mapState(['GetCourseTag'])
  },
  created () {
    this._getCourseTag()
  },
  methods: {
    // 获取标签列表
    _getCourseTag () {
      let params = {
        courseTagName: this.keyword,
        pagesize: this.pagesize,
        pageindex: this.pageindex
      }
      this.$store.dispatch('GetCourseTag', params)
    },
    // 修改状态
    async changeSwitch (val) {
      let params = {
        courseTagID: val.CourseTagID,
        state: val.State
      }
      let msg = val.State ? '上架成功' : '下架成功'
      let result = await SetTagSet(params)
      if (result.Code === 200) {
        this.$message({
          message: msg,
          type: 'success'
        })
        this._getCourseTag()
      }
    },
    // 编辑
    handleEdit (val) {
      this.editInfo = val
      this.dialogFormVisible = true
    },
    // 删除
    async handleDel (val) {
      let params = {
        courseTagID: val.CourseTagID
      }
      let result = await DelCourseTag(params)
      if (result.Code === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this._getCourseTag()
      }
    },
    // 更改每页显示条数
    sizeChange (val) {
      this.pagesize = val
      this._getCourseTag()
    },
    // 点击翻页
    currentChange (val) {
      this.pageindex = val
      this._getCourseTag()
    },
    // 课程绑定
    handleBind (val) {
      this.$router.push({
        name: '课程绑定',
        query: {
          courseTagID: val.CourseTagID,
          courseTagName: val.Name
        }
      })
      console.log(val)
    },
    searchTag (val) {
      this.keyword = val
      this._getCourseTag()
      console.log(val)
    },
    // 关闭弹出层
    closeDialog (val) {
      this.editInfo = {}
      this.dialogFormVisible = false
    }
  },
  watch: {
    GetCourseTag (val) {
      this.dataTable.data = val.Data
      this.tableTotal = val.Count
    }
  },
  components: {
    AddBtn,
    SearchBox,
    tlTable,
    AddTag
  }
}
</script>
<style lang="scss" scoped>
.course-tag {
  .tag-btn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    .search-box {
      width: 300px;
    }
  }
}
</style>
