<template>
  <div>
    <div class="EventReport-see">
      <span>查看我的上报记录</span>
    </div>
    <div class="SuggestionForm">
      <h-picker
        title="事件分类"
        :options="options"
      ></h-picker>
      <h-textarea
        v-model="form.question"
        :maxNumber="100"
        placeHolder="有什么问题 ,简单说明下吧"
      ></h-textarea>
    </div>
    <div class="InformationWallForm-img-par EventReport-img-par">
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
        class="SuggestionForm-btn"
        :width="264"
        :height="39"
        cnt="我要上报"
        @click.native="sbumit"
      ></h-button>
    </div>
  </div>
</template>

<script>
import HPicker from '../../components/common/HPicker';
import HTextarea from '../../components/common/HTextarea';
import HButton from '../../components/common/HButton';
import HUpload from '../../components/common/HUpload';
import VueCoreImageUpload from 'vue-core-image-upload';

export default {
  name: 'EventReport',
  components: {HButton, HTextarea, HPicker, VueCoreImageUpload, HUpload},
  data () {
    return {
      form: {
        question: '',
        imgUrl: ''
      },
      uploadUrl: process.env.base_url + 'document/upload',
      options: [
        {
          key: '1',
          val: '物业服务'
        },
        {
          key: '2',
          val: '物业质量'
        },
        {
          key: '3',
          val: '一二三四'
        },
        {
          key: '4',
          val: '测试长度长度差怒测试长度长度差怒测试长度长度差怒测试长度长度差怒测试长度长度差怒测试长度长度差怒'
        }
      ]
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
