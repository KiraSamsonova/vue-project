<template>
  <form @submit.prevent="submit()" class="form">

      <div class="form__container">

        <h1 class="form__title">Вход</h1>

        <div class="card card_registration">

          <div class="card__container" >

            <div class="text-input text-input-top" v-bind:class="{'text-input_validation-error': $v.email.$error || errMsg == 'email'}">

              <p class="text-input__placeholder" 
                v-bind:class="[emailIsActivated ? 'text-input__placeholder-small' : 'text-input__placeholder-standart']">
                E-mail
              </p>

              <input type="text" name="email" 
                v-model.trim="email" id="email" 
                class="text-input__input" v-on:click="emailIsActivated = true"
                >

              <svg class="text-input__svg"
                version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 15 12" style="enable-background:new 0 0 15 12;" xml:space="preserve">

                <path class="st0" d="M13.3,0H1.7C0.8,0,0,0.8,0,1.7v8.6C0,11.2,0.8,12,1.7,12h11.6c0.9,0,1.7-0.8,1.7-1.7V1.7C15,0.8,14.2,0,13.3,0z
                  M1.7,1h11.6C13.7,1,14,1.3,14,1.7v0L7.5,6.5L1,1.7v0C1,1.3,1.3,1,1.7,1z M13.3,11H1.7C1.3,11,1,10.7,1,10.3V2.9l6.2,4.6
                  c0.1,0.1,0.2,0.1,0.3,0.1s0.2,0,0.3-0.1L14,2.9v7.4C14,10.7,13.7,11,13.3,11z"/>
              </svg>

              <div v-if="$v.email.$error || errMsg == 'email'" class="error-message error-message_text">{{emailErrorText}}</div>

            </div>

            <div class="text-input text-input-bottom" v-bind:class="{'text-input_validation-error': $v.password.$error || errMsg == 'password'}">
             
              <router-link :to="'/auth'" class="small-text-under-input">Забыли пароль?</router-link>

              <p class="text-input__placeholder" 
                v-bind:class="[passwordIsActivated ? 'text-input__placeholder-small' : 'text-input__placeholder-standart']">
                Пароль
              </p>

              <input type="password" name="password" 
                v-model.trim="password" id="password" 
                class="text-input__input"
                v-on:click="passwordIsActivated = true">

              <svg class="text-input__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">

                <g>
                  <path class="st0" d="M12.5,6V4.5C12.5,2,10.5,0,8,0S3.5,2,3.5,4.5V6c-1.1,0-2,1-2,2.1v5.8c0,1.1,0.9,2.1,2.1,2.1h8.8
                    c1.1,0,2.1-0.9,2.1-2.1V8.1C14.5,7,13.6,6.1,12.5,6z M4.5,4.5C4.5,2.6,6.1,1,8,1s3.5,1.6,3.5,3.5v1.3h-7V4.5z M13.5,13.9
                    c0,0.6-0.5,1.1-1.1,1.1H3.6c-0.6,0-1.1-0.5-1.1-1.1V8.1C2.5,7.5,3,7,3.6,7h8.8c0.6,0,1.1,0.5,1.1,1.1V13.9z"/>
                  <path class="st0" d="M8,8.7c-0.7,0-1.3,0.6-1.3,1.3c0,0.4,0.2,0.8,0.6,1.1v1.6c0,0.3,0.2,0.5,0.5,0.5h0.4c0.3,0,0.5-0.2,0.5-0.5
                    v-1.6c0.3-0.2,0.6-0.6,0.6-1.1C9.3,9.3,8.7,8.7,8,8.7z"/>
                </g>
              </svg>

              <div v-if="$v.password.$error || errMsg == 'password'" class="error-message error-message_text">{{passwordErrorText}}</div>

            </div>

            <button type="submit" class="card__submit-button">
              <span class="card__submit-text">Вход</span>
            </button>

          </div>

        </div>

        <router-link :to="'/registration'" class="form__enter">Зарегистрироваться</router-link>

      </div>
  </form>
</template>

<script>
  import {mapGetters,mapActions, mapMutations} from 'vuex'
  import { required} from 'vuelidate/lib/validators'
  export default {
      name: 'auth',

      data() {
        return {
          email: "",
          password: "",
          emailIsActivated: false,
          passwordIsActivated: false,
        }
      },
      computed: 
      mapGetters(["getAuthentificationResponse",'errMsg','authStatus', 'emailErrorText', 'passwordErrorText']),

    validations: {
      email: {
        required,
      },
      password: {
        required,
      },    
    },

      methods: { 
        ...mapActions(["axiosAuth", ]),
        ...mapMutations(["auth_error"]),

      submit() {
        this.auth_error('')
        this.$v.$touch()
        if(this.$v.$error) return false

          const userData = {
              email: this.email,
              password: this.password,
          }
          
       this.axiosAuth(userData)
      }
    
    }
  }
</script>

<style lang="scss" scoped>

  $error-red: rgb(238,55,49);

  @mixin mainBreakpoint {
    @media (max-width: 1170px) {
      @content;
    }
  }

  @mixin Breakpoint480 {
    @media (max-width: 480px) {
       @content;
    }
  }

  .form {
    margin-left: 278px;
    width: 100%;
    height: 100%;

    @include mainBreakpoint {
      margin-left:0px
    }

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: "Roboto-regular";
    }

    &__title {
      margin-top: 90px;
      font-family: "Oswald", sans-serif;
      font-size: 33px;
      text-align: center;

      @include Breakpoint480 {
        font-size: 24px;
      }
    }

    &__enter {
      margin-top: 40px;
      font-size: 14px;
      color: #3f5baa;
    }

  }

  .card {
    margin-top: 42px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0px 10px 13.5px rgba(0,0,0,0.1);

    &_registration {
      width: 380px;
      height: 280px;

      @include Breakpoint480 {
        width: 290px;
        height: 280px;
      }
    }

    &__container {
      margin: 25px 22px 45px 22px;
    }

    &__submit-button {
      width: 322px;
      height: 41px;
      margin: 0 auto;
      border-radius: 3px;
      background-color: #3f5baa;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 54px;

      @include Breakpoint480 {
        width: 245px;
      }
    }

    &__submit-text {
      font-size: 14px;
      color: #ffffff;
      text-align: center;
    }
  }

  .text-input {
    position: relative;
    display: flex;
    
    &-top {
      margin-top: 55px;
    }
    &-bottom {
      margin-top: 56px;

    }
    &__placeholder {
      transition: all 0.3s ease 0s;
      position: absolute;
      bottom: 0px;
      z-index: 1;
      overflow: hidden;

      &-standart {
        font-size: 13px;
        width: 100%;
      }
      &-small {
        position: absolute;
        bottom: 20px;
        font-size: 11px;
      }
    }
    &__input {
      width: 100%;
      height: 15px;
      z-index: 2;
      background-color: transparent;
      padding-left: 7px;
      position: relative;
      bottom: -4px;
      font-size: 13px;
    }
    &__svg {
      width: 15px;
      height: 15px;
      margin-left: auto;
    }
    &:after {
      @extend .divider;
    }
    &_validation-error {
      color: $error-red;
    }

    &_validation-error:after {
      background-color: $error-red !important
    }
  }

  .checkbox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 8px 8px 8px;

    &__label {
      font-size: 13px;
      display: block;
      position: relative;
      cursor: pointer;
    }

    &__text {
      margin-left: 20px;
      text-align: left;
      font-family: "Roboto-regular"
    }

    & input[type='checkbox'] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    
    &__svg {
      position: absolute;
      top: -1px;
      left: 0px;
      height: 16px;
      width: 16px;
      padding: 3.5px;
      background-color: #fff;
      border-radius: 3px;
      border: 1px solid #d6d6d6;

    }
    
    &__span {
      position: absolute;
      top: -1px;
      left: 0px;
      height: 14px;
      width: 14px;
      background-color: white;
      border: 1px solid #d6d6d6;
      border-radius: 3px;
    }

  }

  .st0{fill:#CCCCCC;}

  .divider {
    content: '';
    position: absolute;
    width:100%;
    bottom:0px;
    height: 1px;
    background-color: black;
    left: 0;
    margin: 0px 0px -10px 0px;
  }

  .required-rounded {  
    border: 1px $error-red solid;
    border-radius: 4px;
  }

  .error-message {
    position: absolute;

    padding: 1px 4px;
    overflow: hidden;
    background-color: #fff;
    color: $error-red;
    font-size: 11px;

    &_text {
      right: 5px;
      bottom: -30px;
    }

    &_role {
      right: 5px;
      bottom: -6px;
    }

    &_agreement {
      right: 5px;
      bottom: -6px;
    }

  }

  .small-text-under-input {
    position: absolute;
    top: -17px;
    right: 0px;
    font-size: 11px;
    color: #3f5baa;
  }

</style>

