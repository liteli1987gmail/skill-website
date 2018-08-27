<template>
  <div id="ban" @mouseover="clear" @mouseout="autoSlide">
    <div class="ban_box row" v-if="list.length > 0">
      <div class="ban_row">
        <div class="ban" v-for="(item,index) in list" ref="banBox">
          <div class="ban_item">
            <template v-if="item.customUrl.indexOf('http') > -1">
              <a :href="item.customUrl">
                <div class="ban_img">
                  <img :src="item.photo" alt="">
                </div>
              </a>
            </template>
            <template v-else>
              <router-link :to="item.customUrl">
                <div class="ban_img">
                  <img :src="item.photo" alt="">
                </div>
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
    <button type="button" :disabled="list.length < 1" class="prev" @click="prevSlide"><i class="iconfont icon-jikediancanicon13"></i></button>
    <button type="button" :disabled="list.length < 1" class="next" @click="nextSlide"><i class="iconfont icon-mjiantou-copy"></i></button>
  </div>
</template>

<script>
  export default {
    name: "banner",
    props: ['slideType'],
    data() {
      return {
        interval: '',
        list: []
      }
    },
    methods: {
      getList() {
        this.$ajax.put('/show/advertisements', {
          type: 3,
          page: 1,
          rows: 3
        }).then(res => {
          if (res.status === 200 && res.data) {
            this.list = res.data.rows;
            if (this.list.length > 0) {
              this.$nextTick(() => {
                this.autoSlide();
              });
            }
          }
          else
            this.list = [];
        });
      },
      autoSlide() {
        let slideBox = $('.ban_row');
        this.interval = setInterval(() => {
          slideBox.animate({
            'left': '-100%'
          }, 500, () => {
            slideBox.append($('.ban_row .ban').eq(0).clone());
            $('.ban_row .ban').eq(0).remove();
            slideBox.css('left', '0');
          });
        }, 3000);
      },
      clear() {
        clearInterval(this.interval);
      },
      prevSlide() {
        let slideBox = $('.ban_row');
        let slide = $('.ban_row .ban').eq(0);
        slideBox.animate({
          'left': '-100%'
        }, 500, () => {
          slideBox.append(slide.clone());
          slide.remove();
          slideBox.css('left', '0');
        });
      },
      nextSlide() {
        let slideBox = $('.ban_row');
        let len = slideBox.find('.ban').length;
        let slide = slideBox.find('.ban').eq(len - 1);
        slideBox.prepend(slide.clone()).css('left', '-100%').animate({
          'left': '0'
        }, 500);
        slide.remove();
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #ban {
    width: 100%;
    margin: 0 auto;
    position: relative;
    .ban_box {
      width: 100%;
      height: 450px;
      min-height: 50px;
      overflow: hidden;
      position: relative;
      .ban_row {
        width: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
      .ban {
        width: 50%;
        float: left;
      }
      .ban_item {
        width: 100%;
        .ban_img {
          width: 100%;
          height: 450px;
          background: #cccccc;
        }
      }
    }
    button {
      background: transparent;
      position: absolute;
      top: 50%;
      display: none;
      margin-top: -20px;
      i {
        font-size: 40px;
        color: #fff;
      }
      &.prev {
        left: 0;
      }
      &.next {
        right: 0;
      }
      &:hover i {
        color: #01b9d3;
      }
      &:disabled:hover i{
        cursor: not-allowed;
        color: #a8dae1;
      }
    }
    &:hover button {
      display: block;
    }
  }
</style>
