<template>
  <div class="content-grid content-grid--light">
    <v-card class="mx-auto" max-width="500">
      <div class="detail">
        <v-row dense>
          <v-col v-if="planet">
            <v-card>
              <div class="personaje">
                <img
                  class="d-block w-100"
                  :src="
                    require('@/assets/img/planets/' +
                      getIdFromUrl(planet.url) +
                      '.jpg')
                  "
                  :alt="planet.name"
                />
                <v-card-title v-text="planet.name"></v-card-title>
              </div>
              <div class="link">
                <p>
                  Rotation Period:
                  <span class="text">{{ planet.rotation_period }}</span>
                </p>
                <p>
                  Orbital Period:
                  <span class="text">{{ planet.orbital_period }}</span>
                </p>
                <p>
                  Diameter:
                  <span class="text">{{ planet.diameter }}</span>
                </p>
                <p>
                  Climate:
                  <span class="text">{{ planet.climate }}</span>
                </p>
                <p>
                  Gravity:
                  <span class="text">{{ planet.gravity }}</span>
                </p>
                <p>
                  Terrain:
                  <span class="text">{{ planet.terrain }}</span>
                </p>
                <p>
                  Surface Water:
                  <span class="text">{{ planet.surface_water }}</span>
                </p>
                <p>
                  Population:
                  <span class="text">{{ planet.population }}</span>
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
      planet: null
    };
  },
  methods: {
    getData() {
      var that = this;
      axios
        .get("https://swapi.dev/api/planets/" + this.id + "/")
        .then(function(response) {
          that.planet = response.data;
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
