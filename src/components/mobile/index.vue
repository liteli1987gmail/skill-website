<template>
  <div id="mobile">
    <top></top>
    <router-view></router-view>
    <foot></foot>
  </div>
</template>

<script>
  import top from '@/components/mobile/public/header'
  import index from '@/components/mobile/index/index'
  import foot from '@/components/mobile/public/footer'

  export default {
    name: "mobile",
    data(){
      return {}
    },
    components:{
      top,
      index,
      foot
    }
  }
</script>

<style scoped>

</style>
