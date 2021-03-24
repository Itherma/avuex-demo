<template>
  <div :class="b()">
    <el-select v-model="text"
      :class="{'remote-mod': remote}"
      :loading="loading"
      :size="size"
      :loading-text="'查询中...'"
      :multiple="multiple"
      :filterable="remote?true:filterable"
      :remote="remote"
      :readonly="readonly"
      :remote-method="handleRemoteMethod"
      :collapse-tags="tags"
      :clearable="disabled?false:clearable"
      :placeholder="placeholder"
      :allow-create="allowCreate"
      :reserve-keyword="reserveKeyword?true:false"
      default-first-option
      :multiple-limit="limit"
      :value-key="valueKey || 'id'"
      :disabled="disabled"
      @focus="handleFocus"
      @blur="handleBlur"
      @click.native="handleClick"
      @change="handleChange"
      @compositionupdate.native="handleComposition"
      @compositionstart.native="handleComposition"
      @compositionend.native="handleComposition">
      <el-option :label="'全部'" :value="''" v-if="hasAll && !remote"></el-option>
      <el-option :label="'全部'" :value="props.valueObj ? multipleAllValue : 0" v-if="multipleAll"></el-option>
      <template v-if="groupChildren">
        <el-option-group v-for="group in netDic"
                         :key="getLabelText(group)"
                         :label="getLabelText(group)">
          <el-option v-for="(item,index) in group[groupChildren]"
                     :key="index"
                     :disabled="item[disabledKey]"
                     :label="getLabelText(item)"
                     :value="props.valueObj ? item : item[valueKey]">
          <slot :name="prop+'Type'"
                :label="labelKey"
                :value="valueKey"
                :item="item"></slot>
          </el-option>
        </el-option-group>
      </template>
      <template v-else>
        <el-option v-for="(item,index) in netDic"
                  :key="index"
                  :disabled="item[disabledKey]"
                  :label="getLabelText(item)"
                  :value="props.valueObj ? item : item[valueKey]">
          <slot :name="prop+'Type'"
                :label="labelKey"
                :value="valueKey"
                :item="item"></slot>
        </el-option>
      </template>
      <template slot="prefix" v-if="remote">
        <i class="el-icon-search"></i>
      </template>
    </el-select>
  </div>
</template>

<script>
import create from '../../core/create';
import props from '../../core/common/props.js';
import event from '../../core/common/event.js';
import { sendDic } from '../../core/common/dic';
import forEach from 'lodash/forEach'
import find from 'lodash/find'
export default create({
  name: 'select',
  mixins: [props(), event()],
  data() {
    return {
      loading: false,
      isOnComposition: false,
      previousQuery: null,
      netDic: [],
      multipleAllValue: {
        name: '全部',
        id: 0,
        code: '0',
        multipleAll: true
      }
    };
  },
  props: {
    value: [Object, Array, Number, String],
    //  下拉分组数据子集的key，分组时必传
    groupChildren: {
      type: String,
      default: ''
    },
    remote: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Boolean,
      default: true
    },
    allowCreate: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 99
    },
    filterable: {
      type: Boolean,
      default: false
    },
    multipleAll: {
      type: Boolean,
      default: false
    },
    isSearch: {
      type: Boolean,
      default: false
    },
    useAlone: {
      type: Boolean,
      default: false
    },
    reserveKeyword: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    valueKey() {
      return this.props.value
    }
  },
  watch: {
    dic: {
      handler(val) {
        this.netDic = val;
      },
      immediate: true
    },
    text: {
      handler(val) {
        // 表单带有全部选项且是多选数据初始化
        if (this.multiple && this.multipleAll && this.props.valueObj) {
          // eslint-disable-next-line
          const item = val.find(o => o[this.props.value] == '0')
          if (typeof item === 'object') item.multipleAll = true
        }
        // 加入默认数据
        forEach(this.selectDic, (opt) => {
          if (!this.inNetDic(opt)) {
            this.netDic.push(opt)
          }
        })
        // this.handleChange(val);
        this.$emit('input', val);
        this.$emit('change', val);
      },
      immediate: true
    },
    selectDic: {
      handler(arr) {
        if ((!arr || !arr.length) && this.isSearch) {
          this.netDic = []
          return
        }
        forEach(arr, (opt) => {
          if (!this.inNetDic(opt)) {
            this.netDic.push(opt)
          }
        })
      },
      deep: true,
      immediate: true
    },
    dicUrl: {
      handler(val = '', oldval = '') {
        const npath = val.split('?')[0]
        const opath = oldval.split('?')[0]
        if (npath !== opath) this.handleRemoteMethod()
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    if (this.useAlone && this.dicUrl) {
      this.initOptions()
    }
  },
  methods: {
    isKorean(text) {
      const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi;
      return reg.test(text);
    },
    handleComposition(event) {
      if (this.multiple || this.filterable) return
      const text = event.target.value;
      if (event.type === 'compositionend') {
        this.isOnComposition = false;
    // eslint-disable-next-line no-unused-vars
        this.$nextTick(_ => this.handleRemoteMethod(text));
      } else {
        const lastCharacter = text[text.length - 1] || '';
        this.isOnComposition = !this.isKorean(lastCharacter);
      }
    },
    handleRemoteMethod(query) {
      if (this.previousQuery === query || this.isOnComposition) return;
      this.previousQuery = query;
      if (!query) {
        this.netDic = []
        return
      }
      this.loading = true
      sendDic({
        url: this.dicUrl.replace('{{key}}', this.previousQuery),
        method: this.dicMethod,
        query: this.dicQuery,
        resKey: this.resKey,
        props: this.props
      }).then(res => {
        this.netDic = res;
        forEach(this.selectDic, (item) => {
          if (!this.inNetDic(item)) {
            this.netDic.push(item)
          }
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      });
    },
    inNetDic(item) {
      if (this.validatenull(item[this.valueKey])) return true
      return !!find(this.netDic, (o) => o[this.valueKey] === item[this.valueKey])
    },
    clearDic() {
      this.netDic = []
    },
    initOptions() {
      sendDic({
        url: this.dicUrl,
        method: this.dicMethod,
        query: this.dicQuery,
        resKey: this.resKey,
        props: this.props
      }).then(res => {
        this.netDic = res;
        forEach(this.selectDic, (item) => {
          if (!this.inNetDic(item)) {
            this.netDic.push(item)
          }
        })
        this.loading = false
      }).catch(() => {
        this.loading = false
      });
    }
  }
});
</script>

