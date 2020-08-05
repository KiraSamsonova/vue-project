<template>
  <div>
    <div class="newProfileCreation">
      <h3>создание нового профиля</h3>
      <p v-if="getLoader" class="getLoader">LOADING</p>
      <form @submit.prevent="createNewProfile()">
        <p>имя</p>
        <input type="text" name="name" id="name" v-model="name" />
        <br />
        <p>Описание</p>
        <input type="text" name="description" id="description" v-model="description" />
        <br />

        <p>instagram</p>
        <input type="text" name="instagram" id="instagram" v-model="instagram" />
        <br />
        <p>communication</p>
        <input type="text" name="communication" id="communication" v-model="communication" />
        <br />
        <p>themes</p>
        <p>Выбрано тем {{themes.length}}/5</p>
        <p v-if="themes.length >= 5">Вы можете выбрать не более 5 тем</p>
        <div class="allThemesHundler">
          <section class="allThemes" v-for="theme in allThemes" :key="theme">
            <input
              type="checkbox"
              :name="theme"
              class="themeInput"
              v-model="themes"
              :id="theme"
              :value="theme"
              v-on:change="toggleThemeNumber()"
              :disabled="false"
            />
            <!--      :disabled="testtest && !theme" -->
            <label :for="theme">{{theme}}</label>
          </section>
        </div>
        <br />
        <p>subscribersNumber</p>
        <input
          type="number"
          name="subscribersNumber"
          id="subscribersNumber"
          v-model="subscribersNumber"
        />
        <br />

        <p v-if="allAgeCat">subscribersAge</p>
        <select name="subscribersAge" id="subscribersAge" v-model="subscribersAge" v-if="allAgeCat">
          <option v-for="age in allAgeCat" :key="age" :value="age">{{age}}</option>
        </select>

        <p>country</p>
        <select name="country" v-model="country">
          <option v-for="country in allCountries" :key="country" :value="country">{{country}}</option>
        </select>
        <br />

        <p v-if="allCities[country]">city</p>
        <select name="city" v-model="city" v-if="allCities[country]">
          <option v-for="town in allCities[country]" :key="town" :value="town">{{town}}</option>
        </select>
        <br />

        <p v-if="allGenderCat">SubscribersGender</p>
        <select
          name="SubscribersGender"
          id="SubscribersGender"
          v-model="SubscribersGender"
          v-if="allGenderCat"
        >
          <option v-for="gender in allGenderCat" :key="gender" :value="gender">{{gender}}</option>
        </select>

        <br />
        <p>AveragePost</p>
        <input type="number" name="AveragePost" id="AveragePost" v-model="AveragePost" />
        <br />
        <p>AverageStory</p>
        <input type="number" name="AverageStory" id="AverageStory" v-model="AverageStory" />
        <br />
        <p>postPrice</p>
        <input type="number" name="postPrice" id="postPrice" v-model="postPrice" />
        <br />
        <p>storyPrice</p>
        <input type="number" name="storyPrice" id="storyPrice" v-model="storyPrice" />
        <br />
        <p>isCoopReady</p>
        <input type="checkbox" name="isCoopReady" id="isCoopReady" v-model="isCoopReady" />
        <br />
        <p>image</p>
        <div>
          <p>Нынешняя картинка</p>
          <img
            v-if="editMode"
            :src="require(`@/assets/uploads/${image}`)"
            width="100"
            height="100"
            alt
          />
        </div>
        <div>
          Заменить на картинку
          <input type="file" @change="onFileSelected" />
        </div>
        <button type="submit">
          <span v-if="editMode">сохранить отредактироваyный профиль</span>
          <span v-else>создать новый профиль</span>
        </button>
      </form>
    </div>

    <div v-if="getNewProfileIsCreated">
      <h1>{{getNewProfileIsCreated.msg}}</h1>
      <h1>{{getNewProfileIsCreated.success}}</h1>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    name: 'new-profile',
    props: {
profile: {
  type: Object,
  required: false
}
    },
    data() {
        return {
          editMode: false,
    name: "",
    description: '',
    image: '',
    instagram: '',
    communication: '',
    themes: [],
    isChecked: false,
    testtest: true,
    subscribersNumber: null,
    subscribersAge: null,
    country: '',
    city: '',
    SubscribersGender: '',
    AveragePost: null,
    AverageStory: null,
    postPrice: null,
    storyPrice: null,
    isCoopReady: false,
      fd: null,
        }
    },
          computed: 
  mapGetters(["allThemes", "allCountries", "allCities","allAgeCat","allGenderCat",
   "getNewProfileIsCreated","getLoader"]),

mounted() {
  if(this.profile) {
    console.log(this.profile)
  }
  if (typeof this.profile === 'object') {
  this.editMode = true
  console.log('obj')
  this.name = this.profile.name,
  this.description = this.profile.description,
  this.image = this.profile.image,
  this.instagram = this.profile.instagram,
  this.communication = this.profile.communication,
  this.themes =  this.profile.themes,
  this.subscribersNumber = this.profile.subscribersNumber,
  this.subscribersAge = this.profile.subscribersAge,
  this.country = this.profile.country,
  this.city = this.profile.city,
  this.SubscribersGender = this.profile.SubscribersGender,
  this.AveragePost=this.profile.AveragePost,
  this.AverageStory=this.profile.AverageStory,
  this.postPrice=this.profile.postPrice,
  this.storyPrice=this.profile.storyPrice,
  this.isCoopReady=this.profile.isCoopReady
  
  }
},

methods: {
     ...mapActions(["axiosCreateNewProfile","axiosReplaceOneProfile"]),

toggleThemeNumber() {

let b = document.getElementsByClassName('themeInput')

b.forEach(elem => {
 if (this.themes.length >= 5) {

   if( elem.checked == false) elem.disabled = true

  } else {
    elem.disabled = false
  }
 })

  // console.log(document.getElementById(`${this.themes[0]}`))
  //    this.themeNumber = this.themes.length + 1
  //  if(this.themeNumber >3) this.testtest = true

  //    this.themes.forEach(elem => {
  //   document.getElementById(elem)
  // .disabled = false
  // });
},
onFileSelected(event) {
         console.log(event.target.files[0].name)
        //  let ext = a.split('.')[a.split('.').length - 1]
         this.fd = new FormData();
this.fd.append('image', event.target.files[0], 'pre.png')
console.log(this.fd)
       },

    createNewProfile() {
     const newProfile = {
      belongTo: JSON.parse(localStorage.getItem('user'))._id,
      name: this.name,
      description: this.description,
      instagram: this.instagram,
      communication: this.communication,
      themes: this.themes,
      subscribersNumber: this.subscribersNumber,
      subscribersAge: this.subscribersAge,
      country: this.country,
      city: this.city,
      SubscribersGender: this.SubscribersGender,
      AveragePost:this.AveragePost,
      AverageStory: this.AverageStory,
      postPrice: this.postPrice,
      storyPrice: this.storyPrice,
      isCoopReady: this.isCoopReady
     }
     if( !this.allCities[this.country]) {
      newProfile.city = ''
    }


     console.log(newProfile)
     if(this.editMode) {
       console.log('ja')
       newProfile._id = this.profile._id
       newProfile.image = this.profile.image

if(this.fd === null || this.fd == null) {
  console.warn("MISTAKE")
} else {
         this.axiosReplaceOneProfile([this.fd, newProfile])
         }
     } else {
     //  console.log(this.fd)
  this.axiosCreateNewProfile([this.fd, newProfile])
     }
    },

},

}
</script>

<style  scoped>
.newProfileCreation {
  width: 600px;
  margin: 60px auto;
}
.allThemesHundler {
  display: flex;
  flex-wrap: wrap;
}
.themeInput {
  margin: 5px 5px;
}
.getLoader {
  font-size: 40px;
}
</style>