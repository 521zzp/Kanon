import { PROMOTE_REGISTER_TOTAL, PROMOTE_REGISTER_LIST, PROMOTE_REGISTER_CHECK, PROMOTE_REGISTER_CHECK_IMAGE  } from '../../config/url'
import { postModel, getModel, onanaly, restful } from '../../utils/net'
import { message } from 'antd'


export default {
  namespace: 'promoteRegister',
  state: {
  	total: 0,
  	current: 1,
  	list: [],
  	pageSize: 10,
  	type: '', //审核类型： 内部员工，商户审核，商户下级
  	params: {
	  	status: '', //审核状态 ：  1：未审核,2：已通过， -1： 未通过  0表示所有
	  	account: '', //商户账号
	  	superior: '', //上级账号
  	}
  	
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  },
  effects: {
  	*getTotal ({ payload: obj }, { put, select }) {
  		yield put({ type: 'update', payload: { params: obj } })
  		const { type, params } = yield select(state => state.promoteRegister )
  		console.log('paramsparamsparamsparamsparams')
  		console.log(params)
	  	console.log(type)
  		const { total } = yield fetch(PROMOTE_REGISTER_TOTAL, postModel({ type, ...params })).then(onanaly);
  		if (total && total >0) {
  			yield put({ type: 'getList' })
  		} else {
  			yield put({ type: 'update', payload: { total: 0, list: [] } });
  		}
  	},
  	*getList ({ payload: obj }, { put, select }) {
  		const current = obj ? obj : 1
			obj ? yield put({ type: 'update', payload: { current } }) : ''
			const { type, pageSize, params } = yield select(state => state.promoteRegister)
			const result = yield fetch(PROMOTE_REGISTER_LIST, postModel({ type, current, pageSize, ...params })).then(onanaly)
  		const list = result.map(
  			(item, index) => ({ ...item, key: index })
  		)
  		yield put({ type: 'update', payload: { list: list } })
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/clerkPromote') {
          dispatch({
            type: 'update',
            payload: {
            	type: 'clerkPromote',
            	list: [],
            	params: {
						  	status: 'ss', 
						  	account: '', 
						  	superior: '', 
					  	}
            }
          });
          dispatch({
            type: 'getTotal'
          });
        }
        if (pathname === '/merchantRegister') {
          dispatch({
            type: 'update',
            payload: {
            	type: 'merchantRegister',
            	list: [],
            	params: {
						  	status: '', 
						  	account: '', 
						  	superior: '', 
					  	}
            }
          });
          dispatch({
            type: 'getTotal'
          });
        }
        if (pathname === '/merchantPromote') {
          dispatch({
            type: 'update',
            payload: {
            	type: 'merchantPromote',
            	list: [],
            	params: {
						  	status: '', 
						  	account: '', 
						  	superior: '', 
					  	}
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
