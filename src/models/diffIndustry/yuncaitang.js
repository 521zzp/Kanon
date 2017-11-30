import { DIFF_INDUS_YCT_TOTAL, DIFF_INDUS_YCT_LIST, DIFF_INDUS_YCT_USE, } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'
import { message } from 'antd'


export default {
  namespace: 'yuncaitang',
  state: {
  	total: 0,
  	current: 0,
  	pageSize: 10,
  	money: 0, //已抵扣总金额
  	list: [],
  	params: {
  		account: '',
  		status: '',
  		couponId: '',
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
  		const { total, money } = yield fetch(DIFF_INDUS_YCT_TOTAL, postModel(params)).then(onanaly);
  		yield put({ type: 'update', payload: { total, money } });
  		if (total && total >0) {
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
