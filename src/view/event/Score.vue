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

import {mapState, mapMutations} from 'vuex';
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
  computed: {
    ...mapState([
      'curEventDetail'
    ])
  },
  methods: {
    ...mapMutations([
      'updateCurEventDetail'
    ]),
    init () {
      this.form.eventCode = this.curEventDetail.eventCode;
      this.form.content = this.curEventDetail.evaluateInfo.evaluateContent;
      this.form.starsNum = this.curEventDetail.evaluateInfo.level;
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
            sessionStorage.setItem(this.type + '.level', 'true');
            const curEventDetailTemp = JSON.parse(JSON.stringify(this.curEventDetail));
            curEventDetailTemp.evaluateInfo.level = this.form.starsNum;
            curEventDetailTemp.evaluateInfo.evaluateContent = this.form.content;
            this.updateCurEventDetail(curEventDetailTemp);
            /* this.$router.replace({
              name: this.type
            }); */
            this.$router.back();
          }
        });
      }
    }
  }
};
</script>

<style lang='scss'>
</style>
