<template>
  <div>
    <ol class="Contact-list">
      <li
        class="Contact-item"
        v-for="(item,i) in list"
        :key="i"
      >
        <div class="Contact-item-cnt">
          <img :src="item.imgType" class="Contact-item-portrait">
          <div>
            <p class="title">{{item.title}}</p>
            <p class="tel">{{item.tel}}</p>
          </div>
        </div>
        <a :href="'tel:'+item.tel">
          <i class="iconfont icon-dianhua"></i>
        </a>
      </li>
    </ol>
  </div>
</template>
<script>
import type1Img from '@/assets/img/Bitmap@2x(4).png';
import type2Img from '@/assets/img/Bitmap@2x(3).png';
import type3Img from '@/assets/img/Bitmap@2x(2).png';
export default {
  data () {
    return {
      list: [
        {
          imgType: type1Img,
          title: '物业管理办公室',
          tel: '0317-98594856'
        },
        {
          imgType: type1Img,
          title: '物业服务中心',
          tel: '0317-98594856'
        },
        {
          imgType: type2Img,
          title: '维修中心',
          tel: '0317-98594856'
        },
        {
          imgType: type3Img,
          title: '清洁中心',
          tel: '0317-98594856'
        }
      ]
    };
  }
};
</script>
<style>

</style>
