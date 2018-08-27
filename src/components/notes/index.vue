<template>
  <div id="notes">
    <crumbs></crumbs>
    <div class="notes">
      <template v-if="page.total > 0">
        <div class="row" v-if="list.length > 0">
          <div class="col-4" v-for="(item,index) in list">
            <div class="notes_item">
              <template v-if="item.customUrl.indexOf('http') > -1">
                <a :href="item.customUrl">
                  <div class="notes_img">
                    <img :src="item.photo" alt="">
                  </div>
                  <h2 v-html="item.title"></h2>
                </a>
              </template>
              <template v-else>
                <router-link :to="item.customUrl">
                  <div class="notes_img">
                    <img :src="item.photo" alt="">
                  </div>
                  <h2 v-html="item.title"></h2>
                </router-link>
              </template>
            </div>
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
    name: "notes",
    data() {
      return {
        list: [],
        page: {
          page: 1,
          rows: 9,
          total: 0
        },
        more: false
      }
    },
    methods: {
      getList(page) {
        this.page.page = page;
        this.$ajax.put('/show/advertisements', {
          type: 0,
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
  #notes {
    background: #eeeeee;
    .notes {
      width: 1200px;
      margin: 0 auto;
      padding: 50px 0;
      .notes_item {
        background: #ffffff;
        .notes_img {
          width: 100%;
          min-height: 250px;
          background: #cccccc;
        }
        h2 {
          font-size: 14px;
          width: 100%;
          height: 70px;
          line-height: 28px;
          color: #333333;
          background: #ffffff;
          padding: 10px 20px;
          overflow: hidden;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .col-4 {
        padding: 10px;
      }
    }
  }
</style>
