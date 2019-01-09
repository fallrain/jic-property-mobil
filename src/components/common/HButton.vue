<template>
<button
  class="HButton"
  type="button"
  :style="{
    width:width+'px',
    height:height+'px'
  }"
>
  {{cnt}}
</button>
</template>
<script>
export default {
  props: {
    width: {
      default: 100
    },
    height: {
      default: 30
    },
    cnt: {
    }
  }
};
</script>
<style>

</style>
