<template>
  <div id="active">
    <ul v-if="list.length > 0">
      <li v-for="(item,index) in list">
        <a href="javascript:void(0);">
          <h2 v-html="`活动${type===1?'中心':'基地'}名称：${item.name}`"></h2>
          <p v-html="`${type===1?'中心':'基地'}编号：${item.code}`"></p>
        </a>
      </li>
    </ul>
    <p v-if="list.length <= 0" class="data_null">未搜索到相关内容！</p>
  </div>
</template>

<script>
  export default {
    name: "active",
    props: ['keyWord', 'type'],
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
    watch: {
      type(val) {
        this.list = [];
        this.getList(1);
      }
    },
    methods: {
      getList(page) {
        this.page.page = page;
        this.$ajax.put('/show/activities', {
          page: this.page.page,
          rows: this.page.rows,
          param: parseInt(this.type) - 1,
          search: this.keyWord,
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
      if (this.keyWord)
        this.getList(1);
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #active {
    padding: 15px 20px 40px;
    li {
      width: 100%;
      padding: 20px 0;
      text-align: center;
      background: #f2f2f2;
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
