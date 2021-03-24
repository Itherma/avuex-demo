<template>
  <div :class="[b(),{ 'avue-group--card':card }, styleType === 'noBorder' ? 'avue-group--simple' : '']" v-if="display">
    <el-row span="24" :class="b('item')">
      <!-- 标题 -->
      <div :class="b('header')" v-if="$slots.header" @click="toggleExpand" :style="{ 'cursor': expand ? 'pointer' : 'initial' }">
        <slot name="header"></slot>
        <i class="el-icon-arrow-down state" :class="{ 'close': !isExpand }" v-if="expand"></i>
      </div>
      <div :class="b('header')" v-else-if="label || icon" @click="toggleExpand" :style="{ 'cursor': expand ? 'pointer' : 'initial' }">
        <i :class="[icon,b('icon')]" v-if="icon"></i>
        <h1 :class="b('title')" v-if="label">{{label}}</h1>
        <i class="el-icon-arrow-down state" :class="{ 'close': !isExpand }" v-if="expand"></i>
      </div>
      <!-- 内容 -->
      <el-collapse-transition>
        <div v-show="isExpand">
          <slot></slot>
        </div>
      </el-collapse-transition>
    </el-row>
  </div>
</template>

<script>
import create from '../../core/create';
export default create({
  name: 'group',
  data() {
    return {
      isExpand: true
    }
  },
  props: {
    icon: {
      type: String
    },
    display: {
      type: Boolean,
      default: true
    },
    card: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    // 样式类型
    styleType: {
      default: '',
      type: String
    },
    expand: {
      type: Boolean,
      default: false
    }

  },
  methods: {
    toggleExpand() {
      if (this.expand) {
        this.isExpand = !this.isExpand
      }
    }
  }
});
</script>
