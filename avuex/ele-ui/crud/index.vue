<template>
  <div :class="b()">
    <!-- 头部组件 -->
    <!-- <header-title ref="headerTitle" id="jmsTitle" v-show="printKey && vaildData(tableOption.header,true)"></header-title> -->

    <!-- 顶部操作栏 -->
    <div :class="b('menu')" class="top-menu" id="jmsTopMenu">
      <!-- 顶部操作栏左  -->
      <!-- TODO permission鉴权要不要在组件里 因为这会触发一个bug 同一个路由多个crud实例 会导致权限篡乱 目前没有这样式情况 但是这不合理-->
      <div :class="b('left')">
        <slot name="menuLeftPre"></slot>
        <el-button
          type="info"
          @click="importExcel"
          icon="iconfont icondaoru1"
          :size="isMediumSize"
          v-if="vaildData(tableOption.importBtn, false)"
          >导入</el-button
        >
        <el-button
          type="info"
          @click="rowAdd"
          :icon="config.addBtnIcon"
          :size="isMediumSize"
          :disabled="tableOption.addDisabled"
          v-if="
            vaildData(tableOption.addBtn, true) &&
            permission['ADD' + vaildData(tableOption.perSuffix, '')]
          "
          >新增</el-button
        >
        <el-button
          type="info"
          @click="deleteRows"
          icon="iconfont iconshanchu2"
          :size="isMediumSize"
          :loading="tableOption.deleteLoading"
          :disabled="vaildData(tableOption.deleteDisabled, !tableSelect.length)"
          v-if="
            vaildData(tableOption.deleteBtn, false) &&
            permission['DELETE' + vaildData(tableOption.perSuffix, '')]
          "
          >删除</el-button
        >
        <el-button
          type="primary"
          @click="searchChange"
          :icon="config.searchBtnIcon"
          :size="isMediumSize"
          :loading="tableLoading"
          class="btn-query"
          v-if="vaildData(tableOption.search, true)"
          >查询</el-button
        >
        <el-button
          type="info"
          @click="exportExcel"
          icon="iconfont icondaochu1"
          :size="isMediumSize"
          :loading="exportLoading"
          v-if="vaildData(tableOption.exportBtn, false)"
          >导出</el-button
        >
        <el-button
          type="info"
          @click="exportExcelAll"
          icon="iconfont icondaochuquanbu"
          :size="isMediumSize"
          :loading="exportLoading"
          v-if="vaildData(tableOption.exportAllBtn, false)"
          >导出全部</el-button
        >
        <el-button
          type="info"
          @click="searchReset"
          :icon="config.emptyBtnIcon"
          :size="isMediumSize"
          v-if="vaildData(tableOption.search, true)"
          >清空</el-button
        >
        <el-button
          type="info"
          @click="chartModel"
          :icon="config.chartBtnIcon"
          :size="isMediumSize"
          v-if="vaildData(tableOption.chartBtn, false)"
          >图表模式</el-button
        >
        <slot name="menuLeft"></slot>
      </div>
      <!-- 顶部操作栏右 -->
      <div :class="b('right')">
        <slot name="menuRight"></slot>
        <template v-if="vaildData(tableOption.searchExpand, true)">
          <el-button
            v-if="hasAdvanced"
            type="info"
            @click="$refs.headerSearch.advancedToggle"
          >
            <span
              class="iconfont icon-more"
              :class="{
                iconputongtiaojian1: $refs.headerSearch.advancedShow,
                icongaojitiaojian1: !$refs.headerSearch.advancedShow,
              }"
            ></span>
            <span class="more" v-if="$refs.headerSearch.advancedShow">{{
              '普通条件' | lang
            }}</span>
            <span class="more" v-else>{{ '高级条件' | lang }}</span>
          </el-button>
          <el-button
            @click="$refs.headerSearch.toggle"
            type="text"
            class="toggle"
            v-if="
              ($refs.headerSearch || {}).searchFlag &&
              vaildData(tableOption.searchBtn, true)
            "
          >
            <span>{{
              $refs.headerSearch.searchShow ? '收起' : '展开'
            }}</span>
            <span
              class="el-icon-caret-bottom arrow"
              :class="{
                expaned: $refs.headerSearch.searchShow,
                unexpaned: !$refs.headerSearch.searchShow,
              }"
            ></span>
          </el-button>
        </template>
      </div>
    </div>

    <!-- 搜索组件 -->
    <header-search
      v-model="searchForm"
      id="jmsSearch"
      ref="headerSearch"
      v-show="printKey"
      v-if="vaildData(tableOption.search, true)"
    >
      <template
        slot-scope="searchForm"
        slot="headerSearchSlot"
        v-if="tableOption.headerSearchslot"
      >
        <slot name="headerSearch" :data="searchForm"></slot>
      </template>
      <template
        slot-scope="{ value, column, dic, size, label, disabled }"
        v-for="item in searchOption"
        :slot="item.prop + 'Search'"
      >
        <slot
          :name="item.prop + 'Search'"
          v-if="item.searchslot"
          :value="value"
          :column="column"
          :dic="dic"
          :size="size"
          :label="label"
          :disabled="disabled"
          :form="searchForm"
        ></slot>
      </template>
      <template slot="search">
        <slot name="search"></slot>
      </template>
      <template slot="searchMenu">
        <slot name="searchMenu"></slot>
      </template>
    </header-search>

    <!-- 表格功能列 -->
    <!-- <header-menu ref="headerMenu" id="jmsMenu" v-if="printKey && vaildData(tableOption.header,true)">
      <template slot="menuLeft">
        <slot name="menuLeft"></slot>
      </template>
      <template slot="menuRight">
        <slot name="menuRight"></slot>
      </template>
    </header-menu> -->

    <!-- 表格功能列 -->
    <div
      class="avue-crud__searchExtend"
      id="jmsSearchExtend"
      v-if="$slots.searchExtend"
    >
      <slot name="searchExtend"></slot>
    </div>

    <!-- 头部选择项展示 -->
    <div
      class="avue-crud__tip"
      id="jmsTip"
      v-if="tableOption.tip && tableOption.selection"
    >
      <span class="avue-crud__tip-name">
       已选择
        <span class="avue-crud__tip-count">{{ selectLen }}</span>
        项
      </span>
      <el-button
        type="text"
        size="small"
        @click="selectClear"
        v-if="tableOption.selectClearBtn && tableOption.selection"
        >清 空</el-button
      >
      <slot name="tip"></slot>
    </div>

    <!-- 表格主体 -->
    <el-table
      v-if="doLayout"
      v-show="!tableOption.tableHide"
      ref="table"
      highlight-current-row
      v-loading="tableLoading"
      :data="list"
      :row-key="handleGetRowKeys"
      :size="controlSize"
      :border="vaildData(tableOption.border, config.border)"
      :expand-row-keys="tableOption.expandRowKeys"
      :default-expand-all="tableOption.defaultExpandAll"
      :show-summary="tableOption.showSummary"
      :summary-method="tableSummaryMethod"
      :span-method="tableSpanMethod"
      :stripe="tableOption.stripe || true"
      :selectable="tableOption.selectable"
      :show-header="tableOption.showHeader"
      :default-sort="tableOption.defaultSort"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :header-cell-class-name="headerCellClassName"
      :max-height="tableOption.maxHeight"
      :height="tableOption.tableHeight || tableHeight - (tableOption.fixHeight || 0)"
      :width="setPx(tableOption.width, config.width)"
      @current-change="currentRowChange"
      @expand-change="expandChange"
      @row-click="rowClick"
      @row-dblclick="rowDblclick"
      @cell-mouse-enter="cellMouseEnter"
      @cell-mouse-leave="cellMouseLeave"
      @cell-click="cellClick"
      @cell-dblclick="cellDblclick"
      @selection-change="selectionChange"
      @select="select"
      @select-all="selectAll"
      @sort-change="sortChange"
    >
      <!-- 暂无数据提醒 -->
      <template slot="empty">
        <div :class="b('empty')">
          <!-- 判断是否存在name=empty的插槽 -->
          <slot name="empty" v-if="$slots.empty"></slot>
          <!-- 不存在name=empty插槽 -->
          <template v-else>
            <!-- 区分loading状态以及异常状态 loading -->
            <avue-empty
              :loadingState="2"
              size="173"
              image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K"
              :desc="tableOption.emptyText || '暂无数据'"
            ></avue-empty>
          </template>
        </div>
      </template>

      <!-- 表格展开列  -->
      <el-table-column
        type="expand"
        width="60"
        align="center"
        fixed="left"
        v-if="tableOption.expand"
      >
        <template slot-scope="props">
          <slot :row="props.row" name="expand"></slot>
        </template>
      </el-table-column>

      <!-- 选择框 -->
      <el-table-column
        v-if="tableOption.selection"
        type="selection"
        width="50"
        fixed="left"
        align="center"
        :selectable="tableOption.selectable"
        :reserve-selection="vaildData(tableOption.reserveSelection, false)"
      >
      </el-table-column>

      <!-- 序号 -->
      <el-table-column
        v-if="this.vaildData(tableOption.index, true)"
        type="index"
        width="60"
        fixed="left"
        align="center"
        :label="tableOption.indexLabel || config.indexLabel"
        :index="indexMethod"
      >
      </el-table-column>

      <!-- 占位列解决ele固定列导致的问题 -->
      <el-table-column
        width="1px"
        v-show="false"
        class-name="jms-hidden-column"
      ></el-table-column>

      <!-- 表格所有列 -->
      <!-- <column :columnOption="tableColumn"> -->
      <!-- 每列的自定义slot -->
      <!-- <template v-for="item in propOption"
                  slot-scope="scope"
                  :slot="item.prop">
          <slot :row="scope.row"
                :dic="scope.dic"
                :size="scope.size"
                :label="scope.label"
                :name="item.prop"></slot>
        </template>
      </column> -->
      <template v-for="column in tableColumn">
        <column :column="column" :key="column.prop">
          <!-- 每列的自定义slot -->
          <template
            v-for="item in propOption"
            slot-scope="scope"
            :slot="item.prop"
          >
            <slot
              :row="scope.row"
              :dic="scope.dic"
              :size="scope.size"
              :label="scope.label"
              :name="item.prop"
            ></slot>
          </template>
        </column>
      </template>
      <!-- 操作列 -->
      <!--  :align="tableOption.menuAlign || config.menuAlign" -->
      <el-table-column
        fixed="right"
        :label="tableOption.rightTitle || '操作'"
        v-if="vaildData(tableOption.menu, config.menu)"
        :header-align="tableOption.menuheaderAlign || config.menuheaderAlign"
        :width="
          isMobile
            ? tableOption.menuXsWidth || config.menuXsWidth
            : tableOption.menuWidth || actionCompare || config.menuWidth
        "
      >
        <template
          slot="header"
          v-if="
            vaildData(tableOption.menu, config.menu) &&
            tableOption.dynamicOptions
          "
        >
          <div class="operate-column">
            <span>{{ '操作' }}</span>
            <el-button
              icon="iconfont iconshaixuan filter"
              type="text"
              @click="openDynamicDialog"
            ></el-button>
          </div>
        </template>
        <template slot-scope="{ row, $index, dic, label }">
          <template v-if="['button', 'text', 'icon'].includes(menuType)">
            <!-- 行内编辑保存按钮 -->
            <el-button
              type="text"
              :icon="row.$cellEdit ? config.saveBtnIcon : config.editBtnIcon"
              :size="isMediumSize"
              :disabled="btnDisabled"
              @click.stop="rowCell(row, $index)"
              :title="'保存'"
              v-if="
                tableOption.cellBtn &&
                permission['EDIT' + vaildData(tableOption.perSuffix, '')]
              "
              >{{ row.$cellEdit ? 'save' : 'edit' }}</el-button
            >
            <!-- 行内编辑取消按钮 -->
            <el-button
              type="text"
              :icon="config.cancelBtnIcon"
              :size="isMediumSize"
              :disabled="btnDisabled"
              @click.stop="rowCanel(row, $index)"
              :title="'取消'"
              v-if="row.$cellEdit && tableOption.cancelBtn"
            ></el-button>
            <!-- 查看按钮 -->
            <!-- <el-tooltip class="item" effect="dark" content="查看" placement="top"> -->
            <el-button
              type="text"
              :icon="config.viewBtnIcon"
              :size="isMediumSize"
              :disabled="tableOption.viewDisabled"
              :class="{ 'icon-btn-disabled': tableOption.viewDisabled }"
              @click.stop="view(row, $index)"
              :title="'查看'"
              v-if="
                tableOption.viewBtn !== false &&
                permission['DETAIL' + vaildData(tableOption.perSuffix, '')] &&
                row.$view !== false
              "
            ></el-button>
            <!-- </el-tooltip> -->
            <!-- 编辑按钮 -->
            <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top"> -->
            <el-button
              type="text"
              :icon="config.editBtnIcon"
              :size="isMediumSize"
              :disabled="tableOption.editDisabled"
              :class="{ 'icon-btn-disabled': tableOption.editDisabled }"
              @click.stop="rowEdit(row, $index)"
              :title="'编辑'"
              v-if="
                tableOption.editBtn !== false &&
                permission['EDIT' + vaildData(tableOption.perSuffix, '')] &&
                row.$edit !== false
              "
            ></el-button>
            <!-- </el-tooltip> -->
            <!-- 删除按钮 -->
            <!-- <el-tooltip class="item" effect="dark" content="删除" placement="top"> -->
            <el-button
              type="text"
              :icon="config.delBtnIcon"
              :size="isMediumSize"
              :disabled="tableOption.delDisabled"
              :class="{ 'icon-btn-disabled': tableOption.delDisabled }"
              @click.stop="rowDel(row, $index)"
              :title="'删除'"
              v-if="
                tableOption.delBtn !== false &&
                permission['DELETE' + vaildData(tableOption.perSuffix, '')] &&
                !row.$cellEdit &&
                row.$delete !== false
              "
            ></el-button>
            <!-- </el-tooltip> -->
          </template>
          <el-dropdown
            v-else-if="menuType === 'menu'"
            style="margin-right: 9px"
          >
            <el-button type="primary" :size="isMediumSize">
              {{ '更 多'}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-if="
                  tableOption.viewBtn !== false &&
                  permission['DETAIL' + vaildData(tableOption.perSuffix, '')] &&
                  row.$view !== false
                "
                @click.native="rowView(row, $index)"
                >{{ '查 看'}}</el-dropdown-item
              >
              <el-dropdown-item
                divided
                v-if="
                  tableOption.editBtn !== false &&
                  permission['EDIT' + vaildData(tableOption.perSuffix, '')] &&
                  row.$edit !== false
                "
                @click.native="rowEdit(row, $index)"
              >
                {{ '编 辑'}}</el-dropdown-item
              >
              <el-dropdown-item
                divided
                v-if="
                  tableOption.delBtn !== false &&
                  permission['DELETE' + vaildData(tableOption.perSuffix, '')] &&
                  row.$delete !== false
                "
                @click.native="rowDel(row, $index)"
                >{{ '删 除'}}</el-dropdown-item
              >
              <slot
                name="menuBtn"
                :row="row"
                :dic="dic"
                :label="label"
                :index="$index"
              ></slot>
            </el-dropdown-menu>
          </el-dropdown>
          <slot
            name="menu"
            :row="row"
            :disabled="btnDisabled"
            :size="isMediumSize"
            :index="$index"
          ></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          tableOption.dynamicOptions &&
          !vaildData(tableOption.menu, config.menu)
        "
        align="center"
        width="30"
        fixed="right"
      >
        <template slot="header">
          <el-button
            style="margin-left: -5px"
            icon="iconfont iconshaixuan filter"
            type="text"
            @click="openDynamicDialog"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <table-page
      ref="tablePage"
      id="jmsPagination"
      v-show="printKey && tableOption.pagination !== false"
    ></table-page>

    <!-- 表单 -->
    <dialog-form
      ref="dialogForm"
      :class="dialogClass"
      :columnFormOption="columnFormOption"
      v-model="tableForm"
      v-if="(tableOption.customAdd || tableOption.customEdit) !== true"
    >
      <template
        slot-scope="{ value, column, dic, size, label, disabled }"
        v-for="item in columnFormOption"
        :slot="item.prop"
      >
        <slot
          :value="value"
          :column="column"
          :dic="dic"
          :size="size"
          :label="label"
          :disabled="disabled"
          :row="tableForm"
          :index="tableIndex"
          :name="item.prop + 'Form'"
          v-if="item.formslot"
        ></slot>
      </template>
      <template slot-scope="{ tableForm, boxType, size }" slot="menuForm">
        <slot
          name="menuForm"
          :size="size"
          :form="tableForm"
          :type="boxType"
        ></slot>
      </template>
    </dialog-form>

    <!-- 查看弹窗 -->
    <el-dialog
      ref="dialogView"
      :class="b('dialog', 'detial')"
      :open="viewOpen"
      lock-scroll
      v-if="tableOption.customView !== true"
      :custom-class="vaildData(tableOption.customClass, config.customClass)"
      :fullscreen="tableOption.dialogFullscreen"
      :modal-append-to-body="false"
      :append-to-body="true"
      :close-on-press-escape="tableOption.dialogEscape"
      :close-on-click-modal="false"
      :title="functionName + '查看'"
      :modal="tableOption.dialogModal"
      :show-close="tableOption.dialogCloseBtn"
      :visible.sync="viewVisible"
      :width="tableOption.dialogWidth || '940px'"
      @close="closeViewDialog"
    >
      <div
        :style="{ height: dialogHeight, overflow: 'unset' }"
        ref="content"
        :class="b('detail')"
        v-loading="dialogLoading"
      >
        <el-scrollbar style="height: 100%">
          <div :class="b('dialog', ['overflow'])">
            <avue-detail
              v-model="viewData"
              :option="this.tableOption"
              v-if="viewVisible"
              :styleType="'noBorder'"
            >
              <!-- 渲染查看插槽 viewslot  -->
              <template v-for="item in columnOption">
                <template :slot="item.prop + 'View'" v-if="item.viewslot">
                  <slot
                    :data="viewData[item.prop]"
                    :row="viewData"
                    :name="item.prop + 'View'"
                  ></slot>
                </template>
              </template>
            </avue-detail>
          </div>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :size="controlSize" @click="closeViewDialog">{{
          '关闭'}}</el-button>
      </span>
    </el-dialog>

    <!-- <dialog-column ref="dialogColumn" :dynamicColumns="dynamicColumns"></dialog-column> -->
    <!-- tableOption.dynamicOptions.getUrl -->
    <!-- 动态列 -->
    <drag-column
      v-if="dynamicColumns.length"
      ref="dragColumn"
      :dynamicColumns="dynamicColumns"
      :defaultUrl="tableOption.dynamicOptions.defaultUrl"
    ></drag-column>
  </div>
</template>
<script>
import create from '../../core/create'
import init from '../../core/crud/init.js'
import tablePage from './table-page'
import headerSearch from './header-search'
// import column from './column';
import column from './column-new'
// import headerMenu from './header-menu';
// import headerTitle from './header-title';
// import dialogColumn from './dialog-column';
import dragColumn from './drag-column'
import dialogForm from './dialog-form'
import config from './config.js'
import treeToArray, { addAttrs } from '../../core/crud/eval'
import { calcCascader } from '../../core/common/dataformat'
// 导入
// import find from 'lodash/find'
import server from '../../core/crud/pool.js'
import fetch, { RESPONSE_CODE } from '../../utils/axios'
// import remove from 'lodash/remove'
// import forEach from 'lodash/forEach'
import Sortable from 'sortablejs'
import debounce from 'lodash/debounce'
import { arraySort } from '../../utils/util'

export default create({
  name: 'crud',
  mixins: [init('crud')],
  provide() {
    return {
      crud: this,
    }
  },
  components: {
    column,
    tablePage, // 分页
    headerSearch, // 搜索
    // headerMenu, // 菜单头部
    // headerTitle, // 头部功能
    // dialogColumn, // 显隐列
    dragColumn,
    dialogForm, // 分页,
  },
  data() {
    return {
      config,
      functionName: '', // 当前模块的名字
      treeProp: '', // tree的字段
      boxType: 'add', // 弹窗类型
      tableIndex: -1, // 当前处理行的索引
      doLayout: false, // 是否显示表格
      keyBtn: false, // 是否显示表格
      isChild: false, // 是否包含子集
      viewVisible: false, // 查看可见
      columnConfVisible: false, // 查看可见
      printKey: true,
      dialogLoading: false, // 弹窗loading
      list: [], // 表格展示的数据
      expandList: [], // 展开的列
      formIndexList: [],
      tableSelect: [], // 已选中的数据
      sumsList: [], // 求和项
      dynamicColumns: [], // 动态列配置项
      searchOption: [], // 搜索的配置
      tableColumn: [], // 表格列配置
      tableForm: {}, // 弹窗表单
      searchForm: {}, // 搜索表单
      formRules: {}, // 表单校验
      formCellRules: {}, // 行编辑校验规则
      permission: {}, // 当前模块权限信息
      cascaderDicList: {}, // 级联字典
      formCascaderList: {}, // 表单级联
      viewData: {}, // 查看数据
      oldFormData: {}, // 上一次的数据
      tempActionCol: ['DELETE', 'EDIT', 'DETAIL'], // 初始按钮
      actionCompare: 15,
      sortableInstance: null,
      hasAdvanced: false,
      tableHeight: 400
    }
  },
  created() {
    // 初始化权限信息
    this.permissionInit()
    // 初始化数据 包括初始化操作按钮的显示影藏
    this.dataInit()
    // TODO 应该只初始化搜索栏的字典
    this.handleLoadDic()
    // 初始标题信息 TODO 要在弹窗初始化时执行
    this.titleInit()
    // 动态列初始化
    this.initSearchOption()
    // 初始化列
    this.initTableColumn()
    // 初始操作列
    this.initActionColWidth()
  },
  mounted() {
    this.doLayout = false
    this.$nextTick(() => {
      if (this.tableOption.dynamicOptions) {
        // 动态列初始化
        this.initDynamicColumn()
      } else {
        this.doLayout = true
      }
      // 如果有搜索激活搜索
      // if (this.$refs.headerSearch) this.$refs.headerSearch.init();
      // 是否开启表格拖拽排序
      if (this.tableOption.sortable) {
        setTimeout(this.setSort(), 0)
      }
    })
    this.$nextTick(() => {
      this.advanceFlag()
      // 绑定窗口resize事件
      const fn = debounce(this.advanceFlag, 200) // 表格高度计算防抖
      window.addEventListener('resize', fn, false)
      // 触发destroyed钩子，移除resize的监听事件
      this.$once('hook:destroyed', () => {
        window.removeEventListener('resize', fn, false)
      })
    })
    // 延迟1s执行拖拽初始化，避免出现节点未初始化完成的异常
    // setTimeout(this.columnDrop, 1000)
  },
  computed: {
    // 弹窗高度
    dialogHeight() {
      return this.setPx(
        this.vaildData(this.tableOption.dialogHeight, config.dialogHeight)
      )
    },
    // 全部配置项
    options() {
      return this.tableOption || {}
    },
    // 列的配置集合
    columnOption() {
      return this.tableOption.column || []
    },
    // 返回所有的配置项  包括children里面的配置
    propOption() {
      let result = []
      const ctx = this
      // 递归查找所有的属性配置
      function findProp(list) {
        list.forEach((ele) => {
          if (ele.prop) {
            result.push(ele)
          }
          if (ele.children) {
            ctx.isChild = true
            findProp(ele.children)
          }
        })
      }
      findProp(this.columnOption)
      // 处理联动字段
      if (this.isChild) {
        result = calcCascader(result)
      } else {
        result = calcCascader(this.columnOption)
      }

      if (this.isTree) this.treeProp = result[0].prop
      return result
    },
    // 表单的配置 TODO <动态列变化会影响到表单查看,要独立开来>
    columnFormOption() {
      if (this.isGroup) {
        const list = []
        this.options.group.forEach((ele) => {
          if (!ele.column) return
          ele.column.forEach((column) => {
            list.push(column)
          })
        })
        return list
      } else {
        return this.propOption
      }
    },
    // // 搜索栏的配置
    // columnSearchOption () {
    //   const option = this.deepClone(this.columnOption || []).filter((item) => item.search === true)
    //   return option;
    // },
    // 是否包含组
    isGroup() {
      return !this.validatenull(this.tableOption.group)
    },
    // 展开的级别
    expandLevel() {
      return this.options.expandLevel || 0
    },
    // 是否展开全部
    expandAll() {
      return this.options.expandAll || false
    },
    // 是否是树形表格
    isTree() {
      return this.vaildData(this.options.tree, false)
    },
    // 数据"id"的"key"
    idKey() {
      return this.tableOption.idKey || 'id'
    },
    // 操作按钮不可用
    btnDisabled() {
      // return this.$refs.dialogForm.keyBtn && this.tableOption.cellBtn;
    },
    // 合计的配置集合
    sumColumnList() {
      return this.tableOption.sumColumnList || []
    },
    // 已选中的长度
    selectLen() {
      return this.tableSelect ? this.tableSelect.length : 0
    },
  },
  watch: {
    // 双向绑定弹窗表单的值
    tableForm: {
      handler() {
        this.$emit('input', this.tableForm)
      },
      deep: true,
    },
    // 传入弹窗表单表的值 @Object
    value: {
      handler() {
        this.formVal()
      },
      deep: true,
    },
    // 分页参数配置项
    page: {
      handler() {
        this.$refs.tablePage.pageInit()
      },
      deep: true,
    },
    // 监听组件配置是否变化，变化则刷新
    propOption() {
      this.refreshOptions()
    },
    // TODO 配置变化更新显示列
    // propOption () {
    //   // this.$refs.dialogColumn.columnInit();
    // },
    // 表格展示的数据
    data() {
      this.dataInit()
      // 初始化级联字典  TODO表格不需要初始化字典
      // this.handleLoadCascaderDic();
      this.$nextTick(() => {
        this.$refs.table && this.$refs.table.doLayout()
      })
    },
    // 路由切换重新计算布局
    $route() {
      this.$refs.table.doLayout()
    },
  },
  props: {
    dialogClass: {
      type: String,
    },
    // 弹窗表单传入的值
    value: {
      type: Object,
      default: () => {
        return {}
      },
    },
    spanMethod: Function, // 合并单元格的方法
    summaryMethod: Function, // 合计的方法
    beforeClose: Function, // 弹窗关闭之前
    beforeOpen: Function, // 弹窗开启之前
    rowClassName: Function, // 行类名
    cellClassName: Function, // 单元格类名
    headerCellClassName: Function, // 行类名
    uploadBefore: Function, // 开始上传之前
    uploadAfter: Function, // 上传后
    page: {
      type: Object,
      default() {
        return {}
      },
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
    exportLoading: {
      type: Boolean,
      default: false,
    },
    pageLoading: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      required: true,
      default: () => {
        return []
      },
    },
  },
  methods: {
    refreshOptions() {
      // 初始化权限信息
      // this.permissionInit()
      // 初始化数据 包括初始化操作按钮的显示影藏
      this.dataInit()
      // TODO 应该只初始化搜索栏的字典
      this.handleLoadDic()
      // 初始标题信息 TODO 要在弹窗初始化时执行
      // this.titleInit()
      // 动态列初始化
      this.initSearchOption()
      // 初始化列
      this.initTableColumn()
      // 如果配置了动态列，需刷新动态列
      if (this.tableOption.dynamicOptions) {
        this.refreshDynamicColumn()
      }
    },
    chartModel() {
      this.$emit('custom-chart', {})
    },
    /** ********新增的方法start****************************************** */
    columnDrop() {
      // 获取表格配置中的复选框配置|索引列配置|展开列配置
      const { selection, index, expand, useDrag = true } = this.tableOption
      // 是否使用拖拽
      if (!useDrag) return
      // 获取当前实例对应的节点
      const pNode = this.$refs.table.$el
      // 获取表格头部的节点
      const tr = pNode.querySelector('.has-gutter tr')
      // 挂载节点到拖拽初始化
      this.sortableInstance = Sortable.create(tr, {
        // 动画时间
        animation: 180,
        // 延迟时间
        delay: 0,
        // 拖拽结束的回调
        onEnd: (e) => {
          // 拖拽变动的列索引
          const { newIndex, oldIndex } = e
          let prevLen = 0
          // 存在复选框
          if (selection) prevLen++
          // 存在索引列
          if (this.vaildData(index, true)) prevLen++
          // 存在展开列
          if (expand) prevLen++
          // 获取表头主体dom节点
          const header = pNode.querySelector('.el-table__header-wrapper')
          // 获取表头主体下的表头行
          const headerTr = [...header.querySelectorAll('tr')][0]
          // 拷贝表头主体下的表头行（用于后续表格列配置渲染后，处理表头恢复）
          const cloneThList = headerTr.cloneNode(true)
          // 回去拖拽的列
          const oldObj = this.tableColumn[oldIndex - prevLen]
          // 删除配置里面的拖拽列
          this.tableColumn.splice(oldIndex - prevLen, 1)
          // 把拖拽的列添加到目标位置
          this.tableColumn.splice(newIndex - prevLen, 0, oldObj)
          // 配置渲染完成后
          this.$nextTick(() => {
            // 获取表头主体下的表头单元格列表
            const tdList = [...headerTr.querySelectorAll('th')]
            // 获取上面备份的表头主体下的表头单元格列表
            const tdListOld = [...cloneThList.querySelectorAll('th')]
            // 遍历单元格列表
            tdList.forEach((item, index) => {
              // console.log(4444, item.children[0].childNodes[0]);
              const curNodeChild = item.children[0]
              const oldNodeChild = tdListOld[index].children[0]
              if (
                oldIndex > newIndex &&
                index >= newIndex &&
                index <= oldIndex
              ) {
                // 从右往左拖拽
                // 替换新的节点为上一次拖拽后的节点
                // headerTr.replaceChild(tdListOld[index], item)
                if (curNodeChild)
                  item.children[0].replaceChild(
                    oldNodeChild.childNodes[0],
                    curNodeChild.childNodes[0]
                  )
              } else if (
                oldIndex < newIndex &&
                index <= newIndex &&
                index >= oldIndex
              ) {
                // 从左往右拖拽
                // 替换新的节点为上一次拖拽后的节点
                // headerTr.replaceChild(tdListOld[index], item)
                if (curNodeChild)
                  item.children[0].replaceChild(
                    oldNodeChild.childNodes[0],
                    curNodeChild.childNodes[0]
                  )
              }
            })
          })
        },
      })
    },
    // 初始化权限信息
    permissionInit() {
      const data = this.$store?.state.base.btnList[this.$route?.name]
      // const data = cacheHelper.get('btnList')[this.$route?.name];
      if (
        this.validatenull(data) &&
        this.tableOption.menu !== false &&
        !this.tableOption.ignorePermission
      ) {
        // this.$message({
        //   message: '当前模块权限信息不存在，按钮操作不可用！',
        //   type: 'warning', 'DELETE', 'EDIT', 'DETAIL'
        // })
        
        this.permission = data || { ADD: true, EDIT: true, DETAIL: true}
      } else {
        this.permission = data || {}
      }
    },
    advanceFlag() {
      if (this.tableOption.advanceSearch === false) return
      if (this.$parent.moduleName !== this.$route?.name) return
      // 是否需要高级搜索按钮
      if (!this.$refs.headerSearch) {
        this.hasAdvanced = false
      } else {
        const height = this.$refs.headerSearch.$el.firstChild.offsetHeight
        if (height > 75) {
          this.hasAdvanced = true
        } else {
          this.hasAdvanced = false
          this.$refs.headerSearch.$el.style.height = '70px'
          this.$refs.headerSearch.advancedShow = false
        }
      }
    },
    initActionColWidth() {
      if (this.validatenull(this.permission)) {
        this.actionCompare = 0
        return
      }
      let actionCompare = this.actionCompare
      if (this.tableOption.dynamicOptions) {
        // 动态列初始化
        actionCompare += 20
      }
      // 设置操作列宽度
      this.tempActionCol.forEach((item) => {
        // viewBtn editBtn delBtn
        // const
        let optionBtnstr = ''
        if (item === 'DELETE') {
          optionBtnstr = 'delBtn'
        } else if (item === 'DETAIL') {
          optionBtnstr = 'viewBtn'
        } else if (item === 'EDIT') {
          optionBtnstr = 'editBtn'
        }
        const optionBtn = this.tableOption[optionBtnstr]
        if (this.permission[item] && optionBtn !== false) {
          actionCompare += 33
        }
      })
      this.actionCompare = actionCompare === 11 ? 0 : actionCompare
    },
    // 初始化标题
    titleInit(title = ' ') {
      this.functionName = title || this.$route?.meta.title
    },
    // 获取查看数据
    async getViewData(row) {
      this.viewOpen(this.viewData)
      if (this.tableOption.useRowView) {
        this.viewData = row
        return
      }
      if (this.tableOption.viewData) {
        this.viewData = this.tableOption.viewData
      } else {
        this.dialogLoading = true
        let reqUrl
        if (!this.tableOption.formatViewReq) {
          reqUrl = `${this.tableOption.viewUrl}?${this.idKey}=${
            row[this.idKey]
          }`
        } else {
          reqUrl = `${this.tableOption.viewUrl}${this.tableOption.formatViewReq(
            row
          )}`
        }
        const resData = await server.reqDetail(reqUrl)
        this.dialogLoading = false
        if (!resData || (!resData.code && resData.code !== 0)) {
          this.$message.error(resData.msg || '请求异常，请联系客服')
        } else {
          this.viewData = this.tableOption.formateViewData
            ? this.tableOption.formateViewData(resData.data)
            : resData.data
        }
      }
      this.viewOpen(this.viewData)
      this.$emit('after-row-view', this.viewData)
    },
    // 删除表格中的某一项
    deleteItem(row) {
      this.$confirm('确认删除该条信息？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        iconClass: 'el-icon-warning-outline',
        type: 'warning',
        confirmButtonClass: 'comfirm-btn',
        closeOnClickModal: false,
      }).then(() => {
        this.deleteReq(row)
      })
    },
    // 删除请求
    async deleteReq(row) {
      let data
      if (!this.tableOption.formatDeleteReq) {
        data = { id: row[this.idKey] }
      } else {
        data = this.tableOption.formatDeleteReq(row)
      }
      const res = await server.reqDel(this.tableOption.deleteUrl, data)
      if (res.code === RESPONSE_CODE.SUCCESS) {
        this.$message.success(res.msg)
        this.$emit('delete-success')
      }
    },
    // 关闭查看弹窗
    closeViewDialog() {
      this.tableIndex = -1
      this.tableForm = {}
      this.viewVisible = false
      this.keyBtn = false
      this.hide()
    },
    // 关闭查看回调
    hide() {
      const callack = () => {
        this.viewData = {}
      }
      if (typeof this.$parent.beforeClose === 'function') {
        this.$parent.beforeClose(callack, this.boxType, this.viewData)
      } else {
        callack()
      }
    },
    // 获取编辑数据
    fetchFormData(row) {
      return new Promise((resolve, reject) => {
        let reqUrl
        if (!this.tableOption.viewUrl) {
          resolve(row)
          return
        }
        this.dialogLoading = true
        if (!this.tableOption.formatViewReq) {
          reqUrl = `${this.tableOption.viewUrl}?${this.idKey}=${
            row[this.idKey]
          }`
        } else {
          reqUrl = `${this.tableOption.viewUrl}${this.tableOption.formatViewReq(
            row
          )}`
        }
        console.log('reqUrl数据:', reqUrl)
        fetch.get(reqUrl).then((res) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            // 判断配置是否有fetchDataCb参数且为函数，符合则执行
            typeof this.tableOption.fetchDataCb === 'function' &&
              this.tableOption.fetchDataCb(res.data)
            resolve(res.data)
          } else {
            reject(res)
            this.$message({ type: 'error', message: res.msg })
          }
          this.dialogLoading = false
        })
      })
    },
    // 更新权限信息
    refreshPower(data) {
      this.permission = data
    },
    // 打开动态列弹窗
    openDynamicDialog() {
      this.$refs.dragColumn.openDialog()
    },
    // 远程配置和本地配置合并
    initDynamicColumn() {
      this.doLayout = false
      const columnProps = {}
      const columns = []
      this.columnOption.forEach((item) => {
        columnProps[item.prop] = item
      })
      this.fetchColumnData(this.tableOption)
        .then((customColumnDefs) => {
          this.dynamicColumns = customColumnDefs
          const columnsShow = JSON.parse(
            JSON.stringify(
              this.dynamicColumns.filter((item) => item.show === true)
            )
          )
          columnsShow.forEach((item) => {
            const col = columnProps[item.name]
            if (col) {
              if (col.hide !== undefined) {
                col.hide = false
              }
              columns.push(Object.assign(item, col))
            } else {
              columns.push({
                label: item.column,
                prop: item.name,
                show: item.show,
              })
            }
          })
          this.tableColumn = columns
          this.doLayout = true
          setTimeout(() => {
            this.$refs.table && this.$refs.table.doLayout()
          }, 0)
        })
    // eslint-disable-next-line no-unused-vars
        .catch((res) => {
          this.doLayout = true
        })
    },
    refreshDynamicColumn() {
      this.doLayout = false
      const columnProps = {}
      const columns = []
    // eslint-disable-next-line no-unused-vars
      this.columnOption.forEach((item, idx) => {
        columnProps[item.prop] = item
      })
      const columnsShow = JSON.parse(
        JSON.stringify(this.dynamicColumns.filter((item) => item.show === true))
      )
      columnsShow.forEach((item) => {
        const col = columnProps[item.name]
        if (col) {
          if (col.hide !== undefined) {
            col.hide = false
          }
          columns.push(Object.assign(item, col))
        } else {
          columns.push({
            label: item.column,
            prop: item.name,
            show: item.show,
          })
        }
      })
      this.tableColumn = columns
      this.doLayout = true
      setTimeout(() => {
        this.$refs.table && this.$refs.table.doLayout()
      }, 0)
    },
    // 获取动态列数据
    fetchColumnData(tableOption) {
      return new Promise((resolve, reject) => {
        const reqUrl = tableOption.dynamicOptions.getUrl
        fetch
          .get(reqUrl, { params: tableOption.dynamicOptions.params })
          .then((res) => {
            if (res.code === RESPONSE_CODE.SUCCESS) {
              resolve(res.data || [])
            } else {
              reject(res)
              this.$message({ type: 'error', message: res.msg })
            }
          })
    // eslint-disable-next-line no-unused-vars
          .catch((res) => {
            // this.tableColumn = tableOption.column
            this.doLayout = true
            setTimeout(() => {
              this.$refs.table && this.$refs.table.doLayout()
            }, 0)
          })
      })
    },
    // 设置动态列数据
    setCustomColumn(params) {
    // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        const reqUrl = this.tableOption.dynamicOptions.saveUrl
        const baseobj = Object.assign(
          {},
          this.tableOption.dynamicOptions.params,
          params
        )
        fetch.post(`${reqUrl}`, baseobj).then((res) => {
          if (res.code === RESPONSE_CODE.SUCCESS) {
            this.$message.success(res.msg)
            this.initDynamicColumn()
            resolve(res)
          } else {
            this.$message({ type: 'error', message: res.msg })
            resolve(res)
          }
        })
      })
    },
    // 初始化搜索配置
    initSearchOption() {
      const option = this.deepClone(this.propOption || []).filter(
        (item) => item.search === true
      )
      this.searchOption = arraySort(option || [], 'sort')
    },
    // 初始化列配置
    initTableColumn() {
      this.tableColumn = this.option.column.filter((o) => o.hide !== true)
    },
    /** ********新增的方法end****************************************** */
    // 开启排序
    setSort() {
      if (!window.Sortable) {
        console.error('please npm install Sortable -S')
        return
      }
      const el = this.$refs.table.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0]
      this.sortable = window.Sortable.create(el, {
        ghostClass: 'avue-crud__sortable',
        onEnd: (evt) => {
          const oldindex = evt.oldIndex
          const newindex = evt.newIndex
          const targetRow = this.list.splice(oldindex, 1)[0]
          this.list.splice(newindex, 0, targetRow)
          this.$emit(
            'sortable-change',
            oldindex,
            newindex,
            targetRow,
            this.list
          )
        },
      })
    },
    // 更新弹窗表单或者搜索栏的字典,用 refname 调用 dialogForm 或 headerSearch 实例的方法
    updateDic(prop, list, refname = 'dialogForm', params) {
      this.$refs[refname] && this.$refs[refname].updateDic(prop, list, params)
    },
    showRow(row) {
      // const index = row.rowIndex;
      const show = row.row._parent
        ? row.row._parent._expand && row.row._parent._show
        : true
      row.row._show = show
      return show
        ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;'
        : 'display:none;'
    },
    // 对部分表单字段进行校验的方法
    validateField(val) {
      return this.$refs.dialogForm.$refs.tableForm.validateField(val)
    },
    handleGetRowKeys(row) {
      const rowKey = row[this.idKey]
      return rowKey
    },
    // 初始化弹窗表单规则
    rulesInit() {
      this.formRules = {}
      this.propOption.forEach((ele) => {
        if (ele.rules) this.formRules[ele.prop] = ele.rules
        if (ele.rules && ele.cell) this.formCellRules[ele.prop] = ele.rules
      })
    },
    // 取消表格选择
    selectClear() {
      this.$refs.table.clearSelection()
    },
    // 选中/取消选中
    toggleRowSelection(row, selected) {
      this.$refs.table.toggleRowSelection(row, selected)
    },
    // 展开/取消展开
    toggleRowExpansion(row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded)
    },
    // 高亮某一行
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row)
    },
    // 返回序号
    indexMethod(index) {
      return (
        index +
        1 +
        ((this.$refs.tablePage.defaultPage.currentPage || 1) - 1) *
          (this.$refs.tablePage.defaultPage.pageSize || 10)
      )
    },
    // 弹窗表单赋值
    formVal() {
      Object.keys(this.value).forEach((ele) => {
        this.$set(this.tableForm, ele, this.value[ele])
      })
    },
    // 初始化数据
    dataInit() {
      if (this.isTree) {
        const data = this.data
        if (data.length === 0) {
          this.list = []
          return
        }
        addAttrs(this, data, {
          expand: this.expandAll,
          expandLevel: this.expandLevel,
        })
        this.list = treeToArray(this, data)
      } else {
        this.list = this.data
      }
      /*
       *存在操作按钮根据业务状态显示隐藏操作按钮 初始化显隐参数 避免在template中使用函数处理 以提高组件性能
       *@Description: tableOption.btnsVisible()
       *@param {ele} type Object
       *@return [type] Object 例如 { view: false, edit:false }
       *@Date: 2019-08-01 10:59:27
       */
      if (typeof this.tableOption.btnsVisible === 'function') {
    // eslint-disable-next-line no-unused-vars
        this.list.forEach((ele, index) => {
          const btnVisible = this.tableOption.btnsVisible(ele) || {}
          ele.$view = btnVisible.view
          ele.$edit = btnVisible.edit
          ele.$delete = btnVisible.delete
        })
      }
      // 格式化每列数据
      this.tableColumn.forEach((item) => {
        if (item.formatData && typeof item.formatData === 'function') {
          this.list.forEach((itm) => {
            // 拷贝一份原始prop
            if (!itm[item.prop + 'Origin']) {
              itm[item.prop + 'Origin'] = itm[item.prop]
            }
            itm[item.prop] = item.formatData(itm[item.prop])
          })
        }
      })
    },
    // 展开或则关闭
    expandChange(row, expand) {
      this.expandList = [...expand]
      this.$emit('expand-change', row, expand)
    },
    // 设置单选
    currentRowChange(val) {
      this.$emit('current-row-change', val)
    },
    // 刷新事件
    refreshChange() {
      this.$emit('refresh-change', {
        page: this.defaultPage,
        searchForm: this.searchForm,
      })
    },
    // 选中行数据
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.table.toggleRowSelection(row)
        })
      } else {
        this.$refs.table.clearSelection()
      }
    },
    // 选择回调
    selectionChange(val) {
      this.tableSelect = val
      this.$emit('selection-change', this.tableSelect)
    },
    // 单个选择回调
    select(selection, row) {
      this.$emit('select', selection, row)
    },
    // 点击勾选全选 Checkbox
    selectAll(selection) {
      this.$emit('select-all', selection)
    },
    // 排序回调
    sortChange(val) {
      this.$emit('sort-change', val)
    },
    // 行双击
    rowDblclick(row, event) {
      this.$emit('row-dblclick', row, event)
    },
    // 行单机
    rowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
    },
    // 当单元格 hover 进入时会触发该事件
    cellMouseEnter(row, column, cell, event) {
      this.$emit('cell-mouse-enter', row, column, cell, event)
    },
    // 当单元格 hover 退出时会触发该事件
    cellMouseLeave(row, column, cell, event) {
      this.$emit('cell-mouse-leave', row, column, cell, event)
    },
    // 当某个单元格被点击时会触发该事件
    cellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    // 当某个单元格被双击击时会触发该事件
    cellDblclick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },
    // 行编辑点击
    rowCell(row, index) {
      if (row.$cellEdit) {
        this.rowCellUpdate(row, index)
      } else {
        this.rowCellEdit(row, index)
      }
    },
    // 单元格新增
    rowCellAdd(obj = {}) {
      const len = this.list.length
      this.list.push(
        this.deepClone(
          Object.assign(
            this.tableForm,
            {
              $cellEdit: true,
              $index: len,
            },
            obj
          )
        )
      )
      this.formIndexList.push(len)
    },
    // 行取消
    rowCanel(row, index) {
      this.oldFormData = {}
      if (this.validatenull(row[this.idKey])) {
        this.list.splice(index, 1)
        return
      }
      this.formCascaderList[index].$cellEdit = false
      // 设置行数据
      this.$set(this.list, index, this.formCascaderList[index])
      // 设置级联字典
      this.$set(this.cascaderDIC, index, this.cascaderDicList[index])
      this.formIndexList.splice(this.formIndexList.indexOf(index), 1)
    },
    // 单元格编辑
    rowCellEdit(row, index) {
      row.$cellEdit = true
      this.oldFormData = this.deepClone(row)
      this.tableForm = this.rowClone(row)
      this.$emit('input', this.tableForm)
      this.$set(this.list, index, row)
      // 缓冲行数据
      this.formCascaderList[index] = this.deepClone(row)
      // 缓冲级联字典
      this.cascaderDicList[index] = this.deepClone(this.cascaderDIC[index])
      setTimeout(() => {
        this.formIndexList.push(index)
      }, 1000)
    },
    // 单元格更新
    rowCellUpdate(row, index) {
      this.asyncValidator(this.formCellRules, row)
    // eslint-disable-next-line no-unused-vars
        .then((res) => {
          this.$refs.dialogForm.keyBtn = true
          this.$emit(
            'row-update',
            row,
            index,
            () => {
              row.$cellEdit = false
              this.$set(this.list, index, row)
            },
            this.oldFormData,
            () => {
              this.$refs.dialogForm.keyBtn = false
            }
          )
        })
        .catch((errors) => {
          this.$message.warning(errors[0].message || errors[0])
        })
    },
    rowAdd() {
      this.boxType = 'add'
      if (!this.tableOption.customAdd) {
        this.$refs.dialogForm.show('add')
      } else {
        this.$emit('custom-add')
      }
    },
    // 保存请求
    rowSave(isClose = true) {
      this.$refs.dialogForm.rowSave(isClose)
    },
    // 对象克隆
    rowClone(row) {
      const rowData = {}
      Object.keys(row).forEach((ele) => {
        if (!['_parent', 'children'].includes(ele)) {
          rowData[ele] = row[ele]
        }
      })
      return rowData
    },
    // 搜索
    searchChange() {
      this.$refs.headerSearch.searchChange()
    },
    // 清空
    searchReset() {
      this.$refs.headerSearch.searchReset()
    },
    // 导出excel
    exportExcel() {
      this.$emit('export-excel', this.selection)
    },
    // 导出excel
    exportExcelAll() {
      this.$emit('export-excel-all')
    },
    // 打印
    importExcel() {
      this.$emit('import-excel')
    },
    deleteRows() {
      this.$emit('delete', this.tableSelect)
    },
    // 编辑
    rowEdit(row, index) {
      this.boxType = 'edit'
      if (!this.tableOption.customEdit) {
        console.log('数据:', row)
        this.fetchFormData(row).then((res) => {
          this.oldFormData = this.tableOption.formateForm
            ? this.tableOption.formateForm(res)
            : res
          this.tableForm = this.tableOption.formateForm
            ? this.tableOption.formateForm(res)
            : res
          this.tableOption.fetchCallback && this.tableOption.fetchCallback()
        })
        this.$emit('input', this.tableForm)
        this.tableIndex = index
        this.$refs.dialogForm.show('edit', index)
      } else {
        this.$emit('custom-edit', row, index)
        console.log('数据2:', row)
      }
    },

    // 查看
    rowView(row, index) {
      this.boxType = 'view'
      if (!this.tableOption.customView) {
        this.tableForm = this.rowClone(row)
        this.$emit('input', this.tableForm)
        this.tableIndex = index
        this.$refs.dialogForm.show('view')
      } else {
        this.$emit('custom-view', row, index)
      }
    },
    // 查看
    urlView(row, index) {
      this.boxType = 'view'
      this.tableIndex = index
      this.keyBtn = true
      this.getViewData(row)
    },
    // 查看回调
    viewOpen(row) {
      const callack = () => {
        this.$nextTick(() => {
          this.viewVisible = true
        })
      }
      if (typeof this.$parent.beforeOpen === 'function') {
        this.$parent.beforeOpen(callack, this.boxType, row)
      } else {
        callack()
      }
    },

    view(row, idx) {
      if (!this.tableOption.customView) {
        if (
          this.validatenull(this.viewData) &&
          !this.tableOption.viewUrl
        ) {
          this.rowView(row, idx)
        } else {
          this.urlView(row, idx)
        }
      } else {
        this.$emit('custom-view', row, idx)
      }
    },
    // 删除
    rowDel(row, index) {
      if (this.tableOption.deleteUrl) {
        this.deleteItem(row)
      } else {
        this.$emit('row-del', row, index)
      }
    },
    // 清空表单
    resetForm() {
      this.$refs.dialogForm.resetForm()
      this.$emit('input', this.tableForm)
    },
    // 搜索指定的属性配置
    findColumnIndex(value) {
      return this.findArray(this.propOption, value, 'prop')
    },
    // 合并行
    tableSpanMethod(param) {
      if (typeof this.spanMethod === 'function') return this.spanMethod(param)
    },
    // 合集统计逻辑
    tableSummaryMethod(param) {
      // 如果自己写逻辑则调用summaryMethod方法
      if (typeof this.summaryMethod === 'function') {
        return this.summaryMethod(param)
      }
      const { columns, data } = param
      const sums = []
      if (columns.length > 0) {
        columns.forEach((column, index) => {
          const currItem = this.sumColumnList.find(
            (item) => item.name === column.property
          )
          if (index === 0) {
            sums[index] = this.tableOption.sumText || config.sumText
          } else if (currItem) {
            switch (currItem.type) {
              case 'count':
                sums[index] = '计数:' + data.length
                break
              case 'avg':
                // eslint-disable-next-line no-case-declarations
                const avgValues = data.map((item) => Number(item[column.property]))
                // eslint-disable-next-line no-case-declarations
                let nowindex = 1
                sums[index] = avgValues.reduce((perv, curr) => {
                  const value = Number(curr)
                  if (!isNaN(value)) {
                    return (perv + curr) / nowindex++
                  } else {
                    return perv
                  }
                }, 0)
                sums[index] = '平均:' + sums[index].toFixed(2)
                break
              case 'sum':
                // eslint-disable-next-line no-case-declarations
                const values = data.map((item) => Number(item[column.property]))
                sums[index] = values.reduce((perv, curr) => {
                  const value = Number(curr)
                  if (!isNaN(value)) {
                    return perv + curr
                  } else {
                    return perv
                  }
                }, 0)
                sums[index] = sums[index].toFixed(2)
                break
            }
          } else {
            sums[index] = '-'
          }
        })
      }
      this.sumsList = sums
      return sums
    },
    // 清空某个表单元素
    clearFormItem(prop, refname = 'dialogForm') {
      this.$refs[refname] && this.$refs[refname].clearFormItem(prop)
    },
  },
})
</script>
<style lang="css">
</style>
