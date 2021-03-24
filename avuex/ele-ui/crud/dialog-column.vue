
<template>
  <div>
    <el-dialog
      title="可拖动下列选项进行排序"
      :visible.sync="columnBox"
      :modal-append-to-body="false"
      :append-to-body="true"
      lock-scroll
      width="70%"
      class="pop-dyn-wrap">
      <div class="pop-dyn-c" v-if="columnBox" v-loading="keyBtn">
          <draggable tag="el-collapse" v-model="list" :component-data="getComponentData()">
            <div :class="e.show?'jms-draggable-item jms-draggable-item-act':'jms-draggable-item'" v-for="e in list" :name="e.label" :key="e.prop">
              <el-checkbox v-model="e.show" >{{e.column}}</el-checkbox>
            </div>
          </draggable>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="columnBox = false">关闭</el-button>
        <el-button type="primary" @click="setCustomColumn" :loading="keyBtn">确定</el-button>
      </span>
    </el-dialog>
    <!-- <el-button icon="iconfont iconshaixuan" type="text" @click="openDialog"></el-button> -->
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import create from '../../core/create';
// import { validatenull } from '../../utils/validate';
export default create({
  mixins: [],
  inject: ['crud'],
  components: {
    draggable
  },
  data () {
    return {
      checkList: [],
      columnBox: false,
      keyBtn: false,
      defaultProps: {
        key: 'prop'
      },
      columnList: [],
      columnIndex: [],
      list: []
    };
  },
  props: {
    dynamicColumns: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    dynamicColumns: {
      handler() {
        this.list = this.deepClone(this.dynamicColumns)
      }
    }
  },
  created () { },
  methods: {
    // handleChange () {
    //   this.$nextTick(() => {
    //     this.crud.doLayout = true;
    //     this.$nextTick(() => {
    //       this.crud.$refs.table.doLayout();
    //     });
    //   });
    // },
    // 初始化显示列
    columnInit () {
      this.columnIndex = [];
      this.columnList = [];
      this.crud.propOption.forEach((ele, index) => {
        if (!this.vaildData(ele.hide, false)) {
          this.columnIndex.push(ele.prop);
        }
        if (this.vaildData(ele.showColumn, true)) {
          const obj = {
            label: ele.label,
            prop: ele.prop,
            index: index
          };
          this.columnList.push(obj);
        }
      });
    },
    openDialog() {
      this.columnBox = true
    },
    handleChange() {
      // console.log(this.list)
    },
    inputChanged(value) {
      this.activeNames = value;
    },
    setCustomColumn() {
      this.keyBtn = true
      // this.crud.tableLoading = true
      this.crud.setCustomColumn({ columnList: this.list }).then(res => {
        this.keyBtn = false
        this.columnBox = false
        // this.crud.tableLoading = false
      }).catch(data => {
        this.keyBtn = false
        this.columnBox = false
        // this.crud.tableLoading = false
      })
    },
    getComponentData() {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged
        },
        attrs: {
          wrap: true
        },
        props: {
          value: this.activeNames
        }
      };
    }
  }
});
</script>

