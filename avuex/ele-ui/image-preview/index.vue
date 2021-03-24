<template>
  <div :class="b()" v-show="isShow">
    <div :class="b('mask')">
      <div class="pre view-btn" @click="pre" v-if="datas.length > 1">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="next view-btn" @click="next" v-if="datas.length > 1">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="close view-btn" @click="isShow = false">
        <i class="el-icon-circle-close"></i>
      </div>
    </div>
    <div :class="b('box')" :style="previewStyle" v-loading="changeing">
      <img ref="img" hidden :src="datas[index]"/>
      <el-image :src="datas[index]" @load="initStyle" v-show="!changeing"></el-image>
    </div>
  </div>
</template>
<script>
import create from '../../core/create'
export default create({
  name: 'image-preview',
  data() {
    return {
      isShow: false,
      datas: [],
      index: 0,
      onClose: null,
      changeing: false,
      width: 200,
      height: 200
    }
  },
  watch: {
    isShow() {
      if (!this.isShow) {
        this.close()
        this.width = 200
        this.height = 200
      }
    }
  },
  mounted() {},
  computed: {
    previewStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    }
  },
  methods: {
    pre() {
      this.index--
      if (this.index === -1) {
        this.index = this.datas.length - 1
      }
    },
    next() {
      this.index++
      if (this.index === this.datas.length) {
        this.index = 0
      }
    },
    // eslint-disable-next-line no-unused-vars
    initStyle(e) {
      this.changeing = true
      let width = this.$refs.img.width
      let height = this.$refs.img.height
      if (width > 800 || height > 800) {
        const percent = Math.max(width, height) / 800
        width = width / percent
        height = height / percent
      }
      this.width = width
      this.height = height
      setTimeout(() => {
        this.$refs.img.style.width = '100%'
        this.changeing = false
      }, 10)
    },
    close() {
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    }
  }
})
</script>
