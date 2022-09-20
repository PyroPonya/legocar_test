import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    nextId: 3,
    notes: [
      {
        id: 1,
        title: 'title  one',
        todos: [
          {
            marked: false,
            value: 'todo one'
          },
          {
            marked: true,
            value: 'todo two'
          },
          {
            marked: true,
            value: 'todo three'
          },
          {
            marked: false,
            value: 'todo four'
          }
        ]
      },
      {
        id: 2,
        title: 'title  two',
        todos: [
          {
            marked: true,
            value: 'todo one'
          },
          {
            marked: false,
            value: 'todo two'
          }
        ]
      }
    ]
  },
  getters: {
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id === parseFloat(id))
    }
  },
  mutations: {
    REMOVENOTE (state, payload) {
      state.notes = state.notes.filter((el) => el !== payload)
    },
    ADDNOTE (state, payload) {
      state.notes.push(payload)
    },
    UPDATENOTE (state, payload) {
      const index = state.notes.indexOf(
        state.notes.find((note) => note.id === payload.id)
      )
      state.notes[index] = payload
    }
  },
  actions: {
    removeNote (context, element) {
      context.commit('REMOVENOTE', element)
    },
    addNote (context) {
      const emptyNote = {
        id: '',
        title: 'New note',
        todos: []
      }
      emptyNote.id = context.state.nextId
      context.commit('ADDNOTE', emptyNote)
      context.state.nextId++
    },
    updateNote (context, element) {
      context.commit('UPDATENOTE', element.value)
    }
  },
  plugins: [createPersistedState()],
  modules: {}
})
