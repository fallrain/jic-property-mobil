<template>
  <div class="Nobind">
    <div class="Nobind-img-par">
      <img
        class="Nobind-img"
        src="@/assets/img/nobind.png"
      >
      <p class="Nobind-img-inf">您没有物业管理权限</p>
    </div>
    <!--<h-button
      class="Nobind-btn"
      :width="264"
      :height="39"
      cnt="我要绑定"
      @click.native="toBind"
    ></h-button>-->
  </div>
</template>

<script>
import {HButton} from '@/components/common';

export default {
  name: 'NobindOfProperty',
  components: {
    HButton
  }
};
</script>

<style scoped>

</style>
