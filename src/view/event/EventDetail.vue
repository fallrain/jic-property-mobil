<template>
  <div>
    <ol class="EventDetail-form">
      <li class="EventDetail-form-item">
        <label class="name">事件编号</label><span class="val code">{{eventCode}}</span>
      </li>
      <li class="EventDetail-form-item">
        <label class="name">上报人</label>
        <span class="val">{{question.reporter}}</span>
      </li>
      <li class="EventDetail-form-item">
        <label class="name">上报时间</label><span class="val">{{reportTime}}</span>
      </li>
      <li class="EventDetail-form-item">
        <label class="name">事件分类</label><span class="val">{{eventTypeName}}</span>
      </li>
      <li class="EventDetail-form-item">
        <span>{{description}}</span>
      </li>
      <li
        class="EventDetail-form-item EventDetail-answer-item-flexwrap"
        v-if="imgUrl.length"
      >
        <img
          v-for="(img,index) in imgUrl"
          :key="index"
          :src="img.url">
      </li>
    </ol>
    <ol class="EventDetail-answer" v-if="state">
      <li class="EventDetail-answer-item">
        <label class="name">处理人：</label><span class="val">{{handlerInfo.handler}}</span>
      </li>
      <li class="EventDetail-answer-item">
        <label class="name">处理时间：</label><span class="val">{{handlerInfo.handlerTime}}</span>
      </li>
      <li class="EventDetail-answer-item">
        <label class="name">{{handlerInfo.replay}}</label>
      </li>
      <li
        class="EventDetail-answer-item EventDetail-answer-item-flexwrap"
        v-if="answerImgUrl.length">
        <img
          v-for="(img,index) in answerImgUrl"
          :key="index"
          :src="img.url"
        >
      </li>
    </ol>
    <div
      v-if="state"
      class="EventDetail-evaluate"
    >
      <div class="EventDetail-evaluate-btn-par">
        <h-score
          :no-click="true"
          v-model="evaluateInfo.level"
        ></h-score>
        <button
          type="button"
          class="EventDetail-evaluate-btn"
          @click="toScore"
        >重新评价</button>
      </div>
      <p
        class="EventDetail-evaluate-inf"
        v-show="evaluateInfo.evaluateContent"
      >{{evaluateInfo.evaluateContent}}</p>
    </div>
    <div
      v-else
      class="SuggestionForm-btm EventDetail-btm"
    >
      <h-button
        class="SuggestionForm-btn"
        :width="264"
        :height="39"
        cnt="删除"
        @click.native="delEvent"
      ></h-button>
    </div>
  </div>
</template>

<script>
import HScore from '../../components/common/HScore';
import HButton from '../../components/common/HButton';
import {mapState} from 'vuex';
export default {
  name: 'EventDetail',
  components: {HButton, HScore},
  created () {
    this.init();
  },
  activated () {
    this.init();
  },
  data () {
    return {
      imgUrl: [],
      answerImgUrl: [],
      eventCode: '',
      reportTime: '',
      eventTypeName: '',
      description: '',
      handlerInfo: {
      },
      evaluateInfo: {},
      state: false
    };
  },
  computed: {
    ...mapState([
      'curEventDetail'
    ])
  },
  methods: {
    init () {
      let detail = this.curEventDetail;
      this.eventCode = detail.eventCode;
      this.question = detail.question;
      this.reportTime = detail.question.reportTime;
      this.eventTypeName = detail.question.eventTypeName;
      this.description = detail.question.description;
      this.handlerInfo = detail.handlerInfo;
      this.evaluateInfo = detail.evaluateInfo;
      this.state = detail.state;
      this.imgUrl = detail.images || [];
      this.answerImgUrl = (detail.handlerInfo && detail.handlerInfo.images) || [];
    },
    delEvent () {
      /* 删除事件 */
      this.$vux.confirm.show({
        title: '系统通知',
        hideOnBlur: false,
        content: '确定要删除吗？',
        onConfirm: () => {
          this.axGet(
            'event/delete',
            {
              eventCode: this.eventCode
            }
          ).then(({code}) => {
            if (code === '200') {
              sessionStorage.setItem('MyEventList.deletedEventCode', this.eventCode);
              this.$router.push({
                name: 'MyEventList'
              });
            }
          });
        }
      });
    },
    toScore () {
      /* 评分 */
      sessionStorage.setItem('Score.detail', JSON.stringify({
        eventCode: this.eventCode,
        level: this.evaluateInfo.level,
        evaluateContent: this.evaluateInfo.evaluateContent
      }));
      this.$router.push({
        name: 'Score',
        params: {
          type: 'EventDetail'
        }
      });
    }
  }
};
</script>

<style scoped>

</style>
