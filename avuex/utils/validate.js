import Schema from 'async-validator';
/*
 *@Description: 判断是否为空
 *@param {arg} any
 *@return [type] 空值返回真 其他返回假
 *@Date: 2019-06-21 16:01:51
*/
export function validatenull(val) {
  if (typeof val === 'boolean') {
    return false;
  }
  if (typeof val === 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') {
      return true;
    }
    return false;
  }
  return false;
}
/*
 *@Description: 异步校验器
 *@param {arg} type
 *@return [type]
 *@Date: 2019-06-21 16:05:00
*/
export const asyncValidator = (rules, form, option = {}) =>
  new Promise((resolve, reject) => {
    const schema = new Schema(rules);
    schema.validate(form, option, errors => {
      if (errors) {
        reject(errors);
      } else {
        resolve();
      }
    });
  });

const lang = val => val

// import App from '../../main'

// console.log(55555, App.$i18n.t('message.请输入'))

export const RULES = {
  /** ************************************** 新增 ********************************************* */
  arrayFour: { validator: arrayFour, trigger: ['blur', 'change'] },
  phoneAndMobileStrict: { validator: phoneAndMobileStrict, trigger: ['blur', 'change'] },
  phoneMobileAndMobileStrict: { validator: phoneMobileAndMobileStrict, trigger: ['blur', 'change'] },
  phoneStrict: { validator: phoneStrict, trigger: ['blur', 'change'] },
  mobileStrict: { validator: mobileStrict, trigger: ['blur', 'change'] },
  /** ************************************** 需修改 ********************************************* */
  phoneAndMobile: { validator: phoneAndMobile, trigger: ['blur', 'change'] },
  phoneOrChMobile: { validator: phoneOrChMobile, trigger: ['blur', 'change'] },
  /** ************************************** 旧正则 ********************************************* */
  lengthTwo: { min: 0, max: 2, message: lang('限2个字符内'), trigger: ['blur', 'change'] },
  lengthThree: { min: 0, max: 3, message: lang('限3个字符内'), trigger: ['blur', 'change'] },
  lengthFour: { min: 0, max: 4, message: lang('限4个字符内'), trigger: ['blur', 'change'] },
  lengthFive: { min: 0, max: 5, message: lang('限5个字符内'), trigger: ['blur', 'change'] },
  lengthSix: { min: 0, max: 6, message: lang('限6个字符内'), trigger: ['blur', 'change'] },
  lengthEight: { min: 0, max: 8, message: lang('限8个字符内'), trigger: ['blur', 'change'] },
  lengthTen: { min: 0, max: 10, message: lang('限10个字符内'), trigger: ['blur', 'change'] },
  lengthEleven: { min: 0, max: 11, message: lang('限11个字符内'), trigger: ['blur', 'change'] },
  lengthTwelve: { min: 0, max: 12, message: lang('限12个字符内'), trigger: ['blur', 'change'] },
  lengthFourteen: { min: 0, max: 14, message: lang('限14个字符内'), trigger: ['blur', 'change'] },
  lengthFifteen: { min: 0, max: 15, message: lang('限15个字符内'), trigger: ['blur', 'change'] },
  lengthEighteen: { min: 0, max: 18, message: lang('限18个字符内'), trigger: ['blur', 'change'] },
  lengthTwenty: { min: 0, max: 20, message: lang('限20个字符内'), trigger: ['blur', 'change'] },
  lengthTwentyFive: { min: 0, max: 25, message: lang('限25个字符内'), trigger: ['blur', 'change'] },
  lengthThirty: { min: 0, max: 30, message: lang('限30个字符内'), trigger: ['blur', 'change'] },
  lengthThirtytwo: { min: 0, max: 32, message: lang('限32个字符内'), trigger: ['blur', 'change'] },
  lengthFourty: { min: 0, max: 40, message: lang('限40个字符内'), trigger: ['blur', 'change'] },
  lengthFifty: { min: 0, max: 50, message: lang('限50个字符内'), trigger: ['blur', 'change'] },
  lengthSixty: { min: 0, max: 60, message: lang('限60个字符内'), trigger: ['blur', 'change'] },
  lengthEighty: { min: 0, max: 80, message: lang('限80个字符内'), trigger: ['blur', 'change'] },
  lengthOneHundred: { min: 0, max: 100, message: lang('限100个字符内'), trigger: ['blur', 'change'] },
  lengthTwoHundred: { min: 0, max: 200, message: lang('限200个字符内'), trigger: ['blur', 'change'] },
  lengTwoThousandFifty: { min: 0, max: 250, message: lang('限250个字符内'), trigger: ['blur', 'change'] },
  lengthFiveHd: { min: 0, max: 500, message: lang('限500个字符内'), trigger: 'blur' },
  lengTwoThousand: { min: 0, max: 2000, message: lang('限2000个字符内'), trigger: ['blur', 'change'] },
  lengFiveThousand: { min: 0, max: 5000, message: lang('限5000个字符内'), trigger: ['blur', 'change'] },
  lengthEightToSixteen: { min: 8, max: 16, message: lang('长度在8-16个字符'), trigger: ['blur', 'change'] },
  lengthThiryFivety: { min: 30, lengthFiveHd: 50, message: lang('长度在30-50个字符'), trigger: ['blur', 'change'] },
  required: { required: true, message: lang('请输入'), trigger: ['blur', 'change'] },
  requiredOptions: { required: true, message: lang('请选择'), trigger: ['blur', 'change'] },
  requiredSearch: { required: true, message: lang('请搜索后选择'), trigger: ['blur', 'change'] },
  email: { validator: email, trigger: ['blur', 'change'] }, // 邮箱
  noNumber: { validator: noNumber, trigger: ['blur', 'change'] }, // 不能全数字
  isNumber: { validator: isNumber, trigger: ['blur', 'change'] }, // 数字
  numberAndString: { validator: numberAndString, trigger: ['blur', 'change'] }, // 字符数字
  requestNumber: { validator: requestNumber, trigger: ['blur', 'change'] }, // 字符数字
  isStringNumber: { validator: isStringNumber, trigger: ['blur', 'change'] }, // 字符数字
  upperCaseNum: { validator: upperCaseNum, trigger: ['blur', 'change'] }, // 字符数字
  connectNumber: { validator: connectNumber, trigger: ['blur', 'change'] }, // 数字和连接符
  chString: { validator: chString, trigger: ['blur', 'change'] }, //
  enString: { validator: enString, trigger: ['blur', 'change'] }, //
  chEnNumString: { validator: chEnNumString, trigger: ['blur', 'change'] }, // 中文英文数字
  enString50: { validator: enString50, trigger: ['blur', 'change'] }, //
  enString60: { validator: enString60, trigger: ['blur', 'change'] }, //
  integer: { validator: integer, trigger: ['blur', 'change'] }, // 大于等于0整数
  integer99999999999: { validator: integer99999999999, trigger: ['blur', 'change'] },
  moreZeroInteger: { validator: moreZeroInteger, trigger: ['blur', 'change'] }, // 大于0整数
  integerNum: { validator: integerNum, trigger: ['blur', 'change'] }, // 限数字
  floatingNum: { validator: floatingNum, trigger: ['blur', 'change'] }, // 大于0浮点数
  threeCode: { validator: threeCode, trigger: ['blur', 'change'] }, // 三字码
  zipcode: { validator: zipcode, trigger: ['blur', 'change'] }, // 邮编验证
  areaNo: { validator: areaNo, trigger: ['blur', 'change'] }, // 区号验证
  codeTwenty: { validator: codeTwenty, trigger: ['blur', 'change'] },
  bankCard: { validator: bankCard, trigger: ['blur', 'change'] }, // 银行卡验证
  isLatitude: { validator: latitudeANDlongitude, trigger: ['blur', 'change'] }, // 纬度,经度
  numTwoFloat: { validator: numTwoFloat, trigger: ['blur', 'change'] }, // 小数后两位
  letter: { validator: letter, trigger: ['blur', 'change'] }, // 字母
  chEnString: { validator: chEnString, trigger: ['blur', 'change'] }, // 字母
  number_letter: { validator: number_letter, trigger: ['blur', 'change'] }, // 10位数字、字母或者下划线
  checkPhone: { validator: checkPhone, trigger: ['blur', 'change'] }, // 手机号
  checkFax: { validator: checkFax, trigger: ['blur', 'change'] }, // 传真
  maxFourNum: { validator: maxFourNum, trigger: ['blur', 'change'] }, // 数字9999
  maxFiveNum: { validator: maxFiveNum, trigger: ['blur', 'change'] }, // 数字99999
  maxFiveNumber: { validator: maxFiveNumber, trigger: ['blur', 'change'] }, // 数字0-99999
  maxSixNumber: { validator: maxSixNumber, trigger: ['blur', 'change'] }, // 数字1-999999
  weight: { validator: weight, trigger: ['blur', 'change'] }, // 数字999999
  maxFiveAndTenThousand: { validator: maxFiveAndTenThousand, trigger: ['blur', 'change'] }, //  5000 —— 10000
  oneToHundred: { validator: oneToHundred, trigger: ['blur', 'change'] }, // 数字1-100
  stopSellTime: { validator: stopSellTime, trigger: ['blur', 'change'] }, // 数字999
  maxTwoNum: { validator: maxTwoNum, trigger: ['blur', 'change'] }, // 数字99
  maxTen: { validator: maxTen, trigger: ['blur', 'change'] }, // 数字99
  idCard: { validator: idCardNumber, trigger: ['blur', 'change'] }, // 身份证号码
  driverNumber: { validator: driverNumber, trigger: ['blur', 'change'] }, // 驾驶证
  passportNumber: { validator: passportNumber, trigger: ['blur', 'change'] }, // 护照
  max99999: { validator: max99999, trigger: ['blur', 'change'] }, // 数字最大99999
  codeSix: { validator: codeSix, trigger: ['blur', 'change'] }, // 6位数字或者字母
  codeTen: { validator: codeTen, trigger: ['blur', 'change'] }, // 10位数字或者字母
  carNumber: { validator: carNumber, trigger: ['blur', 'change'] },
  int4Fload2: { validator: int4Fload2, trigger: ['blur', 'change'] },
  int5Fload2: { validator: int5Fload2, trigger: ['blur', 'change'] },
  int6Fload2: { validator: int6Fload2, trigger: ['blur', 'change'] },
  int7Fload2: { validator: int7Fload2, trigger: ['blur', 'change'] },
  int8Fload2: { validator: int8Fload2, trigger: ['blur', 'change'] },
  codeStrike: { validator: codeStrike, trigger: ['blur', 'change'] }, // 字符数字、-
  codeName15: { validator: codeName15, trigger: ['blur', 'change'] },
  emailPhoneNull: { validator: emailPhoneNull, trigger: ['blur', 'change'] },
  maxOneThousandNum: { validator: maxOneThousandNum, trigger: ['blur', 'change'] }, // 数字0-1000
  unXSS: { validator: unXSS, trigger: ['blur', 'change'] },
  fullAngle: { validator: fullAngle, trigger: ['blur', 'change'] },
  int1Fload2: { validator: int1Fload2, trigger: ['blur', 'change'] },
  int1Fload1: { validator: int1Fload1, trigger: ['blur', 'change'] },
  moduleName: { validator: moduleName, trigger: ['blur', 'change'] }
}
export const VALIDATION = {
  /** ************************************** 新增 ********************************************* */
  arrayFour: {
    label: lang('请选择到区/街道级')
  },
  int1Fload2: {
    value: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,0}\.\d{0,2}$|^[1-9]\d{0,0}$/,
    label: lang('最大数值为1位整数+2位小数')
  },
  int1Fload1: {
    value: /^0\.([1-9])$|^[1-9]\d{0,0}\.\d{0,1}$|^[1-9]\d{0,0}$/,
    label: lang('最大数值为1位整数+1位小数')
  },
  /** ************************************** 需修改 ********************************************* */
  phoneOrChMobile: {
    value: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
    label: lang('输入的电话或手机号码格式不正确')
  },
  // 'phone': {
  //   'value': /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i,
  //   'label': lang('输入的电话、传真格式不正确<')
  // },
  phoneNumber: {
    value: /(^1[3|4|5|7|8][0-9]\d{8}$)|(^([0-9]{8}$))/i,
    label: lang('手机号码为香港（8位）、中国大陆（11位）')
  },
  // 'chMobile': {
  //   'value': /^1[3|4|5|7|8][0-9]\d{8,8}$/,
  //   'label': lang('输入的手机号码格式不正确')
  // },
  phoneAndMobile: {
    // eslint-disable-next-line no-useless-escape
    value: /^[0-9\(\)\-\+]+$/i,
    label: lang('数字或连接符- + () 组成')
  },
  //  手机: 不含‘-’时1或95开头11位
  phoneStrict: {
    value: /^1\d{10}$/,
    label: lang('手机1开头11位')
  },
  phoneMobileStrict: {
    value: /(^1\d{10}$)|(^95\d{9}$)/,
    label: lang('手机1或95开头11位')
  },
  //  电话严格校验(含‘-’不限制任何开头12位(配合lengthTwelve使用))
  mobileStrict: {
    // eslint-disable-next-line no-useless-escape
    value: /(^[0-9]{3,5}[\-]{1}[0-9]{7,8}$)/,
    label: lang('固话(3-5位)-(7-8位)')
  },
  chString: {
    value: /^[\u4e00-\u9fa5]+$/i,
    label: lang('纯中文')
  },
  enString: {
    value: /^[A-Za-z\s·]+$/i,
    label: lang('英文+“·”')
  },
  /** ************************************** 旧正则 ********************************************* */
  priceNum: {
    value: /^0\.([0-9]|\d[0-9])$|^[0-9]\d{0,7}\.\d{0,2}$|^[0-9]\d{0,7}$/,
    label: lang('最大数值为8位整数+2位小数')
  },
  int8Fload2: {
    value: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,7}\.\d{0,2}$|^[1-9]\d{0,7}$/,
    label: lang('最大数值为8位整数+2位小数')
  },
  int7Fload2: {
    value: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,7}\.\d{0,2}$|^[1-9]\d{0,7}$/,
    label: lang('最大数值为7位整数+2位小数')
  },
  int6Fload2: {
    value: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,5}\.\d{0,2}$|^[1-9]\d{0,5}$/,
    label: lang('最大数值为6位整数+2位小数')
  },
  int5Fload2: {
    value: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,4}\.\d{0,2}$|^[1-9]\d{0,4}$/,
    label: lang('最大数值为5位整数+2位小数')
  },
  int4Fload2: {
    value: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,3}\.\d{0,2}$|^[1-9]\d{0,3}$/,
    label: lang('最大数值为4位整数+2位小数')
  },
  eightNum: {
    value: /^([0-9]{1,8})$/,
    label: lang('限8个字符内的数字')
  },
  otherName: {
    // eslint-disable-next-line no-useless-escape
    value: /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,})$/i,
    label: lang('输入的名称格式不正确')
  },
  describe: {
    // eslint-disable-next-line no-useless-escape
    value: /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,})$/i,
    label: lang('输入的格式不正确')
  },
  numberAndString: {
    value: /^(?=[a-zA-Z]*[0-9])(?=[0-9]*[a-zA-Z])[a-zA-Z0-9]{2,}$/,
    label: lang('至少有一个英文和数字')
  },
  requestNumber: {
    value: /(.*)?\d+(.*)?$/,
    label: lang('至少有一个数字')
  },
  code: {
    value: /^([a-zA-Z0-9]{1,})$/,
    label: lang('英文和数字的组合')
  },
  contactPerson: {
    value: /^([a-zA-Z\u4e00-\u9fa5]{2,})$/,
    label: lang('2 - 10位的英文或汉字')
  },
  roleName: {
    value: /^([a-zA-Z\u4e00-\u9fa5]{2,10})$/,
    label: lang('长度在2-10个字符的英文或汉字')
  },
  codeName: {
    value: /^([a-zA-Z0-9_]{1,10})$/,
    label: lang('限10个字符内的英文或数字')
  },
  codeName15: {
    value: /^([a-zA-Z0-9_]{1,15})$/,
    label: lang('限15个字符内的字母或数字')
  },
  character: {
    value: /^.{1,100}$/,
    label: lang('输入正确的字符长度')
  },
  name: {
    // eslint-disable-next-line no-useless-escape
    value: /(^[\u4e00-\u9fa5 ]{2,}$)|(^[a-zA-Z\/ ]{2,}$)/,
    label: lang('英文或汉字')
  },
  fax: {
    value: /^(\d{3,4}-)?\d{7,8}$/,
    label: lang('输入的号码格式不正确')
  },
  idCardNumber: {
    value: /^[1-9]([0-9]{16}|[0-9]{13})[xX0-9]$/i,
    label: lang('输入的身份证号码格式不正确')
  },
  driverNumber: {
    value: /^[1-9]([0-9]{16}|[0-9]{13})[xX0-9]$/i,
    label: lang('输入的驾驶证号码格式不正确')
  },
  passportNumber: {
    value: /^1[45][0-9]{7}$|([P|S]\d{7}$)|([S|G|E]\d{8}$)|([GTSLQDAF]\d{8}$)|([HM]\d{8,10})$/,
    label: lang('输入的护照格式不正确')
  },
  company: {
    value: /.*/i,
    label: lang('输入的名称格式不正确')
  },
  address: {
    value: /.*/i,
    label: lang('输入的地址格式不正确')
  },
  zipcode: {
    value: /^[0-9]\d{0,10}$/i,
    label: lang('限10个字符内的数字')
  },
  areaNo: {
    value: /^[0-9]\d{0,4}$/i,
    label: lang('限5个字符内 数字，如020')
  },
  date: {
    value: /^(\d{4})-(\d{2})-(\d{2})$/i,
    label: lang('日期格式为：yyyy-mm-dd，如2015-01-01')
  },
  time: {
    value: /^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/i,
    label: lang('时间格式为：yyyy-mm-dd hh:mm:ss或hh:mm，如2008-08-08 18:00')
  },
  price: {
    value: /^([1-9]?[0-9]{1,5})(\.[0-9]{1,2})?$/,
    label: lang('数字x元x毛x分，格式为：xx、xx.xx、x.xx')
  },
  ticketPrice: {
    value: /^([1-9]?[0-9]{0,2})(\.[0-9]{1,2})?$/,
    label: lang('数字:1-999.99')
  },
  float: {
    //  通过_m_n传值，value改为字符串
    value: '^(0|[1-9][0-9]{0,regexp_m})(\\.[0-9]{1,regexp_n})?$',
    label: lang('regexp_m位整数和regexp_n位小数')
  },
  coupon: {
    value: /^([1-9][0-9]{0,1})$/,
    label: lang('数字:1-99')
  },
  carNumber: {
    value: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z0-9]{5}$/i,
    label: lang('车牌号码格式不正确')
  },
  email: {
    // eslint-disable-next-line no-useless-escape
    value: /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i,
    label: lang('输入的邮箱格式不正确')
  },
  qq: {
    value: /^[1-9][0-9]{4,12}$/i,
    label: lang('输入的QQ号码格式不正确')
  },
  weixin: {
    value: /^[A-Za-z][A-Za-z0-9_-]{5,19}$/i,
    label: lang('输入的微信号码格式不正确')
  },
  password: {
    value: /^[A-Za-z0-9*#]{6,18}$/,
    label: lang('6-18位字母大小写、数字、*、#的组合')
  },
  percent: {
    value: /^(0|[1-9][0-9]{0,3})(\.[0-9]{1,2})?%$/i,
    label: lang('xxxx.xx%，如123.45%')
  },
  numTwoFloat: {
    value: /^(0|[1-9][0-9]{0,9})(\.[0-9]{1,2})?$/i,
    label: lang('请保留两位小数')
  },
  integer: {
    value: /^(0|[1-9][0-9]*)$/i,
    label: lang('限整数')
  },
  floatingNum: {
    value: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/i,
    label: lang('请输入大于0且保留两位小数点的数字')
  },
  integerNum: {
    value: /^([0-9]*)$/i,
    label: lang('限数字')
  },
  moreZeroInteger: {
    value: /^([1-9][0-9]*)$/i,
    label: lang('请输入大于0的整数')
  },
  moreZeroFloat: {
    value: /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/,
    label: lang('请输入大于0的数字')
  },
  number: {
    value: /^\d{1,2}$/i,
    label: lang('两位数字')
  },
  specialTicket: {
    value: /^\d{1,2}$/i,
    label: lang('1-2位数字')
  },
  specialTicketPrice: {
    value: /^([0-9]{1,3})+([.]{1}[0-9]+){0,1}$$/i,
    label: lang('金额为:1-300')
  },
  cnaps: {
    value: /^\d{12}$/,
    label: lang('格式为：12位数字')
  },
  upperCaseNum: {
    value: /^[A-Z_0-9]+$/,
    label: lang('格式为：英文大写或数字')
  },
  upperCase: {
    value: /^[A-Z]+$/,
    label: lang('格式为：英文大写字母')
  },
  lowerCase: {
    value: /^[a-z]+$/,
    label: lang('格式为：英文小写字母')
  },
  letter: {
    value: /^[A-Za-z]+$/i,
    label: lang('格式为：英文大小写')
  },
  string: {
    value: /.*/i,
    label: lang('输入非法字符')
  },
  license: {
    value: /(^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{6}$)|(^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$)/i,
    label: lang('格式为：首位中文、大写英文、数字加英语')
  },
  chEnString: {
    value: /^([\u4e00-\u9fa5A-Za-z\s]+)$/i,
    label: lang('格式为：中英文字符')
  },
  chEnNumString: {
    value: /^([\u4e00-\u9fa5A-Za-z0-9\s]+)$/i,
    label: lang('格式为：中英文数字字符')
  },
  search: {
    value: /^.{0,12}$/i,
    label: lang('输入的搜索信息格式不正确，最多支持12个字符')
  },
  url: {
    // eslint-disable-next-line no-useless-escape
    value: /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/i,
    label: lang('格式为：http://www.baidu.com或者https://www.baidu.com')
  },
  threeDigit: {
    value: /^[1-9]\d{0,2}$/i,
    label: lang('位数不能超过三位数')
  },
  vName: {
    value: /(^[0-9]{0,2}\.[0-9]{0,2}\.[0-9]{0,2}\.[1-9]{0,4}$)|(^[0-9]{0,2}$)|(^[0-9]{0,2}\.[0-9]{0,2}$)|(^[0-9]{0,2}\.[0-9]{0,2}\.[,0-9]{0,2}$)/i,
    label: lang('输入格式错误')
  },
  loginName: {
    value: /^[\w]{6,16}$/,
    label: lang('格式为：6-16位英文大小写、数字、下划线_')
  },
  bankCard: {
    value: /^(\d{16}$)|(^\d{17}$)|(^\d{18}$)|(^\d{19}$)/i,
    label: lang('银行卡号不能超过19位数字，不低于16位数字')
  },
  axleBase: {
    value: /^[1-9][0-9]{3}$/i,
    label: lang('输入的格式不正确，4位数字')
  },
  //  @wait 作废
  idCard: {
    value: /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)/i,
    label: lang('输入的身份证格式不正确，15或18位身份证号码')
  },
  supervisory: {
    value: /^[A-Za-z0-9]{1,20}$/i,
    label: lang('格式为：英文大小写，数字，最多支持20个字符')
  },
  threeCode: {
    value: /^[A-Za-z]{3}$/i,
    label: '格式为：3个字符的英文大小写'
  },
  plateNumber: {
    value: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}[A-Z0-9]{5,6}$/i,
    label: lang('车牌格式为：鄂A12345或鄂A123456')
  },
  carType: {
    value: /^([\u4e00-\u9fa5A-Za-z]+)$/i,
    label: lang('输入格式错误')
  },
  presellTime: {
    value: /^[1-9][0-9]{0,1}$/,
    label: lang('数字:1-99')
  },
  oneToHundred: {
    value: /^100$|^0$|^[1-9]\d{0,1}\.\d{0,2}$|^[1-9]\d{0,1}$|^0\.\d{0,1}[1-9]{1,1}$|^0\.[1-9]{1,1}$/,
    label: lang('数字：0-100，最多2位小数')
  },
  stopSellTime: {
    value: /^[1-9][0-9]{0,2}$/,
    label: lang('数字:1-999')
  },
  maxOneThousandNum: {
    value: /^(0|[1-9]\d\d|1000)$/,
    label: lang('数字:0-1000')
  },
  maxFourNum: {
    value: /^[1-9][0-9]{0,3}$/,
    label: lang('数字:1-9999')
  },
  maxFiveNum: {
    value: /^[1-9][0-9]{0,4}$/,
    label: lang('数字:1-99999')
  },
  maxFiveNumber: {
    value: /^[0-9][0-9]{0,4}$/,
    label: lang('数字:0-99999')
  },
  maxSixNumber: {
    value: /^[1-9][0-9]{0,5}$/,
    label: lang('数字:1-999999')
  },
  amount: {
    value: /^[1-9][0-9]{0,7}$/,
    label: lang('数字:1-99999999')
  },
  weight: {
    value: /^[1-9][0-9]{0,5}$/,
    label: lang('数字:1-999999')
  },
  chargeRate: {
    value: /^[0-9]{1,2}$/,
    label: lang('数字:0-99')
  },
  codeFive: {
    value: /^[0-9A-Za-z]{5}$/,
    label: lang('数字和字母组成，长度为5位')
  },
  codeSix: {
    value: /^[0-9A-Za-z]{6}$/,
    label: lang('数字和字母组成，长度为6位')
  },
  codeEight: {
    value: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}$/,
    label: lang('数字和字母组成，长度为8位')
  },
  codeTen: {
    value: /^[0-9a-zA-Z]{10}$/,
    label: lang('数字和字母组成，长度为10位')
  },
  codeTwenty: {
    value: /^[0-9a-zA-Z_]{1,20}$/,
    label: lang('数字、下划线或字母组成，长度为1-20位')
  },
  connectNumber: {
    value: /^[0-9 -]+$/i,
    label: lang('数字、连接符- 组成')
  },
  enString50: {
    value: /^[a-zA-Z\s]{0,50}$/,
    label: lang('50个英文字符')
  },
  enString60: {
    value: /^[a-zA-Z\s]{0,60}$/,
    label: lang('60个英文字符')
  },
  //  @wait 待确认
  latitudeANDlongitude: {
    value: /^((-)?\d{1,3})(\.\d{1,8})?$/,
    label: lang('整数最多3位，小数最多8位')
  },
  number_letter: {
    value: /^[\w]+$/,
    label: lang('只能输入数字、字母或下划线')
  },
  num_Sting15: {
    value: /^[a-zA-Z]{2}\d{13}$|^\d{15}$/,
    label: lang('15位数字或首字母两个+13位数字')
  },
  num_chinese_en: {
    value: /^([\u4e00-\u9fa5A-Za-z0-9]{0,30})$/i,
    label: lang('中文字符/数字/英文，长度为1-30位')
  },
  codeStrike: {
    // eslint-disable-next-line no-useless-escape
    value: /^([a-zA-Z0-9\-]{1,})$/,
    label: lang('英文、数字或‘-’的组合')
  },
  unXSS: {
    value: /^\s+$|^null+$|^undefined+$|<\s*?script\s*?>.*?/i,
    label: lang('不含null undefined <script> 纯空格')
  },
  fullAngle: {
    value: /[\uff00-\uffff]/i,
    label: lang('不能输入全角字符')
  }
}
export function int1Fload2(rule, value, callback) {
  if (value && !VALIDATION.int1Fload2.value.test(value)) {
    callback(new Error(VALIDATION.int1Fload2.label))
  } else {
    callback()
  }
}
export function int1Fload1(rule, value, callback) {
  if (value && !VALIDATION.int1Fload1.value.test(value)) {
    callback(new Error(VALIDATION.int1Fload1.label))
  } else {
    callback()
  }
}
/**
 * @desc XSS攻击过滤
 */
export function unXSS(rule, value, callback) {
  if (value && VALIDATION.unXSS.value.test(value)) {
    callback(new Error(VALIDATION.unXSS.label))
  } else {
    callback()
  }
}
function arrayFour(rule, value, callback) {
  if (value.length < 4) {
    callback(new Error(VALIDATION.arrayFour.label))
  } else {
    callback()
  }
}
/**
 * @desc 4整数2小数
 */
export function int4Fload2(rule, value, callback) {
  if (value && !VALIDATION.int4Fload2.value.test(value)) {
    callback(new Error(VALIDATION.int4Fload2.label))
  } else {
    callback()
  }
}
/**
 * @desc 5整数2小数
 */
export function int5Fload2(rule, value, callback) {
  if (value && !VALIDATION.int5Fload2.value.test(value)) {
    callback(new Error(VALIDATION.int5Fload2.label))
  } else {
    callback()
  }
}
/**
 * @desc 6整数2小数
 */
export function int6Fload2(rule, value, callback) {
  if (value && !VALIDATION.int6Fload2.value.test(value)) {
    callback(new Error(VALIDATION.int6Fload2.label))
  } else {
    callback()
  }
}
/**
 * @desc 8整数2小数
 */
export function int8Fload2(rule, value, callback) {
  if (value && !VALIDATION.int6Fload2.value.test(value)) {
    callback(new Error(VALIDATION.int6Fload2.label))
  } else {
    callback()
  }
}
export function int7Fload2(rule, value, callback) {
  if (value && !VALIDATION.int6Fload2.value.test(value)) {
    callback(new Error(VALIDATION.int6Fload2.label))
  } else {
    callback()
  }
}
/**
 * @desc 车票
 */
export function carNumber(rule, value, callback) {
  if (value && !VALIDATION.carNumber.value.test(value)) {
    callback(new Error(VALIDATION.carNumber.label))
  } else {
    callback()
  }
}
/**
 * @desc 电话和手机号fullAngle
 */
export function phoneAndMobile(rule, value, callback) {
  if (value && !VALIDATION.phoneAndMobile.value.test(value)) {
    callback(new Error(VALIDATION.phoneAndMobile.label))
  } else if (value && VALIDATION.fullAngle.value.test(value)) {
    callback(new Error(VALIDATION.fullAngle.label))
  } else {
    callback()
  }
}
export function phoneStrict(rule, value, callback) {
  if (value && !VALIDATION.phoneStrict.value.test(value)) {
    callback(new Error(VALIDATION.phoneStrict.label))
  } else if (value && VALIDATION.fullAngle.value.test(value)) {
    callback(new Error(VALIDATION.fullAngle.label))
  } else {
    callback()
  }
}
export function mobileStrict(rule, value, callback) {
  if (value && !VALIDATION.mobileStrict.value.test(value)) {
    callback(new Error(VALIDATION.mobileStrict.label))
  } else if (value && VALIDATION.fullAngle.value.test(value)) {
    callback(new Error(VALIDATION.fullAngle.label))
  } else {
    callback()
  }
}
export function phoneAndMobileStrict(rule, value, callback) {
  if (!value) {
    callback()
    return
  }
  if (VALIDATION.fullAngle.value.test(value)) {
    return callback(new Error(VALIDATION.fullAngle.label))
  }
  if (VALIDATION.phoneStrict.value.test(value) || (VALIDATION.mobileStrict.value.test(value) && value.length >= 11 && value.length <= 14)) {
    callback()
  } else {
    callback(new Error(`${VALIDATION.phoneStrict.label}、${VALIDATION.mobileStrict.label}`))
  }
}
export function phoneMobileAndMobileStrict(rule, value, callback) {
  if (!value) {
    callback()
    return
  }
  if (VALIDATION.fullAngle.value.test(value)) {
    return callback(new Error(VALIDATION.fullAngle.label))
  }
  if (VALIDATION.phoneMobileStrict.value.test(value) || (VALIDATION.mobileStrict.value.test(value) && value.length >= 11 && value.length <= 14)) {
    callback()
  } else {
    callback(new Error(`${VALIDATION.phoneMobileStrict.label}、${VALIDATION.mobileStrict.label}`))
  }
}

/**
 * @desc 电话和手机号(又开了种校验。。。)
 */
export function phoneOrChMobile(rule, value, callback) {
  if (value && !VALIDATION.phoneOrChMobile.value.test(value)) {
    callback(new Error(VALIDATION.phoneOrChMobile.label))
  } else {
    callback()
  }
}

/**
 * @desc 4个字符没得数字
 */
export function carNum(rule, value, callback) {
  if (value && !VALIDATION.carNum.value.test(value)) {
    callback(new Error(VALIDATION.carNum.label))
  } else {
    callback()
  }
}
/**
 * @desc 8个字符没得数字
 */
export function priceNum(rule, value, callback) {
  if (value && !VALIDATION.priceNum.value.test(value)) {
    callback(new Error(VALIDATION.priceNum.label))
  } else {
    callback()
  }
}
/**
 * @desc 8个字符没得数字
 */
export function eightNum(rule, value, callback) {
  if (value && !VALIDATION.eightNum.value.test(value)) {
    callback(new Error(VALIDATION.eightNum.label))
  } else {
    callback()
  }
}

// @desc 权限名称30个中文字符/数字/英文
export function num_chinese_en(rule, value, callback) {
  if (value && !VALIDATION.num_chinese_en.value.test(value)) {
    callback(new Error(VALIDATION.num_chinese_en.label))
  } else {
    callback()
  }
}

// @desc 校验单号规则
export function num_Sting15(rule, value, callback) {
  if (value && !VALIDATION.num_Sting15.value.test(value)) {
    callback(new Error(VALIDATION.num_Sting15.label))
  } else {
    callback()
  }
}
/**
 * @desc 表单验证集合
 */

// 身份证号码
export function idCardNumber(rule, value, callback) {
  if (value && !VALIDATION.idCardNumber.value.test(value)) {
    callback(new Error(VALIDATION.idCardNumber.label))
  } else {
    callback()
  }
}
export function driverNumber(rule, value, callback) {
  if (value && !VALIDATION.driverNumber.value.test(value)) {
    callback(new Error(VALIDATION.driverNumber.label))
  } else {
    callback()
  }
}
export function passportNumber(rule, value, callback) {
  if (value && !VALIDATION.passportNumber.value.test(value)) {
    callback(new Error(VALIDATION.passportNumber.label))
  } else {
    callback()
  }
}

// 校验手机号不能超过11位，且为数字 TODO
export function checkPhone(rule, value, callback) {
  if (value && !VALIDATION.phoneNumber.value.test(value)) {
    callback(new Error(VALIDATION.phoneNumber.label))
  } else {
    callback()
  }
}

// 校验传真
export function checkFax(rule, value, callback) {
  if (value && !VALIDATION.fax.value.test(value)) {
    callback(new Error(VALIDATION.fax.label))
  } else {
    callback()
  }
}

// 经度 纬度 非必填 正负数，-123.12345678
export function latitudeANDlongitude(rule, value, callback) {
  if (value && !VALIDATION.latitudeANDlongitude.value.test(value)) {
    callback(new Error(VALIDATION.latitudeANDlongitude.label))
  } else {
    callback()
  }
}
// 数字 非必填
export function isNumber(rule, value, callback) {
  if (value && Number.isNaN(Number(value))) {
    callback(new Error(lang('请输入数字')))
  } else {
    callback()
  }
}
//  非全部数字
export function noNumber(rule, value, callback) {
  if (value && !Number.isNaN(Number(value))) {
    callback(new Error(lang('不能纯数字')))
  } else {
    callback()
  }
}
//  0/正整数
export function integer(rule, value, callback) {
  if (value && !VALIDATION.integer.value.test(value)) {
    callback(new Error(VALIDATION.integer.label))
  } else {
    callback()
  }
}
//  0/正整数
export function integer99999999999(rule, value, callback) {
  if (value && value > 99999999999) {
    callback(new Error(new Error(lang('上限11位'))))
  } else {
    callback()
  }
}
//  大于0正整数
export function moreZeroInteger(rule, value, callback) {
  if (value && !VALIDATION.moreZeroInteger.value.test(value)) {
    callback(new Error(VALIDATION.moreZeroInteger.label))
  } else {
    callback()
  }
}
//  纯数字
export function integerNum(rule, value, callback) {
  if (value && !VALIDATION.integerNum.value.test(value)) {
    callback(new Error(VALIDATION.integerNum.label))
  } else {
    callback()
  }
}
//  大于0保留两位小数
export function floatingNum(rule, value, callback) {
  if (value && !VALIDATION.floatingNum.value.test(value)) {
    callback(new Error(VALIDATION.floatingNum.label))
  } else {
    callback()
  }
}

export function requestNumber(rule, value, callback) {
  if (value && !VALIDATION.requestNumber.value.test(value)) {
    callback(new Error(VALIDATION.requestNumber.label))
  } else {
    callback()
  }
}
export function numberAndString(rule, value, callback) {
  if (value && !VALIDATION.numberAndString.value.test(value)) {
    callback(new Error(VALIDATION.numberAndString.label))
  } else {
    callback()
  }
}
// 字符和数字 非必填
export function isStringNumber(rule, value, callback) {
  if (value && !VALIDATION.code.value.test(value)) {
    callback(new Error(VALIDATION.code.label))
  } else if (value && VALIDATION.unXSS.value.test(value)) {
    callback(new Error(VALIDATION.unXSS.label))
  }
  if (value && VALIDATION.fullAngle.value.test(value)) {
    callback(new Error(VALIDATION.fullAngle.label))
  } else {
    callback()
  }
}
// 字母大写或数字
export function upperCaseNum(rule, value, callback) {
  if (value && !VALIDATION.upperCaseNum.value.test(value)) {
    callback(new Error(VALIDATION.upperCaseNum.label))
  } else {
    callback()
  }
}

// 3个字符的大小写英文
export function threeCode(rule, value, callback) {
  if (value) {
    if (!VALIDATION.threeCode.value.test(value)) {
      callback(new Error(VALIDATION.threeCode.label))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
// 邮编验证
export function zipcode(rule, value, callback) {
  if (value) {
    if (!VALIDATION.zipcode.value.test(value)) {
      callback(new Error(VALIDATION.zipcode.label))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
// 区号
export function areaNo(rule, value, callback) {
  if (value) {
    if (!VALIDATION.areaNo.value.test(value)) {
      callback(new Error(VALIDATION.areaNo.label))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 数字 和 连接符-  非必填
export function connectNumber(rule, value, callback) {
  if (value && !VALIDATION.connectNumber.value.test(value)) {
    callback(new Error(VALIDATION.connectNumber.label))
  } else {
    callback()
  }
}
// 数字 小数后两位
export function numTwoFloat(rule, value, callback) {
  if (value && !VALIDATION.numTwoFloat.value.test(value)) {
    callback(new Error(VALIDATION.numTwoFloat.label))
  } else {
    callback()
  }
}
// 验证密码
export function checkPass(rule, value, callback) {
  if (value.length < 6) {
    callback(new Error(lang('不能小于6位')))
  }
  if (value.length > 11) {
    callback(new Error(lang('不能超过11位')))
  } else {
    callback()
  }
}
// email邮箱格式校验
export function emailPhone(rule, value, callback) {
  if (!VALIDATION.email.value.test(value)) {
    callback(new Error(VALIDATION.email.label))
  } else {
    callback()
  }
}

// email邮箱格式校验可以为空
export function emailPhoneNull(rule, value, callback) {
  if ((value && !VALIDATION.email.value.test(value)) || (value === 0 && !VALIDATION.email.value.test(value))) {
    callback(new Error(VALIDATION.email.label))
  } else {
    callback()
  }
}

// 可空 email 邮箱格式校验
export function email(rule, value, callback) {
  if (value && !VALIDATION.email.value.test(value)) {
    callback(new Error(VALIDATION.email.label))
  } else {
    callback()
  }
}

// 编码检验
export function codeName(rule, value, callback) {
  if (!VALIDATION.codeName.value.test(value)) {
    callback(new Error(VALIDATION.codeName.label))
  } else {
    callback()
  }
}
export function codeName15(rule, value, callback) {
  if (!VALIDATION.codeName15.value.test(value)) {
    callback(new Error(VALIDATION.codeName15.label))
  } else {
    callback()
  }
}
// 英文名称
export function enString(rule, value, callback) {
  if (value) {
    if (!VALIDATION.enString.value.test(value)) {
      callback(new Error(VALIDATION.enString.label))
    } else if (/^\s+|\s+$/.test(value)) {
      callback(new Error(lang('首尾不能有空格')))
    } else if (VALIDATION.unXSS.value.test(value)) {
      callback(new Error(VALIDATION.unXSS.label))
    }
    if (VALIDATION.fullAngle.value.test(value)) {
      callback(new Error(VALIDATION.fullAngle.label))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
// 中文英文数字名称
export function chEnNumString(rule, value, callback) {
  if (value) {
    if (!VALIDATION.chEnNumString.value.test(value)) {
      callback(new Error(VALIDATION.chEnNumString.label))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 50英文名称
export function enString50(rule, value, callback) {
  if (value) {
    if (!VALIDATION.enString50.value.test(value)) {
      callback(new Error(VALIDATION.enString50.label))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 60英文名称
export function enString60(rule, value, callback) {
  if (value) {
    if (!VALIDATION.enString60.value.test(value)) {
      callback(new Error(VALIDATION.enString60.label))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 中文名称
export function chString(rule, value, callback) {
  if (value) {
    if (!VALIDATION.chString.value.test(value)) {
      callback(new Error(VALIDATION.chString.label))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 5位类型编码
export function codeFive(rule, value, callback) {
  if (!VALIDATION.codeFive.value.test(value)) {
    callback(new Error(VALIDATION.codeFive.label))
  } else {
    callback()
  }
}
// 6位类型编码
export function codeSix(rule, value, callback) {
  if (!VALIDATION.codeSix.value.test(value)) {
    callback(new Error(VALIDATION.codeSix.label))
  } else {
    callback()
  }
}

// 5位类型编码
export function codeEight(rule, value, callback) {
  if (!VALIDATION.codeEight.value.test(value)) {
    callback(new Error(VALIDATION.codeEight.label))
  } else {
    callback()
  }
}

// 10位类型编码
export function codeTen(rule, value, callback) {
  if (!VALIDATION.codeTen.value.test(value)) {
    callback(new Error(VALIDATION.codeTen.label))
  } else {
    callback()
  }
}
// 字母
export function letter(rule, value, callback) {
  if (value && !VALIDATION.letter.value.test(value)) {
    callback(new Error(VALIDATION.letter.label))
  } else {
    callback()
  }
}
export function chEnString(rule, value, callback) {
  if (value === 0 || (value && !VALIDATION.chEnString.value.test(value))) {
    callback(new Error(VALIDATION.chEnString.label))
  } else {
    callback()
  }
}

// 数字、字母、下划线
export function number_letter(rule, value, callback) {
  if (!VALIDATION.number_letter.value.test(value)) {
    callback(new Error(VALIDATION.number_letter.label))
  } else {
    callback()
  }
}
// 20位字典类型编码
export function codeTwenty(rule, value, callback) {
  if (!VALIDATION.codeTwenty.value.test(value)) {
    callback(new Error(VALIDATION.codeTwenty.label))
  } else {
    callback()
  }
}

// 20位字典类型编码
export function bankCard(rule, value, callback) {
  if (!VALIDATION.bankCard.value.test(value)) {
    callback(new Error(VALIDATION.bankCard.label))
  } else {
    callback()
  }
}

// 大于0的数字
export function moreZeroFloat(rule, value, callback) {
  if (!VALIDATION.moreZeroFloat.value.test(value)) {
    callback(new Error(VALIDATION.moreZeroFloat.label))
  } else {
    callback()
  }
}
export function oneToHundred(rule, value, callback) {
  if (value && !VALIDATION.oneToHundred.value.test(value)) {
    callback(new Error(VALIDATION.oneToHundred.label))
  } else {
    callback()
  }
}

// 999以内数字
export function stopSellTime(rule, value, callback) {
  if ((value || value === 0) && !VALIDATION.stopSellTime.value.test(value) && value) {
    callback(new Error(VALIDATION.stopSellTime.label))
  } else {
    callback()
  }
}
// 0-1000以内数字
export function maxOneThousandNum(rule, value, callback) {
  if (!VALIDATION.maxOneThousandNum.value.test(value)) {
    callback(new Error(VALIDATION.maxOneThousandNum.label))
  } else {
    callback()
  }
}
// 99以内数字
export function maxTwoNum(rule, value, callback) {
  if ((value || value === 0) && !VALIDATION.coupon.value.test(value)) {
    callback(new Error(VALIDATION.coupon.label))
  } else {
    callback()
  }
}
// 10以内数字
export function maxTen(rule, value, callback) {
  if (value && value > 10) {
    callback(new Error(lang('小于10')))
  } else {
    callback()
  }
}

// 9999以内数字
export function maxFourNum(rule, value, callback) {
  if (!VALIDATION.maxFourNum.value.test(value)) {
    callback(new Error(VALIDATION.maxFourNum.label))
  } else {
    callback()
  }
}

// 99999以内数字
export function maxFiveNum(rule, value, callback) {
  if ((value || value === 0) && !VALIDATION.maxFiveNum.value.test(value)) {
    callback(new Error(VALIDATION.maxFiveNum.label))
  } else {
    callback()
  }
}

// 99999以内数字
export function maxFiveNumber(rule, value, callback) {
  if (value && !VALIDATION.maxFiveNumber.value.test(value) && value.trim()) {
    callback(new Error(VALIDATION.maxFiveNumber.label))
  } else {
    callback()
  }
}

// 999999以内数字
export function maxSixNumber(rule, value, callback) {
  if (value && !VALIDATION.maxSixNumber.value.test(value) && value.trim()) {
    callback(new Error(VALIDATION.maxSixNumber.label))
  } else {
    callback()
  }
}

export function weight(rule, value, callback) {
  if ((value || value === 0) && !VALIDATION.weight.value.test(value)) {
    callback(new Error(VALIDATION.weight.label))
  } else {
    callback()
  }
}
export function maxFiveAndTenThousand(rule, value, callback) {
  if (value > 10000 || value < 5000) {
    callback(new Error(lang('要求5000~10000')))
  } else {
    callback()
  }
}

export function max99999(rule, value, callback) {
  if (value > 99999) {
    callback(new Error(lang('数字:0-99999')))
  } else {
    callback()
  }
}

// 字符和数字 中划线
export function codeStrike(rule, value, callback) {
  if (value && !VALIDATION.codeStrike.value.test(value)) {
    callback(new Error(VALIDATION.codeStrike.label))
  } else {
    callback()
  }
}

/**
 * 两个关联input必填校验
 * @param { String } relationInputName 关联表单元素的prop
 * @param { String } form 表单在this.data里面的key
 * @param { String } formRefName 元素所在表单的ref名称
 * @param { String } message 为空提示语
 * @param { Object } self this指针
 */
export const inputRelationValiHandle = (relationInputName, form, formRefName, message, self) => {
  // 返回标准的自定义校验函数
  return (rule, value, callback) => {
    // 当前表单元素值为空
    if (!value) {
      // 关联表单元素的值不为空
      if (self[form][relationInputName]) {
        callback()
      } else {
        // 提示异常
        callback(new Error(self.$lang(message)))
      }
    } else {
      // 关联表单元素的值不为空
      if (self[form][relationInputName]) {
        callback()
      } else {
        // 校验关联表单元素
        self.$refs[formRefName].validateField(relationInputName)
        callback()
      }
    }
  }
}
export function fullAngle(rule, value, callback) {
  if (value && VALIDATION.fullAngle.value.test(value)) {
    callback(new Error(VALIDATION.fullAngle.label))
  } else {
    callback()
  }
}
/**
 * 模块基本name字段校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function moduleName(rule, value, callback) {
  if (value) {
    if (/[\u4e00-\u9fa5]+/i.test(value) && /\s+/i.test(value)) {
      callback(new Error(lang('中文不能有空格')))
    } else if (/^\s+|\s+$/.test(value)) {
      callback(new Error(lang('首尾不能有空格')))
    } else if (/^[0-9\s]*$/.test(value) && /\s+/g.test(value)) {
      callback(new Error(lang('纯数字不能有空格')))
    } else if (((value + '').match(/\s/g) || []).length > 1) {
      callback(new Error(lang('中间最多一个空格')))
    } else if (VALIDATION.unXSS.value.test(value)) {
      callback(new Error(VALIDATION.unXSS.label))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

