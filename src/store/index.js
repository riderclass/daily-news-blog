import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    someData: 10,
    posts: [],
    favPosts: [],
    pagelimit: 5,
    currentNum: 1,
    totalNumber: 0,
    searchReq: '',
    selectedSort: '',
    sortOptions: [
      { value: 'title', name: 'По названию' },
      { value: 'body', name: 'По описанию' }
    ]
  },
  getters: {},
  mutations: {
    increment (state, inc) {
      state.someData++
    },
    changeCurrentNum (state, num) {
      state.currentNum = num
    },
    updatePosts (state, [posts, totalPages]) {
      for (let i = 0; i < posts.length; ++i) {
        if (state.favPosts.filter(item => item.id === posts[i].id).length > 0) {
          posts[i].like = true
        }
      }
      state.posts = posts
      state.totalNumber = totalPages
    },
    addLike (state, post) {
      if (state.favPosts.find((item) => item.id === post.id)) {
        post.like = false
        const result = state.favPosts.find((item) => item.id === post.id)
        state.favPosts = state.favPosts.filter((n) => {
          return n !== result
        })
      } else {
        post.like = true
        state.favPosts.push(post)
      }
    }
  },
  actions: {
    async fetchPosts ({ commit }, page) {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: page,
              _limit: 6
            }
          }
        )
        const totalPages = Math.ceil(response.headers['x-total-count'] / 6)
        const posts = response.data
        commit('updatePosts', [posts, totalPages])
      } catch (e) {
        alert('ошибка')
      }
    }
  },
  modules: {}
})
