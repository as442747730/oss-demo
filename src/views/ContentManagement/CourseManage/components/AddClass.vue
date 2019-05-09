<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="addForm" label-width="100px" :rules="rules" ref="addForm">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="addForm.name" placeholder="请请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="上级分类">
        <el-cascader
          :props="fileType"
          placeholder="请选择上级分类"
          :options="GetAllClass"
          filterable
          change-on-select
          v-model="higherClass"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="课程封面" prop="Cover">
        <update-img></update-img>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import UpdateImg from '@/components/UpdateImg'
import { mapState } from 'vuex'
import { SetAddClass, UpdateClass } from '@/api/index'
export default {
  name: 'AddClass',
  props: {
    courseName: {
      type: String,
      default: ''
    },
    courseTypeName: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      rules: {
        name: [
          {
            required: true,
            message: '分类名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      // 弹窗名字
      title: '新建分类',
      // 分类名称
      addForm: {
        name: ''
      },
      // 上级分类
      higherClass: [],
      // 级联菜单数据结构
      fileType: {
        value: 'CommonTypeID',
        children: 'Nodes',
        label: 'Name'
      },
      // 上传图片地址
      img: '',
      dialogFormVisible: true
    }
  },
  created () {
    this._setDialogInfo()
  },
  computed: {
    ...mapState(['GetAllClass'])
  },
  methods: {
    // 如果是编辑生成默认内容
    _setDialogInfo () {
      if (this.courseName) {
        this.addForm.name = this.courseName
        this.title = '编辑分类'
        this.higherClass = this.courseTypeName.length === 1 ? [] : this.courseTypeName.splice(0, this.courseTypeName.length - 1)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 获取父级ID
          let option = this.higherClass.length > 0 ? this.higherClass[this.higherClass.length - 1] : 0
          // 请求返回数据
          let result = null
          // 请求成功弹窗
          let message = ''
          if (this.courseName) {
            result = await UpdateClass({
              classifyID: this.courseTypeName.length > 1 ? this.courseTypeName[this.courseTypeName.length - 1] : this.courseTypeName[0],
              name: this.addForm.name,
              parentID: this.higherClass.length === 1 ? this.higherClass[0] : this.higherClass[this.higherClass.length - 1],
              sort: 0
            })
            message = '编辑分类成功'
          } else {
            result = await SetAddClass({
              courseTypeName: this.addForm.name,
              courseTypeParentID: option,
              img: this.img,
              sort: 0
            })
            message = '新建分类成功'
          }
          // 后续处理
          if (result.Code === 200) {
            this.$message({
              message,
              type: 'success'
            })
          }
          // 更新列表
          this.$store.dispatch('GetAllClass', {
            classifyID: 0,
            name: ''
          })
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  watch: {
    dialogFormVisible (val) {
      this.$emit('closeDialog', val)
    }
  },
  components: {
    UpdateImg
  }
}
</script>
