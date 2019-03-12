<template>
  <div class="HPicker">
    <label class="HPicker-header" :for="id">
      <label class="HPicker-header-title">{{title}}</label>
      <div class="HPicker-header-slt">
        <span class="HPicker-header-val"></span>
        <i class="iconfont icon-jiantou9"></i>
      </div>
      <select
        :id="id"
        class="HPicker-header-select"
      >
        <option value="">请选择</option>
        <option
          :value="item.key"
          v-for="(item,i) in options"
          :key="i"
        >{{item.val}}</option>
      </select>
    </label>
  </div>
</template>

<script>
export default {
  name: 'HPicker',
  props: {
    title: {
      type: String
    },
    options: {
      type: Array
    }
  },
  data () {
    return {
      id: new Date().getTime()
    };
  }
};
</script>

<style lang="scss">
  .HPicker{
    width: 100%;
  }
  .HPicker-header {
    position: relative;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #C4C4C4;
    padding-right: 4px;
    padding-left: 4px;
  }

  .HPicker-header-title {
    color: #999;
  }
  .HPicker-header-slt{
    color: #333;
  }
  .HPicker-header-select{
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
</style>
