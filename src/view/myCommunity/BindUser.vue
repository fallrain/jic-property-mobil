<template>
  <div class="BindUser">
    <div class="BuildingList-head">
      <i class="iconfont icon-loufang"></i>
      <span>{{name}}</span>
    </div>
    <div class="BuildingList-cnt BindUser-cnt">
      <div class="BindUser-valid" v-if="isMaster">
        <p class="BindUser-valid-head">
          <i class="iconfont icon-credentials_icon"></i>
          <span>身份验证</span>
        </p>
        <ol>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">真实姓名</p>
            <p class="val">
              <input
                type="text"
                class="BindUser-valid-item-ipt"
                placeholder="请输入真实姓名"
                v-model="masterForm.name"
              >
            </p>
          </li>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">身份证号码</p>
            <p class="val">
              <input
                type="text"
                class="BindUser-valid-item-ipt"
                placeholder="请输入身份证号码"
                v-model="masterForm.idCard"
              >
            </p>
          </li>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">预留手机号码</p>
            <p class="val multVal">
              <span>{{halfTel}}</span>
              <input
                type="text"
                class="BindUser-valid-item-ipt"
                placeholder="后四位"
                v-model="masterForm.phone"
              >
              <i class="iconfont icon-wenhao" @click="showPhoneNotice"></i>
            </p>
          </li>
        </ol>
      </div>
      <div class="BindUser-valid" v-if="!isMaster">
        <p class="BindUser-valid-head">
          <i class="iconfont icon-credentials_icon"></i>
          <span>房主身份验证</span>
        </p>
        <ol>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">房主真实姓名</p>
            <p class="val">
              <input
                type="text"
                class="BindUser-valid-item-ipt"
                placeholder="请输入房主真实姓名"
                v-model="form.ownerName"
              >
            </p>
          </li>
        </ol>
        <p class="BindUser-valid-head mt23">
          <i class="iconfont icon-credentials_icon"></i>
          <span>我的身份验证</span>
        </p>
        <ol>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">真实姓名</p>
            <p class="val">
              <input
                type="text"
                class="BindUser-valid-item-ipt"
                placeholder="请输入真实姓名"
                v-model="form.name"
              >
            </p>
          </li>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">身份证号码</p>
            <p class="val">
              <input
                type="text"
                class="BindUser-valid-item-ipt"
                placeholder="请输入身份证号码"
                v-model="form.idCard"
              >
            </p>
          </li>
          <li
            class="BindUser-valid-item"
          >
            <p class="name">手机号码</p>
            <p class="val">
              <input
                type="text"
                class="BindUser-valid-item-ipt"
                placeholder="请输入手机号码"
                v-model="form.phone"
              >
            </p>
          </li>
        </ol>
      </div>
      <div class="BindUser-btm">
        <h-button
          :width="264"
          :height="39"
          cnt="验证"
          @click.native="valid"
        ></h-button>
      </div>
    </div>
  </div>
</template>
<script>
import Group from 'vux/src/components/Group';
import XSwitch from 'vux/src/components/x-switch';
import {
  HButton
} from '@/components/common';

export default {
  props: ['communityCode', 'roomCode', 'master'],
  components: {
    HButton,
    Group,
    XSwitch
  },
  data () {
    return {
      name: '2单元',
      isMaster: this.master === '1',
      halfTel: '',
      masterForm: {
        name: '',
        idCard: '',
        phone: ''
      },
      form: {
        ownerName: '',
        name: '',
        idCard: '',
        phone: ''
      }
    };
  },
  watch: {
    master (val) {
      // 缓存了本组件，data只构建一次，所以需要监控master
      this.isMaster = val === '1';
    }
  },
  activated () {
    // 切换时重新创建验证对象
    this.genVdt();
    this.queryHost();
  },
  methods: {
    toNext (item) {
      this.$router.push({
        name: 'BindUser'
      });
    },
    showPhoneNotice () {
      this.$vux.alert.show({
        title: '系统通知',
        content: '手机号码为您交房时提供给物业的手机号。'
      });
    },
    queryHost () {
      /* 查询房主信息 */
      this.axGet(
        'roomOwner/wxGetHostByRoomCode',
        {
          j_sub_system: this.communityCode,
          roomCode: this.roomCode
        }
      ).then(r => {
        if (r.code === '200') {
          const data = r.value;
          this.ownerCode = data[0].ownerCode;
          this.halfTel = data[0].tel;
        }
      });
    },
    genVdt () {
      if (this.isMaster) {
        this.vdt = new this.HValidate({
          _this: this,
          formData: this.masterForm,
          rules: {
            name: {
              'required': true,
              'cn': true
            },
            idCard: {
              IDCard: true
            },
            phone: {
              'required': true,
              number: true,
              length: 4
            }
          },
          messages: {
            name: {
              'required': '姓名不能为空',
              'cn': '姓名必须为汉字'
            },
            idCard: {
              IDCard: '请输入合法的身份证'
            },
            phone: {
              'required': '手机号后四位不能为空',
              length: '最大长度为4位'
            }
          }
        });
      } else {
        this.vdt = new this.HValidate({
          _this: this,
          formData: this.form,
          rules: {
            ownerName: {
              'required': true,
              'cn': true
            },
            name: {
              'required': true,
              'cn': true
            },
            idCard: {
              // IDCard: true
            },
            phone: {
              'required': true,
              mobile: true
            }
          },
          messages: {
            ownerName: {
              'required': '房主姓名不能为空',
              'cn': '房主姓名必须为汉字'
            },
            name: {
              'required': '姓名不能为空',
              'cn': '姓名必须为汉字'
            },
            idCard: {
              IDCard: '请输入合法的身份证'
            },
            phone: {
              'required': '手机号不能为空'
            }
          }
        });
      }
    },
    valid () {
      if (this.vdt.valid()) {
        this.$vux.confirm.show({
          title: '系统通知',
          hideOnBlur: true,
          content: `
                 您绑定的房子为：<span class="jic-weui-dialog-val">${this.name}</span><br>
                 房子房主为：<span class="jic-weui-dialog-val">${this.form.ownerName}</span>
              `,
          onConfirm: () => {
            let validResult;
            if (this.isMaster) {
              validResult = this.axPost(
                'roomOwner/wxValidateHost',
                {
                  simpleCode: this.communityCode,
                  roomCode: this.roomCode,
                  ownerName: this.masterForm.name,
                  tel: this.halfTel + this.masterForm.phone,
                  ownerCode: this.ownerCode,
                  wxUid: localStorage.getItem('uid')
                },
                {
                  j_sub_system: this.communityCode
                }
              );
            } else {
              validResult = this.axPost(
                'roomOwner/wxValidateLease',
                {
                  simpleCode: this.communityCode,
                  roomCode: this.roomCode,
                  ownerName: this.form.ownerName,
                  leaseName: this.form.name,
                  tel: this.form.phone,
                  idCard: this.form.idCard,
                  // ownerCode: this.ownerCode,
                  wxUid: localStorage.getItem('uid')
                },
                {
                  j_sub_system: this.communityCode
                }
              );
            }
            validResult.then(r => {
              if (r.code === '200') {
                this.$vux.toast.show({
                  type: 'text',
                  text: '绑定成功',
                  onHide: () => {
                    sessionStorage.setItem('BindUser.refreshMyCommunityList', '1');
                    this.$router.replace({
                      name: 'MyCommunityList'
                    });
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
<style lang="scss">
</style>
