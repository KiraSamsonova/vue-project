<template>
  <div class="test">

    <div class="mobile-button-wrapper" 
        v-bind:class="{'mobile-button-moved':filtersActive}"
        v-on:click="filtersActive=!filtersActive">

        <svg version="1.1" class="mobile-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 12 11" style="enable-background:new 0 0 12 11;" xml:space="preserve">
          <g>
            <g>
              <path d="M3,2.6c-0.4,0-0.8-0.3-0.9-0.7L1.9,1.6l0.1-0.3C2.2,0.9,2.6,0.6,3,0.6s0.8,0.3,0.9,0.7l0.1,0.3h7.5l-0.1,0.1L4.1,1.6
                L3.9,1.9C3.8,2.3,3.4,2.6,3,2.6z M0.4,1.6L0.4,1.6h1.1H0.4z"/>
              <path d="M3,1.1c0.2,0,0.4,0.2,0.5,0.3l0.1,0.2L3.5,1.8C3.4,1.9,3.2,2.1,3,2.1S2.6,1.9,2.5,1.8L2.5,1.6l0.1-0.2
                C2.6,1.3,2.8,1.1,3,1.1 M3,0.1c-0.7,0-1.2,0.4-1.4,1H0.4C0.2,1.1,0,1.3,0,1.6v0.1c0,0.2,0.2,0.4,0.4,0.4h1.1c0.2,0.6,0.8,1,1.4,1
                s1.2-0.4,1.4-1h7.1c0.2,0,0.4-0.2,0.4-0.4V1.6c0-0.2-0.2-0.4-0.4-0.4H4.4C4.2,0.5,3.7,0.1,3,0.1L3,0.1z"/>
            </g>
            <g>
              <path d="M9,6.5c-0.4,0-0.8-0.3-0.9-0.7L7.9,5.5l0.1-0.3C8.2,4.8,8.6,4.5,9,4.5s0.8,0.3,0.9,0.7l0.1,0.3h1.5l-0.1,0.1l-1.1-0.1
                h-0.4L9.9,5.8C9.8,6.2,9.4,6.5,9,6.5z M0.4,5.5L0.4,5.5h7.1H0.4z"/>
              <path d="M9,5c0.2,0,0.4,0.2,0.5,0.3l0.1,0.2L9.5,5.7C9.4,5.8,9.2,6,9,6S8.6,5.8,8.5,5.7L8.5,5.5l0.1-0.2C8.6,5.2,8.8,5,9,5 M9,4
                C8.3,4,7.8,4.4,7.6,5H0.4C0.2,5,0,5.2,0,5.4v0.1C0,5.8,0.2,6,0.4,6h7.1C7.8,6.6,8.3,7,9,7s1.2-0.4,1.4-1h1.1C11.8,6,12,5.8,12,5.6
                V5.4C12,5.2,11.8,5,11.6,5h-1.1C10.2,4.4,9.7,4,9,4L9,4z"/>
            </g>
            <g>
              <path d="M5,10.4c-0.4,0-0.8-0.3-0.9-0.7L3.9,9.4l0.1-0.3C4.2,8.7,4.6,8.4,5,8.4s0.8,0.3,0.9,0.7l0.1,0.3h5.5l-0.1,0.1L6.4,9.4H6.1
                L5.9,9.7C5.8,10.1,5.4,10.4,5,10.4z M0.4,9.4L0.4,9.4h3.1H0.4z"/>
              <path d="M5,8.9c0.2,0,0.4,0.2,0.5,0.3l0.1,0.2L5.5,9.6C5.4,9.7,5.2,9.9,5,9.9S4.6,9.7,4.5,9.6L4.5,9.4l0.1-0.2
                C4.6,9.1,4.8,8.9,5,8.9 M5,7.9c-0.7,0-1.2,0.4-1.4,1H0.4C0.2,8.9,0,9.1,0,9.3v0.1c0,0.2,0.2,0.4,0.4,0.4h3.1c0.2,0.6,0.8,1,1.4,1
                s1.2-0.4,1.4-1h5.1c0.2,0,0.4-0.2,0.4-0.4V9.3c0-0.2-0.2-0.4-0.4-0.4H6.4C6.2,8.3,5.7,7.9,5,7.9L5,7.9z"/>
            </g>
          </g>
        </svg>

    </div>

    <div class="filters" v-bind:class="{'filters_active':filtersActive}">
      
      <div class="filters__container">
        <div class="filters__content">

          <h3 class="filters__title">Параметры поиска</h3>

          <form class="filters__form form" @submit.prevent="filtersSubmit()">

            <section class="section section_first">

              <label for="country" class="label">Страна аудитории:</label>

              <select name="country" class="select select_country" id='country' v-model="country">
                <option value="" class="select__placeholder"><span class="select__placeholder">Выберите страну</span> </option>
                <option v-for="country in allCountries"
                :key="country" :value="country" class="select__option">
                {{country}}
                </option>
              
              </select>


              <label for="city" class="label">Город аудитории:</label>

              <select name="city" id='city' class="select select_disabled" 
              v-if="!allCities[country]" disabled></select>

              <select v-else name="city" id='city' class="select" v-model="city">
                <option value="" class="select__placeholder">Выберите город</option>
                <option v-for="town in allCities[country]" :key="town" :value="town" class="select__option">
                  {{town}}
                  </option>

              </select>

            </section>

            <section class="section" v-if="allAgeCat">
              <label for="age" class="label">Возраст аудитории:</label>

              <div class="section__range-wraper"
                v-bind:style="{'--a': ageMin, '--b': ageMax}">
                 <input type="range" min="1" max="7" list="num" id='age' 
                 v-model="ageMin" v-on:change="ageMin > ageMax ? ageMin = ageMax : ageMin = ageMin; inputRange() " />

                 <input type="range" min="1" max="7" list="num"
                  v-model="ageMax" v-on:change="ageMax < ageMin ? ageMax = ageMin : ageMax = ageMax; inputRange() "/>

              </div>
              
              <datalist id="num" class="section__datalist" >

                <option v-for="age in allAgeCat" :key="age"
                  :label="age" class="section__datalist-option" v-bind:class="{'section__datalist-option-grey-font': !subscribersAge.includes(age)}">
                </option>

              </datalist> 

            </section>

            <section class="section" v-if="allGenderCat">

              <label class="label">Пол аудитории:</label>

              <div class="checkbox">
                <label v-for="g in allGenderCat" :key="g" :for="g" class="checkbox__label">
                  <span class="checkbox__text">{{g}}</span>
                  <input type="checkbox" v-model="SubscribersGender" :id="g" :value="g">
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

            </section>

            <section class="section">

              <label for="all-themes" class="label">Тематика:</label>

              <select name="all-themes" class="select" id='all-themes' 
              v-on:click="showThemes = true">
                
                <option value="" class="select__placeholder">
                  <span class="select__placeholder">Выберите тематику</span> 
                </option>

              </select>

              <div class="select__themes-wrapper" v-if="showThemes">
                <div class="select__themes-container">
                  <button class="select__themes-close-btn" v-on:click="showThemes = false">

                    <svg version="1.1" class="select__themes-close-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                      viewBox="0 0 7 7" style="enable-background:new 0 0 7 7;" xml:space="preserve">

                      <path class="st0" style="fill:#444444" d="M4.2,3.5l2.6-2.6C7,0.7,7,0.3,6.9,0.1S6.3,0,6.1,0.1L3.5,2.8L0.9,0.1C0.7,0,0.3,0,0.1,0.1S0,0.7,0.1,0.9
                        l2.6,2.6L0.1,6.1C0,6.3,0,6.7,0.1,6.9C0.2,7,0.4,7,0.5,7s0.3,0,0.4-0.1l2.6-2.6l2.6,2.6C6.2,7,6.4,7,6.5,7s0.3,0,0.4-0.1
                        C7,6.7,7,6.3,6.9,6.1L4.2,3.5z"/>
                    </svg>

                  </button>

                  <label v-for="theme in allThemes" :key="theme" :for="theme" class="checkbox checkbox__label">
                    <span class="checkbox__text">{{theme}}</span>
                    <input type="checkbox" v-model="themes" :id="theme" :value="theme">
                    <span v-if="!themes.includes(theme)" class="checkbox__span"></span>

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


            </section>

            <section class="section">

              <p class="label label-number">Подписчики:</p>

              <label for="sbcMin" class="number">
                
                <span class="number__label-left">От:</span>

                <input type="text" name="sbcMin" id="sbcMin" 
                  v-on:input="numbersOnInput($event.target, 'sbcMin')" placeholder="0">

                <span class="number__rubble"></span> 

              </label>

              <label for="sbcMax" class="number">
                
                <span class="number__label-left">До:</span>

                <input type="text" name="sbcMax" id="sbcMax" 
                  v-on:input="numbersOnInput($event.target, 'sbcMax')" placeholder="0">

                <span class="number__rubble"></span> 

              </label>

            </section>

            <section class="section">

              <p class="label-number">Охваты постов:</p>

              <label for="postRangeMin" class="number">
                
                <span class="number__label-left">От:</span>

                <input type="text" name="postRangeMin" id="postRangeMin" 
                  v-on:input="numbersOnInput($event.target, 'postRangeMin')" placeholder="0">

                <span class="number__rubble"></span> 

              </label>

              <label for="postRangeMax" class="number">
                
                <span class="number__label-left">До:</span>

                <input type="text" name="postRangeMax" id="postRangeMax"
                v-on:input="numbersOnInput($event.target, 'postRangeMax')" placeholder="0">

                <span class="number__rubble"></span> 

              </label>

            </section>

            <section class="section">

              <p class="label label-number">Охваты сторис:</p>

              <label for="storyRangeMin" class="number"> 
                
                <span class="number__label-left">От:</span>

                <input type="text" name="storyRangeMin" id="storyRangeMin" 
                  v-on:input="numbersOnInput($event.target, 'storyRangeMin')" placeholder="0">

                <span class="number__rubble"></span> 

              </label>

              <label for="storyRangeMax" class="number">
                
                <span class="number__label-left">До:</span>

                <input type="text" name="storyRangeMax" id="storyRangeMax"
                  v-on:input="numbersOnInput($event.target, 'storyRangeMax')" placeholder="0">

                <span class="number__rubble"></span> 

              </label>

            </section>

            <section class="section">

              <p class="label label-number">Стоимость рекламных постов:</p>

              <label for="postPriceMin" class="number">От:

                <input type="text" name="postPriceMin" id="postPriceMin" 
                v-on:input="numbersOnInput($event.target, 'postPriceMin')" placeholder="0">

                <span class="number__rubble">₽</span> 

              </label>

              <label for="postPriceMax" class="number">До:

                <input type="text" name="postPriceMax" id="postPriceMax"
                  v-on:input="numbersOnInput($event.target, 'postPriceMax')" placeholder="0">

                <span class="number__rubble">₽</span> 

              </label>

            </section>

            <section class="section">

              <p class="label label-number">Стоимость рекламных сторис:</p>

              <label for="storyPriceMin" class="number">От:

                <input type="text" name="storyPriceMin" id="storyPriceMin" 
                  v-on:input="numbersOnInput($event.target, 'storyPriceMin')" placeholder="0">

                <span class="number__rubble">₽</span> 

              </label>

              <label for="storyPriceMax" class="number">До:

                <input type="text" name="storyPriceMax" id="storyPriceMax"
                  v-on:input="numbersOnInput($event.target, 'storyPriceMax')" placeholder="0">

                <span class="number__rubble">₽</span> 

              </label>

            </section>

            <section class="section">

              <div class="checkbox checkbox_single">
                <label for="isParticipant" class="checkbox__label">
                  <span class="checkbox__text-long">
                    Участник клуба <br> Rockstar Bloggers
                  </span>
                  <input type="checkbox" v-model="isParticipant" id="isParticipant">
                  <span v-if="!isParticipant" class="checkbox__span"></span>

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

            </section>

            <section class="section section_last">

              <div class="checkbox checkbox_single">
                <label for="isParticipant" class="checkbox__label">
                  <span class="checkbox__text-long">
                    Готовность <br> К взаимопостингу
                  </span>
                  <input type="checkbox" v-model="isCoopReady" id="isCoopReady">
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
              </div>

            </section>

          </form>
              <!-- <div class="allThemes" v-for="theme in allThemes" :key="theme">{{theme}}</div> -->


          
          <!-- <form @submit.prevent="filtersSubmit()" class="filters__filters-form">
              <h3>Выбор темы</h3>
              <br />

              <div class="allThemesHundler">
                <section class="allThemes" v-for="theme in allThemes" :key="theme">
                  <input
                    type="checkbox"
                    name="theme"
                    class="themeInput"
                    v-model="themes"
                    :id="theme"
                    :value="theme"
                  />
                  <label :for="theme">{{theme}}</label>
                </section>
              </div>

              <p>country</p>
              <select name="country" v-model="country">
                <option v-for="country in allCountries" :key="country" :value="country">{{country}}</option>
              </select>
              <br />

              <p v-if="allCities[country]">city</p>
              <select name="city" v-model="city" v-if="allCities[country]">
                <option v-for="town in allCities[country]" :key="town" :value="town">{{town}}</option>
              </select>
              <br />

              <p v-if="allGenderCat">SubscribersGender</p>
              <select
                name="SubscribersGender"
                id="SubscribersGender"
                v-model="SubscribersGender"
                v-if="allGenderCat"
              >
                <option v-for="gender in allGenderCat" :key="gender" :value="gender">{{gender}}</option>
              </select>

              <p v-if="allAgeCat">subscribersAge</p>
              <select name="subscribersAge" id="subscribersAge" v-model="subscribersAge" v-if="allAgeCat">
                <option v-for="age in allAgeCat" :key="age" :value="age">{{age}}</option>
              </select>

              <div>
                <p>Подписчики: от - до (целые числа от 0)</p>
                <input type="number" name id v-model="sbcMin" />-
                <input type="number" name id v-model="sbcMax" />
              </div>
              <div>
                <p>Охваты постов: от - до (целые числа от 0)</p>
                <input type="number" name id v-model="postRangeMin" />-
                <input type="number" name id v-model="postRangeMax" />
              </div>

              <div>
                <p>Охваты сторис: от - до (целые числа от 0)</p>
                <input type="number" name id v-model="storyRangeMin" />-
                <input type="number" name id v-model="storyRangeMax" />
              </div>

              <div>
                <p>Стоимость рекламных постов: от - до (целые числа от 0) и значок рубля</p>
                <input type="number" name id v-model="postPriceMin" />-
                <input type="number" name id v-model="postPriceMax" />
              </div>

              <div>
                <p>Стоимость рекламных сторис: от - до (целые числа от 0) и значок рубля</p>
                <input type="number" name id v-model="storyPriceMin" />-
                <input type="number" name id v-model="storyPriceMax" />
              </div>

              <div>
                <p>Участник клуба рокстар (галочка)</p>
                <input type="checkbox" name id v-model="isParticipant" />
              </div>
              <div>
                <p>Готовность к взаимпиару (галочка)</p>
                <input type="checkbox" name id v-model="isCoopReady" />
              </div>

              <button type="submit">кнопка</button>
          </form> -->

        </div>
      </div>




    </div>

    <div class="fullscreenShadow" v-bind:class="{fullscreenShadowActive:filtersActive}" v-on:click="filtersActive=!filtersActive"></div>

  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default {
    name: 'filters',

    data() {
      return {
        showThemes: false,
        ageMin: 2,
        ageMax: 6,
        filtersActive: false,
        themes: [],
        country: '',
        city: '',
        subscribersAge: [],
        SubscribersGender: ['Любой'],
        sbcMin: 100,
        sbcMax: null,
        postRangeMin : null,
        postRangeMax : null,
        storyRangeMin : null,
        storyRangeMax : null,
        postPriceMin: null,
        postPriceMax : null,
        storyPriceMin: 1000,
        storyPriceMax: null,

        isParticipant: false,
        isCoopReady: false,

      }
    },
    computed: 
    mapGetters(["allThemes", "allCountries", "allCities","allAgeCat","allGenderCat",]),

    mounted() {
     this.inputRange()
    },


    methods: {
      ...mapActions(["fetchAllBloggers"],),

      numbersOnInput(target, model) {
        let strVal = target.value.split(',').join('')
        let numVal = +target.value.split(',').join('')

        if (numVal +1 -1 !== numVal) {
          console.log('not number')
          return target.value = new Intl.NumberFormat('en-US').format(+strVal.slice(0, strVal.length - 1))
        }
        else {
          console.log(true)
          this[model] = numVal
          target.value = new Intl.NumberFormat('en-US').format(numVal)
        }



      },

      inputRange(){
        this.subscribersAge = []
        for(let a = this.ageMin; a <= this.ageMax; a++) {

          this.subscribersAge.push(this.allAgeCat[a-1])
        }
        console.log(this.subscribersAge)

      },


      filtersSubmit() {
        this.subscribersAge = []
        for(let a = this.ageMin; a <= this.ageMax; a++) {
          this.subscribersAge.push(this.allAgeCat[a-1])
        }
        console.log(subscribersAge)

        let filtersValue = {
          themes: { $all: this.themes } ,
          country: this.country,
          city: this.city,
          // Age неверен!!
          // subscribersAge: this.subscribersAge,
          SubscribersGender: this.SubscribersGender,
          subscribersNumber: {$gte: this.sbcMin, $lte: this.sbcMax},
          AveragePost: {$gte: this.postRangeMin  , $lte: this.postRangeMax },
          AverageStory: {$gte: this.storyRangeMin  , $lte: this.storyRangeMax },

          postPrice: {$gte: this.postPriceMin  , $lte: this.postPriceMax},

          storyPrice:{$gte: this.storyPriceMin  , $lte: this.storyPriceMax },

          isParticipant: this.isParticipant,
          isCoopReady: this.isCoopReady,
        };

  if( filtersValue.city && !this.allCities[this.country] || filtersValue.city == '') delete filtersValue.city

  for (var elem in filtersValue) {
  let gg = filtersValue[elem]

    if (gg == '')  delete filtersValue[elem] 

    if (gg.$lte === null || gg.$lte == '') delete gg.$lte 

  if (gg.$gte === null || gg.$gte == '') delete gg.$gte

  if (gg === false) delete delete filtersValue[elem] 

  if ( typeof filtersValue[elem] === "object" && Object.keys(filtersValue[elem]).length === 0) delete filtersValue[elem] 

  }
  if (this.themes.length === 0) delete filtersValue.themes

  //|| Object.keys(elem).length === 0  || elem == null
  this.fetchAllBloggers(filtersValue)

  console.log(filtersValue)
    filtersValue = {}
      },
  }

  }
</script>


<style lang="scss" scoped>

  @mixin mainBreakpoint {
    @media (max-width: 1170px) {
        @content;
    }
  }

  .divider {

    margin: 0px 0px -16px -192px;
    content: '';
    position: absolute;

    width: 400px;
    bottom:0px;
    height: 1px;
    background-color: #dfdfdf;
  }

  .filters {
    height: 100vh;
    position: fixed;
    overflow-x: hidden;
    overflow-y: auto;

    top:0px;
    left: 278px;
    width: 211px;
    background-color:#e8e8e8;
    -webkit-transition: all 0.5s ease 0s;
    transition: all 0.5s ease 0s;   
    z-index: 1;
 
    &::-webkit-scrollbar {
          width: 3px;

    } 
    &::-webkit-scrollbar-thumb {
      max-height: 20px;
      background-color: black;
    } 
    &::-webkit-scrollbar-track {
      background-color: rgb(208,208,208); /* or add it to the track */
    } 
    @include mainBreakpoint {
      left: unset;
      right: -211px;
      z-index: 51;
      position: fixed;
    }
    
    &__container {
      margin: 35px 20px 35px 20px;
    }

    &__content {
      display: flex;
      flex-wrap: wrap;
    }

    &__title {
      font-size: 18px;
      font-family: 'Oswald';
    }

    &__form {
      margin-top: 20px;
    }

    // Верстка анимации сокрытия
    &_active {
      right: 0px;
      -webkit-transition: all 0.5s ease 0s;
      transition: all 0.5s ease 0s;
      z-index: 100;
      position: fixed;
    }

  }
  // Кнопка и анимации для мобильных устройств
  .mobile-button-wrapper {
    display: none;
    @include mainBreakpoint {
      display: block;
      position: fixed;
    }
    z-index: 40;
    
    right: 0px;
    top: 73px;

    width: 26px;
    height: 24px;
    border-radius: 3px;
    box-shadow: 1.5px 2.598px 3px rgba(0,0,0,0.15);
    background-color: white;
    -webkit-transition: all 0.5s ease 0s;
    transition: all 0.5s ease 0s;

  }
  .mobile-svg {
    z-index: 100;
    margin: 7px 7px 7px 8px;
    fill: grey
  }
  .mobile-button-moved {
    right: 211px;
    -webkit-transition: all 0.5s ease 0s;
    transition: all 0.5s ease 0s;
    position: fixed;
    z-index: 100;
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
    opacity: 80%;
    z-index: 40;
  }
  //

  .section {
    margin-top: 35px;
    position: relative;


    &::after { 
      @extend .divider
    }
    
    &_first {
      margin-top: 0px;
    }

    &__range-wraper {
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

        margin-left: calc(16px + (var(--a) - 1)/6*156px);

        width: calc((var(--b) - var(--a))/6*156px - 16px);
      }
    }

    input[type='range'] {
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
        z-index: 100;
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

    &_last::after {
      margin: unset;
      content: none;
      position: unset;
      width: unset;
      bottom:unset;
      height: unset;
      background-color: none;
    }

  }

  .label {
    font-size: 13px;
    
    // line-height: 28px;
    text-align: left;
    font-family: "Roboto-regular";
    &-number {
      margin-bottom: 7px;
      line-height: 1em;
    }
  }

  .number {
    font-size: 13px;
    line-height: 28px;
    font-family: "Roboto-regular";  
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5px;
    
    &__label-left {
      width: 20px;
    }

    & input[type='text'] {
      width: 131px;
      height: 28px;
      border-radius: 3px;
      background-color: #ffffff;
      cursor: pointer;
      padding-left: 10px;
      padding-top: 2.5px;
      font-size: 13px;
      // line-height: 28px;
      display: inline-block;
      &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
        -webkit-appearance: none;
      }
    }

    &__rubble {
      min-width: 9px;
    }
  }

  .select {
    margin-top: 6px;
    padding-left: 10px;
    width: 172px;
    height: 28px;
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


    &__themes-wrapper {
      white-space: nowrap;
      overflow: visible;
      position: absolute;
      top: 50px;
      left: 0px;

      z-index: 100;
      background-color: #fff;
      width: 400px;
      height: 511px;

    }

    &__themes-container {
      z-index: 100;
      width: 400px;
      height: 511px;
      // background-color: #fff;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      position: relative;

    }

    &__themes-close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    &__themes-close-svg {
      width: 8px;
      height: 8px;
    }
  }

  .checkbox {
    height: 58px;
    display: flex;
    flex-direction: column;
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

  
    }

    
    &__text {
      margin-left: 20px;
      text-align: left;
      font-family: "Roboto-regular"
    }

    &__text-long {
      position: absolute;
      top:0px;
      left: 20px;
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
      height: 14px;
      width: 14px;
      padding: 3.5px;
      background-color: #fff;
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
  }

</style>