<template>
  <div>
  
  </div>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'

  export default {
    name: 'emailConfirmation',

    mounted() {
      const urlParams = new URLSearchParams(window.location.search);
      const confirmlink = urlParams.get('confirmlink')
      this.axiosEmailConfirmation(confirmlink)
    },
    methods: { 
      ...mapActions(["axiosEmailConfirmation"]),

    }
  }
</script>