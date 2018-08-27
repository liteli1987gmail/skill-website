<template>
  <div id="score">
    <labels></labels>
    <div class="score_form">
      <div class="msg" v-html="msg"></div>
      <div class="score_input">
        <input type="text" v-model.trim="info.name" placeholder="输入考生姓名">
      </div>
      <div class="score_input">
        <input type="text" v-model.trim="info.card" placeholder="输入身份证号">
      </div>
      <div class="score_input">
        <button type="button" :disabled="searchLoading" @click="searchScore">搜索</button>
      </div>
    </div>
    <div class="score_table" v-if="loading">
      <ul>
        <li class="th">
          <span class="table_name">评测项目</span>
          <span class="table_text">成绩</span>
        </li>
        <li v-if="scoreList.length > 0" v-for="(item,index) in scoreList">
          <router-link :to="`/m/detail/score/${item.id}`">
            <span class="table_name" v-html="item.name"></span>
            <span class="table_text">
            <em v-html="item.score?item.score:'未录入'" :class="{active:item.score === '合格'}"></em>
            <i class="iconfont icon-mjiantou-copy"></i>
          </span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "score",
    data() {
      return {
        modal: false,
        loading: false,
        searchLoading: false,
        msg: '',
        name: '',
        card: '',
        scoreList: [],
        page: {
          page: 1,
          rows: 10,
          total: 0,
          maxPage: 1
        },
        info: {
          name: '',
          card: ''
        }
      }
    },
    filters: {
      dateTime(d) {
        let date = new Date(d);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        return Y + M + D + '  ' + h + m;
      }
    },
    methods: {
      getList() {
        this.loading = false;
        this.searchLoading = true;
        this.$ajax.get('/show/searchCertificate', {
          page: this.page.page,
          rows: this.page.rows,
          name: this.info.name,
          card: this.info.card
        }).then(res => {
          this.searchLoading = false;
          if (res.status === 200) {
            if (res.data) {
              this.loading = true;
              this.msg = '';
              this.page.total = res.data.total;
              if (res.data.total > 10) {
                let a = res.data.total + '';
                let c = parseInt(str.substr(a.length - 1, 1));
                let b = parseInt(a.substring(0, a.length - 1) + '0');
                if (c > 0) {
                  b += 10;
                }
                this.page.maxPage = b;
              } else
                this.page.maxPage = 1;
              this.scoreList = res.data.rows;
              if (this.page.total > 0) {
                this.name = this.info.name;
                this.card = this.info.card;
              }
            } else
              this.msg = '未查询到该考生信息，请核对信息后查询！';
          } else {
            this.msg = res.data.msg;
            this.page = {
              page: 1,
              rows: 10,
              total: 0,
              maxPage: 1
            };
            this.name = '';
            this.card = '';
            this.scoreList = [];
          }
        });
      },
      searchScore() {
        if (!this.info.name) {
          this.msg = '考生姓名不能为空！';
          return false;
        }
        if (!this.info.card) {
          this.msg = '考生身份证号不能为空！';
          return false;
        }
        this.msg = '';
        this.page.page = 1;
        this.getList();
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #score {
    .score_form{
      width: 100%;
      padding: 20px;
      .msg {
        width: 100%;
        text-align: center;
        color: #ff0000;
        font-size: 14px;
        line-height: 40px;
      }
      .score_input{
        width: 100%;
        margin: 10px auto;
        input{
          width: 100%;
          background: #ffffff;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }
        button{
          width: 100%;
          background: #01b9d3;
          color: #ffffff;
          -webkit-border-radius: 20px;
          -moz-border-radius: 20px;
          border-radius: 20px;
          font-size: 16px;
          margin-top: 20px;
          &:disabled {
            background: #dddddd;
            cursor: not-allowed;
          }
        }
      }
    }
    .score_table{
      width: 100%;
      background: #ffffff;
      li{
        border-bottom: 1px solid #f0f0f0;
        &.th{
          text-align: center;
          padding: 20px 20px 30px;
        }
        a{
          display: block;
          padding: 20px;
          width: 100%;
          overflow: hidden;
          color: #666666;
        }
        span{
          display: block;
          float: left;
        }
        .table_name{
          width: 75%;
          overflow: hidden;
          -ms-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .table_text{
          width: 25%;
          em{
            font-style: normal;
            display: inline-block;
            width: 90%;
            text-align: center;
            &.active{
              color: #01b9d3;
            }
          }
          i{
            margin-left: -20%;
          }
        }
      }
    }
  }
</style>
