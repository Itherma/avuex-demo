import { loadDic, loadCascaderDic } from '../common/dic';
export default function (type) {
  const isCrud = type === 'crud'
  const isDetail = type === 'detail'
  return {
    props: {
      option: { // 列表配置项
        type: Object,
        required: true,
        default: () => {
          return {};
        }
      }
      // viewOption: { // 查看配置项
      //   type: Object,
      //   required: true,
      //   default: () => {
      //     return {};
      //   }
      // }
    },
    watch: { // 监听配置项的变化 并重新初始化
      option: {
        handler() {
          // console.log(isCrud ? '[列表] option变更' : '[表单] option变更')
          this.init();
        },
        deep: true
      }
    },
    data() {
      return {
        DIC: {}, // 字典集合
        cascaderDIC: {}, // 级联选择字典
        tableOption: {}, // 配置数据
        isMobile: ''
      };
    },
    created() {
      this.init();
    },
    computed: {
      menuType() {
        return this.tableOption.menuType || this.$AVUE.menuType || 'button';
      },
      isMediumSize() {
        return this.controlSize === 'medium' ? 'small' : this.controlSize;
      },
      controlSize() {
        return this.tableOption.size || (this.$AVUE || {}).size || 'medium';
      }
    },
    methods: {
      getKey(item = {}, props = {}, key) {
        return item[
          props[key] || (this.options.props || {})[key] || key
        ];
      },
      getIsMobile() {
        this.isMobile = window.document.body.clientWidth <= 768;
      },
      init() {
        // console.log(isCrud ? '[列表] 初始化完成' : '[表单] 初始化完成')
        // this.tableOption = JSON.parse(JSON.stringify(this.option));
        this.tableOption = this.deepClone(this.option);
        if (isCrud) {
          // 搜索配置初始化
          this.initSearchOption()
          this.tableOption.dialogForm = true
          // this.tableOption.span = this.tableOption.span || 6
        }
        this.getIsMobile();
        // window.onresize = () => {
        //   this.getIsMobile();
        // };
        /*
         *@Description: 规则初始化
         *@param {propOption} 配置项
         *@return [type]
         *@Date: 2019-06-19 19:15:14
        */
        if (this.rulesInit) {
          (isCrud ? this.propOption : this.columnOption).forEach(ele => {
            this.rulesInit(ele.column);
          });
        }
        // 查看不初始化字典
        if (!isDetail) {
          setTimeout(() => {
            this.initDic();
          }, 0);
        }
      },
      // 检测本地字典
      initDic() {
        if (isCrud) {
          // 表格赋值
          this.propOption.forEach(ele => {
            if (Array.isArray(ele.dicData)) {
              this.$set(this.DIC, ele.prop, ele.dicData)
            }
          })
        } else {
          // 表单赋值
          this.columnOption.forEach(ele => {
            (ele.column || []).forEach(item => {
              if (Array.isArray(item.dicData)) {
                this.$set(this.DIC, item.prop, item.dicData)
              }
            })
          })
        }
      },
      // 加载字典
      handleLoadDic(option) {
        return new Promise((resolve) => {
          const dicFlag = this.vaildData(this.tableOption.dicFlag, true);
          // 初始化字典
          if (dicFlag) {
            loadDic(option || this.tableOption).then((res) => {
              Object.keys(res).forEach(ele => {
                this.$set(this.DIC, ele, res[ele])
              });
              resolve();
            });
            // 加载传进来的字典
          } else {
            this.DIC = this.tableOption.dicData || [];
            resolve();
          }
        })
      },
      handleLoadCascaderDic(option, data) {
        loadCascaderDic(option || (isCrud ? this.propOption : this.columnOption), this.data || [data]).then(res => {
          if (option) {
            Object.keys(res).forEach(ele => {
              this.$set(this.cascaderDIC, ele, res)
            });
          } else {
            this.cascaderDIC = this.deepClone(res);
          }
        });
      }
    }
  };
}
