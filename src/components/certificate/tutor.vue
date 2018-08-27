<template>
  <div id="tutor">
    <crumbs></crumbs>
    <div class="tutor_form">
      <div class="msg" v-html="msg"></div>
      <div class="tutor_name">请输入身份证号</div>
      <div class="tutor_input">
        <input type="text" v-model.trim="card" placeholder="身份证号码">
      </div>
      <div class="tutor_submit">
        <button type="button" class="btn" :disabled="loading" @click="searchTutor">搜索</button>
      </div>
    </div>
    <template v-if="img">
      <div class="tutor_img">
        <img :src="img" alt="">
      </div>
      <p>
        <a :href="`/api/show/export?type=0&card=${card}`" class="btn">下载<i class="iconfont icon-xiazai"></i></a>
      </p>
    </template>
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
        down: '',
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
    },
    mounted() {
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #tutor {
    width: 1200px;
    margin: 0 auto;
    & > p {
      text-align: center;
      margin: 50px auto 100px;
      a {
        padding: 10px 20px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        i {
          margin-left: 5px;
        }
        &:hover {
          opacity: .7;
        }
      }
    }
    .tutor_form {
      overflow: hidden;
      padding: 100px 0;
      margin: 0 auto;
      line-height: 40px;
      width: 600px;
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
      .tutor_name {
        width: 130px;
        font-size: 16px;
        color: #666666;
        float: left;
        text-align: right;
        padding-right: 10px;
      }
      .tutor_input {
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
      .tutor_submit {
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
    .tutor_img {
      width: 800px;
      margin: 0 auto;
    }
  }
</style>
