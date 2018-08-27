<template>
  <div id="slider">
    <div class="slider_box row" v-if="list.length > 0">
      <div class="slider_row">
        <div class="slider col-2" v-for="(item,index) in list" ref="sliderBox">
          <div class="slider_item">
            <template v-if="item.customUrl.indexOf('http') > -1">
              <a :href="item.customUrl">
                <div class="slider_img">
                  <img :src="item.photo" alt="">
                </div>
                <h2 v-html="item.name"></h2>
                <p v-html="item.synopsis"></p>
              </a>
            </template>
            <template v-else>
              <router-link :to="item.customUrl">
                <div class="slider_img">
                  <img :src="item.photo" alt="">
                </div>
                <h2 v-html="item.name"></h2>
                <p v-html="item.synopsis"></p>
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
    <button type="button" :disabled="list.length < 3" class="prev" @click="prevSlide"><i
      class="iconfont icon-jikediancanicon13"></i></button>
    <button type="button" :disabled="list.length < 3" class="next" @click="nextSlide"><i
      class="iconfont icon-mjiantou-copy"></i></button>
  </div>
</template>

<script>
  export default {
    name: "slider",
    props: ['slideType'],
    data() {
      return {
        list: []
      }
    },
    methods: {
      prevSlide() {
        let slideBox = $('.slider_row');
        let slide = $('.slider_row .slider').eq(0);
        slideBox.animate({
          'left': '-33.3333333333%'
        }, 500, () => {
          slideBox.append(slide.clone());
          slide.remove();
          slideBox.css('left', '0');
        });
      },
      nextSlide() {
        let slideBox = $('.slider_row');
        let len = slideBox.find('.slider').length;
        let slide = slideBox.find('.slider').eq(len - 1);
        slideBox.prepend(slide.clone()).css('left', '-33.3333333333%').animate({
          'left': '0'
        }, 500);
        slide.remove();
      },
      getList() {
        this.$ajax.get('/show/teams', {
          limit: 5
        }).then(res => {
          if (res.status === 200)
            this.list = res.data;
          else
            this.list = [];
        });
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #slider {
    width: 100%;
    margin: 0 auto;
    height: 100%;
    position: relative;
    .slider_box {
      width: 100%;
      height: 100%;
      min-height: 50px;
      overflow: hidden;
      position: relative;
      .slider_row {
        width: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
      .slider {
        float: left;
        width: 16.666666666666666%;
        padding: 0 20px;
        .slider_item {
          width: 100%;
          background: #ffffff;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          overflow: hidden;
          padding-bottom: 20px;
          box-shadow: 2px 11px 16px 0 rgba(7, 0, 2, 0.15);
          .slider_img {
            width: 100%;
            height: 450px;
            background: #cccccc;
          }
          h2 {
            text-align: center;
            font-size: 20px;
            line-height: 50px;
            color: #333;
          }
          p {
            font-size: 14px;
            color: #666;
            line-height: 1.5;
            padding: 0 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    button {
      background: transparent;
      position: absolute;
      top: 50%;
      margin-top: -20px;
      i {
        font-size: 40px;
        color: #a8dae1;
      }
      &.prev {
        left: -40px;
      }
      &.next {
        right: -40px;
      }
      &:hover i {
        color: #015f6c;
      }
      &:disabled:hover i {
        cursor: not-allowed;
        color: #a8dae1;
      }
    }
  }
</style>
