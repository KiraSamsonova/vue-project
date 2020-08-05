<template>
  <div>
    <div class="personalData">
      <button v-on:click="logout">выйти</button>
      <p>email: {{getUser.email}}</p>
      <p>_id: {{getUser._id}}</p>
      <p>role: {{getUser.role}}</p>
      <p>favArr: {{getUser.favourites}}</p>

      <div>
        <h3>Редактирование</h3>

        <form @submit.prevent="submitEmail">
          <p>email</p>
          <input type="text" v-model="newEmail" />
          <button type="submit">редактировать email</button>
        </form>

        <p>пароль</p>
        <form @submit.prevent="submitPassword">
          <p>старый пароль</p>
          <input type="password" v-model="oldPass" />
          <p>новый пароль</p>
          <input type="password" v-model="newPass" />
          <button type="submit">редактировать пароль</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'

export default {
     name: 'personalData',

     data() {
    return {
     newEmail: '',
     oldPass: '',
     newPass: '',
    }
  },
  computed: 
  mapGetters(['getUser', 'isLoggedIn',]),
mounted() {
  console.log(this.isLoggedIn)
  console.log(this.getUser.email)
},
methods: {

...mapActions(["logout", 'axiosChangeEmail', 'axiosChangePassword']),
submitEmail() {
    console.log(this.newEmail)
    this.axiosChangeEmail(this.newEmail)
},

 submitPassword() {
     console.log('changePassword')
     if(this.newPass === this.oldPass) {
         alert('новый пароль должен отличаться от старого!')
     } else {
         const user = {
             oldPass: this.oldPass,
             newPass: this.newPass
         }
         this.axiosChangePassword(user)
     }
     
 }
}
   }
</script>

<style  scoped>
.personalData {
  display: inline-block;
  margin: 10px 100px;
  border: 2px red solid;
}
</style>