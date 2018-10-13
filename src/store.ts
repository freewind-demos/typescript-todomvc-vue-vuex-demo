import Vuex, {Store} from 'vuex'
import Vue from 'vue'
import {createActions, createGetters, createMutations} from '@/vuex-type-helpers';

Vue.use(Vuex);

export type TodoItem = {
  content: string,
  completed: boolean,
}

export type State = {
  todos: TodoItem[]
}

const state = {
  todos: []
};

const mutations = {
  init(state: State) {
    state.todos = [
      {content: "sdfsf", completed: true},
      {content: "wefsdf", completed: false},
      {content: "2fsdf89", completed: false}
    ]
  },
  removeTodo(state: State, index: number) {
    state.todos.splice(index, 1)
  },
  addTodo(state: State, todo: TodoItem) {
    state.todos.push(todo)
  },
  updateTodo(state: State, payload: {index: number, newTodo: TodoItem}) {
    state.todos.splice(payload.index, 1, payload.newTodo)
  },
  clearCompleted(state: State) {
    state.todos = state.todos.filter(it => !it.completed)
  },
  toggleAll(state: State) {
    if (state.todos.every(it => it.completed)) {
      state.todos.forEach(it => it.completed = false)
    } else {
      state.todos.forEach(it => it.completed = true)
    }
  },
  toggleTodo(state: State, index: number) {
    state.todos[index].completed = !state.todos[index].completed
  }
};

const getters = {
  todos(state: State) {
    return state.todos;
  }
};

const actions = {};

const store = new Store({
  strict: true,
  state,
  getters,
  mutations,
  actions
});

export default store;

export function typedStore(store: Store<State>) {
  return {
    commit: createMutations<State, typeof mutations>(store, mutations),
    getters: createGetters<State, typeof getters>(store, getters),
    dispatch: createActions<State, typeof actions>(store, actions),
  };
}
