<template>
  <div class="PersonalInformation">
    <img class="PersonalInformation-topbg" src="@/assets/img/detail-top-bg@2x.png">
    <div class="PersonalInformation-head">
      <img :src="portraitSrc" class="PersonalInformation-head-portrait">
      <div class="PersonalInformation-head-cnt">
        <p class="PersonalInformation-head-name">{{personName}}</p>
        <div class="PersonalInformation-head-cnt-opts">
          <div
            class="PersonalInformation-head-cnt-opts-notice"
            @click="jump('NoticeList')"
          >
            <i class="iconfont icon-youjian"></i>
            <span class="PersonalInformation-head-cnt-opts-cnt">物业通知</span>
          </div>
          <div class="PersonalInformation-head-cnt-opts-gap"></div>
          <div
            class="PersonalInformation-head-cnt-opts-payment"
            @click="jump('PaymentHistoryList')"
          >
            <i class="iconfont icon-weibiaoti--"></i>
            <span class="PersonalInformation-head-cnt-opts-cnt">我的缴费</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="jhm-spacer"></div>
    <div>
      <h-group class="pl19 pr19">
        <h-cell @click.native="jump('FamilyMemberList')">
          <div class="PersonalInformation-item">
            <div class="PersonalInformation-item-portrait">
              <img src="@/assets/img/family-member@2x.png">
            </div>
            <div class="PersonalInformation-item-cnt">
              <p class="title">我的家庭成员</p>
              <p class="introduction">点击添加家庭成员</p>
            </div>
          </div>
        </h-cell>
        <h-cell @click.native="jump('MyCommunityList')">
          <div class="PersonalInformation-item">
            <div class="PersonalInformation-item-portrait">
              <img src="@/assets/img/community@2x.png">
            </div>
            <div class="PersonalInformation-item-cnt">
              <p class="title">我的小区</p>
              <p class="introduction">点击添加地址</p>
            </div>
          </div>
        </h-cell>
        <h-cell @click.native="jump('InformationWallList')">
          <div class="PersonalInformation-item">
            <div class="PersonalInformation-item-portrait">
              <img src="@/assets/img/wall-inf@2x.png">
            </div>
            <div class="PersonalInformation-item-cnt">
              <p class="title">我的上墙信息</p>
              <p class="introduction">我发布过的上墙信息</p>
            </div>
          </div>
        </h-cell>
      </h-group>
    </div>
  </div>
</template>
<script>
import {
  HGroup,
  HCell
} from '@/components/common';
import Icon from 'vux/src/components/icon/index';

export default {
  name: 'PersonalInformation',
  components: {
    Icon,
    HGroup,
    HCell
  },
  data () {
    return {
      portraitSrc: decodeURIComponent(localStorage.getItem('headimg') || '') || require('@/assets/img/default-portrait.jpg'),
      personName: decodeURIComponent(localStorage.getItem('nickname') || '')
    };
  },
  methods: {
    jump (name) {
      const params = {};
      const query = {};
      switch (name) {
        case 'MyFollowExpert':
          break;
        case 'InformationWallList':
          params.all = 'self';
          break;
        case 'PaymentHistoryList':
          params.tabType = 'property';
          break;
      }
      this.$router.push({
        name: name,
        params: params,
        query: query
      });
    }
  }
};
</script>
<style>

</style>
