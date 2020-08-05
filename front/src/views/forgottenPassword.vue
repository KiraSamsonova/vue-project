<template>
  <div>
    <h2>forgottenPassword</h2>

    <form @submit.prevent="submitEmail()">
      <p>ваш емаил</p>
      <input type="text" v-model="email" />
      <button type="submit">восстановить пароль</button>
    </form>
    <p>{{msg}}</p>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'

export default {
     name: 'forgottenPassword',

     data() {
    return {
     email: ''
    }
  },
  computed: 
  mapGetters(['msg']),

   methods: { 
    ...mapActions(["axiosNewPassLink"]),
submitEmail() {
  console.log(this.email)
  this.axiosNewPassLink(this.email)
},




   submit() {
    //    const userData = {
    //        email: this.email,
    //        password: this.password,
         
    //    }
    //   // console.log(this.email, this.password)
    //    this.fetchAuth(userData)
   }
   
   }
   }
</script>