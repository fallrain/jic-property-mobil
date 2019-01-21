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
        <a :href="'tel:'+item.tel" v-if="item.tel">
          <i class="iconfont icon-dianhua"></i>
        </a>
      </li>
    </ol>
  </div>
</template>
<script>
import type1Img from '@/assets/img/Bitmap@2x(4).png';
// import type2Img from '@/assets/img/Bitmap@2x(3).png';
// import type3Img from '@/assets/img/Bitmap@2x(2).png';
export default {
  data () {
    return {
      list: []
    };
  },
  created () {
    this.query();
  },
  methods: {
    query () {
      /* 查询联系方式 */
      this.axGet(
        'communityContact/wxList',
        {
          j_sub_system: sessionStorage.getItem('simpleCode'),
          pageNum: 1,
          pageSize: 99999999
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this.list = data.list.map(function (v) {
            return {
              imgType: type1Img,
              title: v.contactName,
              tel: v.contactTel
            };
          });
        }
      });
    }
  }
};
</script>
<style>

</style>
