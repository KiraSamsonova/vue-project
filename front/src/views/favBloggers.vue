<template>
  <div class="favourites">

    <h2 class="subtitle">Избранное</h2>

    <p class="zero-elem-text" v-if="getFavArr.length === 0">Список пуст</p>

    <router-link :to="'/home'" class="big-blue-link" v-bind:class="[getFavArr.length === 0 ? 'big-blue-link_marginIfZero' : 'big-blue-link_marginIfNotZero' ]">
      <p class="big-blue-link__text">Поиск по блогерам</p>
    </router-link>

    <div class="single-content" v-for="blogger in favBloggers" :key="blogger._id">

      <p class="single-content__name">{{blogger.name}}</p>

      <router-link :to="`/home?id=${blogger._id}`" class="single-content__link">
      <svg version="1.1" class="single-content__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 11 11" style="enable-background:new 0 0 11 11;" xml:space="preserve">

        <g id="Layer_2" class="st0">
          <path class="st1" d="M10.2,4.9c1.1-1.1,1.1-2.9,0-4C9.6,0.3,8.9,0,8.2,0c-0.8,0-1.5,0.3-2,0.8L4.7,2.3l0.3,0c0.4,0,0.9,0,1.3,0.1
            l0.1,0l0.6-0.6c0.3-0.3,0.7-0.4,1.1-0.4c0.4,0,0.8,0.2,1.1,0.4c0.3,0.3,0.4,0.7,0.4,1.1c0,0.4-0.2,0.8-0.4,1.1L7.8,5.4
            c0,0,0,0-0.1,0.1L6.8,6.4C6.2,7,5.2,7,4.6,6.4C4.5,6.3,4.4,6.1,4.3,5.9l-1,1c0.1,0.1,0.2,0.3,0.3,0.4c0.5,0.5,1.3,0.8,2,0.8
            c0.8,0,1.5-0.3,2-0.8L10.2,4.9z"/>
          <path class="st1" d="M6.3,8.7L6,8.8c-0.4,0-0.9,0-1.3-0.1l-0.1,0L3.9,9.2C3.6,9.5,3.3,9.7,2.8,9.7c-0.4,0-0.8-0.2-1.1-0.4
            C1.5,8.9,1.3,8.6,1.3,8.2c0-0.4,0.2-0.8,0.4-1.1l1.5-1.5c0,0,0,0,0.1-0.1l0.9-0.9C4.8,4,5.8,4,6.4,4.6c0.1,0.1,0.2,0.3,0.3,0.4l1-1
            C7.6,3.9,7.5,3.8,7.3,3.7c-0.5-0.5-1.3-0.8-2-0.8c-0.8,0-1.5,0.3-2,0.8L0.8,6.1c-1.1,1.1-1.1,2.9,0,4v0c0.5,0.5,1.3,0.8,2,0.8
            c0.8,0,1.5-0.3,2-0.8L6.3,8.7z"/>
        </g>
        <g id="Layer_3">
          <g>
            <path class="st2" d="M8.7,11H8c-0.3,0-0.5-0.2-0.5-0.5S7.7,10,8,10h0.7C9.4,10,10,9.4,10,8.7V2.3C10,1.6,9.4,1,8.7,1H2.3
              C1.6,1,1,1.6,1,2.3c0,0.3-0.3,0.5-0.5,0.5C0.2,2.8,0,2.5,0,2.3C0,1,1.1,0,2.3,0h6.4C10,0,11,1,11,2.3v6.4C11,10,10,11,8.7,11z"/>
          </g>
          <g>
            <g>
              <path class="st3" d="M4.2,7.4H4.1C3.7,7.6,3.4,7.6,3,7.6c-0.4,0-0.7-0.1-1.1-0.3H1.8C0.8,7.4,0,8.2,0,9.2v1C0,10.7,0.3,11,0.7,11
                h4.5C5.7,11,6,10.7,6,10.2v-1C6,8.2,5.2,7.4,4.2,7.4z"/>
            </g>
            <g>
              <path class="st3" d="M3,6.9c1,0,1.8-0.8,1.8-1.8S4,3.4,3,3.4S1.2,4.2,1.2,5.1S2,6.9,3,6.9z"/>
            </g>
          </g>
          <g>
            <path class="st2" d="M8.3,3.3h-2C6,3.3,5.8,3.1,5.8,2.8S6,2.3,6.3,2.3h2c0.3,0,0.5,0.2,0.5,0.5S8.6,3.3,8.3,3.3z"/>
          </g>
          <g>
            <path class="st2" d="M8.3,5.3h-1C7,5.3,6.8,5.1,6.8,4.8S7,4.3,7.3,4.3h1c0.3,0,0.5,0.2,0.5,0.5S8.6,5.3,8.3,5.3z"/>
          </g>
          <g>
            <path class="st2" d="M8.3,7.4h-1C7,7.4,6.8,7.1,6.8,6.9S7,6.4,7.3,6.4h1c0.3,0,0.5,0.2,0.5,0.5S8.6,7.4,8.3,7.4z"/>
          </g>
        </g>
      </svg>
      </router-link>

      <svg v-on:click="deleteFromFavClick(blogger._id)" version="1.1" class="single-content__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 11 11" style="enable-background:new 0 0 11 11;" xml:space="preserve">

        <rect x="4.7" y="0" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -2.2782 5.5)" class="rect" width="1.7" height="11.1"/>
        <rect x="0" y="4.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -2.2782 5.5)" class="rect" width="11.1" height="1.7"/>
      
      </svg>

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

<style lang="scss" scoped>

  .subtitle {
    font-size: 20px;
    font-family: "Oswald";
  }

  .zero-elem-text {
    margin-top: 33px;
    font-size: 13px;
  }

  .big-blue-link {
    width: 175px;
    height: 38px;
    border-radius: 3px;
    background-color: #3f5baa;
    display: flex;
    justify-content: center;
    align-items: center;

    &_marginIfZero {
      margin-top: 21px;
      margin-bottom: 0px;
    }

    &_marginIfNotZero {
      margin-top: 35px;
      margin-bottom: 27px;
    }

    &__text {
      font-size: 13px;
      color: #ffffff;
      text-align: center;
    }
  }

  .single-content {
    position: relative;
    height: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    :nth-child(2) {
      margin-left: auto;
    }
    :nth-child(3) {
      margin-left: 4px;
      margin-right: 10px;
    }

    &:after {
      @extend .divider;
      margin: 0px 0px 0px 1px;
    }

    &__name {
      font-size: 13px;
      color: #3f5baa;
    }

    &__link {
      margin-bottom: -1px;
    }
    
    &__svg {
      width: 21px;
      height: 21px;
      padding: 4px;
      border: 1px #3F5BAA solid;
      border-radius: 3px;

      &:hover {
        fill: black;
        border-color: black;
        .st1{display:inline;fill:black;}
        .st2{fill:black;}
        .st3{fill:black;}
        .rect{fill:black;}
      }
    }
  }

  .divider {
    content: '';
    position: absolute;
    width:100%;
    bottom:0px;
    height: 1px;
    background-color: #e8e8e8;
    left: 0;
  }

  .st0{display:none;}
  .st1{display:inline;fill:#3F5BAA;}
  .st2{fill:#3F5BAA;}
  .st3{fill:#3E5BAA;}
  .rect{fill-rule:evenodd;clip-rule:evenodd;fill:#3F5BAA;}

</style>