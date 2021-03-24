/**
 * @title 树形下拉
 * @author Alinc
 * @date 2019-8-28 15:59:53
 */
<template>
  <div
    class="custom-tree-select custom-network-component"
    :class="isShow ? 'is-opened' : ''"
    ref="listBox"
    v-clickout="clickOut"
    >
    <el-input
      :placeholder="'输入关键字进行查询'"
      v-model="filterText"
      :disabled="disabled"
      :name="name"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :validate-event="validateEvent"
      :autofocus="autofocus"
      @focus="handleFocus"
      @blur.native.capture="handleBlur"
      @keyup.native="debouncedOnInputChange"
      @change="handleChange"
      @paste.native="debouncedOnInputChange"
    >
      <i
        slot="suffix"
        class="el-select__caret el-input__icon el-icon-arrow-up"
        @click="handleIconClick"
        v-show="!disabled && !isSelect && ((!clearable && filterText) || !filterText)"
      ></i>
      <i
        slot="suffix"
        class="el-select__caret el-icon-circle-close"
        @click="handleIconClear"
        v-show="clearable && filterText"
      ></i>
    </el-input>
    <div class="select-content" :class="(!isSelect && isShow) ? 'is-show' : ''" v-show="isShow">
      <!-- <el-scrollbar class="custom-tree-select--scrollbar" :class="{ 'is-list': !status }" :style="{ width }" v-show="!isSelect && status">
        <el-tree
          class="filter-tree"
          :data="dataTree"
          :props="{ label: 'label', value: 'id' }"
          @node-click="handleNodeClick"
          :load="loadNode"
          node-key="id"
          lazy
          ref="tree"
          :default-expand-all="defaultExpandAll"
        ></el-tree>
      </el-scrollbar> -->
      <ul v-show="!status" class="network-select"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="false"
        infinite-scroll-distance="10"
        :infinite-scroll-immediate-check="false"
      >
        <li
          :class="{active: item.name === filterText}"
          v-for="item in list"
          :key="item.id"
          :title="item.name"
          @click="handleNodeClickForList(item)"
        >{{ handleName(item) }}</li>
        <li class="network-select-empty" v-show="!list || !list.length">{{ emptyText }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import create from '../../core/create'
import props from '../../core/common/props.js'
import event from '../../core/common/event.js'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import fetch,{ RESPONSE_CODE, GATEWAY } from '../../utils/axios'
import debounce from 'lodash/debounce'

const CURRENT = 1 // 页码
const SIZE = 10 // 每页数量

export default create({
  name: 'network',
  mixins: [props(), event()],
  props: {
    //  是否查询所有 @void
    isAll: {
      type: Boolean,
      default: false
    },
    //  是否只显示下拉搜索
    isSelect: {
      type: Boolean,
      default: true
    },
    // 使用当前用户登录的网点信息
    useCurNetworkInfo: {
      type: Boolean,
      default: false
    },
    // 树形数据接口url参数
    treeQuery: {
      type: Object,
      default: () => {}
    },
    // 树形数据接口url参数
    remoteQuery: {
      type: Object,
      default: () => {}
    },
    // 条件查询接口url参数
    // dicQuery: {
    //   type: Object,
    //   default: null
    // },
    // 树形数据接口地址
    treeUrl: {
      type: String,
      default: GATEWAY.BAS + '/network/getFirstLevelNetworks'
    },
    // 条件查询接口地址
    remoteUrl: {
      type: String,
      default: GATEWAY.BAS + '/network/select'
    },
    // 条件查询接口地址
    remoteAllUrl: {
      type: String,
      default: GATEWAY.BAS + '/network/select/all'
    },
    // 默认样式
    width: {
      type: String,
      default: ''
    },
    // // 输入框头部图标
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
    // queryLevel 3 当前及以下  2 当前及同级机构
    queryLevel: {
      type: String,
      default: '1'
    },
    // 输入时是否触发表单的校验
    validateEvent: {
      type: Boolean,
      default: true
    },
    // 默认
    autofocus: {
      type: Boolean,
      default: false
    },
    // 默认展开所有
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 清除按钮
    clearable: {
      type: Boolean,
      default: true
    },
    // 清除时使用弹窗方式
    useClearMessage: {
      type: Boolean,
      default: false
    },
    // 全部清除前的回调
    beforeClearAll: {
      type: Function,
      default: () => true
    },
    // 选中之后回调
    afterSelect: {
      type: Function,
      default: () => true
    },
    // 防抖时间
    delay: {
      type: Number,
      default: 1000
    },
    loadingText: {
      type: String,
      default: ''
    },
    // 过滤数据
    filterData: {
      type: Object,
      default: () => {
        return {
          isNot: false, // 条件是否取反
          key: 'id', // 过滤唯一字段
          data: [] // 过滤数据
        }
      }
    },
    // 清除的弹窗的提示信息
    clearMessageInfo: {
      type: Object,
      default() {
        return {
          title: '温馨提示',
          content: '此操作将会清空之前的权限, 是否继续?'
        }
      }
    }
  },
  computed: {
    user() {
      return this.$store?.state.base.user
    },
    select() {
      const value = this.valueObj ? this.text : this.text[this.valueKey]
      return value
    },
    treeQuerys() {
      return { ...this.treeQuery }
    },
    remoteQuerys() {
      return { ...this.remoteQuery }
    },
    defaultSelectDic() {
      return [...(this.selectDic || [])]
    },
    // filterText() {
    //   console.log(2222, this.text ? this.text[this.labelKey] : '');
    //   return this.text ? this.text[this.labelKey] : ''
    // }
    emptyText() {
      if (this.loading) {
        return this.loadingText || '查询中...'
      } else {
        return this.noData ? '无数据' : ''
      }
    },
    filterDatas() {
      return { ...this.filterData }
    }
  },
  data() {
    return {
      isShow: false, // 列表的显隐状态
      loading: false, // 列表的显隐状态
      status: false, // 列表的激活状态状态-tree列表|list的状态切换
      selectText: '', // 选中的值
      filterText: '',
      selectRow: {}, // 选中的行数据
      list: [], // 列表
      scrollDisabled: false, // 列表加载状态
      dataTree: [], // 树形数据源
      propsDefault: {
        id: 'id',
        label: 'name',
        value: 'id',
        children: 'children',
        disabled: 'disabled'
      }
    }
  },
  watch: {
    // 名称过滤
    // text(val) {
    //   console.log('text', val);
    //   console.log('select', this.select);
    //   this.filterText = val[this.labelKey]
    // },
    selectDic: {
      handler(arr) {
        forEach(arr, opt => {
          if (!this.inNetDic(opt)) {
            if (this.text) this.selectRow = opt
            this.list.push({ ...opt, label: this.handleName(opt) })
          }
        })
      },
      deep: true
    },
    // filterText (val) {
    //   this.$refs.tree.filter(val);
    // }
    value: {
    // eslint-disable-next-line no-unused-vars
      handler(val) {
        this.initVal() // 监听并重新初始化数据
        this.init()
        if (typeof this.change === 'function' && this.props.watchChange) {
          this.change({ valueObj: this.selectRow, column: this.column });
        }
      },
      immediate: false
    }
  },
  created() {
    // 给输入框添加原生keyup监听防抖
    this.debouncedOnInputChange = debounce(e => {
      this.handleInput(e.target.value)
    }, this.delay)
  },
  mounted() {
    this.initParams()
    this.initVal() // 监听并重新初始化数据
    this.init()
  },
  methods: {
    // 初始化参数
    initParams() {
      this.current = CURRENT
      this.total = null
      this.inputValue = ''
    },
    clickOut() {
      this.isShow = false
    },
    init() {
      const text = this.text
      console.log('init selectText text', this.selectText, this.text)
      if (this.validatenull(text)) {
        this.filterText = ''
        this.selectRow = {}
      } else {
        if (typeof text === 'number' || typeof text === 'string') {
          // 处理是否默认字典的网点
          const defaultNetwork = this.defaultSelectDic.find(item => item[this.valueKey] === text)
          if (defaultNetwork) {
            // 重置默认值
            this.selectRow = defaultNetwork
            this.filterText = this.selectText = this.handleName(defaultNetwork)
            return
          }
          // 处理是否匹配当前选中节点
          if (this.selectRow[this.valueKey]) this.filterText = this.selectText = this.handleName(this.selectRow)
          else {
            // 非当前选中节点
            const list = [...this.selectDic]
            const obj = list.find((item) => item[this.valueKey] === text)
            if (obj) {
              this.filterText = this.selectText = this.handleName(obj)
            } else {
              if (!this.filterText) this.filterText = this.selectText = text
            }
          }
        } else {
          this.filterText = this.selectText = this.handleName(text)
        }
      }
    },
    // 处理name
    handleName(item) {
      let result = this.getLabelText(item)
      if (item.code) result += '|' + item.code // 兼容处理后台未返回code
      return result
    },
    // 过滤tree返回的数据
    filterTreeData(data = []) {
      const filterInfo = this.filterDatas
      if (filterInfo.data.length > 0) {
        const key = new Set(filterInfo.data)
        data = data.filter(v => filterInfo.isNot ? key.has(v[filterInfo.key]) : !key.has(v[filterInfo.key]))
        this.noData = this.current === 1 && !data.length
      }
      return data.map(({ children = [], name, ...item } = {}) => ({ name: this.getLabelText({ name, ...item }), label: this.handleName({ name, ...item }), children, ...item }))
    },
    // 获取tree树形数据
    async getTreeList(paramsObj) {
      const { id, level } = paramsObj
      const params = { level }
      const { networkId } = this.user
      // 使用当前用户的网点信息
      if (this.useCurNetworkInfo) {
        const { networkId } = this.user
        Object.assign(params, { networkId })
      }
      // 首次加载树
      if (level === 1) {
        // 使用当前用户的网点信息
        Object.assign(params, { id: networkId })
      } else {
        // 如果是子节点则忽略默认参数中的id
        Object.assign(params, { id })
      }
      // 使用自定义参数
      const keys = this.treeQuerys ? Object.keys(this.treeQuerys) : ''
      if (keys.length > 0) {
        Object.assign(params, this.treeQuerys)
      }
      params.queryLevel = params.queryLevel || '1'
      // 使用自定义参数
      const { code, msg, data } = await fetch.get(this.treeUrl, { params })
      // 数据处理
      if (code === RESPONSE_CODE.SUCCESS) {
        if (data) {
          // console.log(444, this.filterTreeData(data));
          return this.filterTreeData(data)
        }
      } else {
        this.$message.error(msg)
      }
    },
    // 列表数据（名称模糊查询）
    async getListByName(name = '') {
      this.inputValue = name
      this.loading = true
      const params = { current: this.current, size: SIZE, name }
      // 使用当前用户的网点信息
      if (this.useCurNetworkInfo) {
        const { networkId } = this.user
        Object.assign(params, { networkId })
      }
      // 使用自定义参数
      if (this.remoteQuerys) Object.assign(params, this.remoteQuerys)
      params.queryLevel = params.queryLevel || '3'
      // 调用接口
      if (this.props.withoutContract) {
        params.typeIds = [
          this.$constant.NT_HEADQUARTERS,
          this.$constant.NT_AGENT_AREA,
          this.$constant.NT_FIRST_LEVEL,
          this.$constant.NT_SECOND_LEVEL
        ]
      }
      // 有可能查询参数的值是 数组或对象 所以要用 qs.stringify() 方法解析
      const reqUrl = this.useCurNetworkInfo ? this.remoteUrl : this.remoteAllUrl
      const { code, msg, data } = await fetch.get(reqUrl, { params })
      this.loading = false
      // 数据处理
      if (code === RESPONSE_CODE.SUCCESS) {
        const { current = this.current, pages, records } = data || {}
        if (data && records) {
          this.noData = false
          if (current === 1 && !records.length) {
            this.noData = true
          }
          // this.current = current
          this.total = pages
          const list = this.filterTreeData(records)
          this.$nextTick(() => {
            this.list = [...this.list, ...list]
          })
          if (pages > current) this.scrollDisabled = true
        }
      } else {
        this.$message.error(msg)
      }
    },
    // 列表-分页加载
    // eslint-disable-next-line no-unused-vars
    loadMore(e) {
      if (this.loading) return
      this.current++
      if (this.current > this.total) return
      this.getListByName(this.inputValue)
    },
    // tree懒加载事件
    async loadNode(node, resolve) {
      // 0级-初始化数据
      if (node.level === 0) {
        const data = (await this.getTreeList({ id: 0, level: this.useCurNetworkInfo ? 1 : 2 })) || []
        return resolve(data)
      } else {
        // 节点数据
        const data = (await this.getTreeList({ id: node.key, node, level: 2 })) || []
        return resolve(data)
      }
    },
    // 监听icon点击事件
    // eslint-disable-next-line no-unused-vars
    handleIconClick(e) {
      if (this.disabled) {
        return
      }
      this.status = true
      this.isShow = !this.isShow
    },
    // 监听input框获取焦点事件
    handleFocus(e) {
      console.log('handleFocus')
      if (e.target.value) {
        this.status = false
      } else {
        this.status = true
      }
      this.isShow = true
    },
    // 恢复选中的值
    restoreSelectText() {
      this.filterText = this.text ? this.selectText : ''
    },
    handleBlur() {
      if (!this.filterText || this.filterText !== this.selectText) this.restoreSelectText()
    },
    // 监听input的input事件
    handleInput(val) {
      this.noData = false
      // this.filterText = val
      if (val) {
        this.status = false
      }
      // 重置分页信息
      this.current = CURRENT
      this.scrollDisabled = false
      this.$nextTick(() => {
        this.list = []
      })
      this.getListByName(val)
      const state = this.beforeClearAll()
      if (!state && !this.filterText) {
        this.handleClearCofirm()
      }
    },
    // 清空按钮事件监听
    handleIconClear() {
      if (this.disabled) {
        return
      }
      // 获取清除之前的回调
      const state = this.beforeClearAll()
      if (state) {
        this.handleClear()
      } else {
        this.handleClearCofirm()
      }
    },
    // 清除并执行回调
    handleClear() {
      this.restForm()
      if (typeof this.clear === 'function') {
        this.clear({ valueObj: this.text, column: this.column });
      }
      if (typeof this.change === 'function' && !this.props.watchChange) {
        this.change({ valueObj: this.selectRow, column: this.column });
      }
    },
    // tree节点过滤
    filterNode(value, data) {
      if (!value) return true
      return data[this.labelKey].indexOf(value) !== -1
    },
    handleSelectCofirm(succes) {
      const { title = '', content = '' } = this.clearMessageInfo // 获取弹窗内容信息
      this.$confirm(content, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        iconClass: 'el-icon-warning-outline',
        confirmButtonClass: 'comfirm-btn',
        type: 'warning'
      })
    // eslint-disable-next-line no-unused-vars
        .then(val => {
          succes()
        })
        .catch(err => console.log(err))
    },
    // 树形节点被点击事件监听
    handleNodeClick(row) {
      this.text = row
      this.selectRow = row
      this.selectText = row.name
      this.handleEmit(row.name)
      this.isShow = false
      // this.afterSelect(this.text)
    },
    // 列表节点被点击事件监听
    handleNodeClickForList(row) {
      console.log(this.selectRow, row)
      // 选中的是同一个节点的话，不执行后续操作
      if (this.selectRow[this.valueKey] === row[this.valueKey]) {
        this.isShow = false
        return
      }
      this.text = this.valueObj ? row : row[this.valueKey]
      this.selectRow = row
      // 关闭下拉列表
      this.status = true
      this.isShow = false
      this.selectText = row.name
      this.handleEmit(row.name)
      // 触发父组件input事件
      // this.$emit('input', this.select)
      // this.$emit('change', this.select)
      // this.afterSelect(this.text)
    },
    // 获取整个树形数据
    getTreeData() {
      return this.dataTree
    },
    // resetFields
    restForm() {
      console.log('restForm selectText', this.selectText)
      // this.filterText = ''
      this.selectRow = {}
      this.filterText = this.selectText = ''
      this.text = this.valueobj ? {} : ''
      this.$emit('input', this.text)
      this.$emit('change', this.text)
      // if (typeof this.change === 'function') {
      //   this.change({ valueObj: {}, column: this.column });
      // }
    },
    inNetDic(item) {
      if (this.validatenull(item[this.valueKey])) return true
      return !!find(this.list, o => o[this.valueKey] === item[this.valueKey])
    },
    handleChange(keyWords) {
      console.log(keyWords);
      // this.handleEmit(keyWords)
    },
    handleEmit(val = '') {
      // console.log('handleEmit text val', this.text, val)
      if (this.text) {
        this.filterText = val
        this.$emit('input', this.text)
        this.$emit('change', this.text)
        if (typeof this.change === 'function' && !this.props.watchChange) {
          this.change({ valueObj: this.selectRow, column: this.column });
        }
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
      // this.loadNode({ level: 0 }, () => {})
    },
    // 清除弹窗处理
    handleClearCofirm(clear, cancel) {
      const { title = '', content = '' } = this.clearMessageInfo // 获取弹窗内容信息
      // 使用清除按钮弹窗
      if (this.useClearMessage) {
        this.$confirm(content, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          iconClass: 'el-icon-warning-outline',
          confirmButtonClass: 'comfirm-btn',
          type: 'warning'
        })
    // eslint-disable-next-line no-unused-vars
          .then(val => {
            this.handleClear()
          })
          // 取消
          .catch(err => {
            this.restoreSelectText()
            if (typeof cancel === 'function') cancel()
            console.log(err)
          })
      } else {
        if (typeof cancel === 'function') clear()
      }
    }
  }
})
</script>

<style lang="css">

</style>
