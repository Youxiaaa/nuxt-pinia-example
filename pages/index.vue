<template>
  <section class="bg-gradient-to-tr from-pink-300 to-purple-300 h-screen w-full flex flex-col gap-4 justify-center items-center">
    <h1 v-pre class="font-bold text-4xl text-white">Pinia TodoList</h1>
    <div class="p-4 rounded-xl bg-white shadow-md w-80">
      <input v-model="newTodo" @keyup.enter="addTodo" type="text" class="w-full px-4 py-1.5 border-2 border-[#555] rounded-xl mb-4">
      <ul class="w-full flex items-center gap-4 mb-4">
        <li @click="selectTab = '全部'" :class="{'text-white font-bold bg-pink-300': selectTab === '全部'}" class="w-full text-center p-2 border-2 border-[#555] rounded-xl cursor-pointer">全部</li>
        <li @click="selectTab = '未完成'" :class="{'text-white font-bold bg-pink-300': selectTab === '未完成'}" class="w-full text-center p-2 border-2 border-[#555] rounded-xl cursor-pointer">未完成</li>
        <li @click="selectTab = '已完成'" :class="{'text-white font-bold bg-pink-300': selectTab === '已完成'}" class="w-full text-center p-2 border-2 border-[#555] rounded-xl cursor-pointer">已完成</li>
      </ul>
      <ul class="flex flex-col gap-4">
        <li v-for="(item, idx) in filterTodos" :key="item.id" class="w-full flex items-center justify-between py-2 px-4 border-2 border-[#555] rounded-xl">
          <div class="flex items-center gap-2 text-[#555]">
            <label :for="'completedId' + item.id" class="w-5 h-5 rounded-full relative flex justify-center items-center border border-[#555]">
              <div :class="{'scale-100': item.isCompleted, 'scale-0': !item.isCompleted}" class="rounded-full w-3 h-3 bg-pink-300 duration-300"></div>
            </label>
            <input v-model="item.isCompleted" :id="'completedId' + item.id" type="checkbox" class="hidden">
            <span>{{ idx + 1 }}.</span>
            <h2>{{ item.title }}</h2>
          </div>
          <a @click="deleteTodo(item.id)" class="font-bold cursor-pointer"> X </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
// 引入 composition api && pinia store
import { ref, computed } from '@nuxtjs/composition-api'
import { todoStore } from '@/stores/todos.js'
export default {
  name: 'IndexPage',
  setup() {
    // 宣告 pinia store
    const todoPinia = todoStore()
    
    // 使用 computed 和 pinia 的 getters 雙向綁定
    let filterTodos = computed(() => {
      switch(selectTab.value) {
        case '全部':
          return todoPinia.todoListGetter
        case '未完成':
          return todoPinia.todoListGetter.filter((item) => !item.isCompleted)
        case '已完成':
          return todoPinia.todoListGetter.filter((item) => item.isCompleted)
      }
    })

    const newTodo = ref('')
    const selectTab = ref('全部')

    // 新增 todo
    const addTodo = async () => {
      const newTodoVal = newTodo.value.trim()
      if (!newTodoVal) return
      const todo = {
        id: Date.now(),
        title: newTodo.value,
        isCompleted: false
      }
      // 使用 pinia 的 actions
      await todoPinia.addTodo(todo)
      .then((res) => {
        console.log(res)
        newTodo.value = ''
      })
      .catch((err) => console.log(err))
    }

    // 刪除 todo
    const deleteTodo = async (id) => {
      // 使用 pinia 的 actions
      await todoPinia.deleteTodo(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    }

    return {
      filterTodos,
      addTodo,
      newTodo,
      deleteTodo,
      selectTab
    }
  }
}
</script>
