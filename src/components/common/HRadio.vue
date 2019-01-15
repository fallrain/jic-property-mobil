<template>
<div>
  <ol>
    <li
      v-for="(item,i) in data"
      :key="i"
    >
      <i class=""></i>
      <span>{{item.name}}</span>
    </li>
  </ol>
</div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array
    }
  }
};
</script>
<style>

</style>
