<template>
  <div>
    <el-switch v-model="text"
      @change="handleChange"
      @click.native="handleClick"
      :active-value="active[valueKey] || 1"
      :inactive-value="inactive[valueKey] || 2"
      :disabled="disabled"
      :readonly="readonly"
      :size="size"></el-switch>
  </div>
</template>

<script>
import create from '../../core/create';
import props from '../../core/common/props.js';
import event from '../../core/common/event.js';
export default create({
  name: 'switch',
  mixins: [props(), event()],
  props: {
    value: {}
  },
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  computed: {
    active() {
      return (this.dic || []).find((currentValue) => {
        return currentValue[this.valueKey] === 1
      }) || this.dic[1] || {};
    },
    inactive() {
      return (this.dic || []).find((currentValue) => {
        return currentValue[this.valueKey] !== 1
      }) || this.dic[0] || {};
    }
  },
  methods: {}
});
</script>

