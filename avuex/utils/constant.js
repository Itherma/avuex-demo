/*
 * @Description: 前端静态字典
 * @Autor: xujian
 * @Date: 2020-04-24 19:09:53
 */

// shim
const lang = val => val

export const DICT = {
  ...{
    // 证件类型
    idTypeList: [
      { value: 1, label: lang('统一信用代码'), name: lang('统一信用代码') },
      { value: 2, label: lang('组织机构代码'), name: lang('组织机构代码') },
      { value: 3, label: lang('税务登记号'), name: lang('税务登记号') },
      { value: 4, label: lang('居民身份证'), name: lang('居民身份证') },
      { value: 5, label: lang('临时身份证'), name: lang('临时身份证') },
      { value: 6, label: lang('户口簿'), name: lang('户口簿') },
      { value: 7, label: lang('中国人民解放军军人身份证'), name: lang('中国人民解放军军人身份证') },
      { value: 8, label: lang('中国人民武装警察身份证'), name: lang('中国人民武装警察身份证') },
      { value: 9, label: lang('港澳居民来往内地通行证'), name: lang('港澳居民来往内地通行证') },
      { value: 10, label: lang('台湾居民来往内地通行证'), name: lang('台湾居民来往内地通行证') },
      { value: 11, label: lang('外国公民护照'), name: lang('外国公民护照') },
      { value: 12, label: lang('中国公民护照'), name: lang('中国公民护照') }
    ],
    // 证件类型2
    idTypeList2: [
      { value: 4, label: lang('居民身份证'), name: lang('居民身份证') },
      { value: 5, label: lang('临时身份证'), name: lang('临时身份证') },
      { value: 6, label: lang('户口簿'), name: lang('户口簿') },
      { value: 7, label: lang('中国人民解放军军人身份证'), name: lang('中国人民解放军军人身份证') },
      { value: 8, label: lang('中国人民武装警察身份证'), name: lang('中国人民武装警察身份证') },
      { value: 9, label: lang('港澳居民来往内地通行证'), name: lang('港澳居民来往内地通行证') },
      { value: 10, label: lang('台湾居民来往内地通行证'), name: lang('台湾居民来往内地通行证') },
      { value: 11, label: lang('外国公民护照'), name: lang('外国公民护照') },
      { value: 12, label: lang('中国公民护照'), name: lang('中国公民护照') }
    ],
    // 计费重量取值优先级对象
    chargeableWeight: [
      { value: 'packageArrivalWeight', label: lang('订单重量'), name: lang('订单重量') },
      { value: 'packageInsideChargeWeight', label: lang('内部计费重量'), name: lang('内部计费重量') },
      { value: 'packageReceiptWeight', label: lang('入仓重量'), name: lang('入仓重量') },
      { value: 'packageCollectWeight', label: lang('收件重量'), name: lang('收件重量') },
      { label: lang('集散到件重量'), name: lang('集散到件重量'), value: 'entrepotArrivalWeight' }
    ],
    // 计费重量
    chargeableWeight2: [
      { label: lang('收件重量'), name: lang('收件重量'), value: 'packageCollectWeight' },
      { label: lang('入仓重量'), name: lang('入仓重量'), value: 'packageReceiptWeight' },
      { label: lang('订单重量'), name: lang('订单重量'), value: 'waybillWeight' },
      { label: lang('内部计费重量'), name: lang('内部计费重量'), value: 'packageInsideChargeWeight' }
    ],
    chargeableWeight3: [
      { label: lang('收件重量'), name: lang('收件重量'), value: '1' },
      { label: lang('入仓重量'), name: lang('入仓重量'), value: '2' },
      { label: lang('订单重量'), name: lang('订单重量'), value: '3' },
      { label: lang('内部计费重量'), name: lang('内部计费重量'), value: '4' },
      { label: lang('集散到件重量'), name: lang('集散到件重量'), value: '5' },
      { label: lang('中心称重重量'), name: lang('中心称重重量'), value: '6' }
    ],
    // 商务件
    businessPackage: [
      { value: 1, label: lang('商务件'), name: lang('商务件') },
      { value: 2, label: lang('非商务件'), name: lang('非商务件') }
    ],
    // 审核状态
    networkAuditStatus: [
      { value: 0, label: lang('未审核'), name: lang('未审核') },
      { value: 1, label: lang('已驳回'), name: lang('已驳回') },
      { value: 2, label: lang('已审核'), name: lang('已审核') }
    ],
    // 建包费费用类型
    buildPackageFeeType: [
      { value: 701, label: lang('中心代建包费'), name: '中心代建包费' },
      { value: 113, label: lang('集散代建包费'), name: '集散代建包费' }
    ],
    // 退件状态
    refundPieceStatus: [
      { value: 1, label: lang('已退件'), name: '已退件' },
      { value: 2, label: lang('未退件'), name: '未退件' }
    ],
    // 确认状态
    confirmationStatus: [
      { value: 1, label: lang('未确认'), name: lang('未确认') },
      { value: 2, label: lang('已确认'), name: lang('已确认') },
      { value: 3, label: lang('已驳回'), name: lang('已驳回') }
    ],
    // 任务类型
    taskType: [
      { value: 'batchCheck', code: 'batchCheck', label: lang('寄件运单批量审核'), name: lang('寄件运单批量审核') },
      { value: 'batchReview', code: 'batchReview', label: lang('寄件运单批量反审'), name: lang('寄件运单批量反审') },
      { value: 'batchRecalculate', code: 'batchRecalculate', label: lang('寄件运单批量重算'), name: lang('寄件运单批量重算') },
      { value: 'batchPullAverage', code: 'batchPullAverage', label: lang('月结账单生成拉均任务'), name: lang('月结账单生成拉均任务') },
      { value: 'batchCalculateSpmwPieceBills', code: 'batchCalculateSpmwPieceBills', label: lang('派费账单批量算费'), name: lang('派费账单批量算费') },
      { value: 'batchCalculateSpmwTofbills', code: 'batchCalculateSpmwTofbills', label: lang('中转费账单批量算费'), name: lang('中转费账单批量算费') },
      { value: 'batchCalculateSpmCommissionBills', code: 'batchCalculateSpmCommissionBills', label: lang('提成账单批量算费'), name: lang('提成账单批量算费') },
      { value: 'batchRefreshAdditionalCharge', code: 'batchRefreshAdditionalCharge', label: lang('月结账单批量刷新附加费'), name: lang('月结账单批量刷新附加费') },
      { value: 'waybillEditImport', code: 'waybillEditImport', label: lang('寄件运单导入编辑'), name: lang('寄件运单导入编辑') },
      { value: 'dispatchReCalculate', code: 'dispatchReCalculate', label: lang('派件运单管理批量重算'), name: lang('派件运单管理批量重算') },
      { value: 'batchArrivalWeight', code: 'batchArrivalWeight', label: lang('批量刷集散到件重量'), name: lang('批量刷集散到件重量') },
      { value: 'batchChargeableWeight', code: 'batchChargeableWeight', label: lang('批量刷计费重量'), name: lang('批量刷计费重量') },
      { value: 'reservePriceBillReCalculate', code: 'reservePriceBillReCalculate', label: lang('底价发件账单批量重算(新)'), name: lang('底价发件账单批量重算(新)') },
      { value: 'pickPriceBillReCalculate', code: 'pickPriceBillReCalculate', label: lang('取件提成账单批量重算(新)'), name: lang('取件提成账单批量重算(新)') },
      { value: 'batchRecalculationFee', code: 'batchRecalculationFee', label: lang('月结账单明细批量重算'), name: lang('月结账单明细批量重算') },
      { value: 'reservePriceBillCheck', code: 'reservePriceBillCheck', label: lang('底价发件账单批量审核'), name: lang('底价发件账单批量审核') },
      { value: 'pickPriceBillCheck', code: 'pickPriceBillCheck', label: lang('取件提成账单批量审核'), name: lang('取件提成账单批量审核') },
      { value: 'reservePriceBillAntiAudit', code: 'reservePriceBillAntiAudit', label: lang('底价发件账单批量反审核'), name: lang('底价发件账单批量反审核') },
      { value: 'pickPriceBillAntiAudit', code: 'pickPriceBillAntiAudit', label: lang('取件提成账单批量反审核'), name: lang('取件提成账单批量反审核') },
      { value: 'dispatchBatchAudit', code: 'pickPriceBillReCalculate', label: lang('派件运单管理批量审核'), name: lang('派件运单管理批量审核') },
      { value: 'dispatchBatchUnAudit', code: 'pickPriceBillReCalculate', label: lang('派件运单管理批量反审核'), name: lang('派件运单管理批量反审核') }
    ],
    // 任务状态
    taskStatus: [
      { value: -1, label: lang('失败'), name: lang('失败') },
      { value: 1, label: lang('成功'), name: lang('成功') },
      { value: 2, label: lang('任务等待开始'), name: lang('任务等待开始') },
      { value: 3, label: lang('任务进行中'), name: lang('任务进行中') },
      { value: 4, label: lang('部分成功'), name: lang('部分成功') },
      { value: 5, label: lang('已取消'), name: lang('已取消') }
    ],
    // 是否
    yesOrNot: [
      { value: '', label: lang('全部'), name: lang('全部') },
      { value: 1, label: lang('是'), name: lang('是') },
      { value: 0, label: lang('否'), name: lang('否') }
    ],
    // 经营模式
    managementModel: [
      { value: 32, code: '32', label: lang('直营'), name: '直营' },
      { value: 33, code: '33', label: lang('加盟'), name: '加盟' },
      { value: 59, code: '59', label: lang('代理商'), name: '代理商' }
    ],
    // 客户类型
    customerType: [
      { value: 1, code: '1', label: lang('总部共享'), name: '总部共享' },
      { value: 2, code: '2', label: lang('代理区共享'), name: '代理区共享' },
      { value: 3, code: '3', label: lang('自有客户'), name: '自有客户' },
      { value: 4, code: '4', label: lang('其他网点'), name: '其他网点' }
    ],
    // 运费描述
    calculateStatus: [
      { value: 1, code: '1', label: lang('计费重量为0'), name: '计费重量为0' },
      { value: 2, code: '2', label: lang('未获取到始发地'), name: '未获取到始发地' },
      { value: 3, code: '3', label: lang('未获取到目的地'), name: '未获取到目的地' },
      { value: 4, code: '4', label: lang('未获取到报价'), name: '未获取到报价' },
      { value: 5, code: '5', label: lang('产品类型为空'), name: '产品类型为空' },
      { value: 6, code: '6', label: lang('物品类型为空'), name: '物品类型为空' },
      { value: 7, code: '7', label: lang('服务方式为空'), name: '服务方式为空' },
      { value: 8, code: '8', label: lang('正常计费'), name: '正常计费' },
      { value: 9, code: '9', label: lang('报价重复'), name: '报价重复' }
    ],
    // 账单锁帐标识
    billLockStatus: [
      { value: 1, label: lang('已锁帐'), name: '已锁帐' },
      { value: 2, label: lang('未锁帐'), name: '未锁帐' }
    ],
    // 账单锁帐标识
    templateType: [
      { value: 46, label: lang('标准报价'), name: '标准报价' },
      { value: 47, label: lang('定制报价'), name: '定制报价' }
    ],
    // 网点经营-结算方式
    netPayType: [
      { value: 320, label: lang('寄件现结'), name: '寄件现结', code: 'PP_CASH' },
      { value: 319, label: lang('寄付月结'), name: '寄付月结', code: 'PP_PM' }
      // { value: 321, label: lang('到付现结'), name: '到付现结', code: 'CC_CASH' }
    ],
    // 网点经营-结算方式 ——@void 作废 2020-12-02 14:58:46
    sourceType: [
      { value: 325, label: lang('JMS系统'), name: 'JMS系统', code: '01' },
      { value: 326, label: lang('桃花岛'), name: '桃花岛', code: '02' },
      { value: 327, label: lang('菜鸟'), name: '菜鸟', code: '03' },
      { value: 328, label: lang('京东'), name: '京东', code: '04' },
      { value: 342, label: lang('云集'), name: '云集', code: '05' },
      { value: 348, label: lang('紫金山'), name: '紫金山', code: '06' },
      { value: 329, label: lang('其他'), name: '其他', code: '100' }
    ],
    // 客户类型
    netTradeType: [
      { value: 1, code: '1', label: lang('收入'), name: '收入' },
      { value: 2, code: '2', label: lang('支出'), name: '支出' }
    ],
    // 客户类型
    _netTradeType: [
      { value: 1, code: '1', label: lang('收入'), name: '收入' },
      { value: 2, code: '2', label: lang('支出'), name: '支出' },
      { value: 3, code: '3', label: lang('收支'), name: '收支' }
    ],
    // 启用状态
    netEnbStatus: [
      { value: 0, label: lang('未启用'), name: '未启用' },
      { value: 1, label: lang('已启用'), name: '已启用' }
    ],
    // 启用状态
    enableStatus: [
      { value: 0, label: lang('停用'), name: '停用' },
      { value: 1, label: lang('启用'), name: '启用' }
    ],
    // 网点操作费维护-费用类型networkOperationFee
    networkOperationFeeStatus: [
      { value: 110, id: 110, code: 'S0110', label: lang('集散点出港操作费'), name: lang('集散点出港操作费') },
      { value: 210, id: 210, code: 'S0210', label: lang('集散点进港操作费'), name: lang('集散点进港操作费') },
      { value: 130, id: 130, code: 'S0130', label: lang('集散点出港大包操作费'), name: lang('集散点出港大包操作费') },
      { value: 230, id: 230, code: 'S0230', label: lang('集散点进港大包操作费'), name: lang('集散点进港大包操作费') }
    ],
    // 网点操作费维护-签收标识
    isSignStatus: [
      { value: 1, label: lang('已签收'), name: '已签收' },
      { value: 2, label: lang('未签收'), name: '未签收' }
    ],
    // 网点操作费维护-包计费标识
    isPackChargeStatus: [
      { value: 1, label: lang('是'), name: '是' },
      { value: 0, label: lang('否'), name: '否' }
    ],
    // 启用状态
    weightSource: [
      { value: 1, label: lang('入仓重量'), name: '入仓重量' },
      { value: 2, label: lang('收件重量'), name: '收件重量' },
      { value: 3, label: lang('内部计费重量'), name: '内部计费重量' },
      { value: 4, label: lang('订单重量'), name: '订单重量' },
      { value: 5, label: lang('集散到件重量'), name: '集散到件重量' },
      { value: 6, label: lang('中心称重重量'), name: '中心称重重量' },
      { value: 7, label: lang('手刷-批量刷新重量'), name: '手刷-批量刷新重量' }
    ],
    // 网点账单类型
    feeBillTypeList: [
      { value: 110, label: lang('集散点出港操作费'), name: lang('集散点出港操作费') },
      { value: 120, label: lang('集散点出港支线费'), name: lang('集散点出港支线费') },
      { value: 130, label: lang('集散点出港大包操作费'), name: lang('集散点出港大包操作费') },
      { value: 210, label: lang('集散点进港操作费 '), name: lang('集散点进港操作费 ') },
      { value: 220, label: lang('集散点进港支线费'), name: lang('集散点进港支线费') },
      { value: 230, label: lang('集散点进港大包操作费'), name: lang('集散点进港大包操作费') }
    ],
    // 运单来源
    WaybillSource: [
      { value: 1, label: lang('系统'), name: '系统' },
      { value: 2, label: lang('巴枪APP'), name: '巴枪APP' },
      { value: 3, label: lang('订单'), name: '订单' },
      // { value: 6, label: lang('转寄'), name: '转寄' },
      { value: 7, label: lang('手动补录'), name: '手动补录' },
      { value: 8, label: lang('回单'), name: '回单' }
    ],
    // 转退件标识
    returnParts: [
      { value: 1, label: lang('己退件'), name: '己退件' },
      { value: 2, label: lang('已转寄'), name: '已转寄' },
      { value: 3, label: lang('转退件'), name: '转退件' },
      { value: 0, label: lang('未退件'), name: '未退件' }
    ],
    // 是否签回单
    receiptStatus: [
      { value: 0, label: lang('否'), name: '否' },
      { value: 1, label: lang('是'), name: '是' }
      // 启用状态
    ],
    // 网点中转费类型
    networkTransferFeeType: [
      { value: 120, id: 120, code: 'S0120', label: lang('集散点出港支线费'), name: lang('集散点出港支线费') },
      { value: 220, id: 220, code: 'S0220', label: lang('集散点进港支线费'), name: lang('集散点进港支线费') }
    ],
    // 网点操作费类型
    networkOperateFeeType: [
      { value: 110, id: 110, code: 'S0110', label: lang('集散点出港操作费'), name: lang('集散点出港操作费') },
      { value: 210, id: 210, code: 'S0210', label: lang('集散点进港操作费'), name: lang('集散点进港操作费') }
    ],
    // 报价类型
    quoteTypeNet: [
      { value: 0, label: lang('普通报价'), name: '普通报价' },
      { value: 1, label: lang('同城报价'), name: '同城报价' },
      { value: 2, label: lang('同省报价'), name: '同省报价' }
    ],
    // 区域件标识
    areaCase: [
      { value: 0, label: lang('跨省件'), name: '跨省件' },
      { value: 1, label: lang('同城件'), name: '同城件' },
      { value: 2, label: lang('同省件'), name: '同省件' }
    ],
    // 数据来源类型
    netDataSource: [
      { value: 1, code: '1', label: lang('系统产生'), name: '系统产生' },
      { value: 2, code: '2', label: lang('用户'), name: '支出' }
    ],
    /** TODO 扣款金额 **/
    // 数据来源类型
    chargeValueType: [
      { value: 0, code: '0', label: lang('全部'), name: '全部' },
      { value: 1, code: '1', label: lang('扣款金额等于0'), name: '扣款金额等于0' },
      { value: 2, code: '2', label: lang('扣款金额等于中转费'), name: '扣款金额等于中转费' },
      { value: 3, code: '3', label: lang('扣款金额不等于中转费'), name: '扣款金额不等于中转费' }
    ],
    // 数据来源类型
    _chargeValueType: [
      { value: 0, code: '0', label: lang('全部'), name: '全部' },
      { value: 1, code: '1', label: lang('扣款金额等于0'), name: '扣款金额等于0' },
      { value: 2, code: '2', label: lang('扣款金额等于派件费'), name: '扣款金额等于派件费' },
      { value: 3, code: '3', label: lang('扣款金额不等于派件费'), name: '扣款金额不等于派件费' }
    ],
    // 拉均维度
    pullDimension: [
      { value: 1, code: '1', label: lang('客户'), name: '客户' },
      { value: 2, code: '2', label: lang('父客户'), name: '父客户' },
      { value: 3, code: '3', label: lang('所属收派员'), name: '所属收派员' }
    ],
    // 拉均对象
    pullObject: [
      { value: 1, code: '1', label: lang('客户'), name: '客户' },
      { value: 2, code: '2', label: lang('收派员'), name: '收派员' }
    ],
    // 集包类型
    packType: [
      { value: 1, code: '1', label: lang('网点集包'), name: '网点集包' },
      { value: 2, code: '2', label: lang('中心集包'), name: '中心集包' },
      { value: 3, code: '3', label: lang('集散点集包'), name: '集散点集包' },
      { value: 0, code: '0', label: lang('未集包'), name: '未集包' }
    ],
    // 网点中转费类型
    areaTransferFee: [{ value: 320, id: 320, code: 'S0320', label: lang('收派员发件费'), name: lang('收派员发件费') }],
    // 拉均对象
    // 客户类目
    categoryProperties: [
      { value: 0, code: '0', label: lang('主营类目'), name: '主营类目' },
      { value: 1, code: '1', label: lang('一级类目'), name: '一级类目' },
      { value: 2, code: '2', label: lang('二级类目'), name: '二级类目' }
    ],
    // 区域类型
    areaType: [
      { value: 0, code: '0', label: lang('跨省件'), name: '跨省件' },
      { value: 1, code: '1', label: lang('同城件'), name: '同城件' },
      { value: 2, code: '2', label: lang('同省件'), name: '同省件' }
    ],
    // 客户类目
    settleAreaType: [
      { value: 1, code: '1', label: lang('始发地'), name: '始发地' },
      { value: 2, code: '2', label: lang('目的地'), name: '目的地' }
    ],
    deductionsModeList: [
      { value: 1, code: '1', label: lang('不扣款'), name: '不扣款' },
      { value: 2, code: '2', label: lang('运单实时扣款'), name: '运单实时扣款' },
      { value: 3, code: '3', label: lang('运单审核扣款'), name: '运单审核扣款' }
    ],
    showAppList: [
      { value: 3, code: '3', label: lang('都展示'), name: '都展示' },
      { value: 1, code: '1', label: lang('内场App'), name: '内场App' },
      { value: 2, code: '2', label: lang('外场App'), name: '外场App' },
      { value: 0, code: '0', label: lang('都不展示'), name: '都不展示' }
    ],
    collectStaffType: [
      { value: 1, code: '1', label: lang('标准结算收派员'), name: '标准结算收派员' },
      { value: 2, code: '2', label: lang('操作员'), name: '操作员' },
      { value: 3, code: '3', label: lang('底价结算收派员'), name: '底价结算收派员' },
      { value: 4, code: '4', label: lang('其他'), name: '其他' }
    ],
    quoteCalType: [
      { value: 1, code: 'w', label: lang('重量'), name: '重量' },
      { value: 2, code: 'p', label: lang('件数'), name: '件数' },
      { value: 3, code: 'v', label: lang('价值'), name: '价值' },
      { value: 4, code: 'p', label: lang('票数'), name: '票数' },
      { value: 5, code: 'f', label: lang('运费'), name: '运费' }
    ],
    // 报价类型
    quoteTypeNew: [
      { value: 0, label: lang('普通报价'), name: '普通报价' },
      { value: 1, label: lang('同城报价'), name: '同城报价' },
      { value: 2, label: lang('同省报价'), name: '同省报价' },
      { value: 3, label: lang('阶梯报价'), name: '阶梯报价' }
    ],
    // 业务员结算重量
    siteStaffBillingWeight: [
      { label: lang('收件重量'), name: lang('收件重量'), value: 1 },
      { label: lang('入仓重量'), name: lang('入仓重量'), value: 2 },
      { label: lang('订单重量'), name: lang('订单重量'), value: 3 },
      { label: lang('内部计费重量'), name: lang('内部计费重量'), value: 4 },
      { label: lang('集散到件重量'), name: lang('集散到件重量'), value: 5 }
    ],
    addressType: [
      { value: 1, code: 1, label: lang('寄件地址'), name: '寄件地址' },
      { value: 2, code: 2, label: lang('收件地址'), name: '收件地址' }
    ],
    quoteValidityTypeList: [
      { value: 1, code: '1', label: lang('已过期'), name: '已过期' },
      { value: 2, code: '2', label: lang('未过期'), name: '未过期' },
      { value: 3, code: '3', label: lang('即将过期'), name: '即将过期' },
      { value: 4, code: '4', label: lang('今日过期'), name: '今日过期' }
    ]
  }
}

