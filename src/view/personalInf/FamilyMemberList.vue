<template>
  <div class="FamilyMemberList">
    <h-left-slide
      v-for="(item,i) in list"
      :key="i"
      @remove-item="remove(item,i)"
    >
      <div class="FamilyMemberList-cnt">
        <p class="FamilyMemberList-cnt-inf">
          <img src="@/assets/img/Mask Copy 2@2x.png">
          <span class="name">{{item.name}}</span>
          <span class="tel">{{item.tel}}</span>
        </p>
        <p class="FamilyMemberList-cnt-type">{{item.type===1?'房东':'租客'}}</p>
      </div>
    </h-left-slide>
  </div>
</template>
<script>
import {
  HLeftSlide
} from '@/components/common';

export default {
  components: {
    HLeftSlide
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
          j_sub_system: 'a00003', // todo 默认小区需要先获取
          roomCode: '59513c8c33cc4085a99cbef192698bbe'// todo 默认房子需要先获取
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
        }
      });
    },
    remove (item, index) {
      /* 删除房间下的成员 */
      this.axPost(
        'roomOwner/wxUpdateOwner',
        {
          roomCode: '59513c8c33cc4085a99cbef192698bbe', // todo
          ownerCode: item.ownerCode
        },
        {
          j_sub_system: 'a00003' // todo 默认小区需要先获取
        }
      ).then(r => {
        if (r.code === '200') {
          this.list.splice(index, 1);
        }
      });
    }
  }
};
</script>
<style>

</style>
