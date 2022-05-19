<template>
  <base-layout :ready="!isLoading">
    <div class="books-library">
      <div class="books-wrapper">
        <div class="book" v-for="book in books" :key="book.id">
          <div class="book-description">
            <router-link :to="'/book/' + book.id">
              <img :src="getCover(book.resources)">
              <span>{{ book.title }}</span>
            </router-link>
            <span class="heart" @click="toggleFavourite(book.id)" :class="{ liked: isLiked(book.id) }">
              <font-awesome-icon icon="fa-solid fa-heart" />
            </span>
          </div>
        </div>
      </div>
      <div class="paginator">
        <div v-for="i in 11" :key="i" class="page-button" :class="{ active: i + page - 6 === page }">
          <router-link
            v-if="i + page - 6 > 0 && i + page - 6 < numOfPages + 1"
            :to="'/books?page=' + (i + page - 6)">
            {{ page - 6 + i }}
          </router-link>
        </div>
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
  name: 'BooksLibrary',
  components: {
    BaseLayout
  },
  data () {
    return {
      books: [] ,
      page: 1,
      maxBooks: 0,
      isLoading: true
    }
  },

  computed: {
    numOfPages () {
      return Math.floor(this.maxBooks / 10)
    }
  },

  watch: {
    '$route'() {
      this.isLoading = true

      if(this.$route.query.page) {
        this.page = parseInt(this.$route.query.page)
      }

      this.fetchBooks()
    }
  },

  mounted () {
    if(this.$route.query.page) {
      this.page = parseInt(this.$route.query.page)
    }

    this.fetchBooks()
  },

  methods: {
    fetchBooks () {
      const apiUrl = 'https://gnikdroy.pythonanywhere.com/api/book/'

      axios.get(`${apiUrl}?page=${this.page}`)
        .then(res => {
          this.books = res.data.results
          this.maxBooks = res.data.count
        })
        .finally(() => { this.isLoading = false })
    },

    toggleFavourite (id) {
      const likedBooks = JSON.parse(localStorage.getItem('favourites')) || []
      const index = likedBooks.indexOf(id)
      if(index === -1) {
        likedBooks.push(id)
      } else {
        likedBooks.splice(index, 1)
      }

      localStorage.setItem('favourites', JSON.stringify(likedBooks))
      this.$forceUpdate();
    },

    isLiked (id) {
      if(localStorage.getItem('favourites')) {
        const likedBooks = JSON.parse(localStorage.getItem('favourites'))
        return likedBooks.some(key => key === id)
      }

      return false
    },

    getCover (resources) {
      const coverFilter = resources.filter(key => {
        return /cover\.small/g.test(key.uri)
      })
      
      if(coverFilter.length > 0)
        return coverFilter[0].uri
      else
        return 'https://via.placeholder.com/66x99?text=No+cover'
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.books-wrapper {
  .book {
    border-bottom: solid 1px $lightGray;
    padding: 1rem 0;

    .book-description {
      display: flex;
      a {
        display: flex;
        gap: 12px;
        align-items: flex-start;
      }

      .heart {
        vertical-align: top;
        color: $lightGray;
        cursor: pointer;
        margin-left: .5rem;

        &:hover, &.liked {
          color: red;
        }
      }
    }
  }
}

.paginator {
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0;
  overflow-x: scroll;
  width: 100%;

  .page-button {
    width: 32px;

    &.active a {
      border-bottom-color: $mainColor;
    }

    a {
      color: #000;
      font-size: 18px;
      display: block;
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: solid 3px $lightGray;
    }
  }
}
</style>