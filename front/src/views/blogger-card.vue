<template>

  <div class="blogger-single">

    <div v-if="blogger.isParticipant" class="blogger-single__rockstar-wrapper" >

      <p class="blogger-single__rockstar-text">
        Rockstar Bloggers
      </p> 

    </div>

    <div v-if="popupAdd" class="blogger-single__favourites-popup-wrapper">

      <p class="blogger-single__favourites-popup-text">
        Добавить в избранное
      </p> 

    </div>

    <div v-if="popupDelete" class="blogger-single__favourites-popup-wrapper">

      <p class="blogger-single__favourites-popup-text">
        Удалить из избранного
      </p> 

    </div>


    <div class="blogger-single__column blogger-single__column_top">
        
        <div class="blogger-single__row">

          <div class="blogger-single__photo-wrapper">

            <img :src="require(`@/assets/uploads/${blogger.image}`)" alt="" class="blogger-single__photo">
          
          </div>

        </div>

        <div class="blogger-single__row blogger-single__row_name-and-themes">

          <h3 class="blogger-single__name-wrapper">

            <router-link :to="'/home'" class="blogger-single__name">
              {{blogger.name}} 
            </router-link>  
            
          </h3>
            
          <div class="blogger-single__themes-wrapper" >

            <p class="blogger-single__themes-single" v-for="(theme, index) in blogger.themes" :key="index">
              {{theme}}<span v-if="index < blogger.themes.length -1" class="blogger-single__themes-margin-point-saver">•</span>
            </p>

          </div>
            

        </div>

        <div class="blogger-single__row" 
          v-bind:class="{'isInFav-750-left': getFavArr.includes(blogger._id), 'isNotInFav-750-right': !getFavArr.includes(blogger._id)}">

          <div class="blogger-single__favourites_wrapper">

            <img src="@/assets/media/Member-Favourite-BG.svg" alt="" class="blogger-single__favourites blogger-single__favourites_scroll-track">
            
            <img v-if="getFavArr.includes(blogger._id)" v-on:click="deleteFromFavClick(blogger._id)"
            v-on:mouseover="popupDelete = true" v-on:mouseleave="popupDelete = false"
             src="@/assets/media/Member-Favourite-active.svg" alt=""
            class="blogger-single__favourites blogger-single__favourites_scroll-star 
            blogger-single__favourites_scroll-star-active"
            v-bind:class="{ 'deleteFromFavAnimation': deleteFromFavAnimation }">
           
            <img v-else v-on:click="addToFavClick(blogger._id)" 
            v-on:mouseover="popupAdd = true" v-on:mouseleave="popupAdd = false"
            src="@/assets/media/Member-Favourite-non-active.svg" alt="" 
            class="blogger-single__favourites blogger-single__favourites_scroll-star 
            blogger-single__favourites_scroll-star-non-active"
            v-bind:class="{ 'addToFavAnimation': addToFavAnimation }">

          </div>

        </div>

    </div>

    <div class="blogger-single__column blogger-single__column_middle">

        <p class="blogger-single__description">

          <span v-if='showFullDescription' class="blogger-single__full-text">
            {{longString}}
          </span>

          <span v-if='!showFullDescription' class="first">{{firstPart}}</span>

          <span v-if="windowWidth<480 && !showFullDescription" 
            class="blogger-single__show-more-btn"
            v-on:click="showFullDescription = true"
          >Полное описание
          </span>

        </p>

    </div>

    <div class="blogger-single__column column-bottom">

      <div class="blogger-single__row column-bottom__top">

        <div class="blogger-single__info-p-wrapper">

            <div class="blogger-single__svg-info">
              <img src="@/assets/media/Member-card-icon-01.svg" alt="" >
            </div>

            <p class="blogger-single__info-p p-info">
              <span class="p-info__regular">Подписчики: </span>
              <span class="p-info__bold">{{blogger.subscribersNumber | numbers(blogger.subscribersNumber)}}</span>
            </p>

        </div>

        <div class="blogger-single__info-p-wrapper">

            <div class="blogger-single__svg-info">
              <img src="@/assets/media/Member-card-icon-02.svg" alt="" >
            </div>

            <p class="blogger-single__info-p p-info">
              <span class="p-info__regular">Охваты постов: </span>
              <span class="p-info__bold">{{blogger.AveragePost | numbers(blogger.AveragePost)}}</span>
            </p>

        </div>

        <div class="blogger-single__info-p-wrapper">

          <div class="blogger-single__svg-info">
            <img src="@/assets/media/Member-card-icon-03.svg" alt="" >
          </div>

          <p class="blogger-single__info-p p-info">
              <span class="p-info__regular">Охваты сторис: </span>
              <span class="p-info__bold">{{blogger.AverageStory | numbers(blogger.AverageStory)}}</span>
          </p>

        </div>

        <div class="blogger-single__info-p-wrapper">

            <div class="blogger-single__svg-info">
              <img src="@/assets/media/Member-card-icon-04.svg" alt="" >
            </div>

            <p class="blogger-single__info-p p-info">
              <span class="p-info__regular">Вовлечение: </span>
              <span class="p-info__bold">{{blogger.engagement}}%</span>
            </p>

        </div>

      </div>

      <div class="blogger-single__row column-bottom__middle">

        <div class="blogger-single__info-p-wrapper">
          
            <p class="blogger-single__info-p p-info">
              <span class="p-info__regular">Стоимость рекламных постов: </span>
              <span class="p-info__bold">{{blogger.postPrice | numbers(blogger.postPrice)}} &#8381;</span>
            </p>

        </div>

        <div class="blogger-single__info-p-wrapper">

            <p class="blogger-single__info-p p-info">
              <span class="p-info__regular">Стоимость рекламных сторис: </span>
              <span class="p-info__bold">{{blogger.storyPrice | numbers(blogger.storyPrice)}}	&#8381;</span>

            </p>
        </div>

      </div>

      <div class="blogger-single__row column-bottom__bottom">

        <div class="blogger-single__info-p-wrapper">
            <p class="blogger-single__info-p blogger-single__info-p_center">
              Готовность <br> к взаипопостингу:
            </p>
        </div>

        <div class="blogger-single__info-p-wrapper">

            <div v-if="blogger.isCoopReady === true" class="blogger-single__yes-no-img-wrapper ">

              <img src="@/assets/media/yes-no-YES-active.svg" class="blogger-single__yes-no-img" alt="" >

            </div>
            
            <div v-if="blogger.isCoopReady === false" class="blogger-single__yes-no-img-wrapper">

              <img src="@/assets/media/yes-no-NO-active.svg" class="blogger-single__yes-no-img" alt="" >          
              <!-- <img src="@/assets/media/yes-no-YES-non-active.svg" class="blogger-single__yes-no-img" alt="" > -->

            </div>

        </div>

      </div>
        
    </div>
  </div>

</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import router from '@/router/index.js'
  export default {
    name: 'blogger-card',
    props: {
      blogger: {
        type: Object,
        required: true
      },
    },

    data() { 
      return {      
        popupDelete: false,
        popupAdd: false,
        deleteFromFavAnimation: false,
        addToFavAnimation: false,
        longString: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Architecto, sit. Asperiores, praesentium pariatur fugiat qui 
            laborum rem velit esse nesciunt itaque mollitia nam dolorum et
            impedit aliquam, ullam corrupti earum.

            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Architecto, sit. Asperiores, praesentium pariatur fugiat qui 
            laborum rem velit esse nesciunt itaque mollitia nam dolorum et
            impedit aliquam, ullam corrupti earum.`,
        firstPart: '',    
        secondPart: '',
        windowWidth: window.innerWidth,
        showFullDescription: false,
      }
    },
    
    computed: mapGetters(['getFavArr', 'getUser', 'isLoggedIn'],),

    mounted() {
      window.addEventListener('resize', this.onResize);

      this.descriptionSizer(this.longString)
    },

    methods: { 
      ...mapActions(['updateFavArr','axiosSaveFavBloggers',],),

      onResize() {
        this.windowWidth = window.innerWidth

      },

      descriptionSizer(string) {

        if (this.windowWidth > 480 || string.length <= 300) 
          return this.showFullDescription = true

          let dividerPos = string.indexOf(' ', 300)

          if (string[dividerPos - 3] === '.' || 
              string[dividerPos - 3] === ':' ||
              string[dividerPos - 3] === '?' ||
              string[dividerPos - 3] === '!' ||
              string[dividerPos - 3] === ';')

            this.firstPart = string.slice(0,dividerPos-2) +'.. '
          else 
            this.firstPart = string.slice(0,dividerPos) + '... '
      
      },

      addToFavClick(id) {
        if(!this.isLoggedIn) return router.push('/login')
        this.addToFavAnimation = true;
        this.deleteFromFavAnimation = false;
        const addToFav = () => {
          this.updateFavArr([id, true]);
          this.popupAdd = false;
          this.isFavArrWasChanged = true
          this.axiosSaveFavBloggers()
        }
        setTimeout(addToFav, 200);

        
 
      },

      deleteFromFavClick(id) {
        if(!this.isLoggedIn) return router.push('/login')
        this.deleteFromFavAnimation = true;
        this.addToFavAnimation = false;

        const deleteFromFav = () => {
          this.popupDelete = false;
          this.updateFavArr([id, false])
          this.isFavArrWasChanged = true
          this.axiosSaveFavBloggers()
        };

        setTimeout(deleteFromFav, 200);

          


      }

    },

    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler);
    },
 
  }

</script>

<style lang="scss" scoped>


  @mixin Breakpoint750 {
    @media (max-width: 750px) {
       @content;
    }
  }

  @mixin Breakpoint480 {
    @media (max-width: 480px) {
       @content;
    }
  }

  @mixin Breakpoint320 {
    @media (max-width: 320px) {
       @content;
    }
  }

  .divider {
    content: '';
    position: absolute;
    width:100%;
    bottom:0px;
    height: 1px;
    background-color: #e8e8e8; 
  }

  .blogger-single {
    position: relative;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    box-shadow: 0px 10px 13.5px rgba(0,0,0,0.1);
    border-radius: 4px;
    margin-bottom: 30px;

    &__rockstar-wrapper {
      position: absolute;
      left: 22px;
      top: -11px;

      width: 118px;
      height: 22px;
      border-radius: 11px;
      background-color: #f8d247;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__rockstar-text {
      font-size: 11px;
      font-family: "Roboto-bold";
      text-align: center;
    }

    &__favourites-popup-wrapper {
      z-index: 1000;
      position: absolute;
      right: 23px;
      top: -15px;
      border-radius: 5px;
      background-color: #f8f8f8;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__favourites-popup-text {
      font-size: 11px;
      margin: 10px 14px;
  
      text-align: center;
    }

    &__column {
      margin: 0px 23px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    &__column_top {
      @include Breakpoint750 {
        justify-content: left;
      }
      @include Breakpoint480 {
        justify-content: space-between;
      }
    }

    &__row {
      display: flex;
      flex-direction: column;
    }
    
    &__photo-wrapper {
      width: 60px;
      height: 60px;
      margin-top: 23px;
      margin-right: 18px;
      
    }

    &__photo {
      display: block;
      max-width: 100%;
      border-radius: 100%;

    }

    &__row_name-and-themes {
      margin-right: auto;
      margin-top: 30px;
      @include Breakpoint750 {
        margin-right: 0px;
      }
      @include Breakpoint480 {
        margin-right: auto;
      }
    }

    &__name {
      font-size: 15px;
      color: #3f5baa;
      font-family: "Roboto-bold";
      text-decoration: underline;
    }

    &__themes-wrapper {
      margin-top: 7px;
      max-width: 170px;
      @include Breakpoint750 {
        max-width: 110px;
      }
    }

    &__themes-single {
      display: inline;
      color: #a3a3a3;
      line-height: 14px;

    }

    &__themes-margin-point-saver::before {
      content: '';
      margin-right: 4px;
      background-color: #fff;
    }

    &__favourites_wrapper {
      position: relative;
      margin-top:23px;
    }

    &__favourites {
     cursor: pointer;
     position: absolute;
     height: 22px;
    }

    &__favourites_scroll-track {
      cursor: pointer;
      right: 0;
      width: 35px;
      z-index: 1;
      overflow: hidden;
    }

    &__favourites_scroll-star {
      box-sizing: content-box;
      top: -5px;
      cursor: pointer;
      z-index: 2;
      // width: 32px;
      // height: 32px;
      padding: 5px 5px;


    }

    &__favourites_scroll-star-active {
      right: -5px;
      padding-left: 15px;
    }

    .deleteFromFavAnimation {
      transform: translateX(-13px);
      transition: all 0.3s ease 0s;
    }

    &__favourites_scroll-star-non-active {
      right: -2px;
      padding-right: 15px;
    }

    .addToFavAnimation {

      transform: translateX(13px);
      transition: all 0.3s ease 0s;
    }

    &__column_middle {
      margin-top: 30px;
      position: relative;

      &::after {
        margin: 0px 0px -28px 0px;
        content: '';
        position: absolute;
        width:100%;
        bottom:0px;
        height: 1px;
        background-color: #e8e8e8; 
        }

    }

    &__description {
      line-height: 18px;
    }

    &__show-more-btn {

      @include Breakpoint480 {
        cursor: pointer;
        display: block;
        margin-top: 18px;
        font-size: 13px;
        line-height: 18px;
        color: #3e5baa;
      }
    }

    .column-bottom {
      margin-top: 54px;
      margin-bottom: 37px;

      @include Breakpoint750 {
        flex-direction: column;
        &__top {
          position: relative;
          &::after {
            margin: 0px 0px -22px 0px;
            content: '';
            position: absolute;
            width:100%;
            bottom:0px;
            height: 1px;
            background-color: #e8e8e8; 
          }
        }
        &__middle {
          margin-top: 46px;
          position: relative;
          &::after {
            margin: 0px 0px -21px 0px;
            content: '';
            position: absolute;
            width:100%;
            bottom:0px;
            height: 1px;
            background-color: #e8e8e8; 
          }
        }
        &__bottom {
          margin-top: 43px;
          display: flex;
          flex-direction: row;
        }
      }
      @include Breakpoint480 {
        &__bottom {
          justify-content: space-between;
        }
      }
    }

    &__info-p-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 5px 0px;
      &:first-child {
        margin-top: 0px;
      }
      &:last-child {
        margin-bottom: 0px;
      }
      
    }

    &__svg-info {
      margin-right: 7px;
      margin-top: -3px;
      & img {
        width: 14px;
        height: 14px;
      }
    }

    &__info-p {
      &_center {
        text-align: center;
        @include Breakpoint750 {
          text-align: left;
          br {
            display: none;
          }
        }  
      }
    }

    &__yes-no-img-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 37px;
      margin: 0 auto;
      @include Breakpoint750 {
        margin-bottom: 13px;
        margin-left: 8px;
        justify-content: left;
      }
    }
    
    &__yes-no-img {
      width: 16px;
      height: 16px;
    }
  }

  .p-info {
        font-size: 13px;

        &__bold {
          font-family: 'Roboto-bold';
        }
  }

  .isInFav-750-left {
    @include Breakpoint750 {
      margin-left: 75px;
    }
    @include Breakpoint480 {
      margin-left: 0px;
    }
  }

  .isNotInFav-750-right {
    @include Breakpoint750 {
      margin-left: auto;
    }
    @include Breakpoint480 {
      margin-left: 0px;
    }
  }

</style>
