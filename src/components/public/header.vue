<template>
  <div id="header">
    <div class="header">
      <div class="row">
        <div class="col-2"><a href="/"><img src="@/assets/img/logo.png" alt=""></a></div>
        <div class="col-6 offset-1">
          <div class="search_box">
            <input type="text" :placeholder="placeholder" v-model.trim="keyWord"/>
            <button class="btn-default" @click="search"><i class="iconfont icon-search"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sHeader",
    data() {
      return {
        keyWord: '',
        placeholder: '请输入搜索内容',
      }
    },
    watch: {
      '$route'(val) {
        if (val.params.keyWord)
          this.keyWord = val.params.keyWord;
      }
    },
    methods: {
      search() {
        if (this.keyWord) {
          let query = {keyWord: this.keyWord};
          this.$router.push({name: 'search', params: query});
        }else
          this.placeholder = '请输入需要搜索的内容';
      }
    },
    mounted() {
      if (this.$route.params.keyWord)
        this.keyWord = this.$route.params.keyWord;
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #header {
    width: 100%;
    background: url(img/bg.jpg) center top no-repeat;
    .header {
      line-height: 60px;
      padding: 30px 0;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      img {
        width: auto;
        max-height: 60px;
      }
      .search_box {
        width: 100%;
        overflow: hidden;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        margin-top: 10px;
        input {
          width: 85%;
          float: left;
        }
        button {
          float: left;
          width: 15%;
          background: #01b9d3;
          color: #ffffff;
          &:hover {
            color: #000;
          }
        }
      }
    }
  }
</style>
