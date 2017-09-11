export const BASEURL = '/api'

//export const TEST_LIST = BASEURL + '/api/test/{pageIndex}/{pageSize}'

/*
 * 登录&退出
 */
export const LOGIN = BASEURL + '/login' //登录
export const EXIT = BASEURL + '/logout'  //退出


/******主页******/
export const HOME_CARDS = BASEURL +'/home/cards' //主页4个统计卡片
export const HOME_WEEK_DATA = BASEURL + '/home/weeks'


/*
 * 收款管理
 */
//已收款
export const GATHERED_TOTAL = BASEURL + '/gathered/total'  //已收款总条数
export const GATHERED_LIST = BASEURL + '/gathered/list' //已收款数据集合


/*
 * 活动管理，礼券管理
 */
//加息券管理
export const RAISE_TOTAL = BASEURL + '/raise/total' //加息券总条数
export const RAISE_LIST = BASEURL + '/raise/list' //加息券数据集合


/*
 * 理财产品
 */
//已发布理财&&发布理财
export const PRODUCT_TOAL = BASEURL + '/product/total' //理财产品总条数
export const PRODUCT_LIST = BASEURL + '/product/list' //理财产品数据集合
export const PRODUCT_DETAILS = BASEURL + '/product/details' //产品更详细信息
