import { ADMINS_TOTAL, ADMINS_LIST, ADMINS_POWER_GET, ADMINS_INFO_UPDATE, ADMINS_POWER_SET,  } from '../../config/url'
import { postModel, getModel, onanaly, restful } from '../../utils/net'
import { message } from 'antd'

export default {
  namespace: 'admins',
  state: {
  	total: 0,
  	current: 1,
  	list: [],
  	pageSize: 10,
  	account: '', //查询设置权限的账号
  	power: [],//查询账号拥有的权限
  	modal: {
  		visiable: false,
  		type: 'add', //add, edit
  		account: '',
  		password: '',
  		name: '',
  	}
  	
  },
  reducers: {
  	update (state, { payload: obj }) {
  		return { ...state, ...obj }
  	},
  	singleCheckRedux (state, { payload: obj }) {
  		const superior = state.power.filter(
  			item => item.id === obj.groupId
  		)[0]
  		const single = superior.children.filter(
  			item => item.id === obj.singleId
  		)[0]
  		const children = [].concat(superior.children)
  		children.splice(children.indexOf(single), 1, { ...single, own: obj.own })
  		
  		const power = [].concat(state.power)
  		power.splice(power.indexOf(superior), 1, { ...superior, children})
  		
  		return { ...state, power }
  	},
  	groupCheckRedux (state, { payload: obj }) {
  		const { own, group } = obj
  		const superior = state.power.filter(
  			item => item.id === obj.groupId
  		)[0]
  		const children = [].concat(superior.children)
  		const resource = superior.children.filter(
  			item => item.own !== obj.own
  		)
  		for (let i = 0; i< resource.length; i++){
  			children.splice(children.indexOf(resource[i]), 1, { ...resource[i], own: obj.own })
  		}
  		const power = [].concat(state.power)
  		power.splice(power.indexOf(superior), 1, { ...superior, children})
  		return { ...state, power }
  	},
  	modalClose (state, { payload: obj }) {
  		return { ...state, modal: { ...state.modal, visiable: false } }
  	},
  	modalOpen (state, { payload: obj }) {
  		return { ...state, modal: obj }
  	},
  },
  effects: {
  	*getTotal ({ payload: obj }, { put, select }) {
  		const { total } = yield fetch(ADMINS_TOTAL, postModel()).then(onanaly);
  		yield put({ type: 'update', payload: { total } });
  		if (total > 0) {
  			yield put({ type: 'getList' });
  		} else {
  			yield put({ type: 'update', payload: { list: [] } });
  		}
  	},
  	*getList ({ payload: obj }, { put, select }) {
  		obj ? yield put({ type: 'update', payload: { current: obj } }) : ''
  		const current = obj ? obj : 1
  		const { pageSize } = yield select(state => state.admins)
  		const result = yield fetch(restful(ADMINS_LIST, { current, pageSize }), postModel()).then(onanaly)
  		const list = result.map(
  			(item, index) => ({ ...item, key: index })
  		)
  		yield put({ type: 'update', payload: { list: list } })
  	},
  	*getPower ({ payload: obj }, { put, select }) {
  		const { account } = yield select(state => state.admins)
  		const power = yield fetch(restful(ADMINS_POWER_GET, { account }), postModel()).then(onanaly)
  		yield put({ type: 'update', payload: { power } })
  	},
  	*singleCheck ({ payload: obj }, { put, select }) {
  		console.log('singleCheck')
  		console.log(obj)
  		const result = yield fetch(ADMINS_POWER_SET, postModel({ ...obj, type: 'single' })).then(onanaly)
  		if (result) {
  			yield put({ type: 'singleCheckRedux', payload: obj})
  		}
  	},
  	*groupCheck ({ payload: obj }, { put, select }) {
  		console.log('groupCheck')
  		console.log(obj)
  		const result = yield fetch(ADMINS_POWER_SET, postModel({ ...obj, type: 'group' })).then(onanaly)
  		if(result) {
  			yield put({ type: 'groupCheckRedux', payload: obj})
  		}
  	},
  	*adminInfoUpdate ({ payload: obj }, { put, select }) {
  		
  		const { msg } = yield fetch(ADMINS_INFO_UPDATE, postModel(obj)).then(onanaly)
  		message.success(msg);
  		yield put({ type: 'modalClose' })
  		yield put({ type: 'getTotal' })
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/admins') {
          dispatch({
            type: 'getTotal'
          });
        }
        if (pathname === '/power') {
          dispatch({
            type: 'getPower'
          });
        }
      });
    },
  },
};
