<template>
  <div class='layout'>

    <yellowMenu class="layout__menu" />

    <router-view class="layout__router"></router-view>

  </div>
</template>

<script>

  import YellowMenu from '@/views/yellowMenu'
  export default {
    name: 'MainLayout',
    components: {
      YellowMenu
    },
  }

</script>

<style lang="scss" scoped>

  .layout {
    display: flex;
  }
  
</style>