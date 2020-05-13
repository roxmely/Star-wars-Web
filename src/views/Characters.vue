<template>
  <div class="content-grid content-grid--light">
    <v-card class="mx-auto" max-width="500">
      <div class="detail">
        <v-row dense>
          <v-col v-if="people">
            <v-card>
              <div class="personaje">
                <img
                  class="d-block w-100"
                  v-bind:src="
                    require('@/assets/img/characters/' +
                      getIdFromUrl(people.url) +
                      '.jpg')
                  "
                  :alt="people.name"
                />
                <v-card-title v-text="people.name"></v-card-title>
              </div>
              <div class="link">
                <p>
                  Birth Year:
                  <span class="text">{{ people.birth_year }}</span>
                </p>
                <p>
                  Gender:
                  <span class="text">{{ people.gender }}</span>
                </p>
                <p>
                  Height:
                  <span class="text">{{ people.height }}</span>
                </p>
                <p>
                  Mass:
                  <span class="text">{{ people.mass }}</span>
                </p>
                <p>
                  Hair Color:
                  <span class="text">{{ people.hair_color }}</span>
                </p>
                <p>
                  Skin Color:
                  <span class="text">{{ people.skin_color }}</span>
                </p>
                <p>
                  Eye Color:
                  <span class="text">{{ people.eye_color }}</span>
                </p>
              </div>
              <v-card-actions>
                <v-spacer>
                  <h3>Specie</h3>
                  <br />
                  <router-link
                    :to="{
                      name: 'DetailSpecies',
                      params: { id: getIdFromUrl(specie.url) }
                    }"
                    v-for="(specie, index) in species"
                    :key="index.id"
                  >
                    <p>
                      <v-avatar size="36px">
                        <img
                          class="d-block w-100"
                          v-bind:src="
                            require('@/assets/img/species/' +
                              getIdFromUrl(specie.url) +
                              '.jpg')
                          "
                          :alt="specie.name"
                        />
                      </v-avatar>
                    </p>
                    <p>{{ specie.name }}</p>
                  </router-link>
                </v-spacer>
              </v-card-actions>
              <v-card-actions>
                <v-spacer>
                  <h3>Films</h3>
                  <br />
                  <router-link
                    :to="{
                      name: 'DetailFilms',
                      params: { id: getIdFromUrl(film.url) }
                    }"
                    v-for="(film, index) of films"
                    :key="index.id"
                  >
                    <p>
                      <v-avatar size="36px">
                        <img
                          class="d-block w-100"
                          v-bind:src="
                            require('@/assets/img/films/' +
                              getIdFromUrl(film.url) +
                              '.jpg')
                          "
                          :alt="film.title"
                        />
                      </v-avatar>
                    </p>
                    <p>Episode {{ film.episode_id }}: {{ film.title }}</p>
                  </router-link>
                </v-spacer>
              </v-card-actions>
              <v-card-actions>
                <v-spacer>
                  <h3>Vehicles</h3>
                  <br />
                  <router-link
                    :to="{
                      name: 'DetailVehicles',
                      params: { id: getIdFromUrl(vehicle.url) }
                    }"
                    v-for="(vehicle, index) of vehicles"
                    :key="index.id"
                  >
                    <p>
                      <v-avatar size="36px">
                        <img
                          class="d-block w-100"
                          v-bind:src="
                            require('@/assets/img/vehicles/' +
                              getIdFromUrl(vehicle.url) +
                              '.jpg')
                          "
                          :alt="vehicle.title"
                        />
                      </v-avatar>
                    </p>
                    <p>{{ vehicle.name }}</p>
                  </router-link>
                </v-spacer>
              </v-card-actions>
              <v-card-actions>
                <v-spacer>
                  <h3>Starships</h3>
                  <br />
                  <router-link
                    :to="{
                      name: 'DetailStarships',
                      params: { id: getIdFromUrl(starship.url) }
                    }"
                    v-for="(starship, index) in starships"
                    :key="index.id"
                  >
                    <p>
                      <v-avatar size="36px">
                        <img
                          class="d-block w-100"
                          v-bind:src="
                            require('@/assets/img/starships/' +
                              getIdFromUrl(starship.url) +
                              '.jpg')
                          "
                          :alt="starship.title"
                        />
                      </v-avatar>
                    </p>
                    <p>{{ starship.name }}</p>
                  </router-link>
                </v-spacer>
              </v-card-actions>
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
      people: null,
      films: [],
      species: [],
      vehicles: [],
      starships: []
    };
  },

  methods: {
    getData() {
      // var that = this;

      axios
        .get("https://swapi.dev/api/people/" + this.id + "/")
        .then(response => {
          this.people = response.data;
          for (var i = 0; i < this.people.films.length; i++) {
            this.getFilmsInfo(this.people.films[i]);
          }
          for (var i = 0; i < this.people.species.length; i++) {
            this.getSpeciesInfo(this.people.species[i]);
          }
          for (var i = 0; i < this.people.vehicles.length; i++) {
            this.getVehiclesInfo(this.people.vehicles[i]);
          }
          for (var i = 0; i < this.people.starships.length; i++) {
            this.getStarshipsInfo(this.people.starships[i]);
          }
        });
    },
    getIdFromUrl(value) {
      var id = value.match(/([0-9])+/g);
      id = id[0];
      return id;
    },
    getFilmsInfo(film) {
      axios(film).then(result => {
        this.films.push(result.data);
      });
    },
    getSpeciesInfo(specie) {
      axios(specie).then(result => {
        this.species.push(result.data);
      });
    },
    getVehiclesInfo(vehicle) {
      axios(vehicle).then(result => {
        this.vehicles.push(result.data);
      });
    },
    getStarshipsInfo(starship) {
      axios(starship).then(result => {
        this.starships.push(result.data);
      });
    },
    back() {
      this.$router.go(-1);
    }
  },
  mounted: function() {
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
