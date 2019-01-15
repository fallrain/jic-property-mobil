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
      name: '2单元',
      list: [
        {
          name: '1001'
        },
        {
          name: '1002'
        },
        {
          name: '1003'
        },
        {
          name: '1004'
        },
        {
          name: '2001'
        },
        {
          name: '2002'
        }
      ]
    };
  },
  methods: {
    toNext (item) {
      this.$router.push({
        name: 'BindUserChoose'
      });
    }
  }
};
</script>
<style>

</style>
