<template>
  <div class="DatePicker">
    <span>日期筛选 ：</span>
    <el-date-picker
      v-model="timer.start"
      type="datetime"
      @change="changeDate"
      size="small"
      placeholder="请选择开始时间">
    </el-date-picker>
    <el-date-picker
      v-model="timer.end"
      type="datetime"
      size="small"
      placeholder="请选择截止时间">
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name: 'DatePicker',
  data () {
    return {
      timer: {
        start: '',
        end: ''
      }
    }
  },
  methods: {
    changeDate (val) {
      console.log(val)
    }
  }
}
</script>
<style scope>
.DatePicker span{
  color: #333333;
  font-size: 12px;
}
</style>
