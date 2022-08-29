<template>
  <div>
    <div class="content-box">
      <h1 class="maintitle">Daily Planet News</h1>
      <div class="uk-card uk-card-default uk-card-large uk-card-body">
        <h3 class="uk-card-title">{{ this.post.title }}</h3>
          <img :src="'https://loremflickr.com/640/360/' + post.id">
        <div class="post-body">
          <div class="left-col"></div>
          <div class="right-col">
            <div class="font-sans truncate-text">
              <p>{{ this.post.body }}</p>
            </div>
                 <button class="uk-button uk-button-default"
       @click="getBack"
       >Назад</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      post: []
    }
  },
  methods: {
    getBack () {
      this.$router.go(-1)
    },
    async fetchPosts () {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts/' + this.$route.params.id,
          {
            params: {
              //   _page: this.page,
              //   _limit: this.limit
            }
          }
        )

        this.post = response.data
      } catch (e) {
        alert('ошибка')
      }
    }
  },

  mounted () {
    this.fetchPosts()
  }
}
</script>
<style>
.maintitle {
  font-family: 'Libre Baskerville', serif;
}
.post-body {
  display: flex;
  gap: 1rem;
  margin-top: 20px;
  margin-bottom: 20px;
}
.uk-card-title:first-letter {
  text-transform: uppercase
}

.truncate-text p:first-letter {
  text-transform: uppercase
}
</style>
