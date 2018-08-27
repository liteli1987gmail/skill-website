<template>
  <div id="top">
    <div class="menu">
      <i class="iconfont icon-nav" @click="menuFlag = !menuFlag"></i>
      <ul class="nav" :class="{on:menuFlag}">
        <li>
          <router-link to="/m/index" @click.native="menuFlag = false">首页</router-link>
        </li>
        <template v-if="list.length > 0" v-for="(item,index) in list">
          <li @click="showNav(item)">
            <router-link :to="`/list/${item.id}`" v-html="item.name"></router-link>
            <i class="iconfont icon-jiantou-copy-copy" v-if="item.children.length > 0"
               :class="{rotate:item.name === active}"></i>
            <dl v-if="item.children.length > 0" :class="{on:item.name === active}">
              <dd v-for="(itm,idx) in item.children" @click="menuFlag = false">
                <template v-if="itm.customUrl.indexOf('http') > -1">
                  <a :href="itm.customUrl" v-html="itm.name"></a>
                </template>
                <template v-else>
                  <router-link :to="itm.linkType === 1?`/m${itm.customUrl}?id=${itm.id}`:`/m${itm.customUrl}`"
                               v-html="itm.name"></router-link>
                </template>
              </dd>
            </dl>
          </li>
        </template>
      </ul>
    </div>
    <div class="tools">
      <div class="logo" v-if="!searchFlag"><img src="@/assets/img/logo.png" alt=""></div>
      <div class="search" v-if="searchFlag">
        <input type="text" placeholder="请输入搜索内容" v-model="keyWord">
        <i class="iconfont icon-cuowu" @click="searchFlag = false"></i>
      </div>
    </div>
    <div class="search_btn">
      <button type="button" @click="search"><i class="iconfont icon-search"></i></button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "top",
    data() {
      return {
        menuFlag: false,
        searchFlag: false,
        active: '',
        keyWord: '',
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
                if (`/m${itm.customUrl}` === val.path) {
                  this.$set(this.$route.meta, 'title', itm.name);
                  this.$set(this.$route.meta, 'active', item.id)
                }
              });
            }
          });
        }
      },
      showNav(param) {
        if (param.link) {
          this.menuFlag = false;
        } else {
          if (this.active === '' || param.name !== this.active) {
            if (param.children.length > 0) {
              this.active = param.name;
            }
          } else {
            this.active = '';
          }
        }
      },
      search() {
        this.searchFlag = true;
        if (this.searchFlag && this.keyWord) {
          this.$router.push({name: 'msearch', params: {keyWord: this.keyWord}});
          this.searchFlag = false;
          this.keyWord = '';
        }
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style scoped type="text/less" lang="less">
  #top {
    width: 100%;
    height: 60px;
    background: #01b9d3;
    color: #ffffff;
    padding: 10px;
    line-height: 40px;
    display: flex;
    .tools {
      flex: 1;
      padding: 0 20px;
      .logo {
        width: 100%;
        text-align: center;
        img {
          width: auto;
          max-height: 40px;
        }
      }
      .search {
        width: 100%;
        background: #ffffff;
        overflow: hidden;
        display: flex;
        input {
          flex: 1;
          height: 40px;
          background: transparent;
        }
        i {
          width: 30px;
          color: #999999;
          text-align: center;
        }
      }
    }
    .search_btn {
      width: 40px;
      button {
        background: transparent;
        width: 100%;
        height: 40px;
        line-height: 40px;
        i {
          font-size: 30px;
          color: #ffffff;
        }
      }
    }
    .menu {
      position: relative;
      width: 40px;
      float: left;
      i {
        font-size: 30px;
      }
      .nav {
        display: none;
        position: absolute;
        left: -10px;
        top: 100%;
        width: 200px;
        background: #01b9d3;
        z-index: 999;
        &.on {
          display: block;
        }
        a {
          color: #ffffff;
        }
        li {
          padding-left: 20px;
          position: relative;
          i {
            position: absolute;
            right: 20px;
            top: 0;
            font-size: 16px;
            -webkit-transform: rotate(0);
            -moz-transform: rotate(0);
            -ms-transform: rotate(0);
            -o-transform: rotate(0);
            transform: rotate(0);
            -webkit-transition: all .3s;
            -moz-transition: all .3s;
            -ms-transition: all .3s;
            -o-transition: all .3s;
            transition: all .3s;
            &.rotate {
              -webkit-transform: rotate(-180deg);
              -moz-transform: rotate(-180deg);
              -ms-transform: rotate(-180deg);
              -o-transform: rotate(-180deg);
              transform: rotate(-180deg);
            }
          }
          dl {
            display: none;
            padding-left: 20px;
            &.on {
              display: block;
            }
          }
        }
      }
    }
  }
</style>
