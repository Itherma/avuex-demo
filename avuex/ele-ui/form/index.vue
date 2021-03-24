<template>
  <div :class="b()"
       :style="{width:setPx(parentOption.formWidth,'100%')}">
    <el-form ref="form"
             :model="form"
             :inline="true"
             :label-position="vaildData(parentOption.labelPosition, config.labelPosition)"
             :size="controlSize"
             :label-width="setPx(parentOption.labelWidth,config.labelWidth)"
             :rules="formRules">
      <el-row :span="24" justify="space-between">
        <avue-group v-for="(item) in columnOption"
                    :key="item.prop"
                    :display="item.display"
                    :icon="item.icon"
                    :card="parentOption.card"
                    :styleType="tableOption.styleType"
                    :expand="tableOption.groupExpand"
                    :label="item.label">
          <template slot="header" v-if="$slots[item.prop+'Header']">
            <slot :name="item.prop+'Header'"></slot>
          </template>
          <template v-if="item.groupSlot">
            <slot :name="item.prop+'Group'" :group="item.column || []"></slot>
          </template>
          <div :class="b('group')" v-else>
            <template v-for="(column,cindex) in item.column">
              <!-- <el-col v-if="cindex && item.column[cindex - 1].nextLine" :key="cindex" class="form-dividingline" :class="{'dialog-line': tableOption.dialogForm}"
                      :xs="24"
                      :sm="24"
                      :md="24"
                      :lg="24"
                      :xl="24"></el-col> -->
              <!-- <el-col :key="column.prop"
                      v-if="vaildDisplay(column)"
                      :style="{paddingLeft:setPx((parentOption.gutter ||20)/2),paddingRight:setPx((parentOption.gutter ||20)/2)}"
                      :xs="tableOption.dialogForm ? (tableOption.span || 6) : 24"
                      :sm="tableOption.dialogForm ? (tableOption.span || 6) : 12"
                      :md="tableOption.dialogForm ? (column.span || tableOption.span || 6) : (column.span || 8)"
                      :lg="tableOption.dialogForm ? (column.span || tableOption.span || 6) : (column.span || itemSpanDefault)"
                      :xl="tableOption.dialogForm ? (column.span || tableOption.span || 6) : (column.span || 4)"
                      :offset="column.offset || 0"
                      :class="b('row')"> -->
                <div v-if="cindex && column.inline" :key="cindex" class="form-dividingline inline"></div>
                <el-form-item :key="column.prop"
                              v-if="vaildDisplay(column)"
                              :label="column.formAlias?  column.formAlias + '：' : column.label ? column.label + '：' : '' "
                              :prop="column.prop"
                              :class="b('item--' + (column.labelPosition || item.labelPosition || '' || column.span === 24 ? 'inline' :column.span ? column.span : ''))"
                              :label-width="getLabelWidth(column,item)">
                  <!-- <el-tooltip :disabled="!column.tip || column.type==='upload'"
                              :content="vaildData(column.tip,getPlaceholder(column))"
                              :placement="column.tipPlacement"> -->
                    <template slot="label" v-if="column.tip" >
                      {{column.label}}
                      <el-tooltip
                          :content="column.tip"
                          :placement="column.tipPlacement || 'right'">
                        <i class="el-icon-question"></i>
                      </el-tooltip>
                    </template>
                    <template slot="label" v-if="column.labelslot" >
                      <slot :name="column.prop + 'Label'"
                            :column="column"
                            :label="form['$'+column.prop]"
                            :form="form"></slot>
                    </template>
                    <slot :value="form[column.prop]"
                          :column="column"
                          :label="form['$'+column.prop]"
                          :size="column.size || controlSize"
                          :disabled="vaildDisabled(column)"
                          :dic="DIC[column.prop]"
                          :name="column.prop"
                          :form="form"
                          v-if="column.formslot"></slot>
                    <component v-else
                              :ref="column.prop"
                              v-model="form[column.prop]"
                              :is="getComponent(column.type,column.component)"
                              :class="{ 'bottom-align': column.blankLabel }"
                              :action="column.action"
                              :append="column.append"
                              :accordion="column.accordion"
                              :typeslot="column.typeslot"
                              :appendClick="column.appendClick"
                              :border="column.border"
                              :change="column.change"
                              :changeoOnSelect="column.changeoOnSelect"
                              :checked="column.checked"
                              :clearable="column.clearable"
                              :changeOnSelect="column.changeOnSelect"
                              :editable="column.editable"
                              :click="column.click"
                              :onRemove="column.onRemove"
                              :column="column"
                              :colors="column.colors"
                              :canvasOption="column.canvasOption"
                              :controls-position="column.controlsPosition"
                              :dataType="column.dataType"
                              :defaultExpandAll="column.defaultExpandAll"
                              :defaultTime="column.defaultTime || (column.type && column.type.indexOf('range') > -1 ? ['00:00:00', '23:59:59'] : '')"
                              :dic="DIC[column.prop]"
                              :dicUrl="column.dicUrl"
                              :dicMethod="column.dicMethod"
                              :dicQuery="column.dicQuery"
                              :disabled="vaildDisabled(column)"
                              :drag="column.drag"
                              :endPlaceholder="column.endPlaceholder"
                              :expand-trigger="column.expandTrigger"
                              :filter="column.filter"
                              :blur="column.blur"
                              :focus="column.focus"
                              :tpyeformat="column.tpyeformat"
                              :filesize="column.filesize"
                              :filterable="column.filterable"
                              :selectDic="column.selectDic"
                              :groupChildren="column.groupChildren"
                              :format="column.format"
                              :formatTooltip="column.formatTooltip"
                              :iconClasses="column.iconClasses"
                              :label="column.label"
                              :limit="column.limit"
                              :listType="column.listType"
                              :loadText="column.loadText"
                              :min="column.min"
                              :max="column.max"
                              :minlength="column.minlength"
                              :maxlength="column.maxlength"
                              :minRows="column.minRows"
                              :maxRows="column.maxRows"
                              :multiple="column.multiple"
                              :nodeClick="column.nodeClick"
                              :options="column.options"
                              :oss="column.oss"
                              :parent="column.parent"
                              :pickerOptions="column.pickerOptions"
                              :placeholder="getPlaceholder(column)"
                              :allowCreate="column.allowCreate"
                              :precision="column.precision"
                              :prefixIcon="column.prefixIcon"
                              :prepend="column.prepend"
                              :prependClick="column.prependClick"
                              :prop="column.prop"
                              :props="column.props || parentOption.props"
                              :propsHttp="column.propsHttp ||parentOption.propsHttp"
                              :range="column.range"
                              :iconList="column.iconList"
                              :readonly="column.readonly"
                              :checkStrictly="column.checkStrictly"
                              :separator="column.separator"
                              :showFileList="column.showFileList"
                              :showInput="column.showInput"
                              :showStops="column.showStops"
                              :showAllLevels="column.showAllLevels"
                              :showText="column.showText"
                              :size="column.size || controlSize"
                              :startPlaceholder="column.startPlaceholder"
                              :step="column.step"
                              :suffixIcon="column.suffixIcon"
                              :texts="column.texts"
                              :tip="column.tip"
                              :type="column.type"
                              :accept="column.accept"
                              :tags="column.tags"
                              :upload-before="uploadBefore"
                              :upload-after="uploadAfter"
                              :value-format="column.valueFormat"
                              :voidIconClass="column.voidIconClass"
                              :remote="column.remote"
                              :autocomplete="column.autocomplete"
                              :hasAll="false"
                              :multipleAll="column.multipleAll"
                              :showWordLimit="column.showWordLimit"
                              :useCurNetworkInfo="column.useCurNetworkInfo"
                              :isAll="column.isAll"
                              :treeQuery="column.treeQuery"
                              :remoteQuery="column.remoteQuery"
                              :filterData="column.filterData"
                              :beforeClearAll="column.beforeClearAll"
                              :treeUrl="column.treeUrl"
                              :remoteUrl="column.remoteUrl"
                              :useClearMessage="column.useClearMessage"
                              :clearMessageInfo="column.clearMessageInfo"
                              :beforeSelect="column.beforeSelect"
                              :afterSelect="column.afterSelect"
                              :valueDefaultYl="column.valueDefaultYl"
                              :form="column.useDetailForm && form"
                              :clear="column.clear"
                              :valueDefault="column.valueDefault"
                              :input="column.input"
                              @change="column.cascader ? handleChange(item.column,cindex):''">
                      <template :slot="column.prop+'Type'"
                                slot-scope="{item,label,value}"
                                v-if="column.typeslot">
                        <slot :name="column.prop + 'Type'"
                              :item="item"
                              :value="value"
                              :label="label"></slot>
                      </template>
                    </component>
                  <!-- </el-tooltip> -->
                </el-form-item>
                <div v-if="cindex && column.nextLine || column.inline"
                    :key="cindex + 1" class="form-dividingline"
                    :class="{'dialog-line': tableOption.dialogForm,'inline':column.inline}"></div>
              <!-- </el-col> -->
              <div :class="b('line')"
                   :key="cindex"
                   :style="{width:(column.count/24*100)+'%'}"
                   v-if="column.row && column.span!==24 && column.count"></div>
            </template>
            <el-form-item v-if="parentOption.menuGroup">
              <slot name="menuGroup" :size="controlSize"></slot>
            </el-form-item>
          </div>
        </avue-group>

        <el-col :span="24" v-if="vaildData(parentOption.menuBtn,true)">
            <!-- 菜单按钮组 -->
            <div class="form-btns">
              <slot name="menuFormFront" :size="controlSize"></slot>
              <el-button type="primary"
                         @click="handleMock"
                         :size="controlSize"
                         icon="el-icon-edit-outline"
                         v-if="isMock">填充数据</el-button>
              <el-button type="info"
                         @click="submit(true)"
                         v-if="tableOption.saveCreate"
                         :loading="loading"
                         :size="controlSize">{{'保存并新增'}}</el-button>
              <el-button  :size="controlSize"
                         v-if="vaildData(parentOption.emptyBtn,true)"
                         @click="cancel">{{vaildData(parentOption.cancelText,'取消')}}</el-button>
              <el-button type="primary"
                         @click="submit(false)"
                         :size="controlSize"
                         :loading="loading"
                         v-if="vaildData(parentOption.submitBtn,true)">{{vaildData(parentOption.submitText,'保存')}}</el-button>
              <slot name="menuForm" :size="controlSize"></slot>
            </div>
        </el-col>
      </el-row>
    </el-form>

  </div>
</template>

<script>
import { detail } from '../../core/common/detail';
import create from '../../core/create';
import init from '../../core/crud/init';
// import { getComponent, getPlaceholder, formInitVal, calcCount, calcCascader } from '../../core/common/dataformat';
import { getComponent, getPlaceholder, formInitVal, calcCascader } from '../../core/common/dataformat';
import { sendDic } from '../../core/common/dic';
import mock from '../../utils/mock';
import { arraySort } from '../../utils/util';
// import remove from 'lodash/remove'
// import forEach from 'lodash/forEach'
import config from '../crud/config';

export default create({
  name: 'form',
  mixins: [init()],
  data () {
    return {
      config: config,
      optionIndex: [],
      optionBox: false,
      tableOption: {},
      itemSpanDefault: 6,
      formOld: {},
      form: {},
      formList: [],
      formCreate: true,
      formDefault: {},
      formRules: {},
      instantiated: false
    };
  },
  watch: {
    form: {
      handler () {
        if (!this.formCreate) {
          this.$emit('input', this.form);
          this.$emit('change', this.form);
        } else {
          this.formCreate = false;
        }
      },
      deep: true
    },
    value: {
      handler () {
        this.formOld = this.deepClone(this.value);
        if (!this.formCreate) {
          this.formVal();
        }
      },
      deep: true
    }
  },
  computed: {
    propOption () {
      const list = [];
      this.columnOption.forEach(option => {
        option.column.forEach(column => {
          list.push(column);
        });
      });
      return list;
    },
    parentOption () {
      let option = this.deepClone(this.tableOption);
      const group = option.group;
      if (!group) {
        option = Object.assign(option, {
          group: [this.deepClone(option)]
        });
      }
      delete option.column;
      return option;
    },
    columnOption () {
      const list = [...this.parentOption.group] || [];
    // eslint-disable-next-line no-unused-vars
      list.forEach((ele, index) => {
        // 根据字段formSort排序
        ele.column = arraySort(ele.column || [], 'formSort')
        // 循环列的全部属性
        // ele.column.forEach((column, cindex) => {
        //   // 动态计算列的位置，如果为隐藏状态则或则手机状态不计算
        //   if (column.display !== false && !this.isMobile) {
        //     column = calcCount(column, this.itemSpanDefault, cindex === 0);
        //   }
        // });
        // 处理级联属性
        ele.column = calcCascader(ele.column);
      });
      return list;
    },
    menuPostion: function () {
      if (this.parentOption.menuPostion) {
        return this.parentOption.menuPostion;
      } else {
        return 'right';
      }
    },
    boxType: function () {
      return this.parentOption.boxType;
    },
    isMock () {
      return this.vaildData(this.parentOption.mock, false);
    },
    isGroup() {
      return !!this.tableOption.group
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    uploadBefore: Function,
    uploadAfter: Function,
    value: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    this.handleDateRelationOpt()
  },
  created () {
    // 初始化字典
    this.columnOption.forEach(ele => {
    // eslint-disable-next-line no-unused-vars
      this.handleLoadDic(ele).then(res => {
        this.forEachLabel();
      });
    });
    // 初始化表单
    this.dataformat();
  },
  methods: {
    getComponent,
    getPlaceholder,
    forEachLabel () {
      this.columnOption.forEach(ele => {
        ele.column.forEach(column => {
          this.handleShowLabel(column, this.DIC[column.prop]);
        });
      });
    },
    getLabelWidth (column, item) {
      const result = column.labelWidth || item.labelWidth || this.parentOption.labelWidth;
      return this.setPx(result);
    },
    // 获取全部字段字典的label
    handleShowLabel (column, DIC) {
      let result = '';
      if (!this.validatenull(DIC)) {
        result = detail(this.form, column, this.tableOption, DIC);
        // this.$set(this.form, ['$' + column.prop], result);
      }
      return result;
    },
    // 对部分表单字段进行校验的方法
    validateField (val) {
      return this.$refs.form.validateField(val);
    },
    // 搜索指定的属性配置
    findColumnIndex (value) {
      let result = -1;
      this.columnOption.forEach(column => {
        const idx = this.findArray(column.column, value, 'prop');
        if (idx > -1) {
          result = idx
        }
      });
      return result;
    },
    updateDic (prop, list = [], params) {
    // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        if (this.validatenull(list)) {
          const column = this.propOption[this.findColumnIndex(prop)];
          if (!this.validatenull(column.dicUrl)) {
            const value = this.form[prop] || ''
            sendDic({
              url: column.dicUrl.replace('{{key}}', value),
              query: Object.assign({}, column.dicQuery, params),
              resKey: (column.props || {}).res
            }).then(list => {
              this.$set(this.DIC, prop, list);
              resolve(list)
            });
          }
        } else {
          this.$set(this.DIC, prop, list);
          resolve(list)
        }
      })
    },
    clearDic (prop) {
      this.$set(this.DIC, prop, []);
    },
    dataformat () {
      const formDefault = formInitVal(this.propOption);
      this.formDefault = formDefault;
      this.form = this.deepClone(formDefault.tableForm);
      this.formVal();
    },

    handleChange (item, index) {
      // console.error('handleChange', item, index)
      const column = item[index]; // 获取当前节点级联
      const list = column.cascader;
      const str = list.join(',');
      const value = this.form[column.prop];
      // 下一个节点
      const columnNext = item[index + 1] || {}; // 获取下一个联动节点属性
      const columnNextProp = columnNext.prop;
      /**
       * 1.判断当前节点是否有下级节点
       * 2.判断当前节点是否有值
       */
      if (
        this.validatenull(list) ||
        this.validatenull(value) ||
        this.validatenull(columnNext)
      ) {
        return;
      }

      // 如果不是首次加载则清空全部关联节点的属性值和字典值
      if (this.formList.includes(str)) {
        // 清空子类字典列表和值
        list.forEach(ele => {
          this.form[ele] = '';
          this.$set(this.DIC, ele, []);
        });
      }
      // 根据当前节点值获取下一个节点的字典
      sendDic({ url: columnNext.dicUrl.replace('{{key}}', value), resKey: (column.props || {}).res }).then(
        res => {
          const dic = Array.isArray(res) ? res : [];
          // 修改字典
          this.$set(this.DIC, columnNextProp, dic);
          /**
           * 1.是change多级默认联动
           * 2.字典不为空
           * 3.非首次加载
           */
          if (!this.validatenull(dic) && this.formList.includes(str)) {
            // 取字典的指定项或则第一项
            let dicvalue = dic[columnNext.defaultIndex || 0];
            if (!dicvalue) dicvalue = dic[0];
            if (dicvalue) {
              this.form[columnNext.prop] =
                dicvalue[
                  (columnNext.props || this.parentOption.props || {}).value || 'value'
                ];
              this.clearValidate();
            }
          }
          // 首次加载的放入队列记录
          if (!this.formList.includes(str)) this.formList.push(str);
        }
      );
    },
    formVal () {
      Object.keys(this.value).forEach(ele => {
        this.$set(this.form, ele, this.value[ele]);
      });
      this.forEachLabel();
      this.$emit('input', this.form);
    },
    handleMock () {
      if (this.isMock) {
        this.columnOption.forEach(column => {
          const form = mock(column.column, this.DIC, this.form, this.isMock);
          if (!this.validatenull(form)) {
            Object.keys(form).forEach(ele => {
              this.form[ele] = form[ele];
            });
            this.clearValidate();
          }
        });
        this.$message.success('模拟数据填充成功');
      }
    },
    // 验证表单是否禁止
    vaildDisabled (column) {
      if (this.disabled) return true;
      if (!this.validatenull(column.disabled)) {
        return this.vaildData(column.disabled, false);
      } else if (this.boxType === 'add') {
        return this.vaildData(column.addDisabled, false);
      } else if (this.boxType === 'edit') {
        return this.vaildData(column.editDisabled, false);
      } else if (this.boxType === 'view') {
        return true;
      } else {
        return false;
      }
    },
    // 验证表单是否显隐
    vaildDisplay (column) {
      if (!this.validatenull(column.display)) {
        return this.vaildData(column.display, true);
      } else if (this.boxType === 'add') {
        return this.vaildData(column.addDisplay, true);
      } else if (this.boxType === 'edit') {
        return this.vaildData(column.editDisplay, true);
      } else if (this.boxType === 'view') {
        return this.vaildData(column.viewDisplay, true);
      } else {
        return true;
      }
    },
    rulesInit (option) {
      (option || this.columnOption).forEach(ele => {
        if (ele.rules && ele.display !== false) { this.$set(this.formRules, ele.prop, ele.rules); }
      });
      this.$nextTick(() => {
        this.clearValidate();
      });
    },
    clearValidate () {
      this.$refs.form.clearValidate();
    },
    validateNull () {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject();
          }
        });
      });
    },
    cancel() {
      if (this.tableOption.cancelConfirm === false) {
        this.resetForm()
        this.$emit('cancel');
      } else {
        this.confirmCancel()
      }
    },
    confirmCancel() {
      this.$confirm('确定不保存数据情况下返回吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        iconClass: 'el-icon-warning-outline',
        confirmButtonClass: 'comfirm-btn',
        type: 'warning'
      }).then(() => {
        this.resetForm()
        this.$emit('cancel');
      })
    },
    /**
     * 清空表单字段
     * @param part:true 清空在column中字段,否则清空全部
     */
    resetForm (params = {}) {
      const part = params.part;
      if (part) {
        this.columnOption.forEach(ele => {
          ele.column.forEach(column => {
            const prop = column.prop;
            this.form[prop] = this.formDefault.tableForm[prop];
          });
        });
      } else {
        this.form = this.deepClone(this.formDefault.tableForm);
      }
      this.$emit('input', this.form);
      this.$emit('reset-change');
      this.clearValidate();
    },
    // 校验表单的回调
    validate (callback) {
      this.$refs['form'].validate(valid => callback(valid));
    },
    // 提交表单事件 @create 是否需要保存并新增的标志
    submit (create) {
      this.validate(valid => {
        if (valid) {
          if (create) {
            this.form.$saveCreate = true
          } else {
            delete this.form.$saveCreate
          }
          this.$emit('submit', this.form, create);
        }
      });
    },
    // 重置表单所有字段
    resetFields() {
      this.$refs['form'].resetFields()
    },
    // 清空某个表单元素
    clearFormItem(prop) {
      this.form[prop] = ''
      this.$refs[prop] && this.$refs[prop][0].clearFormItem && this.$refs[prop][0].clearFormItem()
    },
    // 时间控件关联属性处理
    handleDateRelationOpt() {
      const { group, column } = this.tableOption
      if (group) {
        group.forEach((gItem, gIndex) => {
          const { column } = gItem
          if (column) {
            column.forEach(item => {
              // 获取当前存在时间关联属性
              const { relationProps = [] } = item
              // 获取时间关联属性中的关联值
              const [relationKey] = relationProps
              // 获取当前唯一属性key
              const key = item.prop
              // 获取当前key的最新的值
              const endNodeParent = this.$refs[relationKey]
              // 存在关联关系
              if (relationKey && endNodeParent) {
                const endNode = endNodeParent[0].$children[0]
                this.$watch(`form.${key}`, (val) => {
                  const endTime = this.form[relationKey]
                  // 结束日期禁用配置
                  const opt = {
                    disabledDate: time => {
                      const selectTime = time.getTime()
                      // const valTime = val && new Date(val) || ''
                      const valTime = this.form[key] && new Date(this.form[key]) || ''
                      if (!valTime) return ''
                      return selectTime < valTime
                    }
                  }
                  // 查找关联节点的配置
                  const index = column.findIndex(item => item.prop === relationKey)
                  if (index > -1) {
                    // 获取传入的结束时间禁用配置
                    const pickerOptions = column[index].pickerOptions
                    // 更新关联节点的日期配置信息
                    // this.$set(this.tableOption.group[gIndex].column[index], 'pickerOptions', { ...(item.pickerOptions || {}), ...opt })
                    this.$set(this.tableOption.group[gIndex].column[index], 'pickerOptions', pickerOptions || opt)
                    if (!val) return
                    const vTime = new Date(val)
                    if (!endTime || vTime > new Date(endTime)) {
                      const time = new Date(vTime.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
                      this.form[relationKey] = this.$dayjs(new Date(time)).format('YYYY-MM-DD HH:mm:ss')
                      endNode.focus()
                    }
                  }
                })
              }
            })
          }
        })
      } else if (column) {
        column.forEach(item => {
          // 获取当前存在时间关联属性
          const { relationProps = [] } = item
          // 获取时间关联属性中的关联值
          const [relationKey] = relationProps
          // 获取当前唯一属性key
          const key = item.prop
          // 获取当前key的最新的值
          const endNodeParent = this.$refs[relationKey]
          // 存在关联关系
          if (relationKey && endNodeParent) {
            const endNode = endNodeParent[0].$children[0]
            this.$watch(`form.${key}`, (val) => {
              const endTime = this.form[relationKey]
              // 结束日期禁用配置
              const opt = {
                disabledDate: time => {
                  const selectTime = time.getTime()
                  // const valTime = val && new Date(val) || ''
                  const valTime = this.form[key] && new Date(this.form[key]) || ''
                  if (!valTime) return ''
                  // console.log('selectTime < valTime', selectTime, valTime);
                  return selectTime < valTime
                }
              }
              // 查找关联节点的配置
              const index = column.findIndex(item => item.prop === relationKey)
              if (index > -1) {
                // 获取传入的结束时间禁用配置
                const pickerOptions = column[index].pickerOptions
                // 更新关联节点的日期配置信息
                // this.$set(this.tableOption.column[index], 'pickerOptions', { ...(item.pickerOptions || {}), ...opt })
                this.$set(this.tableOption.column[index], 'pickerOptions', pickerOptions || opt)
                if (!val) return
                const vTime = new Date(val)
                if (!endTime || vTime > new Date(endTime)) {
                  const time = new Date(vTime.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
                  this.form[relationKey] = this.$dayjs(new Date(time)).format('YYYY-MM-DD HH:mm:ss')
                  console.log(55555555);
                  if (this.instantiated)endNode.focus()
                  this.instantiated = true
                }
              }
            })
          }
        })
      }
    }
  }
});
</script>

<style lang="css" scoped>

</style>
