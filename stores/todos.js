import { defineStore } from 'pinia'

export const todoStore = defineStore('todoStore', {

  // 類似 data
  state: () => {
    return {
      todoList: [
        {id: 1, title: 'pinia 預設 title', isCompleted: false}
      ]
    }
  },

  // 類似 computed
  getters: {
    todoListGetter: (state) => state.todoList
  },

  // 類似 methods
  actions: {
    async addTodo (todo) {
      return await new Promise((res, rej) => {
        try {
          this.todoList.push(todo)
          res('success')
        } catch (error) {
          rej('error')
        }
      })
    },
    async deleteTodo (id) {
      return await new Promise((res, rej) => {
        try {
          this.todoList = this.todoList.filter((item) => item.id !== id)
          res('success')
        } catch (error) {
          rej('error')
        }
      })
    }
  }
})