<template>
  <div class="tabs">
    <ul>
      <li :class="{isActive: current === index}" v-for="(item,index) in tabs" v-text="item" :key="item" @click="tabClick(index)"></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'tabs',
  props: {
    tabs: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      current: 0
    }
  },
  methods: {
    tabClick (index) {
      this.current = index
      this.$emit('tabClick', index)
    }
  }
}
</script>
<style scoped>
.tabs {
  display: flex;
}
.tabs ul {
  padding: 0;
  margin: 0;
  list-style: none;
  /* display: inline-block; */
  display: flex;
  align-items: center;
  height: 34px;
  border: 1px solid #aeaeae;
  background-color: #e4e4e4;
  font-size: 14px;
}
.tabs ul li {
  padding: 0 18px;
  line-height: 34px;
  border-right: 1px solid transparent;
  cursor: pointer;
}
.tabs ul li:last-child{
  border-right: 0;
}
.isActive {
  background-color: #ffffff;
  border-right: 1px solid #aeaeae;
  position: relative;
}
.isActive::before {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #fff;
  position: absolute;
  left: 0;
  bottom: -1px;
  
}
</style>
