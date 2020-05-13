<template>
  <div class="content-grid content-grid--light">
    <v-card class="mx-auto" max-width="500">
      <div class="detail">
        <v-row dense>
          <v-col v-if="vehicles">
            <v-card>
              <div class="personaje">
                <img
                  class="d-block w-100"
                  v-bind:src="
                    require('@/assets/img/vehicles/' +
                      getIdFromUrl(vehicles.url) +
                      '.jpg')
                  "
                  :alt="vehicles.name"
                />

                <v-card-title v-text="vehicles.name"></v-card-title>
              </div>
              <div class="link">
                <p>
                  Model:
                  <span class="text">{{ vehicles.model }}</span>
                </p>
                <p>
                  Manufacturer :
                  <span class="text">{{ vehicles.manufacturer }}</span>
                </p>
                <p>
                  Cost in Credits:
                  <span class="text">{{ vehicles.cost_in_credits }}</span>
                </p>
                <p>
                  Length:
                  <span class="text">{{ vehicles.length }}</span>
                </p>
                <p>
                  Max Atmosphering Speed:
                  <span class="text">
                    {{
                    vehicles.max_atmosphering_speed
                    }}
                  </span>
                </p>
                <p>
                  Crew:
                  <span class="text">{{ vehicles.crew }}</span>
                </p>
                <p>
                  Passengers:
                  <span class="text">{{ vehicles.passengers }}</span>
                </p>
                <p>
                  Cargo Capacity :
                  <span class="text">{{ vehicles.cargo_capacity }}</span>
                </p>
                <p>
                  Consumables:
                  <span class="text">{{ vehicles.consumables }}</span>
                </p>
                <p>
                  Vehicle Class:
                  <span class="text">{{ vehicles.vehicle_class }}</span>
                </p>
                <p>
                  <span class="link">Pilots:</span>
                </p>
              </div>
              <router-link
                :to="{
                  name: 'Characters',
                  params: { id: getIdFromUrl(person.url) }
                }"
                v-for="(person, index) in people"
                :key="index.id"
              >
                <p>
                  <v-avatar size="36px">
                    <img
                      class="d-block w-100"
                      v-bind:src="
                        require('@/assets/img/characters/' +
                          getIdFromUrl(person.url) +
                          '.jpg')
                      "
                      :alt="person.name"
                    />
                  </v-avatar>
                </p>
                <p>{{ person.name }}</p>
              </router-link>
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
      vehicles: null,
      people: []
    };
  },
  methods: {
    getData() {
      axios
        .get("https://swapi.dev/api/vehicles/" + this.id + "/")
        .then(response => {
          this.vehicles = response.data;
          for (var i = 0; i < this.vehicles.pilots.length; i++) {
            this.getPeopleInfo(this.vehicles.pilots[i]);
          }
        });
    },
    getIdFromUrl(value) {
      var id = value.match(/([0-9])+/g);
      id = id[0];
      return id;
    },
    getPeopleInfo(person) {
      axios(person).then(result => {
        this.people.push(result.data);
      });
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
