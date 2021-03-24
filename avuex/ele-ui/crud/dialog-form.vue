<template>
  <el-dialog lock-scroll
             :class="b('dialog')"
             v-dialogDrag="$parent.tableOption.dialogDrag || false"
             :custom-class="config.customClass + ' ' + $parent.tableOption.customDialogClass && $parent.tableOption.customDialogClass"
             :fullscreen="$parent.isMobile ? true : $parent.tableOption.dialogFullscreen"
             :modal-append-to-body="false"
             append-to-body
             :top="setPx($parent.tableOption.dialogTop, 120)"
             :title="$parent.functionName + $parent.tableOption.boxTypeText || boxType === 'edit'?'编辑':'新增'"
             :close-on-press-escape="$parent.tableOption.dialogEscape"
             :close-on-click-modal="vaildData($parent.tableOption.dialogClickModal,false)"
             :modal="$parent.tableOption.dialogModal"
             :show-close="$parent.tableOption.dialogCloseBtn"
             :width="dialogWidth"
             :visible.sync="boxVisible"
             @close="closeDialog">
    <div :style="{ height:dialogHeight, overflow:'unset' }" ref="content" v-loading="$parent.dialogLoading">
      <el-scrollbar style="height:100%">
        <avue-form v-model="tableForm"
                   v-if="boxVisible"
                   ref="tableForm"
                   :disabled="keyBtn"
                   :uploadBefore="$parent.uploadBefore"
                   :uploadAfter="$parent.uploadAfter"
                   :option="formOption">
          <template slot-scope="scope"
                    v-for="item in columnFormOption"
                    :slot="item.prop">
            <slot :value="scope.value"
                  :column="scope.column"
                  :dic="scope.dic"
                  :size="scope.size"
                  :label="scope.label"
                  :disabled="scope.disabled"
                  :row="tableForm"
                  :name="item.prop"
                  v-if="item.formslot"></slot>
          </template>
        </avue-form>
      </el-scrollbar>
    </div>

    <span slot="footer"
          class="dialog-footer">
      <!-- 弹出框按钮组 -->
      <el-button type="info"
                 @click="saveAndCreate"
                 :size="$parent.controlSize"
                 v-if="boxType==='add' && $parent.tableOption.saveCreate"
                 :loading="keyBtn">保存并新增</el-button>
      <slot name="menuForm"
            :type="boxType"
            :size="$parent.controlSize"></slot>
      <el-button :size="$parent.controlSize"  @click="closeDialog">取 消</el-button>

      <el-button type="primary"
                 @click="rowUpdate"
                 :size="$parent.controlSize"
                 v-if="boxType==='edit'"
                 :loading="keyBtn">保 存</el-button>
      <el-button type="primary"
                 @click="rowSave"
                 :size="$parent.controlSize"
                 :loading="keyBtn"
                 v-else-if="boxType==='add'">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Vue from 'vue'
import create from '../../core/create';
import config from './config';
import forEach from 'lodash/forEach'
export default create({
  name: 'crud',
  mixins: [],
  data() {
    return {
      config: config,
      boxType: '',
      keyBtn: false,
      boxVisible: false,
      boxHeight: 0,
      tableForm: {},
      index: -1,
      dialogWidth: ''
    };
  },
  props: {
    columnFormOption: {},
    value: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    value: {
      handler() {
        this.formVal();
      },
      deep: true
    },
    tableForm: {
      handler() {
        this.$emit('input', this.tableForm);
      },
      deep: true
    }
  },
  created() {
    this.isWideScreen = matchMedia('(max-width: 1440px)');
    this.widthChange(this.isWideScreen)
    this.isWideScreen.addListener(this.widthChange)
  },
  destroyed() {
    // 移除监听的事件
    this.isWideScreen.removeListener(this.widthChange)
  },
  computed: {
    dialogHeight() {
      return this.setPx(
        this.vaildData(this.$parent.tableOption.dialogHeight, config.dialogHeight)
      );
    },
    formOption() {
      const option = this.deepClone(this.$parent.tableOption);
      option.menuBtn = false;
      option.styleType = option.styleType || 'noBorder'
      option.boxType = this.boxType;
      option.column = this.$parent.propOption;
      // 不分组的表单不加载字典
      if (!this.$parent.isGroup) {
        option.dicFlag = false;
        // TODO 待优化
        // option.dicData = { ...this.$parent.DIC };
        option.dicData = this.$parent.DIC
      }
      return option;
    }
  },
  methods: {
    widthChange(x) {
      if (x.matches) {
        // 小于1440
        this.dialogWidth = '720px'
      } else {
        // 大于1440
        this.dialogWidth = '940px'
      }
    },
    updateDic(prop, list, params) {
      this.$refs.tableForm.updateDic(prop, list, params);
    },
    formVal() {
      Object.keys(this.value).forEach(ele => {
        this.tableForm[ele] = this.value[ele];
      });
      this.$emit('input', this.tableForm);
    },
    // 清空表单
    resetForm() {
      this.$refs['tableForm'].resetForm();
      this.$emit('input', this.tableForm);
      Vue.nextTick(() => {
        this.$refs.tableForm && this.$refs.tableForm.clearValidate()
      })
    },
    // 保存
    rowSave(isClose = true) {
      this.$refs['tableForm'].validate(vaild => {
        if (!vaild) return;
        this.keyBtn = true;
        this.$parent.$emit(
          'row-save',
          this.deepClone(this.tableForm),
          isClose ? this.closeDialog : null,
          () => {
            this.keyBtn = false;
          }
        );
      });
    },
    // 保存并新增另外一条
    saveAndCreate() {
      this.$refs['tableForm'].validate(vaild => {
        if (!vaild) return;
        this.keyBtn = true;
        this.$parent.$emit(
          'row-save-create',
          this.deepClone(this.tableForm),
          this.clearForm,
          () => {
            this.keyBtn = false;
          }
        );
      });
    },
    // 更新
    rowUpdate(isClose = true) {
      this.$refs['tableForm'].validate(vaild => {
        if (!vaild) return;
        this.keyBtn = true;
        this.$parent.$emit(
          'row-update',
          this.deepClone(this.tableForm),
          this.index,
          isClose ? this.closeDialog : null,
          this.$parent.oldFormData,
          () => {
            this.keyBtn = false;
          }
        );
      });
    },
    closeDialog() {
      this.tableForm = {};
      this.boxVisible = false;
      this.keyBtn = false;
      this.hide();
    },
    clearForm() {
      forEach(this.columnFormOption.column, (item) => {
        if (item.remote) {
          this.updateDic(item.prop, [])
        }
      })
      this.$refs['tableForm'].resetFields()
      this.keyBtn = false;
    },
    // 隐藏表单
    hide() {
      const callack = () => {
        this.$refs['tableForm'].resetForm();
      };
      if (typeof this.$parent.beforeClose === 'function') {
        this.$parent.beforeClose(callack, this.boxType);
      } else {
        callack();
      }
    },
    // 显示表单
    show(type, index = -1) {
      this.index = index;
      this.boxType = type;
      const callack = () => {
        this.$nextTick(() => {
          this.boxVisible = true;
        });
      };
      if (typeof this.$parent.beforeOpen === 'function') {
        this.$parent.beforeOpen(callack, this.boxType);
      } else {
        callack();
      }
    },
    // 清空某个表单元素
    clearFormItem(prop) {
      this.$refs.tableForm.clearFormItem(prop);
    }
  }
});
</script>
