<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout';
import MainLayout from '@/layouts/MainLayout';
import DashboardLayout from '@/layouts/DashboardLayout';

export default {

    created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401) {
          console.log('401')
        }
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err;
      });
    });
  },

  computed: {
      layout() {
     
        return (this.$route.meta.layout || 'empty') + '-layout'; 
    
      }
    
  },
  components: {
    EmptyLayout,MainLayout,DashboardLayout
  }
};
</script>

<style lang="scss">

/*Обнуление*/
*{padding: 0;margin: 0;border: 0;}
*,*:before,*:after{-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}
:focus,:active{outline: none;}
a:focus,a:active{outline: none;}
nav,footer,header,aside{display: block;}
html,body{height:100%;width:100%;font-size:100%;line-height:1;font-size:14px;-ms-text-size-adjust:100%;-moz-text-size-adjust:100%;-webkit-text-size-adjust:100%;background-color:#f8f8f8;}
input,button,textarea{font-family:inherit;}
input::-ms-clear{display: none;}
button{cursor: pointer;}
button::-moz-focus-inner{padding:0;border:0;}
a,a:visited{text-decoration: none;}
a:hover{text-decoration: none;}
ul li{list-style: none;}
img{vertical-align: top;}
h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight: inherit;}
/*--------------------*/


/*Шрифты*/
  @font-face { 
    font-family: "Oswald"; 
    src: url(~@/assets/media/fonts/Oswald/Oswald.ttf);

  }
   @font-face { 
    font-family: "Roboto-regular"; 
    src: url(~@/assets/media/fonts/Roboto/Roboto-regular.ttf); 
    font-weight: 400;
  }

  @font-face { 
    font-family: "Roboto-bold"; 
    src: url(~@/assets/media/fonts/Roboto/Roboto-bold.ttf); 
    font-weight: 700;
  }


  
</style>
