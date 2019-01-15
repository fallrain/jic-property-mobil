<template>
<div>
  <h-radio
    v-for="(item,i) in questions"
    :key="i"
    :data="item.radioData"
    v-model="item.value"
  ></h-radio>
</div>
</template>
<script>
import {
  HRadio
} from '@/components/common';
export default {
  components: {
    HRadio
  },
  data () {
    return {
      radioData: [
        {
          label: '满意'
        },
        {
          label: '尚可'
        },
        {
          label: '不满意'
        }
      ],
      questions: [
        {
          value: 0,
          radioData: [
            {
              label: '满意'
            },
            {
              label: '尚可'
            },
            {
              label: '不满意'
            }
          ]
        }
      ]
    };
  }
};
</script>
<style>

</style>
