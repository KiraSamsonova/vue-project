<template>
  <div>
    <div class="favBloggers">
      <h2>Фав блогерс</h2>
      <p>{{favBloggers.length}}</p>
      <p v-if="favBloggers.length ===0">Избранное отсутствует</p>

      <div class="AllPosts" v-for="blogger in favBloggers" :key="blogger._id">
        <div class="single" v-if="getFavArr.includes(blogger._id)">
          <h3>{{blogger.name}}</h3>
          <p>{{blogger.themes}}</p>
          <p>{{blogger.description}}</p>
          <p>Подписчики: {{blogger.subscribersNumber}}</p>
          <p>Цена рекл поста: {{blogger.postPrice}}Р</p>
          <button v-on:click="deleteFromFavClick(blogger._id)">Удалить из избранного</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'

export default {
     name: 'favBloggers',

     data() {
    return {
     
    }
  },
  computed: 
  mapGetters(['getUser', 'favBloggers', 'getFavArr']),

mounted() {
  console.warn(this.getFavArr)
  if(this.getUser && this.getFavArr.length !== 0){
this.axiosFavBloggers(this.getFavArr)
}
},

   methods: { 
      ...mapActions(["axiosFavBloggers", 'updateFavArr', 'axiosSaveFavBloggers']),
      deleteFromFavClick(id) {

          this.updateFavArr([id, false])

          console.log(this.favArr);

          this.axiosSaveFavBloggers()

      }
   },

   }
</script>

<style scoped>
/* .favBloggers {
  background-color: rgb(193, 193, 235);
} */
</style>