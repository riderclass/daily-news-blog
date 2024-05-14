<template>
  <div class='about'>
    <h1 class="maintitle-nav">Blog page</h1>
  <div class="options-box">
  <form class="uk-search uk-search-default">
  <span uk-search-icon></span>
<input class="uk-search-input" v-model="searchReq" type="search" placeholder="Поиск..."/>
</form>
    <select class="uk-select"
    v-model="selectedSort">
    <option disabled value="">Выберите из списка</option>
        <option
        v-for="option in this.$store.state.sortOptions"
        :key="option.value"
        :value="option.value">
        {{ option.name }}</option>
    </select>
    </div>
  <div class="postBox">
    <div class='post' v-for='post in this.sortedAndSearchedPosts' :key='post.id'>
      <h2 @click='$router.push({ path: `/posts/${post.id}` })' class="size">{{ post.title }}</h2>
        <img :src="'https://loremflickr.com/640/360/' + post.id" rel="preload">
      <p class="truncate-text">{{ post.body }}</p>
      <div class="btn-block">
      <button
        @click='$router.push({ path: `/posts/${post.id}` })'
        class='uk-button uk-button-default'
      >
        Подробнее
      </button>
        <button
        @click='addLike(post)'
        :class="{
        'favorite-page': post.like === true
         }"
        class='like-btn'
      >
      Добавить
      </button>
      </div>
    </div>
  </div>
    <my-pagination
      :totalPages='this.$store.state.totalNumber'
      :perPage='6'
      :currentPage='this.$store.state.currentNum'
      @pagechanged='onPageChange'
    />
  </div>
</template>
<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import MyPagination from '@/components/MyPagination.vue'

export default {
  components: {
    MyPagination
  },
  setup () {
    const store = useStore()
    onMounted(() => {
      store.dispatch('fetchPosts', store.state.currentNum)
    })

    return {
      getData: computed(() => store.state.someData),
      increment: () => store.commit('increment'),
      addLike: (post) => store.commit('addLike', post)
    }
  },
  data () {
    return {
      currentPage: this.$store.state.currentNum,
      searchReq: '',
      selectedSort: ''
    }
  },
  methods: {
    onPageChange (page) {
      this.currentPage = page
      this.$store.dispatch('fetchPosts', page)
      this.$store.commit('changeCurrentNum', page)
    }
  },
  computed: {
    sortedPosts () {
      return [...this.$store.state.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      )
    },
    sortedAndSearchedPosts () {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchReq.toLowerCase())
      )
    }
  }
}
</script>
<style>
.postBox {
  grid-template-columns: 30% 30% 30%;
  display: grid;
  gap: 2rem;
  margin-bottom: 40px;
}
.options-box {
  display: flex;
  margin-bottom: 40px;
}
.btn-block {
  display:flex;
}
.pagination-item button {
  background: white;
  color:black;
  cursor: pointer;
  text-transform: uppercase;
}
.uk-search-default {
    flex: 7;
    min-width: 240px;
}
.uk-select {
        flex: 2;
}
.size {
  white-space: nowrap; /* Отменяем перенос текста */
  overflow: hidden; /* Обрезаем содержимое */
  padding: 5px; /* Поля */
  text-overflow: ellipsis; /* Многоточие */
}
.size:hover {
  background: #f0f0f0; /* Цвет фона */
  white-space: normal; /* Обычный перенос текста */
  cursor: pointer;
}

.truncate-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.3em;
  height: 3.9em;
}

.size::first-letter {
    text-transform: uppercase;
}

.truncate-text p:first-letter {
    text-transform: uppercase;
}

.maintitle-nav {
  font-family: 'Libre Baskerville', serif;
  text-align: left;
}
.like-btn {
    background: white;
    border: 1px solid whitesmoke;
    cursor: pointer;
    color: #676767;
    margin: 0;
    border: none;
    overflow: visible;
    font: inherit;
    color: inherit;
    text-transform: none;
    -webkit-appearance: none;
    border-radius: 0;
    display: inline-block;
    box-sizing: border-box;
    padding: 0 30px;
    vertical-align: middle;
    font-size: .875rem;
    line-height: 38px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    transition: .1s ease-in-out;
    transition-property: color,background-color,border-color;
    border: 1px solid #ededed;
}
.favorite-page {
  background: #ff7474 !important;
  color: white !important;
  border: 1px solid #ff7474 !important;
}
</style>
