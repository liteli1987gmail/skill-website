<template>
  <div id="footer">
    <p>少年电子技科普活动官方网站&nbsp;&nbsp;京ICP备09082226号-34</p>
    <p>北京信通传媒有限责任公司</p>
  </div>
</template>

<script>
  export default {
    name: "foot",
    mounted() {
      $('body #app').css('padding-bottom', $('#footer').height() + 10 + 'px');
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #footer {
    border-top: 1px solid #bfbfbf;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #444444;
    z-index: 999;
    width: 100%;
    padding: 10px 0;
    p {
      width: 100%;
      line-height: 2;
      font-size: 12px;
      color: #ffffff;
      text-align: center;
      margin: 0 auto;
    }
  }
</style>
