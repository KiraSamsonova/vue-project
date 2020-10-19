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

          <h2 class="bloggers__numbers" v-if="getAllBloggers">
            Найдено блогеров: {{getAllBloggersLength | numbers(getAllBloggersLength)}}</h2>



          <div class="bloggers__sort sort" v-if="sortOpt">
              
            <select v-model="sortBy" v-on:change="sort()" class="sort__select">

              <option v-for="opt in sortOpt" :key="opt" :value="opt" >
                  <p>{{opt}}</p>  
              </option>
                    
            </select>
              
            <button class="sort__btn" v-on:click="reverse()">
                <span >↑</span>
                <span class="sort__grey-arrow">↓</span>
            </button>

          </div>

        </div>

      </div>

      <div class="bloggers__main" v-if="getAllBloggers">

        <div v-for="(blogger) in getAllBloggersPaginated" :key="blogger._id"> 

        <bloggerCard class="bloggers__content"  v-bind:blogger="blogger" />

        </div>  

        <div class="bloggers__pagination pagination">

          <svg v-if="getCurrentpaginationPage > 2"  v-on:click="paginate(1)" class="pagination__shevron"
            version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 9 9" style="enable-background:new 0 0 9 9;" xml:space="preserve">
            <g>
              <g>
                <path d="M8.5,9c0.1,0,0.3,0,0.4-0.1C9,8.7,9,8.3,8.9,8.1L5.2,4.5l3.6-3.6C9,0.7,9,0.3,8.9,0.1S8.3,0,8.1,0.1l-4,4
                  C4,4.3,4,4.7,4.1,4.9l4,4C8.2,9,8.4,9,8.5,9z"/>
              </g>
              <g>
                <path d="M4.5,9c0.1,0,0.3,0,0.4-0.1C5,8.7,5,8.3,4.9,8.1L1.2,4.5l3.6-3.6C5,0.7,5,0.3,4.9,0.1S4.3,0,4.1,0.1l-4,4
                  C0,4.3,0,4.7,0.1,4.9l4,4C4.2,9,4.4,9,4.5,9z"/>
              </g>
            </g>
          </svg>

          <svg v-if="getCurrentpaginationPage > 1" v-on:click="paginate(getCurrentpaginationPage-+1)" class="pagination__shevron"
            version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 5 9" style="enable-background:new 0 0 5 9;" xml:space="preserve">
            <g>
              <path d="M4.5,9c0.1,0,0.3,0,0.4-0.1C5,8.7,5,8.3,4.9,8.1L1.2,4.5l3.6-3.6C5,0.7,5,0.3,4.9,0.1S4.3,0,4.1,0.1l-4,4
                C0,4.3,0,4.7,0.1,4.9l4,4C4.2,9,4.4,9,4.5,9z"/>
            </g>
          </svg>


          <p v-if="getCurrentpaginationPage > 2 && getPaginationPagesNumber.length > 2" 
            class="pagination__points">
            ..
          </p>

          <div class="pagination__numbers one" v-if="getCurrentpaginationPage == 1">
            <p class="pagination__active-page">1</p>
            <p v-on:click="paginate(2)" v-if="getPaginationPagesNumber.length >= 2">2</p>
            <p v-on:click="paginate(3)" v-if="getPaginationPagesNumber.length >= 3">3</p>
          </div>


          <div class="pagination__numbers two"
            v-if="getCurrentpaginationPage > 1 && getCurrentpaginationPage < getPaginationPagesNumber.length 
            || getCurrentpaginationPage > 1 && getPaginationPagesNumber.length == 2">
              
          <p v-if="getPaginationPagesNumber.length >= 2 "
            v-on:click="paginate(+getCurrentpaginationPage-+1)">

            {{getCurrentpaginationPage-+1}}

          </p>

          <p class="pagination__active-page">
                
            {{getCurrentpaginationPage}}
                
          </p>

          <p v-if="getPaginationPagesNumber.length > 2"
            v-on:click="paginate(+getCurrentpaginationPage+1)">

            {{getCurrentpaginationPage+1}}

          </p>

          </div>

          <div class="pagination__numbers" 
            v-if="getCurrentpaginationPage == getPaginationPagesNumber.length && getPaginationPagesNumber.length >= 3">

            <p v-on:click="paginate(getPaginationPagesNumber.length-+2)">
              {{getPaginationPagesNumber.length-+2}}
            </p>

            <p v-on:click="paginate(getPaginationPagesNumber.length-+1)">
              {{getPaginationPagesNumber.length-+1}}
            </p>

            <p class="pagination__active-page">

              {{getPaginationPagesNumber.length}}

            </p>

          </div>

          <p v-if="+getPaginationPagesNumber.length - +getCurrentpaginationPage >= 2 && getPaginationPagesNumber.length > 2"
            class="pagination__points">
            ..
          </p>

          <svg version="1.1" v-on:click="paginate(getCurrentpaginationPage+1)" class="pagination__shevron"
            v-if="+getPaginationPagesNumber.length - +getCurrentpaginationPage >= 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 5 9" style="enable-background:new 0 0 5 9;" xml:space="preserve">
            <g>
              <path d="M0.5,9C0.4,9,0.2,9,0.1,8.9C0,8.7,0,8.3,0.1,8.1l3.6-3.6L0.1,0.9C0,0.7,0,0.3,0.1,0.1s0.5-0.2,0.7,0l4,4
                C5,4.3,5,4.7,4.9,4.9l-4,4C0.8,9,0.6,9,0.5,9z"/>
            </g>
          </svg>

          <svg v-on:click="paginate(getPaginationPagesNumber.length)" class="pagination__shevron"
            v-if="+getPaginationPagesNumber.length - +getCurrentpaginationPage >= 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 9 9" style="enable-background:new 0 0 9 9;" xml:space="preserve">
              <g>
                <g>
                  <path d="M0.5,9C0.4,9,0.2,9,0.1,8.9C0,8.7,0,8.3,0.1,8.1l3.6-3.6L0.1,0.9C0,0.7,0,0.3,0.1,0.1s0.5-0.2,0.7,0l4,4
                    C5,4.3,5,4.7,4.9,4.9l-4,4C0.8,9,0.6,9,0.5,9z"/>
                </g>
                <g>
                  <path d="M4.5,9C4.4,9,4.2,9,4.1,8.9C4,8.7,4,8.3,4.1,8.1l3.6-3.6L4.1,0.9C4,0.7,4,0.3,4.1,0.1s0.5-0.2,0.7,0l4,4
                    C9,4.3,9,4.7,8.9,4.9l-4,4C4.8,9,4.6,9,4.5,9z"/>
                </g>
              </g>
          </svg>

        </div>

      </div>  

    </div>

  </div>

</template>

<script>

  import {mapGetters,mapActions,mapMutations, mapState} from 'vuex'
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

    ...mapGetters([
      "getAllBloggers",'getCurrentpaginationPage',
       'getPaginationPagesNumber', 'getAllBloggersLength',
       'getAllBloggersPaginated', 'isLoggedIn', 'getUser', 'getFavArr'
    ]), 
    },


    methods: { 

      ...mapMutations(['changePage']),

      paginate(number) {
        this.changePage(number)

        window.scrollTo({
          top: 0,
          behavior: "smooth"
         });
      },

      sort() {
        if (this.sortBy === 'По цене'){
          this.getAllBloggers.sort((a, b) => {
            return a.postPrice-b.postPrice
          })
        } else if (this.sortBy === 'По подписчикам') {
            this.getAllBloggers.sort((a, b) => {
              return b.subscribersNumber-a.subscribersNumber
            })
        };
      },

      reverse() {
        this.getAllBloggers.reverse()
      }

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
      margin-top: 21px;
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
        font-family: 'Roboto-regular';
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
      margin-bottom: 120px;
      position: relative;
      @include Breakpoint480 {
        margin-top: 25px;
      }
    }

    &__pagination {
      position: absolute;
      bottom: -45px;
      right: 10px;
    }

  }

  .pagination {
    display: flex;
    font-size: 15px;
    color: grey;

    &__shevron {
      color: black;
      margin: 0px 3px;
      height: 10px;
      width: 10px;
    }

    &__numbers {
      display: flex;
      letter-spacing: 5px;
      cursor: pointer;
    }

    &__active-page {
      color: black;
      cursor: default;
    }

    &__points {
      margin: 0px 2px;
      letter-spacing: 2px;
    }
  }

</style>


