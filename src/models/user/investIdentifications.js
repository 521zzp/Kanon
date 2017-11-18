import { INVEST_IDENTI_TOTAL, INVEST_IDENTI_LIST, INVEST_IDENTI_MODAL_LIST } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'

export default {
  namespace: 'investIdentifications',
  state: {
  	total: 0,
  	current: 1,
  	list: [],
  	pageSize: 10,
  	type: '',
  	time: [], //查询时间范围
  	modalList: [],
  	modalVisiable: false,
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  },
  effects: {
  	*getTotal ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'update', payload: obj }) : ''
  		const { type, time } = yield select(state => state.investIdentifications )
  		const { total } = yield fetch(INVEST_IDENTI_TOTAL, postModel({ type, time })).then(onanaly);
  		yield put({ type: 'update', payload: { total } });
  		if (total && total >0) {
  			yield put({ type: 'getList' })
  		} else {
  			yield put({ type: 'update', payload: { total: 0, list: [] } });
  		}
  	},
  	*getList ({ payload: obj }, { put, select }) {
  		const current = obj ? obj : 1
			yield put({ type: 'update', payload: { current } })
			const { type, time, pageSize } = yield select(state => state.investIdentifications)
			const result = yield fetch(INVEST_IDENTI_LIST, postModel({ current, pageSize, type, time })).then(onanaly)
  		const list = result.map(
  			(item, index) => ({ ...item, key: index })
  		)
  		yield put({ type: 'update', payload: { list: list } })
  	},
  	*getModalList ({ payload: obj }, { put, select }) {
			const result = yield fetch(INVEST_IDENTI_MODAL_LIST, postModel(obj)).then(onanaly)
  		const list = result.map(
  			(item, index) => ({ ...item, key: index })
  		)
  		yield put({ type: 'update', payload: { modalList: list, modalVisiable: true } })
  	},
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/investIdentification') {
          dispatch({
            type: 'getTotal'
          });
        }
      });
    },
  },
};
