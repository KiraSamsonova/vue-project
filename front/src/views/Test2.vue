<template>
  <div>
   <div class="wrap" role="group" aria-labelledby="multi-lbl" style="--a: -30; --b: 20; --min: -50; --max: 50">


  <input id="a" type="range" min="-50" value="-30" max="50"/>
  <output for="a" style="--c: var(--a)"></output>

  <input id="b" type="range" min="-50" value="20" max="50"/>
  <output for="b" style="--c: var(--b)"></output>
</div>

  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'Test2',

mounted() {
  addEventListener('input', e => {
  let _t = e.target;
  _t.parentNode.style.setProperty(`--${_t.id}`, +_t.value);
}, false);
}
}
</script>

<style scoped>

* {
  font: inherit;
}

.wrap {
  --dif: calc(var(--max) - var(--min));
  display: grid;
  grid-template: repeat(2, -webkit-max-content)/ 1fr 1fr;
  grid-template: repeat(2, max-content)/ 1fr 1fr;
  overflow: hidden;
  position: relative;
  margin: 1em auto;
  width: 20em;
  background: -webkit-gradient(linear, left bottom, left top, color-stop(1em, #ccc), color-stop(0, transparent));
  background: linear-gradient(0deg, #ccc 1em, transparent 0);
  font-family: ubuntu mono, consolas, monaco, monospace;
}
.wrap::before, .wrap::after {
  grid-column: 1/ span 2;
  grid-row: 2;
  height: 100%;
  background: #95a;
  content: "";
}
.wrap::before {
  margin-left: calc((var(--a) - var(--min))/var(--dif)*100%);
  width: calc((var(--b) - var(--a))/var(--dif)*100%);
}
.wrap::after {
  margin-left: calc((var(--b) - var(--min))/var(--dif)*100%);
  width: calc((var(--a) - var(--b))/var(--dif)*100%);
}

input[type='range'] {
  grid-column: 1/ span 2;
  grid-row: 2;
  z-index: 1;
  top: 0;
  left: 0;
  margin: 0;
  background: none;
  /* get rid of white Chrome background */
  color: #000;
  pointer-events: none;
}
input[type='range']::-webkit-slider-runnable-track, input[type='range']::-webkit-slider-thumb, input[type='range'] {
  -webkit-appearance: none;
}
input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 100%;
  background: none;
}
input[type='range']::-moz-range-track {
  width: 100%;
  height: 100%;
  background: none;
}
input[type='range']::-webkit-slider-thumb {
  border: none;
  /* get rid of Firefox thumb border */
  width: 1em;
  height: 1em;
  border-radius: 0;
  /* get rid of Firefox corner rounding */
  background: currentcolor;
  pointer-events: auto;
}
input[type='range']::-moz-range-thumb {
  border: none;
  /* get rid of Firefox thumb border */
  width: 1em;
  height: 1em;
  border-radius: 0;
  /* get rid of Firefox corner rounding */
  background: currentcolor;
  pointer-events: auto;
}


output {
  grid-row: 1;
}
output:last-child {
  text-align: right;
}
output::after {
  counter-reset: c var(--c);
  content: "--" attr(for) ": " counter(c) ";";
}

</style>