<template>
  <div>
    <div class="jpm-spacer"></div>
    <h-title-item
      title="问题描述"
    >
      <h-textarea
        placeHolder="请输入您的宝贵意见"
        :maxNumber="200"
        v-model="form.advice"
      ></h-textarea>
    </h-title-item>
    <h-title-item
      title="图片上传"
      :btmLine="false"
    >
      <vue-core-image-upload
        class="btn btn-primary"
        :crop="false"
        @imageuploaded="imageUploaded"
        :data="uploadData"
        :max-file-size="1024*500"
        url="http://101.198.151.190/api/upload.php"
        @errorhandle="uploadError"
      >
        <h-upload></h-upload>
      </vue-core-image-upload>

    </h-title-item>
    <div class="InformationWallForm-btn-par">
      <button
        type="button"
        class="h-btn-primary"
        @click="submit"
      >确定发布
      </button>
    </div>
  </div>
</template>
<script>
import {
  HTextarea,
  HTitleItem,
  HUpload
} from '@/components/common';
import VueCoreImageUpload from 'vue-core-image-upload';
export default {
  components: {
    HTextarea,
    HTitleItem,
    HUpload,
    VueCoreImageUpload
  },
  data () {
    return {
      form: {
        advice: ''
      },
      uploadData: {

      }
    };
  },
  created () {
    this.genVdt();
  },
  methods: {
    genVdt () {
      this.vdt = new this.HValidate({
        _this: this,
        formData: this.form,
        rules: {
          advice: {
            'required': true
          },
          questionType: {}
        },
        messages: {
          question: {
            'required': '意见不能为空'
          },
          questionType: {},
          phone: {}
        }
      });
    },
    imageUploaded () {
      debugger;
    },
    uploadError (res) {
      const errorObj = {
        'FILE IS TOO LARGER MAX FILE IS 500.00kB': '图片最大不能超过500k'
      };
      this.$vux.toast.show({
        type: 'text',
        text: errorObj[res]
      });
    },
    submit () {
      /* 发布 */
      if (this.vdt.valid()) {
        this.axPost(
          'infoWall/wxInsert',
          {
            img: 'http://mao.jpg',
            content: this.form.content,
            ownerCode: '1'
          }
        ).then(r => {
          if (r.code === '200') {

          }
        });
      }
    }
  }
};
</script>
<style>

</style>
