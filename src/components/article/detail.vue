<template>
  <div id="detail">
    <div class="row">
      <img :src="info.headMap" alt="">
    </div>
    <crumbs :label="info.title?info.title:''"></crumbs>
    <div class="detail">
      <div class="detail_title">
        <h1 v-html="info.title"></h1>
        <p>
          <i class="iconfont icon-shijian1"></i>{{info.createdTime | dateDay}}
        </p>
      </div>
      <div class="detail_text" v-html="info.content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data() {
      return {
        id: this.$route.params.id,
        info: {
          content: '',
          createdTime: '',
          headMap: '',
          id: '',
          title: ''
        }
      }
    },
    filters: {
      dateDay(d) {
        let date = new Date(d);
        let Y = date.getFullYear() + '年';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日';
        return Y + M + D;
      }
    },
    methods: {
      getInfo() {
        this.$ajax.get(`/show/page/${this.id}`).then(res => {
          if (res.status === 200) {
            this.info = res.data;
          }
        });
      }
    },
    mounted() {
      if (this.id) {
        this.getInfo();
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #detail {
    background: #eeeeee;
    padding-bottom: 50px;
    .detail {
      width: 1200px;
      margin: 0 auto;
      background: #ffffff;
      .detail_title {
        width: 100%;
        padding: 0 50px;
        border-bottom: 1px solid #e8e8ed;
        h1 {
          font-size: 36px;
          color: #010101;
          padding: 50px 0;
        }
        p {
          color: #999999;
          font-size: 14px;
          padding-bottom: 20px;
          i {
            margin-right: 10px;
          }
        }
      }
      .detail_text {
        width: 100%;
        background: #ffffff;
        padding: 50px;
        line-height: 1.6;
        h2 {
          font-size: 24px;
          color: #333333;
          margin-bottom: 20px;
        }
        p {
          color: #4d4d4d;
          line-height: 1.6;
          img {
            display: block;
            margin: 20px auto;
            max-width: 60%;
          }
        }
      }
    }
  }
</style>
