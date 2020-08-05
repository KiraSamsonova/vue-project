<template>
  <div>
    <h2>Подтверждение email</h2>
    <p v-if="loading2">Загрузка</p>
    <p>{{l}}</p>
    <p>{{msg}}</p>

    <router-link :to="'/newpassword'">восстановление пароля</router-link>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'

export default {
     name: 'emailConfirmation',

     data() {
    return {
    l: '5ec4e49bbf19bc241459f6b9'.length
    }
  },
  computed: 
  mapGetters(['loading2','msg']),

mounted() {
    let url = location.pathname.split('/')
    
    this.axiosEmailConfirmation(url.pop())
},
   methods: { 
    ...mapActions(["axiosEmailConfirmation"]),



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