<template>
  <div class="HScore">
    <div
      class="HScore-title"
    >
      <label class="HScore-name">总体评价</label>
      <h-score
        v-model="form.starsNum"
      >
      </h-score>
    </div>
    <div class="HScore-ta-par">
      <h-textarea
        v-model="form.question"
        :conuntMaxNumber="false"
        placeHolder="我要吐槽"
      ></h-textarea>
    </div>
    <div class="SuggestionForm-btm">
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
import HTextarea from '../../components/common/HTextarea';
import HButton from '../../components/common/HButton';

export default {
  name: 'Score',
  components: {HButton, HTextarea, HScore},
  data () {
    return {
      form: {
        question: '',
        starsNum: 3
      }
    };
  },
  methods: {
    sbumit () {

    }
  }
};
</script>

<style lang="scss">
</style>
