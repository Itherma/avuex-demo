<template>
  <div>
    <template v-for="(column,index) in columnOption">
      <!-- 动态列渲染出树形表格 -->
      <dynamic-column v-if="column.children && column.children.length" :columnOption="column" :key="index">
        <template v-for="(item) in crud.propOption" slot-scope="scope" :slot="item.prop">
          <slot :row="scope.row"
                :dic="scope.dic"
                :size="scope.size"
                :label="scope.label"
                :name="item.prop"
          ></slot>
        </template>
      </dynamic-column>
      <!-- 普通列 -->
      <template v-else>
        <el-table-column
          v-if="column.hide !== true"
          :show-overflow-tooltip="column.showTooltip === false ? false : true"
          :key="`col_${index}`"
          :prop="column.prop"
          :label="column.label"
          filter-placement="bottom-end"
          :filters="handleFilters(column)"
          :filter-method="column.filter? handleFiltersMethod : undefined"
          :filter-multiple="vaildData(column.filterMultiple,true)"
          :min-width="column.minWidth"
          :sortable="vaildData(column.sortable,true)"
          :render-header="column.renderHeader"
          :align="column.align || crud.tableOption.align"
          :header-align="column.headerAlign || crud.tableOption.headerAlign"
          :width="column.width"
          :sort-by="column.sortBy"
          :fixed="crud.isMobile ? false : column.fixed">
          <template slot-scope="scope">
            <span :class="{'ms-tree-title':column.prop===crud.treeProp,'cell-overflow': column.useCellOverflow }">
              <template v-if="cellEditFlag(scope.row,column)">
                <component
                  :is="getCellType(column.type)"
                  size="mini"
                  v-model="scope.row[column.prop]"
                  :type="getType(column)"
                  :disabled="column.btnDisabled"
                  :props="column.props || crud.tableOption.props"
                  :format="column.format"
                  :parent="column.parent"
                  :change="column.change"
                  :remote="column.remote"
                  :dicUrl="column.dicUrl"
                  :focus="column.focus"
                  :blur="column.blur"
                  :click="column.click"
                  :maxlength="column.maxlength"
                  :allowCreate="column.allowCreate"
                  :prefix-icon="column.prefixIcon"
                  :suffix-icon="column.suffixIcon"
                  :defaultExpandAll="column.defaultExpandAll"
                  :filterable="column.searchFilterable"
                  :selectDic="column.selectDic"
                  :groupChildren="column.groupChildren"
                  :filter-method="column.searchFilterMethod"
                  :value-format="column.valueFormat"
                  :multiple="column.multiple"
                  :readonly="column.readonly"
                  :clearable="vaildData(column.clearable,false)"
                  :placeholder="column.searchPlaceholder || column.label"
                  @change="column.cascader ? handleChange(index,scope.row) : ''"
                  :dic="(crud.cascaderDIC[scope.row.$index] || {})[column.prop] || crud.DIC[column.prop]"
                ></component>
              </template>
              <slot
                v-else-if="column.slot"
                :row="scope.row"
                :dic="crud.DIC[column.prop]"
                :size="crud.isMediumSize"
                :name="column.prop"
              ></slot>
              <template v-else>
                <template v-if="['upload'].includes(column.type)">
                  <avue-img
                    v-if="!validatenull(scope.row[column.prop])"
                    :align="column.align"
                    :listType="column.listType"
                    :imgWidth="column.imgWidth"
                    :fullscreen="column.imgFullscreen"
                    :imgHeight="column.imgHeight"
                    :imgType="column.imgType"
                    :type="menuText('text')"
                    :dataType="column.dataType"
                    :size="crud.isMediumSize"
                    :value="scope.row[column.prop]"
                  ></avue-img>
                  <span v-else>--</span>
                </template>
                <span v-else-if="['color'].includes(column.type)">
                  <i class="avue-crud__color" :style="{backgroundColor:scope.row[column.prop]}"></i>
                </span>
                <span v-else-if="['icon-select'].includes(column.type)">
                  <i class="avue-crud__icon-select" :class="scope.row[column.prop]" ></i>
                </span>
                <span v-else v-html="handleDetail(scope.row, column)" :title="column.useCellOverflow ? handleDetail(scope.row, column) : ''"></span>
              </template>
            </span>
          </template>
        </el-table-column>
      </template>
    </template>
  </div>
</template>

<script>
import dynamicColumn from './dynamic-column'
import { sendDic } from '../../core/common/dic'
import { getComponent, getCellType, getType } from '../../core/common/dataformat'
// import { detail } from '../../core/common/detail'
import find from 'lodash/find'
export default {
  // eslint-disable-next-line vue/name-property-casing
  name: 'column',
  components: {
    dynamicColumn
  },
  provide() {
    return {
      dynamic: this
    }
  },
  props: {
    columnOption: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    // list() {
    //   const result = [...this.columnOption]
    //   return result
    // }
  },
  inject: ['crud'],
  methods: {
    getCellType,
    getType,
    getComponent,
    // 判断当前列是否可以显示
    menuText(value) {
      return this.menuType === 'text' ? 'text' : value
    },
    getValue(data) {
      return this.validatenull(data) ? '--' : data
    },
    /*
     *@Description: 处理文字尽量简洁高效
    */
    handleDetail(row, column) {
      // 已经定义了要显示字段(viewProp) 直接返回对应的文字
      if (column.viewProp) {
        return this.getValue(row[column.viewProp])
      }
      // 自定义的格式化函数
      if (typeof column.formatter === 'function') {
        return this.getValue(column.formatter(row, this.crud.DIC[column.prop]))
      }
      // 字典转文字
      if (column.type === 'select' && this.crud.DIC[column.prop] && typeof row[column.prop] === 'number') {
        const data = find(
          this.crud.DIC[column.prop],
          // eslint-disable-next-line
          (item) => item[column.props ? column.props.value : 'value'] == row[column.prop]
        )
        return data ? data[column.props ? column.props.label : 'label'] : '--'
      }
      // 直接返回值
      return this.getValue(row[column.prop])
    },
    // handleDetail(row, column, DIC) {
    //   if (column.viewProp && !column.formatter && !column.format) {
    //     return validatenull(row[column.viewProp]) ? '--' : row[column.viewProp]
    //   }
    //   let result = row[column.prop]
    //   result = detail(row, column, this.crud.tableOption, DIC)
    //   if (!this.validatenull(DIC)) {
    //     row['$' + column.prop] = result
    //   }
    //   if (!result && result !== 0) {
    //     return '--'
    //   }
    //   return result
    // },
    // handleShowLabel(row, column, DIC) {
    //   let result = ''
    //   if (!this.validatenull(DIC)) {
    //     result = detail(row, column, this.tableOption, DIC)
    //     row['$' + column.prop] = result
    //   }
    //   return result
    // },
    handleChange(index, row) {
      const columnOption = [...this.crud.propOption]
      // 本节点;
      const column = columnOption[index]
      const list = column.cascader
      const value = row[column.props]
      const rowIndex = row.$index
      // 下一个节点
      const columnNext = columnOption[index + 1]
      const columnNextProp = columnNext.prop

      // 最后一级 无效值不执行
      if (this.validatenull(list) || this.validatenull(value) || this.validatenull(columnNext)) {
        return
      }
      // 如果本节点没有字典则创建节点数组
      if (this.validatenull(this.crud.cascaderDIC[rowIndex])) {
        this.$set(this.crud.cascaderDIC, rowIndex, {})
      }
      // 如果存在队列中则清空字典和值
      if (this.crud.formIndexList.includes(rowIndex)) {
        // 清空子类字典
        list.forEach(ele => {
          this.$set(this.crud.cascaderDIC[rowIndex], ele.prop, [])
          list.forEach(ele => (row[ele] = ''))
        })
      }

      sendDic({ url: columnNext.dicUrl.replace('{{key}}', value) }).then(
        res => {
          // 修改字典
          const dic = Array.isArray(res) ? res : []
          this.$set(this.crud.cascaderDIC[rowIndex], columnNextProp, dic)
          /**
           * 1.是change多级默认联动
           * 2.字典不为空
           * 3.非首次加载
           */
          if (!this.validatenull(dic) && this.crud.formIndexList.includes(rowIndex)) {
            // 取字典的指定项或则第一项
            let dicvalue = dic[columnNext.defaultIndex || 0]
            if (!dicvalue) dicvalue = dic[0]
            if (dicvalue) {
              row[columnNext.prop] =
                dicvalue[
                  (columnNext.props || this.crud.options.props || {})
                    .value || 'value'
                ]
            }
          }
        }
      )
    },
    cellEditFlag(row, column) {
      return (
        row.$cellEdit &&
        [
          undefined,
          'select',
          'radio',
          'checkbox',
          'cascader',
          'number',
          'switch',
          'input',
          'tree',
          'dates',
          'date',
          'datetime',
          'week',
          'month',
          'year'
        ].includes(column.type) && column.slot !== true && column.cell
      )
    },
    // 图标显示
    iconShow(prop, record) {
      return (
        prop === this.crud.treeProp &&
        record.children &&
        record.children.length > 0
      )
    },
    // 切换下级是否展开
    toggleExpanded(row, index) {
      row._expand = !row._expand
      this.$set(this.crud.list, index, row)
    },
    // 表格筛选逻辑
    handleFiltersMethod(value, row, column) {
      const columnNew = this.columnOption.filter(ele => ele.prop === column.property)[0]
      if (typeof columnNew.filtersMethod === 'function') {
        return columnNew.filtersMethod(value, row, columnNew)
      } else {
        return row[columnNew.prop] === value
      }
    },
    // 表格筛选字典
    handleFilters(column) {
      if (column.filter !== true) return undefined
      if (this.validatenull(column.dicFilters)) {
        const list = [];
        (this.crud.DIC[column.prop] || []).forEach(ele => {
          const props = column.props || this.crud.tableOption.props || {}
          list.push({
            text: ele[props.label || 'label'],
            value: ele[props.value || 'value']
          })
        })
        return list
      }
      return column.dicFilters
    }
  }
}
</script>
<style>
.el-table .cell .cell-overflow {
  white-space: nowrap;
}
</style>
