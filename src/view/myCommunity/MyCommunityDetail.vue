<template>
  <div>
    <div class="MyCommunityDetail-head">
      <p class="MyCommunityDetail-head-cnt">
        <i class="iconfont icon-htmal5icon14"></i>
        <span>{{address}}</span>
      </p>
      <span
        class="MyCommunityDetail-head-opt"
        @click="chooseCommunity"
      >
        <i class="iconfont icon-Group-"></i>
        <span>切换小区</span>
      </span>
    </div>
    <div class="MyCommunityDetail-cnt" v-html="cnt">
    </div>
  </div>
</template>
<script>
export default {
  props: ['communityCode'],
  data () {
    return {
      address: '',
      cnt: ''
    };
  },
  activated () {
    this.queryDetail();
  },
  methods: {
    queryDetail () {
      /* 查询小区详情 */
      // const simpleCode = (!this.communityCode || this.communityCode === 'all') ? sessionStorage.getItem('simpleCode') : this.communityCode;
      /* if (!this.communityCode || this.communityCode === 'all') {
        this.address = sessionStorage.getItem('address');
      } else { */
      // 重新查询默认的详情
      this.axGet(
        'communityInfo/wxGetAllInfoByWx',
        {
          wxUid: localStorage.getItem('uid')
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this.address = data.communityName + data.buildingName + data.unitName + data.roomName;
          if (data.content) {
            if (data.content.indexOf('<img') !== -1) {
              this.cnt = data.content.replace(/<img\s/g, '<img style="max-width:100%;height:auto;"');
            } else {
              this.cnt = data.content;
            }
          } else {
            this.cnt = '';
          }
        }
      });
      /* } */
    },
    chooseCommunity () {
      /* 切换小区 */
      this.$router.push({
        name: 'MyCommunityList'
      });
    }
  }
};
</script>
<style>

</style>
