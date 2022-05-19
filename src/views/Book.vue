<template>
  <base-layout :ready="!isLoading">
    <div class="book-wrapper">
      <img :src="book.formats['image/jpeg']" :alt="book.title + 'cover'">
      <h1 class="book-title">{{ book.title }}</h1>
      <span class="heart" @click="toggleFavourite" :class="{ liked }">
        <font-awesome-icon icon="fa-solid fa-heart" />
      </span>
      <div class="read-online">
        <p>Read book online:</p>
        <iframe :src="book.formats['text/html']" :title="book.title"></iframe>
      </div>
    </div>
  </base-layout>
</template>

<script>
import axios from 'axios'
import BaseLayout from '@/layouts/BaseLayout.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

library.add(faHeart)

export default {
  name: 'Book',
  components: {
    BaseLayout
  },
  data () {
    return {
      bookId: 0,
      book: null,
      isLoading: true,
      liked: false
    }
  },

  watch: {
    '$route'() {
      this.isLoading = true

      if(this.$route.params.id) {
        this.bookId = parseInt(this.$route.params.id)
      }

      this.fetchBook()
    }
  },

  mounted () {
    if(this.$route.params.id) {
      this.bookId = parseInt(this.$route.params.id)
    }

    if(localStorage.getItem('favourites')) {
      const likedBooks = JSON.parse(localStorage.getItem('favourites'))
      this.liked = likedBooks.some(key => key === this.bookId)
    }

    this.fetchBook()
  },

  methods: {
    fetchBook () {
      const apiUrl = 'https://gutendex.com/books/'

      axios.get(`${apiUrl}?ids=${this.bookId}`)
        .then(res => {
          this.book = res.data.results[0]
        })
        .finally(() => { this.isLoading = false })
    },

    toggleFavourite () {
      const likedBooks = JSON.parse(localStorage.getItem('favourites')) || []
      if(!this.liked) {
        likedBooks.push(this.bookId)
      } else {
        const index = likedBooks.indexOf(this.bookId)
        likedBooks.splice(index, 1)
      }

      localStorage.setItem('favourites', JSON.stringify(likedBooks))

      this.liked = !this.liked
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.book-wrapper {
  .book-title {
    display: inline;
    vertical-align: top;
    margin-left: 1rem;
  }

  .heart {
    vertical-align: top;
    color: $lightGray;
    cursor: pointer;

    &:hover, &.liked {
      color: red;
    }
  }

  iframe {
    width: 768px;
    height: 480px;
  }
}
</style>