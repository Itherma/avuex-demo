/**
 * @title 维度统计下拉
 * @author lorry
 * @date 2019-9-10 15：32
 */
<template>
  <div
    class="custom-tree-select"
    :class="isShow ? 'is-opened' : ''"
    ref="listBox"
    @click.stop
    v-clickout="clickOut"
  >
    <el-input
      :placeholder="'请选择'"
      :value="filterText"
      :disabled="disabled"
      :name="name"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :autofocus="autofocus"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
      @change="handleChange"
    >
      <i
        slot="suffix"
        class="el-select__caret el-input__icon el-icon-arrow-up"
        @click="handleIconClick"
        v-show="(!clearable && filterText) || !filterText"
      ></i>
      <i
        slot="suffix"
        class="el-icon-circle-close"
        @click="handleIconClear"
        v-show="clearable && filterText"
      ></i>
    </el-input>
    <div class="select-content" :class="isShow ? 'is-show' : ''">
      <el-scrollbar class="custom-tree-select--scrollbar" :style="{ width }">
        <!-- 下拉列表 -->
        <ul class="network-select" :props="props">
          <li v-for="item in list" :key="item.id">
            <el-checkbox v-model="item.checked"></el-checkbox>
            <span class="span-s">{{item.start}}</span>{{str}}<span class="span-s">{{item.end}}</span>
            </li>
        </ul>
        <div class="select-footer">
          <span class="sure"  @click="handleNodeClickForList()">{{'确认'}}</span>
          <span class="cancel"  @click="clickOut()">{{'取消'}}</span>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import create from '../../core/create'
import props from '../../core/common/props.js'
import event from '../../core/common/event.js'
import forEach from 'lodash/forEach'
import find from 'lodash/find'

export default create({
  name: 'dimension',
  mixins: [props(), event()],
  props: {
    // 默认样式
    width: {
      type: String,
      default: ''
    },
    // 输入框头部图标
    prefixIcon: {
      type: String,
      default: ''
    },
    // 输入框尾部图标
    suffixIcon: {
      type: String,
      default: ''
    },
    // name
    name: {
      type: String,
      default: ''
    },
    // 默认
    autofocus: {
      type: Boolean,
      default: false
    },
    // 清除按钮
    clearable: {
      type: Boolean,
      default: false
    },
    dicData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      str: '<w≤',
      isShow: false, // 列表的显隐状态
      loading: false, // 列表的显隐状态
      selectText: '', // 选中的值
      filterText: '',
      selectRow: {}, // 选中的行数据
      list: this.dicData, // 列表
      propsDefault: {
        id: 'id',
        label: 'name',
        value: 'id'
      }
    }
  },
  watch: {
    selectDic: {
      handler(arr) {
        forEach(arr, opt => {
          if (!this.inNetDic(opt)) {
            this.list.push({ ...opt, label: this.getLabelText(opt) })
          }
        })
      },
      deep: true
    },
    value: {
    // eslint-disable-next-line no-unused-vars
      handler(val) {
        this.initVal() // 监听并重新初始化数据
        this.init()
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    clickOut() {
      // 每次隐藏重置checkbox
      this.isShow = false
      this.listStatusChange()
    },
    // checkbox状态改变
    listStatusChange() {
      const textList = this.text.split(',')
      this.list.forEach(item => {
        if (textList.includes(item.id + '')) {
          item.checked = true
        } else {
          item.checked = false
        }
      })
    },
    init() {
      // if (this.validatenull(this.text)) {
      //   this.filterText = ''
      // } else {
      //   if (typeof this.text === 'number' || typeof this.text === 'string') {
      //     const list = [this.selectRow, ...this.selectDic]
      //     const obj = list.find((item) => {
      //       return item[this.valueKey] === this.text
      //     })
      //     if (obj) {
      //       this.filterText = this.selectText = this.getLabelText(obj)
      //     } else {
      //       if (!this.filterText) this.filterText = this.selectText = this.text
      //     }
      //   } else {
      //     this.filterText = this.selectText = this.getLabelText(this.text)
      //   }
      // }
    },
    // 监听icon点击事件
    // eslint-disable-next-line no-unused-vars
    handleIconClick(e) {
      this.isShow = !this.isShow
    },
    // 监听input框获取焦点事件
    // eslint-disable-next-line no-unused-vars
    handleFocus(e) {
      this.isShow = true;
      const checkList = this.list.filter(item => item.checked)
      const checkListName = checkList.map(ele => ele[this.props.label]).join('/')
      this.selectText = checkListName
      this.handleEmit(checkListName)
    },
    handleBlur() {
      this.filterText = this.text ? this.selectText : ''
    },
    // 监听input的input事件
    handleInput(val) {
      this.filterText = val
      if (this.validatenull(val)) {
        this.text = ''
        this.$emit('input', '')
        this.$emit('change', '')
      }
    },
    // 清空按钮事件监听
    handleIconClear() {
      this.restForm()
    },
    // 确定选中
    handleNodeClickForList() {
      const checkList = this.list.filter(item => item.checked)
      let checkListName = ''
      if (checkList) {
        checkListName = checkList.map(ele => ele[this.props.label]).join('/')
        // 已选中list数据
        this.text = checkList.map(ele => ele[this.props.value]).join(',')
      } else {
        checkListName = ''
        this.text = ' '
      }
      // 关闭下拉列表
      this.isShow = false
      this.selectText = checkListName
      // 选中对应id
      this.handleEmit(checkListName)
    },
    // 重置
    restForm() {
      // this.filterText = ''
      this.text = ''
    },
    inNetDic(item) {
      if (this.validatenull(item[this.valueKey])) return true
      return !!find(this.list, o => o[this.valueKey] === item[this.valueKey])
    },
    // eslint-disable-next-line no-unused-vars
    handleChange(keyWords) {
      // this.handleEmit(keyWords)
    },
    handleEmit(checkListName = '') {
      if (this.text) {
        this.filterText = checkListName
        // 存储id
        const result = this.text
        this.$emit('input', result);
        this.$emit('change', result);
      } else {
        this.filterText = ''
        this.$emit('input', '');
        this.$emit('change', '');
      }
    },
    resetField() {
      this.text = ''
      this.filterText = ''
      this.selectText = ''
    },
    clearFormItem() {
      this.text = ''
      this.filterText = ''
      this.selectText = ''
      this.loadNode({ level: 0 }, () => {})
    }
  }
})
</script>

<style lang="css">

</style>
