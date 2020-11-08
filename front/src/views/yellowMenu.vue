<template>

  <div class="main-menu">

    <div class="main-menu__content-wrapper content-wrapper" v-bind:class="{menuActive:menuActive}">

      <div class="for-scroll">

        <div class="menu">

          <header class="menu__header header">

            <router-link :to="'/home'" class="header__logo">
              <img src="@/assets/media/logo.svg" alt="" >
            </router-link>
        
            <div class="big-links-group header__big-links-group">

              <router-link :to="'/home'" class="big-links-group__single">

                <svg version="1.1" class="big-links-group__svg" id="blogger-search-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve">
                  <g>
                    <circle cx="16" cy="7.8" r="2.1"/>
                    <g>
                      <path d="M17.6,11.5h-3.2c-0.2,0-0.5,0-0.7,0.1c0.7,0.9,1.1,2,1.1,3.2v1.5H19c0.6,0,1-0.5,1-1v-1.4C20,12.6,18.9,11.5,17.6,11.5z"
                        />
                    </g>
                    <g>
                      <path d="M11.5,18.1c0.7,0,1.4-0.6,1.4-1.4v-1.9c0-1.8-1.5-3.3-3.3-3.3H9.3C8.7,11.8,8.1,12,7.4,12s-1.3-0.2-1.9-0.5H5.2
                        C3.4,11.6,2,13,2,14.8v1.9c0,0.7,0.6,1.4,1.4,1.4H11.5z"/>
                      <circle cx="7.4" cy="7.1" r="3.2"/>
                    </g>
                  </g>
                </svg>

                <span class="big-links-group__text">Поиск по блогерам</span>

              </router-link>

              <router-link v-if="!getUser._id" :to="'/registration'" class="big-links-group__single">

                <svg version="1.1" class="big-links-group__svg" id="sign-up-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve">

                  <g>
                    <g>
                      <circle cx="3.5" cy="19.4" r="1.5"/>
                      <circle cx="8.5" cy="19.4" r="1.5"/>
                      <circle cx="13.5" cy="19.4" r="1.5"/>
                      <circle cx="18.5" cy="19.4" r="1.5"/>
                    </g>
                    <circle class="mod-svg2" cx="11" cy="8.1" r="7"/>
                
                    <g>
                      <path d="M7,13.9c0.3,0.2,0.5,0.3,0.8,0.5C7.6,14.2,7.3,14,7,13.9z"/>
                      <path d="M15,13.9c-0.3,0.2-0.5,0.3-0.8,0.5C14.4,14.2,14.7,14,15,13.9z"/>
                      <path d="M15,13.8L15,13.8C15,13.8,15,13.9,15,13.8C15,13.9,15,13.8,15,13.8z"/>
                      <path d="M18,8.1c0-3.9-3.1-7-7-7s-7,3.1-7,7c0,2.4,1.2,4.5,3,5.7v-0.7c0-1.3,1.2-2.3,2.6-2.3h0.1h2.5h0.1c1.4,0,2.6,1,2.6,2.3v0.7
                        C16.8,12.6,18,10.5,18,8.1z M11.1,9.4c-1.3,0-2.3-1-2.3-2.3s1-2.3,2.3-2.3s2.3,1,2.3,2.3S12.3,9.4,11.1,9.4z"/>
                      <path d="M7,13.9C7,13.9,7,13.8,7,13.9L7,13.9C7,13.8,7,13.9,7,13.9z"/>
                    </g>
                  </g>
                </svg>

                <span class="big-links-group__text">Зарегистрироваться</span>

              </router-link>

              <router-link v-if="!getUser._id" :to="'/login'" class="big-links-group__single">

                <svg version="1.1" class="big-links-group__svg" id="enter-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve">
                  <g>
                    <path d="M3.6,2C3.7,2,3.7,2,3.6,2l8.1,0C13,2,14,3,14,4.3V5c0,0.4-0.3,0.8-0.7,0.8S12.5,5.4,12.5,5V4.3c0-0.4-0.3-0.7-0.8-0.7H8.3
                      l0.2,0.1c0.6,0.2,1,0.8,1,1.4v11.3h2.3c0.4,0,0.8-0.3,0.8-0.7V14c0-0.4,0.3-0.7,0.7-0.7S14,13.6,14,14v1.5c0,1.2-1,2.3-2.3,2.3H9.5
                      v0.7C9.5,19.3,8.8,20,8,20c-0.2,0-0.3,0-0.5-0.1L3,18.4c-0.6-0.2-1-0.8-1-1.4V3.5C2,2.6,2.8,1.9,3.6,2z"/>
                    <path d="M19.8,9l-3-3c-0.2-0.2-0.5-0.3-0.8-0.2c-0.3,0.1-0.5,0.4-0.5,0.7v2.3h-3c-0.4,0-0.7,0.3-0.7,0.7c0,0.4,0.3,0.8,0.7,0.8h3
                      v2.3c0,0.3,0.2,0.6,0.5,0.7c0.3,0.1,0.6,0.1,0.8-0.2l3-3C20.1,9.7,20.1,9.3,19.8,9z"/>
                  </g>
                </svg>

                <span class="big-links-group__text">Вход</span>

              </router-link>

              <router-link v-if="getUser._id" :to="'/login'" class="big-links-group__single">

                <svg version="1.1" class="big-links-group__svg" id="for-bloger-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve">
                  <g>
                    <circle cx="7.9" cy="5.3" r="4.1"/>
                    <path d="M11.7,20.8l2.1-0.2l4.8-4.8l-2.5-2.5L11.3,18l-0.2,2.1C11.1,20.5,11.3,20.8,11.7,20.8C11.7,20.8,11.7,20.8,11.7,20.8z"/>
                    <path d="M20.8,12.3L19.5,11c-0.3-0.3-0.9-0.3-1.2,0L17,12.3l-0.1,0.1l2.5,2.5l1.5-1.5C21.2,13.2,21.2,12.6,20.8,12.3z"/>
                    <g>
                      <path d="M11.2,19.2h2c1,0,1.7-0.8,1.7-1.7V15c0-0.2,0-0.4-0.1-0.5L11.3,18L11.2,19.2z"/>
                      <path d="M9.3,17.8l0.1-0.7l0.5-0.5l4.1-4.1c-0.8-1-2-1.7-3.3-1.7h-0.3c-0.8,0.4-1.6,0.6-2.5,0.6s-1.7-0.2-2.5-0.6H5.1
                      c-2.3,0-4.2,1.9-4.2,4.2v2.4c0,1,0.8,1.7,1.7,1.7h6.5L9.3,17.8z"/>
                    </g>
                  </g>
                </svg>

                <span class="big-links-group__text">Личный кабинет</span>

              </router-link>

              <router-link v-if="getUser._id" :to="'/login'" class="big-links-group__single">

                <svg data-v-7ad3b522="" class="big-links-group__svg" version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" xml:space="preserve" >
                  <g data-v-7ad3b522="">
                  <path data-v-7ad3b522="" d="M16.4,0C16.3,0,16.3,0,16.4,0L8.3,0C7,0,6,1,6,2.3V3c0,0.4,0.3,0.8,0.7,0.8S7.5,3.4,7.5,3V2.3c0-0.4,0.3-0.7,0.8-0.7h3.5
                    l-0.2,0.1c-0.6,0.2-1,0.8-1,1.4v11.3H8.3c-0.4,0-0.8-0.3-0.8-0.7V12c0-0.4-0.3-0.7-0.7-0.7S6,11.6,6,12v1.5c0,1.2,1,2.3,2.3,2.3
                    h2.3v0.7c0,0.8,0.7,1.5,1.5,1.5c0.2,0,0.3,0,0.5-0.1l4.5-1.5c0.6-0.2,1-0.8,1-1.4V1.5C18,0.6,17.2-0.1,16.4,0z"></path><path data-v-7ad3b522="" d="M8,7L5,4C4.8,3.8,4.5,3.7,4.2,3.8C3.9,3.9,3.8,4.2,3.8,4.5v2.3h-3C0.3,6.8,0,7.1,0,7.5c0,0.4,0.3,0.8,0.7,0.8h3v2.3
                    c0,0.3,0.2,0.6,0.5,0.7C4.5,11.3,4.8,11.2,5,11l3-3C8.3,7.7,8.3,7.3,8,7z"></path>
                    </g>
                </svg>

                <span class="big-links-group__text">Выход</span>

              </router-link>

            </div>

          </header>

          <nav class="menu__nav">
            
            <div class="big-links-group big-links-group_nav">

              <router-link :to="'/home'" class="big-links-group__single">

                <svg version="1.1" class="big-links-group__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"> 
                  <g>
                    <g>
                      <path class="st0" d="M11,2c-5,0-9,4-9,9s4,9,9,9c5,0,9-4,9-9S16,2,11,2z M11,17.1c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3
                        c0.7,0,1.3,0.6,1.3,1.3C12.3,16.5,11.7,17.1,11,17.1z M12.1,12.3v0.3c0,0.6-0.5,1.1-1.1,1.1c-0.6,0-1.1-0.5-1.1-1.1v-0.9
                        c0-0.3,0.2-0.6,0.4-0.8c0.2-0.2,0.4-0.3,0.7-0.3c0.9,0,1.6-0.7,1.6-1.6c0-0.9-0.7-1.6-1.6-1.6c-0.9,0-1.6,0.7-1.6,1.6
                        C9.4,9.5,9,10,8.4,10S7.5,9.5,7.5,9c0-1.9,1.6-3.5,3.5-3.5c1.9,0,3.5,1.6,3.5,3.5C14.5,10.6,13.5,11.9,12.1,12.3z"/>
                    </g>
                  </g>
                </svg>

                <span class="big-links-group__text">С чего начать</span>

              </router-link>

              <router-link :to="'/home'" class="big-links-group__single">

                <svg version="1.1" class="big-links-group__svg" id="for-bloger-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve">
                  <g>
                    <circle cx="7.9" cy="5.3" r="4.1"/>
                    <path d="M11.7,20.8l2.1-0.2l4.8-4.8l-2.5-2.5L11.3,18l-0.2,2.1C11.1,20.5,11.3,20.8,11.7,20.8C11.7,20.8,11.7,20.8,11.7,20.8z"/>
                    <path d="M20.8,12.3L19.5,11c-0.3-0.3-0.9-0.3-1.2,0L17,12.3l-0.1,0.1l2.5,2.5l1.5-1.5C21.2,13.2,21.2,12.6,20.8,12.3z"/>
                    <g>
                      <path d="M11.2,19.2h2c1,0,1.7-0.8,1.7-1.7V15c0-0.2,0-0.4-0.1-0.5L11.3,18L11.2,19.2z"/>
                      <path d="M9.3,17.8l0.1-0.7l0.5-0.5l4.1-4.1c-0.8-1-2-1.7-3.3-1.7h-0.3c-0.8,0.4-1.6,0.6-2.5,0.6s-1.7-0.2-2.5-0.6H5.1
                      c-2.3,0-4.2,1.9-4.2,4.2v2.4c0,1,0.8,1.7,1.7,1.7h6.5L9.3,17.8z"/>
                    </g>
                  </g>
                </svg>

                <span class="big-links-group__text">Для блогера</span>

              </router-link>

              <router-link :to="'/home'" class="big-links-group__single">

                <svg version="1.1" class="big-links-group__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve">
                  <g>
                    <circle cx="11" cy="6.1" r="4.1"/>
                      <path d="M13.9,11.6l-1.5,6l-1-4.3l1-1.8h-3l1,1.8l-1,4.3l-1.5-6c-2.2,0.1-5,1.9-5,4.2v2.4c0,1,0.8,1.7,1.7,1.7h12.7
                    c1,0,1.7-0.8,1.7-1.7v-2.4C19.1,13.5,16.2,11.7,13.9,11.6z"/>
                  </g>
                </svg>
              
                <span class="big-links-group__text">Для рекламодателя</span>

              </router-link>

              <router-link :to="'/home'" class="big-links-group__single">

                <svg version="1.1" id="Layer_2" class="big-links-group__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve">

                  <g>
                    <path class="st0" d="M11,2c-5,0-9,4-9,9s4,9,9,9c5,0,9-4,9-9S16,2,11,2z M11,15.7c-0.7,0-1.3-0.6-1.3-1.3s0.6-1.3,1.3-1.3
                      c0.7,0,1.3,0.6,1.3,1.3S11.7,15.7,11,15.7z M12.1,11.2c0,0.6-0.5,1.1-1.1,1.1c-0.6,0-1.1-0.5-1.1-1.1V7.6c0-0.6,0.5-1.1,1.1-1.1
                      c0.6,0,1.1,0.5,1.1,1.1V11.2z"/>
                  </g>
                </svg>

                <span class="big-links-group__text">Правила работы</span>

              </router-link>

            </div>
          </nav>

          <div class="menu__banner-wrapper">
            <img src="@/assets/uploads/black.png" alt="" class="menu__banner-img">
          </div>

          <footer class="menu__footer">
            <h5 class="menu__prime-bloggers">&copy; 2020 Rockstarbloggers</h5>
            <div class="menu__footer-group-link">
              <router-link class="menu__footer-link-single" :to="'/home'">Контакты</router-link>
              <router-link class="menu__footer-link-single" :to="'/home'">Оферта</router-link>
              <router-link class="menu__footer-link-single" :to="'/home'">Политика конфеденциальности</router-link>
              <router-link class="menu__footer-link-single" :to="'/home'">Пользовательское соглашение</router-link>
            </div>
          </footer>

        </div>
      </div>
    </div>

    <div v-bind:class="{'main-menu__cross-wrapper': menuActive}" class="main-menu__burger-wrapper">
      
      <div class="main-menu__burger" v-if='!menuActive' v-on:click="showMenu()">
        <span></span>
      </div>
    
      <svg version="1.1" class="main-menu__cross" 
        v-if='menuActive' v-on:click="hideMenu()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 12 12" style="enable-background:new 0 0 12 12;" xml:space="preserve">
          <polygon points="12,0.6 11.4,0 6,5.4 0.6,0 0,0.6 5.4,6 0,11.4 0.6,12 6,6.6 11.4,12 12,11.4 6.6,6 "/>
      </svg>
    
    
    
    
    
    </div>

    <div class="main-menu__fullscreenShadow" v-bind:class="{fullscreenShadowActive:menuActive}" v-on:click="hideMenu()"></div>

  </div>
</template>

<script>
  import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
  import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
  import 'simplebar/dist/simplebar.css';
  import {mapGetters,mapActions} from 'vuex'

  export default {
    name: 'YellowMenu',


    data() { 
      return {
        menuActive: false,
      }
     },

    computed: mapGetters(["getUser",]),
    methods: {
      showMenu() {
        this.menuActive = true
        disableBodyScroll(document.getElementsByTagName('body'))
      },

      hideMenu() {
        this.menuActive = false
        enableBodyScroll(document.getElementsByTagName('body'))
      }
    } 

  }


</script>

<style lang="scss" scoped>

  @mixin mainBreakpoint {
    @media (max-width: 1170px) {
      @content;
    }
  }

  @mixin divider($bot){
    margin: 0px 0px 0px -$bot;
  }

  .main-menu {
    &__burger-wrapper {
      display: none;
      position: absolute;
      top: 23px;
      left:15px;
      // -webkit-transition: all 0.5s ease 0s;
      // transition: all 0.5s ease 0s;
      @include mainBreakpoint {
        display: block;
      }
    }

    &__cross-wrapper {
      // -webkit-transition: all 0.5s ease 0s;
      // transition: all 0.5s ease 0s;
      left:293px;
      top:12px
    }

    &__burger {
      color: black;
      z-index: 51;
      position: relative;
      display: block;
      height: 14px;
      width: 20px;

      &::before {
        top: 0px;
        height: 2px;
      }
      &::before, &::after {
        content: '';
        background-color: black;
        color: black;
        position: absolute;
        width: 100%;
        left: 0;
      }

      & span{
        color: black;
        position: absolute;
        background-color: black;
        width: 100%;
        height: 1.5px;
        left: 0;
        top: 6px;

      }
      &::after {
        bottom: 0px;
        height: 2px;
      }
    }

    &__cross {
      z-index: 51;
      position: relative;
      display: block;
      height: 12px;
      width: 12px;
      fill:#ffffff;
    }

    &__fullscreenShadow {
      display: none;
      overflow: hidden;
      z-index: 50;
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      opacity: 0.1;
      background-color: black;
    }

    .fullscreenShadowActive {
      display: block;
      opacity: 0.8;
    }
  

    .content-wrapper {
      z-index: 51;
      left: 0px;
      top: 0px;
      position: fixed;
      width: 278px;
      height: 100%;
      background-color: rgb(245,196,42);
      transition: all 0.5s ease 0s;

      @include mainBreakpoint {
        left: -278px;
      }

    }

    .menuActive {
      @include mainBreakpoint {
        left: 0%;
      }
    }

    .for-scroll {
      background-color: rgb(245,196,42);
      height: 100vh;
      
    }
  
    .menu {
      margin-right: 5px;
      -ms-overflow-style: auto;  /* IE and Edge */
      scrollbar-width: 50px;
      scrollbar-width: none;  /* Firefox */
  
      width: 273px;
      // position: fixed;
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      background-color: rgb(245,196,42);

      &::-webkit-scrollbar {
        width: 3px;
      } 

      &::-ms-scrollbar {
        width: 2px;
      }
      
      &::-moz-scrollbar {
        width: 2px;
      }

      &::-webkit-scrollbar-thumb {
        max-height: 20px;
        background-color: black;
      } 

      &::-webkit-scrollbar-track {
        background-color: rgb(219,177,29); /* or add it to the track */
      } 

      &__header {
        height: 217px;
      }

      &__nav {
        margin-top: 52px;
      }

      &__banner-wrapper {
        margin: 31px 26px 0px 31px;
        position: relative;
        &:after {
          @extend .divider;
          @include divider(30px);
        }
      }

      &__banner-img {
        width: 216px;
        height: 301px;
      }

      &__footer {
        margin: 57px 77px 30px 29px;
        width: 167px;
        height: 86px;
        display: flex;
        flex-direction: column;
      }

      &__prime-bloggers {
        font-size: 12px;
        font-family: "Roboto-bold";  
      }

      &__footer-group-link {
        margin: 6px 0px 5px 0px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }   

      &__footer-link-single {
        font-size: 11px;
        line-height: 17px;
        color: #000000; 
        font-family: "Roboto-regular";

        
        text-decoration: underline;
        color: black;
        &:hover {
          color: white;
        }
      }

    }

    .header {
      display: flex;
      flex-direction: column;

      &__logo {
        width: 215px;
        margin: 22px 28px 20px 30px;
        position: relative;
        &:after {
          @extend .divider;
          @include divider(20px)
        }
      }

      &__big-links-group {
        margin-top: 26px;
        position: relative;
        height: 89px;

      &:after {
        @extend .divider;
        @include divider(26px);

        }
      }
    }

    .divider {
      content: '';
      position: absolute;
      width:216px;
      bottom:0px;
      height: 1px;
      background-color: black;
      left: 0;
    }

    .big-links-group {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left:30px;
    
      &__single {
        display: flex;
        flex-direction: row;
        justify-content: left;

        &:hover {
          svg {
            fill: white;
          }
          .mod-svg2 {
            stroke: white;
          }
          .big-links-group__text {
            color: white;
          }
        }
      }

      &__svg {
        width: 22px;
        height: 22px;
        margin-right: 10px;
        margin-top: -2px;
      }

      & #sign-up-svg {
        margin-right: 11px;
      }

      & #enter-svg {
        margin-left: 3px;
        margin-right: 8px;
      }

      & #blogger-search-svg {
        margin-left: 1px;
      }

      & #for-bloger-svg {
        margin-left: 3px;
        margin-right: 7px;
      }

      &__text {
      font-size: 17px;
      color: black;
      font-family: "Oswald", sans-serif;
      font-weight: 400;
      }

    }

    .mod-svg2 {
      fill:none;stroke:#000000;stroke-width:1.5;stroke-miterlimit:10;
    }

    .big-links-group_nav {
      height: 124px;
    }

  }

</style>
