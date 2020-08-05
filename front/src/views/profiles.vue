<template>
  <div>
    <h3>Информация о имеющихся профилях</h3>
    <p v-if="getAllProfiles && getAllProfiles.length === 0">У вас пока нет профилей</p>

    <div class="AllPosts" v-for="profile in getAllProfiles" :key="profile._id">
      <div class="single">
        <h3>{{profile.name}}</h3>
        <p>{{getAllProfiles.indexOf(profile) +1}}</p>
        <p>{{profile.themes}}</p>
        <p>{{profile.description}}</p>
        <img :src="require(`@/assets/uploads/${profile.image}`)" width="100" height="100" alt />

        <button class="editBtn" v-on:click="editProfile(profile);">редактировать профиль</button>

        <button class="deleteBtn" v-on:click="deleteProfileById(profile._id)">удалить профиль</button>
      </div>
    </div>

    <div class="editProfile" v-if="edit">
      <h3>редактирование</h3>
      <newProfile v-bind:profile="profile" />
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import newProfile from '@/views/newProfile'
export default {
  name: 'profiles',
  components: {
    newProfile
  },
  computed: mapGetters(["getAllProfiles"],),

  data() {
    return {
      edit: false,
      profile: undefined,
    } 
  },

  mounted() {
    console.log(JSON.parse(localStorage.getItem('user'))._id)
    this.fetchAllProfiles(JSON.parse(localStorage.getItem('user'))._id)
  },

  methods: {
    ...mapActions(["fetchAllProfiles", "deleteProfile"]),

    editProfile(profile) {
      console.log(profile)
      this.edit = !this.edit
      this.profile = profile
    },

    deleteProfileById(_id) {
      console.log(_id)
  
      this.deleteProfile(_id)
    },
  },
}
</script>


<style  scoped>
.single {
  display: inline-block;
  margin: 5px 5px;
  border: 2px black solid;
}
.editProfile {
  border: 2px blue solid;
  background-color: coral;
}
</style>