<template>
  <div id="content">
    <!-- banner & login -->
    <div class="banner_box">
      <div class="banner">
        <banner></banner>
      </div>
      <div class="login">
        <h2>登录</h2>
        <div class="login_tip">
          <div class="tip success" v-if="flag">
            <i class="iconfont icon-yewuyuanyeji-"></i>
            <span>如忘记密码请联系管理员进行密码重置</span>
          </div>
          <div class="tip error" v-if="!flag && errorMsg">
            <i class="iconfont icon-cuowutishi"></i>
            <span v-html="errorMsg"></span>
          </div>
        </div>
        <div class="login_line">
          <div class="login_name">用户名</div>
          <div class="login_input">
            <input type="text" v-model.trim="login.username" placeholder="请输入用户名">
          </div>
        </div>
        <div class="login_line">
          <div class="login_name">密码</div>
          <div class="login_input">
            <input type="password" v-model.trim="login.password" placeholder="请输入密码">
          </div>
        </div>
        <div class="login_line">
          <div class="login_name">验证码</div>
          <div class="login_input">
            <input type="text" v-model.trim="login.captcha" placeholder="请输入验证码">
            <img :src="`/api/kaptcha${random}`" @click="changeRandom" alt="">
          </div>
        </div>
        <button class="btn btn_login" :loading="loginLoading" type="button" @click="loginSubmit">登录</button>
        <p><a href="javascript:void(0);" @click="flag=true">忘记密码</a></p>
      </div>
    </div>

    <!-- news -->
    <div class="news row">
      <div class="col-6">
        <div class="news_box">
          <div class="news_title">
            <i class="iconfont icon-xinwen1-copy"></i>
            <span>测评新闻</span>
            <router-link to="/list/pages/0">更多<i class="iconfont icon-mjiantou-copy"></i></router-link>
          </div>
          <ul v-if="evaNews.length > 0">
            <li v-for="item in evaNews">
              <router-link :to="`/detail/article/${item.id}`">
                <span class="fl">[新闻]</span>
                <span class="text" v-html="item.title"></span>
                <span class="fr">{{item.createdTime | dateTime}}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-6">
        <div class="news_box fr">
          <div class="news_title">
            <i class="iconfont icon-shengyin"></i>
            <span>测评公告</span>
            <router-link to="/list/pages/1">更多<i class="iconfont icon-mjiantou-copy"></i></router-link>
          </div>
          <ul v-if="evaNotice.length > 0">
            <li v-for="item in evaNotice">
              <router-link :to="`/detail/article/${item.id}`">
                <span class="fl">[新闻]</span>
                <span class="text" v-html="item.title"></span>
                <span class="fr">{{item.createdTime | dateTime}}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- tools -->
    <div class="row other_box">
      <div class="col-5" v-for="(item,index) in module">
        <div class="other_label">
          <div class="other_img">
            <template v-if="modules.length > 0 && modules[index].customUrl">
              <template v-if="modules[index].customUrl.indexOf('http') > -1">
                <a :href="modules[index].customUrl">
                  <img :src="item" alt="">
                </a>
              </template>
              <template v-else>
                <router-link :to="modules[index].customUrl">
                  <img :src="item" alt="">
                </router-link>
              </template>
            </template>
            <template v-else>
              <router-link to="">
                <img :src="item" alt="">
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- expert -->
    <div class="expert content">
      <div class="title">
        <p>EXPERT ADVISOR</p>
        <h2>专家团队</h2>
      </div>
      <div class="expert_slide row">
        <slider></slider>
      </div>
    </div>

    <!-- images -->
    <div class="content">
      <div class="title black">
        <p>CONTEST PICTURES</p>
        <h2>大赛图片</h2>
      </div>
      <div class="images">
        <div class="row">
          <div class="col-3" v-if="images.line1.length > 0" v-for="item in images.line1">
            <div class="images_item">
              <router-link :to="`/detail/article/${item.id}`">
                <img :src="item.relationUrl" alt="">
              </router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6" v-if="images.line2.length > 0" v-for="item in images.line2">
            <div class="images_item">
              <router-link :to="`/detail/article/${item.id}`">
                <img :src="item.relationUrl" alt="">
              </router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4" v-if="images.line3.length > 0" v-for="item in images.line3">
            <div class="images_item">
              <router-link :to="`/detail/article/${item.id}`">
                <img :src="item.relationUrl" alt="">
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MAGAZINE INTRODUCTION -->
    <div class="content magazine">
      <div class="title">
        <p>MAGAZINE INTRODUCTION</p>
        <h2>杂志介绍</h2>
      </div>
      <div class="mag_list row" v-if="notesList.length > 0">
        <div class="col-4" v-for="item in notesList">
          <template v-if="item.customUrl.indexOf('http') > -1">
            <a :href="item.customUrl">
              <div class="mag_item">
                <img :src="item.photo" alt="">
              </div>
              <p v-html="`《${item.title}》`"></p>
            </a>
          </template>
          <template v-else>
            <router-link :to="item.customUrl">
              <div class="mag_item">
                <img :src="item.photo" alt="">
              </div>
              <p v-html="`《${item.title}》`"></p>
            </router-link>
          </template>
        </div>
      </div>
      <router-link class="list_more" to="/list/notes">
        <i class="iconfont icon-jiantou-copy-copy"></i>
        <span>更多杂志介绍</span>
      </router-link>
    </div>

    <!-- KIT DISPLAY -->
    <div class="content">
      <div class="title black">
        <p>KIT DISPLAY</p>
        <h2>套件展示</h2>
      </div>
      <div class="kit_list row" v-if="suiteList.length > 0">
        <div class="col-4" v-for="item in suiteList">
          <template v-if="item.customUrl.indexOf('http') > -1">
            <a :href="item.customUrl">
              <div class="kit_item">
                <img :src="item.photo" alt="">
              </div>
            </a>
          </template>
          <template v-else>
            <router-link :to="item.customUrl">
              <div class="kit_item">
                <img :src="item.photo" alt="">
              </div>
            </router-link>
          </template>
        </div>
      </div>
      <router-link class="list_more" to="/list/suite">
        <i class="iconfont icon-jiantou-copy-copy"></i>
        <span>更多套件展示</span>
      </router-link>
    </div>
  </div>
</template>

<script>
  import slider from '@/components/index/slider'
  import banner from '@/components/index/banner'

  export default {
    name: "sContent",
    data() {
      return {
        flag: false,
        loginLoading: false,
        random: '',
        errorMsg: '',
        login: {
          username: '',
          password: '',
          captcha: ''
        },
        news: [],
        evaNews: [],
        evaNotice: [],
        modules: [],
        module: [
          require('@/assets/img/label-1.jpg'),
          require('@/assets/img/label-2.jpg'),
          require('@/assets/img/label-3.jpg'),
          require('@/assets/img/label-4.jpg'),
          require('@/assets/img/label-5.jpg'),
        ],
        images: {
          line1: [],
          line2: [],
          line3: []
        },
        notesList: [],
        suiteList: []
      }
    },
    filters: {
      dateTime(d) {
        let date = new Date(d);
        let Y = date.getFullYear() + '/';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        return Y + M + D;
      }
    },
    components: {
      slider,
      banner
    },
    methods: {
      changeRandom() {
        this.random = "?num=" + Math.random();
      },
      loginSubmit() {
        if (!this.login.username) {
          this.errorMsg = '用户名不可为空！';
          return false;
        }
        if (!this.login.password) {
          this.errorMsg = '密码不可为空！';
          return false;
        }
        if (!this.login.captcha) {
          this.errorMsg = '验证码不可为空！';
          return false;
        }
        this.errorMsg = '';
        this.loginLoading = true;
        this.$ajax.login('/login', this.login).then(res => {
          this.loginLoading = false;
          if (res.status === 200) {
            window.location.href = this.webUrl;
          } else {
            this.errorMsg = res.data.msg;
            this.changeRandom();
          }
        });
      },
      getList() {
        this.$ajax.get('/show/special/0', {
          type: 0,
          page: 1,
          rows: 5
        }).then(res => {
          if (res.status === 200) {
            if (res.data.total > 0)
              this.evaNews = res.data.rows;
            else
              this.evaNews = [];
          }
        });
        this.$ajax.get('/show/special/1', {
          type: 1,
          page: 1,
          rows: 5
        }).then(res => {
          if (res.status === 200) {
            if (res.data.total > 0)
              this.evaNotice = res.data.rows;
            else
              this.evaNotice = [];
          }
        });
        this.$ajax.get('/show/modules').then(res => {
          if (res.status === 200 && res.data)
            this.modules = res.data;
          else
            this.modules = [];
        });
        this.$ajax.get('/show/news').then(res => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              res.data.forEach((item, index) => {
                if (item.relationType === 0) {
                  this.images.line1.push(item);
                } else if (item.relationType === 1) {
                  this.images.line2.push(item);
                } else {
                  this.images.line3.push(item);
                }
              });
            }
          } else
            this.images = {
              line1: [],
              line2: [],
              line3: []
            };
        });
        this.$ajax.put('/show/advertisements', {
          type: 0,
          page: 1,
          rows: 3
        }).then(res => {
          if (res.status === 200 && res.data)
            this.notesList = res.data.rows;
          else
            this.notesList = [];
        });
        this.$ajax.put('/show/advertisements', {
          type: 1,
          page: 1,
          rows: 3
        }).then(res => {
          if (res.status === 200 && res.data)
            this.suiteList = res.data.rows;
          else
            this.suiteList = [];
        });
      }
    },
    mounted() {
      this.changeRandom();
      this.getList();
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #content {
    background: #ffffff;
    .banner_box {
      height: 450px;
      width: 1200px;
      margin: 0 auto;
      .banner {
        width: 800px;
        height: 450px;
        background: #cccccc;
        float: left;
      }
      .login {
        float: right;
        width: 400px;
        height: 450px;
        background: #0d1f3b;
        padding: 50px 30px;
        h2 {
          text-align: center;
          font-size: 20px;
          color: #7da7e6;
        }
        .login_tip {
          width: 100%;
          height: 50px;
          margin-top: 20px;
          .tip {
            width: 100%;
            height: 100%;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            padding: 0 20px;
            background: #ffffff;
            line-height: 50px;
            font-size: 14px;
            span {
              margin-left: 5px;
            }
          }
          .success {
            background: #f0f9eb;
            span, i {
              color: #67c23a;
            }
          }
          .error {
            background: #fef0f0;
            span, i {
              color: #f56c6c;
            }
          }
        }
        .login_line {
          width: 100%;
          height: 48px;
          line-height: 60px;
          margin-top: 10px;
          border-bottom: 1px solid #324e7b;
          overflow: hidden;
          .login_name {
            float: left;
            width: 60px;
            height: 45px;
            overflow: hidden;
            font-size: 14px;
            text-align: justify;
            color: #90afdf;
            margin-top: -3px;
            &:after {
              content: '';
              display: inline-block;
              width: 100%;
              overflow: hidden;
            }
          }
          .login_input {
            width: 260px;
            height: 45px;
            float: right;
            margin-top: -3px;
            position: relative;
            input {
              background: transparent;
              width: 100%;
              color: #fff;
              position: absolute;
              left: 0;
              top: 10px;
            }
            img {
              width: 100px;
              height: 34px;
              position: absolute;
              right: 0;
              bottom: 0;
              line-height: 34px;
              margin-top: 0;
            }
          }
        }
        .btn_login {
          width: 100%;
          margin-top: 20px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }
        & > p {
          text-align: right;
          font-size: 14px;
          margin-top: 10px;
          a {
            color: #657faa;
            &:hover {
              color: #ffffff;
            }
          }
        }
      }
    }
    .news {
      margin-top: 30px;
      .news_box {
        width: 97%;
        min-height: 10px;
        .news_title {
          width: 100%;
          overflow: hidden;
          line-height: 40px;
          padding: 0 20px;
          border-bottom: 1px solid #e8e8e8;
          & > i {
            font-size: 20px;
            color: #01b9d3;
            margin-right: 5px;
          }
          span {
            font-size: 18px;
            color: #333333;
            font-weight: bold;
          }
          a {
            float: right;
            font-size: 14px;
            color: #999999;
            &:hover {
              color: #01b9d3;
            }
            i {
              font-size: 14px;
              margin-left: 5px;
            }
          }
        }
        ul {
          width: 100%;
          margin-bottom: 20px;
          li {
            width: 100%;
            margin-top: 20px;
            overflow: hidden;
            a {
              line-height: 40px;
              padding: 0 25px;
              display: block;
              width: 100%;
              height: 40px;
              background: transparent;
              -webkit-border-radius: 4px;
              -moz-border-radius: 4px;
              border-radius: 4px;
              color: #333333;
              .text {
                display: inline-block;
                width: 390px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-left: 15px;
              }
              &:hover {
                background: #01b9d3;
                color: #ffffff;
              }
              span.fr {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .other_box {
      margin: 30px auto;
      .other_label {
        width: 100%;
        padding: 0 2px;
        .other_img {
          width: 100%;
          height: 100%;
          background: #cccccc;
        }
      }
    }
    .expert {
      width: 100%;
      height: 717px;
      margin: 30px auto 100px;
      background: url(img/expert.jpg) top center no-repeat;
      .expert_slide {
        margin-top: 75px;
        height: 600px;
      }
    }
    .images {
      margin-top: 50px;
      & > div {
        padding: 5px;
      }
      .images_item {
        width: 100%;
        height: 286px;
        background: #cccccc;
      }
    }
    .magazine {
      width: 100%;
      height: 880px;
      margin-bottom: 20px;
      background: url(img/magazine.jpg) top center no-repeat;
      .mag_list {
        margin-top: 75px;
        padding-bottom: 40px;
        & > div {
          padding: 0 45px;
        }
        .mag_item {
          width: 100%;
          height: 480px;
          background: #cccccc;
        }
        p {
          font-size: 20px;
          color: #ffffff;
          margin-top: 50px;
        }
      }
    }
    .kit_list {
      margin-top: 75px;
      & > div {
        padding: 0 10px;
      }
      .kit_item {
        width: 100%;
        height: 480px;
        background: #cccccc;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        overflow: hidden;
      }
    }
    .list_more {
      display: block;
      width: 200px;
      height: auto;
      text-align: center;
      margin: 50px auto 0;
      color: #666666;
      i {
        display: block;
        font-size: 26px;
        margin-bottom: 5px;
        color: inherit;
      }
      span {
        font-size: 14px;
        color: inherit;
      }
      &:hover {
        color: #01b9d3;
      }
    }
  }
</style>
