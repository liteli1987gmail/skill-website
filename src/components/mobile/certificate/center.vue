<template>
  <div id="activeCenter">
    <labels></labels>
    <ul v-if="list.length > 0" class="active">
      <li v-for="(item,index) in list">
        <router-link :to="`/m/detail/activity/center/${item.id}`">
          <h2>活动中心名称：{{item.name}}</h2>
          <p>中心编号：{{item.num}}</p>
        </router-link>
      </li>
    </ul>
    <p v-if="list.length <= 0" class="m_data_null">暂无数据！</p>
  </div>
</template>

<script>
  export default {
    name: "activeCenter",
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
          param: 0,
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
  .active {
    padding: 20px;
    li {
      width: 100%;
      padding: 20px 0;
      text-align: center;
      background: #ffffff;
      margin: 10px auto;
      h2 {
        font-size: 20px;
        color: #01b9d3;
        margin-bottom: 10px;
      }
      p {
        color: #666666;
      }
    }
  }
</style>
