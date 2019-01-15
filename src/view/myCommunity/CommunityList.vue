<template>
  <div>
    <div class="CommunityList-head">
      <i class="iconfont icon-htmal5icon14"></i>
      <span>{{propertyName}}</span>
    </div>
    <div class="CommunityList-cnt">
      <h-abc-list
        :list="communityList"
        @item-click="toBuilding"
      ></h-abc-list>
    </div>
  </div>
</template>
<script>
import {
  HAbcList
} from '@/components/common';

export default {
  components: {
    HAbcList
  },
  data () {
    return {
      propertyName: '鸿棕物业',
      communityList: {
        A: [
          {
            id: 1,
            name: '阿里巴巴公寓'
          },
          {
            id: 1,
            name: '阿拉斯加风情'
          },
          {
            id: 1,
            name: '爱琴海府邸'
          }
        ],
        B: [
          {
            id: 1,
            name: '巴别塔公寓'
          },
          {
            id: 1,
            name: '巴迪斯达花园'
          },
          {
            id: 1,
            name: '白宝丽公园'
          }
        ],
        D: [
          {
            id: 1,
            name: '断背山'
          },
          {
            id: 1,
            name: '赌博圣地'
          },
          {
            id: 1,
            name: '大大卷工厂'
          }
        ],
        h: [
          {
            id: 1,
            name: '花花世界'
          },
          {
            id: 1,
            name: '环大西洋'
          },
          {
            id: 1,
            name: '欢乐海洋'
          }
        ]
      }
    };
  },
  methods: {
    toBuilding (item) {
      /* 去楼栋选择 */
      this.$router.push({
        name: 'BuildingList'
      });
    }
  }
};
</script>
<style>

</style>
