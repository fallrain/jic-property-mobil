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
      <!--<h-loadmore
        ref="hloadmore"
        :show="pageCfg.loadingShow"
        :loadingType="pageCfg.loadingType"
        :data="pageCfg.page"
        :query="query"
      ></h-loadmore>-->
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
          articleType: 'notice',
          ...this.pageCfg.page
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this.noticeList = this.noticeList.concat(data.list.map(function (v) {
            return {
              contentHtml: true,
              type: {
                'sysnotice': 'sys',
                'wydt': 'news'
              }[v.subType],
              isRead: true,
              time: v.createdTime,
              title: v.content,
              articleCode: v.articleCode
            };
          }));
          this.$refs.hloadmore.queryBack(r, this);
        }
      });
    },
    toDetail (item) {
      this.$router.push({
        name: 'NoticePar',
        params: {
          cpntName: 'NoticeDetail-' + item.articleCode
        }
      });
    }
  }
};
</script>
<style>

</style>
