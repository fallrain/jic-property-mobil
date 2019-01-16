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

export default {
  props: ['communityCode'],
  data () {
    return {
      name: '',
      list: [
      ]
    };
  },
  activated () {
    this.query();
    this.setName();
  },
  methods: {
    setName () {
      const communityName = sessionStorage.getItem('CommunityList.communityName');
      if (communityName) {
        this.name = communityName;
      }
    },
    query () {
      /* 查询单元 */
      this.axGet(
        'buildingInfo/wxFindAll',
        {
          j_sub_system: this.communityCode
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this.list = data.list.map(function (v) {
            return {
              id: v.buildingCode,
              name: v.buildingName + '号楼'
            };
          });
        }
      });
    },
    toNext (item) {
      // 保存楼栋名字
      sessionStorage.setItem('BuildingList.buildingName', item.name);
      this.$router.push({
        name: 'UnitList',
        params: {
          buildingCode: item.id
        }
      });
    }
  }
};
</script>
<style>

</style>
