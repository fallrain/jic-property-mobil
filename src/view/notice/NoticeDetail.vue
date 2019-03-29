<template>
  <div class="jpm-main">
    <h-article-title :value="title"></h-article-title>
    <h-article-author
      :data="articleAuthor"
      class="mt9"
    ></h-article-author>
    <!--<img src="@/assets/img/bg.png" class="mt12 mb22">-->
    <p class="jhm-article-cnt" v-html="cnt"></p>
  </div>
</template>

<script>
import {
  HArticleAuthor,
  HArticleTitle
} from '@/components/common';
export default {
  name: 'NoticeDetail',
  components: {
    HArticleAuthor,
    HArticleTitle
  },
  props: ['articleCode'],
  data () {
    return {
      title: '',
      articleAuthor: {
        authorName: '物业办公室',
        accountName: '',
        date: ''
      },
      cnt: ''
    };
  },
  created () {

  },
  activated () {
    this.query();
  },
  methods: {
    query () {
      this.axGet(
        '/article/info',
        {
          j_sub_system: sessionStorage.getItem('ownerSimpleCode'),
          articleCode: this.articleCode
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this.title = data.title;
          this.articleAuthor.accountName = data.author;
          const curDate = this.hUtil.formatNoSplitTime(data.pushTime, true);
          this.articleAuthor.date = this.hUtil.getCurDate() === curDate.replace(/-/g, '') ? '今天' : curDate;
          this.cnt = data.content;
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
