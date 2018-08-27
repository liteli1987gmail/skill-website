<template>
  <div id="scoreDetail">
    <div class="info">
      <p>姓名：{{info.name}}</p>
      <p>身份证号：{{info.card}}</p>
    </div>
    <ul class="score">
      <li>
        <div class="score_name">测评项目</div>
        <div class="score_text" v-html="info.testProjectValue"></div>
      </li>
      <li>
        <div class="score_name">报考等级</div>
        <div class="score_text" v-html="info.levelValue"></div>
      </li>
      <li>
        <div class="score_name">测评时间</div>
        <div class="score_text">{{info.time | dateTime}}</div>
      </li>
      <li>
        <div class="score_name">测评时间</div>
        <div class="score_text">{{info.practiceTime | dateTime}}</div>
      </li>
      <li>
        <div class="score_name">成绩</div>
        <div class="score_text"><span :class="{on:info.score === '合格'}" v-html="info.score?info.score:'未录入'"></span>
        </div>
      </li>
    </ul>
    <div class="score_img" v-if="image">
      <img :src="image" alt="">
      <p>提示：长按保存图片</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "scoreDetail",
    data() {
      return {
        id: this.$route.params.id,
        info: {
          name: '',
          card: '',
          testProjectValue: '',
          levelValue: '',
          practiceTime: '',
          score: '',
          time: ''
        },
        image: ''
      }
    },
    methods: {
      getInfo() {
        if (this.id) {
          this.$ajax.get(`/show/certificate/${this.id}`).then(res => {
            if (res.status === 200 && res.data) {
              this.info = res.data;
              if (res.data.score === '合格') {
                this.$ajax.put('/show/see', {
                  type: 1,
                  id: this.id,
                  name: res.data.name,
                  card: res.data.card
                }).then(r => {
                  if (r.status === 200 && r.data) {
                    this.image = `data:image/png;base64,${r.data}`;
                  }
                });
              }
            }
          });
        }
      }
    },
    mounted() {
      this.getInfo();
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
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .info {
    width: 100%;
    text-align: center;
    background: #01b9d3;
    color: #ffffff;
    padding: 20px 0;
    line-height: 1.5;
  }

  .score {
    width: 100%;
    padding: 20px;
    li {
      overflow: hidden;
      .score_name {
        width: 4em;
        float: left;
        text-align: justify;
        color: #333333;
        &:after {
          content: '';
          display: inline-block;
          width: 100%;
        }
      }
      .score_text {
        float: left;
        width: calc(100% - 4em);
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        color: #999999;
        span {
          color: #ff0000;
        }
        span.on {
          color: #01b9d3;
        }
        &:before {
          content: '：';
          color: #333333;
        }
      }
    }
  }

  .score_img {
    text-align: center;
    img {
      max-width: 70%;
    }
    p {
      padding: 15px 0;
      color: #999999;
      font-size: 12px;
    }
  }
</style>
