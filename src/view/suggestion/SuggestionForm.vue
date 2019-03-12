<template>
  <div>
    <div class="SuggestionForm">
      <h-picker
        title="业务类型"
        :options="options"
      ></h-picker>
      <h-textarea
        v-model="form.question"
        :maxNumber="100"
        placeHolder="您对物业的服务有什么意见和建议，欢迎留言......"
      ></h-textarea>
    </div>
    <div class="SuggestionForm-btm">
      <h-button
        class="SuggestionForm-btn"
        :width="264"
        :height="39"
        cnt="提交"
        @click.native="sbumit"
      ></h-button>
    </div>
  </div>
</template>

<script>
import HPicker from '../../components/common/HPicker';
import HTextarea from '../../components/common/HTextarea';
import HButton from '../../components/common/HButton';

export default {
  name: 'SuggestionForm',
  components: {HButton, HTextarea, HPicker},
  data () {
    return {
      form: {
        question: ''
      },
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
    sbumit () {

    }
  }
};
</script>

<style scoped>

</style>
