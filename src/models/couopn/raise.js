import { RAISE_TOTAL, RAISE_LIST } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'


export default {
  namespace: 'raise',
  state: {
  	addModalVisiable: false,
  	sendModalVisiable: false,
  	sendId: '', //待发送加息券id
  	products: [], //加息券支持产品列表
  	total: 0, //加息券页面总数据条数
  	current: 1, //加息券当前页数
  	name: '', //搜索的加息券名称
  	pageSize: 10, //加息券每页条数
  	list: [], //加息券集合
  },
  reducers: {
  	openAddModal (state) {
  		return { ...state, addModalVisiable: true }
  	},
  	closeAddModal (state) {
  		return { ...state, addModalVisiable: false }
  	},
  	openSendMoadl (state, { payload: id }) {
  		return { ...state, sendModalVisiable: true, sendId: id }
  	},
  	closeSendMoadl (state) {
  		return { ...state, sendModalVisiable: false, sendId: '' }
  	},
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	}
  },
  effects: {
  	*getTotal ({ payload: obj }, { put, select }) {
  		console.log('xxxx')
  		console.log(obj)
  		obj ? yield put({ type: 'update', payload: obj }) : ''
  		yield put({ type: 'update', payload: { current: 1 } })
  		const { name } = yield select(state => state.raise);
  		const result = yield fetch(RAISE_TOTAL, postModel({ name })).then(onanaly);
  		yield put({ type: 'update', payload: { total: result.total } });
  	 	if (result.total > 0) {
  			yield put({ type: 'getList' });
  		} else {
  			yield put({ type: 'update', payload: { list: [] } })
  		}
  	},
  	*getList ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'update', payload: { current: obj } }) : ''
			const { name, pageSize } = yield select(state => state.raise)
  		const params = { name, pageSize, current: obj ? obj : 1 };
  		const result = yield fetch(RAISE_LIST, postModel(params)).then(onanaly);
			const list = result.map(
				(item, index) => ({ ...item, key: index })
			)
  		yield put({ type: 'update', payload: { list: list } })
  	},
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/raise') {
          dispatch({
            type: 'getTotal'
          });
        }
      });
    },
  },
};
