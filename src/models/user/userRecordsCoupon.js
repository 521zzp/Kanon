import { USER_RE_COUPON_TOTAL, USER_RE_COUPON_LIST } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'


export default {
  namespace: 'userRecordsCoupon',
  state: {
  	total: 0, 
  	current: 1,
  	list: []
  },
  reducers: {},
  effects: {
  	*getTotal ({ payload: obj }, { put, select }) {
  		const { account, idCard } = yield select(state => state.userRecords)
  	}
  },
  subscriptions: {},
};
