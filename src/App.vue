<template>
  <div id="app" class="app">
    <div class="app-container">
      <keep-alive
        :exclude="['PaymentHistoryList','PaymentDetail']"
      >
        <router-view/>
      </keep-alive>
    </div>
    <footer class="app-footer">
      <img
        class="app-footer-img"
        src="@/assets/img/zjkbank-logo@2x.png"
      ><span class="app-footer-inf">张家口银行提供技术支持</span>
    </footer>
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
