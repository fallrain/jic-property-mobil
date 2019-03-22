<template>
  <div class='HScore'>
    <div
      class='HScore-title'
    >
      <label class='HScore-name'>总体评价</label>
      <h-score
        v-model='form.starsNum'
      >
      </h-score>
    </div>
    <div class='HScore-ta-par'>
      <h-textarea
        v-model='form.content'
        :conuntMaxNumber='false'
        placeHolder='我要吐槽'
      ></h-textarea>
    </div>
    <div class='SuggestionForm-btm'>
      <h-button
        class='SuggestionForm-btn'
        :width='264'
        :height='39'
        cnt='我要评价'
        @click.native='sbumit'
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
  props: ['type'],
  created () {
    this.init();
    this.genVdt();
  },
  data () {
    return {
      form: {
        eventCode: '',
        content: '',
        starsNum: 0
      }
    };
  },
  methods: {
    init () {
      let detail = sessionStorage.getItem('Score.detail');
      if (detail) {
        detail = JSON.parse(detail);
        this.form.eventCode = detail.eventCode;
        this.form.content = detail.evaluateContent;
        this.form.starsNum = detail.level;
      }
    },
    genVdt () {
      this.vdt = new this.HValidate({
        _this: this,
        formData: this.form,
        rules: {
          starsNum: {
            min: 1
          },
          content: {
            maxLength: 200
          }
        },
        messages: {
          starsNum: {
            min: '请打分'
          },
          content: {
            maxLength: '吐槽内容最多输入200字'
          }
        }
      });
    },
    async sbumit () {
      if (!this.vdt.valid()) {
        return;
      }
      const {code} = await this.axPost(
        'event/evaluate',
        {
          uid: localStorage.getItem('uid'),
          'eventCode': this.form.eventCode,
          'level': this.form.starsNum,
          'content': this.form.content
        }
      );
      if (code === '200') {
        this.$vux.toast.show({
          text: '评价成功',
          onHide: () => {
            sessionStorage.removeItem('Score.detail');
            sessionStorage.setItem(this.type + '.level', JSON.stringify({
              'eventCode': this.form.eventCode,
              'level': this.form.starsNum,
              'evaluateContent': this.form.content
            }));
            this.$router.replace({
              name: this.type
            });
          }
        });
      }
    }
  }
};
</script>

<style lang='scss'>
</style>
