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
  	},
  	modalVisiable: false,
  	modalImgs: [],
  	
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  },
  effects: {
  	*getTotal ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'update', payload: { params: obj } }) : ''
  		const { type, params } = yield select(state => state.promoteRegister )
  		const { total } = yield fetch(PROMOTE_REGISTER_TOTAL, postModel({ type, ...params })).then(onanaly);
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
			const { type, pageSize, params } = yield select(state => state.promoteRegister)
			const result = yield fetch(PROMOTE_REGISTER_LIST, postModel({ type, current, pageSize, ...params })).then(onanaly)
  		const list = result.map(
  			(item, index) => ({ ...item, key: index })
  		)
  		yield put({ type: 'update', payload: { list: list } })
  	},
  	*paramsChange ({ payload: obj }, { put, select }) {
  		yield put({ type: 'update', payload: { params: obj } })
  		yield put({ type: 'getTotal' }) 
  	},
  	*checkImage ({ payload: obj }, { put, select }) {
  		const result = yield fetch(PROMOTE_REGISTER_CHECK_IMAGE, postModel(obj)).then(onanaly)
  		/*const list = result.map(
  			(item, index) => ({ ...item, key: index })
  		)*/
  		yield put({ type: 'update', payload: { modalImgs: result, modalVisiable: true } })
  	},
  	*checkApply ({ payload: obj }, { put, select }) {
  		const result = yield fetch(PROMOTE_REGISTER_CHECK, postModel(obj)).then(onanaly)
  		result ? yield put({ type: 'getTotal' }) : ''
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
