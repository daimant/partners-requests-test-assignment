import fetchPartnersApi from '../../api/fetchPartnersApi'
import { IPartner, IPartnersState } from '@/types'
import { Commit } from 'vuex'

const state = (): IPartnersState => ({
  items: null,
  isLoading: false,
  perPage: 10,
  displayedItems: 10
})

const getters = {}

const actions = {
  async fetchPartners ({ commit }: { commit: Commit }) {
    try {
      const res = await fetchPartnersApi()
      if (res) commit('setItems', res)
    } catch (e) {
      console.error(e)
    }
  },

  fetchMorePartners ({ commit, state }: { commit: Commit, state: IPartnersState }) {
    state.displayedItems += state.perPage
  }
}

const mutations = {
  setItems (state: IPartnersState, items: IPartner[]) {
    state.items = items
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
