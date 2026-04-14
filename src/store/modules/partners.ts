import fetchPartnersApi from '../../api/fetchPartnersApi'
import { IFilters, IPartner, IPartnersState } from '@/types'
import { Commit } from 'vuex'

const initFilters = { name: '', city: '', status: '' }

const state = (): IPartnersState => ({
  items: null,
  isLoading: false,
  perPage: 10,
  displayedItems: 10,
  detailInfo: null,
  filters: { ...initFilters }
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
  },

  changeStatus ({ commit }: { commit: Commit }, payload: { status: string, id: number }) {
    commit('setStatus', payload)
  },

  changeFilters ({ commit }: { commit: Commit }, filters: IFilters) {
    commit('setFilters', filters)
  },

  clearFilters ({ commit }: { commit: Commit }) {
    commit('setFilters', { ...initFilters })
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
  },

  setStatus (state: IPartnersState, params: { status: string, id: number }) {
    const idx = state.items?.findIndex(item => item.id === params.id)
    if (idx != null && state.items && state.items[idx]) {
      state.items[idx].status = params.status
      state.detailInfo = null
    }
  },

  setFilters (state: IPartnersState, filters: IFilters) {
    state.filters = filters
    console.log(123)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
