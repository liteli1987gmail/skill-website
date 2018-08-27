<template>
  <div id="search">
    <div class="row">
      <div class="search_label">
        {{count}} 条<span>“{{keyWord}}”</span>相关内容
      </div>
      <div class="search_tip">
        <span :class="{'active':active === 's1'}" @click="active = 's1'">相关内容</span>
        <span :class="{'active':active === 's2'}" @click="active = 's2'">活动中心</span>
        <span :class="{'active':active === 's3'}" @click="active = 's3'">活动基地</span>
      </div>
      <div class="search_content">
        <component :is="active" :keyWord="keyWord"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import s1 from '@/components/search/relatedContent'
  import s2 from '@/components/search/activeCenter'
  import s3 from '@/components/search/activeBase'

  export default {
    name: "search",
    data() {
      return {
        active: null,
        count: 0,
        keyWord: ''
      }
    },
    components: {
      s1,
      s2,
      s3
    },
    watch: {
      '$route'(val) {
        this.getWord();
      }
    },
    methods: {
      getWord() {
        this.keyWord = this.$route.params.keyWord;
        if (this.keyWord) {
          this.getInfo();
        }
      },
      getInfo() {
        //获取总条数
        this.$ajax.get(`/show/count/${this.keyWord}`).then(res => {
          if (res.status === 200) {
            this.count = res.data;
          }
        });
      }
    },
    mounted() {
      this.getWord();
      if (!this.active)
        this.active = 's1';
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #search {
    background: #eeeeee;
    padding: 50px 0;
    .search_label {
      background: #ffffff;
      line-height: 60px;
      font-size: 20px;
      text-align: center;
      color: #333333;
      span {
        color: #01b9d3;
      }
    }
    .search_tip {
      text-align: center;
      padding-top: 30px;
      span {
        display: inline-block;
        height: 30px;
        margin: 0 20px;
        font-size: 14px;
        color: #666666;
        position: relative;
        cursor: pointer;
        &.active {
          color: #01b9d3;
        }
        &.active:after {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background: #01b9d3;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
    }
  }
</style>
