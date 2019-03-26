<template>
  <div>
    <ol class="EventDetail-form">
      <li class="EventDetail-form-item">
        <label class="name">事件编号</label><span>{{eventCode}}</span>
      </li>
      <li class="EventDetail-form-item">
        <label class="name">上报人</label>
        <span>{{addresses.buildingName+addresses.unitName+addresses.roomName+'-'+addresses.ownerName}}</span>
      </li>
      <li class="EventDetail-form-item">
        <label class="name">上报时间</label><span>{{reportTime}}</span>
      </li>
      <li class="EventDetail-form-item">
        <label class="name">事件分类</label><span>{{eventTypeName}}</span>
      </li>
      <li class="EventDetail-form-item">
        <span>{{description}}</span>
      </li>
      <li class="EventDetail-form-item" v-if="imgUrl">
        <img :src="imgUrl">
      </li>
    </ol>
    <div v-if="state">
      <ol class="EventDetail-answer">
        <li class="EventDetail-answer-item">
          <label class="name">处理人：</label><span class="val">{{handlerInfo.handler}}</span>
        </li>
        <li class="EventDetail-answer-item">
          <label class="name">处理时间：</label><span class="val">{{handlerInfo.handlerTime}}</span>
        </li>
        <li class="EventDetail-answer-item">
          <label class="name">{{handlerInfo.replay}}</label>
        </li>
        <li class="EventDetail-answer-item" v-if="answerImgUrl">
          <img :src="answerImgUrl">
        </li>
      </ol>
      <div
        class="EventDetail-evaluate"
      >
        <div class="EventDetail-evaluate-btn-par">
          <h-score
            :no-click="true"
            v-model="evaluateInfo.level"
          ></h-score>
        </div>
        <p
          class="EventDetail-evaluate-inf"
          v-show="evaluateInfo.evaluateContent"
        >{{evaluateInfo.evaluateContent}}</p>
      </div>
    </div>
    <div v-else class="TaskDetail-handleform-par">
      <form
        class="TaskDetail-handleform"
      >
        <p class="TaskDetail-handleform-title common-kv-item">
          <label class="name">处理人</label><span class="val">王明</span>
        </p>
        <div class="TaskDetail-handleform-ta-par">
          <h-textarea
            v-model="form.handleCnt"
            :max-number="100"
          ></h-textarea>
        </div>
      </form>
      <div class="InformationWallForm-img-par TaskDetail-img-par">
        <div
          v-show="form.imgUrl"
          class="InformationWallForm-preshow"
        >
          <i class="iconfont del icon-shanchu" @click="delImg"></i>
          <img
            :src="form.imgUrl"
          >
        </div>
        <vue-core-image-upload
          v-show="!form.imgUrl"
          class="btn btn-primary"
          :crop="false"
          inputOfFile="file"
          @imageuploaded="imageUploaded"
          :max-file-size="1024*1024*20"
          :maxWidth="1280"
          :compress="70"
          extensions="png,jpg,jpeg"
          inputAccept="image/jpg,image/jpeg,image/png"
          :url="uploadUrl"
          :multiple-size="1"
          @errorhandle="uploadError"
        >
          <h-upload></h-upload>
        </vue-core-image-upload>
      </div>
      <div class="SuggestionForm-btm">
        <h-button
          :width="264"
          :height="39"
          cnt="提交处理结果"
          @click.native="submit"
        ></h-button>
      </div>
    </div>
  </div>
</template>

<script>
import HScore from '../../components/common/HScore';
import HButton from '../../components/common/HButton';
import HTextarea from '../../components/common/HTextarea';
import HUpload from '../../components/common/HUpload';
import VueCoreImageUpload from 'vue-core-image-upload';
import {mapState} from 'vuex';
export default {
  name: 'TaskDetail',
  components: {VueCoreImageUpload, HTextarea, HButton, HScore, HUpload},
  props: {
    isProcessed: {
      type: String
    }
  },
  created () {
    this.init();
  },
  activated () {
    // this.updateLevel();
  },
  data () {
    return {
      eventCode: '',
      reportTime: '',
      eventTypeName: '',
      description: '',
      state: false,
      handlerInfo: '',
      evaluateInfo: {},
      uploadUrl: process.env.base_url + 'document/upload',
      imgUrl: '',
      answerImgUrl: '',
      form: {
        imgUrl: '',
        handleCnt: ''
      }
    };
  },
  computed: {
    ...mapState(['addresses'])
  },
  methods: {
    init () {
      let detail = sessionStorage.getItem('TaskDetail.detail');
      if (detail) {
        detail = JSON.parse(detail);
        this.eventCode = detail.eventCode;
        this.reportTime = detail.question.reportTime;
        this.eventTypeName = detail.question.eventTypeName;
        this.description = detail.question.description;
        this.handlerInfo = detail.handlerInfo;
        this.evaluateInfo = detail.evaluateInfo;
        this.state = detail.state;
        this.imgUrl = detail.images && detail.images[0] ? detail.images[0].url : null;
        this.answerImgUrl = detail.handlerInfo && detail.handlerInfo.images && detail.handlerInfo.images[0] ? detail.handlerInfo.images[0].url : null;
      }
    },
    delImg () {
      /* 删除图片 */
      this.form.imgUrl = '';
      this.form.imgCode = '';
    },
    imageUploaded ({code, value: data}) {
      if (code === '200') {
        this.form.imgUrl = data[0].url;
        this.form.imgCode = data[0].docId;
      }
    },
    uploadError (res) {
      const errorObj = {
        'FILE IS TOO LARGER MAX FILE IS': '图片最大不能超过20M'
      };
      for (let p in errorObj) {
        if (new RegExp(p).test(res)) {
          this.$vux.toast.show({
            type: 'text',
            text: errorObj[p]
          });
          return;
        }
      }
      this.$vux.toast.show({
        type: 'text',
        text: '上传失败'
      });
    },
    async submit () {
      const {code} = await this.axPost(
        'event/handle',
        {
          eventCode: this.eventCode,
          handlerUid: localStorage.getItem('uid'),
          handlerReplay: this.form.handleCnt,
          handleTime: this.hUtil.formatDate(new Date()),
          handlerImages: this.form.imgCode
        }
      );
      if (code === '200') {
        this.$router.push({
          name: 'TaskList'
        });
      }
    }
  }
};
</script>

<style scoped>

</style>
