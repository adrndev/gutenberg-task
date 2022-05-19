<template>
  <div class="search-wrapper">
    <div class="input-wrapper" :class="{ focus: inputFocused }">
      <font-awesome-icon class="icon" icon="fa-solid fa-magnifying-glass" />
      <input
        class="search-input"
        type="search"
        v-model="searchQuery"
        ref="searchInput"
        @focus="inputFocused = true"
        @input="handleInput" />

      <div v-if="isLoading" class="loading-wrapper">
        <div class="loading-indicator"></div>
      </div>
    </div>

    <div v-if="items.length > 0" class="search-results">
      <div class="search-item" v-for="item in items" :key="item.id">
        <router-link @click.native="inputFocused = false" :to="'/book/' + item.id">{{ item.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass)

export default {
  name: 'SearchInput',
  data () {
    return {
      searchQuery: '',
      searchTimeout: null,
      items: [],
      isLoading: false,
      inputFocused: false
    }
  },

  watch: {
    searchQuery () {
      this.items = []
    }
  },

  methods: {
    handleInput () {
      if(this.searchQuery.length === 0) return

      if(this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      this.isLoading = true

      this.searchTimeout = setTimeout(this.fetchBooks, 500)
    },

    fetchBooks () {
      const apiUrl = 'https://gnikdroy.pythonanywhere.com/api/book/'

      axios.get(`${apiUrl}?title_contains=${this.searchQuery}`)
        .then(res => {
          this.items = res.data.results
        })
        .finally(() => { this.isLoading = false })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.search-wrapper {
  position: relative;
  font-size: 18px;
  width: 420px;

  .input-wrapper {
    border-radius: 12px;
    border: solid 1px $lightGray;
    position: relative;
    overflow: hidden;
    width: 100%;

    &.focus {
      border-color: $mainColor;

      & + .search-results {
        display: block;
      }
    }

    .icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }

    .search-input {
      padding: 12px;
      border: none;
      padding-left: 2.5rem;
      font-size: 18px;
      width: 100%;

      &:focus {
        outline: none;
      }
    }
  }

  .loading-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 4px;
    position: absolute;
    bottom: 0;
    left: 0;

    .loading-indicator {
      height: inherit;
      background-color: $mainDark;
      animation: inputLoading 2s infinite;
    }
  }

  .search-results {
    display: none;
    position: absolute;
    top: calc(100% - 1px);
    border: solid 1px $lightGray;
    width: 100%;
    max-height: 276px;
    overflow-y: scroll;
    border-radius: 12px;
    overflow-y: scroll;

    .search-item {
      transition: background-color .3s;
      background: #fff;

      a {
        padding: 12px;
        display: block;
        color: #000;
        text-decoration: none;
        text-overflow: ellipsis;
        overflow-x: hidden;
        white-space: nowrap;
      }

      &:not(:first-child) {
        border-top: solid 1px $lightGray;
      }

      &:hover {
        background-color: #cfcfcf;
      }
    }
  }
}

@keyframes inputLoading {
  from {
    width: 0;
    margin-left: 0;
  }

  to {
    width: 100%;
    margin-left: 100%;
  }
}
</style>