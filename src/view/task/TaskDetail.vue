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
    <div v-if="isProcessed==='0'">
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
          <img :src="answerImgUrl">
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
          >重新评价
          </button>
        </div>
        <p class="EventDetail-evaluate-inf">响应及时，处理速度快，服务很好。</p>
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
          @click.native="sbumit"
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

export default {
  name: 'TaskDetail',
  components: {VueCoreImageUpload, HTextarea, HButton, HScore, HUpload},
  props: {
    isProcessed: {
      type: String
    }
  },
  data () {
    return {
      uploadUrl: '',
      imgUrl: 'fdf',
      answerImgUrl: 'sas',
      form: {
        imgUrl: '',
        handleCnt: ''
      }
    };
  },
  methods: {
    delImg () {
      /* 删除图片 */
      this.form.imgUrl = '';
    },
    imageUploaded (r) {
      if (r.code === '200') {
        const data = r.value;
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
    submit () {

    }
  }
};
</script>

<style scoped>

</style>
