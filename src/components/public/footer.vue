<template>
  <div id="footer">
    <div class="code_line row">
      <div class="code_item">
        <div class="code_img">
          <img src="@/assets/img/1.png" alt="">
        </div>
        <p>淘宝</p>
      </div>
      <div class="code_item">
        <div class="code_img">
          <img src="@/assets/img/2.png" alt="">
        </div>
        <p>无线电微店</p>
      </div>
      <div class="code_item">
        <div class="code_img">
          <img src="@/assets/img/3.jpg" alt="">
        </div>
        <p>无线电</p>
      </div>
      <div class="code_item">
        <div class="code_img">
          <img src="@/assets/img/4.png" alt="">
        </div>
        <p>爱上机器人微店</p>
      </div>
      <div class="code_item">
        <div class="code_img">
          <img src="@/assets/img/5.png" alt="">
        </div>
        <p>爱上机器人</p>
      </div>
      <div class="code_item">
        <div class="code_img">
          <img src="@/assets/img/6.jpg" alt="">
        </div>
        <p>RAIC测评</p>
      </div>
    </div>
    <p>少年电子技科普活动官方网站&nbsp;&nbsp;京ICP备09082226号-34&nbsp;&nbsp;&nbsp;&nbsp;北京信通传媒有限责任公司</p>
  </div>
</template>

<script>
  export default {
    name: "sFooter",
    mounted() {
      $('body #app').removeAttr('style');
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #footer {
    background: #ffffff;
    .code_line {
      padding: 50px 0;
      text-align: center;
      .code_item {
        display: inline-block;
        width: 100px;
        margin: 0 20px;
        .code_img {
          width: 100px;
          height: 100px;
          position: relative;
          img {
            width: 100px;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            margin-top: 0;
            -webkit-transition: all .3s;
            -moz-transition: all .3s;
            -ms-transition: all .3s;
            -o-transition: all .3s;
            transition: all .3s;
            &:hover {
              width: 150px !important;
            }
          }
        }
        p {
          font-size: 12px;
          margin-top: 5px;
        }
        &:nth-child(2) .code_img img, &:nth-child(4) .code_img img {
          width: 90px;
        }
      }
    }
    & > p {
      text-align: center;
      padding: 25px 0;
      background: #444444;
      font-size: 12px;
      color: #ffffff;
    }
  }
</style>
