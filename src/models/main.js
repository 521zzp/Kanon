import { message } from 'antd';
import { browserHistory } from 'dva/router';

let token, name, face;

try{
	//如果要将一个已经声明的变量用于解构赋值，必须非常小心.只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
	 ( { token, name, face } = JSON.parse(localStorage.getItem('admin')) );
}catch(e){
	token = '';
	name = '';
	face = '';
}


export default {
  namespace: 'main',
  state: {
  	token: token,
  	name: name,
  	face: face
  },
  reducers: {
  	loginStroage (state, { payload: info }) {
  		return { ...state, ...info }
  	},
    offLineUpdate (state, { payload: info }) {
  		return { ...state, ...info }
  	},
  },
  effects: {
  	*offLine (state, { put }) {
  		message.error('登录超时，请重新登录', 1.5 , () => browserHistory.push('/login') )
  		const obj = {
  			token: '',
  			name: '',
  			face: ''
  		}
  		try{
  				localStorage.removeItem('admin')
  		}catch(e){
  		}
  		yield put({ type: 'offLineUpdate', payload: obj })
  	}
  },
  subscriptions: {},
};
