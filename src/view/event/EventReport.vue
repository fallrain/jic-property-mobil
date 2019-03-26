<template>
  <div>
    <div class="EventReport-see">
      <span @click="toHistory">查看我的上报记录</span>
    </div>
    <div class="SuggestionForm">
      <h-picker
        title="事件分类"
        :options="options"
        v-model="form.eventTypeCode"
      ></h-picker>
      <h-textarea
        v-model="form.description"
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
        @click.native="submit"
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
        eventTypeCode: '',
        description: '',
        imgUrl: ''
      },
      uploadUrl: process.env.base_url + 'document/upload',
      options: []
    };
  },
  created () {
    this.queryType();
    this.genVdt();
  },
  methods: {
    async queryType () {
      /* 查询事件类型 */
      const {code, value} = await this.axGet(
        'metadata/findByGroupCode',
        {
          groupCode: 'eventType'
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
    },
    genVdt () {
      this.vdt = new this.HValidate({
        _this: this,
        formData: this.form,
        rules: {
          eventTypeCode: {
            'required': true
          },
          description: {
            'required': true,
            maxLength: 100
          }
        },
        messages: {
          eventTypeCode: {
            'required': '请选择事件类型'
          },
          description: {
            'required': '请输入问题说明',
            maxLength: '问题说明最多输入100字'
          }
        }
      });
    },
    delImg () {
      /* 删除图片 */
      this.form.imgUrl = '';
      this.form.imgCode = '';
    },
    imageUploaded ({code, value}) {
      if (code === '200') {
        this.form.imgUrl = value[0].url;
        this.form.imgCode = value[0].docId;
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
      if (!this.vdt.valid()) {
        return;
      }
      const {code} = await this.axPost(
        'event/report/submit',
        {
          'uid': localStorage.getItem('uid'),
          'eventTypeCode': this.form.eventTypeCode,
          'description': this.form.description,
          'images': [
            this.form.imgCode
          ].join(',')
        }
      );
      if (code === '200') {
        this.$vux.toast.show({
          text: '上报成功',
          onHide: () => {
            /* this.$router.push({
              name: 'MyEventList'
            }); */
            this.closeWxWindow();
          }
        });
      }
    },
    toHistory () {
      /* 跳转历史记录 */
      this.$router.push({
        name: 'MyEventList'
      });
    }
  }
};
</script>

<style scoped>

</style>
