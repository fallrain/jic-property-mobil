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
      name: '碧海海天小区',
      list: [
        {
          name: '1号楼'
        },
        {
          name: '2号楼'
        },
        {
          name: '3号楼'
        },
        {
          name: '4号楼'
        },
        {
          name: '5号楼'
        },
        {
          name: '6号楼'
        },
        {
          name: '7号楼'
        },
        {
          name: '8号楼'
        },
        {
          name: '9号楼'
        },
        {
          name: '10号楼'
        },
        {
          name: '11号楼'
        }
      ]
    };
  },
  methods: {
    toNext (item) {
      this.$router.push({
        name: 'UnitList'
      });
    }
  }
};
</script>
<style>

</style>
