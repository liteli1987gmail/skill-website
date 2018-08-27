<template>
  <div id="partner">
    <div class="content">
      <div class="title">
        <p>COOPERATING SITES</p>
        <h2>合作网站</h2>
      </div>
      <div class="partner row" v-if="list.length > 0">
        <div class="col-5" v-for="item in list">
          <template v-if="item.customUrl.indexOf('http') > -1">
            <a :href="item.customUrl" target="_blank">
              <img :src="item.photo" alt="">
            </a>
          </template>
          <template v-else>
            <router-link :to="item.customUrl">
              <img :src="item.photo" alt="">
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "partner",
    data() {
      return {
        list: []
      }
    },
    methods: {
      getList() {
        this.$ajax.put('/show/advertisements', {
          type: 2,
          page: 1,
          rows: 10
        }).then(res => {
          if (res.status === 200 && res.data)
            this.list = res.data.rows;
          else
            this.list = [];
        });
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #partner {
    background: #01b9d3 url(./img/pbg.png) left top repeat;
    .partner {
      margin-top: 30px;
      .col-5 {
        padding: 10px;
        a{
          display: block;
          width: 100%;
          height: auto;
        }
      }
    }
  }
</style>
