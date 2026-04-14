<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { IPartnersState } from '@/types'
import store from '@/store'

@Component({
  computed: {
    ...mapState('partners', {
      detailInfo: (state: IPartnersState) => state.detailInfo
    } as Record<string, any>)
  },
  methods: {
    showDetail (id: number | null) {
      store.dispatch('partners/showDetail', id)
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
    <p>Имя: {{ detailInfo.name }}</p>
    <p>Город: {{ detailInfo.city }}</p>
    <p>Статус: {{ detailInfo.status }}</p>
    <p>Дата создания: {{ detailInfo.createdAt }}</p>
    <p>Телефон: {{ detailInfo.phone }}</p>
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
}

</style>
