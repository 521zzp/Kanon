import { USERS_TOTAL, USERS_LIST, USER_DETAILS, USER_DETAILS_UPDATE } from '../../config/url'
import { postModel, onanaly } from '../../utils/net'
import { message, notification  } from 'antd';


export default {
  namespace: 'userList',
  state: {
  	searching: false, //是否在搜索中
  	total: 52,
  	list: [],
  	pageSize: 10,
  	params: {}, //筛选参数列表
  	editAccount: '',
  	modalVisiable: false, //弹窗是否可见
  	modalItem: {},
  	updateLoading: false, //是否在保存中
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	}, 
  },
  effects: {
  	*getTotal ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'update', payload: { params: { ...obj } } }) : ''
  		let result;
  		yield put({ type: 'update', payload: { searching: true } })
  		try {
  			result = yield fetch(USERS_TOTAL, postModel(obj)).then(onanaly);
  		} finally {
  			yield put({ type: 'update', payload: { searching: false } })
  		}
  		yield put({ type: 'update', payload: { total: result.total } })
  		if (result.total > 0) {
  			yield put({ type: 'getList', payload: 1 })
  		} else {
  			yield put({ type: 'update', payload: { list: [] } })
  		}
  	},
  	*getList ({ payload: obj }, { put, select }) {
  		const { pageSize, params } = yield select(state => state.userList);
  		const result = yield fetch(USERS_LIST, postModel({ ...params, pageSize, current: obj })).then(onanaly);
  		const list = result.map( 
				(item, index) => ({ ...item, key: index })
			)
  		yield put({ type: 'update', payload: { list } })
  	},
  	*getDetails ({ payload: obj }, { put, select }) {
  		yield put({ type: 'update', payload: { editAccount: obj.account } })
  		const result = yield fetch(USER_DETAILS, postModel(obj)).then(onanaly);
  		yield put({ type: 'update', payload: { modalVisiable: true, modalItem: result } })
  	},
  	*editSave ({ payload: obj }, { put, select }) {
  		const { editAccount } = yield select(state => state.userList);
  		const params = { ...obj, account: editAccount }
  		yield put({ type: 'update', payload: { updateLoading: true } })
			try { 
				const { code, msg } = yield fetch(USER_DETAILS_UPDATE, postModel(params)).then(onanaly);
				if (code === 200) {
					notification .success({ message: '通知！', description: msg})
					yield put({ type: 'update', payload: { modalVisiable: false } })
					
				} else {
					notification .error({ message: '通知！', description: msg})
				}
			} finally {
				yield put({ type: 'update', payload: { updateLoading: false } })
			}
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/users') {
        	//查询参数初始化
           dispatch({
            type: 'update',
            payload: {
            	total: 0,
            	list: []
            }
          });
          dispatch({
            type: 'getTotal'
          });
        }
      });
    },
  },
};
