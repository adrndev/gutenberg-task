<template>
  <div id="app">
    <div class="header">
      <div class="navbar">
        <nav class="main-menu">
          <router-link to="/">Home</router-link>
          <router-link to="/books">Books</router-link>
          <router-link to="/favourites">Favourites</router-link>
        </nav>
        <SearchInput />
      </div>
    </div>
    <keep-alive include="BooksLibrary">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import SearchInput from '@/components/SearchInput.vue'

export default {
  components: {
    SearchInput
  }
}
</script>


<style lang="scss">
@import '@/assets/scss/_variables.scss';

body {
  margin: 0;
}

#app {
  font-family: 'Roboto', sans-serif;
}

.header {
  background-color: $mainColor;
  padding: 1rem 2rem;

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .main-menu {
      color: #fff;
      font-size: 18px;

      a {
        color: inherit;
        padding: 8px;

        &:hover {
          background: $mainDark;
        }
      }
    }
  }
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #fff;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: $mainColor;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: $mainDark;
}
</style>
