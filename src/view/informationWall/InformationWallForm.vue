<template>
  <div>
    <div class="jpm-spacer"></div>
    <h-title-item
      title="信息描述"
    >
      <h-textarea
        placeHolder="请输入"
        :maxNumber="200"
        v-model="form.advice"
      ></h-textarea>
    </h-title-item>
    <h-title-item
      title="图片上传"
      :btmLine="false"
    >
      <div class="InformationWallForm-img-par">
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
        advice: '',
        imgUrl: '',
        imgCode: ''
      },
      uploadUrl: process.env.base_url + 'document/upload',
      uploadData: {}
    };
  },
  created () {
    this.genVdt();
  },
  activated () {
    this.form.advice = '';
    this.form.imgUrl = '';
    this.form.imgCode = '';
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
          imgUrl: {
          }
        },
        messages: {
          advice: {
            'required': '意见不能为空'
          },
          imgUrl: {
          }
        }
      });
    },
    delImg () {
      /* 删除图片 */
      this.form.imgUrl = '';
      this.form.imgCode = '';
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
      /* 发布 */
      if (this.vdt.valid()) {
        this.axPost(
          'infoWall/wxInsert',
          {
            title: '1',
            img: this.form.imgCode,
            content: this.form.advice,
            ownerCode: sessionStorage.getItem('ownerCode')
          },
          {
            j_sub_system: sessionStorage.getItem('ownerSimpleCode')
          }
        ).then(r => {
          if (r.code === '200') {
            const _this = this;
            this.$vux.toast.show({
              text: '发布成功',
              onHide () {
                _this.$router.push({
                  name: 'InformationWallList',
                  params: {
                    all: 'self'
                  }
                });
              }
            });
          }
        });
      }
    }
  }
};
</script>
<style>

</style>
