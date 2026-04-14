<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { IPartnersState } from '@/types'
import store from '@/store'

@Component({
  computed: {
    ...mapState('partners', {
      detailInfo: (state: IPartnersState) => state.detailInfo,
      isButtonDisabled: (state: IPartnersState) => !state.detailInfo?.city || state.detailInfo?.name || state.detailInfo?.phone
    } as Record<string, any>)
  },
  methods: {
    showDetail (id: number | null) {
      store.dispatch('partners/showDetail', id)
    },
    changeStatus (status: string, id: number) {
      store.dispatch('partners/changeStatus', { status, id })
    }
  }
})

export default class DialogComponent extends Vue {
}
</script>

<template>
  <dialog v-if="detailInfo" class="dialog" id="dialog" popover>
    <h3>Детальная информация о партнере</h3>
    <p>ID: {{ detailInfo.id }}</p>
    <p :class="{'dialog-err': !detailInfo.name}">Имя: {{ detailInfo.name || 'Не заполнено имя' }}</p>
    <p :class="{'dialog-err': !detailInfo.city}">Город: {{ detailInfo.city || 'Не заполнен город' }}</p>
    <div class="dialog-status-container">
      <span>Статус:</span>
      <select
        :value="detailInfo.status"
        @change="changeStatus($event.target.value, detailInfo.id)"
        :disabled="isButtonDisabled"
      >
        <option value="">Выберите статус</option>
        <option value="Новая">Новая</option>
        <option value="В работе">В работе</option>
        <option value="Одобрена">Одобрена</option>
        <option value="Отклонена">Отклонена</option>
      </select>
    </div>
    <p>Дата создания: {{ detailInfo.createdAt }}</p>
    <p :class="{'dialog-err': !detailInfo.phone}">Телефон: {{ detailInfo.phone || 'Не заполнен телефон' }}</p>
    <p>Комментарий: {{ detailInfo.comment }}</p>
    <button @click="showDetail(null)" popovertarget="dialog">Закрыть</button>
  </dialog>
</template>

<style scoped lang="scss">

.dialog {
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  &-status-container {
    display: flex;
    gap: 10px;
    justify-content: center;

    select {
      height: 16px;
    }
  }

  &-err {
    color: red
  }
}

</style>
