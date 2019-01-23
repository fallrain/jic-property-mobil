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
  props: ['communityCode', 'unitCode'],
  data () {
    return {
      name: '',
      list: [
      ]
    };
  },
  activated () {
    this.queryRooms();
    this.setName();
  },
  methods: {
    setName () {
      const communityName = sessionStorage.getItem('CommunityList.communityName');
      const buildingName = sessionStorage.getItem('BuildingList.buildingName');
      const unitName = sessionStorage.getItem('UnitList.unitName');
      if (communityName) {
        this.name = communityName;
      }
      if (buildingName) {
        this.name += '-' + buildingName;
      }
      if (unitName) {
        this.name += '-' + unitName;
      }
    },
    queryRooms () {
      this.axGet(
        'unitRoom/wxGetRooms',
        {
          j_sub_system: this.communityCode,
          unitCode: this.unitCode
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this.list = data.list.map(function (v) {
            return {
              id: v.roomCode,
              name: v.roomName
            };
          });
        }
      });
    },
    toNext (item) {
      // 保存房间名字
      sessionStorage.setItem('RoomList.roomName', item.name);
      this.$router.push({
        name: 'BindUserChoose',
        params: {
          roomCode: item.id
        }
      });
    }
  }
};
</script>
<style>

</style>
