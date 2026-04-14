<template>
  <div class="table-container">
    <div v-if="isLoading">Идет загрузка</div>

    <div v-else-if="partners && partners?.length === 0">Нет доступных партнеров</div>

    <table v-else class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Имя партнёра</th>
        <th>Город</th>
        <th>Статус</th>
        <th>Дата создания</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="partner in partners" :key="partner.id">
        <td>{{ partner.id }}</td>
        <td>{{ partner.name }}</td>
        <td>{{ partner.city }}</td>
        <td>{{ partner.status }}</td>
        <td>{{ partner.createdAt }}</td>
      </tr>
      </tbody>

      <button @click="fetchMorePartners" class="table-more-button">Загрузить еще</button>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import store from '@/store'
import { mapState } from 'vuex'
import { IPartnersState } from '@/types'

@Component({
  computed: {
    ...mapState('partners', {
      partners: (state: IPartnersState) => state.items?.slice(0, state.displayedItems),
      isLoading: (state: IPartnersState) => state.isLoading,
      canFetchMore: (state: IPartnersState) => (state.items?.length || 0) > state.displayedItems
    } as Record<string, any>)
  },
  methods: {
    fetchMorePartners () {
      store.dispatch('partners/fetchMorePartners')
    }
  },
  created () {
    store.dispatch('partners/fetchPartners')
  }
})

export default class TableView extends Vue {
}
</script>

<style scoped lang="scss">
.table-container {
  height: 100vh;
  display: flex;
  justify-content: center;

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
</style>
