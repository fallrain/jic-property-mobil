<template>
<div>
  <ol>
    <li
      v-for="(item,i) in data"
      :key="i"
      @click="radioClick(i)"
    >
      <i :class="['iconfont',value===i?'icon-danxuan':'icon-guanbi']"></i>
      <span>{{item.label}}</span>
    </li>
  </ol>
</div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array
    },
    value: {
    }
  },
  data () {
    return {
    };
  },
  methods: {
    radioClick (index) {
      this.$emit('input', index);
    }
  }
};
</script>
<style lang="scss">

</style>
