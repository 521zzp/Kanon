import { LOGIN, EXIT } from '../config/url'
import { postModel, onanaly, restful, getModel } from '../utils/net'
import { browserHistory } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'login',
  state: {},
  reducers: {},
  effects: {
  	*login ({ payload: info }, { put }){
  		 		const result = yield fetch(restful(LOGIN, info), getModel()).then(onanaly)
  		 		const { token, name, face, id, msg, nav } = result
  		 		localStorage.setItem('admin',JSON.stringify({ token, name, face, id, nav })) 
  		 		message.success(msg)
  		 		yield put({ type: 'main/loginStroage', payload: { token, name, face, id, nav } })
  		 		browserHistory.push('/')
  	},
  	*logout ({ payload: info }, { put, select }) {
  		const { token } = yield select(state => state.main)
  		
  		const datas = yield fetch(restful(EXIT,{ token }), getModel()).then(onanaly)
  		if (datas) {
  			message.success(datas.msg)
  			const obj = {
	  			token: '',
	  			name: '',
	  			face: '',
	  			nav: [],
	  		}
  			try{
	  				localStorage.removeItem('admin')
	  		}catch(e){
	  		}
  			yield put({ type: 'main/offLineUpdate', payload: obj })
  			browserHistory.push('/login')
  		}
  	}
  	
  },
  subscriptions: {},
};
