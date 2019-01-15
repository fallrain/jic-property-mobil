<template>
  <div class="BindUser">
    <div class="BuildingList-head">
      <i class="iconfont icon-loufang"></i>
      <span>{{name}}</span>
    </div>
    <div class="BuildingList-cnt BindUserChoose-cnt">
      <group>
        <x-switch
          title="我是房主"
          v-model="isMaster"
        ></x-switch>
        <x-switch
          title="我是租客"
          v-model="isTenant"
        ></x-switch>
      </group>
      <div class="BindUser-btm">
        <h-button
          :width="264"
          :height="39"
          cnt="下一步"
          @click.native="toBind"
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
      isMaster: true,
      switchList: [
        {
          name: '我是房主'
        },
        {
          name: '我是租客'
        }
      ]
    };
  },
  computed: {
    isTenant: {
      get () {
        return !this.isMaster;
      },
      set (newVal) {
        this.isMaster = !newVal;
      }
    }
  },
  methods: {
    toBind (item) {
      this.$router.push({
        name: 'BindUser'
      });
    }
  }
};
</script>
<style lang="scss">
  .BindUser {
    .vux-no-group-title {
      margin-top: 0;
    }
    .weui-cells:after,
    .weui-cells:before {
      display: none;
    }
    .weui-cell:before{
      display: none;
    }
    .vux-x-switch{
      border-bottom: 1px solid #E4E3E6;
      &:last-child{
        border-bottom: 0;
      }
    }
  }
</style>
