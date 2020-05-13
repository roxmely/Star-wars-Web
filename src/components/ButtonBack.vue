<template
  ><div class="my-2">
    <!-- <router-link to="/"> -->
    <v-btn class="buttonB" @click="atras" color="#514b4b">BACK</v-btn>
    <!-- </router-link> -->
  </div>
</template>

<script>
export default {
  props: ["back"],
  data() {
    return {};
  },
  methods: {
    atras() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.buttonB {
  height: 25px !important;
  min-width: 50px !important;
}
</style>
