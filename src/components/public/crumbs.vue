<template>
  <div id="crumbs">
    <div class="crumbs">
      <span>首页</span>
      <span v-if="meta.title" v-html="meta.title"></span>
      <span v-if="label" v-html="label"></span>
      <span v-if="labelTitle" v-html="labelTitle"></span>
    </div>
    <h2 class="page_title" v-if="meta.title" v-html="meta.title"></h2>
    <h2 class="page_title" v-if="labelTitle" v-html="labelTitle"></h2>
  </div>
</template>

<script>
  export default {
    name: "crumbs",
    props: ['label', 'labelTitle'],
    data() {
      return {
        meta: this.$route.meta
      }
    },
    watch: {
      '$route'(val) {
        this.meta = val.meta;
      }
    },
    mounted() {
      this.meta = this.$route.meta;
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .crumbs {
    width: 1200px;
    padding: 30px 0;
    font-size: 12px;
    margin: 0 auto;
    span {
      color: #333333;
      &:last-child {
        color: #01b9d3;
      }
      &:after {
        content: '\e609';
        font-family: iconfont;
        margin-left: 5px;
      }
      &:last-child:after {
        display: none;
      }
    }
  }
</style>
