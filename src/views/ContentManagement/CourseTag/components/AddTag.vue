<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="课程标签" prop="TagName">
        <el-input type="text" v-model="ruleForm.TagName" placeholder="请输入课程标签" @keydown.enter.native="submitForm('ruleForm')"></el-input>
      </el-form-item>
      <div class="add-btn">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
import { addCourseTag, UpdateCourseTag } from '@/api/index'
export default {
  name: 'AddTag',
  props: {
    tagInfo: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      title: '新建标签',
      ruleForm: {
        TagName: '',
        TagDes: ''
      },
      rules: {
        TagName: [
          {
            required: true,
            message: '标签不能为空',
            trigger: 'blur'
          },
          {
            max: 20,
            message: '最多输入20个字符',
            trigger: 'blur'
          }
        ]
      },
      dialogFormVisible: true
    }
  },
  created () {
    if (this.tagInfo.CourseTagID) {
      this.title = '编辑标签'
      this.ruleForm.TagName = this.tagInfo.Name
    }
    console.log(this.tagInfo)
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 接口返回数据
          let result = null
          // 接口参数
          let data = {
            tagName: this.ruleForm.TagName
          }
          // 接口返回状态弹窗
          let message = null
          if (this.title === '新建标签') {
            result = await addCourseTag(data)
            message = '添加标签成功'
          } else {
            data.courseTagID = this.tagInfo.CourseTagID
            result = await UpdateCourseTag(data)
            message = '修改标签成功'
          }
          // 后续处理
          if (result.Code === 200) {
            this.$message({
              message,
              type: 'success'
            })
            this.$emit('getCourseTag')
            this.closeDialog()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialog () {
      this.dialogFormVisible = false
      this.$emit('closeDialog', false)
    }
  },
  watch: {
    dialogFormVisible (val) {
      this.$emit('closeDialog', val)
    },
    tagInfo (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" scoped>
.add-btn {
  display: flex;
  justify-content: center;
}
</style>
