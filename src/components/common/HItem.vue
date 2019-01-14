<template>
  <div class="HItem">
    <p class="HItem-title">{{title}}</p>
    <p class="HItem-val">{{val}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {

    },
    val: {

    }
  }
};
</script>
<style lang="scss">
  .HItem {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 8px 6px;
    border-bottom: 1px solid #DDD;
  }

  .HItem-title {
    color: #999;
  }

  .HItem-val {
    color: #333;
  }
</style>
