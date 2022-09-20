<template>
  <div class="container">
    <div class="container-info">
      <div class="title">{{ item.title }}</div>
      <div v-for="(el, id) in item.todos.slice(0, 3)" :key="id" class="content">
        <div v-if="el.marked" class="marker marker-green"></div>
        <div v-else class="marker marker-red"></div>
        {{ el.value }}
      </div>
    </div>
    <div class="container-controls">
      <router-link :to="{ name: 'NoteConfig', params: { id: item.id } }">
        <div class="btn btn-edit">edit</div></router-link
      >
      <div @click="$emit('removeItem', item)" class="btn btn-delete">del</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  setup (props) {
    return {
      props
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
}
.container-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
}
.container-controls {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-end;
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
}
.btn:active {
  opacity: 0.7;
  outline: 1px solid gray;
}
.btn-edit {
  background-color: yellow;
}
.btn-delete {
  background-color: red;
}
.marker {
  padding: 10px;
  border-radius: 50%;
}
.marker-red {
  background-color: red;
}
.marker-green {
  background-color: green;
}
</style>
