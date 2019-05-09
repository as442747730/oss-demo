<template>
  <div class="CourseComment">
    <!-- 返回上一页 -->
    <go-back></go-back>
    <!-- 搜索框 -->
    <div class="course-search">
      <span class="coursr-name">课程名称</span>
      <div class="search-container">
        <search-box :placeholder="placeholder" @searchData="searchData"></search-box>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="course-tab">
      <tl-table :table="dataTable" @handleDel="handleDel">
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
          <span style="padding-left: 5px">{{props.obj.row.switchVal?"是":"否"}}</span>
        </template>
      </tl-table>
    </div>
    <!-- 删除弹出框 -->
    <del-dialog v-if="isDialog" @closeDialog="closeDialog" @submitData="submitData"></del-dialog>
  </div>
</template>
<script>
import GoBack from '@/components/GoBack'
import SearchBox from '@/components/SearchBox'
import tlTable from '@/components/Table'
import DelDialog from '@/components/DelDialog'
export default {
  name: 'CourseComment',
  data () {
    return {
      // 搜索框提示文字
      placeholder: '请输入人名查找',
      // 表格配置
      dataTable: {
        border: true,
        hasOperation: true,
        tr: [
          {
            id: '1',
            label: 'ID',
            prop: 'id',
            minWidth: '100'
          },
          {
            id: '2',
            label: '评论人',
            prop: 'name'
          },
          {
            id: '3',
            label: '手机号',
            prop: 'tel',
            minWidth: '140'
          },
          {
            id: '4',
            label: '公司名称',
            prop: 'coursename',
            minWidth: '140'
          },
          {
            id: '5',
            label: '评论星级',
            prop: 'rate',
            sort: true,
            minWidth: '140'
          },
          {
            id: '6',
            label: '评论时间',
            prop: 'subtime',
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
      // 全部数据
      allData: [
        {
          id: 1,
          name: '张三',
          tel: '1381381381',
          coursename: '科技公司',
          rate: 5,
          switchVal: 1,
          subtime: '2019-3-21'
        },
        {
          id: 2,
          name: '王栓蛋',
          tel: '1381381381',
          coursename: '科技公司',
          rate: 4,
          switchVal: 0,
          subtime: '2019-3-25'
        }
      ],
      // 控制弹出层
      isDialog: false,
      // 需要删除的数据
      isDelInfo: []
    }
  },
  created () {
    this.dataTable.data = this.allData
  },
  methods: {
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
    submitData (val) {
      console.log(this.isDelInfo, '发送删除请求')
      this.isDialog = val
    },
    // 搜索按钮点击或按下回车键
    searchData (val) {
      if (val) {
        this.dataTable.data = this.allData.filter(item => item.name.includes(val))
      } else {
        this.dataTable.data = this.allData
      }
      console.log(val)
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
