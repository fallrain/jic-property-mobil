<template>
  <div class="jhm-main">
    <article-title :value="title"></article-title>
    <article-author
      :data="articleAuthor"
      class="mt9"
    ></article-author>
    <!--<img src="@/assets/img/bg.png" class="mt12 mb22">-->
    <p class="jhm-article-cnt" v-html="cnt"></p>
  </div>
</template>

<script>
import {
  ArticleAuthor,
  ArticleTitle
} from '@/components/common';
export default {
  name: 'NoticeDetail',
  components: {
    ArticleAuthor,
    ArticleTitle
  },
  props: ['articleCode'],
  data () {
    return {
      title: '',
      articleAuthor: {
        authorName: '献县人民医院',
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
          articleCode: this.articleCode
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this.title = data.title;
          this.articleAuthor.accountName = data.author;
          this.articleAuthor.date = this.hUtil.getCurDate() === data.createdTime.split(' ')[0] ? '今天' : data.createdTime.split(' ')[0];
          this.cnt = data.content;
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
