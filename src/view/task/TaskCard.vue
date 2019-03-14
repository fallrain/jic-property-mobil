<template>
  <li class="TaskCard">
    <div class="TaskCard-header">
      <label class="name">{{id}}</label>
      <button
        v-if="processed"
        type="button"
        class="handle"
      >处理
      </button>
    </div>
    <ol class="TaskCard-cnt">
      <li
        class="TaskCard-cnt-item"
      >
        <label class="name">上报人:</label><span class="val">{{question.reporter}}</span>
      </li>
      <li
        class="TaskCard-cnt-item"
      >
        <label class="name">上报时间:</label><span class="val">{{question.reportTime}}</span>
      </li>
      <li
        class="TaskCard-cnt-item"
      >
        <label class="name">事件分类:</label><span class="val">{{question.eventTypeName}}</span>
      </li>
      <li
        class="TaskCard-cnt-item"
      >
        <label class="name">上报留言:</label><span class="val">{{question.description}}</span>
      </li>
    </ol>
  </li>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    id: {
      type: String
    },
    processed: {
      type: Boolean
    },
    question: {
      type: Object
    }
  }
};
</script>

<style scoped lang="scss">
  .TaskCard {
    background: #fff;
    border-radius: 10px;
  }

  .TaskCard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 13px;
    padding-right: 9px;
    font-size: 14px;
    height: 42px;
    border-bottom: 1px solid #F0F0F0;

    .name {
      color: #999;
    }

    .handle {
      color: #5E8CF8;
      border: 1px solid #5E8CF8;
      width: 82px;
      height: 30px;
      border-radius: 15px;
      background: #fff;
      font-size: 14px;
    }
  }

  .TaskCard-cnt {
    padding: 10px 12px;
  }

  .TaskCard-cnt-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 24px;

    .name {
      width: 70px;
      flex-shrink: 0;
      color: #333;
    }

    .val {
      margin-left: 8px;
      color: #999;
    }
  }
</style>
