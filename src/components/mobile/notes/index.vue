<template>
  <div id="notes">
    <labels></labels>
    <div class="notes">
      <template v-if="page.total > 0">
        <ul v-if="list.length > 0">
          <li v-for="(item,index) in list">
            <template v-if="item.customUrl.indexOf('http') > -1">
              <a :href="item.customUrl">
                <div class="item">
                  <div class="img">
                    <img :src="item.photo" alt="">
                  </div>
                  <h2 v-html="item.title"></h2>
                </div>
              </a>
            </template>
            <template v-else>
              <router-link :to="`/m${item.customUrl}`">
                <div class="item">
                  <div class="img">
                    <img :src="item.photo" alt="">
                  </div>
                  <h2 v-html="item.title"></h2>
                </div>
              </router-link>
            </template>
          </li>
        </ul>
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
    name: "notes",
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
  #notes {
    background: #eeeeee;
    .notes {
      ul {
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        li {
          flex: 1;
          width: 50%;
          min-width: 50%;
          max-width: 50%;
          padding: 10px;
          .item {
            background: #ffffff;
            padding: 5px;
          }
          .img {
            width: 100%;
            min-height: 100px;
            background: #cccccc;
          }
          h2 {
            font-size: 18px;
            width: 100%;
            height: 2.6em;
            line-height: 1.3;
            margin: 0.5em auto;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #333333;
          }
        }
      }
    }
  }
</style>
