<template>
  <div>
    <div></div>
    <ol>
      <li
        :class="['MyCommunityList-item',item.isDefault && 'active']"
        v-for="(item,i) in communityList"
        :key="i"
        @click="setDefault(item)"
      >
        <p class="MyCommunityList-item-cnt">{{item.address}}</p>
        <i v-if="item.isDefault === true" class="MyCommunityList-item-icon iconfont icon-htmal5icon14" style="color: #537cdb;" ></i>
        <i v-else class="MyCommunityList-item-icon iconfont icon-htmal5icon14"></i>
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
import store from '@/store';
export default {
  name: 'MyCommunityList',
  data () {
    return {
      communityList: []
    };
  },
  created () {
    // this.queryMyRooms();
  },
  activated () {
    // 重置请求
    // if (sessionStorage.getItem('BindUser.refreshMyCommunityList') === '1') {
    this.communityList = [];
    this.queryMyRooms();
    // sessionStorage.removeItem('BindUser.refreshMyCommunityList');
    // }
  },
  methods: {
    addCommunity () {
      /* 添加小区 */
      // 刷新小区列表
      // sessionStorage.setItem('MyCommunityList.toCommunityList', '1');
      this.$router.push({
        name: 'CommunityList'
      });
    },
    queryMyRooms () {
      /* 查询我的房产 */
      const ownerCode = sessionStorage.getItem('ownerCode');
      if (!ownerCode) {
        return;
      }
      this.axPost(
        'roomOwnerRel/wxGetAllList',
        {
          wxUid: localStorage.getItem('uid'),
          ownerCode: ownerCode
        }
      ).then(r => {
        if (r.code === '200') {
          this.communityList = r.value.map(function (v) {
            console.log('abbbb......', v);
            return {
              simpleCode: v.ownerSimpleCode,
              ownerCode: v.ownerCode,
              communityName: v.communityName,
              communityCode: v.communityCode,
              roomCode: v.roomCode,
              isDefault: v.isDefault === 1,
              address: v.communityName + v.buildingName + v.unitName + v.roomName
            };
          });
        }
      });
    },
    setDefault (item) {
      if (item.isDefault === 1) {
        this.$router.push({
          name: 'MyCommunityDetail',
          params: {
            communityCode: 'change'
          }
        });
      } else {
        /* 设置默认房产 */
        this.axPost(
          'roomOwnerRel/wxChangeCommunity',
          {
            'roomCode': item.roomCode,
            'wxUid': localStorage.getItem('uid')
          }
        ).then(r => {
          if (r.code === '200') {
            // 此处需要更新小区的配置
            let data = {
              ownerCode: item.ownerCode,
              roomCode: item.roomCode,
              simpleCode: item.ownerSimpleCode,
              communityName: item.communityName,
              address: item.address
            };
            // this.hUtil.updateUserCommunity(data);
            store.dispatch('updateUserCommunity', data);
            const redirect = this.hUtil.getUrlVal('redirect');
            const param = this.hUtil.getUrlVal('param');
            if (redirect) {
              const paramName = redirect === 'PaymentHistoryList' ? 'tabType' : 'type';
              this.$router.push({
                name: redirect,
                params: {
                  [paramName]: param
                }
              });
            } else {
              this.$router.push({
                name: 'MyCommunityDetail',
                params: {
                  communityCode: 'change'
                }
              });
            }
          }
        });
      }
    }
  }
};
</script>
<style>

</style>
