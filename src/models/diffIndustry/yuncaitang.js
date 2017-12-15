import { DIFF_INDUS_YCT_TOTAL, DIFF_INDUS_YCT_LIST, DIFF_INDUS_YCT_USE, } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'
import { message } from 'antd'


export default {
  namespace: 'yuncaitang',
  state: {
  	total: 0,
  	current: 0,
  	pageSize: 10,
  	bCount: 0, //已使用浴资券张数
  	dCount: 0, //已使用抵用券张数
  	list: [],
  	params: {
  		account: '',
  		status: '',
  		type: '', //礼券类型  2: 浴资券 ， 1: 10元抵用券
  		couponId: '',
  		time: [ '' , '' ], //使用时间
  	},
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  },
  effects: {
  	*getTotal ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'update', payload: { params: obj } }) : ''
  		const { params } = yield select(state => state.yuncaitang )
  		const { total, bCount, dCount } = yield fetch(DIFF_INDUS_YCT_TOTAL, postModel(params)).then(onanaly);
  		yield put({ type: 'update', payload: { total, bCount, dCount } });
  		if (total && total > 0) {
  			yield put({ type: 'getList' })
  		} else {
  			yield put({ type: 'update', payload: { total: 0, list: [] } });
  		}
  	},
  	*getList ({ payload: obj }, { put, select }) {
  		const current = obj ? obj : 1
			yield put({ type: 'update', payload: { current } })
			const { pageSize, params } = yield select(state => state.yuncaitang)
			const result = yield fetch(DIFF_INDUS_YCT_LIST, postModel({ current, pageSize, ...params })).then(onanaly)
  		const list = result.map(
  			(item, index) => ({ ...item, key: index })
  		)
  		yield put({ type: 'update', payload: { list: list } })
  	},
  	*setUsed ({ payload: obj }, { put, select }) {
  		const result = yield fetch(DIFF_INDUS_YCT_USE, postModel(obj)).then(onanaly)
  		if (result) {
  			message.success(result.msg);
  			const { current } = yield select(state =>state.yuncaitang)
  			yield put({ type: 'getList', payload: current })
  		}
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/yunCaiTang') {
          dispatch({
            type: 'getTotal'
          });
        }
      });
    },
  },
};
