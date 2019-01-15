<template>
  <div>
    <div class="BuildingList-head">
      <i class="iconfont icon-loufang"></i>
      <span>{{name}}</span>
    </div>
    <div class="BuildingList-cnt">
      <ul class="BuildingList">
        <li
          v-for="(item,i) in list"
          :key="i"
          class="BuildingList-item"
          @click="toNext(item)"
        >{{item.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {} from '@/components/common';

export default {
  components: {},
  data () {
    return {
      name: '4号楼',
      list: [
        {
          name: '1单元'
        },
        {
          name: '2单元'
        },
        {
          name: '3单元'
        },
        {
          name: '4单元'
        },
        {
          name: '5单元'
        },
        {
          name: '6单元'
        }
      ]
    };
  },
  methods: {
    toNext (item) {
      this.$router.push({
        name: 'RoomList'
      });
    }
  }
};
</script>
<style>

</style>
