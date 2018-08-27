<template>
  <div id="banner">
    <swiper :options="option">
      <swiper-slide v-for="slide in swiperSlides">
        <template v-if="slide.customUrl.indexOf('http') > -1">
          <a :href="slide.customUrl">
            <img :src="slide.photo" alt="">
          </a>
        </template>
        <template v-else>
          <router-link :to="`/m${slide.customUrl}`">
            <img :src="slide.photo" alt="">
          </router-link>
        </template>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: "banner",
    props: ['swiperSlides'],
    data() {
      return {
        option: {
          autoplay: true,
          loop: true
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped>

</style>
