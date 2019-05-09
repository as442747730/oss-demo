<template>
  <div class="left-tree">
    <el-tree
      ref="leftTree"
      :show-checkbox="checkbox"
      :data="GetAllClass"
      :props="defaultProps"
      node-key="CommonTypeID"
      @node-click="handleNodeClick"
      @check-change="getCheckedNodes"
      :expand-on-click-node=false
      highlight-current
      class="pos-tree"
    ></el-tree>
  </div> 
</template>
<script>
import { mapState } from 'vuex'
import { setTimeout } from 'timers';
export default {
  name: 'tree',
  props: {
    checkbox: {
      type: Boolean,
      default: () => { return false }
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'Nodes',
        label: 'Name'
      }
    }
  },
  created () {
    this.$store.dispatch('GetAllClass', {
      classifyID: 0,
      name: ''
    })
  },
  computed: {
    ...mapState(['GetAllClass'])
  },
  data () {
    return {
      defaultProps: {
        id: 'CommonTypeID',
        children: 'Nodes',
        label: 'Name'
      }
    }
  },
  methods: {
    handleNodeClick (val) {
      this.$emit('handleNodeClick', val)
    },
    getCheckedNodes() {
      if (this.GetAllClass.length > 0) {
        let checkArr = []
        this.$refs.leftTree.getCheckedNodes()
        this.$emit('setCheck', this.$refs.leftTree.getCheckedNodes())
      }
    }
  }
}
</script>
<style scoped>
.pos-tree {
  width: 200px;
  padding: 5px;
  border: 1px solid #d7d7d7;
}
</style>
