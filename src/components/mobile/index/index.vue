<template>
  <div id="content">
    <banner :swiperSlides="swiperSlides"></banner>

    <div class="news">
      <div class="news_title">
        <div class="news_tag">
          <span :class="{'active':active===0}" @click="active = 0">测评新闻</span>
          <span :class="{'active':active===1}" @click="active = 1">测评公告</span>
        </div>
        <router-link :to="`/m/list/pages/${active}`">更多</router-link>
      </div>
      <div class="news_text">
        <template v-if="newsList.length > 0" v-for="(item,index) in newsList">
          <router-link :to="`/m/detail/article/${item.id}`">
            <div class="news_item">
              <div class="news_img">
                <img :src="item.cover" alt="">
              </div>
              <div class="news_area">
                <h2 v-html="item.title"></h2>
                <p>{{item.createdTime | dateDay}}</p>
              </div>
            </div>
          </router-link>
        </template>
      </div>
    </div>

    <div class="label">
      <div class="label_item" v-for="(item,index) in module">
        <template v-if="modules.length <= 0">
          <img :src="item" alt="">
        </template>
        <template v-else>
          <template v-if="modules[index].customUrl.indexOf('http') > -1">
            <a :href="modules[index].customUrl">
              <img :src="item" alt="">
            </a>
          </template>
          <template v-else>
            <router-link :to="`/m${modules[index].customUrl}`">
              <img :src="item" alt="">
            </router-link>
          </template>
        </template>
      </div>
    </div>

    <div class="exp">
      <div class="title m_title">
        <p>EXPERT ADVISOR</p>
        <h2>专家团队</h2>
      </div>
      <div class="exp_text">
        <slide :expList="expList"></slide>
      </div>
    </div>

    <div class="images">
      <div class="title m_title black">
        <p>CONTEST PICTURES</p>
        <h2>大赛图片</h2>
      </div>
      <div class="images_box">
        <div class="images_line" v-if="images.line1.length > 0">
          <div class="images_item" :class="{'item_1':images.line1.length === 1}" v-for="item in images.line1">
            <router-link :to="`/m/detail/article/${item.id}`">
              <img :src="item.relationUrl" alt="">
            </router-link>
          </div>
        </div>
        <div class="images_line" v-if="images.line2.length > 0">
          <div class="images_item" v-for="item in images.line2">
            <router-link :to="`/m/detail/article/${item.id}`">
              <img :src="item.relationUrl" alt="">
            </router-link>
          </div>
        </div>
        <div class="images_line" v-if="images.line3.length > 0">
          <div class="images_item" :class="{'item_1':images.line3.length === 1}" v-for="item in images.line3">
            <router-link :to="`/m/detail/article/${item.id}`">
              <img :src="item.relationUrl" alt="">
            </router-link>
          </div>
        </div>
        <div class="images_line" v-if="images.line4.length > 0">
          <div class="images_item" :class="{'item_2':images.line4.length !== 3}" v-for="item in images.line4">
            <router-link :to="`/m/detail/article/${item.id}`">
              <img :src="item.relationUrl" alt="">
            </router-link>
          </div>
        </div>
        <div class="images_line" v-if="images.line5.length > 0">
          <div class="images_item" v-for="item in images.line5">
            <router-link :to="`/m/detail/article/${item.id}`">
              <img :src="item.relationUrl" alt="">
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="magazine">
      <div class="title m_title">
        <p>MAGAZINE INTRODUCTION</p>
        <h2>杂志介绍</h2>
      </div>
      <div class="magazine_box" v-if="notesList.length > 0">
        <div class="magazine_item" v-for="item in notesList">
          <template v-if="item.customUrl.indexOf('http') > -1">
            <a :href="item.customUrl">
              <div class="item_img">
                <img :src="item.photo" alt="">
              </div>
              <p v-html="`《${item.title}》`"></p>
            </a>
          </template>
          <template v-else>
            <router-link :to="`/m${item.customUrl}`">
              <div class="item_img">
                <img :src="item.photo" alt="">
              </div>
              <p v-html="`《${item.title}》`"></p>
            </router-link>
          </template>
        </div>
      </div>
      <p class="more">
        <router-link class="list_more" to="/m/list/notes">
          <i class="iconfont icon-jiantou-copy-copy"></i>
          <span>更多杂志介绍</span>
        </router-link>
      </p>
    </div>

    <div class="kit">
      <div class="title m_title black">
        <p>KIT DISPLAY</p>
        <h2>套件展示</h2>
      </div>
      <div class="kit_box" v-if="suiteList.length > 0">
        <div class="kit_item" v-for="item in suiteList">
          <template v-if="item.customUrl.indexOf('http') > -1">
            <a :href="item.customUrl">
              <div class="item_img">
                <img :src="item.photo" alt="">
              </div>
            </a>
          </template>
          <template v-else>
            <router-link :to="`/m${item.customUrl}`">
              <div class="item_img">
                <img :src="item.photo" alt="">
              </div>
            </router-link>
          </template>
        </div>
      </div>
      <p class="more black">
        <router-link class="list_more" to="/m/list/suite">
          <i class="iconfont icon-jiantou-copy-copy"></i>
          <span>更多套件展示</span>
        </router-link>
      </p>
    </div>

    <div class="sites">
      <div class="title m_title">
        <p>COOPERATING SITES</p>
        <h2>合作网站</h2>
      </div>
      <div class="sites_box" v-if="sitesList.length > 0">
        <div class="sites_item" v-for="item in sitesList">
          <template v-if="item.customUrl.indexOf('http') > -1">
            <a :href="item.customUrl">
              <img :src="item.photo" alt="">
            </a>
          </template>
          <template v-else>
            <router-link :to="`/m${item.customUrl}`">
              <img :src="item.photo" alt="">
            </router-link>
          </template>
        </div>
      </div>
    </div>

    <bottom></bottom>
  </div>
</template>

<script>
  import banner from '@/components/mobile/index/banner'
  import slide from '@/components/mobile/index/slide'
  import bottom from '@/components/mobile/public/bottom'

  export default {
    name: "index",
    data() {
      return {
        active: 0,
        swiperSlides: [],
        newsList: [],
        sitesList: [],
        module: [
          require('@/assets/img/label-1.jpg'),
          require('@/assets/img/label-2.jpg'),
          require('@/assets/img/label-3.jpg'),
          require('@/assets/img/label-4.jpg'),
          require('@/assets/img/label-5.jpg'),
        ],
        modules: [],
        expList: [],
        images: {
          line1: [],
          line2: [],
          line3: [],
          line4: [],
          line5: []
        },
        notesList: [],
        suiteList: []
      }
    },
    methods: {
      getBannerList() {
        this.$ajax.put('/show/advertisements', {
          type: 3,
          page: 1,
          rows: 3
        }).then(res => {
          if (res.status === 200) {
            this.swiperSlides = res.data.rows;
          }
        })
      },
      getNewsList() {
        this.$ajax.get(`/show/special/${this.active}`, {
          type: this.active,
          page: 1,
          rows: 5
        }).then(res => {
          if (res.status === 200) {
            if (res.data.total > 0)
              this.newsList = res.data.rows;
            else
              this.newsList = [];
          }
        });
      },
      getModules() {
        this.$ajax.get('/show/modules').then(res => {
          if (res.status === 200)
            this.modules = res.data;
          else
            this.modules = [];
        });
      },
      getExpList() {
        this.$ajax.get('/show/teams', {
          limit: 5
        }).then(res => {
          if (res.status === 200)
            this.expList = res.data;
          else
            this.expList = [];
        });
      },
      getImages() {
        this.$ajax.get('/show/news').then(res => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              res.data.forEach((item, index) => {
                if (item.relationType === 0) {
                  if (this.images.line1.length < 2)
                    this.images.line1.push(item);
                  else
                    this.images.line3.push(item);
                } else if (item.relationType === 1) {
                  if (this.images.line2.length < 1)
                    this.images.line2.push(item);
                  else
                    this.images.line5.push(item);
                } else {
                  this.images.line4.push(item);
                }
              });
            }
          } else
            this.images = {line1: [], line2: [], line3: [], line4: [], line5: []};
        });
      },
      getList() {
        this.$ajax.put('/show/advertisements', {
          type: 0,
          page: 1,
          rows: 3
        }).then(res => {
          if (res.status === 200)
            this.notesList = res.data.rows;
          else
            this.notesList = [];
        });
        this.$ajax.put('/show/advertisements', {
          type: 1,
          page: 1,
          rows: 3
        }).then(res => {
          if (res.status === 200)
            this.suiteList = res.data.rows;
          else
            this.suiteList = [];
        });
        this.$ajax.put('/show/advertisements', {
          type: 2,
          page: 1,
          rows: 9
        }).then(res => {
          if (res.status === 200)
            this.sitesList = res.data.rows;
          else
            this.sitesList = [];
        });
      }
    },
    watch: {
      active(val) {
        this.getNewsList();
      }
    },
    mounted() {
      this.getBannerList();
      this.getNewsList();
      this.getModules();
      this.getExpList();
      this.getImages();
      this.getList();
    },
    components: {
      banner,
      bottom,
      slide
    },
    filters: {
      dateDay(d) {
        let date = new Date(d);
        let Y = date.getFullYear() + '.';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        return Y + M + D;
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #content {
    background: #ffffff;
    .images {
      padding: 30px 0;
      .images_box {
        padding: 15px;
        margin-top: 10px;
        .images_line {
          display: flex;
          overflow: hidden;
          .images_item {
            flex: 1;
            margin: 5px;
            background: #cccccc;
            min-height: 100px;
            &.item_1 {
              flex: none;
              width: 50%;
              float: left;
            }
            &.item_2 {
              flex: none;
              float: left;
              width: 33.333333333%;
            }
          }
        }
      }
    }

    .news {
      .news_title {
        padding: 20px 15px;
        border-bottom: 1px solid #dbdbdb;
        overflow: hidden;
        .news_tag {
          float: left;
          span {
            color: #333333;
            &.active {
              color: #01b9d3;
            }
            &:after {
              content: '|';
              margin: 0 3px 0 5px;
              color: #333333;
            }
            &:last-child:after {
              display: none;
            }
          }
        }
        a {
          float: right;
          color: #333333;
        }
      }
      .news_text {
        .news_item {
          padding: 15px;
          border-bottom: 1px solid #dbdbdb;
          display: flex;
          .news_img {
            width: 100px;
            height: 80px;
            background: #cccccc;
          }
          .news_area {
            flex: 1;
            padding-left: 10px;
            h2 {
              font-size: 14px;
              line-height: 1.3;
              height: 3.8em;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              margin-bottom: .8em;
              color: #333333;
            }
            p {
              font-size: 12px;
              color: #999999;
            }
          }
        }
      }
    }

    .label {
      padding: 20px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .label_item {
        flex: 1;
        width: 33.333333333%;
        min-width: 33.333333333%;
        max-width: 33.333333333%;
        img {
          margin-top: 0;
        }
      }
    }

    .exp {
      background: url(./img/expert.jpg) center top no-repeat;
      padding: 30px 0;
      font-size: 20px;
      margin-bottom: 50px;
      height: 15em;
      .exp_text {
        margin-top: 30px;
      }
    }

    .magazine {
      background: url(./img/magazine.jpg) center top no-repeat;
      padding: 30px 0;
      .magazine_box {
        width: 100%;
        display: flex;
        margin-top: 30px;
        .magazine_item {
          flex: 1;
          margin: 0 10px;
          .item_img {
            width: 100%;
            background: #cccccc;
            min-height: 100px;
          }
          p {
            color: #ffffff;
            padding: 10px 0;
            font-size: 12px;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }

    .kit {
      padding: 30px 0;
      .kit_box {
        padding: 15px;
        overflow: hidden;
        .kit_item {
          width: 50%;
          float: left;
          padding: 5px;
          .item_img {
            width: 100%;
            min-height: 100px;
            background: #cccccc;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
          }
        }
      }
    }
    .sites {
      padding: 30px 0;
      background: #01b9d3 url(./img/pbg.png) center top repeat;
      .sites_box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 0 15px;
        margin-top: 30px;
        .sites_item {
          flex: 1;
          width: 30%;
          min-width: 30%;
          max-width: 30%;
          min-height: 100px;
          background: #cccccc;
          margin: 5px;
        }
      }
    }
    p.more {
      text-align: center;
      margin-top: 10px;
      &.black a {
        color: #666666;
      }
      a {
        color: #ffffff;
        font-size: 14px;
        i {
          display: block;
          margin-bottom: 5px;
          font-size: 20px;
        }
      }
    }
  }
</style>
