export const BASEURL = '/api'

//export const TEST_LIST = BASEURL + '/api/test/{pageIndex}/{pageSize}'

/*
 * 公共功能
 */
export const IMG_UPLOAD = BASEURL + '/img/upload' //图片上传


/*
 * 登录&退出
 */
export const LOGIN = BASEURL + '/login' //登录
export const EXIT = BASEURL + '/logout'  //退出


/******主页******/
export const HOME_CARDS = BASEURL +'/home/cards' //主页4个统计卡片
export const HOME_WEEK_DATA = BASEURL + '/home/weeks'

/*
 * 用户管理
 */
//用户列表
export const USERS_TOTAL = BASEURL+ '/users/total' //用户列表总条数
export const USERS_LIST = BASEURL + '/users/list' //用户列表集合
export const USER_DETAILS = BASEURL + 'user/details' //用户详情信息


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


/*
 * 新闻管理
*/
//新闻列表
export const NEWS_TOTAL = BASEURL + '/news/total' //新闻总条数
export const NEWS_LIST = BASEURL + '/news/list' //新闻集合
export const NEWS_DETAILS = BASEURL + 'news/detalis' //新闻详情信息
