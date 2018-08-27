<template>
  <div id="article">
    <crumbs :labelTitle="label"></crumbs>
    <div class="article">
      <template v-if="page.total > 0">
        <div class="row" v-if="list.length > 0">
          <div class="col-3" v-for="(item,index) in list">
            <router-link :to="`/detail/article/${item.id}`">
              <div class="article_item">
                <div class="article_img">
                  <img :src="item.cover" alt="">
                </div>
                <div class="text">
                  <h2 v-html="item.title"></h2>
                  <p>{{item.createdTime | dateDay}}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <p class="text-center" v-if="more">
          <button type="button" class="btn_more" @click="getList(page.page + 1)">查看更多</button>
        </p>
      </template>
      <template v-else>
        <p v-if="list.length <= 0" class="data_null">暂无数据！</p>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "write",
    data() {
      return {
        id: this.$route.query.id,
        list: [],
        page: {
          page: 1,
          rows: 9,
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
              rows: 9,
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
  #article {
    background: #eeeeee;
    .article {
      width: 1200px;
      margin: 0 auto;
      padding: 50px 0;
      .article_item {
        background: #ffffff;
        .article_img {
          width: 100%;
          min-height: 250px;
          background: #cccccc;
        }
        .text {
          width: 100%;
          height: 70px;
          line-height: 28px;
          background: #ffffff;
          padding: 10px 20px;
          overflow: hidden;
          h2 {
            font-size: 16px;
            color: #333333;
            width: 100%;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            font-size: 12px;
            color: #666666;
          }
        }
      }
      .col-3 {
        padding: 10px;
      }
    }
  }
</style>
