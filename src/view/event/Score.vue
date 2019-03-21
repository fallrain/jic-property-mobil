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
  props: ['eventCode', 'level'],
  created () {
    this.genVdt();
  },
  data () {
    return {
      form: {
        content: '',
        starsNum: this.level * 1
      }
    };
  },
  methods: {
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
          'eventCode': this.eventCode,
          'level': this.form.starsNum,
          'content': this.form.content
        }
      );
      if (code === '200') {
        this.$vux.toast.show({
          text: '评价成功',
          onHide: () => {
            this.$router.push({
              name: 'MyEventList'
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
