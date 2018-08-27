<template>
  <div class="index">
    <s-Header></s-Header>
    <s-Nav></s-Nav>
    <router-view></router-view>
    <partner></partner>
    <s-Footer></s-Footer>
  </div>
</template>

<script>
  import sHeader from '@/components/public/header'
  import sNav from '@/components/public/nav'
  import sFooter from '@/components/public/footer'
  import partner from '@/components/public/partner'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  components:{
    sHeader,
    sNav,
    partner,
    sFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
