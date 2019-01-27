<template>
  <div>
    <div class="jhm-spacer"></div>
    <div class="Notice-list">
      <h-notice
        v-for="(item , i) in noticeList"
        :key="i"
        :iconType="item.type"
        :contentHtml="item.contentHtml"
        :content="item.title"
        :isRead="item.isRead"
        :time="item.time"
        @click.native="toDetail(item)"
      ></h-notice>
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
  HLoadmore,
  HNotice
} from '@/components/common';
export default {
  components: {
    HLoadmore,
    HNotice
  },
  data () {
    return {
      noticeList: []
    };
  },
  created () {
    this.query();
  },
  methods: {
    query () {
      this.axGet(
        'article/list',
        {
          j_sub_system: sessionStorage.getItem('simpleCode'),
          isPush: 2,
          articleType: 'notice',
          ...this.pageCfg.page
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this.noticeList = this.noticeList.concat(data.list.map(v => {
            let outerChain = false;
            if (v.outerChain === 1) {
              outerChain = true;
            }
            return {
              contentHtml: !outerChain,
              type: {
                'sys': 'sys',
                'urgent': 'urgent'
              }[v.subType],
              isRead: true,
              time: this.hUtil.formatNoSplitTime(v.pushTime),
              title: v.title,
              articleCode: v.articleCode,
              url: v.url
            };
          }));
          this.$refs.hloadmore.queryBack(r, this);
        }
      });
    },
    toDetail (item) {
      if (item.contentHtml === false) {
        window.location.href = item.url;
      } else {
        this.$router.push({
          name: 'NoticeDetail',
          params: {
            articleCode: item.articleCode
          }
        });
      }
    }
  }
};
</script>
<style>

</style>
