<template>
  <div id="nav">
    <ul class="nav">
      <li>
        <router-link to="/index">首页</router-link>
      </li>
      <template v-if="list.length > 0" v-for="(item,index) in list">
        <li>
          <router-link :class="{'router-link-exact-active router-link-active':$route.meta.active === item.id}"
                       :to="`/list/${item.id}`" v-html="item.name"></router-link>
          <dl v-if="item.children.length > 0">
            <dd v-for="(itm,idx) in item.children">
              <template v-if="itm.customUrl.indexOf('http') > -1">
                <a :href="itm.customUrl" v-html="itm.name"></a>
              </template>
              <template v-else>
                <router-link :to="itm.linkType === 1?`${itm.customUrl}?id=${itm.id}`:itm.customUrl"
                             v-html="itm.name"></router-link>
              </template>
            </dd>
          </dl>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "sNav",
    data() {
      return {
        active: '',
        list: []
      }
    },
    watch: {
      '$route'(val) {
        this.setActive(val);
      }
    },
    methods: {
      getList() {
        this.$ajax.get('/show/navigations').then(res => {
          if (res.status === 200) {
            this.list = res.data;
            this.setActive(this.$route);
          }
        });
      },
      setActive(val) {
        if (this.list.length > 0) {
          this.list.forEach((item, index) => {
            if (item.children.length > 0) {
              item.children.forEach((itm, idx) => {
                if (itm.customUrl === val.path) {
                  this.$set(this.$route.meta, 'title', itm.name);
                  this.$set(this.$route.meta, 'active', item.id)
                }
              });
            }
          });
        }
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #nav {
    width: 100%;
    height: auto;
    background: #01b9d3;
    ul {
      width: 1200px;
      margin: 0 auto;
      li {
        display: inline-block;
        font-size: 18px;
        line-height: 50px;
        text-align: center;
        color: #ffffff;
        padding: 0 50px;
        position: relative;
        & > a {
          color: inherit;
          &:before {
            content: '';
            display: none;
            width: 60%;
            height: 1px;
            background: #000;
            position: absolute;
            left: 20%;
            bottom: 1px;
          }
          &:hover:before, &.router-link-active:before {
            display: block;
          }
        }
        &:after {
          content: '/';
          position: absolute;
          right: -10px;
          top: 1px;
        }
        &:last-child:after {
          display: none;
        }
        &:hover dl {
          display: block;
        }
        dl {
          position: absolute;
          left: 0;
          top: 100%;
          width: 100%;
          height: auto;
          overflow: hidden;
          display: none;
          background: #ffffff;
          padding: 10px 0;
          font-size: 16px;
          z-index: 999999;
          box-shadow: 1px 2px 21px 0 rgba(32, 64, 68, 0.25);
          dd {
            width: 100%;
            line-height: 40px;
            border-bottom: 1px #e9e9e9 dashed;
            a {
              color: #333333;
              &:hover {
                color: #01b9d3;
              }
            }
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
</style>
