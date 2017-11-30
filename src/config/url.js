export const BASEURL = '/adminapi'

//export const TEST_LIST = BASEURL + '/api/test/{pageIndex}/{pageSize}'

/*
 * 公共功能
 */
export const IMG_UPLOAD = BASEURL + '/img/upload' //图片上传


/*
 * 登录&退出
 */
export const LOGIN = BASEURL + '/login/{account}/{password}' //登录
export const EXIT = BASEURL + '/logout/{token}'  //退出


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
export const USER_DETAILS_UPDATE = BASEURL + '/user/details/update' //更新用户数据
//用户记录
export const USER_RE_COMMON = BASEURL + '/user/records/common' //用户基本信息
export const USER_RE_COUPON_TOTAL = BASEURL + '/user/records/coupon/total' //用户持有礼券总条数
export const USER_RE_COUPON_LIST = BASEURL + '/user/records/coupon/list' //用户持有礼券集合
export const USER_RE_INVEST_TOTAL = BASEURL + '/user/records/invest/total' //用户投资记录总条数
export const USER_RE_INVEST_LIST = BASEURL + '/user/records/invest/list' //用户投资记录集合
export const USER_RE_CAPITAL_STATEMENTS_TOTAL = BASEURL + '/user/records/capital/statements/total' //用户资金流水总条数
export const USER_RE_CAPITAL_STATEMENTS_LIST = BASEURL + '/user/records/capital/statements/list' //用户资金流水集合
export const USER_RE_RECHARGE_TOTAL = BASEURL + '/user/records/recharge/total' //用户充值记录条数
export const USER_RE_RECHARGE_LIST = BASEURL + '/user/records/recharge/list' //用户充值记录集合
export const USER_RE_SHOP_EXCHANGE_TOTAL = BASEURL + 'user/records/shop/exchange/total' //用户商城兑换记录条数
export const USER_RE_SHOP_EXCHANGE_LIST = BASEURL + '/user/records/shop/exchange/list' //用户商城兑换记录集合
export const USER_RE_POINT_TOTAL = BASEURL + '/user/records/point/total' //用户积分流水总记录数
export const USER_RE_POINT_LIST = BASEURL + '/user/records/point/list' //用户积分流水集合
export const USER_RE_INVITE_TOTAL = BASEURL + '/user/records/invte/total' //用户邀请记录总条数
export const USER_RE_INVITE_LIST = BASEURL + '/user/records/invete/list' //用户邀请记录集合
//投资绑卡统计
export const INVEST_IDENTI_TOTAL = BASEURL + '/user/investSituationTotal'  //投资绑卡总条数
export const INVEST_IDENTI_LIST = BASEURL + '/user/investSituation' //投资绑卡集合
export const INVEST_IDENTI_MODAL_LIST = BASEURL + '/user/investDetails' //投资绑卡统计弹框集合
//下级商户
export const USER_JUNIOR_USER = BASEURL + '/getTotalInfo' //下级商户，本用户基本信息
export const USER_JUNIOR_STATISTICS = BASEURL + '/getAllsubInfo' //下级商户统计
export const USER_JUNIOR_INVEST_STATISTICS = BASEURL + '/user/junior/invest/statistics' //下级投资情况统计
export const USER_JUNIOR_TREE_SEARCH = BASEURL + '/user/junior/tree/search' //下级树搜索
export const USER_JUNIOR_INFO = BASEURL + '/user/junior/info' //下级详情信息
export const USER_JUNIOR_THREE_STATISTICS = BASEURL + '/user/junior/three/statistics' //三层用户情况统计

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
 * 商城管理
 */
export const SHOP_GODDS_TOTAL = BASEURL + '/shop/goods/total' //商品总条数
export const SHOP_GOODS_LIST = BASEURL + '/shop/goods/list' //商品数据集合
export const SHOP_GOODS_DETAILS = BASEURL + '/shop/goods/details' //单个商品详细信息
export const SHOP_GOODS_ADD = BASEURL + '/shop/goods/add' //添加商品
export const SHOP_GOODS_EDIT = BASEURL + '/shop/goods/edit' //编辑商品信息
export const SHOP_GOODS_STATUS_CHANGE = BASEURL + '/shop/goods/status/change'  //改变商品状态
export const SHOP_GOODS_INFO_SAVE = BASEURL + '/shop/goods/info/save' //保存商品信息，添加或编辑

/*
 * 审核中心
 */
export const PROMOTE_REGISTER_TOTAL = BASEURL + '/register/total' //推广注册总条数
export const PROMOTE_REGISTER_LIST = BASEURL + '/register/list' //推广注册集合
export const PROMOTE_REGISTER_CHECK = BASEURL + '/promote/register/check' //推广注册审核接口
export const PROMOTE_REGISTER_CHECK_IMAGE = BASEURL + '/register/checkIMG' //审核图片

/*
 * 异业推广
 */
export const DIFF_INDUS_YCT_TOTAL = BASEURL + '/couponCount' //蕴才汤总条数
export const DIFF_INDUS_YCT_LIST = BASEURL + '/couponList' //蕴才汤集合
export const DIFF_INDUS_YCT_USE = BASEURL + '/check' //蕴才汤设置使用




/*
 * 新闻管理
*/
//新闻列表
export const NEWS_TOTAL = BASEURL + '/news/total' //新闻总条数
export const NEWS_LIST = BASEURL + '/news/list' //新闻集合
export const NEWS_DETAILS = BASEURL + 'news/detalis' //新闻详情信息

/*
 * 系统设置
 */
export const ADMINS_TOTAL = BASEURL + '/adminTotal' //管理员总页数
export const ADMINS_LIST = BASEURL + '/getAdmins/{pageSize}/{current}' //管理员集合
export const ADMINS_POWER_GET = BASEURL + '/power/{account}' //获取权限列表
export const ADMINS_INFO_UPDATE = BASEURL + '/opera' //添加管理员或更新管理员密码
export const ADMINS_POWER_SET = BASEURL + '/powerSet' //设置单个权限或一组权限

/*
 * 客服系统
 */
export const CUSTOMER_SERVICE_SOCKET = BASEURL + '/websocket'
