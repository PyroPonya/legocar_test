<template>
  <div class="note-container">
    {{ props }}
    {{ currentNote }}
    <br />
    {{ noteInEdit }}
    <div class="input-container">
      <label for="title">Title</label>
      <input v-model="noteInEdit.title" type="text" id="title" />
      <div class="todo-title">todo list</div>
      <div v-if="noteInEdit.todos.length" class="todo-container">
        <div v-for="(el, id) in noteInEdit.todos" :key="id" class="content">
          <div
            @click="el.marked = !el.marked"
            v-if="el.marked"
            class="marker marker-green"
          ></div>
          <div
            @click="el.marked = !el.marked"
            v-else
            class="marker marker-red"
          ></div>
          <input v-model="el.value" class="content-text" />
          <div @click="removeTodo(id)" class="btn btnRemoveTodo">x</div>
        </div>
      </div>
      <div @click="addTodo()" class="btn btnAddTodo">Add todo</div>
    </div>
    <div class="controls-container">
      <router-link :to="{ name: 'NoteList' }">
        <div @click="updateNoteStore()" class="btn btnSave">Save</div>
      </router-link>
      <router-link :to="{ name: 'NoteList' }">
        <div class="btn btnCancel">Cancel</div>
      </router-link>
      <router-link :to="{ name: 'NoteList' }">
        <div @click="removeFromStore()" class="btn btnDelete">Delete</div>
      </router-link>
      <div @click="dropChanges()" class="btn btnDismiss">Dismiss</div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  props: ['id'],
  setup (props) {
    const store = useStore()
    // указатель на текущую записку сторе
    const currentNote = store.getters.getNoteById(props.id)
    // копия записки, которая изменяется до сейва
    const noteInEdit = ref(JSON.parse(JSON.stringify(currentNote)))
    // добавление туду
    const addTodo = () => {
      const newTodo = {
        marked: false,
        value: 'new todo'
      }
      noteInEdit.value.todos.push(newTodo)
    }
    // удаление туду
    const removeTodo = (id) => {
      noteInEdit.value.todos.splice(id, 1)
    }
    // сброс изменений текущей активной записки
    const dropChanges = () =>
      (noteInEdit.value = JSON.parse(JSON.stringify(currentNote)))
    // обновление данных записки в сторе при сохранении
    const updateNoteStore = () => store.dispatch('updateNote', noteInEdit)
    // удаление записки из стора
    const removeFromStore = () => {
      store.dispatch('removeNote', currentNote)
    }
    return {
      props,
      store,
      currentNote,
      noteInEdit,
      addTodo,
      removeTodo,
      dropChanges,
      updateNoteStore,
      removeFromStore
    }
  }
}
</script>

<style scoped>
.note-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
}
.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
  min-width: 270px;
}
.controls-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
}
.todo-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
}
.content {
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
}
.btn {
  border-radius: 5px;
  padding: 5px;
  min-width: 50px;
  cursor: pointer;
  background-color: lightblue;
}
.btnAddTodo {
  width: 100%;
}
.btn:active {
  opacity: 0.7;
  outline: 1px solid gray;
}
.marker {
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}
.marker:hover {
  outline: 5px solid lightblue;
}
.marker-red {
  background-color: red;
}
.marker-green {
  background-color: green;
}
</style>
