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
      communityList: {}
    };
  },
  created () {
    this.queryCommunity();
  },
  methods: {
    toBuilding (item) {
      /* 去楼栋选择 */
      sessionStorage.setItem('CommunityList.communityName', item.name);
      this.$router.push({
        name: 'BuildingList',
        params: {
          communityCode: item.id
        }
      });
    },
    queryCommunity () {
      /* 查询小区列表 */
      this.axGet(
        'baseCommunity/wxList',
        {
          pageNum: 1,
          pageSize: 999999
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          const communityListTemp = {};
          Object.entries(data).forEach(function (v) {
            communityListTemp[v[0]] = v[1].map(function (community) {
              return {
                id: community.simpleCode,
                name: community.communityName
              };
            });
          });
          this.communityList = communityListTemp;
        }
      });
    }
  }
};
</script>
<style>

</style>
