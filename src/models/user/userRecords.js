import { USER_RE_COMMON, } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'

export default {
  namespace: 'userRecords',
  state: {
  	account: '',
  	idCard: '',
  	baseInfo: null,
  	pageSize: 5, //统一的分页大小
  	couponTotal: 0, //优惠券
  	couponCurrent: 1,
  	couponList: [],
  	investTotal: 0, //投资记录
  	investCurrent: 1,
  	investList: [],
  	capitalStatementsTotal: 0, //资金流水
  	capitalStatementsCurrent: 1,
  	capitalStatementsList: [],
  	rechargeTotal: 0, //充值提现记录
  	rechargeCurrent: 1, 
  	rechargeList: [],
  	shopExchangeTotal: 0, //商城兑换记录
  	shopExchangeCurrent: 1,
  	shopExchangeList: [],
  	pointTotal: 0, //积分记录
  	pointCurrent: 1,
  	pointList: [],
  	inviteTotal: 0, //邀请记录
  	inviteCurrent: 1,
  	inviteList: [],
  	
  	
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	}, 
  },
  effects: {
  	*getCommonInfo ({ payload: obj }, { put, select }) {
  		const { account, idCard } = yield select(state => state.userRecords)
  		const result = yield fetch(USER_RE_COMMON, postModel({account, idCard})).then(onanaly)
  		if (result) {
  			delete result.msg
  			yield put({ type: 'update', payload: { baseInfo: { ...result, key: 1} } })
  		} else {
  			yield put({ type: 'update', payload: { baseInfo: null } })
  		}
  		
  	}
  },
  subscriptions: {
  	
  },
};
