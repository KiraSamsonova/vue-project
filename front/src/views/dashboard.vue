<template>
  <div class="test">
    <h1>ЛИЧНЫЙ КАБИНЕТ</h1>


    <personalData />


      <favBloggers />


    <div >
      <div>
        <profiles />
      </div>
      <newProfile />
    </div>
  </div>
</template>

<script>
import newProfile from '@/views/newProfile'
import Profiles from '@/views/profiles'
import personalData from '@/views/personalData'
import favBloggers from '@/views/favBloggers'
import {mapGetters,mapActions} from 'vuex'

export default {
    name: 'dashboard',
components: {
  Profiles, newProfile,personalData, favBloggers
},

data() {
  return {
  }
},
  computed: 
mapGetters(["getUser",]),
  mounted() {
   
  },


}
</script>

<style lang="scss" scoped>


</style>