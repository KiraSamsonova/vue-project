<template>
  <div>
    <form @submit.prevent="submit()">
      <h2>authentification</h2>
      <p>email</p>
      <input type="text" class="email" v-model="email" />
      <br />
      <p>пароль</p>
      <input type="text" class="password" v-model="password" />
      <br />

      <button type="submit">authentification</button>
    </form>
    <router-link :to="'/registration'">Страница регистрации</router-link>
    <br />
    <router-link :to="'/forgottenpassword'">восстановление пароля</router-link>
    <!-- <div v-if="getAuthentificationResponse"> -->
    <h1>{{errMsg}}</h1>
    <h1>{{authStatus}}</h1>
    <!-- <h1>{{getAuthentificationResponse.success}}</h1> -->
    <!-- </div> -->
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'

export default {
     name: 'auth',

     data() {
    return {
      email: "",
      password: "",
      role: "",
    }
  },
  computed: 
  mapGetters(["getAuthentificationResponse",'errMsg','authStatus']),

   methods: { 
    ...mapActions(["axiosAuth"]),



   submit() {
       const userData = {
           email: this.email,
           password: this.password,
         
       }
      // console.log(this.email, this.password)
       this.axiosAuth(userData)
   }
   
   }
   }
</script>