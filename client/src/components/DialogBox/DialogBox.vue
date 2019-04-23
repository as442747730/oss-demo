<template>
  <el-dialog title="添加人员" :visible.sync="dialogTableVisible" width="70%">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" size="small" label-width="100px" class="demo-ruleForm">
      <el-form-item label="名字" prop="name" style="width: 300px">
        <el-input type="text" v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="部门" prop="dep" style="width: 300px">
        <el-select v-model="ruleForm.dep" placeholder="请选择部门">
          <el-option label="运营部" value="运营部"></el-option>
          <el-option label="课程研发中心" value="课程研发中心"></el-option>
          <el-option label="IT中心" value="IT中心"></el-option>
          <el-option label="营销中心" value="营销中心"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="tel" style="width: 300px">
        <el-input type="tel" v-model="ruleForm.tel" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="workNum" style="width: 300px">
        <el-input type="text" v-model="ruleForm.workNum" placeholder="请输入工号"></el-input>
      </el-form-item>
      <el-form-item label="备注" style="width: 600px">
        <el-input type="textarea"
          v-model="ruleForm.desc"
          placeholder="个人介绍"
          :autosize="{ minRows: 3 }"
        ></el-input>
      </el-form-item>
      <div class="btn-group">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button type="primary" size="small" @click="submitForm('ruleForm')">确定</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
import DepSelect from '@/components/DepSelect/DepSelect'
import { addUser } from '@/api/index'
export default {
  name: 'Dialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    fromData: {
      type: Object,
      default: () => { return {} }
    }
  },
  created () {
    this._setFromData()
  },
  data () {
    return {
      dialogTableVisible: true,
      ruleForm: {
        name: '',
        sex: '男',
        dep: '',
        tel: '',
        workNum: '',
        desc: ''
      },
      // 表单验证
      rules: {
        name: [
          {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          },
          {
            max: 6,
            message: '最多输入6个字',
            trigger: 'blur'
          }
        ],
        sex: [
          {
            required: true
          }
        ],
        dep: [
          {
            required: true
          }
        ],
        tel: [
          {
            required: true,
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 判断新建修改
    _setFromData () {
      if (this.fromData.name) {
        let data = this.fromData
        this.ruleForm.name = data.name
        this.ruleForm.sex = data.sex
        this.ruleForm.tel = data.tel
        this.ruleForm.dep = data.dep
      }
    },
    // 关闭dialog
    closeDialog () {
      this.dialogTableVisible = false
      this.$emit('closeDialog', this.dialogTableVisible)
    },
    // 添加用户
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let result = await addUser(this.ruleForm)
          if (result.success === 200) {
            this.$message({
              message: result.message,
              type: 'success'
            })
            this.$store.dispatch('getUsers')
            this.$emit('closeDialog', false)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  watch: {
    dialogTableVisible (val) {
      this.$emit('closeDialog', val)
    }
  },
  components: {
    DepSelect
  }
}
</script>
<style lang="scss" scoped>
.btn-group {
  display: flex;
  justify-content: center;
  button {
    padding: 8px 30px;
    margin: 0 100px;
    &:first-child {
      border-color: #1890ff;
    }
  }
}
</style>
