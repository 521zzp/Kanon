import { USER_RE_RECHARGE_TOTAL, USER_RE_RECHARGE_LIST } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'


export default {
  namespace: 'userRecordsRecharge',
  state: {
  	total: 0, 
  	current: 1,
  	list: []
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	}, 
  },
  effects: {
  	*getTotal ({ payload: obj }, { put, select }) {
  		const { account, idCard } = yield select(state => state.userRecords)
  		const { total } = yield fetch(USER_RE_RECHARGE_TOTAL, postModel({account, idCard})).then(onanaly)
			yield put({ type: 'update', payload: { total } })
			if (total > 0) {
				yield put({ type: 'getList', payload: 1 })
			}
  	},
  	*getList ({ payload: obj }, { put, select }) {
  		yield put({ type: 'update', payload: { current: obj } })
  		const { account, idCard, pageSize } = yield select(state => state.userRecords)
  		const list = yield fetch(USER_RE_RECHARGE_LIST, postModel({current: obj, pageSize, account, idCard})).then(onanaly)
			list.forEach((item, index) => item.key = index)
			yield put({ type: 'update', payload: { list } })
  	}
  },
  subscriptions: {
  	
  },
};
