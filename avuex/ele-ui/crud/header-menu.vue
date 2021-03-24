<template>
  <div :class="b('menu')">
    <div :class="b('left')">
      <el-button type="info"
                 @click="$parent.rowAdd"
                 :icon="config.addBtnIcon"
                 :size="$parent.isMediumSize"
                 :disabled="$parent.tableOption.addDisabled"
                 v-if="$parent.tableOption.addBtn !==false && $parent.permission.ADD">{{'新增'}}</el-button>
      <el-button type="info"
                 @click="$parent.rowCellAdd"
                 :icon="config.addBtnIcon"
                 :size="$parent.isMediumSize"
                 v-if="vaildData($parent.tableOption.addRowBtn,config.addRowBtn)">{{'新增行'}}</el-button>
      <el-button type="info"
                 @click="rowPrint"
                 :icon="config.printBtnIcon"
                 :size="$parent.isMediumSize"
                 v-if="vaildData($parent.tableOption.printBtn,config.printBtn)">{{'打印'}}</el-button>
      <el-button type="info"
                 @click="rowExcel"
                 :icon="config.excelBtnIcon"
                 :size="$parent.isMediumSize"
                 v-if="vaildData($parent.tableOption.excelBtn,config.excelBtn)">{{'导出'}}</el-button>
      <slot name="menuLeft"></slot>
    </div>
    <div :class="b('right')">
      <slot name="menuRight"></slot>

      <el-tooltip effect="dark"
                  :content="'刷 新'"
                  placement="top">
        <el-button :icon="config.refreshBtnIcon"
                   circle
                   :size="$parent.isMediumSize"
                   @click="$parent.refreshChange"
                   v-if="vaildData($parent.tableOption.refreshBtn,config.refreshBtn)"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="'显 隐'"
                  placement="top">
        <el-button :icon="config.columnBtnIcon"
                   circle
                   :size="$parent.isMediumSize"
                   @click="$parent.$refs.dialogColumn.columnBox=true"
                   v-if="vaildData($parent.tableOption.columnBtn,config.columnBtn)"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="'查 询'"
                  placement="top">
        <el-button :icon="config.searchBoxBtnIcon"
                   circle
                   :size="$parent.isMediumSize"
                   @click="$parent.$refs.headerSearch.handleSearchShow()"
                   v-if="($parent.$refs.headerSearch || {}).searchFlag && vaildData($parent.tableOption.searchBtn,config.searchBtn)"></el-button>
      </el-tooltip>
      <el-tooltip effect="dark"
                  :content="'过 滤'"
                  placement="top">
        <el-button :icon="config.filterBtnIcon"
                   circle
                   :size="$parent.isMediumSize"
                   @click="$parent.$refs.dialogFilter.box=true"
                   v-if="vaildData($parent.tableOption.filterBtn,config.filterBtn)"></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import tableTemp from '../../utils/tableTemp';
import create from '../../core/create';
import config from './config';
import { vaildData } from '../../utils/util';
export default create({
  name: 'crud',
  mixins: [],
  data() {
    return {
      config: config
    };
  },
  created() {
    this.vaildData = vaildData;
  },
  computed: {
    data() {
      if (this.$parent.tableOption.selection) {
        return this.$parent.tableSelect;
      } else {
        return this.$parent.list;
      }
    }
  },
  methods: {
    // 下载excel
    rowExcel() {
      if (!window.saveAs || !window.XLSX) {
        console.log('please npm install file-saver -S');
        console.log('please npm install xlsx -S');
        return;
      }
      if (this.validatenull(this.data)) {
        this.$message.warning('请勾选要导出的数据');
        return;
      }
      this.$export.excel({
        title: this.$parent.tableOption.title || new Date().getTime(),
        columns: (() => {
          const list = [];
          this.$parent.propOption.forEach(ele => {
            if (this.columnIndex.includes(ele.prop)) {
              list.push({
                label: ele.label,
                prop: (() => {
                  if (
                    !this.validatenull(this.$parent.DIC[ele.prop]) ||
                    !this.validatenull(this.$parent.cascaderDIC[ele.prop])
                  ) {
                    return '$' + ele.prop;
                  }
                  return ele.prop;
                })()
              });
            }
          });
          return list;
        })(),
        data: this.handleSum()
      });
      this.$parent.setCurrentRow();
    },
    // 计算统计
    handleSum() {
      const option = this.$parent.tableOption;
      const columnOption = this.$parent.propOption;
      let count = 0;
      const data = [...this.data];
      const sumsList = [...this.$parent.sumsList];
      if (option.index) count++;
      if (option.selection) count++;
      if (option.expand) count++;
      sumsList.splice(0, count);
      sumsList.splice(sumsList.length - 1, 1);
      if (option.showSummary) {
        const sumsObj = {};
        sumsList.forEach((ele, index) => {
          sumsObj[columnOption[index].prop] = ele;
        });
        data.push(sumsObj);
      }
      return data;
    },
    // 打印
    rowPrint() {
      if (this.validatenull(this.data)) {
        this.$message.warning('请勾选要打印的数据');
        return;
      }
      let headerOption = [];
      const getTemplate = () => {
        headerOption = this.$parent.propOption.filter(ele => {
          return ele.hide !== true
        });
        return tableTemp(
          headerOption,
          this.handleSum(),
          this.$parent.tableOption
        );
      };

      this.$nextTick(() => {
        var newstr = getTemplate();
        var tab = window.open('', '打印');
        tab.document.open();
        tab.document.write(newstr);
        tab.window.print();
        tab.close();
      });
    }
  }
});
</script>
