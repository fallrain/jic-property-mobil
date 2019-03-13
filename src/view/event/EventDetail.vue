<template>
  <div>
    <ol class="EventDetail-form">
      <li class="EventDetail-form-item">
        <label class="name">事件编号</label><span>201910230392</span>
      </li>
      <li class="EventDetail-form-item">
        <label class="name">上报人</label><span>29号楼1单元2901室-李彬</span>
      </li>
      <li class="EventDetail-form-item">
        <label class="name">上报时间</label><span>2019-01-13 12:20</span>
      </li>
      <li class="EventDetail-form-item">
        <label class="name">事件分类</label><span>卫生环境</span>
      </li>
      <li class="EventDetail-form-item">
        <span>门口有垃圾，很影响我们小区的生活，麻烦请尽快处理。 </span>
      </li>
      <li class="EventDetail-form-item" v-if="imgUrl">
        <img :src="imgUrl">
      </li>
    </ol>
    <ol class="EventDetail-answer">
      <li class="EventDetail-answer-item">
        <label class="name">处理人：</label><span class="val">李伟</span>
      </li>
      <li class="EventDetail-answer-item">
        <label class="name">处理时间：</label><span class="val">李伟</span>
      </li>
      <li class="EventDetail-answer-item">
        <label class="name">已处理，但是大叔大婶大所多所多所多所但是大叔大婶大所多所多所多所但是大叔大婶大所多所多所多所但是大叔大婶大所多所多所多所但是大叔大婶大所多所多所多所</label>
      </li>
      <li class="EventDetail-answer-item" v-if="answerImgUrl">
        <img :src="answerImgUrl">w
      </li>
    </ol>
    <div class="EventDetail-evaluate">
      <div class="EventDetail-evaluate-btn-par">
        <h-score
          :no-click="true"
        ></h-score>
        <button
          type="button"
          class="EventDetail-evaluate-btn"
        >重新评价</button>
      </div>
      <p class="EventDetail-evaluate-inf">响应及时，处理速度快，服务很好。</p>
    </div>
    <div class="SuggestionForm-btm EventDetail-btm">
      <h-button
        class="SuggestionForm-btn"
        :width="264"
        :height="39"
        cnt="我要评价"
        @click.native="sbumit"
      ></h-button>
    </div>
  </div>
</template>

<script>
import HScore from '../../components/common/HScore';
import HButton from '../../components/common/HButton';
export default {
  name: 'EventDetail',
  components: {HButton, HScore},
  data () {
    return {
      imgUrl: 'fdf',
      answerImgUrl: 'sas'
    };
  }
};
</script>

<style scoped>

</style>
