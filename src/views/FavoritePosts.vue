<template>
  <div class='about'>
    <h1 class="maintitle-nav">Favorite Posts</h1>
  <div v-if="this.$store.state.favPosts.length > 0">
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
    <div class='post' v-for='post in sortedAndSearchedPosts' :key='post.id'>
      <h2 class="size">{{ post.title }}</h2>
        <img :src="'https://loremflickr.com/640/360/' + post.id">
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
        class='uk-button uk-button-default'
      >
       <i class="gg-trash"></i>
      </button>
      </div>
    </div>
    </div>
    <my-pagination
      :totalPages='this.pageCount'
      :perPage='6'
      :currentPage='this.currentPage'
      @pagechanged='onPageChange'
    />
    </div>
    <div class="empty-fav" v-else>Избранное пока не добавлено..</div>
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
    })

    return {
      getData: computed(() => store.state.someData),
      increment: () => store.commit('increment'),
      addLike: (post) => store.commit('addLike', post)
    }
  },
  data () {
    return {
      currentPage: 1,
      searchReq: '',
      selectedSort: ''
    }
  },
  methods: {
    onPageChange (page) {
      this.currentPage = page
    }
  },
  computed: {
    sortedPosts () {
      return [...this.paginatedData].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      )
    },
    sortedAndSearchedPosts () {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchReq.toLowerCase())
      )
    },
    pageCount () {
      const l = this.$store.state.favPosts.length
      const s = 6
      return Math.ceil(l / s)
    },
    paginatedData () {
      const start = (this.currentPage - 1) * 6
      const end = start + 6
      return this.$store.state.favPosts.slice(start, end)
    }
  }
}
</script>
<style>
.empty-fav {
    margin-top:120px;
}
.postBox {
  grid-template-columns: 30% 30% 30%;
  display: grid;
  gap: 2rem;
  margin-bottom: 40px;
}
.maintitle-nav {
  font-family: 'Libre Baskerville', serif;
  text-align: left;
}
.options-box {
  display: flex;
  margin-bottom: 40px;
}
.btn-block {
  display:flex;
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
</style>
