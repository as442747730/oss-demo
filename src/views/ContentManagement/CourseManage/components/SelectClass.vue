<template>
  <el-dialog title="选择分类" :visible.sync="dialogTableVisible">
    <div class="class-dialog">
      <div class="left-tree">
        <tree :checkbox="true" @setCheck="setCheck"></tree>
      </div>
      <div class="right-option">
        <div class="option-container">
          <span v-if="dynamicTags.length === 0" style="padding-left: 10px; color: #ccc;">请选择分类</span>
          <el-tag
            :key="tag.CommonTypeID"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag.Name}}
          </el-tag>
        </div>
      </div>
    </div>
    <div class="class-btn">
      <el-button @click="closeDialog" size="small">取消</el-button>
      <el-button type="primary" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import Tree from '@/components/Tree'
export default {
  name: 'SelectClass',
  data () {
    return {
      dialogTableVisible: true,
      dynamicTags: []
    }
  },
  methods: {
    handleClose (tag) {
      console.log(tag)
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    setCheck (tag) {
      this.dynamicTags = tag
    }
  },
  watch: {
    dialogTableVisible (val) {
      this.$emit('closeDialog', val)
    }
  },
  components: {
    Tree
  }
}
</script>
<style lang="scss" scoped>
.class-dialog {
  min-height: 400px;
  display: flex;
  flex-direction: row;
}
.right-option {
  flex: 1;
  margin-left: 20px;
  .option-container {
    width: 65%;
    min-height: 40px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-radius: 5px;
    border: 1px solid #3399ff;
  }
}
.class-btn {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.el-tag  {
  // margin-left: 10px;
  margin: 5px;
  // margin-bottom: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
