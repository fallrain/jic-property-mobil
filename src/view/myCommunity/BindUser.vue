<template>
  <div class="BindUser">
    <div class="BuildingList-head">
      <i class="iconfont icon-loufang"></i>
      <span>{{name}}</span>
    </div>
    <div class="BuildingList-cnt BindUser-cnt">
      <div class="BindUser-valid" v-if="isMaster">
        <p class="BindUser-valid-head">
          <i class="iconfont icon-credentials_icon"></i>
          <span>身份验证</span>
        </p>
        <ol>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">真实姓名</p>
            <p class="val">
              <input type="text" class="BindUser-valid-item-ipt" placeholder="请输入真实姓名">
            </p>
          </li>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">身份证号码</p>
            <p class="val">
              <input type="text" class="BindUser-valid-item-ipt" placeholder="请输入身份证号码">
            </p>
          </li>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">预留手机号码</p>
            <p class="val">
              <input type="text" class="BindUser-valid-item-ipt" placeholder="请输入预留手机号">
              <i class="iconfont icon-wenhao" @click="showPhoneNotice"></i>
            </p>
          </li>
        </ol>
      </div>
      <div class="BindUser-valid" v-if="!isMaster">
        <p class="BindUser-valid-head">
          <i class="iconfont icon-credentials_icon"></i>
          <span>房主身份验证</span>
        </p>
        <ol>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">房主真实姓名</p>
            <p class="val">
              <input type="text" class="BindUser-valid-item-ipt" placeholder="请输入房主真实姓名">
            </p>
          </li>
        </ol>
        <p class="BindUser-valid-head mt23">
          <i class="iconfont icon-credentials_icon"></i>
          <span>我的身份验证</span>
        </p>
        <ol>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">真实姓名</p>
            <p class="val">
              <input type="text" class="BindUser-valid-item-ipt" placeholder="请输入真实姓名">
            </p>
          </li>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">身份证号码</p>
            <p class="val">
              <input type="text" class="BindUser-valid-item-ipt" placeholder="请输入身份证号码">
            </p>
          </li>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">预留手机号码</p>
            <p class="val">
              <input type="text" class="BindUser-valid-item-ipt" placeholder="请输入预留手机号">
            </p>
          </li>
        </ol>
      </div>
      <div class="BindUser-btm">
        <h-button
          :width="264"
          :height="39"
          cnt="验证"
          @click.native="valid"
        ></h-button>
      </div>
    </div>
  </div>
</template>
<script>
import Group from 'vux/src/components/Group';
import XSwitch from 'vux/src/components/x-switch';
import {
  HButton
} from '@/components/common';

export default {
  components: {
    HButton,
    Group,
    XSwitch
  },
  data () {
    return {
      name: '2单元',
      isMaster: !true
    };
  },
  methods: {
    toNext (item) {
      this.$router.push({
        name: 'BindUser'
      });
    },
    showPhoneNotice () {
      this.$vux.alert.show({
        title: '系统通知',
        content: '手机号码为您交房时提供给物业的手机号。'
      });
    },
    valid () {
      this.$vux.confirm.show({
        title: '系统通知',
        content: `
           您绑定的房子为：<span class="jic-weui-dialog-val">各种小区</span><br>
           房子房主为：<span class="jic-weui-dialog-val">川岛芳子1</span>
        `,
        onCancel () {
          console.log('plugin cancel');
        },
        onConfirm () {
          console.log('plugin confirm');
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>
