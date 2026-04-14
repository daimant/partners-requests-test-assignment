<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { IFilters, IPartnersState } from '@/types'
import store from '@/store'
import { debounce } from 'lodash'

@Component({
  computed: {
    ...mapState('partners', {
      filters: (state: IPartnersState) => state.filters
    } as Record<string, any>)
  },
  methods: {
    debounceInput: debounce(function (filters: IFilters) {
      store.dispatch('partners/changeFilters', filters)
    }, 500)
  }
})

export default class DialogComponent extends Vue {
}
</script>

<template>
  <div class="filters">
    <div>Фильтры</div>
    <div class="inputs">
      <input
        type="text"
        placeholder="Введите название"
        :value="filters.name"
        v-on:input="debounceInput({...filters, name: $event.target.value})"
      />
      <input
        type="text"
        placeholder="Введите город"
        :value="filters.city"
        v-on:input="debounceInput({...filters, city: $event.target.value})"
      />
      <select :value="filters.status" @change="debounceInput({...filters, status: $event.target.value})">
        <option value="">Выберите статус</option>
        <option value="Новая">Новая</option>
        <option value="В работе">В работе</option>
        <option value="Одобрена">Одобрена</option>
        <option value="Отклонена">Отклонена</option>
      </select>
    </div>
  </div>
</template>

<style scoped lang="scss">

.filters {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .inputs {
    display: flex;
    gap: 20px;
  }
}

</style>
