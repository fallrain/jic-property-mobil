<template>
  <div class="HTitleItem">
    <p class="HTitleItem-title">{{title}}</p>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ['title']
};
</script>
<style lang="scss">
  .HTitleItem {
    padding-top: 14px;
    padding-bottom: 14px;
    border-bottom: 6px solid #EFEEF5;
    &:last-child {
      border-bottom: none;
    }
  }

  .HTitleItem-title {
    margin-left: 22px;
    border-left: 4px solid #4486FF;
    padding-left: 8px;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    color: #333;
  }
</style>
