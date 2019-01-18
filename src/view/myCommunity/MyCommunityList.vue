<template>
  <div>
    <ol>
      <li
        :class="['MyCommunityList-item',item.isDefault && 'active']"
        v-for="(item,i) in communityList"
        :key="i"
        @click="setDefault(item)"
      >
        <p class="MyCommunityList-item-cnt">{{item.address}}</p>
        <i class="MyCommunityList-item-icon iconfont icon-htmal5icon14"></i>
      </li>
    </ol>
    <div
      class="MyCommunityList-add"
      @click="addCommunity"
    >
      <i class="iconfont icon-jia"></i><span>添加小区</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      communityList: []
    };
  },
  created () {
    this.queryMyRooms();
  },
  methods: {
    addCommunity () {
      /* 添加小区 */
      this.$router.push({
        name: 'CommunityList'
      });
    },
    queryMyRooms () {
      /* 查询我的房产 */
      this.axPost(
        'roomOwnerRel/wxGetAllList',
        {
          wxUid: localStorage.getItem('uid'),
          ownerCode: sessionStorage.getItem('ownerCode')
        }
      ).then(r => {
        if (r.code === '200') {
          this.communityList = r.value.map(function (v) {
            return {
              communityCode: v.communityCode,
              roomCode: v.roomCode,
              isDefault: v.isDefault == '1',
              address: v.communityName + v.buildingName + v.unitName + v.roomName
            };
          });
        }
      });
    },
    setDefault (item) {
      /* 设置默认房产 */
      this.axPost(
        'roomOwnerRel/wxChangeCommunity',
        {
          'roomCode': item.roomCode || '59513c8c33cc4085a99cbef192698bbe',
          'wxUid': localStorage.getItem('uid')
        }
      ).then(r => {
        if (r.code === '200') {
          this.$router.push({
            name: 'MyCommunityDetail'
          });
        }
      });
    }
  }
};
</script>
<style>

</style>
