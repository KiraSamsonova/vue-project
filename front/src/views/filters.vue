<template>
  <div>

    <div class="mobile-button-wrapper" 
        v-bind:class="{'mobile-button-moved':filtersActive}"
        v-on:click="toggleFilters()">

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

          <form class="filters__form form" v-on:change="filtersSubmit()">

            <section class="section section_first">

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


              <label for="city" class="label">Город аудитории:</label>

              <select name="city" id='city' class="select select_disabled" 
              v-if="!allCities[country]" disabled></select>

              <select v-else name="city" id='city' 
                class="select" v-bind:class="{select__fontBlack:city !== ''}" v-model="city">
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
                 <input type="range" min="1" max="8" list="num" id='age' 
                 v-model="ageMin" v-on:change="ageMin >= ageMax - +1 ? ageMin = ageMax - +1 : ageMin = ageMin; inputRange() " />

                 <input type="range" min="1" max="8" list="num"
                  v-model="ageMax" v-on:change="ageMax < ageMin + +1 ? ageMax = ageMin + +1 : ageMax = ageMax; inputRange() " />

              </div>
              
              <datalist id="num" class="section__datalist" >

                <option v-for="age in allAgeCat" :key="age"
                  :label="age" class="section__datalist-option" v-bind:class="{'section__datalist-option-grey-font': !chosenOptionsAges.includes(age)}">
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

            <section class="section themes">

              <p class="label">Тематика:</p>

              <div class="themes__list" v-if="themes.length !== 0">

                <div class="themes__list-single"
                v-for="theme in themes" :key="theme">

                  <span class="themes__list-text">
                    {{theme.slice(0, theme.length-1) }}<span class="themes__last-letter">{{theme.slice(theme.length-1) }}


                      <span class="themes__list-number">{{getAllThemes[theme]}}23</span>

                    </span> 
                    
                  </span>

                </div>  

              </div>

              <button class="themes__open-btn" type="button" 
                v-on:click="themesModalActive=!themesModalActive">
                <span class="themes__btn-text"
                  v-if="themes.length === 0"
                >Выбрать
                </span>

                <span v-else class="themes__btn-text">Изменить</span>
              </button>

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

              <p class="label label-number">Вовлечение</p>

              <label for="engagementMin" class="number">От:

                <input type="text" name="engagementMin" id="engagementMin" 
                v-on:input="numbersOnInput($event.target, 'engagementMin')" placeholder="0">

                <span class="number__percent">%</span> 

              </label>

              <label for="engagementMax" class="number">До:

                <input type="text" name="engagementMax" id="engagementMax"
                  v-on:input="numbersOnInput($event.target, 'engagementMax')" placeholder="0">

                <span class="number__percent">%</span> 

              </label>

            </section>

            <section class="section">

              <p class="label label-number">Стоимость <br> рекламных постов:</p>

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

              <p class="label label-number">Стоимость <br> рекламных сторис:</p>

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
                <label for="isCoopReady" class="checkbox__label">
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

        </div>
      </div>

    </div>

    <div class="themes__modal" v-if="themesModalActive">

      <button class="themes__close-btn" v-on:click="themesModalActive=!themesModalActive">

        <svg version="1.1" class="themes__close-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          viewBox="0 0 7 7" style="enable-background:new 0 0 7 7;" xml:space="preserve">

          <path class="st0" style="fill:#444444" d="M4.2,3.5l2.6-2.6C7,0.7,7,0.3,6.9,0.1S6.3,0,6.1,0.1L3.5,2.8L0.9,0.1C0.7,0,0.3,0,0.1,0.1S0,0.7,0.1,0.9
            l2.6,2.6L0.1,6.1C0,6.3,0,6.7,0.1,6.9C0.2,7,0.4,7,0.5,7s0.3,0,0.4-0.1l2.6-2.6l2.6,2.6C6.2,7,6.4,7,6.5,7s0.3,0,0.4-0.1
            C7,6.7,7,6.3,6.9,6.1L4.2,3.5z"/>
        </svg>

      </button>

      <div class="themes__container">

        <h5 class="label">Тематика:</h5>

          <div class="themes__content">

            <label v-for="(themeNumber, themeName) in getAllThemes" :key="themeName" :for="themeName" 
              class="checkbox checkbox-themes checkbox__label"
              v-on:click="createThemesListMargin()">

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

        <button class="themes__btn-ready" v-on:click="themesSubmit()">
          <span class="themes__btn-ready-text">Готово</span> 
        </button>            
      </div>

    </div>

    <div class="fullscreenShadow"
      v-bind:class="{fullscreenShadowActive:filtersActive}"
      v-on:click="toggleFilters()">
    </div>

    <div class="fullscreenShadow"
     v-bind:class="{themesFullscreenShadowActive:themesModalActive}"
      v-on:click="themesModalActive=!themesModalActive">
    </div>


  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
  export default {
    name: 'filters',

    data() {
      return {
        themesModalActive: false,
        ageMin: 2,
        ageMax: 7,
        chosenOptionsAges: [],
        filtersActive: false,
        themes: [],
        country: '',
        city: '',
        subscribersAge: [],
        SubscribersGender: ['Любой'],
        sbcMin: null,
        sbcMax: null,
        postRangeMin : null,
        postRangeMax : null,
        storyRangeMin : null,
        storyRangeMax : null,
        engagementMin: null,
        engagementMax: null,
        postPriceMin: null,
        postPriceMax : null,
        storyPriceMin: null,
        storyPriceMax: null,
        isParticipant: false,
        isCoopReady: false,
      }
    },
    computed: 
    mapGetters(["allThemes", "allCountries", "allCities","allAgeCat","allGenderCat","getAllThemes"]),

    mounted() {
      this.inputRange()
      this.createThemesListMargin()
      this.axiosGetAllThemes() 
      this.hasIdParam()
      
    },


    methods: {
      ...mapActions(["fetchAllBloggers",'axiosBloggerById', "axiosGetAllThemes"]),
 
      hasIdParam() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id')
        if(id !== null) {
          this.axiosBloggerById(id)
        } else {
          this.filtersSubmit()
        }
      },

      createThemesListMargin () {
        let texts = document.getElementsByClassName('themes__list-text')
        let numbers = document.getElementsByClassName('themes__list-number')
        for (let i = 0; i < texts.length; i++) {
          texts[i].style.marginRight = `${numbers[i].offsetWidth + 8}px`
        }
      },

      toggleFilters() {
        this.filtersActive = !this.filtersActive;

        if(this.filtersActive) disableBodyScroll(document.getElementsByTagName('body'))

        else enableBodyScroll(document.getElementsByTagName('body'))
      },

      themesSubmit() {
        this.themesModalActive=false
        this.filtersSubmit()
      },

      numbersOnInput(target, model) {
        let strVal = target.value.split(',').join('')
        let numVal = +target.value.split(',').join('')

        if (numVal +1 -1 !== numVal) {
          
          return target.value = new Intl.NumberFormat('en-US').format(+strVal.slice(0, strVal.length - 1))
        }
        else {
        
          this[model] = numVal
          target.value = new Intl.NumberFormat('en-US').format(numVal)
        }



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

      filtersSubmit() {

        if(window.location.search !== '') {
          history.pushState({param: 'Value'}, '', 'home');
        }

        // Составляем объект с данными фильтров
        let filtersValue = {
          themes: this.themes,
          country: this.country,
          city: this.city,
          subscribersAge: this.subscribersAge,
          SubscribersGender: this.SubscribersGender,
          sbcMin: this.sbcMin,
          sbcMax: this.sbcMax,
          postRangeMin: this.postRangeMin,
          postRangeMax: this.postRangeMax,
          storyRangeMin: this.storyRangeMin,
          storyRangeMax: this.storyRangeMax,
          engagementMin: this.engagementMin,
          engagementMax: this.engagementMax,
          postPriceMin: this.postPriceMin,
          postPriceMax: this.postPriceMax,
          storyPriceMin: this.storyPriceMin,
          storyPriceMax: this.storyPriceMax,

          isParticipant: this.isParticipant,
          isCoopReady: this.isCoopReady,
        };

        // Обрабатываем данные по странам и городам
        if( filtersValue.city && !this.allCities[this.country]) delete filtersValue.city


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
    font-size: 13px;
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
      z-index: 70;
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
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    box-shadow: 1.5px 2.598px 3px rgba(0,0,0,0.15);
    background-color: white;
    -webkit-transition: all 0.5s ease 0s;
    transition: all 0.5s ease 0s;

  }
  .mobile-svg {
    z-index: 70;
    margin: 7px 7px 7px 8px;
    fill: grey
  }
  .mobile-button-moved {
    right: 211px;
    -webkit-transition: all 0.5s ease 0s;
    transition: all 0.5s ease 0s;
    position: fixed;
    z-index: 70;
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

        margin-left: calc(16px + (var(--a) - 1)/7*156px);

        width: calc((var(--b) - var(--a))/7*156px - 16px);
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

    &__percent {
      min-width: 9px;
      font-family: 'Roboto-bold';
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
    
    &__textDark {
      color: black !important;
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
    &__open-btn {
      width: 62px;
      height: 21px;
      border-radius: 3px;
      background-color: #969696;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;

      &:hover {
        background-color: black;
      }
    }

    &__btn-text {
      font-family: "Roboto-regular";
      color: #fff;
      text-align: center;
      font-size: 11px;
    }

    &__list {
      margin-top: 10px;
    }

    &__list-single {
      display: inline-block;
    }

    &__list-text {
      text-decoration: underline;
      display: inline-block;
      line-height: 21px;
    }

    &__last-letter {
      position: relative;
    }

    &__list-number {
      position: absolute;
      top:-5px;
      left: 100%;
      font-size: 8px;
    }

    &__modal {
      font-family: "Roboto-regular";
      position: fixed;
      top: 50%;
      left: 50%;
      margin-top: -241px; 
      margin-left: -326px; 
      z-index: 80;
      width: 652px;
      height: 482px;
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
      margin: 30px 25px 35px 25px;
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
      margin-top: 15px;
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

    &__btn-ready {
      width: 100px;
      height: 38px;
      border-radius: 3px;
      margin: 35px auto 0 auto;
      background-color: #3f5baa;
      display: flex;
      justify-content: center;
      align-items: center;

    }

    &__btn-ready-text {
      color: #fff;
      text-align: center;
    }
  } 

</style>