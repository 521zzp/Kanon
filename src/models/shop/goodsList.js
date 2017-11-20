import { SHOP_GODDS_TOTAL, SHOP_GOODS_LIST, SHOP_GOODS_DETAILS, SHOP_GOODS_STATUS_CHANGE } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'

export default {
  namespace: 'goodsList',
  state: {
  	total: 0,
  	current: 1,
  	list: [],
  	pageSize: 10,
  	params: {
  		keyword: '',
  		type: 0, //'' 全部， 1： 实物，2：虚拟物品
  	}
  	
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  },
  effects: {
  	*getTotal ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'update', payload: { params: obj } }) : ''
  		const { params } = yield select(state => state.promoteRegister )
  		const { total } = yield fetch(SHOP_GODDS_TOTAL, postModel({ ...params })).then(onanaly);
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
			const { pageSize, params } = yield select(state => state.promoteRegister)
			const result = yield fetch(SHOP_GOODS_LIST, postModel({ current, pageSize, ...params })).then(onanaly)
  		const list = result.map(
  			(item, index) => ({ ...item, key: index })
  		)
  		yield put({ type: 'update', payload: { list: list } })
  	},
  	*paramsChange ({ payload: obj }, { put, select }) {
  		yield put({ type: 'update', payload: { params: obj } })
  		yield put({ type: 'getTotal' }) 
  	},
  	*goodsStatusChange ({ payload: obj }, { put, select }) {
  		const result = yield fetch(SHOP_GOODS_STATUS_CHANGE, postModel(obj)).then(onanaly)
  		if (result) {
  			yield put({ type: 'getTotal' }) 
  		}
  	},
  	goodsInfoSave ({ payload: obj }, { put, select }) {
  		
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/shop') {
          dispatch({
            type: 'getTotal'
          });
        }
      });
    },
  },
};






