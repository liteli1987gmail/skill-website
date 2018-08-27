<template>
  <div id="article">
    <labels></labels>
    <div class="news_text">
      <template v-if="page.total > 0">
        <template v-if="list.length > 0" v-for="(item,index) in list">
          <router-link :to="`/detail/article/${item.id}`">
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
        <p class="text-center" v-if="more">
          <button type="button" class="m_more" @click="getList(page.page + 1)">查看更多</button>
        </p>
      </template>
      <template v-else>
        <p v-if="list.length <= 0" class="m_data_null">暂无数据！</p>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "articleList",
    data() {
      return {
        id: this.$route.query.id,
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
        this.page.page = page;
        this.$ajax.get(`/show/pages/${this.id}`, {
          page: this.page.page,
          rows: this.page.rows
        }).then(res => {
          if (res.status === 200) {
            this.page.total = res.data.total;
            if (res.data.total > 0) {
              this.list = this.list.concat(res.data.rows);
              this.more = res.data.total > this.list.length;
            }
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
      this.getList(1);
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .news_text {
    background: #ffffff;
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
</style>
