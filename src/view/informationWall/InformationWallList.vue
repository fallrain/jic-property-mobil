<template>
  <div>
    <div class="InformationWallList-head">
      <span class="InformationWallList-head-title">信息上墙</span>
      <button
        class="InformationWallList-head-btn"
        type="button"
        @click="toAdd"
      >+ 发布
      </button>
    </div>
    <div class="InformationWallList-cnt">
      <ol>
        <li
          class="InformationWallList-item"
          v-for="(item,i) in list"
          :key="i"
        >
          <div class="InformationWallList-item-portrait">
            <img src="@/assets/img/Bitmap@2x(4).png">
          </div>
          <div class="InformationWallList-item-cnt">
            <p class="InformationWallList-item-head">
              <span class="name">{{item.name}}</span>
              <span class="time">{{item.time}}</span>
            </p>
            <p class="InformationWallList-item-inf">{{item.content}}</p>
            <img
              v-if="item.img"
              class="InformationWallList-item-img"
              :src="item.img"
            >
            <div class="InformationWallList-item-btm">
              <i
                :class="['iconfont',item.isFollow?'icon-iconfontxingxing':'icon-xing']"
                @click="follow(item)"
              ></i>
              <span class="count">{{item.follows}}个关注</span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  props: ['all'],
  activated () {
    this.query();
  },
  data () {
    return {
      list: [
      ]
    };
  },
  methods: {
    toAdd () {
      /* 发布信息 */
      this.$router.push({
        name: 'InformationWallForm'
      });
    },
    query () {
      /* 查询上墙信息 */
      const data = {
        j_sub_system: sessionStorage.getItem('simpleCode'),
        ...this.pageCfg.page
      };
      if (this.all === 'self') {
        data.ownerCode = '1'; // todo 本住户的code 需获取
      }
      this.axGet(
        'infoWall/wxList',
        data
      ).then(r => {
        if (r.code === '200') {
          this.list = r.value.list.map(function (v) {
            return {
              name: v.manName,
              time: v.createdTime,
              content: v.content,
              img: v.img,
              follows: v.follow,
              isFollow: v.isFollow,
              infoCode: v.infoCode
            };
          });
        }
      });
    },
    follow (item) {
      /* 关注/取消关注 */
      this.axPost(
        'infoWall/wxFollow',
        {
          ownerCode: '1', // todo 住户id
          infoCode: item.infoCode
        },
        {
          j_sub_system: sessionStorage.getItem('simpleCode')
        }
      ).then(r => {
        if (r.code === '200') {
        }
      });
    }
  }
};
</script>
<style>

</style>
