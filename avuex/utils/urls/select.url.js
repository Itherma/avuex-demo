/**
 * pool.select URL
 */
import { GATEWAY } from '../axios'

//  所有网点——旧接口，保持原命名，待调整。
export const getNetworkPages = `${GATEWAY.BAS}/network/getNetworkPages`
//  @void 作废，有使用的请删除掉自己的代码； 所有网点——旧接口。
export const getNetwork = `${GATEWAY.BAS}/network/page`
//  财务中心——旧接口，保持原命名，待调整。
export const getFinancesOld = `${GATEWAY.BAS}/network/getFinances` // 原方法名 getFinances
//  财务中心
export const getFinances = `${GATEWAY.BAS}/network/select?isFinancialCenter=1`
//  财务中心
export const getFinancesAll = `${GATEWAY.BAS}/network/select/all?isFinancialCenter=1`
//  结算网点——旧接口，待调整。旧接口：/network/page/region/sysUser/page
export const dispatchNetwork = `${GATEWAY.BAS}/network/select`
// 所属网点
export const network = `${GATEWAY.BAS}/network/select`
// 所有网点
export const networkAll = `${GATEWAY.BAS}/network/select/all`
// 根据省市区名查询范围内的网点围栏
export const networkAreaPolygon = `${GATEWAY.BAS}/network/electronicFence/area/get`
// 根据网点id查询自身或子级网点围栏
export const networkIdPolygon = `${GATEWAY.BAS}/network/electronicFence/getNextEfByNetworkId`
// 没有电子围栏的网点
export const networkUnPolygon = `${GATEWAY.BAS}/network/electronicFence/getNoneElectronicFenceNetwork`
// 获取可派货分拨中心列表
export const distrubutionCenter = `${GATEWAY.BAS}/network/getDistrubutionCenterList`
//  根据可派货分拨中心获取关联网点
export const networkListByCenter = `${GATEWAY.BAS}/network/getNetworkListByCenterId`

// 获取可派货分拨中心列表(新)
export const distrubutionCenterNew = `${GATEWAY.BAS}/sysNetworkDistribution/getDistrubutionCenterList`

//  根据可派货分拨中心获取关联网点（新）
export const networkListByCenterNew = `${GATEWAY.BAS}/sysNetworkDistribution/getNetworkListByCenterId`
// 分拨、转运中心
//  所有父级财务中心
export const upFinancialCenter = `${GATEWAY.BAS}/network/getUpFinancialCenter`
//  部门
export const department = `${GATEWAY.BAS}/sysDepartmentInfo/select`
//  带级别部门
export const departmentForStaff = `${GATEWAY.BAS}/sysDepartmentInfo/getSelectForStaff`
//  带部门岗位
export const postForStaff = `${GATEWAY.BAS}/sysPost/getSelectForStaff`
// 客户信息 不包含禁用
export const customer = `${GATEWAY.BAS}/sysCustomer/select`
// 客户信息 所有
export const customerAll = `${GATEWAY.BAS}/sysCustomer/selectAll`
// 客户信息2
export const customer2 = `${GATEWAY.BAS}/sysCustomer/page`
//  岗位
export const post = `${GATEWAY.BAS}/sysPost/select`
//  结算目的地
export const settlementDestination = `${GATEWAY.BAS}/settlementDestination/select`
//  省市区
export const sysArea = `${GATEWAY.BAS}/sysArea/select`
//  省市区(江苏)
export const sysJsArea = `${GATEWAY.BAS}/sysArea/selectByCondition`
//  行政区划类型——没有对应的请求
export const sysAreaType = `${GATEWAY.BAS}/sysArea/type/select`
//  大区
export const regional = `${GATEWAY.BAS}/sysRegionalInfo/select`
//  片区
export const area = `${GATEWAY.BAS}/sysAreaInfo/select`
//  标准运费
//  产品类型@wait
export const sysCountry = `${GATEWAY.BAS}/sysCountry/select`
//  产品类型
export const sysProductType = `${GATEWAY.BAS}/sysProductType/select`
//  物品类型
export const srticle = `${GATEWAY.BAS}/article/select`
//  机构级别
export const deptLevel = `${GATEWAY.BAS}/sysDeptLevel/select`
//  结算方式
export const paymentManner = `${GATEWAY.BAS}/sysPaymentManner/select`
//  支付方式
export const payType = `${GATEWAY.BAS}/sysPayType/select`
//  结算币别
export const currencyType = `${GATEWAY.BAS}/sysCurrencyType/select`
//  客户运费
//  寄件服务方式
export const serviceType = `${GATEWAY.BAS}/serviceType/select`
//  计量单位
export const meteringUnit = `${GATEWAY.BAS}/sysMeteringUnit/select`
// 费用类型
export const feeType = `${GATEWAY.FIN}/ibkFeeType/page`
//  默认国家
export const defaultCountry = `${GATEWAY.BAS}/sysCountry/select`
// 员工资料 不包含禁用
export const staff = `${GATEWAY.BAS}/sysStaff/select`
// 员工资料所有
export const staffAll = `${GATEWAY.BAS}/sysStaff/selectAll`
// 承包区员工列表
export const siteStaff = `${GATEWAY.BAS}/sysSiteStaff/list`
// 虚拟承包区列表
export const staffNetwork = `${GATEWAY.BAS}/sysVirtualContractingArea/page`
//  数据字典分类
export const sysCategory = `${GATEWAY.BAS}/sysCategory/select`
// 异常件/问题类型
export const abnormalPiece = `${GATEWAY.BAS}/sysAbnormalPiece/select`
// 运输方式
export const transport = `${GATEWAY.BAS}/transport/select`
// 获取问题件科目
export const AbnormalPiece = `${GATEWAY.BAS}/sysAbnormalPiece/select`
//  订单状态
export const orderStatus = `${GATEWAY.CUS}/omsBase/getEnumsByKey`
// 收派单任务状态
export const taskStatus = `${GATEWAY.OPE}/opsBase/getEnumsByKey`
//  箱子规格
export const materialSpecification = `${GATEWAY.INT}/materialSpecification/page`
//  物料名称
export const materialNameData = `${GATEWAY.MAT}/material/getNameList`
//  @wait 非下拉接口，不放这里，待调整
export const checkCoupon = `${GATEWAY.BAS}/couponBatch/check`
// 车辆资料维护
export const tmsVehicle = `${GATEWAY.TRA}/tmsNewVehicle/page?tag=1&`
// 客户分组
export const customerGroup = `${GATEWAY.NET}/spmCustomerGroup/page`
// 进位方式
export const carryPosition = `${GATEWAY.FIN}/spmiCommon/getCarryPositionList`
// 包材型号
export const material = GATEWAY.MAT + '/material/getMaterialSalesPrice'

// 父客户下拉接口
export const selectParent = GATEWAY.BAS + '/sysCustomer/selectParent'

// 系统名称列表
export const logSystemName = GATEWAY.BAS + '/operationLog/logSystemName'

// 模块名称列表
export const moduleName = GATEWAY.BAS + '/operationLog/moduleName'

// 表名列表
export const baseTableName = GATEWAY.BAS + '/operationLog/logBaseTable/pages'

// 表名列表
export const sysUser = GATEWAY.BAS + '/sysUser/page'
//  加盟商
export const selectFranchisee = GATEWAY.BAS + '/network/selectFranchisee'
export const getDropDownList = GATEWAY.BAS + '/syscategorymanage/getDropDownList'
export const getSyscategory = GATEWAY.BAS + '/syscategorymanage/select'
