<template>
  <div id="search1">
    <template v-if="page.total > 0">
      <div class="s1_row" v-if="list.length > 0" v-for="item in list">
        <router-link :to="`/detail/article/${item.id}`">
          <div class="s1_img">
            <img :src="item.cover" alt="">
          </div>
          <div class="s1_text">
            <h2 v-html="item.title">我有手绘跟狗，要不要交个朋友～</h2>
            <div v-html="item.content"></div>
            <h3>{{item.createdTime | dateDay}}</h3>
          </div>
        </router-link>
      </div>
      <p class="text-center" v-if="more">
        <button type="button" class="btn_more" @click="getList(page.page + 1)">查看更多</button>
      </p>
    </template>
    <template v-else>
      <p v-if="list.length <= 0" class="data_null">未搜索到相关内容！</p>
    </template>
  </div>
</template>

<script>
  export default {
    name: "search1",
    props: ['keyWord'],
    data() {
      return {
        list: [],
        page: {
          page: 1,
          rows: 10,
          total: 0
        },
        more: false
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
      getList(page) {
        if (page)
          this.page.page = page;
        //获取新闻、公告、自定义页面
        this.$ajax.get(`/show/search/${this.keyWord}`, {
          search: this.keyWord,
          page: this.page.page,
          rows: this.page.rows
        }).then(res => {
          if (res.status === 200 && res.data) {
            this.page.total = res.data.total;
            this.list = this.list.concat(res.data.rows);
            this.more = this.page.total > this.list.length;
          } else {
            this.list = [];
            this.page = {
              page: 1,
              rows: 10,
              total: 0
            };
            this.more = false;
          }
        })
      }
    },
    mounted() {
      if (this.keyWord) {
        this.getList(1);
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .s1_row {
    width: 100%;
    padding: 40px;
    background: #ffffff;
    overflow: hidden;
    margin-bottom: 10px;
    .s1_img {
      width: 260px;
      height: 195px;
      float: left;
      background: #cccccc;
    }
    .s1_text {
      width: 820px;
      height: 195px;
      float: right;
      h2 {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        margin-bottom: 30px;
        line-height: 30px;
      }
      div {
        height: 72px;
        font-size: 14px;
        color: #666666;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      h3 {
        font-size: 14px;
        color: #bfbfbf;
        margin-top: 45px;
      }
      &:hover h2 {
        color: #01b9d3;
      }
    }
  }
</style>
