<template>
  <div class='layout'>

    <yellowMenu class="layout__menu" />

  <div class="dashboard">

    <div class="dashboard__container">

        <div class="dashboard__title-enter row">

            <h1 class="dashboard__title">Личный кабинет</h1>

            <div class="dashboard__coming-out">
                <div class="dashboard__enter-link enter-link" v-on:click="logout()">

                    <span class="enter-link__text">Выход</span> 

                    <svg version="1.1" id="Layer_2" class="enter-link__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
                        <g>
                            <path d="M16.4,0C16.3,0,16.3,0,16.4,0L8.3,0C7,0,6,1,6,2.3V3c0,0.4,0.3,0.8,0.7,0.8S7.5,3.4,7.5,3V2.3c0-0.4,0.3-0.7,0.8-0.7h3.5
                                l-0.2,0.1c-0.6,0.2-1,0.8-1,1.4v11.3H8.3c-0.4,0-0.8-0.3-0.8-0.7V12c0-0.4-0.3-0.7-0.7-0.7S6,11.6,6,12v1.5c0,1.2,1,2.3,2.3,2.3
                                h2.3v0.7c0,0.8,0.7,1.5,1.5,1.5c0.2,0,0.3,0,0.5-0.1l4.5-1.5c0.6-0.2,1-0.8,1-1.4V1.5C18,0.6,17.2-0.1,16.4,0z"/>
                            <path d="M8,7L5,4C4.8,3.8,4.5,3.7,4.2,3.8C3.9,3.9,3.8,4.2,3.8,4.5v2.3h-3C0.3,6.8,0,7.1,0,7.5c0,0.4,0.3,0.8,0.7,0.8h3v2.3
                                c0,0.3,0.2,0.6,0.5,0.7C4.5,11.3,4.8,11.2,5,11l3-3C8.3,7.7,8.3,7.3,8,7z"/>
                        </g>
                    </svg>
                    
                </div>

            </div>
            
        </div>

        <div class="dashboard__email-role row">

          <router-link :to="'/settings'" class="dashboard__email">

            <p class="dashboard__email-text">{{getUser.email}}</p>

            <svg version="1.1" class="dashboard__email-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 13 13" style="enable-background:new 0 0 13 13;" xml:space="preserve">

              <g>
                <path class="st0" d="M3.1,5.3C3.1,4.2,4,3.4,5,3.4c0.8,0,1.5,0.5,1.8,1.3l2.3-2.3L8,1.2c-0.1-0.1-0.3-0.1-0.5,0L7,1.7
                  C6.7,1.6,6.4,1.5,6.1,1.4V0.6c0-0.2-0.2-0.3-0.3-0.3H4.3c-0.2,0-0.3,0.1-0.3,0.3v0.8C3.6,1.5,3.3,1.6,3,1.7L2.5,1.2
                  C2.3,1.1,2.1,1.1,2,1.2l-1,1C0.8,2.4,0.8,2.6,1,2.7l0.5,0.5C1.3,3.5,1.2,3.8,1.1,4.2H0.3C0.1,4.2,0,4.3,0,4.5V6
                  c0,0.2,0.1,0.3,0.3,0.3h0.8C1.2,6.7,1.3,7,1.5,7.2L0.9,7.8c-0.1,0.1-0.1,0.3,0,0.5l1.1,1.1L4.4,7C3.6,6.8,3.1,6.1,3.1,5.3z"/>
                <g>
                  <rect x="10.1" y="2.9" transform="matrix(0.7071 -0.7071 0.7071 0.7071 0.124 9.1959)" class="st0" width="2.1" height="3.1"/>
                  <polygon class="st0" points="8.6,4.8 3.4,10 2.9,12.7 5.6,12.2 10.8,7 		"/>
                </g>
              </g>
            </svg>

          </router-link>

          <div class="dashboard__role">

            <p class="dashboard__role-label" 
              v-on:click="changeRole('blogger')" v-bind:class="{'dashboard__role-label-checked': !role}">
              Блогер
            </p>

            <div class="role-input">
                
              <input type="checkbox" class="role-input__input" id='role-input' v-model="role" v-on:click="changeRole()" checked>
              <label for="role-input" class="role-input__comma" v-bind:class="{'role-input__comma-checked': role}">·</label>  
                
            </div>

          <p class="dashboard__role-label" 
            v-on:click="changeRole('advertiser')" v-bind:class="{'dashboard__role-label-checked': role}">
            Рекламодатель
          </p>

          </div>

        </div>

        <div class="dashboard__content">
            <router-view class="layout__router"></router-view>
        </div>

    </div>

  </div>


  </div>
</template> 

<script>
  import {mapGetters,mapActions} from 'vuex'
  import router from '@/router/index.js'
  import YellowMenu from '@/views/yellowMenu'
  export default {
    name: 'DashboardLayout',
    components: {
      YellowMenu
    },
    
    data() {
      return {
        content: '',
        role: true,
        }
    },
    computed: 
      mapGetters(['getUser']),

    mounted() {
      if(this.getUser.role === 'blogger') this.role = false
    },
    methods: { 
      ...mapActions(["logout", 'axiosChangeRole', 'testRole']),

      changeRole(role) {

        if(window.location.pathname !== '/settings')
        router.push('settings')

        if(role === 'blogger') this.role = false
        else if (role === 'advertiser') this.role = true
        else {
          if(this.getUser.role === 'blogger') role = 'advertiser'
          if(this.getUser.role === 'advertiser') role = 'blogger'
        }
        
        this.axiosChangeRole(role)
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

  .layout {
    display: flex;

    &__router {
      padding: 35px 25px 50px 25px;
      font-family: 'Roboto-regular';
    }
  }

  .dashboard {
    font-family: 'Roboto-regular';
    width: 100%;
    height: 100%;
    margin-left: 278px;
    display: flex;
    justify-content: center;
    @include mainBreakpoint {
      margin-left: 0px;
    }

    &__container {
      width:653px;
      margin-top: 25px;
      @include Breakpoint750 {
        width: 100%;
        max-width: 653px;
        margin-left: 15px;
        margin-right: 15px;
      }
    }

    &__title {
      font-size: 33px;
      color: #000000;
      font-weight: 400;
      font-family: "Oswald";
      @include Breakpoint970 {
        margin-top: 52px;
      }
    }

    &__coming-out {  
      margin-top: 13px;
    }

    &__email-role {
      margin-top: 56px;
    }

    &__email {
      display: flex;
      color: #3f5baa;
      font-size: 13px;
    }

    &__email-svg {
      margin-left: 7px; 
      width: 13px;
      height: 13px; 
    }

    &__role {
      display: flex; 
    }

    &__role-label {
      padding: 5px;
      margin: -7px 5px 0px 5px;
      color: #a3a3a3;

      &-checked {
        color: black;
      }
    }

    &__content {
      background-color: #fff;
      box-shadow: 0px 10px 13.5px rgba(0,0,0,0.1);
      border-radius: 4px;
      margin-top: 17px;
      margin-bottom: 200px;
    }

  }

  .enter-link {
    display: flex;
    @include Breakpoint970 {
      position: absolute;
      top: 23px;
      right: 15px;
      margin-top: 0px;
    }

    &__text {
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

  }

  .row {
    display: flex;
    justify-content: space-between;
  }

.st0{fill:#3F5BAA;}

.role-input {
  position: relative;

  &__input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    background-color: #e6e6e6;
    display: inline-block;
    position: relative;
    transition: all 0.2s ease;
    width: 28px;
    height: 16px;
    border-radius: 7px;

    &:after {
      content: "";
      width: 13px;
      height: 13px;
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 50%;
      background: white;
      transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
    }

    &:checked:after{
      transform: translatex(13px);
    }

  }

  &__comma{
    position: absolute;
    font-size: 60px;
    color: #3f5baa;
    top: -21px;
    left: -0.5px;
    transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
    
  }

  &__comma-checked{
    transform: translatex(13px);
  }
}



</style>