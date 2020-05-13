<template>
  <div class="content-grid content-grid--light">
    <div>
      <form class="buscar" role="search" method="get" id="searchform" action>
        <label for="s">
          <i class="mdi mdi-magnify"></i>
        </label>
        <input type="text" value v-model="search" placeholder="search" class id="s" />
      </form>
      <div class="button">
        <div>
          <v-btn text small>
            <router-link
              style="text-decoration: none"
              v-if="id >= '2'"
              :to="'/starships/page=' + (Number(id) - 1)"
              class="button back"
            >Back</router-link>
          </v-btn>
        </div>
        <div>
          <v-btn text small>
            <router-link
              v-if="id <= '3'"
              :to="'/starships/page=' + (Number(id) + 1)"
              class="button next"
            >Next</router-link>
          </v-btn>
        </div>
      </div>
      <section v-if="errored">
        <p>
          Sorry, it is not possible to get the information at this time, please
          try again later
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
              name: 'DetailStarships',
              params: { id: getIdFromUrl(starship.url) }
            }"
            v-for="(starship, index) in filteredPeople"
            :key="index"
          >
            <div class="card">
              <div class="d-flex child-flex">
                <img
                  class="d-block w-100"
                  :src="
                    require('@/assets/img/starships/' +
                      getIdFromUrl(starship.url) +
                      '.jpg')
                  "
                />
              </div>
            </div>
            <p>{{ starship.name }}}</p>
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
      starships: [],
      search: "",
      loading: true,
      errored: false
    };
  },
  methods: {
    getData() {
      axios
        .get("https://swapi.dev/api/starships/?page=" + this.id)
        .then(response => {
          this.starships = response.data.results;
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
      return this.starships.filter(person => {
        return person.name.toLowerCase().match(this.search.toLowerCase());
      });
    }
  },
  watch: {
    id() {
      this.getData();
    }
  },

  mounted() {
    this.getData();
  }

  // methods: {
  //   back() {
  //     this.$router.go(-1);
  //   },
  //   next() {
  //     this.$router.go(1);
  //   }
  // }
};
</script>

<style></style>
