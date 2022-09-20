<template>
  <div class="listContainer">
    <div @click="addToStore" class="btnAdd">add new note</div>
    <NoteListElement
      v-for="(el, id) in store.state.notes"
      :key="id"
      :item="el"
      @remove-item="removeFromStore"
    ></NoteListElement>
  </div>
</template>

<script>
import NoteListElement from '@/components/NoteListElement.vue'
import { useStore } from 'vuex'
export default {
  components: {
    NoteListElement
  },
  setup () {
    const store = useStore()
    // вызывает удаление выбранной записки
    const removeFromStore = (el) => {
      store.dispatch('removeNote', el)
    }
    // добавляет новую записку, как в гугл кип
    const addToStore = () => {
      store.dispatch('addNote')
    }
    return {
      store,
      removeFromStore,
      addToStore
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0 auto;
}
.listContainer {
  max-width: 720px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.btnAdd {
  border-radius: 5px;
  padding: 5px;
  min-width: 50px;
  cursor: pointer;
  background-color: lightgreen;
}
.btnAdd:active {
  opacity: 0.7;
  outline: 1px solid gray;
}
</style>
