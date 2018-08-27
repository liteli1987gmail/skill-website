<template>
  <div id="search">
    <div class="label">
      {{count}} 条<span v-html="'“' + keyWord + '”'"></span>相关内容
    </div>
    <div class="search_tag">
      <div><span :class="{active:current==='news'}" @click="current = 'news'">相关内容</span></div>
      <div><span :class="{active:current==='active' && type === 1}" @click="current = 'active',type=1">活动中心</span></div>
      <div><span :class="{active:current==='active' && type === 2}" @click="current = 'active',type=2">活动基地</span></div>
    </div>
    <component :is="current" :keyWord="keyWord" :type="type"></component>
  </div>
</template>

<script>
  import news from '@/components/mobile/search/news'
  import active from '@/components/mobile/search/active'

  export default {
    name: "search",
    data() {
      return {
        keyWord: '',
        current: null,
        type: 0,
        count: 0
      }
    },
    components: {
      news,
      active
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
      if (!this.current)
        this.current = 'news';
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #search {
    .label {
      text-align: center;
      padding: 20px 0;
      background: #f2f2f2;
      color: #333333;
      span {
        color: #01b9d3;
      }
    }
    .search_tag {
      width: 100%;
      display: flex;
      border-bottom: 1px solid #bfbfbf;
      background: #ffffff;
      div {
        flex: 1;
        text-align: center;
        span {
          display: inline-block;
          font-size: 14px;
          padding: 15px 0;
          position: relative;
          &.active {
            color: #01b9d3;
          }
          &:after {
            content: '';
            display: block;
            width: 100%;
            height: 2px;
            background: transparent;
            position: absolute;
            left: 0;
            bottom: -1px;
          }
          &.active:after {
            background: #01b9d3;
          }
        }
      }
    }
  }
</style>
