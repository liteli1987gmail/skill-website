<template>
  <div id="tutor">
    <labels></labels>
    <div class="tutor_form">
      <div class="msg" v-html="msg"></div>
      <input type="text" v-model.trim="card" placeholder="身份证号码">
      <button type="button" class="btn" :disabled="loading" @click="searchTutor">搜索</button>
    </div>
    <div class="tutor_img" v-if="img">
      <img :src="img" alt="">
      <p>提示：长按保存图片</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tutor",
    data() {
      return {
        msg: '',
        card: '',
        img: '',
        loading: false
      }
    },
    methods: {
      searchTutor() {
        if (!this.card) {
          this.msg = '导师身份证号不能为空！';
          return false;
        }
        this.loading = true;
        this.msg = '';
        this.$ajax.put('/show/see', {
          type: 0,
          card: this.card
        }).then(res => {
          this.loading = false;
          if (res.status === 200) {
            if (res.data) {
              this.img = `data:image/png;base64,${res.data}`;
            } else
              this.msg = '未查到该导师相关证书！';
          } else {
            this.msg = res.data.msg;
            this.img = '';
          }
        });
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #tutor {
    .tutor_form {
      width: 100%;
      padding: 30px 20px;
      overflow: hidden;
      .msg {
        width: 100%;
        text-align: center;
        color: #ff0000;
        font-size: 14px;
        line-height: 40px;
      }
      input {
        width: 80%;
        float: left;
        background: #ffffff;
        -webkit-border-radius: 4px 0 0 4px;
        -moz-border-radius: 4px 0 0 4px;
        border-radius: 4px 0 0 4px;
      }
      button {
        width: 20%;
        float: left;
        -webkit-border-radius: 0 4px 4px 0;
        -moz-border-radius: 0 4px 4px 0;
        border-radius: 0 4px 4px 0;
        &:disabled {
          background: #dddddd;
          cursor: not-allowed;
        }
      }
    }
    .tutor_img {
      width: 100%;
      padding: 0 20px;
      text-align: center;
      p {
        padding: 15px 0;
        color: #999999;
        font-size: 12px;
      }
    }
  }
</style>
