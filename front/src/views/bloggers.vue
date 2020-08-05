<template>

  <div class="wrapper">

    <div class="bloggers">

      <div class="bloggers__header">

        <div class="bloggers__row">
          <h1 class="bloggers__title">Поиск по блогерам</h1>

          <router-link class="bloggers__enter-link" :to="'/dashboard'">

            <span class="bloggers__enter">Вход</span> 

            <svg version="1.1" class="bloggers__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve">
              <g>
                <path d="M3.6,2C3.7,2,3.7,2,3.6,2l8.1,0C13,2,14,3,14,4.3V5c0,0.4-0.3,0.8-0.7,0.8S12.5,5.4,12.5,5V4.3c0-0.4-0.3-0.7-0.8-0.7H8.3
                  l0.2,0.1c0.6,0.2,1,0.8,1,1.4v11.3h2.3c0.4,0,0.8-0.3,0.8-0.7V14c0-0.4,0.3-0.7,0.7-0.7S14,13.6,14,14v1.5c0,1.2-1,2.3-2.3,2.3H9.5
                  v0.7C9.5,19.3,8.8,20,8,20c-0.2,0-0.3,0-0.5-0.1L3,18.4c-0.6-0.2-1-0.8-1-1.4V3.5C2,2.6,2.8,1.9,3.6,2z"/>
                <path d="M19.8,9l-3-3c-0.2-0.2-0.5-0.3-0.8-0.2c-0.3,0.1-0.5,0.4-0.5,0.7v2.3h-3c-0.4,0-0.7,0.3-0.7,0.7c0,0.4,0.3,0.8,0.7,0.8h3
                  v2.3c0,0.3,0.2,0.6,0.5,0.7c0.3,0.1,0.6,0.1,0.8-0.2l3-3C20.1,9.7,20.1,9.3,19.8,9z"/>
              </g>

            </svg>
            
          </router-link>

        </div>

        <div class="bloggers__row bloggers__row-mt">          

          <h2 class="bloggers__numbers" v-if="getAllBloggers.blogger">Найдено блогеров: {{getAllBloggers.blogger.length}},228</h2>
          
          <div class="bloggers__sort sort" v-if="sortOpt">
              
            <select v-model="sortBy" v-on:change="sort()" class="sort__select">

              <option v-for="opt in sortOpt" :key="opt" :value="opt" >
                  <p>{{opt}}</p>  
              </option>
                    
            </select>
              
            <button class="sort__btn">
                <span >↑</span>
                <span class="sort__grey-arrow">↓</span>
            </button>

          </div>

        </div>

      </div>

      <div class="bloggers__main" v-if="getAllBloggers">

        <div v-for="(blogger) in getAllBloggers.blogger" :key="blogger._id"> 

        <bloggerCard class="bloggers__content"  v-bind:blogger="blogger" />

        </div>  

      </div>  

    </div>

  </div>

</template>

<script>

  import {mapGetters,mapActions, mapState} from 'vuex'
  import BloggerCard from '@/views/blogger-card'

  export default {

    name: 'bloggers',

    components: {
       BloggerCard,
    },

    data() {
      return {
        filtersValue: {},
        sortOpt: ['По подписчикам', 'По цене'],
        sortBy: 'По подписчикам'
      }   
    },

    computed: {
    ...mapState(["allBloggers"]),
    ...mapGetters(["getAllBloggers", 'isLoggedIn', 'getUser', 'getFavArr'],), 
    
    },

    mounted() {
      this.fetchAllBloggers({})
      console.log(this.getFavArr)
    },

    methods: { 
      ...mapActions(["fetchAllBloggers"],),
      sort() {
        console.log(this.sortBy);
      },
    },

  }
</script>

<style lang="scss" scoped>

  @mixin mainBreakpoint {
    @media (max-width: 1170px) {
      @content;
    }
  }

  @mixin Breakpoint970 {
    @media (max-width: 970px) {
      @content;
    }
  }

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

  .wrapper {
    background-color: #f8f8f8;
    width: 100%;
    margin-left: 211px;
    display: flex;
    justify-content: center;
    font-family: "Roboto-regular";
    @include mainBreakpoint {
      margin-left: 0px;
    }
  }

  .bloggers {
    width: 652px;
    margin: 0px 15px;
    display: flex;
    flex-direction: column; 
    @include Breakpoint970 {
      margin-top: 40px;
    }

    &__header {
      display: flex;
      flex-direction: column;
    }
    &__row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    &__row-mt {
      margin-top: 29px;
      @include Breakpoint750 {
        display: flex;
        flex-direction: column-reverse;
      }
    }

    &__title {
      margin-top: 24px;
      font-size: 33px;
      font-weight: 400;
      font-family: "Oswald";
    }

    &__enter-link {
       
      margin-top: 38px;
      display: flex;
      @include Breakpoint970 {
        position: absolute;
        top: 23px;
        right: 15px;
        margin-top: 0px;
      }
    }

    &__enter {
      font-family: "Roboto-regular";
      font-size: 12px;
      color: #000000;
      font-weight: 400;
      margin-right: 5px;
      // поставить padding для уравнивания с svg
      
    }
    &__svg {
      width: 12px;
      height: 12px;
    }

    &__numbers {
      font-size: 16px;
      @include Breakpoint750 {
        margin-top: 20px;
      }
    }

    .sort {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @include Breakpoint750 {
        justify-content: left;
      }

      &__select {
        display: block;
        width: 219px;
        height: 31px;
        border-radius: 3px;
        background-color: #e8e8e8;
        padding-left: 12px;
        font-family: 'Roboto';
        font-size: 13px;
        line-height: 18px;
        
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        
        background-image: url(~@/assets/media/Arrow-down.svg);
        background-repeat: no-repeat, repeat;
        background-position: right .7em top 50%, 0 0;
        background-size: .65em auto, 100%;
        cursor: pointer;

        &::-ms-expand {
	        display: none;
        }
        
      }

      &__btn {
        margin-right: 8px;
        margin-left: 11px;
        background-color: transparent;
        font-size: 14px;
        letter-spacing: 1px;
        line-height: 18px;
        text-align: center;
      }

      &__grey-arrow {
        color: grey
      }

    }

    &__main {
      margin-top: 20px;
      @include Breakpoint480 {
        margin-top: 25px;
      }
    }

  }

</style>


