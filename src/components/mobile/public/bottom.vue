<template>
  <div id="bottom">
    <div class="b_item">
      <div class="b_img">
        <img src="@/assets/img/1.png" alt="">
      </div>
      <p>淘宝</p>
    </div>
    <div class="b_item">
      <div class="b_img">
        <img src="@/assets/img/2.png" alt="">
      </div>
      <p>无线电微店</p>
    </div>
    <div class="b_item">
      <div class="b_img">
        <img src="@/assets/img/3.jpg" alt="">
      </div>
      <p>无线电</p>
    </div>
    <div class="b_item">
      <div class="b_img">
        <img src="@/assets/img/4.png" alt="">
      </div>
      <p>爱上机器人微店</p>
    </div>
    <div class="b_item">
      <div class="b_img">
        <img src="@/assets/img/5.png" alt="">
      </div>
      <p>爱上机器人</p>
    </div>
    <div class="b_item">
      <div class="b_img">
        <img src="@/assets/img/6.jpg" alt="">
      </div>
      <p>RAIC测评</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bottom"
  }
</script>

<style scoped type="text/less" lang="less">
  #bottom {
    width: 100%;
    padding: 15px 4%;
    overflow: hidden;
    background: #ffffff;
    .b_item {
      width: 25%;
      overflow: hidden;
      float: left;
      margin: 10px 4%;
      text-align: center;
      .b_img {
        width: 100%;
        overflow: hidden;
        img {
          width: 100%;
          margin-top: 0;
        }
      }
      p{
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
</style>
