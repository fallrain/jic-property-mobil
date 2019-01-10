<template>
  <div>
    <h-title-item
      title="问题描述"
    >
      <h-textarea
        placeHolder="请输入您的宝贵意见"
        maxNumber="200"
      ></h-textarea>
    </h-title-item>
    <h-title-item
      title="图片上传"
    ></h-title-item>
  </div>
</template>
<script>
import {
  HTextarea,
  HTitleItem
} from '@/components/common';

export default {
  components: {
    HTextarea,
    HTitleItem
  }
};
</script>
<style>

</style>
