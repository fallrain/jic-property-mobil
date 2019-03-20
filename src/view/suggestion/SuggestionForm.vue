<template>
  <div>
    <div class='SuggestionForm'>
      <h-picker
        title='业务类型'
        :options='options'
        v-model="form.questionType"
      ></h-picker>
      <h-textarea
        v-model='form.question'
        :maxNumber='100'
        placeHolder='您对物业的服务有什么意见和建议，欢迎留言......'
      ></h-textarea>
    </div>
    <div class='SuggestionForm-btm'>
      <h-button
        class='SuggestionForm-btn'
        :width='264'
        :height='39'
        cnt='提交'
        @click.native='submit'
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
  created () {
    this.genVdt();
    this.queryType();
  },
  data () {
    return {
      form: {
        questionType: '',
        question: ''
      },
      options: []
    };
  },
  methods: {
    genVdt () {
      this.vdt = new this.HValidate({
        _this: this,
        formData: this.form,
        rules: {
          questionType: {
            'required': true
          },
          question: {
            'required': true,
            maxLength: 100
          }
        },
        messages: {
          questionType: {
            'required': '请选择问题类型'
          },
          question: {
            'required': '请输入留言',
            maxLength: '最多输入100字'
          }
        }
      });
    },
    async submit () {
      if (!this.vdt.valid()) {
        return;
      }
      const {code} = await this.axPost(
        'feedback/submit',
        {
          'uid': localStorage.getItem('uid'),
          'questionType': this.form.questionType,
          // 'phone': '手机号码',
          'question': this.form.question
        }
      );
      if (code === '200') {
        this.$vux.toast.show({
          text: '提交成功',
          onHide: () => {
            this.$router.push({
              name: 'SuggestionList'
            });
          }
        });
      }
    },
    async queryType () {
      /* 查询业务类型 */
      const {code, value} = await this.axGet(
        'metadata/findByGroupCode',
        {
          groupCode: 'question_type'
        }
      );
      if (code === '200') {
        this.options = value.map(function (v) {
          return {
            key: v.metaCode,
            val: v.metaName
          };
        });
      }
    }
  }
};
</script>

<style scoped>

</style>
