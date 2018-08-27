<template>
  <div id="detail">
    <h2 class="m_page_title" v-html="type === 'center'?`活动中心：${info.name}`:`活动基地：${info.name}`"></h2>
    <div class="detail">
      <div class="box">
        <div class="line">
          <div class="line_name">{{type === 'center'?`中心名称`:`基地名称`}}</div>
          <div class="line_text" v-html="info.name"></div>
        </div>
        <div class="line">
          <div class="line_name">{{type === 'center'?`中心`:`基地`}}编号</div>
          <div class="line_text" v-html="info.num"></div>
        </div>
        <div class="line">
          <div class="line_name">联系人</div>
          <div class="line_text" v-html="info.linkMan"></div>
        </div>
        <div class="line">
          <div class="line_name">所在省份</div>
          <div class="line_text" v-html="info.province"></div>
        </div>
        <div class="line">
          <div class="line_name">详细地址</div>
          <div class="line_text" v-html="info.address"></div>
        </div>
        <div class="line">
          <div class="line_name">电话</div>
          <div class="line_text" v-html="info.linkPhone"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data() {
      return {
        type: this.$route.params.type,
        id: this.$route.params.id,
        info: {
          name: '',
          num: '',
          linkMan: '',
          province: '',
          city: '',
          address: '',
          linkPhone: ''
        },
        label: ''
      }
    },
    methods: {
      getInfo() {
        if (this.type === 'center')
          this.label = '活动中心';
        else
          this.label = '活动基地';
        this.$ajax.get(`/show/${this.type}/${this.id}`).then(res => {
          if (res.status === 200) {
            this.info = res.data;
          }
        });
      }
    },
    mounted() {
      if (this.type && this.id) {
        this.getInfo();
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .detail {
    padding: 20px;
    .box {
      padding: 30px 20px;
      background: #ffffff;
    }
    .line {
      overflow: hidden;
      margin-bottom: 10px;
      line-height: 1.5;
      .line_name {
        text-align: justify;
        width: 4em;
        float: left;
        height: 2em;
        overflow: hidden;
        color: #666666;
        &:after {
          content: '';
          display: inline-block;
          width: 100%;
        }
      }
      span {
        float: left;
        color: #666666;
      }
      .line_text {
        float: left;
        width: calc(100% - 4em);
        color: #333333;
        position: relative;
        padding-left: 1em;
        &:before {
          content: '：';
          color: #333333;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
</style>
