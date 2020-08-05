<template>
  <div>
    <form @submit.prevent="submit()">
      <p>email</p>
      <input type="text" class="email" v-model="email" />
      <br />
      <p>пароль</p>
      <input type="text" class="password" v-model="password" />
      <br />
      <p>роль</p>
      <input type="radio" name="role" v-model="role" id="advertiser" value="advertiser" />
      <label for="advertiser">Рекламодатель</label>
      <input type="radio" name="role" v-model="role" id="blogger" value="blogger" />
      <label for="blogger">Блогер</label>
      <br />
      <button type="submit">зарегестрироваться</button>
    </form>
    <router-link :to="'/login'">Страница авторизации</router-link>

    <!-- <div v-if="getRegistrationResponse">
      <h1>{{getRegistrationResponse.msg}}</h1>
      <h1>{{getRegistrationResponse.success}}</h1>
    </div>-->
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'

export default {
     name: 'registration',

     data() {
    return {
      email: "",
      password: "",
      role: "",
    }
  },
  // computed: 
  // mapGetters(["getRegistrationResponse",]),

   methods: { 
    ...mapActions(["fetchReg"]),

   submit() {
       const userData = {
           email: this.email,
           password: this.password,
           role: this.role
       }
       console.log(this.email, this.password, this.role)
       this.fetchReg(userData)
   }
   
   }
}
</script>