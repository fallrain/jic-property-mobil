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
        v-if="imgUrl.length">
        <img
          v-for="(img,index) in imgUrl"
          :key="index"
          :src="img.url"
        >
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
        <li
          class="EventDetail-answer-item EventDetail-answer-item-flexwrap"
          v-if="answerImgUrl.length"
        >
          <img
            v-for="(img,index) in answerImgUrl"
            :key="index"
            :src="img.url"
          >
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
          <label class="name">处理人</label><span class="val">{{propertyInfo.userName}}</span>
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
          v-show="form.imgUrl.length"
          class="EventReport-img-preshow"
        >
          <div
            class="InformationWallForm-preshow"
            v-for="(item,index) in form.imgUrl"
            :key="item"
          >
            <i class="iconfont del icon-shanchu" @click="delImg(index)"></i>
            <img
              :src="item"
            >
          </div>
        </div>
        <vue-core-image-upload
          v-show="form.imgUrl.length < 3"
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
          :multiple-size="3"
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
    this.genVdt();
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
      imgUrl: [],
      answerImgUrl: [],
      form: {
        imgUrl: [],
        imgCode: [],
        handleCnt: ''
      }
    };
  },
  computed: {
    ...mapState([
      'addresses',
      'propertyInfo'
    ])
  },
  methods: {
    init () {
      let detail = sessionStorage.getItem('TaskDetail.detail');
      if (detail) {
        detail = JSON.parse(detail);
        this.eventCode = detail.eventCode;
        this.question = detail.question;
        this.reportTime = detail.question.reportTime;
        this.eventTypeName = detail.question.eventTypeName;
        this.description = detail.question.description;
        this.handlerInfo = detail.handlerInfo;
        detail.evaluateInfo.level *= 1;
        this.evaluateInfo = detail.evaluateInfo;
        this.reportInfo = detail.reportInfo;
        this.state = detail.state;
        this.imgUrl = detail.images || [];
        this.answerImgUrl = (detail.handlerInfo && detail.handlerInfo.images) || [];
      }
    },
    delImg (index) {
      /* 删除图片 */
      this.form.imgUrl.splice(index, 1);
      this.form.imgCode.splice(index, 1);
    },
    imageUploaded ({code, value: data}) {
      if (code === '200') {
        this.form.imgUrl.push(data[0].url);
        this.form.imgCode.push(data[0].docId);
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
    genVdt () {
      this.vdt = new this.HValidate({
        _this: this,
        formData: this.form,
        rules: {
          handleCnt: {
            'required': true
          }
        },
        messages: {
          handleCnt: {
            'required': '处理内容不能为空'
          }
        }
      });
    },
    async submit () {
      if (!this.vdt.valid()) {
        return;
      }
      const handlerTime = this.hUtil.formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
      const {code} = await this.axPost(
        'event/handleWx',
        {
          eventCode: this.eventCode,
          handlerUid: localStorage.getItem('uid'),
          handlerReplay: this.form.handleCnt,
          handleTime: handlerTime,
          handlerImages: this.form.imgCode.join(',')
        }
      );
      if (code === '200') {
        const detail = JSON.parse(sessionStorage.getItem('TaskDetail.detail'));
        detail.handlerInfo = {
          handler: this.propertyInfo.userName,
          handlerTime,
          images: this.form.imgUrl || [],
          replay: this.form.handleCnt
        };
        sessionStorage.setItem('TaskList.processed', JSON.stringify(detail));
        this.$router.push({
          name: 'TaskList',
          query: {
            tabIndex: 1
          }
        });
      }
    }
  }
};
</script>

<style scoped>

</style>
