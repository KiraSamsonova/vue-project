<template>
  <div>
    <h2>New password</h2>
    <p v-if="!passConfirmLinkIsValid">confirmlink is not valid</p>
    <form v-else @submit.prevent="submit">
      <p>Новый пароль</p>
      <input type="password" v-model="password" />
      <p>Пароль ещё раз</p>
      <input type="password" v-model="passwordCheck" />
      <button type="submit">сменить пароль</button>
    </form>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'

export default {
     name: 'newPassword',

     data() {
    return {
      password: "",
     passwordCheck: '',
 
    }
  },
  computed: 
  mapGetters(['passConfirmLinkIsValid']),
mounted() {
 
    this.axiosPassConfirmLinkCheck()
},
   methods: { 
    ...mapActions(["axiosPassConfirmLinkCheck", 'axiosNewPassSave']),



   submit() {
  if(this.password === this.passwordCheck) {
console.log('ok') 
this.axiosNewPassSave(this.password)
  } else {
    console.log(' not ok') 
  }
   }
   
   }
   }
</script>