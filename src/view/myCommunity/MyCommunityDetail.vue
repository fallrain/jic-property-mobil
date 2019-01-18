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
      cnt: '      福临万家位于李沧区 政府东侧 青山路267、269号(一期),经济适用房部分已售完,现住宅楼下单层网点在售,14800元/平起,户型面积:60-300,可自由分割、组合使用。 福临万家物业公司为青岛惠邦物业发展有限公司,物业费为洋房物业费0.67/平米.月,容积率为1.6,绿化率为35%.\n'
    };
  },
  activated () {
    this.queryDetail();
  },
  methods: {
    queryDetail () {
      /* 查询小区详情 */
      const simpleCode = (!this.communityCode || this.communityCode === 'all') ? sessionStorage.getItem('simpleCode') : this.communityCode;
      this.axGet(
        'communityInfo/wxGetInfo',
        {
          j_sub_system: simpleCode
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this.cnt = data.content;
        }
      });
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
