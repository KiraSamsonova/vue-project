<template>
  <form @submit.prevent="submitEmail()" class="form">

      <div class="form__container">

        <h1 class="form__title">Восстановление пароля</h1>

        <div v-if="passLinkSuccesfullyCreated" class="card card_recovery">

          <div class="card__container">

            <p class="card__long-msg">
              Введите E-mail, который вы использовали при регистрации на сайте, мы отправим на него письмо с инструкцией по восстановлению пароля.
            </p>
            <div class="text-input text-input-top" v-bind:class="{'text-input_validation-error': $v.email.$error || errMsg == 'email'}">
              
              <p class="text-input__placeholder" 
                v-bind:class="[emailIsActivated ? 'text-input__placeholder-small' : 'text-input__placeholder-standart']"
                v-on:click="emailIsActivated = !emailIsActivated">
                E-mail
              </p>

              <input type="text" name="email" 
                v-model.trim="email" id="email" 
                class="text-input__input"
                v-if="emailIsActivated">

              <svg class="text-input__svg"
                version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 15 12" style="enable-background:new 0 0 15 12;" xml:space="preserve">

                <path class="st0" d="M13.3,0H1.7C0.8,0,0,0.8,0,1.7v8.6C0,11.2,0.8,12,1.7,12h11.6c0.9,0,1.7-0.8,1.7-1.7V1.7C15,0.8,14.2,0,13.3,0z
                  M1.7,1h11.6C13.7,1,14,1.3,14,1.7v0L7.5,6.5L1,1.7v0C1,1.3,1.3,1,1.7,1z M13.3,11H1.7C1.3,11,1,10.7,1,10.3V2.9l6.2,4.6
                  c0.1,0.1,0.2,0.1,0.3,0.1s0.2,0,0.3-0.1L14,2.9v7.4C14,10.7,13.7,11,13.3,11z"/>
              </svg>

              <div v-if="$v.email.$error || passLinkFailedReason != ''" class="error-message error-message_text">{{passLinkFailedErrorText}}</div>

            </div>

            <button type="submit" class="card__submit-button">
              <span class="card__submit-text">Отправить</span>
            </button>

          </div>

        </div>

        <div v-else class="pass-link-success">

          <p>
            Мы отправили инструкцию по восстановлению пароля на указанный адрес электронной почты. Если письма нет во входящих, проверьте папку “Спам”.
          </p>
          <br>
          <p>
            Вслучае возникновения сложностей свяжитесь с нами:
          </p>

          <div class="contacts">

            <router-link :to="'/home'" class="contacts__link">
            
            <svg version="1.1" class="contacts__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">

              <g>
                <path class="mail0" d="M21,12.3v7.4H11v-7.4L21,12.3 M21,10.8H11c-0.8,0-1.5,0.7-1.5,1.5v7.5c0,0.8,0.7,1.5,1.5,1.5h10
                  c0.8,0,1.5-0.7,1.5-1.5v-7.5C22.5,11.5,21.8,10.8,21,10.8L21,10.8z"/>
              </g>
              <polyline class="mail1" points="10.2,12.7 16,16.9 21.8,12.7 "/>
            </svg>
            
            </router-link>

            <router-link :to="'/home'" class="contacts__link">
            
            <svg version="1.1" class="contacts__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">

              <g>
                <path id="telegram-1" class="telega0" d="M18,21.8c0.2,0.1,0.4,0.2,0.6,0.1s0.3-0.3,0.4-0.4c0.5-2.2,1.6-7.7,2-9.7c0-0.1,0-0.3-0.1-0.4
                  c-0.1-0.1-0.3-0.1-0.4-0.1c-2.2,0.8-9.1,3.4-11.9,4.4c-0.2,0.1-0.3,0.3-0.3,0.4c0,0.2,0.1,0.3,0.3,0.4c1.3,0.4,2.9,0.9,2.9,0.9
                  s0.8,2.3,1.2,3.5c0,0.1,0.2,0.3,0.3,0.3s0.3,0,0.4-0.1c0.6-0.6,1.7-1.6,1.7-1.6S16.9,21,18,21.8z M12.1,17.2l0.9,2.9l0.2-1.9
                  c0,0,3.5-3.1,5.4-4.9c0,0,0.1-0.1,0-0.2c0,0-0.1-0.1-0.2,0C16.1,14.6,12.1,17.2,12.1,17.2z"/>
              </g>
            </svg>
            
            </router-link>

            <router-link :to="'/home'" class="contacts__link">
            
            <svg version="1.1" class="contacts__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
              <g>
                <path id="Logo" class="vk0" d="M22.4,12.6c0.1-0.4,0-0.6-0.5-0.6h-1.7c-0.4,0-0.6,0.2-0.7,0.5c0,0-0.9,2.1-2.1,3.5
                  c-0.4,0.4-0.6,0.5-0.8,0.5c-0.1,0-0.3-0.1-0.3-0.5v-3.4c0-0.4-0.1-0.6-0.5-0.6h-2.6c-0.3,0-0.4,0.2-0.4,0.4c0,0.4,0.6,0.5,0.7,1.6
                  v2.5c0,0.6-0.1,0.6-0.3,0.6c-0.6,0-2-2.1-2.8-4.5c-0.2-0.4-0.3-0.6-0.8-0.6H7.9c-0.5,0-0.6,0.2-0.6,0.5c0,0.4,0.6,2.6,2.6,5.6
                  c1.4,2,3.4,3.1,5.2,3.1c1.1,0,1.2-0.3,1.2-0.6v-1.5c0-0.5,0.1-0.6,0.4-0.6s0.7,0.1,1.7,1.1c1.2,1.2,1.3,1.7,2,1.7H22
                  c0.5,0,0.7-0.3,0.6-0.7c-0.2-0.5-0.7-1.2-1.4-2c-0.4-0.5-1-1-1.2-1.2c-0.3-0.3-0.2-0.5,0-0.8C20.1,16.5,22.2,13.6,22.4,12.6
                  L22.4,12.6z"/>
              </g>
            </svg>
            
            </router-link>

            <router-link :to="'/home'" class="contacts__link">
            
            <svg version="1.1" class="contacts__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
              <g>
                <path class="facebook0" d="M16,10.1c-3.5,0-6.4,2.6-6.4,6c0,1.9,0.9,3.5,2.4,4.7V23l2.2-1.2c0.6,0.2,1.2,0.3,1.8,0.3c3.5,0,6.4-2.7,6.4-6
                  S19.5,10.1,16,10.1z M16.6,18.2L15,16.4l-3.2,1.7l3.5-3.8L17,16l3.2-1.7L16.6,18.2z"/>
              </g>
            </svg>
            
            </router-link>

            <router-link :to="'/home'" class="contacts__link">
            
            <svg version="1.1" class="contacts__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 26 26" style="enable-background:new 0 0 26 26;" xml:space="preserve">

              <g>
                <path class="inst0" d="M13,7.7c1.7,0,1.9,0,2.6,0c1.8,0.1,2.6,0.9,2.6,2.6c0,0.7,0,0.9,0,2.6s0,1.9,0,2.6c-0.1,1.7-0.9,2.6-2.6,2.6
                  c-0.7,0-0.9,0-2.6,0s-1.9,0-2.6,0c-1.8-0.1-2.6-0.9-2.6-2.6c0-0.7,0-0.9,0-2.6s0-1.9,0-2.6c0.1-1.7,0.9-2.6,2.6-2.6
                  C11.1,7.7,11.3,7.7,13,7.7z M13,6.5c-1.8,0-2,0-2.7,0C8,6.7,6.6,8,6.5,10.3c0,0.7,0,0.9,0,2.7s0,2,0,2.7c0.1,2.3,1.4,3.7,3.8,3.8
                  c0.7,0,0.9,0,2.7,0s2,0,2.7,0c2.3-0.1,3.7-1.4,3.8-3.8c0-0.7,0-0.9,0-2.7s0-2,0-2.7C19.4,8,18,6.6,15.7,6.5C15,6.5,14.8,6.5,13,6.5
                  z M13,9.7c-1.9,0-3.3,1.5-3.3,3.3s1.5,3.3,3.3,3.3s3.3-1.5,3.3-3.3S14.9,9.7,13,9.7z M13,15.2c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2
                  s2.2,1,2.2,2.2S14.2,15.2,13,15.2z M16.5,8.8c-0.4,0-0.8,0.3-0.8,0.8c0,0.4,0.3,0.8,0.8,0.8c0.4,0,0.8-0.3,0.8-0.8
                  C17.2,9.1,16.9,8.8,16.5,8.8z"/>
              </g>
            </svg>
            
            </router-link>            

          </div>

        </div>
      </div>
  </form>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import { required} from 'vuelidate/lib/validators'
  export default {
    name: 'forgottenPassword',

    data() {
      return {
        email: "",
        emailIsActivated: false,
      }
    },

    computed: 
      mapGetters(['msg','errMsg','authStatus','passLinkSuccesfullyCreated', 'passLinkFailedReason', 'passLinkFailedErrorText']),

    validations: {
      email: {
        required,
      }, 
    },

    methods: { 
      ...mapActions(["axiosNewPassLink"]),

      submitEmail() {
        this.$v.$touch()
        if(this.$v.$error) return false

        this.axiosNewPassLink(this.email)
      },

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

    &__long-msg {
      margin-top: 40px;
      font-size: 13px;
      line-height: 18px;
    }
    &_recovery {
      width: 380px;

      @include Breakpoint480 {
        width: 290px;
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
      margin-top: 40px;
    }
    &-bottom {
      margin-top: 55px;

    }
    &__placeholder {
      transition: all 0.3s ease 0s;
      position: absolute;
      bottom: 0px;
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
    }
    &__svg {
      width: 15px;
      height: 15px;
      margin-left: auto;
      fill:#CCCCCC !important;
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

  .pass-link-success {
    margin-top: 45px;
    width: 380px;
    height: 85px;
    font-size: 13px;
    line-height: 18px;
    display: flex;
    flex-direction: column;

    & p {
      text-align: center;
    }

    @include mainBreakpoint {
      margin-left:0px
    }

    @include Breakpoint480 {
      width: 290px;
    }
  }

  .contacts {
    display: flex;
    justify-content: center;

    &__svg {
      width: 27px;
      height: 27px;
      margin: 15px 4.5px;
      border-radius: 3px;
      background-color: #3f5baa;

      &:hover{
        background-color: black;
      }
    }
  }
  .mail0{fill:#FFFFFF;}
  .mail1{fill:none;stroke:#FFFFFF;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
  .telega0{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
  .vk0{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
  .facebook0{fill:#FFFFFF;}
  .inst0{fill:#FFFFFF;}
</style>
