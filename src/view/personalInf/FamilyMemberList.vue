<template>
  <div>
    <div class="FamilyMemberList">
      <div v-for="(item,i) in list" :key="i">
      <h-left-slide
        v-if="item.ownerType !== 1"
        @remove-item="remove(item,i)"
      >
        <div class="FamilyMemberList-cnt">
          <p class="FamilyMemberList-cnt-inf">
            <img src="@/assets/img/Mask Copy 2@2x.png">
            <span class="name">{{item.name}}</span>
            <span class="tel">{{item.tel}}</span>
          </p>
          <p class="FamilyMemberList-cnt-type">租客</p>
        </div>
      </h-left-slide>
      <div v-else class="FamilyMemberList-cnt">
        <p class="FamilyMemberList-cnt-inf">
          <img src="@/assets/img/Mask Copy 2@2x.png">
          <span class="name">{{item.name}}</span>
          <span class="tel">{{item.tel}}</span>
        </p>
        <p class="FamilyMemberList-cnt-type">房东</p>
      </div>
      </div>
    </div>
    <h-loadmore
      ref="hloadmore"
      :show="pageCfg.loadingShow"
      :loadingType="pageCfg.loadingType"
      :data="pageCfg.page"
    ></h-loadmore>
  </div>
</template>
<script>
import {
  HLeftSlide,
  HLoadmore
} from '@/components/common';

export default {
  components: {
    HLeftSlide,
    HLoadmore
  },
  data () {
    return {
      list: []
    };
  },
  activated () {
    this.queryMembers();
  },
  methods: {
    queryMembers () {
      /* 查询默认房产下的成员 */
      this.axGet(
        'roomOwner/wxGetAllOwners',
        {
          j_sub_system: sessionStorage.getItem('ownerSimpleCode'),
          roomCode: sessionStorage.getItem('roomCode')
        }
      ).then(r => {
        if (r.code === '200') {
          this.list = r.value.map(function (v) {
            return {
              name: v.ownerName,
              tel: v.tel,
              ownerType: v.ownerType,
              ownerCode: v.ownerCode
            };
          });
          if (this.list && this.list.length) {
            this.pageCfg.loadingType = 2;
          } else {
            this.pageCfg.loadingType = 3;
          }
        }
      });
    },
    remove (item, index) {
      /* 删除房间下的成员 */
      this.axPost(
        'roomOwner/wxUpdateOwner',
        {
          roomCode: sessionStorage.getItem('roomCode'),
          ownerCode: item.ownerCode
        },
        {
          j_sub_system: sessionStorage.getItem('ownerSimpleCode')
        }
      ).then(r => {
        if (r.code === '200') {
          this.list.splice(index, 1);
          if (!this.list.length) {
            this.pageCfg.loadingType = 3;
          }
        }
      });
    }
  }
};
</script>
<style>

</style>
