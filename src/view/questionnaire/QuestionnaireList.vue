<template>
  <div>
    <ol class="QuestionnaireList">
      <li
        class="QuestionnaireList-item"
        v-for="(item,i) in questionnaireList"
        :key="i"
      >
        <img
          class="QuestionnaireList-item-portrait"
          src="@/assets/img/Shape Copy 2@2x.png"
        >
        <p class="QuestionnaireList-item-cnt">{{item.cnt}}</p>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  data () {
    return {
      questionnaireList: [
        {
          cnt: '关于是否允许小区养狗的调查问卷'
        },
        {
          cnt: '关于增加物业服务项目及收费的调查问卷'
        },
        {
          cnt: '关于小区增加无人货柜的调查问卷关于小区增加无人货柜的调查问卷关于小区增加无人货柜的调查问卷关于小区增加无人货柜的调查问卷关于小区增加无人货柜的调查问卷'
        }
      ]
    };
  }
};
</script>
<style>

</style>
