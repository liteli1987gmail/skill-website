<template>
  <div id="slide">
    <swiper :options="option">
      <swiper-slide v-for="slide in expList">
        <template v-if="slide.customUrl.indexOf('http') > -1">
          <a :href="slide.customUrl">
            <div class="exp_box">
              <div class="exp_img">
                <img :src="slide.photo" alt="">
              </div>
              <p v-html="slide.name"></p>
            </div>
          </a>
        </template>
        <template v-else>
          <router-link :to="`/m${slide.customUrl}`">
            <div class="exp_box">
              <div class="exp_img">
                <img :src="slide.photo" alt="">
              </div>
              <p v-html="slide.name"></p>
            </div>
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
    name: "slide",
    props: ['expList'],
    data() {
      return {
        option: {
          slidesPerView: 2.3,
          spaceBetween: '5%',
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .swiper-container {
    padding: 0 0 20px 5%;
  }

  .exp_box {
    width: 100%;
    background: #ffffff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    overflow: hidden;
    -webkit-box-shadow: 0px 11px 16px 0px rgba(7, 0, 2, 0.08);
    -moz-box-shadow: 0px 11px 16px 0px rgba(7, 0, 2, 0.08);
    box-shadow: 0px 11px 16px 0px rgba(7, 0, 2, 0.08);
    .exp_img {
      min-height: 50px;
      font-size: 20px;
      height: 8.5em;
      background: #cccccc;
    }
    p {
      font-size: 18px;
      color: #333333;
      text-align: center;
      padding: 10px 0;
    }
  }
</style>
