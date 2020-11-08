<template>
  <div class="newProfileCreation">

    <router-link :to="'/profiles'" class="backLink">

      <svg version="1.1" class="backLink__shevron" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 4 6" style="enable-background:new 0 0 4 6;" xml:space="preserve">
        <g>
          <g>
            <path class="shevron0" d="M0.8,3.4c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.1-0.4,0-0.5L3,0.2c0.1-0.1,0.4-0.1,0.5,0s0.1,0.4,0,0.5L1,3.3
              C0.9,3.3,0.8,3.4,0.8,3.4z"/>
          </g>
          <g>
            <path class="shevron0" d="M3.3,5.9c-0.1,0-0.2,0-0.3-0.1L0.5,3.3c-0.1-0.1-0.1-0.4,0-0.5s0.4-0.1,0.5,0l2.5,2.5c0.1,0.1,0.1,0.4,0,0.5
              C3.4,5.8,3.3,5.9,3.3,5.9z"/>
          </g>
        </g>
      </svg>

      <span class="backLink__text">Мои профили</span>
    </router-link>

      
    <h2 class="subtitle subtitle-newProfile">Новый профиль</h2>

    <form class="profile-form" @submit.prevent="createNewProfile()">

      <div class="row row_first" v-bind:class="{'error_first-row': $v.instagram.$error}">

        <div class="profile-form__name"
          v-bind:class="{'error error_name': $v.instagram.$error}">

          <label for="instagram" class="label">Адрес профиля:</label>

          <input type="text" name="instagram" id="instagram" v-model="instagram" class="input profile-form__name-input">

        </div>

        <div v-if="fd === null" for="photo" class="profile-form__photo-wrapper" v-on:click="toggleDownloadModal()">

          <svg version="1.1" class="profile-form__photo-big" v-bind:class="{'error error_photo': $v.fd.$error}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve">

            <path class="bigPhoto0" d="M30,60L30,60C13.4,60,0,46.6,0,30v0C0,13.4,13.4,0,30,0h0c16.6,0,30,13.4,30,30v0C60,46.6,46.6,60,30,60z"/>
            <circle class="bigPhoto1" cx="30" cy="21" r="7.3"/>
            <path class="bigPhoto1" d="M35,31.3h-0.5c-1.4,0.7-2.9,1-4.5,1s-3.1-0.4-4.5-1H25c-4.1,0-7.5,3.4-7.5,7.5v0.4c0,1.1,0.4,2.1,1.2,2.9
              c1.5,1.4,3.3,2.6,5.3,3.3c0,0,0,0,0,0c0,0,0.1,0,0.1,0c0.3,0.1,0.6,0.2,0.9,0.3c0.2,0.1,0.3,0.1,0.5,0.2c0.2,0.1,0.4,0.1,0.6,0.2
              c1.2,0.3,2.5,0.5,3.8,0.5c1,0,2-0.1,2.9-0.3h0c0,0,0,0,0,0c0.4-0.1,0.8-0.2,1.2-0.3c0.1,0,0.2-0.1,0.3-0.1c0.3-0.1,0.7-0.2,1-0.3
              c0.1,0,0.3-0.1,0.4-0.1c0.2-0.1,0.3-0.1,0.5-0.2c0,0,0,0,0,0c1.8-0.8,3.5-1.8,4.9-3.2c0.8-0.7,1.2-1.8,1.2-2.9v-0.4
              C42.5,34.6,39.1,31.3,35,31.3z"/>
          </svg>

          <svg version="1.1" class="profile-form__photo-small" v-bind:class="{'error_plus': $v.fd.$error}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">

            <g>
              <circle class="photoSmall0" cx="8" cy="8" r="8"/>
              <path class="photoSmall1" d="M8,0.5c4.1,0,7.5,3.4,7.5,7.5s-3.4,7.5-7.5,7.5S0.5,12.1,0.5,8S3.9,0.5,8,0.5 M8-0.5C3.3-0.5-0.5,3.3-0.5,8
                s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S12.7-0.5,8-0.5L8-0.5z"/>
            </g>
            <path class="photoSmall1" d="M11.9,8.6H4.1C3.8,8.6,3.5,8.4,3.5,8v0c0-0.4,0.3-0.6,0.6-0.6h7.7c0.4,0,0.6,0.3,0.6,0.6v0
              C12.5,8.4,12.2,8.6,11.9,8.6z"/>
            <path class="photoSmall1" d="M7.3,11.9V4.1c0-0.4,0.3-0.6,0.6-0.6h0c0.4,0,0.6,0.3,0.6,0.6v7.7c0,0.4-0.3,0.6-0.6,0.6h0
              C7.6,12.5,7.3,12.2,7.3,11.9z"/>
          </svg>

        </div>

        <div v-if="fd !== null" for="photo" class="profile-form__photo-wrapper" v-on:click="toggleDownloadModal()">


        <img :src="fileURL" alt="mistake" class="profile-form__photo-big">


          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">

            <g>
              <circle class="photoSmall0" cx="8" cy="8" r="8"/>
              <path class="photoSmall1" d="M8,0.5c4.1,0,7.5,3.4,7.5,7.5s-3.4,7.5-7.5,7.5S0.5,12.1,0.5,8S3.9,0.5,8,0.5 M8-0.5C3.3-0.5-0.5,3.3-0.5,8
                s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S12.7-0.5,8-0.5L8-0.5z"/>
            </g>
            <path class="photoSmall1" d="M11.9,8.6H4.1C3.8,8.6,3.5,8.4,3.5,8v0c0-0.4,0.3-0.6,0.6-0.6h7.7c0.4,0,0.6,0.3,0.6,0.6v0
              C12.5,8.4,12.2,8.6,11.9,8.6z"/>
            <path class="photoSmall1" d="M7.3,11.9V4.1c0-0.4,0.3-0.6,0.6-0.6h0c0.4,0,0.6,0.3,0.6,0.6v7.7c0,0.4-0.3,0.6-0.6,0.6h0
              C7.6,12.5,7.3,12.2,7.3,11.9z"/>
          </svg>

          <svg version="1.1" class="profile-form__photo-small" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
            <g>
              <circle class="photoSmall0" cx="8" cy="8" r="8"/>
              <path class="photoSmall1" d="M8,0.5c4.1,0,7.5,3.4,7.5,7.5s-3.4,7.5-7.5,7.5S0.5,12.1,0.5,8S3.9,0.5,8,0.5 M8-0.5C3.3-0.5-0.5,3.3-0.5,8
                s3.8,8.5,8.5,8.5s8.5-3.8,8.5-8.5S12.7-0.5,8-0.5L8-0.5z"/>
            </g>
            <g>
              <rect x="9.3" y="4.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -1.2275 8.8641)" class="photoSmall1" width="1.6" height="2.4"/>
              <polygon class="photoSmall1" points="8.1,6.2 4.9,9.4 4.5,11.5 6.6,11.1 9.8,7.9 	"/>
            </g>
          </svg>

        </div>

      </div>

      <div class="row" v-bind:class="{'error_row': $v.country.$error}">

        <div class="column" v-bind:class="{'error error_country': $v.country.$error}">

          <label for="country" class="label">Страна аудитории:</label>

          <select name="country" id='country'
            v-model="country" class="select select_country" 
            v-bind:class="{select__fontBlack:country !== ''}">
            <option value="" class="select__placeholder"><span class="select__placeholder">Выберите страну</span> </option>
            <option v-for="country in allCountries"
            :key="country" :value="country" class="select__option">
            {{country}}
            </option>
          
          </select>
        </div>

        <div class="column column_city" v-bind:class="{'error_city': $v.country.$error}">

          <label for="city" class="label">Город аудитории:</label>

          <select name="city" id='city' class="select select_disabled" 
            v-if="!allCities[country]" disabled>
          </select>

          <select v-else name="city" id='city' 
            class="select" v-bind:class="{select__fontBlack:city !== ''}" v-model="city">
            <option value="" class="select__placeholder">Выберите город</option>
            <option v-for="town in allCities[country]" :key="town" :value="town" class="select__option">
              {{town}}
              </option>

          </select>
        </div>

      </div>

      <div class="row" v-bind:class="{'error_row': $v.SubscribersGender.$error}">

        <div class="column column_age" v-if="allAgeCat" v-bind:class="{'error_age': $v.SubscribersGender.$error}">

          <label for="age" class="label">Возраст аудитории:</label>

          <div class="range__wraper range"
            v-bind:style="{'--a': ageMin, '--b': ageMax}">
              <input type="range" min="1" max="8" list="num" id='age' 
              v-model="ageMin" v-on:change="ageMin >= ageMax - +1 ? ageMin = ageMax - +1 : ageMin = ageMin; inputRange() " />

              <input type="range" min="1" max="8" list="num"
              v-model="ageMax" v-on:change="ageMax < ageMin + +1 ? ageMax = ageMin + +1 : ageMax = ageMax; inputRange() " />

          </div>
          
          <datalist id="num" class="range__datalist" >

            <option v-for="age in allAgeCat" :key="age"
              :label="age" class="range__datalist-option" v-bind:class="{'range__datalist-option-grey-font': !chosenOptionsAges.includes(age)}">
            </option>

          </datalist> 

        </div>

        <div class="column column_gender" v-if="allGenderCat"  v-bind:class="{'error error_gender': $v.SubscribersGender.$error}">

          <label class="label">Пол аудитории:</label>

          <div class="checkbox">
            <label v-for="g in allGenderCat" :key="g" :for="g" class="checkbox__label" v-bind:class="{'checkbox__random': g === 'Любой'}">
              
              <span class="checkbox__text">{{g}}</span>
              <input type="radio" v-model="SubscribersGender" :id="g" :value="g">
              <span v-if="!SubscribersGender.includes(g)" class="checkbox__span"></span>

              <svg v-else version="1.1" class="checkbox__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 6 6" style="enable-background:new 0 0 6 6;" xml:space="preserve">
                  <path d="M6,0.5C6,0.5,6,0.4,6,0.5c0-0.1,0-0.2,0-0.2c0,0,0-0.1,0-0.1c0,0,0-0.1-0.1-0.1c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0
                    c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0-0.1,0.1c0,0,0,0-0.1,0
                    L2.4,3.7L0.9,2.1c0,0,0,0,0,0c0,0-0.1,0-0.1-0.1c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0
                    c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0.1-0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1
                    c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0L2,5.8c0,0,0,0,0,0c0,0.1,0.1,0.1,0.2,0.2c0,0,0,0,0,0C2.2,6,2.3,6,2.4,6c0,0,0,0,0,0
                    c0,0,0,0,0,0s0,0,0,0c0,0,0,0,0,0c0.1,0,0.2,0,0.2-0.1c0,0,0,0,0,0c0.1,0,0.1-0.1,0.2-0.2c0,0,0,0,0,0l3.1-5c0,0,0,0,0-0.1
                    C6,0.7,6,0.6,6,0.5C6,0.6,6,0.5,6,0.5z"/>
              </svg>

            </label>
          </div>

        </div>

      </div>

      <div class="row themes" v-bind:class="{'error error_themes error_row': $v.themes.$error}">

        <div class="column">

          <p class="label">Тематика:</p>

          <div class="themes__content">

            <label v-for="(themeNumber, themeName) in getAllThemes" :key="themeName" :for="themeName" 
              class="checkbox checkbox-themes checkbox__label">

              <span class="checkbox__text" v-bind:class="{checkbox__textDark: themes.includes(themeName)}">{{themeName}}</span>
              
              <input type="checkbox" v-model="themes" :id="themeName" :value="themeName">

              <span v-if="!themes.includes(themeName)" class="checkbox__span"></span>

              <svg v-else version="1.1" class="checkbox__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 6 6" style="enable-background:new 0 0 6 6;" xml:space="preserve">
                            <path d="M6,0.5C6,0.5,6,0.4,6,0.5c0-0.1,0-0.2,0-0.2c0,0,0-0.1,0-0.1c0,0,0-0.1-0.1-0.1c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0
                              c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0-0.1,0.1c0,0,0,0-0.1,0
                              L2.4,3.7L0.9,2.1c0,0,0,0,0,0c0,0-0.1,0-0.1-0.1c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0
                              c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0.1-0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1
                              c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0L2,5.8c0,0,0,0,0,0c0,0.1,0.1,0.1,0.2,0.2c0,0,0,0,0,0C2.2,6,2.3,6,2.4,6c0,0,0,0,0,0
                              c0,0,0,0,0,0s0,0,0,0c0,0,0,0,0,0c0.1,0,0.2,0,0.2-0.1c0,0,0,0,0,0c0.1,0,0.1-0.1,0.2-0.2c0,0,0,0,0,0l3.1-5c0,0,0,0,0-0.1
                              C6,0.7,6,0.6,6,0.5C6,0.6,6,0.5,6,0.5z"/>
              </svg>

            </label>

          </div>

        </div>

      </div>

      <div class="row" v-bind:class="{'error_row': $v.description.$error}">

        <div class="column column_description" v-bind:class="{'error error_description': $v.description.$error}">

          <label for="description" class="label">Описание:</label>

          <textarea type="text" name="description" id="description" v-model="description" class="input input_description">
          </textarea>

        </div>

      </div>

      <div class="row"
        v-bind:class="{'error_row': $v.subscribersNumber.$error ||
        $v.AveragePost.$error || $v.AverageStory.$error || $v.engagement.$error}">

        <div class="column">

          <div class="column__row column__without-sign" v-bind:class="{'error error_column': $v.subscribersNumber.$error}">
          
            <label for="subscribersNumber" class="label">Количество подписчиков:</label>

            <input type="number" name="subscribersNumber" id="subscribersNumber" 
              v-model="subscribersNumber" class="input input_column">

          </div>

          <div class="column__row column__without-sign" v-bind:class="{'error error_column': $v.AveragePost.$error}">
          
            <label for="AveragePost" class="label">Средние охваты постов:</label>

            <input type="number" name="AveragePost" id="AveragePost" 
              v-model="AveragePost" class="input input_column">

          </div>

          <div class="column__row column__without-sign" v-bind:class="{'error error_column': $v.AverageStory.$error}">
            
            <label for="AverageStory" class="label">Средние охваты сторис:</label>

            <input type="number" name="AverageStory" id="AverageStory" 
              v-model="AverageStory" class="input input_column">

          </div>

          <div class="column__row" v-bind:class="{'error error_column column-with-sign': $v.engagement.$error}">
            
            <label for="engagement" class="label">Вовлечение:</label>

            <input type="number" name="engagement" id="engagement" 
              v-model="engagement" class="input input_column input_engagement">

            <span class="column__sign column__percent">%</span> 

          </div>

        </div>

      </div>

      <div class="row"
        v-bind:class="{'error_row': $v.postPrice.$error ||
        $v.storyPrice.$error }">

        <div class="column">

          <div class="column__row" v-bind:class="{'error error_column error_column-with-sign': $v.postPrice.$error}">

            <label for="postPrice" class="label">Стоимость рекламных постов:</label>
            
            <input type="number" name="postPrice" id="postPrice" 
              v-model="postPrice" class="input input_column">
            
            <span class="column__sign">₽</span> 

          </div>

          <div class="column__row column__row_last" v-bind:class="{'error error_column error_column-with-sign': $v.storyPrice.$error}">

            <label for="storyPrice" class="label">Стоимость рекламных сторис:</label>

            <input type="number" name="storyPrice" id="storyPrice" 
              v-model="storyPrice" class="input input_column">

              <span class="column__sign">₽</span>
          </div>

        </div>

      </div>

      <div class="row" v-bind:class="{'error_row': $v.isCoopReady.$error}">

        <div class="isCoopReady" v-bind:class="{'error error_isCoopReady': $v.isCoopReady.$error}">

          <p class="label">Готовность к взаимопостингу:</p>

          <div class="checkbox isCoopReady__checkbox">

            <label for="yes" class="checkbox__label">
              <span class="checkbox__text">Да</span>
              <input type="checkbox" id="yes" v-on:click="isCoopReady = true">
              <span v-if="!isCoopReady" class="checkbox__span"></span>

              <svg v-else version="1.1" class="checkbox__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 6 6" style="enable-background:new 0 0 6 6;" xml:space="preserve">
                  <path d="M6,0.5C6,0.5,6,0.4,6,0.5c0-0.1,0-0.2,0-0.2c0,0,0-0.1,0-0.1c0,0,0-0.1-0.1-0.1c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0
                    c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0-0.1,0.1c0,0,0,0-0.1,0
                    L2.4,3.7L0.9,2.1c0,0,0,0,0,0c0,0-0.1,0-0.1-0.1c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0
                    c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0.1-0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1
                    c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0L2,5.8c0,0,0,0,0,0c0,0.1,0.1,0.1,0.2,0.2c0,0,0,0,0,0C2.2,6,2.3,6,2.4,6c0,0,0,0,0,0
                    c0,0,0,0,0,0s0,0,0,0c0,0,0,0,0,0c0.1,0,0.2,0,0.2-0.1c0,0,0,0,0,0c0.1,0,0.1-0.1,0.2-0.2c0,0,0,0,0,0l3.1-5c0,0,0,0,0-0.1
                    C6,0.7,6,0.6,6,0.5C6,0.6,6,0.5,6,0.5z"/>
              </svg>

            </label>

            <label for="no" class="checkbox__label checkbox__label_isCoopReady">
              <span class="checkbox__text">Нет</span>
              <input type="checkbox" id="no" v-on:click="isCoopReady = false">
              <span v-if="isCoopReady !== false" class="checkbox__span"></span>

              <svg v-else version="1.1" class="checkbox__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 6 6" style="enable-background:new 0 0 6 6;" xml:space="preserve">
                  <path d="M6,0.5C6,0.5,6,0.4,6,0.5c0-0.1,0-0.2,0-0.2c0,0,0-0.1,0-0.1c0,0,0-0.1-0.1-0.1c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0
                    c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0-0.1,0.1c0,0,0,0-0.1,0
                    L2.4,3.7L0.9,2.1c0,0,0,0,0,0c0,0-0.1,0-0.1-0.1c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0
                    c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0.1-0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1
                    c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0L2,5.8c0,0,0,0,0,0c0,0.1,0.1,0.1,0.2,0.2c0,0,0,0,0,0C2.2,6,2.3,6,2.4,6c0,0,0,0,0,0
                    c0,0,0,0,0,0s0,0,0,0c0,0,0,0,0,0c0.1,0,0.2,0,0.2-0.1c0,0,0,0,0,0c0.1,0,0.1-0.1,0.2-0.2c0,0,0,0,0,0l3.1-5c0,0,0,0,0-0.1
                    C6,0.7,6,0.6,6,0.5C6,0.6,6,0.5,6,0.5z"/>
              </svg>

            </label>

          </div>


        </div>

      </div>

      <div class="row_last" v-bind:class="{'error error_row error_telegramm': $v.telegramm.$error}">

        <label for="telegramm" class="label">Telegram:</label>

        <input type="text" name="telegramm" id="telegramm" v-model="telegramm" class="input input_telegramm">

    
        <label for="showInCommunication" class="checkbox checkbox__label checkbox__label_telegramm">

          <span class="checkbox__text">Показывать в способах связи</span>
          
          <input type="checkbox" v-model="showInCommunication" id="showInCommunication" value="true">

          <span v-if="!showInCommunication" class="checkbox__span"></span>

          <svg v-else version="1.1" class="checkbox__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 6 6" style="enable-background:new 0 0 6 6;" xml:space="preserve">
                        <path d="M6,0.5C6,0.5,6,0.4,6,0.5c0-0.1,0-0.2,0-0.2c0,0,0-0.1,0-0.1c0,0,0-0.1-0.1-0.1c0,0,0,0,0-0.1c0,0,0,0,0,0c0,0,0,0,0,0
                          c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0-0.1,0.1c0,0,0,0-0.1,0
                          L2.4,3.7L0.9,2.1c0,0,0,0,0,0c0,0-0.1,0-0.1-0.1c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0
                          c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0.1-0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1
                          c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0L2,5.8c0,0,0,0,0,0c0,0.1,0.1,0.1,0.2,0.2c0,0,0,0,0,0C2.2,6,2.3,6,2.4,6c0,0,0,0,0,0
                          c0,0,0,0,0,0s0,0,0,0c0,0,0,0,0,0c0.1,0,0.2,0,0.2-0.1c0,0,0,0,0,0c0.1,0,0.1-0.1,0.2-0.2c0,0,0,0,0,0l3.1-5c0,0,0,0,0-0.1
                          C6,0.7,6,0.6,6,0.5C6,0.6,6,0.5,6,0.5z"/>
          </svg>

        </label>  

      </div>

      <button class="big-blue-button" type="submit">
        <p class="big-blue-button__text">Подтвердить</p>
      </button>

    </form> 

    <div class="download-modal__modal" v-if="downloadModalActive">

      <button class="download-modal__close-btn" v-on:click="toggleDownloadModal()">

        <svg version="1.1" class="download-modal__close-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 7 7" style="enable-background:new 0 0 7 7;" xml:space="preserve">

          <path class="st0" style="fill:#444444" d="M4.2,3.5l2.6-2.6C7,0.7,7,0.3,6.9,0.1S6.3,0,6.1,0.1L3.5,2.8L0.9,0.1C0.7,0,0.3,0,0.1,0.1S0,0.7,0.1,0.9
            l2.6,2.6L0.1,6.1C0,6.3,0,6.7,0.1,6.9C0.2,7,0.4,7,0.5,7s0.3,0,0.4-0.1l2.6-2.6l2.6,2.6C6.2,7,6.4,7,6.5,7s0.3,0,0.4-0.1
            C7,6.7,7,6.3,6.9,6.1L4.2,3.5z"/>
        </svg>

      </button>

      <div class="download-modal__container">

        <h5 class="label download-modal__label">
          Загрузка фотографии профиля
        </h5>

        <div class="download-modal__content">

          <div v-if="downloadErrorText !== ''" class="download-modal__error-container">

            <div class="download-modal__error-svg-wrapper" >
              <svg version="1.1" id="Layer_2" class="download-modal__error-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
                <g>
                  <path class="modal-error-svg" d="M9,0C4,0,0,4,0,9s4,9,9,9c5,0,9-4,9-9S14,0,9,0z M7.9,9.5V9.3V4.6C7.9,4,8.4,3.5,9,3.5c0.6,0,1.1,0.5,1.1,1.1
                    v4.7v0.1v0.2c0,0.6-0.5,1.1-1.1,1.1c-0.6,0-1.1-0.5-1.1-1.1V9.5z M9,14.1c-0.7,0-1.3-0.6-1.3-1.3s0.6-1.3,1.3-1.3
                    c0.7,0,1.3,0.6,1.3,1.3S9.7,14.1,9,14.1z"/>
                </g>
              </svg>
            </div>

            <p class="download-modal__error-text">
               {{downloadErrorText}}
            </p>

          </div>
          
          <p class="download-modal__text">
            Вы можете загрузить изображение в формате JPG, GIF или PNG. Максимальный размер файла 5 МБ. Оптимальный размер фотографии 120х120 пикселей. Для лучшего отображения выбирайте квадратную фотографию.
          </p>

          

        </div>

        <label for="photo" class="download-modal__btn-ready">
          <input type="file" id='photo' accept=".png, .jpg, .jpeg" @change="onFileSelected" />
          <span class="download-modal__btn-ready-text">Выбрать файл</span> 
        </label>   
                
        </div>

    </div>

    <div class="fullscreenShadow"
     v-bind:class="{themesFullscreenShadowActive:downloadModalActive}"
      v-on:click="toggleDownloadModal()">
    </div>

  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'
  import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
  
  export default {
    name: 'newProfile',

    data() {
      return {
        downloadModalActive: false,
        downloadErrorText: '',

        ageMin: 2,
        ageMax: 7,
        chosenOptionsAges: [],

        description: '',
        instagram: '',
        telegramm: '',
        showInCommunication: false,
        themes: [],
        isChecked: false,
        subscribersNumber: null,
        subscribersAge: null,
        engagement: null,
        country: '',
        city: '',
        SubscribersGender: [],
        AveragePost: null,
        AverageStory: null,
        postPrice: null,
        storyPrice: null,
        isCoopReady: '',
        fd: null,
        fileURL: ''
      }
    },
    
    validations: {
      description: {
        required,
      },
      instagram: {
        required,
      },
      telegramm: {
        required,
      },
      engagement: {
        required
      },
      themes: {
        required,
      },
      subscribersNumber: {
        required,
      },
      subscribersAge: {
        required,
      },
      country: {
        required,
      },
      SubscribersGender: {
        required,
      },
      AveragePost: {
        required,
      },
      AverageStory: {
        required,
      },
      postPrice: {
        required,
      },
      storyPrice: {
        required,
      },
      fd: {
        required,
      },
      isCoopReady:{
        required
      },
     
    },
  
    computed: 
      mapGetters(["allThemes", "allCountries", "allCities","allAgeCat","allGenderCat",
        "getNewProfileIsCreated","getLoader",'getUser', 'getAllThemes']),

    mounted() {
      this.inputRange()
      this.axiosGetAllThemes() 

    },

    methods: {
      ...mapActions(["axiosCreateNewProfile","axiosReplaceOneProfile", 'axiosGetAllThemes']),

      toggleDownloadModal() {
        this.downloadModalActive = !this.downloadModalActive;

        if(this.downloadModalActive) disableBodyScroll(document.getElementsByTagName('body'))

        else enableBodyScroll(document.getElementsByTagName('body'))
      },


      inputRange(){
        this.chosenOptionsAges = []
        this.subscribersAge = []
        for(let a = this.ageMin; a <= this.ageMax; a++) {

          this.chosenOptionsAges.push(this.allAgeCat[a-1])
        }
        
        for(let i = 0; i < this.chosenOptionsAges.length - +1; i++) {
          this.subscribersAge.push(this.chosenOptionsAges[i] + '-' + this.chosenOptionsAges[i+1])
        }
        
        

      },

      toggleThemeNumber() {
        let b = document.getElementsByClassName('themeInput')
        b.forEach(elem => {
          if (this.themes.length >= 5) {

            if( elem.checked == false) elem.disabled = true

          } else {
            elem.disabled = false
          }
        })

            // console.log(document.getElementById(`${this.themes[0]}`))
            //    this.themeNumber = this.themes.length + 1
            //  if(this.themeNumber >3) this.testtest = true

            //    this.themes.forEach(elem => {
            //   document.getElementById(elem)
            // .disabled = false
            // });
      },

      onFileSelected(event) {
        let file = event.target.files[0]
       // console.log(file)

        let ext = file.name.split('.')[file.name.split('.').length - 1]
        console.log(ext)
        if (ext === 'png' || ext === 'jpg' || ext === 'jpeg') {

        if(event.target.files[0].size >= 5000000) return this.downloadErrorText = 'Файл слишком большой'
        
        this.downloadErrorText = ''
        this.downloadModalActive = false
        enableBodyScroll(document.getElementsByTagName('body'))
        this.fd = new FormData();
        this.fd.append('image', file, `pre.${ext}`)

        this.fileURL = URL.createObjectURL(file)
        console.log(this.fd)

        } else this.downloadErrorText = 'Недопустимое разрешение файла'
      },

      createNewProfile() {
        this.$v.$touch()
        if(this.$v.$error) return false
      
        // Выделение имени из ulr-адрес-профиля
        let UrlClear = this.instagram.split('?')[0]
        if (UrlClear.endsWith("/")) UrlClear = UrlClear.slice(0, UrlClear.length-+1)
        let name = UrlClear.split('/')[UrlClear.split('/').length-+1]

        // Создание константы нового профиля
        const newProfile = {
          belongTo: this.getUser._id,
          name: name,
          description: this.description,
          instagram: this.instagram,
          showInCommunication: this.showInCommunication,
          themes: this.themes,
          subscribersNumber: this.subscribersNumber,
          subscribersAge: this.subscribersAge,
          country: this.country,
          city: this.city,
          SubscribersGender: this.SubscribersGender,
          AveragePost:this.AveragePost,
          AverageStory: this.AverageStory,
          engagement: this.engagement,
          telegram: this.telegramm,
          postPrice: this.postPrice,
          storyPrice: this.storyPrice,
          isCoopReady: this.isCoopReady
        }

        // Удаление города при изменении страны
        if( !this.allCities[this.country]) newProfile.city = ''

        this.axiosCreateNewProfile([this.fd, newProfile])  
      },
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

  * {
    font-family: "Roboto-regular";
  }

  .backLink {
    display: flex;
    align-items: center;
    font-size: 11px;
    color: #3f5baa;
    cursor: pointer;

    &__shevron {
      fill: #3f5baa;
      width: 6px;
      height: 6px;
      margin-top: -1px;
      margin-right: 4px;
    }
  }

  .subtitle {
    font-size: 20px;
    font-family: "Oswald";

    &-newProfile {
      margin-top: 33px;
    }
  }

  .row {
    display: flex;
    position: relative;
    margin-top: 40px;

    @include Breakpoint480 {
      flex-direction: column;
    }

    &_last {
      display: flex;
      align-items: center;
      margin-top: 40px;      
      
      @include Breakpoint750 {
        width: 280px;
        flex-wrap: wrap;
      }
      @include Breakpoint480 {
       width: 254px;
      }
    }

    &:after {
      @extend .divider
    }

    &_first {
      margin-top: 20px;
    }
  }

  .column {
    display: flex;
    flex-direction: column;

    &_city {
      margin-left: 22px;
      @include Breakpoint480 {
        margin-left: 0px;
      }
    }

    &_age {
      width: 172px;
    }

    &_gender {
      margin-left: 40px;

      @include Breakpoint750 {
        & .checkbox {
          flex-direction: row;
          flex-wrap: wrap;
          width: 162px;
          height: 50px;

          &__label {
            height: 25px;
          }

          &__text {
            margin-right: 0px;
          }
          &__random {
            flex-basis: 100%;
          }
        }
      }

      @include Breakpoint480 {
        margin-left: 0px;
        margin-top: 5px;
        padding-top: 7px;
        width: 240px;
        & .checkbox {
          flex-direction: row;
          flex-wrap: nowrap;
          width: unset;
          height: unset;
          
          &__label {
            height: unset;
          }

          &__random {
            flex-basis: unset;
            
          }
        }
      }
    }

    &_description {
      width: 100%;
    }
    &__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 400px;
      padding: 13px 8px;
      margin: 2.5px 0px;

      @include Breakpoint480 {
        flex-wrap: wrap;
        justify-content: left;
        width: 205px;
        :first-child {
          flex-basis: 100%;
        }
      }
    }

    &__without-sign {
      width: 385px;
      @include Breakpoint480 {
        width: 190px;
      }
    }

    &__sign {
      // margin-right: 8px;
      margin-left: 6px;
      width: 10px;
    }
    &__percent {
      font-family: "Roboto-bold";
    }

    // &__row_last {
    //   margin-top: 15px;
    // }
  }

  .profile-form {

    &__name {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    &__name-input {
      margin-top: 6px;
      width: 367px;
      @include Breakpoint750 {
        width: 300px;
      }

      @include Breakpoint480 {
        width: 245px;
      }
    }

    &__photo-wrapper {
      position: relative;
      display: flex;
      align-items: flex-end;

      @include Breakpoint480 {
        margin-top: 5px;
      }
    }

    &__photo-big {
      margin-top: 8px;
      margin-left: 32px;
      width: 60px;
      height: 60px;
      display: block;
      border-radius: 50%;
      cursor: pointer;
      @include Breakpoint480 {
      margin-left: 0px;
      }
    }

    &__photo-small {
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      cursor: pointer;
      @include Breakpoint480 {
        top: 45px;
        left: 45px;
      }
    }
  }

  .divider {
    margin: 0px 0px -20px 0px;
    content: '';
    position: absolute;
    width: 100%;
    bottom:0px;
    height: 1px;
    background-color: #dfdfdf;
  }

  .input {
    height: 27px;
    border-radius: 3px;
    background-color: #ffffff;
    border: 1px solid #d6d6d6;
    cursor: pointer;
    padding-left: 10px;
    font-size: 13px;
    display: inline-block;
    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    &_description {
      resize: none;
      padding: 8px;
      font-size: 13px;
      margin-top: 10px;
      width: 100%;
      height: 70px;

      @include Breakpoint750 {
        // max-width: calc(100% - 8px); 
        // width: 405px;

      }

    }

    &_column, &_telegramm {
      width: 173px;
      margin-left: auto;
      @include Breakpoint480 {
        margin-left: 0px;
      }
    }

    &_column {
      @include Breakpoint480 {
        margin-top: 5px;
      }
    }
    &_telegramm {
      margin-left: 7px;
    }

  }

  .label {
    font-size: 13px;
    text-align: left;
  }

  .select {
    margin-top: 6px;
    padding-left: 10px;
    width: 172px;
    height: 28px;
    border: 1px #ececec solid;
    border-radius: 3px;
    background-color: #ffffff;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-image: url(~@/assets/media/Arrow-down.svg);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
    font-size: 13px;
    cursor: pointer;
    color: #d6d6d6; 

    :nth-child(1) {
      color: #d6d6d6; 
    }
    &::-ms-expand {
	    display: none;
      }

    &__option {
      font-size: 13px;
      line-height: 28px;
      font-family: "Roboto-regular";
      color: black
    }

    &_country {
      margin-bottom: 15px;
    }
    &_disabled {
      background-color: #d6d6d6;
      background-image: none
    }
    &__fontBlack {
      color: black;
    }

  }

  .range {

    &__wraper {
      display: grid;
      grid-template: repeat(1, max-content)/ 1fr;
      overflow: visible;
      position: relative;
      margin: 10px auto 0px auto;
      height: 3px;
      width: 172px;
      background: #d6d6d6;
      border-radius: 5px;
      &::before{ 

        grid-column: 1;
        grid-row: 1;
        background: black;
        content: "";

        height: 3px;
        z-index: 2;
        overflow: hidden;

        margin-left: calc(16px + (var(--a) - 1)/7*156px);

        width: calc((var(--b) - var(--a))/7*156px - 16px);
      }
    }

    & input[type='range'] {
      -webkit-appearance: none; 
      grid-column: 1;
      grid-row: 1;
      z-index: 1;
      top: 0;
      left: 0;
      margin: 0;
      background: none;
      width: 100%; 
      z-index: 15;
      color: #000;
      pointer-events: none;
      &::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        width: 171px;
        height: 4px;
        cursor: pointer;
        border-radius: 2px;
        background: none;
      }
      &::-moz-range-track {
        width: 171px;
        height: 4px;
        cursor: pointer;
        background: none;
        border-radius: 2px;
      }
      &::-ms-track {
        width: 171px;
        height: 8.4px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        border-width: 16px 0;
        color: transparent;
      }
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 1px solid #d6d6d6;
        height: 16px;
        width: 16px;
        border-radius: 100%;
        background: white;
        cursor: pointer;
        margin-top: -15px; 
        overflow: hidden;
        z-index: 70;
        pointer-events: auto;
      }
      &::-moz-range-thumb {
        border: 1px solid #000000;
        height: 16px;
        width: 16px;
        border-radius: 100%;
        background: #ffffff;
        cursor: pointer;
        z-index: 10;
        overflow: hidden;
      }
      &::-ms-thumb {
        border: 1px solid #000000;
        height: 16px;
        width: 16px;
        border-radius: 100%;
        background: #ffffff;
        cursor: pointer;
        z-index: 10;
      }
    }
    
    &__datalist {
      text-align: left;
      width: 105%;
      display: flex;
      margin-top: 12px;
      height: 12px;
    }

    &__datalist-option {
      font-family: "Roboto-regular";
      -webkit-box-flex: 1;
      -webkit-flex-grow: 1;
          -ms-flex-positive: 1;
              flex-grow: 1;
      -webkit-flex-basis: 0;
          -ms-flex-preferred-size: 0;
              flex-basis: 0;
    }
    &__datalist-option-grey-font {
      color: #d6d6d6;
    }

  }

  .checkbox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;

    &_single {
      height: 26px;
    }

    &__label {
      font-size: 13px;
      display: block;
      position: relative;
      cursor: pointer;
      
      &_isCoopReady {
        margin-left: 10px;
      }

      &_telegramm {
        margin-top: 0px;
        margin-left: 10px;
        @include Breakpoint750 {
          margin-top: 10px;
          margin-left: auto;

          & .checkbox__text {
            margin-right: 0px;
          }
        }

        @include Breakpoint480 {
          margin-left: 0px;
        }
      }
    }

    &__text {
      margin-left: 20px;
      margin-right: 9px;
      text-align: left;
      font-family: "Roboto-regular";
    }

    &__text-long {
      position: absolute;
      top:0px;
      left: 20px;
      text-align: left;
      font-family: "Roboto-regular"
    }
    
    &__textDark {
      color: black !important;
    }

    & input[type='checkbox'], & input[type='radio'] {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }
    
    &__svg {
      position: absolute;
      top: -1px;
      left: 0px;
      height: 14px;
      width: 14px;
      padding: 3.5px;
      background-color: #f8d247;
      border-radius: 3px;
    }
    
    &__span {
      position: absolute;
      top: -1px;
      left: 0px;
      height: 14px;
      width: 14px;
      background-color: #d6d6d6;
      border-radius: 3px;
    }

    &-themes {
      height: unset;
      margin-top: 7.5px;

      & .checkbox__span {
        width: 12px;
        height: 12px;
      }

      & .checkbox__text {
        color: #7c7c7c;
      }
      & .checkbox__svg {
        background-color: #f8d247;
      }
    }
  }

  .themes {
   
    &__content {
      margin-top: 20px;
      height: 325px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      @include Breakpoint750 {
        height: 475px;
      }    

      @include Breakpoint480 {
        height: unset;
      }     
    }

   
  } 

  .isCoopReady {
    display: flex;
    align-items: center;

    &__checkbox {
      margin-top: 0px;
      margin-left: 5px;
    }

    @include Breakpoint750 {
     
      &__checkbox {
        margin-left: 10px;
      }
      & .checkbox__text {
        margin-right: 0px;
      }
    }

    @include Breakpoint480 {
      width: 202px;
      flex-direction: column;
      align-items: unset;

      &__checkbox {
        margin-left: 0px;
        margin-top: 10px;
        justify-content: left;
      }
      // & .checkbox__text {
      //   margin-right: 0px;
      // }
    }
  }

  .big-blue-button {
    width: 140px;
    height: 40px;
    border-radius: 3px;
    background-color: #3f5baa;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;

    &__text {
      font-size: 13px;
      color: #ffffff;
      text-align: center;
    }
  }

  .download-modal {
    &__modal {
      font-family: "Roboto-regular";
      position: fixed;
      top: 50%;
      left: 50%;
      margin-top: -117px; 
      margin-left: -245px; 
      z-index: 80;
      width: 490px;
    //  height: 234px;
      border-radius: 4px;
      overflow: hidden;
      background-color: #ffffff;

      @include Breakpoint750 {
        width: 444px;
        margin-left: -222px;
        height: unset;
        margin-top: -206px; 
        max-height: 100%;
        overflow-y: auto;
        bottom: 40px;
      }

      @include Breakpoint480 {
        width: 234px;
        margin-left: -117px;
        height: unset;
        max-height: 100%;
        overflow-y: auto;
        top: 40px;
        bottom: 40px;
        margin-top: 0px; 

      }

    }

    &__container {
      z-index: 80;
      margin: 35px 25px 27px 25px;
      display: flex;
      flex-direction: column;
    }

    &__close-btn {
      position: absolute;
      background-color: #fff;
      top: 0px;
      right: 0px;
      padding: 8px 10px;
    }

    &__close-svg {
      background-color: #fff;
      width: 10px;
      height: 10px;
    }

    &__content {
      margin-top: 28px;

      @include Breakpoint750 {
        height: 475px;
      }    

      @include Breakpoint480 {
        height: unset;
      }     
    }

    &__label {
      margin: 0 auto;
      font-size: 14px;
      color: #0a0a0a;
      font-family: "Roboto-bold";
      text-align: center;
    }

    &__error-container {
      margin-left: -10px;
      width: 460px;
      margin-bottom: 25px;
      border-radius: 4px;
      background-color: #fad2ce;
      display: flex;
    }

    &__error-svg-wrapper {
      width: 18px;
      height: 18px;
      margin-left: 15px;
      margin-top: 15px;
    }

    &__error-svg {
      width: 18px;
      height: 18px;
    }

    &__error-text {
      font-size: 13px;
      line-height: 18px;
      margin: 16px 22px 16px 10px;
    }

    &__text {
      margin: 0 auto;
      font-size: 13px;
      text-align: center;
      line-height: 18px;
    }
    &__btn-ready {
      width: 159px;
      height: 38px;
      border-radius: 3px;
      margin: 25px auto 0 auto;
      background-color: #3f5baa;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    &__btn-ready-text {
      font-size: 13px;
      font-family: "Roboto-regular";
      color: #fff;
      text-align: center;
    }
  }

  .fullscreenShadow {
    display: none;
    overflow: hidden;
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: black;
  } 
  .fullscreenShadowActive {
    display: block;
    opacity: 0.8;
    z-index: 40;
  }

  .themesFullscreenShadowActive {
    display: block;
    opacity: 0.8;
    z-index: 70;
  }

  .error {
    padding: 15px 8px; 
    border-radius: 4px;
    background-color: #fef5f4;
    @include Breakpoint480 {
      padding: 8px;
    }

    &_first-row {
      height: 75px;
      &::after {
        margin-bottom: -7px;
      }
      
      @include Breakpoint480 {
        height: 140px;
        &::after {
          margin-bottom: -20px;
        }
      }
    }

    &_row {
      margin-top: 14px;
      &::after {
        margin-bottom: -7px;
      }
      @include Breakpoint480 {
        margin-top: 30px;
        &::after {
          margin-bottom: -20px;
        }
      }
    }

    &_name {
      margin-left: -8px;
      @include Breakpoint480 {
        width: 260px;
      }
    }

    &_photo {
      padding: 12px 8px;
      width: 76px;
      height: 84px;
      margin-left: 16px;
      @include Breakpoint480 {
        margin-top: 0px;
        padding: 8px;
        height: 76px;
        margin-left: -8px;
      }
    }

    &_plus {
      bottom: 12px;
      right: 8px;
      @include Breakpoint480 {
        top: 51px;
        left: 44px;
      }
    }

    &_gender {
      margin-left: 32px;
      @include Breakpoint480 {
        margin-left: -8px;
        padding: 8px !important;
      }
    }

    &_country, &_age, &_themes, &_description, &_sbc-number, &_column, &_isCoopReady, &_telegramm {
      margin-left: -8px;
    }
    
    &_country {
      width: 188px;
    }
    &_city, &_age {
      padding: 15px 8px; 
    }

    &_age {
      width: 192px;
    }
    &_city {
      @include Breakpoint480 {
        margin-left: -8px;
      }
    }
    
    &_themes,&_description, .column_description {
      margin-right: -8px;
      width: calc(100% + 16px);
    }
    &_themes::after {
      width: calc(100% - 16px);
    }

    &_isCoopReady, &_telegramm {
      padding: 15px 8px
    } 

  }



  .shevron0{fill:#3F5BAA;}

  .bigPhoto0{fill:#E8E8E8;}
  .bigPhoto1{fill:#F8F8F8;}

  .photoSmall0{fill:#3F5BAA;}
  .photoSmall1{fill:#FFFFFF;}
  .modal-error-svg{fill-rule:evenodd;clip-rule:evenodd;fill:#EE3731;}

  #photo {
    display: none;
  }

</style>