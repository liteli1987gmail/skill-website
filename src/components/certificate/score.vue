<template>
  <div id="score">
    <crumbs></crumbs>
    <div class="score_form">
      <div class="msg" v-html="msg"></div>
      <div class="score_name">请输入考生姓名</div>
      <div class="score_input">
        <input type="text" v-model.trim="info.name" placeholder="考生姓名">
      </div>
      <div class="score_name">请输入考生身份证号</div>
      <div class="score_input">
        <input type="text" v-model.trim="info.card" placeholder="考生身份证号码">
      </div>
      <div class="score_submit">
        <button type="button" class="btn" :disabled="searchLoading" @click="searchScore">搜索</button>
      </div>
    </div>
    <div class="score_data" v-if="loading">
      <p>
        <span v-show="name">姓名：<em v-html="name"></em></span>
        <span v-show="card">身份证号：<em v-html="card"></em></span>
      </p>
      <table>
        <tr>
          <th><span>测评项目</span></th>
          <th><span>报考等级</span></th>
          <th><span>笔试时间</span></th>
          <th><span>实操时间</span></th>
          <th><span>成绩</span></th>
          <th><span>证书</span></th>
        </tr>
        <tr v-if="scoreList.length > 0" v-for="(item,index) in scoreList">
          <td v-html="item.testProjectValue"></td>
          <td v-html="item.levelValue"></td>
          <td>{{item.time | dateTime}}</td>
          <td>{{item.practiceTime | dateTime}}</td>
          <td v-html="item.score?item.score:'未录入'"></td>
          <td>
            <button type="button" :disabled="item.score !== '合格'" @click="review(item)">预览</button>
            <a
              :href="item.score !== '合格'?`/api/show/export?type=1&id=${item.id}&name=${info.name}&card=${info.card}`:'javascript:void(0);'"
              :class="{disabled:item.score !== '合格'}">下载</a>
          </td>
        </tr>
        <tr v-if="scoreList.length <= 0">
          <td colspan="5">暂无数据！</td>
        </tr>
      </table>
      <div class="page" v-if="page.total > 10">
        <span v-if="page.page !== 1" @click="page.page - 1,getList()" class="iconfont icon-jikediancanicon13"></span>
        <span v-if="page.page !== page.maxPage" @click="page.page + 1,getList()"
              class="iconfont icon-mjiantou-copy"></span>
      </div>
    </div>
    <div class="score_dialog" v-if="modal">
      <span class="iconfont icon-cuowu" @click="modal = false"></span>
      <div class="score_img" v-html="image"></div>
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
        },
        image: ''
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
    watch: {
      modal(val) {
        if (val) {
          $('body').css('overflow', 'hidden').append("<div class='mask'></div>");
        } else {
          $('.mask').remove();
          $('body').css('overflow', 'auto');
          this.image = '';
        }
      }
    },
    methods: {
      review(data) {
        if (data) {
          this.$ajax.put('/show/see', {
            type: 1,
            id: data.id,
            name: this.info.name,
            card: this.info.card
          }).then(res => {
            if (res.status === 200) {
              this.modal = true;
              this.image = res.data;
            }
          });
        }
      },
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
    },
    mounted() {
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #score {
    width: 1200px;
    margin: 0 auto;
    .score_form {
      overflow: hidden;
      padding: 100px 0;
      margin: 0 auto;
      line-height: 40px;
      position: relative;
      .msg {
        top: 30px;
        left: 0;
        width: 100%;
        text-align: center;
        color: #ff0000;
        font-size: 14px;
        line-height: 40px;
        position: absolute;
      }
      .score_name {
        width: 180px;
        font-size: 16px;
        color: #666666;
        float: left;
        text-align: right;
        padding-right: 10px;
      }
      .score_input {
        float: left;
        width: 350px;
        input {
          width: 100%;
          background: #ffffff;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }
      }
      .score_submit {
        width: 100px;
        float: right;
        button {
          width: 100%;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          &:disabled {
            background: #dddddd;
            cursor: not-allowed;
          }
        }
      }
    }
    .score_data {
      p {
        text-align: right;
        font-size: 14px;
        margin-bottom: 20px;
        span {
          color: #333333;
          margin-left: 40px;
          em {
            font-style: normal;
            color: #999999;
          }
        }
      }
      .page {
        width: 100%;
        text-align: right;
        padding-bottom: 20px;
        span {
          display: inline-block;
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background: #ffffff;
          color: #333333;
          cursor: pointer;
          &:hover {
            color: #ffffff;
            background: #01b9d3;
          }
        }
      }
      table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 20px;
        tr {
          &:nth-child(2n) {
            background: #ffffff;
          }
          th {
            height: 70px;
            line-height: 60px;
            span {
              display: block;
              width: 100%;
              height: 60px;
              background: #01b9d3;
              color: #ffffff;
            }
          }
          td {
            text-align: center;
            font-size: 14px;
            color: #999999;
            line-height: 60px;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
            button, a {
              display: inline-block;
              width: 70px;
              height: 30px;
              line-height: 30px;
              background: #edf6f7;
              border: 1px solid #59d6e8;
              -webkit-border-radius: 4px;
              -moz-border-radius: 4px;
              border-radius: 4px;
              font-size: 12px;
              margin: 0 5px;
              color: #01b9d3;
            }
            a {
              color: #909399;
              background: #f4f4f5;
              border: solid 1px #d3d4d6;
            }
            button:hover, a:hover {
              background: #01b9d3;
              color: #ffffff;
            }
            button:disabled, a.disabled {
              background: #e6e6e6;
              border-color: #e6e6e6;
              color: #bfbfbf;
              cursor: not-allowed;
            }
          }
        }
      }
    }
    .score_dialog {
      width: 360px;
      height: 460px;
      padding: 20px;
      background: #93a3a3;
      position: fixed;
      left: 50%;
      top: 50%;
      margin: -230px 0 0 -130px;
      z-index: 99;
      span {
        position: absolute;
        right: -20px;
        top: -20px;
        color: #ffffff;
        cursor: pointer;
        &:hover {
          color: #01b9d3;
        }
      }
      .score_img {
        width: 100%;
        height: 100%;
        background: #cccccc;
        color: blue;
      }
    }
  }
</style>
