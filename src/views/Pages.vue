<template>
  <div class="content-grid content-grid--light">
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
            v-if="pageNum >= '2'"
            :to="'/pages/' + (Number(pageNum) - 1)"
            class="button back"
          >Back</router-link>
        </v-btn>
      </div>
      <div>
        <v-btn text small>
          <router-link
            v-if="pageNum <= '7'"
            :to="'/pages/' + (Number(pageNum) + 1)"
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
          style="text-decoration: none;"
          :to="{
            name: 'Characters',
            params: { id: getIdFromUrl(page.url) }
          }"
          v-for="(page, index) in filteredPeople"
          :key="index.id"
        >
          <div class="card">
            <div class="d-flex child-flex">
              <img
                v-bind:src="
                  require('@/assets/img/characters/' +
                    getIdFromUrl(page.url) +
                    '.jpg')
                "
                :alt="page.name"
              />
            </div>
          </div>
          <p>{{ page.name }}</p>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["pageNum"],
  data() {
    return {
      pages: [],
      search: "",
      loading: true,
      errored: false
    };
  },
  methods: {
    getData() {
      axios
        .get("https://swapi.dev/api/people/?page=" + this.pageNum)
        .then(response => {
          this.pages = response.data.results;
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
      return this.pages.filter(person => {
        return person.name.toLowerCase().match(this.search.toLowerCase());
        this.search = "";
      });
    }
  },
  watch: {
    pageNum() {
      this.getData();
    }
  },

  mounted() {
    this.getData();
  }
};
</script>

<style>
p {
  text-align: center !important;
}
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1000px !important;
  margin-top: 80px;
}
.container a {
  text-align: center;
  margin: 5px !important;
}

.d-flex {
  align-items: center;
  justify-content: center !important;
}
.d-flex img {
  width: 60%;
}

p {
  color: wheat !important;
}
.triangle {
  stroke: #0eb4db;
  stroke-dasharray: 17;
  animation: dash 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
}
</style>
