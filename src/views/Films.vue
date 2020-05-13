<template>
  <div class="content-grid content-grid--light">
    <div>
      <form class="buscar" role="search" method="get" id="searchform" action>
        <label for="s">
          <i class="mdi mdi-magnify"></i>
        </label>
        <input type="text" value v-model="search" placeholder="search" class id="s" />
      </form>
      <section v-if="errored">
        <p>
          Sorry, it is not possible to get the information at this time, please
          try again later..
        </p>
      </section>

      <section v-else>
        <div class="loader" v-if="loading">
          <svg width="200" height="200" viewBox="0 0 40 60">
            <polygon
              class="triangle"
              fill="none"
              stroke="#fff"
              stroke-width="1"
              points="16,1 32,32 1,32"
            />
            <text class="loading" x="0" y="45" fill="#fff">Loading...</text>
          </svg>
        </div>
        <div class="container">
          <router-link
            :to="{
              name: 'DetailFilms',
              params: { id: getIdFromUrl(film.url) }
            }"
            v-for="(film, index) in filteredPeople"
            :key="index.id"
          >
            <div class="card">
              <div class="d-flex child-flex">
                <img
                  class="d-block w-100"
                  :src="
                    require('@/assets/img/films/' +
                      getIdFromUrl(film.url) +
                      '.jpg')
                  "
                />
              </div>
            </div>

            <p>Episode {{ film.episode_id }}: {{ film.title }}</p>
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],

  data() {
    return {
      films: [],
      search: "",
      loading: true,
      errored: false
    };
  },
  methods: {
    getData() {
      axios
        .get("https://swapi.dev/api/films?page=" + this.id)
        .then(response => {
          this.films = response.data.results;
        })
        .catch(error => {
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    getIdFromUrl(value) {
      var id = value.match(/([0-9])+/g);
      id = id[0];
      return id;
    },
    back() {
      this.$router.go(-1);
    }
  },
  computed: {
    filteredPeople() {
      return this.films.filter(person => {
        return person.title.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },

  mounted() {
    this.getData();
  }
};
</script>

<style></style>
