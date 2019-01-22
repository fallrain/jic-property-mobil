<template>
  <div id="app" class="app">
    <keep-alive
      :exclude="['PaymentHistoryList']"
    >
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>
<style lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/reset.less';
</style>
<style lang="scss">
  @import 'assets/css/base';
</style>
<style>
  @import 'assets/font/iconfont.css';
</style>
<style lang="scss">
  @import 'assets/css/common';
</style>
