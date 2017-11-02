import { message } from 'antd';
import { browserHistory } from 'dva/router';
import { tokenSet }  from '../utils/net';

let token, name, face, id, nav;

try{
	//如果要将一个已经声明的变量用于解构赋值，必须非常小心.只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。
	
	 ( { token, name, face, nav, id } = JSON.parse(localStorage.getItem('admin')) );
	 console.log('从本地存储获取数据')
	 console.log('token:' + token)
	 console.log('name:' + name)
	 console.log('face:' + face)
	 console.log('nav:')
	 console.log(nav)
	 console.log('id:' + id)
}catch(e){
	console.log('从本地存储获取数据异常')
	token = '';
	name = '';
	face = '';
	id = '';
	nav = [];
}
tokenSet(token) //本地打开获取token

export default {
  namespace: 'main',
  token,
  state: {
  	token: token,
  	name: name,
  	face: face,
  	nav: nav,
  	id: id,
  },
  reducers: {
  	loginStroage (state, { payload: info }) {
  		console.log('login success rudecer state:')
  		console.log(info)
  		tokenSet(info.token)
  		console.log('inner tokenSet')
  		console.log(tokenSet)
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
  			face: '',
  			id: '',
  			nav: [],
  		}
  		try{
  			localStorage.removeItem('admin')
  		}catch(e){
  		}
  		yield put({ type: 'offLineUpdate', payload: obj })
  	},
  	*powerValidate ({ payload: path }, { put, select }) {
  		//权限监控
  		/*const { nav } = yield select(state => state.main)
  		const common = [ '/', '/login', '/forbidden', '/404' ]
  		if (!~common.indexOf(path)) {
  			const power = []
	 		nav.forEach( (item) => {
	 			console.log(item)
	 			item.children.forEach(
	 				innerItem => power.push(innerItem.path) 
	 			)
	 		})
	 		if (!~power.indexOf(path)) {
	 			browserHistory.push('/forbidden')
	 		}
  		}*/
  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
      	
      	console.log('pathname===============================================:')
      	console.log(pathname)
      	dispatch({
      		type: 'powerValidate',
      		payload: pathname
      	})
      });
    }
  },
};
