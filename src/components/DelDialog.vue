<template>
  <div class="deldialog">
    <div class="dialog">
      <h2>{{title}}</h2>
      <div class="dialog-container">
        <p>
          <i :class="icon" v-if="icon"></i>
          此操作将永久删除，是否继续？
        </p>
      </div>
      <div class="dialog-btn">
        <el-button size="mini" @click="closeDialog">取消</el-button>
        <el-button type="info" size="mini" @click="submitData">确认</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'deldialog',
  props: {
    title: {
      type: String,
      default: () => { return '' }
    },
    icon: {
      type: String,
      default: () => { return '' }
    },
    wxUser: {
      type: Object,
      default: () => { return {} }
    },
    course: {
      type: Object,
      default: () => { return {} }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog', false)
    },
    submitData () {
      this.$emit('submitData', false)
    }
  }
}
</script>
<style scoped>
p {
  margin: 0;
}
.deldialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.deldialog .dialog {
  width: 368px;
  height: 210px;
  background-color: #fff;
  border-radius: 10px;
}
.deldialog .dialog h2 {
  margin: 0;
  background-color: #515151;
  height: 40px;
  font-size: 14px;
  font-weight: normal;
  line-height: 40px;
  padding-left: 15px;
  color: #fff;
  border-radius: 10px 10px 0 0;
}
.deldialog .dialog .dialog-container {
  padding: 36px 52px;
  color: #666666;
}
.deldialog .dialog .dialog-container p {
  height: 30px;
  display: flex;
  align-items: center;
}
.deldialog .dialog .dialog-container i {
  font-size: 30px;
  margin-right: 8px;
  color: #f7ba2a;
}
.deldialog .dialog .dialog-btn {
  text-align: right;
  padding-right: 10px;
  padding-top: 30px;
}
</style>
