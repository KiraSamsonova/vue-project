<template>
  <div class="home">
   
    <filters class="home__filters" />
    <bloggers class="home__bloggers" />
      
  </div>
</template>

<script>
  import Filters from '@/views/filters'
  import Bloggers from '@/views/bloggers'

  import {mapGetters,mapActions} from 'vuex'

  export default {
    name: 'home',
    components: {
      Filters, Bloggers,
    },
  }
</script>

<style lang="scss" scoped>

  @mixin mainBreakpoint {
    @media (max-width: 1170px) {
        @content;
    }
  }

  .home {
    display: flex;
    width: 100%;
    margin-left: 278px;
    @include mainBreakpoint {
      margin-left: 0px;
    }

  }
  
</style>
