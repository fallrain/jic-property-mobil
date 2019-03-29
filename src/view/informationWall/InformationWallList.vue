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
         <!-- <div class="InformationWallList-item-portrait">
            <img src="@/assets/img/Bitmap@2x(4).png">
          </div>-->
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
      <h-loadmore
        ref="hloadmore"
        :show="pageCfg.loadingShow"
        :loadingType="pageCfg.loadingType"
        :data="pageCfg.page"
        :query="query"
      ></h-loadmore>
    </div>
  </div>
</template>
<script>
import {
  HLoadmore
} from '@/components/common';

export default {
  name: 'InformationWallList',
  props: ['all'],
  components: {
    HLoadmore
  },
  activated () {
    this.pageCfg.page.pageNum = 1;
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
        j_sub_system: sessionStorage.getItem('ownerSimpleCode'),
        ownerCode: sessionStorage.getItem('ownerCode'),
        ...this.pageCfg.page
      };
      let url = 'infoWall/wxList';
      if (this.all === 'self') {
        url = 'infoWall/wxOwnerList';
      }
      this.axGet(
        url,
        data
      ).then(r => {
        if (r.code === '200') {
          if (r.value.list) {
            let rows = r.value.list.map(function (v) {
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
            if (data.pageNum === 1) {
              this.list = rows;
            } else {
              this.list = this.list.concat(rows);
            }
          } else {
            this.list = [];
          }
          this.$refs.hloadmore.queryBack(r, this);
        }
      });
    },
    follow (item) {
      /* 关注/取消关注 */
      this.axPost(
        'infoWall/wxFollow',
        {},
        {
          ownerCode: sessionStorage.getItem('ownerCode'),
          infoCode: item.infoCode,
          j_sub_system: sessionStorage.getItem('ownerSimpleCode')
        }
      ).then(r => {
        if (r.code === '200') {
          item.isFollow = r.value.follow === true ? 1 : 0;
          if (r.value.follow === true) {
            item.follows++;
          } else {
            item.follows = item.follows - 1 < 0 ? 0 : item.follows - 1;
          }
        }
      });
    }
  }
};
</script>
<style>

</style>
