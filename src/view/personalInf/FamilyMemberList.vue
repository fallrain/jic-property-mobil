<template>
  <div class="FamilyMemberList">
    <h-left-slide
      v-for="(item,i) in list"
      :key="i"
    >
      <div class="FamilyMemberList-cnt">
        <p class="FamilyMemberList-cnt-inf">
          <img src="@/assets/img/Mask Copy 2@2x.png">
          <span class="name">{{item.name}}</span>
          <span class="tel">{{item.tel}}</span>
        </p>
        <p class="FamilyMemberList-cnt-type">{{item.type}}</p>
      </div>
    </h-left-slide>
  </div>
</template>
<script>
import {
  HLeftSlide
} from '@/components/common';

export default {
  components: {
    HLeftSlide
  },
  data () {
    return {
      list: [
        {
          name: '李大宝',
          tel: '189 **** 9862',
          type: '房东'
        },
        {
          name: '李大宝',
          tel: '189 **** 9862',
          type: '房东'
        },
        {
          name: '李大宝',
          tel: '189 **** 9862',
          type: '房东'
        }
      ]
    };
  }
};
</script>
<style>

</style>
