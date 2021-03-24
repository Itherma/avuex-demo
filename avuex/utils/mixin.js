
// eslint-disable-next-line no-unused-vars
import fetch, { RESPONSE_CODE, GATEWAY } from './axios'
import { saveAs } from 'save-as'
import XLSX from 'xlsx'


export default {
  data() {
    return {
      COM_HTTP: {},
      SELF_ROUTER_NAME: '',
      MODULE_ROUTER: {},
      selectedRows: [], // 当前选中行（复选框）
      loading: false, // 加载控制
      exportLoading: false, //  导出
      isShowFirst: true, // 是否一开始加载表格数据
      usePagination: true, // 是否需要分页
      page: {
        current: 1,
        size: 20,
        total: 0
      }, // 对应的分页
      tableList: [], // 表格列表数据
      delTipMsg: '确认删除该条信息？', // 删除提示语
      IdKey: 'id', // 当是编辑时-路由带的参数id
      dialogWidth: '', // 判断当前弹窗是多少列 现在我们规定时间三列或者四列
      userInfo: {}, // 用户信息-没用到 关于用户信息可用下面computed方法 this.user即是用户信息
      useFilterEmptyParam: false, // 是否使用过滤空参数 默认为false-不过滤，可在组件内重新定义覆盖此字段
      timer: null, // 1秒延迟的定时器实例
      registerExportform: {// 导出任务注册参数
        // jobName: `${this.$route?.meta.title}${this.$common.formatDate(null, 'YYYYMMDDHHmmss')}`
      },
      exportIgnoreColumns: []
    }
  },
  // 缓存组件-进入页面的钩子
  activated() {
  },
  // 一路由多列表 配置 SELF_ROUTER_NAME 原参数刷新
  watch: {
    '$route.name': {
      handler(name) {
        if (name && name === this.SELF_ROUTER_NAME) {
          this.searchFun()
        }
        this.$message.closeAll()
      }
    }
    // '$route.query'(nval, oval) {
    //   this.moduleName = handleRouteName(this.$route?.name, nval)
    // }
  },
  computed: {
  },
  mounted() {
    if (this.isShowFirst) {
      this.$nextTick().then(() => {
        this.searchFun()
      })
    }
  },
  created() {
    this.initMixinParams()
    this.witdhLisener()
  },
  deactivated() {
    clearTimeout(this.timer)
  },
  methods: {
    // 获取弹窗宽度
    witdhLisener() {
      this.isWideScreen = matchMedia('(max-width: 1440px)')
      this.widthChange(this.isWideScreen)
      // 监听窗口宽度事件（组件销毁后需移除）
      this.isWideScreen.addListener(this.widthChange)
    },
    widthChange(x) {
      this.dialogWidth = x.matches ? '720px' : '940px' // 小于1440 : 大于1440
    },
    // 初始化mixin的参数
    initMixinParams() {
      this.canUsePrevListParam = false // 是否记录列表的表单参数
      this.prevListParams = {} // 前一次搜索组件的表单参数
    },
    // 混入自定义增加参数
    setAddParams(params) { // avue新增时候 可以加入自定义参数
      return params
    },
    // 混入自定义查询参数
    setSearchParams(params) { // avue查询时候 可以加入自定义参数
      return params
    },
    // 混入自定义修改状态参数
    setEnableParams(params) { // 以前的业务类型 现在基本用不上(以前的禁用启用，在表格中显现)
      return params
    },
    // 查询成功之后调用
    searchAfterFun() { }, // 查询成功调用的方法
    // 新增tab页面
    rowAdd() { // 自定义新增调用方法
      this.$router.push(this.MODULE_ROUTER.addRouter)
    },
    // 自定义编辑调用方法
    rowEdit(row) {
      console.log(row);
    },
    // 自定义查看tab页面
    rowView(row) {
      console.log(row);
    },
    // avue-新增方法
    async addFun(item, done, loading) {
      if (this.addBeforeCallback()) {
        const setp = this.setAddParams({})
        const newParams = Object.assign(setp, item)
        const res = await this.COM_HTTP.reqAdd(newParams)
        loading && loading()
        if (res.code === RESPONSE_CODE.SUCCESS) {
            this.$message.success(res.msg)
            this.searchFun()
            done()
            this.addCallback()
        } else {
          this.$message.error(res.msg)
          // done() //去掉关闭
        }
      } else {
        loading()
      }
    },
    // avue-新增方法副本，修复setAddParams无效
    async addFunCopy(item, done, loading) {
      if (this.addBeforeCallback()) {
        const setp = this.setAddParams({})
        const newParams = Object.assign(item, setp)
        const res = await this.COM_HTTP.reqAdd(newParams)
        loading && loading()
        if (res.code === RESPONSE_CODE.SUCCESS) {
            this.$message.success(res.msg)
            this.searchFun()
            done()
            this.addCallback()
        } else {
          this.$message.error(res.msg)
          // done() //去掉关闭
        }
      } else {
        loading()
      }
    },
    // 新增前事件
    addBeforeCallback() {
      return true
    },
    // 新增后回调方法
    addCallback() { },
    // 编辑前事件
    eidtBeforeCallback() {
      return true
    },
    // 编辑后回调方法
    eidtCallback() { },
    // avue-保存并新增下一条 对应属性 saveCreate: true
    async saveCreate(form, clean, loading) {
      this.addFun(form, clean, loading)
    },
    // avue-编辑方法
    async updateFun(item, index, done, oldFormData, loading) {
      if (this.eidtBeforeCallback()) {
        const setp = this.setAddParams({})
        const newParams = Object.assign(setp, item)
        const params = { newData: newParams, oldData: oldFormData }
        const res = await this.COM_HTTP.reqUpdate(params)
        loading()
        if (res.code === RESPONSE_CODE.SUCCESS) {
          // 延时1秒后关闭弹窗
            this.$message.success(res.msg)
            this.searchFun()
            done()
            this.eidtCallback()
        } else {
          this.$message.error(res.msg)
        }
      } else {
        loading()
      }
    },
    // avue-编辑方法
    async updateFunNew(item, index, done, oldFormData, loading) {
      if (this.eidtBeforeCallback()) {
        const setp = this.setAddParams({})
        const newParams = Object.assign(setp, item)
        const params = { ...newParams }
        const res = await this.COM_HTTP.reqUpdate(params)
        loading()
        if (res.code === RESPONSE_CODE.SUCCESS) {
          // 延时1秒后关闭弹窗
            this.$message.success(res.msg)
            this.searchFun()
            done()
            this.eidtCallback()
        } else {
          this.$message.error(res.msg)
        }
      } else {
        loading()
      }
    },
    // avue-编辑方法副本，修复setAddParams返回参无法覆盖
    async updateFunCopy(item, index, done, oldFormData, loading) {
      if (this.eidtBeforeCallback()) {
        const setp = this.setAddParams({})
        const newParams = Object.assign(item, setp)
        console.log('编辑要保存数据', newParams)
        const params = { newData: newParams, oldData: oldFormData }
        const res = await this.COM_HTTP.reqUpdate(params)
        loading()
        if (res.code === RESPONSE_CODE.SUCCESS) {
          console.log('是这个方法吗')
          // 延时1秒后关闭弹窗
            this.$message.success(res.msg)
            this.searchFun()
            done()
            this.eidtCallback()
        } else {
          this.$message.error(res.msg)
        }
      } else {
        loading()
      }
    },
    // 删除提示弹窗前置方法
    beforeDelteView() { },
    // avue-删除提示弹窗
    async deleteView(row, index) {
      this.beforeDelteView(row)
      const delTipMsg = this.customDelMsg || this.delTipMsg || ''
      this.$confirm(delTipMsg, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning',
        confirmButtonClass: 'comfirm-btn',
        iconClass: 'el-icon-warning-outline',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            // 保存改弹窗的实例/回调到当前vue实例，用于后续关闭弹窗
            this.delConfirmInstance = instance
            this.delConfirmDone = done
            // 开始删除
            this.deleteFun(row, index)
          } else {
            done()
          }
        }
      })
        .then(() => {
        })
        .catch(() => { })
    },
    // 删除方法
    async deleteFun(item, index) {
      try {
        const res = await this.COM_HTTP.reqDel(item)
        if (res.code === RESPONSE_CODE.SUCCESS) {
          // 延时1秒后关闭弹窗
            // 处理表格当前有且仅有一行数据，且删除此行数据
            const current = this.page.current
            const len = (this.tableList || []).length
            // 数据长度为1，删除行的索引为0，当前页码非第一页
            if (len === 1 && index === 0 && current > 1) {
              this.page.current = current - 1
            }
            this.closeDelModal()
            this.$message.success(res.msg)
            this.searchFun()
            this.$emit('delete', item)
        } else {
          this.$message.error(res.msg)
          this.closeDelModal()
        }
      } catch (error) {
        this.closeDelModal()
      }
    },
    closeDelModal() {
      this.delConfirmInstance.confirmButtonLoading = false
      this.delConfirmDone()
    },
    // avue配置的prop包含range的属性处理(已经废弃-以前时间控件处理方法)
    rangHandle(params) {
      const nParams = {}
      // 处理时间段的参数 数组变为两个参数  StartTime 和 EndTime  写prop时就可以 xxx|range
      Object.entries(params).forEach(([key, val]) => {
        const flag = '|range'
        if (!this.validatenull(val)) {
          if (key.includes(flag)) {
            const [first, second] = val
            const str = key.replace(flag, '')
            const startName = str ? str + 'StartTime' : 'startTime'
            const endName = str ? str + 'EndTime' : 'endTime'
            nParams[startName] = first
            nParams[endName] = second
          } else {
            nParams[key] = val
          }
        }
      })
      return nParams
    },
    // 列表查询参数处理
    searchFunParamsHandle(params) {
      let param = {} // 接口参数
      if (this.canUsePrevListParam) {
        if (this.page.current !== this.prevListParams.current) {
          this.prevListParams.current = this.page.current
        }
        if (this.page.size !== this.prevListParams.size) {
          this.prevListParams.size = this.page.size
        }
        param = this.prevListParams
      } else {
        const setp = this.setSearchParams({}) || {} // 无效返回值则使用空对象，避免Object.assign造成异常
        param = Object.assign({ current: this.page.current, size: this.page.size }, params, setp)
        this.prevListParams = param
        this.canUsePrevListParam = true // 记录后更新状态
      }

      // 添加参数字符串空过滤
      let para = {}
      // 使用空参数过滤
      if (this.useFilterEmptyParam) {
        Object.entries(param).forEach(([key, value]) => {
          if (value !== '' && value !== null && value !== undefined) para[key] = value
        })
      } else {
        para = param
      }
      console.log(para, '过滤数据')
      return para
    },
    // avue-触发按钮查询
    searchChange(params) {
      this.canUsePrevListParam = false
      this.searchFun(this.rangHandle(params), 1)
    },
    // avue-查询方法
    async searchFun(params, current) {
      this.loading = true
      if (typeof this.searchFunBefore === 'function') {
        const state = this.searchFunBefore()
        if (!state) {
          this.loading = false
          return
        }
      }
      // avue-crud的ref名称是params
      if (!params && this.$refs.params) {
        params = this.rangHandle(this.$refs.params.searchForm)
      }
      // 传入参数有current
      if (current) {
        this.page.current = current
      }
      const param = this.searchFunParamsHandle(params)
      if (param === false) {
        this.loading = false
        return
      }

      // 添加超时清除loading状态的定时器
      const timeState = setTimeout(() => {
        if (this.loading) this.loading = false
      }, 1000)
      try {
        console.log('util/mixin.searchFun::params', param)
        const res = await this.COM_HTTP.reqList(param)
        // 清除超时定时器
        clearTimeout(timeState)
        this.loading = false
        this.pageLoading = false
        if (res.code === RESPONSE_CODE.SUCCESS) {
          if (this.usePagination) {
            this.tableList = res.data.records ? (this.formatList ? this.formatList(res.data) : res.data.records) : []
            this.page.total = res.data.total || 0
            this.page.current = res.data.current || 1
          } else {
            this.tableList = this.formatList ? this.formatList(res.data) : res.data || []
          }
          this.searchAfterFun()
        } else {
          this.$message.error(res.msg)
        }
      } catch (error) {
        console.error('searchFun::error', error);
        // 清除超时定时器
        clearTimeout(timeState)
        this.loading = false
        this.pageLoading = false
      }
    },
    // avue-导出方法
    async outExcel() {
      try {
        let params = null
        if (this.$refs.params) {
          params = this.rangHandle(this.$refs.params.searchForm)
        }
        const param = this.searchFunParamsHandle(params)
        const countryCode = this.$store.state.base.lang
        param.countryCode = countryCode
        // this.loading = true
        let outExcelApi = 'reqExcel'
        // 添加导出方法自定义
        // 默认方法仍是reqExcel
        // 加入自定义导出方法存在
        if (this.customOutExcelApi) {
          outExcelApi = this.customOutExcelApi
        }
        this.exportLoading = true
        // 调用导出方法
        const res = await this.COM_HTTP[outExcelApi](param)
        this.exportLoading = false
        // 重置自定义导出方法变量this.customOutExcelApi
        this.customOutExcelApi = null
        // this.loading = false
        // 如果返回结果
        if (res) {
          // 403和502 错误跳过
          // 请求是responseType: 'arraybuffer',错误时返回的是json
          const enc = new TextDecoder('utf-8')
          let errorData = { code: null }
          try {
            errorData = JSON.parse(enc.decode(new Uint8Array(res))) // 转化成json对象
          } catch (error) {
            // errorData.code = null
          }
          if (errorData.code) {
            if (errorData.code === 130093033) {
              this.$message.success(errorData.msg)
            } else {
              this.$message.error(errorData.msg)
            }
          } else {
            if (!!window.ActiveXObject || 'ActiveXObject' in window) {
              // IE
              window.navigator.msSaveOrOpenBlob(res, this.$route?.meta.title) + '.xls'
            } else {
              // 火狐谷歌都兼容
              const disposition = res['content-disposition']
              let suffix = '.xls'
              // 如果返回有content-disposition，取返回文件的后缀
              if (disposition) {
                delete res['content-disposition']
                suffix = '.' + disposition.split('filename=')[1].split('.')[1]
              }
              const url = window.URL.createObjectURL(new Blob([res], { type: 'application/vnd.ms-excel;charset=utf-8' }))
              const elink = document.createElement('a')
              elink.style.display = 'none'
              elink.href = url
              console.log(this.$route?.meta.title);
              const name = this.excelName || this.$route?.meta.title
              elink.setAttribute('download', name + suffix)
              document.body.appendChild(elink)
              elink.click()
              URL.revokeObjectURL(elink.href) // 释放URL 对象
              document.body.removeChild(elink)
              // 重置自定义文件名
              this.excelName = ''
            }
          }
        }
      } catch (error) {
        this.exportLoading = false
        // 重置自定义导出方法变量this.customOutExcelApi
        this.customOutExcelApi = null
        console.error('outExcel::error', error);
      }
    },
    // 导出-new
    exportExcel(name) {
      // 排除 EventObject
      const refName = typeof name === 'string' ? name : 'params'
      // 获取当前crud组件实例
      const crud = this.$refs[refName].$el
      // 创建div元素容器
      const div = document.createElement('div')
      // 获取crud组件下表格头部的dom节点
      let header = crud.querySelector('.el-table__header-wrapper')
      // 获取crud组件下表格主体的dom节点
      let body = crud.querySelector('.el-table__body-wrapper')
      // 获取不到表格dom中断后续操作
      if (!header || !body) return
      // 深拷贝表格头部和表格主体dom节点（避免操作dom影响原来的dom）
      header = header.cloneNode(true)
      body = body.cloneNode(true)
      // 要移除列的选择器集合
      const removeClassList = ['.el-table-column--selection', '.jms-hidden-column', ...this.exportIgnoreColumns]
      // 处理需要移除的dom集合
      removeClassList.forEach(selector => {
        // 用try-catch防止获取不到传入的 exportIgnoreColumns 选择器集合不合法引起querySelectorAll语法报错中断js进程
        try {
          // 移除表格头部和表格主体指定列的dom
          const headerEleList = header.querySelectorAll(selector)
          headerEleList.forEach(el => el.remove())
          const bodyEleList = body.querySelectorAll(selector)
          bodyEleList.forEach(el => el.remove())
        } catch (error) {
          console.error(error);
        }
      })
      // 把处理过的头部|主体节点都添加到dev容器
      div.appendChild(header)
      div.appendChild(body)
      // 调用table转excel的方法 raw-不自动加工数据格式
      const wb = XLSX.utils.table_to_book(div, { raw: true })
      // 移除掉容器节点（避免内存占用）
      div.remove()
      // 把表格数据写入流 bookSST用于处理导出后的时间对象异常
      const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        const name = this.excelName || this.$route?.meta.title
        // 下载
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), name + '.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      // return wbout
    },
    // 导出-任务注册
    async registerExport(jobName) {
      // 注册导出任务之前的钩子
      if (typeof this.beforeRegisterExport === 'function') {
        const state = this.beforeRegisterExport(jobName)
        if (state === false) return
      }
      try {
        let params = null
        if (this.$refs.params) {
          params = this.rangHandle(this.$refs.params.searchForm)
        }
        const param = this.searchFunParamsHandle(params, true)
        param.countryCode = this.$store?.state.base.lang
        const finalparam = { ...param, jobName }
        let outExcelApi = 'regExportJob'
        // 添加导出方法自定义
        // 默认方法仍是reqExcel
        // 加入自定义导出方法存在
        if (this.customOutExcelJobApi) {
          outExcelApi = this.customOutExcelJobApi
        }
        this.exportLoading = true
        // 调用导出方法
        const { code, msg } = await this.COM_HTTP[outExcelApi](finalparam)
        this.exportLoading = false
        // 重置自定义导出方法变量this.customOutExcelJobApi
        this.customOutExcelJobApi = null
        if (code === RESPONSE_CODE.SUCCESS || code === 130093033) {
          this.closeRegExpModal()
          // 成功后的提示语
          const tips = this.registerExportSuccessTips || '导出任务已提交，请前往预约下载中心下载查看'
          this.$message.success(tips)
        } else {
          this.$message.error(msg)
          if (this.regExpConfirmInstance) this.regExpConfirmInstance.confirmButtonLoading = false
        }
      } catch (error) {
        // 重置自定义导出方法变量this.customOutExcelJobApi
        this.customOutExcelJobApi = null
        this.closeRegExpModal()
      }
    },
    closeRegExpModal() {
      if (this.regExpConfirmInstance) this.regExpConfirmInstance.confirmButtonLoading = false
      if (this.regExpConfirmDone) this.regExpConfirmDone()
    },
    // 导出-异步任务注册
    openRegisterExport() {
      this.registerExportform.jobName = `${this.$route?.meta.title}${this.$common.formatDate(null, 'YYYYMMDDHHmmss')}`
      this.$prompt(this.exportTips ? this.exportTips : '请输入文件名，并稍后前往预约下载中心下载查看', '提示', {
        confirmButtonText: '提交',
        cancelButtonText: '关闭',
        inputPattern: this.exportInputPattern || /\S/, // input的验证规则
        inputValue: this.registerExportform.jobName, // input的默认值
        inputErrorMessage: '请输入文件名', // input的验证提示
        closeOnClickModal: false,
        customClass: 'exportTaskPrompt',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            this.regExpConfirmInstance = instance
            this.regExpConfirmDone = done
            this.registerExport(instance.inputValue)
          } else {
            done();
          }
        }
      }).then(() => {
        // this.registerExport(value)
      }).catch(() => {
      });
    },
    // 导出-异步任务
    async outExcelTask() {
      try {
        let params = null
        if (this.$refs.params) {
          params = this.rangHandle(this.$refs.params.searchForm)
        }
        const param = this.searchFunParamsHandle(params, true)
        const countryCode = this.$store?.state.base.lang
        param.countryCode = countryCode
        if (typeof this.outExcelBefore === 'function') {
          const state = this.outExcelBefore(param)
          if (!state) {
            return
          }
        }
        this.exportLoading = true
        let outExcelApi = 'reqExcel'
        // 添加导出方法自定义
        // 默认方法仍是reqExcel
        // 加入自定义导出方法存在
        if (this.customOutExcelRegisterApi) {
          outExcelApi = this.customOutExcelRegisterApi
        }
        this.exportLoading = true
        // 调用导出方法
        const res = await this.COM_HTTP[outExcelApi](param)
        this.exportLoading = false
        // 重置自定义导出方法变量this.customOutExcelRegisterApi
        this.customOutExcelRegisterApi = null
        if (res) {
          // 403和502 错误跳过
          // 请求是responseType: 'arraybuffer',错误时返回的是json
          const enc = new TextDecoder('utf-8')
          let errorData = { code: null }
          try {
            errorData = JSON.parse(enc.decode(new Uint8Array(res))) // 转化成json对象
          } catch (error) {
            errorData.code = null
          }

          if (!this.validatenull(errorData.code) && errorData.code !== 1) {
            this.$message.error(errorData.msg)
          } else {
            if (errorData.data === null) {
              this.$message.success(errorData.msg)
              return
            }
            if (typeof errorData.data === 'boolean' && errorData.data === true) {
              this.openRegisterExport()
            } else {
              if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                // IE
                window.navigator.msSaveOrOpenBlob(res, this.$route?.meta.title + '.xls')
              } else {
                // 火狐谷歌都兼容
                const disposition = res['content-disposition']
                let suffix = '.xls'
                // 如果返回有content-disposition，取返回文件的后缀
                if (disposition) {
                  delete res['content-disposition']
                  suffix = '.' + disposition.split('filename=')[1].split('.')[1]
                }
                const url = window.URL.createObjectURL(new Blob([res], { type: 'application/vnd.ms-excel;charset=utf-8' }))
                const elink = document.createElement('a')
                elink.style.display = 'none'
                elink.href = url
                console.log(this.$route?.meta.title);
                const name = this.excelName || this.$route?.meta.title
                // elink.setAttribute('download', name + suffix)
                elink.setAttribute('download', name + suffix)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
                // 重置自定义文件名
                this.excelName = ''
              }
            }
          }
        }
      } catch (error) {
        this.exportLoading = false
        // 重置自定义导出方法变量this.customOutExcelRegisterApi
        this.customOutExcelRegisterApi = null
        console.error('outExcel::error', error);
      }
    },
    // 启用禁用提示弹窗(已经弃用)
    async enableView(val, row) {
      const PopText1 = val === 1 ? '启用' : '禁用'
      const PopText2 = '确定' + PopText1 + '该信息?'
      this.$confirm(PopText2, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        iconClass: 'el-icon-warning-outline',
        confirmButtonClass: 'comfirm-btn',
        type: 'warning'
      })
        .then(async () => {
          this.loading = true
          const setp = this.setEnableParams({})
          const reqParams = Object.assign({}, row, setp)
          row.isEnable = row.isEnable === 1 ? 2 : 1
          const params = {
            newData: reqParams,
            oldData: row
          }
          const { code, msg } = await this.COM_HTTP.reqUpdate(params)
          if (code === RESPONSE_CODE.SUCCESS) {
            this.searchFun()
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
          this.loading = false
        })
        .catch(() => {
          row.isEnable = row.isEnable === 1 ? 2 : 1
        })
    },
    // avue-选择分页条数
    sizeChange(val) {
      this.page.current = 1
      this.page.size = val
      this.searchFun()
    },
    // avue-跳转页码
    currentChange(val) {
      this.page.current = val
      this.searchFun()
    },
    // avue-重置方法回调重置页码(尽量不要用)
    resetList() {
      // this.page.current = 1
      // this.searchFun()

    },
    // avue-刷新表格
    refreshList() {
      // 清空选中的数据
      this.$refs.params && this.$refs.params.selectClear()
      // 重置页码
      this.page.current = 1
      // 请求数据
      this.searchFun()
    },
    /*
     *@Description: 按钮权限判断有权限
     *@param {arg} type
     *@return [type]
     *@Date: 2019-07-03 10:56:08
     */
    // eslint-disable-next-line no-unused-vars
    hasPower(type) {
      return true
      // return hasPower(this.moduleName, type)
    },
    /*
     *@Description: 对应跳转路由
     *@param {arg} type
     *@param {arg} operationType 对应
     */
    routeDefs(moduleName, operationType, params = {}) {
      return { name: `${moduleName}${operationType}`, path: `/${moduleName}${operationType}`, params: params }
    },
  },
  /*
   *@Description: 取消订阅事件
   *@param {arg} type
   *@return [type]
   *@Date: 2019-07-25 21:09:54
   */
  destroyed() {
    this.$bus.$off('submit-success')
    this.isWideScreen.removeListener(this.widthChange)
    this.loading = false
  }
}
