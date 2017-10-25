import { LOGIN, EXIT } from '../config/url'
import { postModel, onanaly } from '../utils/net'
import { browserHistory } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'login',
  state: {},
  reducers: {},
  effects: {
  	*login ({ payload: info }, { put }){
  		 		const result = yield fetch(LOGIN, postModel(info)).then(onanaly)
  		 		const { token, name, face, msg, nav } = result
  		 		
  		 		localStorage.setItem('admin',JSON.stringify({ token, name, face, nav })) 
  		 		message.success(msg)
  		 		yield put({ type: 'main/loginStroage', payload: { token, name, face, nav } })
  		 		browserHistory.push('/')
  	},
  	*logout ({ payload: info }, { put }) {
  		const datas = yield fetch(EXIT, postModel(info)).then(onanaly)
  		if (datas) {
  			message.success(datas.msg)
  			const obj = {
	  			token: '',
	  			name: '',
	  			face: '',
	  			nav: [],
	  			power: [],
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
