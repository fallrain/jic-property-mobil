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
      <h-upload></h-upload>
    </h-title-item>
    <div class="InformationWallForm-btn-par">
      <button
        type="button"
        class="h-btn-primary"
      >确定发布</button>
    </div>
  </div>
</template>
<script>
import {
  HTextarea,
  HTitleItem,
  HUpload
} from '@/components/common';

export default {
  components: {
    HTextarea,
    HTitleItem,
    HUpload
  },
  data () {
    return {
      form: {
        advice: ''
      }
    };
  }
};
</script>
<style>

</style>
