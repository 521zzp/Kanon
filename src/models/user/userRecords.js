import { USER_RE_COMMON, } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'

export default {
  namespace: 'userRecords',
  state: {
  	account: '',
  	idCard: '',
  	baseInfo: null,
  	pageSize: 5, //统一的分页大小
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
