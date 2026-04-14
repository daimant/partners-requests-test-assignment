<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import store from '@/store'
import { mapState } from 'vuex'
import { IPartnersState } from '@/types'
import DialogComponent from '@/components/DialogComponent.vue'
import FiltersComponent from '@/components/FiltersComponent.vue'

@Component({
  components: { DialogComponent, FiltersComponent },
  computed: {
    ...mapState('partners', {
      partners: (state: IPartnersState) => state.items?.slice(0, state.displayedItems).filter(el => {
        const { name, city, status } = state.filters
        return (!name || el.name.toLowerCase().includes(name.toLowerCase())) &&
          (!city || el.city.toLowerCase().includes(city.toLowerCase())) &&
          (!status || el.status === status)
      }),
      isLoading: (state: IPartnersState) => state.isLoading,
      canFetchMore: (state: IPartnersState) => (state.items?.length || 0) > state.displayedItems,
      filters: (state: IPartnersState) => state.filters
    } as Record<string, any>)
  },
  methods: {
    fetchMorePartners () {
      store.dispatch('partners/fetchMorePartners')
    },
    showDetail (id: number | null) {
      store.dispatch('partners/showDetail', id)
    },
    clearFilters () {
      store.dispatch('partners/clearFilters')
    }
  },
  created () {
    store.dispatch('partners/fetchPartners')
  }
})

export default class TableView extends Vue {
}
</script>

<template>
  <div>
    <div v-if="isLoading">Идет загрузка</div>

    <div v-else-if="!partners || partners?.length === 0">
      <div>Нет доступных партнеров</div>
      <button v-if="filters" @click="clearFilters" class="clear-filters-button">Сбросить фильтры</button>
    </div>

    <div v-else class="table-container">
      <filters-component/>

      <table class="table">
        <thead>
        <tr>
          <th>ID</th>
          <th>Имя партнёра</th>
          <th>Город</th>
          <th>Статус</th>
          <th>Дата создания</th>
          <th/>
        </tr>
        </thead>

        <tbody>
        <tr v-for="partner in partners" :key="partner.id">
          <td>{{ partner.id }}</td>
          <td>{{ partner.name }}</td>
          <td>{{ partner.city }}</td>
          <td>{{ partner.status }}</td>
          <td>{{ partner.createdAt }}</td>
          <td>
            <button @click="showDetail(partner.id)" popovertarget="dialog">Подробнее</button>
          </td>
        </tr>
        </tbody>

        <button @click="fetchMorePartners" class="table-more-button">Загрузить еще</button>
      </table>

      <dialog-component/>
    </div>
  </div>
</template>

<style scoped lang="scss">

.table-container {
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;

  .table {
    height: fit-content;
    border-collapse: collapse;
    width: 80%;
    margin-top: 20px;

    th, td {
      border: 1px solid #ddd;
      padding: 8px;
    }

    th {
      background-color: #f2f2f2;
      text-align: left;
    }

    &-more-button {
      margin: 20px;
    }
  }
}

.clear-filters-button {
  margin-top: 20px;
}
</style>
