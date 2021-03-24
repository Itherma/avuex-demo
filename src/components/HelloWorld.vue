/**
 * @description: 部门资料
 * @author: hdy
 */
<template>
  <div class="layout-list main-wrap">
    <avue-crud
      ref="params"
      :data="tableList"
      :option="listOpt"
      :page="page"
      :table-loading="loading"
       v-model="formData"
      @row-save="addFunCopy"
      @row-update="updateFunCopy"
      @size-change="sizeChange"
      @current-change="currentChange"
      @search-reset="resetList"
      @search-change="searchChange"
      @row-save-create="saveCreate"
      @row-del="deleteView">
    </avue-crud>
  </div>
</template>

<script>
// import { commonFun } from '@public/utils/common'
import { DICT } from '../../avuex/utils/constant'
import { RULES } from '../../avuex/utils/validate'
import mixin from '../../avuex/utils/mixin'
// eslint-disable-next-line no-unused-vars
import fetch, { RESPONSE_CODE, GATEWAY } from '../../avuex/utils/axios'
export default {
  name: 'Category',
  mixins: [mixin],
  props: {},
  components: { },
  data() {
    return {
      COM_HTTP: {
        reqList(params) {
          return fetch.get(`${GATEWAY.BAS}/syscategorymanage/page`, { params }, 'category')
        },
        reqDetail(params) {
          return fetch.get(`${GATEWAY.BAS}/syscategorymanage/detail`, { params })
        },
        reqAdd(params) {
          return fetch.post(`${GATEWAY.BAS}/syscategorymanage/add`, params)
        },
        reqDel(params) {
          return fetch.post(`${GATEWAY.BAS}/syscategorymanage/delete?`, params)
        },
        reqUpdate(params) {
          return fetch.post(`${GATEWAY.BAS}/syscategorymanage/update`, params)
        }
      },
      formData: {
        isEnable: 1
      },
      categoryProperties: null,
      isShowFirst: false
    }
  },
  /**
   * 监控自定义变量
   * 对多个变量或者对象进行处理后返回一个结果值
   */
  computed: {
    listOpt () {
      const self = this
      return {
        delBtn: false,
        viewUrl: `${GATEWAY.BAS}/syscategorymanage/detail`,
        saveCreate: true,
        formateViewData: (res) => {
          self.categoryProperties = res.categoryProperties
          return res
        },
        formateForm(data) {
          data.parentId = data.parentId || null
          return data
        },
        btnsVisible(row) {
          return { edit: row.id !== 1 }
        },
        column: [
          {
            label: '类目代码',
            prop: 'code',
            placeholder: this.$lang('系统自动生成'),
            disabled: true
          },
          {
            label: '类目名称',
            prop: 'name',
            search: true,
            rules: [RULES.required, RULES.moduleName, RULES.lengthTwentyFive]
          },
          {
            label: '中文名称',
            prop: 'cnName',
            placeholder: this.$lang('限50个字符内 中文'),
            rules: [RULES.lengthFifty, RULES.moduleName]
          },
          {
            label: '英文名称',
            prop: 'enName',
            placeholder: this.$lang('限50个字符内  英文+“·”'),
            rules: [RULES.lengthFifty, RULES.enString]
          },
          {
            label: '类目属性',
            prop: 'categoryProperties',
            type: 'select',
            search: true,
            editDisabled: true,
            dicData: DICT.categoryProperties,
            rules: [RULES.requiredOptions],
            change: ({ isSearch, valueObj = {}}) => {
              const { value = '' } = valueObj
              self.$nextTick(() => {
                // 判断是否搜索条件还是弹窗  true 搜索 false 非搜索
                if (!isSearch) {
                  self.categoryProperties = value
                  self.formData.parentId = ''
                  self.formData.parentName = ''
                  value && self.$refs.params.updateDic('parentId', [], 'dialogForm', { categoryProperties: value })
                }
              })
            }
          },
          {
            label: '父级类目',
            prop: 'parentId',
            type: 'select',
            display: this.formData.categoryProperties !== 0,
            viewDisplay: this.categoryProperties !== 0,
            remote: true,
            disabled: !!this.formData.id || (this.formData.categoryProperties !== 1 && this.formData.categoryProperties !== 2),
            props: {
              label: 'name',
              value: 'id',
              res: 'records'
            },
            selectDic: [
              { id: this.formData.parentId, name: this.formData.parentName }
            ],
            dicQuery: {
              categoryProperties: this.categoryProperties
            },
            // 返回所有
            dicUrl: `${this.$selectUrl.getSyscategory}?name={{key}}&current=1&size=99999`,
            routeName: 'category',
            formatter: row => row.parentName,
            tpyeformat(item) {
              if (item.code) {
                return `${item.code} | ${item.name}`
              } else {
                return `${item.name}`
              }
            },
            rules: this.formData.categoryProperties !== 1 && this.formData.categoryProperties !== 2 ? [] : [RULES.requiredOptions],
            change: ({ isSearch = {}}) => {
              self.$nextTick(() => {
                if (!isSearch && self.formData.parentId === 1) {
                  self.formData.parentId = ''
                  self.$message.info(self.$lang('「LM00001 | 其他」为系统默认类目，不能在此使用'))
                }
              })
            }
          },
          {
            label: '物品类型',
            prop: 'articleTypeId',
            type: 'select',
            display: this.formData.categoryProperties === 0 || this.formData.categoryProperties === 1,
            viewDisplay: this.categoryProperties === 0 || this.categoryProperties === 1,
            props: {
              label: 'name',
              value: 'id'
            },
            rules: this.formData.categoryProperties === 0 ? [RULES.requiredOptions] : [],
            dicUrl: `${this.$selectUrl.srticle}?size=5000`,
            routeName: 'category',
            formatter: row => row.articleTypeName
          },
          {
            label: '启用状态',
            prop: 'isEnable',
            search: true,
            hide: true,
            type: 'switch',
            valueDefault: 1,
            // slot: true,
            dicData: DICT.enbStatus,
            rules: [RULES.requiredOptions]
          },
          {
            label: '启用状态',
            prop: 'isEnable',
            display: false,
            viewDisplay: false,
            valueDefault: 1,
            formatter: (row) => {
              const map = {
                1: '<i class="dot active"></i> ' + this.$lang('启用'),
                2: '<i class="dot"></i> ' + this.$lang('禁用')
              }
              return map[row.isEnable]
            }
          },
          {
            label: '备注',
            prop: 'remark',
            type: 'textarea',
            maxlength: 100,
            showWordLimit: true,
            span: 24
          },
          {
            label: '修改人',
            prop: 'updateByName',
            hide: true,
            editDisplay: false,
            addDisplay: false
          },
          {
            label: '修改时间',
            prop: 'updateTime',
            type: 'datetime',
            hide: true,
            editDisplay: false,
            addDisplay: false
          },
          {
            label: '创建人',
            prop: 'createByName',
            editDisplay: false,
            addDisplay: false
          },
          {
            label: '创建时间',
            prop: 'createTime',
            type: 'datetime',
            editDisplay: false,
            addDisplay: false
          }
        ]
      }
    }
  },
  /**
   * 视图el挂载，数据渲染完成
   */
  mounted () {},
  /**
   * 视图逻辑
   */
  methods: {
    // avue-保存并新增下一条 对应属性 saveCreate: true
    async saveCreate(form, clean, loading) {
      this.addFunCopy(form, clean, loading)
    },
    // 参数混入
    setEnableParams() {
      return {
        parentId: this.formData.parentId || 0
      }
    },
    // 写入自定义增加参数
    setAddParams() {
      return {
        parentId: this.formData.parentId || 0
      }
    }
  }
}
</script>

<style scoped lang="css">
</style>
