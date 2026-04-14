import Vue from 'vue'
import Vuex from 'vuex'
import partners from '@/store/modules/partners'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    partners
  }
})
