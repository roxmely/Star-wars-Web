<template>
  <div class="content-grid content-grid--light">
    <v-card class="mx-auto" max-width="500">
      <div class="detail">
        <v-row dense>
          <v-col v-if="film">
            <v-card>
              <div class="personaje">
                <img
                  class="d-block w-100"
                  :src="
                    require('@/assets/img/films/' +
                      getIdFromUrl(film.url) +
                      '.jpg')
                  "
                  :alt="film.title"
                />
                <v-card-title v-text="Episode">{{ film.episode_id }}: {{ film.title }}</v-card-title>
              </div>
              <div class="link">
                <p>
                  Date Created:
                  <span class="text">{{ film.release_date }}</span>
                </p>
                <p>
                  Director:
                  <span class="text">{{ film.director }}</span>
                </p>
                <p>
                  Producer(s):
                  <span class="text">{{ film.producer }}</span>
                </p>
                <p>
                  Opening Crawl:
                  <span class="text">{{ film.opening_crawl }}</span>
                </p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],

  data() {
    return {
      film: null
    };
  },
  methods: {
    getData() {
      axios.get("https://swapi.dev/api/films/" + this.id).then(response => {
        this.film = response.data;
      });
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

  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
.link p {
  color: black !important;
}
.text {
  font-size: small;
}
.v-card__title {
  color: black !important;
}
.v-card__title p {
  color: black !important;
}
.spacer {
  display: flex !important;
  flex-flow: column !important;
  align-items: baseline !important;
}
.spacer p {
  display: flex;
  align-items: center;
  font-size: small;
}
p {
  color: black !important;
}
h3 {
  color: black;
  text-align: start;
}
.personaje img {
  width: 50% !important;
  margin: auto !important;
  padding-top: 40px;
}
.v-card__actions {
  margin-left: 40px;
}
</style>
