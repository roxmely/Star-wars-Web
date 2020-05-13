<template>
  <div class="content-grid content-grid--light">
    <div class="container">
      <div class="card">
        <div class="d-flex child-flex">
          <router-link to="/pages/1">
            <img
              src="https://3.bp.blogspot.com/-x9QJHrtgWP8/Wx1Cg-qmO4I/AAAAAAAACVg/fjyKtZhIosIrgidWRXiY5ll73EpFetpoQCLcBGAs/s1600/Dark%2BMaul.jpg"
            />
            Characters
          </router-link>
        </div>
      </div>

      <div class="card">
        <div class="d-flex child-flex">
          <router-link to="/films/page=1">
            <img
              src="https://www.phoenix.org.uk//content/uploads/2019/11/1384881-1200x600-c-default.jpg"
            />
            Films
          </router-link>
        </div>
      </div>

      <div class="card">
        <div class="d-flex child-flex">
          <router-link to="/species/page=1">
            <img
              src="https://i2.wp.com/zyteheist.com/wp-content/uploads/2017/12/star-wars-battlefront-species-1280jpg-c74ff0_1280w.jpg?resize=900%2C506&ssl=1"
            />
            Species
          </router-link>
        </div>
      </div>

      <div class="card">
        <div class="d-flex child-flex">
          <router-link to="/starships/page=1">
            <img
              src="https://cdnb.artstation.com/p/assets/images/images/016/218/793/large/alexis-bacuet-wallpaper.jpg?1551354428"
            />
            Starships
          </router-link>
        </div>
      </div>

      <div class="card">
        <div class="d-flex child-flex">
          <router-link to="/planets/page=1">
            <img
              src="https://resize.hswstatic.com/w_907/gif/now-yY5JMxbd-planetaryexplosion_peopleimagesdotcojpg-1210-680.jpg"
            />
            Planets
          </router-link>
        </div>
      </div>

      <div class="card">
        <div class="d-flex child-flex">
          <router-link to="/vehicles/page=1">
            <img
              src="https://lumiere-a.akamaihd.net/v1/images/image_ba7e8b9d.jpeg?region=0%2C0%2C1920%2C1080&width=960"
            />
            Vehicles
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 1000px !important;
  margin-top: 80px;
}

.container a {
  text-align: center;
  margin: 5px !important;
}
.d-flex {
  align-items: center;
}
.d-flex img {
  width: 93%;
  max-height: 206px;
}
</style>
