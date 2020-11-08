<template>
  <div class="settings">

    <h3 class="subtitle">Настройки аккаунта</h3>

    <div v-if="settingsMode==='show'" class="form form_disabled">
      <div class="text-input text-input-top text-input_disabled" >

        <p class="text-input__placeholder text-input__placeholder-small text-input__placeholder_disabled" >
          E-mail
        </p>

        <input type="text" name="email" disabled
          :value="email" id="email" 
          class="text-input__input text-input__input_disabled">

        <svg class="text-input__svg"
          version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 15 12" style="enable-background:new 0 0 15 12;" xml:space="preserve">

          <path class="st0" d="M13.3,0H1.7C0.8,0,0,0.8,0,1.7v8.6C0,11.2,0.8,12,1.7,12h11.6c0.9,0,1.7-0.8,1.7-1.7V1.7C15,0.8,14.2,0,13.3,0z
            M1.7,1h11.6C13.7,1,14,1.3,14,1.7v0L7.5,6.5L1,1.7v0C1,1.3,1.3,1,1.7,1z M13.3,11H1.7C1.3,11,1,10.7,1,10.3V2.9l6.2,4.6
            c0.1,0.1,0.2,0.1,0.3,0.1s0.2,0,0.3-0.1L14,2.9v7.4C14,10.7,13.7,11,13.3,11z"/>
        </svg>


      </div>

      <div  class="text-input text-input-bottom text-input_disabled" >
        
        <p class="text-input__placeholder text-input__placeholder-small text-input__placeholder_disabled">
          Пароль
        </p>

        <input type="password" name="password" disabled
          :value="password" id="password" 
          class="text-input__input text-input__input_disabled">

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

      </div>

      <button class="card__submit-button_change" v-on:click="changeSettingsMode('edit')">
        <span class="card__submit-text">Изменить</span>
      </button>
    </div>

    <form v-if="settingsMode==='edit'" class="form" @submit.prevent="submit()">

      <div class="text-input text-input-top" 
        v-bind:class="{'text-input_validation-error': $v.email.$error || changeEmailErrorMsg !== ''}">

        <p class="text-input__placeholder text-input__placeholder-small" >
          E-mail
        </p>

        <input type="text" name="email" 
          v-model.trim="email" id="email" 
          class="text-input__input" v-on:click="emailIsActivated = true">

        <svg class="text-input__svg"
          version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 15 12" style="enable-background:new 0 0 15 12;" xml:space="preserve">

          <path class="st0" d="M13.3,0H1.7C0.8,0,0,0.8,0,1.7v8.6C0,11.2,0.8,12,1.7,12h11.6c0.9,0,1.7-0.8,1.7-1.7V1.7C15,0.8,14.2,0,13.3,0z
            M1.7,1h11.6C13.7,1,14,1.3,14,1.7v0L7.5,6.5L1,1.7v0C1,1.3,1.3,1,1.7,1z M13.3,11H1.7C1.3,11,1,10.7,1,10.3V2.9l6.2,4.6
            c0.1,0.1,0.2,0.1,0.3,0.1s0.2,0,0.3-0.1L14,2.9v7.4C14,10.7,13.7,11,13.3,11z"/>
        </svg>

        <div v-if="changeEmailErrorMsg !== '' && !$v.email.$error" class="error-message error-message_text">
          {{changeEmailErrorMsg}}
        </div>

        <div v-if="!getUser.isConfirmed && !$v.email.$error && changeEmailErrorMsg == ''" class="error-message error-message_text error-message_text-long">
          Для подтверждения нового E-mail перейдите по ссылке в письме, которое мы отправили на новый электронный адрес
        </div>

        <div v-if="$v.email.$error && !$v.email.required" class="error-message error-message_text">
          Обязательно
        </div>

      </div>

      <div class="text-input text-input-top" 
        v-bind:class="{'text-input_long-error-msg': !getUser.isConfirmed && !$v.email.$error, 'text-input_validation-error': $v.password.$error}">

        <div v-if="inputType === 'text'" class="small-text-under-input" v-on:click="toggleInputType('password')">Скрыть пароль</div>
        <div v-if="inputType === 'password'" class="small-text-under-input" v-on:click="toggleInputType('text')">Показать пароль</div>

        <p class="text-input__placeholder text-input__placeholder-small" >
          Пароль
        </p>

        <input :type="inputType" name="password"
          v-model.trim="password" id="password" 
          class="text-input__input" v-on:click="passwordIsActivated = true"
          >

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

        <div v-if="$v.password.$error && !$v.password.required" class="error-message error-message_text">Обязательно</div>
        <div v-else-if="!$v.password.maxLength || !$v.password.minLength && $v.password.$error" class="error-message error-message_text">От 8 до 40 символов</div>
        <div v-else class="text-input__password-description">От 8 до 40 символов</div>
      </div>

      <div class="text-input text-input-bottom" v-bind:class="{'text-input_validation-error': $v.passwordOneMoreTime.$error}">

        <p class="text-input__placeholder" 
          v-bind:class="[passwordOneMoreTimeIsActivated ? 'text-input__placeholder-small' : 'text-input__placeholder-standart']">
          Подтвердите пароль
        </p>

        <input :type="inputType" name="passwordOneMoreTime" 
          v-model.trim="passwordOneMoreTime" id="passwordOneMoreTime" 
          class="text-input__input"
          v-on:click="passwordOneMoreTimeIsActivated = true">

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
        
        
          <div v-if="$v.passwordOneMoreTime.$error && !$v.passwordOneMoreTime.required" class="error-message error-message_text">
            Обязательно
          </div>
        <div v-else-if="!$v.passwordOneMoreTime.sameAsPassword && $v.passwordOneMoreTime.$error" 
          class="error-message error-message_text">
          Пароли не совпадают
        </div>
        <div v-else class="error-message error-message_text error-message_text-black">
          Повторите новый пароль
        </div>
      
      </div>

      <div class="card__buttons-wrapper">

        <button type="submit" class="card__submit-button_edit">
        <span class="card__submit-text">Сохранить</span>
        </button>

        <button type="button" class="card__submit-button_edit card__submit-button_edit-empty" v-on:click="changeSettingsMode('show')">
        <span class="card__submit-text card__submit-text_blue">Отмена</span>
        </button>

      </div>

    </form>

    <div v-if="savedSuccess" class="settings__saved-success-wrapper">
      <p class="settings__saved-success-text">
        Данные успешно изменены
      </p>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions, mapMutations} from 'vuex'
  import {minLength,maxLength,sameAs, required} from 'vuelidate/lib/validators'
  export default {
    name: 'settings',

    data() {
      return {
        email: "",
        password: "",
        passwordOneMoreTime: '',
        emailIsActivated: false,
        passwordIsActivated: false,
        passwordOneMoreTimeIsActivated:false,

        passwordErrorText: '',
        passwordOneMoreTimeErrorText: '',
        inputType: 'password',

       // emailChangingProcessIsActive: true,
      }
    },

    computed: 
    mapGetters(["getAuthentificationResponse",'changeEmailErrorMsg','getUser','savedSuccess', 'settingsMode' ]),

    validations: {
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(40)
      },
      passwordOneMoreTime: {
        required,
        sameAsPassword: sameAs('password')
      },
      email: {
        required
      }
    },  

    mounted() {
      this.email = this.getUser.email
      this.password = this.getUser.password
      // alert(this.getUser.isConfirmed)
      console.log(this.getUser)
    },
  
    methods: { 
      ...mapActions(["axiosChangePassword", "axiosChangeEmail"]),
      ...mapMutations(["changeSettingsMode"]),

      toggleInputType(inputType) {
        this.inputType = inputType
      },

      submit() {

        if(this.email !== this.getUser.email) {
          this.$v.email.$touch()
          if(this.$v.email.$error) return false
          // МЕХАНИЗМ ИЗМЕНЕНИЯ EMAIL
            this.axiosChangeEmail(this.email)
          //   this.emailChangingProcessIsActive = true
        }

        else if(this.password !== this.getUser.password) {
          this.$v.password.$touch()
          this.$v.passwordOneMoreTime.$touch()
          if(this.$v.passwordOneMoreTime.$error || this.$v.password.$error) return false
          this.axiosChangePassword(this.password)
    
        }

        else this.changeSettingsMode('show')
      }

    }
  }
</script>

<style lang="scss" scoped>

  $error-red: rgb(238,55,49);
  $grey-disabled: #a3a3a3;

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

  .settings {
    position: relative;
    &__saved-success-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -30px;
      margin-left: -120px;
      width: 240px;
      height: 60px;
      border-radius: 4px;
      box-shadow: 2.487px 1.678px 5px rgba(22,19,21,0.14);
      background-color: #f8f8f8;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__saved-success-text {
      text-align: center;
      font-size: 13px;
    }
  }
  .form {
    width: 323px;
    height: 100%;

    @include mainBreakpoint {
      margin-left:0px
    }

    &__title {
      font-family: "Oswald", sans-serif;
      font-size: 33px;

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

  .subtitle {
    font-size: 20px;
    font-family: "Oswald";

    &-newProfile {
      margin-top: 33px;
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

    &__submit-button_change {

      height: 41px;
      width: 124px;
      border-radius: 3px;
      background-color: #3f5baa;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 45px;

      @include Breakpoint480 {
        width: 245px;
      }
    }

    &__buttons-wrapper {
      display: flex;
      margin-top: 45px;
    }

    &__submit-button_edit {
      height: 41px;
      width: 124px;
      border-radius: 3px;
      background-color: #3f5baa;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__submit-button_edit-empty {
      background-color: #fff;
      border: 1px solid #3f5baa;

      margin-left: 7px;
    }

    &__submit-text {
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      &_blue {
      color: #3f5baa;
      }
    }
  }

  .text-input {
    position: relative;
    display: flex;
    
    &-top {
      margin-top: 55px;
    }
    &-bottom {
      margin-top: 57px;

    }

    &_long-error-msg {
      margin-top: 75px;
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

      &_disabled {
        color: $grey-disabled
      }

    }
    &__input {
      width: 100%;
      height: 15px;
      z-index: 2;
      padding-left: 7px;
      position: relative;
      bottom: -4px;
      font-size: 13px;
      background-color: transparent;
      &_disabled {
        color: $grey-disabled
      }
    }
    &__svg {
      width: 15px;
      height: 15px;
      margin-left: auto;
    }
    &:after {
      @extend .divider;
    }

    &_disabled:after{
      background-color: $grey-disabled !important;
    }

    &_validation-error {
      color: $error-red;
    }

    &_validation-error:after {
      background-color: $error-red !important
    }
    
    &__password-description {
      position: absolute;
      padding: 1px 4px;
      overflow: hidden;
      background-color: #fff;
      color: #a3a3a3;
      font-size: 11px;
      left: -4px;
      bottom: -30px;
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

    &_text-long {
      width: 242px;
      line-height: 12px;
      text-align: right;
      bottom: -52px;
    }

    &_role {
      right: 5px;
      bottom: -6px;
    }

    &_agreement {
      right: 5px;
      bottom: -6px;
    }

    &_text-black {
      color: black;
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
