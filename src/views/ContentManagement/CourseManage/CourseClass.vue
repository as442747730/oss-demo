<template>
  <div class="CourseClass">
    <div class="tag-btn">
      <div class="add-btn" @click="dialogFormVisible=true">
        <add-btn :title="addBtnTitle"></add-btn>
      </div>
      <div class="search-box">
        <search-box @searchData="searchClass" :placeholder="placeholder"></search-box>
      </div>
    </div>
    <div class="couse-container">
      <!-- 左侧树状结构 -->
      <tree @handleNodeClick="handleNodeClick" :key="isTree"></tree>
      <!-- 右侧表格 -->
      <div class="right-table">
        <span @click="_allData">{{classType}}</span>
        <tl-table
          :table="dataTable"
          :total="tableTotal"
          @handleDel="handleDel"
          @handleEdit="handleEdit"
          @sizeChange="sizeChange"
          @currentChange="currentChange"
        >
          <template slot-scope="props" slot="NodesNum" class="NodesNum">
            <div class="course-nodes">
              <div v-if="props.obj.row.Nodes === 0 || props.obj.row.Nodes.length === 0">
                {{ props.obj.row.Nodes.length }}
              </div>
              <a href="javascript:;" v-else @click="checkNodes(props.obj.row)">
                {{ props.obj.row.Nodes.length }}
              </a>
            </div>
            <!-- {{ typeof(props.obj.row.Nodes) === Number ? props.obj.row.Nodes : props.obj.row.Nodes.length }} -->
          </template>
        </tl-table>
      </div>
    </div>
    <add-class
      v-if="dialogFormVisible"
      @closeDialog="closeDialog"
      :courseName="oneData.courseName"
      :courseTypeName="oneData.courseType"
    ></add-class>
    <del-dialog v-if="deldialog" :course="oneData" @closeDialog="closeDelDialog" :title="'删除'" @submitData="delCourseClass"></del-dialog>
  </div>
</template>
<script>
import AddBtn from '@/components/AddBtn'
import SearchBox from '@/components/SearchBox'
import Tree from '@/components/Tree'
import tlTable from '@/components/Table'
import DelDialog from '@/components/DelDialog'
import AddClass from './components/AddClass'
import { mapState, mapGetters } from 'vuex'
import { SetDelClass, GetAllClass } from '@/api/index'
export default {
  name: 'CourseClass',
  data () {
    return {
      addBtnTitle: '新建分类',
      placeholder: '请输入分类名称查找',
      // 表格数据
      dataTable: {
        border: true,
        hasOperation: true,
        tr: [
          {
            id: '1',
            label: 'ID',
            // prop: 'id',
            type: true,
            minWidth: '80'
          },
          {
            id: '2',
            label: '分类名称',
            prop: 'Name',
            minWidth: '150'
          },
          {
            id: '3',
            label: '子分类数',
            prop: 'NodesNum',
            show: 'template',
            className: 'NodesNum',
            minWidth: '100'
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
              label: '删除', // 按钮文字
              Fun: 'handleDel', // 点击按钮后触发的父组件事件
              size: 'mini', // 按钮大小
              id: '2', // 按钮循环组件的key值
              classname: 'show', // 按钮的类名
              type: 'danger'
            }
          ]
        }
      },
      // 总条数
      tableTotal: 0,
      // 选中数据
      oneData: {
        courseName: '',
        courseType: []
      },
      // 显示全部数据
      allCourseClass: [],
      // 切换一级分类和全部分类
      classType: '点击显示一级分类',
      // 是否重新渲染树形菜单
      isTree: null,
      dialogFormVisible: false,
      deldialog: false,
      pagesize: 15, // 每页显示条数
      pageindex: 1 // 当前页
    }
  },
  computed: {
    ...mapState(['GetAllClass']),
    ...mapGetters(['allClass'])
  },
  methods: {
    // 搜索数据
    searchClass (val) {
      if (val) {
        this.dataTable.data = this.allCourseClass.filter(item => item.Name.includes(val))
        this.tableTotal = this.dataTable.data.length
      } else {
        this.pagesize = 15
        this.pageindex = 1
        this.setCourseClass()
        this.classType = '点击显示一级分类'
        this.tableTotal = this.allCourseClass.length
        this.isTree = new Date().getTime()
      }
    },
    // 显示全部数据
    _allData () {
      this.classType === '点击显示一级分类' ? this.classType = '点击显示全部分类' : this.classType = '点击显示一级分类'
      if (this.classType === '点击显示一级分类') {
        this.dataTable.data = this.allCourseClass
        this.tableTotal = this.allCourseClass.length
      } else {
        this.dataTable.data = this.GetAllClass
        this.tableTotal = this.GetAllClass.length
      }
      this.isTree = new Date().getTime()
    },
    // 树形菜单选择
    handleNodeClick (val) {
      if (val.Nodes.length > 0) {
        this.classType = '点击显示全部分类'
        this.dataTable.data = val.Nodes
        this.tableTotal = val.Nodes.length
      }
    },
    // 关闭弹出层
    closeDialog (val) {
      this.oneData.courseName = ''
      this.oneData.courseType = []
      this.dialogFormVisible = val
    },
    // 删除分类判断
    handleDel (val) {
      if (val.Nodes.length > 0 || val.Nodes > 0) {
        this.$message({
          message: '当前分类下存在子分类或已绑定课程禁止删除',
          type: 'warning'
        })
      } else {
        this.oneData = val
        this.deldialog = true
      }
    },
    async delCourseClass () {
      let result = await SetDelClass({
        id: this.oneData.CommonTypeID
      })
      if (result.Code === 200) {
        this.$message({
          message: '删除分类成功',
          type: 'success'
        })
      }
      this.closeDelDialog(false)
      this.$store.dispatch('GetAllClass', {
        classifyID: 0,
        name: ''
      })
    },
    // 修改分类
    async handleEdit (val) {
      this.oneData.courseName = val.Name
      let result = await GetAllClass({
        courseClassifyID: val.CommonTypeID,
        name: ''
      })
      this.oneData.courseType = JSON.parse(result).SelectedOptions
      this.dialogFormVisible = true
    },
    // 更改每页显示条数
    sizeChange (val) {
      this.pagesize = val
      this.setCourseClass()
    },
    // 点击翻页
    currentChange (val) {
      this.pageindex = val
      this.setCourseClass()
    },
    // 根据显示条数筛选数据
    setCourseClass () {
      this.dataTable.data = this.allCourseClass.filter((item, index) => {
        return index < this.pagesize * this.pageindex + 1 && index > this.pagesize * (this.pageindex - 1)
      })
    },
    closeDelDialog (val) {
      this.deldialog = val
    },
    // 点击子分类
    checkNodes (val) {
      this.dataTable.data = val.Nodes.filter((item, index) => {
        return index < this.pagesize
      })
      console.log(val)
      this.tableTotal = val.Nodes.length
      this.classType = '点击显示全部分类'
    }
  },
  watch: {
    allClass (val) {
      this.$nextTick(() => {
        this.tableTotal = val.length
        this.allCourseClass = val
        let clData = this.classType === '点击显示一级分类' ? this.allCourseClass : this.GetAllClass
        this.dataTable.data = clData.filter((item, index) => {
          return index < this.pagesize
        })
      })
    }
  },
  components: {
    AddBtn,
    SearchBox,
    tlTable,
    Tree,
    AddClass,
    DelDialog
  }
}
</script>
<style lang="scss" scoped>
.CourseClass {
  .tag-btn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    .search-box {
      width: 300px;
    }
  }
  .couse-container {
    display: flex;
    padding-top: 15px;
    .right-table {
      flex: 1;
      padding: 0 20px;
      position: relative;
      span {
        position: absolute;
        z-index: 5;
        color: #333333;
        font-size: 12px;
        top: -18px;
        cursor: pointer;
      }
      .course-nodes a{
        text-decoration: underline;
        color: #3399ff;
        cursor: pointer;
      }
    }
  }
}
.NodesNum {
  background-color:red;
}
</style>
