import fetchPartnersApi from '../../api/fetchPartnersApi'
import { IPartner, IPartnersState } from '@/types'
import { Commit } from 'vuex'

const state = (): IPartnersState => ({
  items: null,
  isLoading: false,
  perPage: 10,
  displayedItems: 10,
  detailInfo: null
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

  fetchMorePartners ({ commit }: { commit: Commit }) {
    commit('setPagination')
  },

  showDetail ({ commit }: { commit: Commit }, id: number | null) {
    commit('setDetail', id)
  }
}

const mutations = {
  setItems (state: IPartnersState, items: IPartner[]) {
    state.items = items
  },

  setPagination (state: IPartnersState) {
    state.displayedItems += state.perPage
  },

  setDetail (state: IPartnersState, id: number | null) {
    state.detailInfo = state.items?.find(item => item.id === id) || null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
