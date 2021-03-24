<!--
 * @Description: 动态列配置弹窗
 * @Author: xujian
 * @Date: 2019-10-14 11:47:42
 -->
<template>
  <div class="drag-column" v-if="isShowDrayg">
    <div class="dc-modal">
      <div class="dc-top">
        <div class="dct-top">
          <div class="dctt-select">已选数据源<span>({{list1.length}})</span></div>
          <div class="dctt-btn">
            <el-button size="mini" class="dcttb-btn" @click="hideModal" type="info">关闭</el-button>
            <el-button size="mini" class="dcttb-btn" :loading="keyBtn" @click="setCustomColumn" type="primary">保存</el-button>
          </div>
        </div>
        <div class="dct-drag" v-if="list1.length" ref="dragTop">
          <draggable :draggable="list1.length !== 1 ? '.dctd-list' : ''" @drop="drop" tag="div" v-model="list1" v-bind="dragOptions"
            @start="start" @end="end">
            <transition-group type="transition" name="flip-list">
              <div class="dctd-list" ref="topList" @click.stop="drop" v-for="element in list1" :key="element.name">
                <div class="dctdl-item animated" :class="element.isShow ? 'bounceInDownDefault bounceInDown': ''">
                  <el-tooltip v-if="calcStrLen(element.column) > 14 && isShowToolTip" :content="element.column" placement="top">
                    <div class="dctdli-text">{{ element.column }}</div>
                  </el-tooltip>
                  <template v-else>
                    <div class="dctdli-text">{{ element.column }}</div>
                  </template>
                  <div class="dctdli-x" @click="delcolumn(element.name, $event);">
                    <i class="el-icon-close"></i></div>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="dct-drag" v-else>
          <div class="dctd-modal"> <i class="el-icon-loading"></i></div>
        </div>
      </div>

      <div class="dc-bottom" ref="bottomBox">
        <div class="dct-top">
          <div class="dctt-tip">选择数据源（可向上拖动数据参数）</div>
          <div class="dctt-right">
            <div class="dctt-all" @click="setAllColumn">应用全部</div>
            <div class="dctt-default" @click="setReset">恢复默认</div>
            <el-input class="dcb-input" :disabled="disabled" clearable @input="inputPurchaseCount" placeholder="搜索数据源"
              v-model="searchInput">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </div>
        <div class="dct-drag" v-if="list2.length">
          <draggable tag="div" :draggable="isShowToolTip ? '.dctd-list' : ''" :class="isSetAll ? 'animated bounceInUp' : ''" @start="start" @end="end" v-bind="dragOptions" :list="list2"
            :sort="false">
            <transition-group type="transition" name="flip-list">
              <div class="dctd-list" @click="moveToTop(element.name, $event);" v-for="element in list2" :key="element.name">
                <div class="dctdl-item animated2" :class="element.isShow ? 'bounceInDownDefault bounceInDown': ''">
                  <el-tooltip v-if="calcStrLen(element.column) > 14  && isShowToolTip" :content="element.column" placement="top">
                    <div class="dctdli-text">{{ element.column }}</div>
                  </el-tooltip>
                  <template v-else>
                    <div class="dctdli-text">{{ element.column }}</div>
                  </template>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="dct-drag" v-else>
          <div class="dcd-null" v-if="isSearch">{{'暂无数据'}}</div>
          <div class="dcd-null" v-else>{{'数据源已用完'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import fetch, { RESPONSE_CODE } from '../../utils/axios'
export default {
  name: 'DragColumn',
  props: {
    dynamicColumns: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    defaultUrl: {
      type: String,
      default: () => {
        return `/omsBase/getDefaultColumn`
      }
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      list1: [],
      list2: [],
      isShowDrayg: false,
      searchInput: '',
      isShow: true,
      currentList2: [],
      keyBtn: false,
      isSetAll: false,
      isSearch: true,
      disabled: false,
      isClicked: false,
      isShowToolTip: true
    }
  },
  created() {
    // for (const item of this.dynamicColumns) {
    //   if (item.show) {
    //     this.list1.push(item);
    //   } else {
    //     this.list2.push(item);
    //   }
    // }
    // this.currentList2 = this.list2;
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'people',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  watch: {},
  methods: {
    calcStrLen(str) {
      return str.replace(/[\u0391-\uFFE5]/g, 'aa').length
    },
    addDrag() {
      setTimeout(() => {
        this.isShowToolTip = false
      }, 100)
    },
    drop(e) {
      setTimeout(() => {
        this.isShowToolTip = true
      }, 100)
      if (this.list1.length === 1) return
      e.stop
    },
    start() {
      console.log(' @start="start" @end="end"')
      this.isDragging = true
      this.isShowToolTip = false
    },
    end() {
      console.log(' @start="start" @end="end"')
      this.isDragging = false
      setTimeout(() => {
        this.isShowToolTip = true
      }, 100)
    },
    openDialog() {
      this.isShowDrayg = true
      this.list1 = []
      this.list2 = []
      this.searchInput = ''
      for (const item of this.dynamicColumns) {
        if (item.show) {
          this.list1.push(item)
        } else {
          this.list2.push(item)
        }
      }
      this.currentList2 = [...this.list2]
    },
    // 关闭弹窗
    hideModal() {
      this.isShowDrayg = false
    },
    // 点击到已选数据源
    moveToTop(name, event) {
      const { x, y } = event
      if (this.isClicked) return
      this.isClicked = true
      const { offsetLeft, offsetTop } = this.$refs.topList[this.$refs.topList.length - 1]
      for (const [index, item] of this.list2.entries()) {
        if (item.name === name) {
          const curentIndex = index + 1
          item.isShow = true
          let leftW = parseInt(offsetLeft) - x + 400
          let topH = parseInt(offsetTop) - y + 180
          const len = this.list1.length + 1
          if (curentIndex % 6 === 0 && (len % 6 === 0 || (len - 1) % 6 === 0)) {
            leftW = 0
          }
          if (curentIndex === parseInt(curentIndex / 6) * 6 + 1) {
            leftW = leftW > 0 ? leftW : -leftW
          }
          if (topH > 0) topH = -topH
          this.runkeyframesFn2(leftW, topH)
          this.$set(this.list2, index, item)
        }
      }
      setTimeout(() => {
        this.isClicked = false
        for (const [index, item] of this.list2.entries()) {
          if (item.name === name) {
            item.isShow = false
            this.list1.push(item)
            this.list2.splice(index, 1)
          }
        }
        this.currentList2 = this.deepClone(this.currentList2.filter(item => item.name !== name))
        // const obj = this.list2.find(item => item.name === name);
        // if (obj) obj.isShow = false;
        // this.list2 = this.list2.filter(item => item.name !== name);
        // this.list1.push(obj);
        setTimeout(() => {
          this.$refs.dragTop.scrollTop = 100000
        }, 0)
        if (!this.list2.length) {
          this.disabled = false
          this.isSearch = false
        }
      }, 300)
    },
    // 动态插入样式
    runkeyframesFn(leftW, topH) {
      const runkeyframes = ` @keyframes bounceInDown{
        to {
          -webkit-animation-timing-function: cubic-bezier(0.1, 0.2, 0.3, 0.5);
          animation-timing-function: cubic-bezier(0.1, 0.2, 0.3, 0.5);
          opacity: 1;
        }
        to {
          -webkit-transform: translate(${leftW}px, ${topH}px);
          transform: translate(${leftW}px, ${topH}px);
        }
      }`
      // 创建style标签
      const style = document.createElement('style')
      // 设置style属性
      style.type = 'text/css'
      // 将 keyframes样式写入style内
      style.innerHTML = runkeyframes
      // 将style样式存放到head标签
      document.getElementsByTagName('head')[0].appendChild(style)
    },
    runkeyframesFn2(leftW, topH) {
      const runkeyframes = ` @keyframes bounceInDown{
        to {
          -webkit-animation-timing-function: cubic-bezier(0.1, 0.2, 0.3, 0.4, 0.5);
          animation-timing-function: cubic-bezier(0.1, 0.2, 0.3, 0.4, 0.5);
          opacity: 1;
        }
        to {
          -webkit-transform: translate(${leftW}px, ${topH}px);
          transform: translate(${leftW}px, ${topH}px);
          opacity: 0;
        }
      }`
      // 创建style标签
      const style = document.createElement('style')
      // 设置style属性
      style.type = 'text/css'
      // 将 keyframes样式写入style内
      style.innerHTML = runkeyframes
      // 将style样式存放到head标签
      document.getElementsByTagName('head')[0].appendChild(style)
    },
    getOffset(el) {
      el = el.getBoundingClientRect()
      return {
        offsetLeft: el.left + window.scrollX,
        offsetTop: el.top + window.scrollY
      }
    },
    // 删除选中的
    delcolumn(name, event) {
      if (this.list1.length === 1) {
        return this.$message({
          type: 'error',
          message: '最少保留一条已选数据'
        })
      }
      const { x, y } = event
      // console.log("this.$refs.bottomBox", this.$refs.top);
      const { offsetLeft, offsetTop } = this.getOffset(this.$refs.bottomBox)
      for (const [index, item] of this.list1.entries()) {
        if (item.name === name) {
          item.isShow = true
          const leftW = parseInt(offsetLeft) - x + 171
          const topH = parseInt(offsetTop) - y + 60
          this.runkeyframesFn(leftW, topH)
          this.$set(this.list1, index, item)
        }
      }
      setTimeout(() => {
        const obj = this.list1.find(item => item.name === name)
        if (obj) obj.isShow = false
        this.list1 = this.list1.filter(item => item.name !== name)
        this.currentList2.unshift(obj)
        if (this.searchInput) {
          const list = []
          for (const item of this.currentList2) {
            if (item.column.includes(this.searchInput)) list.push(item)
          }
          this.list2 = list
        } else {
          this.list2.unshift(obj)
        }
        this.disabled = false
      }, 300)
    },
    // 请求接口数据
    setCustomColumn() {
      this.keyBtn = true
      this.list2 = this.currentList2.filter(item => !this.list1.includes(item))
      this.list1.map(item => (item.show = true))
      this.list2.map(item => (item.show = false))
      const columnList = [...this.list1, ...this.list2]
      this.$parent
        .setCustomColumn({ columnList })
    // eslint-disable-next-line no-unused-vars
        .then(res => {
          this.keyBtn = false
          this.hideModal()
        })
    // eslint-disable-next-line no-unused-vars
        .catch(data => {
          this.keyBtn = false
          this.hideModal()
        })
    },
    // 应用全部
    setAllColumn() {
      this.isSetAll = true
      this.isSearch = false
      setTimeout(() => {
        this.isSetAll = false
        this.list1 = [...this.list1, ...this.list2]
        if (this.searchInput) {
          this.list2 = this.currentList2.filter(item => !this.list2.includes(item))
          this.currentList2 = [...this.list2]
        } else {
          this.list2 = []
          this.currentList2 = []
        }
        this.searchInput = ''
        if (!this.list2.length) this.disabled = true
      }, 100)
    },
    // 恢复默认
    async setReset() {
      const msgcode = this.$parent.tableOption.dynamicOptions.params.code
      this.list1 = []
      this.list2 = []
      this.disabled = false
      const { code, data, msg } = await fetch.get(`${this.defaultUrl}?code=${msgcode}`)
      if (code === RESPONSE_CODE.SUCCESS) {
        this.searchInput = ''
        for (const item of data) {
          if (item.show) {
            this.list1.push(item)
          } else {
            this.list2.push(item)
          }
        }
        this.currentList2 = [...this.list2]
      } else {
        this.$message({ type: 'error', message: msg })
      }
    },
    inputPurchaseCount() {
      this.isSearch = true
      if (this.searchInput) {
        const list = []
        for (const item of this.currentList2) {
          if (item.column.includes(this.searchInput)) list.push(item)
        }
        this.list2 = list
      } else {
        this.list2 = this.currentList2
      }
    }
  }
}
document.body.ondrop = function(event) {
  event.preventDefault()
  event.stopPropagation()
}
</script>
<style scoped>

</style>
