import Vue from 'vue'
import Vuex from 'vuex'

import state from './modules/state'
import mutations from './modules/mutations'
import actions from './modules/actions'
import * as getters from './modules/getters'

// 使用vuex
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
