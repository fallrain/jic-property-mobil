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
  props: ['communityCode', 'buildingCode'],
  data () {
    return {
      name: '4号楼',
      list: [
      ]
    };
  },
  activated () {
    this.queryUnit();
    this.setName();
  },
  methods: {
    setName () {
      const communityName = sessionStorage.getItem('CommunityList.communityName');
      const buildingName = sessionStorage.getItem('BuildingList.buildingName');
      if (communityName) {
        this.name = communityName;
      }
      if (buildingName) {
        this.name += '-' + buildingName;
      }
    },
    queryUnit () {
      this.axGet(
        'buildingUnit/wxGetUnits',
        {
          j_sub_system: this.communityCode, // 小区编码
          buildingCode: this.buildingCode// 楼栋编码
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this.list = data.list.map(function (v) {
            return {
              id: v.unitCode,
              name: v.unitName + '单元'
            };
          });
        }
      });
    },
    toNext (item) {
      // 保存楼栋名字
      sessionStorage.setItem('UnitList.unitName', item.name);
      this.$router.push({
        name: 'RoomList',
        params: {
          unitCode: item.id
        }
      });
    }
  }
};
</script>
<style>

</style>
