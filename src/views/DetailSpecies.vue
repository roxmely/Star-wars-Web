<template>
  <div class="content-grid content-grid--light">
    <v-card class="mx-auto" max-width="500">
      <div class="detail">
        <v-row dense>
          <v-col v-if="specie">
            <v-card>
              <div class="personaje">
                <img
                  class="d-block w-100"
                  :src="require('@/assets/img/species/' + getIdFromUrl(specie.url) + '.jpg')"
                  :alt="specie.name"
                />
                <v-card-title v-text="specie.name"></v-card-title>
              </div>
              <div class="link">
                <p>
                  Classification:
                  <span class="text">{{ specie.classification }}</span>
                </p>
                <p>
                  Designation:
                  <span class="text">{{ specie.designation }}</span>
                </p>
                <p>
                  Average Height:
                  <span class="text">{{ specie.average_height }}</span>
                </p>
                <p>
                  Skin Colors:
                  <span class="text">{{ specie.skin_colors }}</span>
                </p>
                <p>
                  Hair Colors:
                  <span class="text">{{ specie.hair_colors }}</span>
                </p>
                <p>
                  Eye Colors:
                  <span class="text">{{ specie.eye_colors }}</span>
                </p>
                <p>
                  Average Lifespan:
                  <span class="text">{{ specie.average_lifespan }}</span>
                </p>
                <p>
                  Language:
                  <span class="text">{{ specie.language }}</span>
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
      specie: null
    };
  },
  methods: {
    getData() {
      axios
        .get("https://swapi.dev/api/species/" + this.id + "/")
        .then(response => {
          this.specie = response.data;
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

<style scoped >
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

