<template>
  <div :class="b()">
    <avue-group v-for="(item,index) in columnOption"
                :key="index"
                :display="item.display"
                :card="parentOption.card"
                :expand="parentOption.groupExpand"
                :icon="item.icon"
                :styleType="styleType"
                :label="item.label">
      <template slot="header" v-if="$slots[item.prop+'Header']">
        <slot :name="item.prop+'Header'"></slot>
      </template>
      <div :class="b('group')">
        <!-- 分组的slot -->
        <div class="group-content" v-if="item.slot">
          <slot :name="item.prop" :row="form" :column="item" ></slot>
        </div>
        <!-- 没有slot -->
        <template v-else v-for="(column,cindex) in item.column">
          <div v-if="cindex && item.column[cindex - 1].nextLine" :key="cindex" class="form-dividingline" :class="{'dialog-line': tableOption.dialogForm}"></div>
          <template v-if="!item.slot && vaildData(column.viewDisplay,true)">
            <div class="avue-detail__box"
                :key="column.prop"
                :class="b('item--' + (column.labelPosition ||item.labelPosition || '' ||column.span === 24 ? 'inline' :column.span ? column.span : ''))">
              <div :class="b('label',[labelPostion])" :style="getLabelWidth(column,item)">{{column.formAlias?  column.formAlias + '：' : column.label ? column.label + '：' : ''}}</div>
              <slot v-if="column.viewslot"
                    :name="column.prop + 'View'"
                    :column="column"
                    :row="form"
                    :label="form['$'+column.prop]"></slot>
              <template v-else>
                <div :class="b('content')">{{handleDetail(column, item, DIC[column.prop]) || '--'}}</div>
              </template>
            </div>
          </template>
        </template>
      </div>
      <!-- <template v-for="(column,cindex) in item.column">
        <div v-if="cindex && item.column[cindex - 1].nextLine" :key="cindex" class="form-dividingline" :class="{'dialog-line': tableOption.dialogForm}"></div>
        <template v-if="!item.slot && vaildData(column.viewDisplay,true)">
          <el-col :md="column.span || 6"
                  :xl="column.span || 4"
                  :sm="12"
                  :xs="24"
                  :key="column.prop">
            <div :class="b('box')">
              <div :class="b('label',[labelPostion])"
                    :style="getLabelWidth(column,item)">{{column.label ? column.label) + ' :' : '' }}</div>
              <slot v-if="column.viewslot"
                    :name="column.prop+'View'"
                    :column="column"
                    :row="form"
                    :label="form['$'+column.prop]"></slot>
              <template v-else>
                <span :class="b('content')">{{handleDetail(column, item, DIC[column.prop]) || '--'}}</span>
              </template>
            </div>
          </el-col>
          <div :class="b('line')"
              :key="cindex"
              :style="{width:(column.count/24*100)+'%'}"
              v-if="!isMobile && column.row && column.span !== 24 && column.count"></div>
        </template>
      </template> -->
    </avue-group>
    <!-- <div :class="b('menu',['right'])" style="text-align: right;" v-if="option.cacelBtn">
      <el-button @click="back" style="margin-right: 10px;">{{'取消')}}</el-button>
    </div> -->
  </div>
</template>

<script>
import create from '../../core/create';
import init from '../../core/crud/init.js';
import { detail } from '../../core/common/detail';
// eslint-disable-next-line no-unused-vars
import { calcCount, calcCascader } from '../../core/common/dataformat';
// import remove from 'lodash/remove'
// import forEach from 'lodash/forEach'
import { arraySort } from '../../utils/util';

export default create({
  name: 'detail',
  mixins: [init('detail')],
  props: {
    value: {},
    styleType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {},
      itemSpanDefault: 8
    };
  },
  computed: {
    parentOption() {
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
    labelPostion: function() {
      if (this.option.labelPostion) {
        return this.tableOption.labelPostion;
      }
      return 'left';
    },
    columnOption() {
      const list = [...this.parentOption.group] || [];
    // eslint-disable-next-line no-unused-vars
      list.forEach((ele, index) => {
        // 根据字段formSort排序
        ele.column = arraySort(ele.column || [], 'formSort')
        // 循环列的全部属性
        ele.column.forEach((column, cindex) => {
          // 动态计算列的位置，如果为隐藏状态则或则手机状态不计算
          if (column.display !== false && !this.isMobile) {
            column = calcCount(column, this.itemSpanDefault, cindex === 0);
          }
        });
      });
      return list;
    }
  },
  watch: {
    value: {
      handler() {
        this.form = this.value;
        // this.loadDic();
      },
      deep: true
    }
  },
  created() {
    this.form = this.value;
    this.loadDic();
  },
  methods: {
    back() {
      this.$emit('back')
    },
    getLabelWidth(column, item) {
      const labelWidth = column.labelWidth || item.labelWidth;
      if (labelWidth) {
        return {
          minWidth: 0
          // marginRight: 0
        };
      }
      return {
        width: this.setPx(labelWidth)
      };
    },
    loadDic() {
      // 初始化字典
      this.columnOption.forEach(ele => {
        this.handleLoadDic(ele);
        this.handleLoadCascaderDic(ele.column, this.form);
      });
    },
    handleDetail(column, option, DIC) {
      // 如果配置了viewProp属性,直接取viewProp的值,否则查找字典的label
      if (column.viewProp) return this.form[column.viewProp]
      let result = this.form[column.viewProp || column.prop];
      result = detail(this.form, column, option, DIC);
      if (!this.validatenull(DIC)) {
        this.form['$' + column.prop] = result;
      }
      return result;
    }
  }
});
</script>
