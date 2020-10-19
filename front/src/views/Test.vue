<template>
<div class="flex">
<p class="checker" v-on:click="role=false">111111</p>
  <div class="test1">
    
<input type="checkbox" class="toggle" id='toggle' v-model="role" checked>
<label for="toggle" class="toggle__comma" v-bind:class="{'toggle__comma-checked': role}">·</label>  
  
  </div>
   <p class="checker" v-on:click="role=true">22222</p>
   </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'Test',
  data() {
      return {
        role: false,
      }
  }
}
</script>

<style lang="scss" scoped>

.flex {
  display: flex;
  align-items: center;
  margin: 320px 810px;
}
.test1 {
  position: relative;
}

.toggle {
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
  height: 14px;
  border-radius: 7px;

  &__comma{
    position: absolute;
    font-size: 70px;
    color: #3f5baa;
    top: -27px;
    left: -5px;
    transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
  }
}

.checker {
  margin: 10px;
  background-color: yellow;
  border: 1px red solid;
  border-radius: 10px;
  padding: 5px;
}

.toggle:after {
  content: "";
  width: 12px;
  height: 12px;
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 50%;
  background: white;
  transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
}

.toggle:checked:after, .toggle__comma-checked{
  transform: translatex(13px);
}


</style>