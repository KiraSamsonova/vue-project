<template>
  <div>
        <!-- <div class="level">
            <label>Level:</label><br/>
            <input type="range" min="1" max="5" list="num" />
            <datalist id="num" class="datalist">
                <option value="1" label="1"></option>
                <option value="2" label="2"></option>
                <option value="3" label="3"></option>
                <option value="4" label="4"></option>
                <option value="5" label="5"></option>
            </datalist>        
        </div> -->


    <div class="wrap"

     v-bind:style="{'--a': a, '--b': b}">

      <input type="range" min="1" max="7" list="num" v-model="a" v-on:change="inputA(a)"  />




      <input type="range" min="1" max="7" list="num" v-model="b" v-on:change="inputB(b)"/>

    </div>
      <!-- <datalist id="num">
          <option label="13"></option>
          <option label="18"></option>
          <option label="25"></option>
          <option label="35"></option>
          <option label="45"></option>
          <option label="55"></option>
          <option label="65+"></option>
        </datalist>  -->
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'Test',
  data() {
    return {
      a: 1,
      b: 7
    }
  },

  methods: {
    inputA(v) {
      console.log(v)
    },
       inputB(v) {
      console.log(v)
    }
  }
}
</script>

<style lang="scss" scoped>

.wrap {
  display: grid;
  grid-template: repeat(1, max-content)/ 1fr;
  overflow: visible;
  position: relative;
  margin: 1em auto;
  height: 3px;
  width: 172px;
  background: grey;
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
    border: 1px solid #000000;
    height: 16px;
    width: 16px;
    border-radius: 100%;
    background: white;
    cursor: pointer;
    margin-top: -7px; 
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


// datalist {
//   grid-column: 1;
//   grid-row: 1;
//   background: #fff;
//   width: 107%;
//   margin: 0px -8px;
//   display: flex;
//   justify-content: space-between;
// }

// datalist option {
//   text-align: center;
//   font-size: 11px;
//   /* line-height: 28px; */
//   font-family: 'Roboto-regular';
//     -webkit-box-flex: 1;
//     -webkit-flex-grow: 1;
//         -ms-flex-positive: 1;
//             flex-grow: 1;
//     -webkit-flex-basis: 0;
//         -ms-flex-preferred-size: 0;
//             flex-basis: 0;
// } 


// .section {
//   width: 150px;
// }




</style>