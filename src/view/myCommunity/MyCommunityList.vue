<template>
  <div>
    <ol>
      <li
        :class="['MyCommunityList-item',i===1 && 'active']"
        v-for="(item,i) in communityList"
        :key="i"
      >
        <p class="MyCommunityList-item-cnt">{{item.address}}</p>
        <i class="MyCommunityList-item-icon iconfont icon-htmal5icon14"></i>
      </li>
    </ol>
    <div class="MyCommunityList-add">
      <i class="iconfont icon-jia"></i><span>添加小区</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      communityList: [
        {
          address: '天成园2号数2902室'
        },
        {
          address: '天成园2号数1802室'
        },
        {
          address: '天成园1号数0403室'
        }
      ]
    };
  }
};
</script>
<style>

</style>
