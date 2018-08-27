<template>
  <div id="activeBase">
    <crumbs></crumbs>
    <div class="row">
      <div class="s2_row">
        <div class="s2_item" v-if="list.length > 0" v-for="item in list">
          <router-link :to="`/detail/activity/base/${item.id}`">
            <div class="s2_text">
              <h2>活动基地名称：{{item.name}}</h2>
              <p>基地编号：{{item.num}}</p>
            </div>
          </router-link>
        </div>
        <p v-if="list.length <= 0" class="data_null">暂无数据！</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "activeBase",
    data() {
      return {
        list: [],
        page: {
          page: 1,
          rows: 10,
          total: 0,
          limit: null
        }
      }
    },
    methods: {
      getList(page) {
        this.page.page = page;
        this.$ajax.put('/show/activities', {
          page: this.page.page,
          rows: this.page.rows,
          param: 1,
          limit: this.page.limit
        }).then(res => {
          if (res.status === 200) {
            this.page.total = res.data.total;
            if (res.data.total > 0)
              this.list = res.data.rows;
            else
              this.list = [];
          }
        });
      }
    },
    mounted() {
      this.getList(1);
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .s2_row {
    width: 100%;
    overflow: hidden;
    .s2_item {
      width: 50%;
      float: left;
      margin: 20px 0;
      &:nth-child(2n-1) {
        padding-right: 20px;
      }
      &:nth-child(2n) {
        padding-left: 20px;
      }
      .s2_text {
        text-align: center;
        background: #ffffff;
        padding: 30px 0;
        line-height: 2;
        cursor: pointer;
        h2 {
          font-size: 18px;
          color: #01b9d3;
        }
        p {
          font-size: 16px;
          color: #666666;
        }
      }
    }
  }
</style>
