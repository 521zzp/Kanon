import { GATHERED_TOTAL, GATHERED_LIST } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'


export default {
  namespace: 'gathered',
  state: {
  	total: 0,  //总页码
  	current: 1,  //当前页码
  	pageSize: 10, //每页条数
  	account: '', //商户账号
  	order: '', //订单编号
  	time: [null, null],  //时间范围
  	status: '', //状态
  	list: [], //数据集合
  },
  reducers: {
  	paramsSave (state, { payload: obj }) {
  		return { ...state, ... obj }
  	},
  	totalUpdate (state, { payload: obj }) {
  		return { ...state, ... obj }
  	},
  	listUpdate (state, { payload: obj }) {
  		return { ...state, ... obj}
  	}, 
  	currentUpdate (state, { payload: obj }) {
  		return { ...state, ... obj }
  	},
  	update (state, { payload: obj }) {
  		return { ...state, ... obj }
  	},
  },
  effects: {
  	*getTotal ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'listUpdate', payload: obj }) : ''
  		yield put({ type: 'currentUpdate', payload: { current: 1 } })
  		const { account, order, time, status } = yield select(state => state.gathered);
  		const result = yield fetch(GATHERED_TOTAL, postModel({ account, order, time, status })).then(onanaly);
  		yield put({ type: 'totalUpdate', payload: { total: result.total } });
  	 	if (result.total > 0) {
  			yield put({ type: 'getList' });
  		} else {
  			yield put({ type: 'listUpdate', payload: { list: [] } })
  		}
  	},
  	*getList ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'currentUpdate', payload: { current: obj } }) : ''
  		const params = { ...(yield select(state => state.gathered)), current: obj ? obj : 1 };
  		delete params.list;
  		const result = yield fetch(GATHERED_LIST, postModel(params)).then(onanaly);
			const list = result.map(
				(item, index) => ({ ...item, key: index })
			)
  		yield put({ type: 'listUpdate', payload: { list: list } })
  	},
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/gathered') {
          dispatch({
            type: 'getTotal'
          });
        }
      });
    },
  },
};
